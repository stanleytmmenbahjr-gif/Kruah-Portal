import { promises as fs } from 'fs';
import path from 'path';

type JsonRecord = Record<string, any>;

const resourceFileNames = {
  blog_posts: 'blog_posts.json',
  events: 'events.json',
  press_releases: 'press_releases.json',
  roles: 'roles.json',
  testimonials: 'testimonials.json',
  contact_messages: 'contact_messages.json',
} as const;

type ResourceName = keyof typeof resourceFileNames;

const dataDir = path.join(process.cwd(), 'data');

function getResourceFilePath(resource: ResourceName) {
  return path.join(dataDir, resourceFileNames[resource]);
}

async function ensureResourceFile(resource: ResourceName) {
  const filePath = getResourceFilePath(resource);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
  }
  return filePath;
}

async function readResource(resource: ResourceName): Promise<JsonRecord[]> {
  const filePath = await ensureResourceFile(resource);
  const text = await fs.readFile(filePath, 'utf8');
  try {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeResource(resource: ResourceName, records: JsonRecord[]) {
  const filePath = await ensureResourceFile(resource);
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), 'utf8');
}

function ensureId(id?: string) {
  if (typeof id === 'string' && id.trim()) {
    return id;
  }

  if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
    return (crypto as any).randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function getAll(resource: ResourceName, orderBy = 'created_at', ascending = false) {
  const records = await readResource(resource);
  if (!orderBy) {
    return records;
  }

  return [...records].sort((a, b) => {
    const aValue = a?.[orderBy];
    const bValue = b?.[orderBy];

    if (aValue === bValue) {
      return 0;
    }

    if (aValue == null) {
      return 1;
    }

    if (bValue == null) {
      return -1;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (aValue > bValue) {
      return ascending ? 1 : -1;
    }

    if (aValue < bValue) {
      return ascending ? -1 : 1;
    }

    return 0;
  });
}

export async function getById(resource: ResourceName, id: string) {
  const records = await readResource(resource);
  return records.find((item) => item?.id === id) || null;
}

export async function insert(resource: ResourceName, payload: JsonRecord) {
  const records = await readResource(resource);
  const id = ensureId(payload.id);
  const created_at = payload.created_at || new Date().toISOString();
  const record = { id, created_at, ...payload };
  records.unshift(record);
  await writeResource(resource, records);
  return record;
}

export async function update(resource: ResourceName, id: string, payload: JsonRecord) {
  const records = await readResource(resource);
  const index = records.findIndex((item) => item?.id === id);
  if (index === -1) {
    return null;
  }

  const updated = { ...records[index], ...payload, id };
  records[index] = updated;
  await writeResource(resource, records);
  return updated;
}

export async function deleteById(resource: ResourceName, id: string) {
  const records = await readResource(resource);
  const nextRecords = records.filter((item) => item?.id !== id);
  if (nextRecords.length === records.length) {
    return false;
  }

  await writeResource(resource, nextRecords);
  return true;
}
