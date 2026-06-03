import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f172a',
          800: '#111827',
          700: '#1f2937',
          gold: '#d4af37',
          cream: '#f5f5f5',
        },
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(212,175,55,0.16), transparent 28%), radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 16%)',
      },
    },
  },
  plugins: [],
};

export default config;
