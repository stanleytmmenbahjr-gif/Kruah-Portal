import Link from 'next/link';
import SocialMedia from '../../components/SocialMedia';
import { ArrowLeft } from 'lucide-react';

export default function SocialMediaPage() {
  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
          <ArrowLeft className="h-4 w-4" /> Back to homepage
        </Link>
      </div>

      <SocialMedia />
    </main>
  );
}
