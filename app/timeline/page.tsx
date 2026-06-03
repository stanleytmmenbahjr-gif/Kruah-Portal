import Link from 'next/link';
import Timeline from '../../components/Timeline';

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-95" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Leadership timeline</p>
          <h1 className="mt-4 text-5xl font-semibold text-white">Cornelia’s journey in leadership and national service.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore the milestones that have defined her career, from legal practice to youth empowerment and national governance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/50 hover:bg-white/10">
              Back to home
            </Link>
          </div>
        </div>
        <Timeline />
      </div>
    </main>
  );
}
