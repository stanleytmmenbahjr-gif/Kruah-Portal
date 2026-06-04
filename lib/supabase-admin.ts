import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Client as PgClient } from 'pg';

const SUPABASE_URL =
  (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const SUPABASE_KEY =
  (process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '').trim();
const SUPABASE_DB_URL = (process.env.SUPABASE_DB_URL || '').trim();

const isDbUrlConfigured = () =>
  Boolean(SUPABASE_DB_URL && !SUPABASE_DB_URL.includes('[YOUR-PASSWORD]') && !SUPABASE_DB_URL.includes('YOUR_PASSWORD'));

let client: SupabaseClient | null = null;

export function getAdminSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  return client;
}

async function runRawSql(sql: string) {
  if (!SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL is not configured');
  }

  const pgClient = new PgClient({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await pgClient.connect();
    await pgClient.query(sql);
  } catch (error: any) {
    const details = error?.message ?? 'Unknown error';
    throw new Error(`Unable to execute SQL using SUPABASE_DB_URL: ${details}`);
  } finally {
    await pgClient.end().catch(() => {});
  }
}

async function isDbReachable() {
  if (!isDbUrlConfigured()) {
    return false;
  }

  const pgClient = new PgClient({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 3000,
  });

  try {
    await pgClient.connect();
    await pgClient.query('SELECT 1');
    return true;
  } catch {
    return false;
  } finally {
    await pgClient.end().catch(() => {});
  }
}

const tableSchemas: Record<string, string> = {
  contact_messages: `
    CREATE TABLE IF NOT EXISTS public.contact_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      subject text DEFAULT '',
      message text NOT NULL,
      read boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
  blog_posts: `
    CREATE TABLE IF NOT EXISTS public.blog_posts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      slug text NOT NULL UNIQUE,
      content text NOT NULL,
      excerpt text NOT NULL,
      author text NOT NULL,
      published_at timestamptz,
      featured_image text,
      tags text[],
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
  events: `
    CREATE TABLE IF NOT EXISTS public.events (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text NOT NULL,
      date timestamptz NOT NULL,
      location text NOT NULL,
      event_type text NOT NULL,
      registration_link text,
      capacity integer,
      image_url text,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
  press_releases: `
    CREATE TABLE IF NOT EXISTS public.press_releases (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      outlet text NOT NULL,
      date date NOT NULL,
      summary text NOT NULL,
      link text NOT NULL,
      photo_url text,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
  roles: `
    CREATE TABLE IF NOT EXISTS public.roles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      organization text NOT NULL,
      start_date date NOT NULL,
      end_date date,
      is_current boolean NOT NULL DEFAULT false,
      description text NOT NULL,
      category text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
  testimonials: `
    CREATE TABLE IF NOT EXISTS public.testimonials (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      title text NOT NULL,
      organization text NOT NULL,
      content text NOT NULL,
      image_url text,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `,
};

export async function ensureTableExists(tableName: string) {
  const sql = tableSchemas[tableName];
  if (!sql) {
    throw new Error(`No schema defined for admin table: ${tableName}`);
  }
  await runRawSql(sql);
}

export async function ensurePressReleasesTable() {
  await ensureTableExists('press_releases');
}

export async function handleMissingTable<T>(tableName: string, action: () => Promise<{ data: T | null; error: any }>) {
  const result = await action();
  if (result.error?.code === 'PGRST205') {
    if (!isDbUrlConfigured()) {
      throw new Error(
        `The table '${tableName}' does not exist and SUPABASE_DB_URL is not configured correctly. ` +
        `Set a valid SUPABASE_DB_URL in .env.local to enable auto-creation of missing admin tables, or create the table manually in Supabase.`
      );
    }

    if (!(await isDbReachable())) {
      throw new Error(
        `The table '${tableName}' does not exist and the configured SUPABASE_DB_URL cannot be reached from this environment. ` +
        `Check your network, firewall, VPN, or Supabase DB host accessibility before retrying.`
      );
    }

    try {
      await ensureTableExists(tableName);
    } catch (createError) {
      throw new Error(
        `Unable to auto-create missing table '${tableName}'. ` +
        `Check SUPABASE_DB_URL and network connectivity. Original error: ${createError.message}`
      );
    }

    const retry = await action();
    if (retry.error) {
      throw retry.error;
    }
    return retry.data;
  }

  if (result.error) {
    throw result.error;
  }

  return result.data;
}

export function isAutoCreateError(error: any) {
  const message = typeof error?.message === 'string' ? error.message : '';
  return message.includes('Unable to auto-create missing table') ||
    message.includes('configured SUPABASE_DB_URL cannot be reached') ||
    message.includes('SUPABASE_DB_URL is not configured correctly');
}
