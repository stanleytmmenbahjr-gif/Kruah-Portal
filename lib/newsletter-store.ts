import { promises as fs } from 'fs';
import path from 'path';

const storeFile = path.join(process.cwd(), 'data', 'newsletter_subscribers.json');

type Subscriber = {
  id: string;
  email: string;
  name: string;
  subscribed_at: string;
  unsubscribed: boolean;
};

async function ensureStoreFile() {
  try {
    await fs.access(storeFile);
  } catch {
    await fs.mkdir(path.dirname(storeFile), { recursive: true });
    await fs.writeFile(storeFile, '[]', 'utf8');
  }
}

async function readSubscribers(): Promise<Subscriber[]> {
  await ensureStoreFile();
  const content = await fs.readFile(storeFile, 'utf8');
  try {
    return JSON.parse(content) as Subscriber[];
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]) {
  await ensureStoreFile();
  await fs.writeFile(storeFile, JSON.stringify(subscribers, null, 2), 'utf8');
}

export async function getNewsletterSubscribers(): Promise<Subscriber[]> {
  const subscribers = await readSubscribers();
  return subscribers.sort((a, b) => (a.subscribed_at < b.subscribed_at ? 1 : -1));
}

export async function saveNewsletterSubscriber(subscriber: Omit<Subscriber, 'id' | 'subscribed_at' | 'unsubscribed'>) {
  const subscribers = await readSubscribers();
  const normalizedEmail = subscriber.email.trim().toLowerCase();
  const existing = subscribers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (existing) {
    if (existing.unsubscribed) {
      existing.unsubscribed = false;
      existing.name = subscriber.name;
      existing.subscribed_at = new Date().toISOString();
      await writeSubscribers(subscribers);
    }
    return existing;
  }

  const newSubscriber: Subscriber = {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    email: normalizedEmail,
    name: subscriber.name,
    subscribed_at: new Date().toISOString(),
    unsubscribed: false,
  };

  await writeSubscribers([newSubscriber, ...subscribers]);
  return newSubscriber;
}
