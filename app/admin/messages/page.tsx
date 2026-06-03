import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getContactMessages } from '../../../lib/message-store';
import AdminLogout from '../../../components/AdminLogout';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get('admin_auth')?.value === 'true';

  if (!authorized) {
    redirect('/admin');
  }

  const messages: ContactMessage[] = await getContactMessages();

  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Admin Inbox</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Contact Messages</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              All form submissions are stored here. Refresh the page to load the latest messages.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AdminLogout />
            <Link
              href="/admin/newsletter"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              Newsletter Subscribers
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
              No contact messages have been received yet.
            </div>
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">{message.read ? 'Read' : 'Unread'}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{message.subject || 'No subject'}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      From <strong>{message.name}</strong> • <a className="text-gold underline" href={`mailto:${message.email}`}>{message.email}</a>
                    </p>
                  </div>
                  <time className="text-sm text-slate-400">
                    {new Date(message.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Message</p>
                    <p className="whitespace-pre-line rounded-3xl bg-brand-800/80 p-6 text-sm leading-7 text-slate-200">{message.message}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-brand-900/70 p-5 text-sm text-slate-300">
                    <p>
                      <span className="font-semibold text-white">Status:</span>{' '}
                      {message.read ? 'Read' : 'Unread'}
                    </p>
                    <p className="mt-3">
                      <span className="font-semibold text-white">ID:</span> {message.id}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
