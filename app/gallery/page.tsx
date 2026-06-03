import Link from 'next/link';
import GalleryPortfolio from '../../components/GalleryPortfolio';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-glass transition hover:bg-white/10">
            <Link href="/" className="flex items-center gap-2">
              <span aria-hidden="true">←</span>
              Back to Home
            </Link>
          </div>
          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Gallery & Media</p>
            <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Photo and video portfolio showcasing leadership in action.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A curated collection of moments from community engagements, leadership forums, speaking events, and transformative initiatives across Liberia and beyond.
            </p>
          </div>
          <GalleryPortfolio />
        </div>
      </div>
    </main>
  );
}

