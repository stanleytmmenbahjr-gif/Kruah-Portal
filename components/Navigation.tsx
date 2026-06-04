'use client';

import Link from 'next/link';
import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Users,
  GraduationCap,
  Scale,
  Megaphone,
  Image,
  Newspaper,
} from 'lucide-react';

const mainMenus: {
  initiatives: { label: string; href: string; icon: ReactNode }[];
  content: { label: string; href: string; icon: ReactNode }[];
} = {
  initiatives: [
    { label: 'Roles & Opportunities', href: '/roles', icon: <Users className="h-5 w-5" /> },
    { label: 'Legal Career Path', href: '/legal-career', icon: <Scale className="h-5 w-5" /> },
    { label: 'Advocacy & Impact', href: '/advocacy-impact', icon: <Megaphone className="h-5 w-5" /> },
    { label: 'Youth Empowerment', href: '/youth-empowerment', icon: <GraduationCap className="h-5 w-5" /> },
  ],
  content: [
    { label: 'Gallery', href: '/gallery', icon: <Image className="h-5 w-5" /> },
    { label: 'Press', href: '/press', icon: <Newspaper className="h-5 w-5" /> },
  ],
};

const DropdownMenu = ({ items, title }: { items: { label: string; href: string; icon: ReactNode }[]; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute left-0 mt-0 w-56 rounded-xl bg-brand-800/95 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
  >
            <div className="px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">{title}</p>
      <div className="space-y-1">
            {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-gold transition group"
          >
            <span className="text-lg text-slate-300 group-hover:text-gold group-hover:scale-110 transition-transform transition-colors">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="relative z-50 border-b border-white/10 bg-brand-900/90 backdrop-blur-xl sticky top-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-16">
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="text-lg md:text-xl font-bold tracking-[0.3em] text-white hover:text-gold transition flex-shrink-0">
            CWK
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Initiatives Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setDesktopDropdown('initiatives')}
                onMouseLeave={() => setDesktopDropdown(null)}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-gold transition rounded-lg hover:bg-white/5"
              >
                Initiatives
                <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
              </button>
              <AnimatePresence>
                {desktopDropdown === 'initiatives' && (
                  <div
                    onMouseEnter={() => setDesktopDropdown('initiatives')}
                    onMouseLeave={() => setDesktopDropdown(null)}
                  >
                    <DropdownMenu items={mainMenus.initiatives} title="Initiatives" />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setDesktopDropdown('content')}
                onMouseLeave={() => setDesktopDropdown(null)}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-gold transition rounded-lg hover:bg-white/5"
              >
                Content
                <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
              </button>
              <AnimatePresence>
                {desktopDropdown === 'content' && (
                  <div
                    onMouseEnter={() => setDesktopDropdown('content')}
                    onMouseLeave={() => setDesktopDropdown(null)}
                  >
                    <DropdownMenu items={mainMenus.content} title="Content" />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link href="#contact" className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-gold transition rounded-lg hover:bg-white/5">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/10 bg-brand-800/70 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
              {/* Initiatives Section */}
              <div>
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'initiatives' ? null : 'initiatives')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300 hover:bg-white/10 hover:text-gold rounded-lg transition"
                >
                  <span>Initiatives</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileSubmenu === 'initiatives' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileSubmenu === 'initiatives' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 mt-1"
                    >
                      {mainMenus.initiatives.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-gold rounded-lg transition"
                        >
                          <span className="h-5 w-5 flex-shrink-0">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Section */}
              <div>
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'content' ? null : 'content')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300 hover:bg-white/10 hover:text-gold rounded-lg transition"
                >
                  <span>Content</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileSubmenu === 'content' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileSubmenu === 'content' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 mt-1"
                    >
                      {mainMenus.content.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-gold rounded-lg transition"
                        >
                          <span className="h-5 w-5 flex-shrink-0">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Links */}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300 hover:bg-white/10 hover:text-gold rounded-lg transition"
              >
                Contact
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
