import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cornelia Wonkerleh Kruah | Leadership Portfolio',
  description: 'Premium personal brand website for Cornelia Wonkerleh Kruah — Liberian lawyer, politician, and youth advocate.',
  metadataBase: new URL('https://example.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-brand-900 text-white">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
