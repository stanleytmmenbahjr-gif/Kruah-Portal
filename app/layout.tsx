import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Inter, Poppins } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Cornelia Wonkerleh Kruah | Leadership Portfolio',
  description: 'Premium personal brand website for Cornelia Wonkerleh Kruah — Liberian lawyer, politician, and youth advocate.',
  metadataBase: new URL('https://example.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-brand-900 text-white">
      <body className={`${playfair.variable} ${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
