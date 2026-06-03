import Link from 'next/link';
import Press from '../../components/Press';

export default function PressPage() {
  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl">
            <div>
             
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Press & Interviews</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                A dedicated media hub for press coverage, official resources, and interview requests.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/50 hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
          <Press />
        </div>
      </div>
    </main>
  );
}