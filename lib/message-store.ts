import { promises as fs } from 'fs';
import path from 'path';

const fallbackFile = path.join(process.cwd(), 'data', 'contact_messages.json');

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

async function ensureFallbackFile() {
  try {
    await fs.access(fallbackFile);
  } catch (error) {
    await fs.mkdir(path.dirname(fallbackFile), { recursive: true });
    await fs.writeFile(fallbackFile, '[]', 'utf8');
  }
}

async function readFallbackMessages(): Promise<ContactMessage[]> {
  await ensureFallbackFile();
  const content = await fs.readFile(fallbackFile, 'utf8');
  try {
    return JSON.parse(content) as ContactMessage[];
  } catch {
    return [];
  }
}

async function writeFallbackMessages(messages: ContactMessage[]) {
  await ensureFallbackFile();
  await fs.writeFile(fallbackFile, JSON.stringify(messages, null, 2), 'utf8');
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const fallbackMessages = await readFallbackMessages();
  return fallbackMessages.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>) {
  const created_at = new Date().toISOString();
  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const newMessage: ContactMessage = {
    id,
    created_at,
    ...message,
  };

  const fallbackMessages = await readFallbackMessages();
  await writeFallbackMessages([newMessage, ...fallbackMessages]);
  return newMessage;
}
