import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNewsletterSubscribers } from '../../../lib/newsletter-store';
import AdminLogout from '../../../components/AdminLogout';

type Subscriber = {
  id: string;
  email: string;
  name: string;
  subscribed_at: string;
  unsubscribed: boolean;
};

export default async function AdminNewsletterPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get('admin_auth')?.value === 'true';
  const resendEnabled = Boolean(process.env.RESEND_API_KEY);
  const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

  if (!authorized) {
    redirect('/admin');
  }

  const subscribers: Subscriber[] = await getNewsletterSubscribers();

  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Admin Inbox</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Newsletter Subscribers</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${resendEnabled ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-red-500/10 text-red-300 border border-red-500/20'}`}>
                {resendEnabled ? 'Resend email enabled' : 'Resend email NOT enabled'}
              </span>
              {resendAudienceId ? (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-slate-700/60 text-slate-200 border border-white/10">
                  Audience configured
                </span>
              ) : null}
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              This page shows all newsletter signups saved in the local subscriber store. Refresh the page to get the latest list.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AdminLogout />
            <Link
              href="/admin/messages"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              View Messages
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
          {subscribers.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
              No newsletter subscribers have been recorded yet.
            </div>
          ) : (
            subscribers.map((subscriber) => (
              <article
                key={subscriber.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">
                      {subscriber.unsubscribed ? 'Unsubscribed' : 'Subscribed'}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{subscriber.name || subscriber.email}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      <a className="text-gold underline" href={`mailto:${subscriber.email}`}>{subscriber.email}</a>
                    </p>
                  </div>
                  <time className="text-sm text-slate-400">
                    {new Date(subscriber.subscribed_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-brand-900/70 p-5 text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Status:</span>{' '}
                    {subscriber.unsubscribed ? 'Unsubscribed' : 'Subscribed'}
                  </p>
                  <p className="mt-3">
                    <span className="font-semibold text-white">ID:</span> {subscriber.id}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
