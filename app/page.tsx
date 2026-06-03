'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Twitter, Facebook, Sparkles } from 'lucide-react';
import Biography from '../components/Biography';
import Impact from '../components/Impact';
import Testimonials from '../components/Testimonials';
import { Chatbot } from '../components/Chatbot';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';
import { useState } from 'react';

const stats = [
  { label: 'Years in Service', value: '14+' },
  { label: 'Youth Mentored', value: '120+' },
  { label: 'Policy Initiatives', value: '18' },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-900 text-white">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />

      <Navigation />

      <section id="hero" className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[url('/images/image.png')] bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-4 py-2 text-sm text-gold backdrop-blur-sm">
                Presidential presence with modern African clarity
              </div>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                  Cornelia Wonkerleh Kruah
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-200">
                  Liberian lawyer, national leader, political economist, and youth advocate dedicated to public service, women empowerment, and transformative governance.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400">
                  Collaborate and book now
                  <ArrowRight size={18} />
                </Link>
                <Link href="#roles" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-gold/60 hover:bg-white/10">
                  Explore current roles
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-[#141b2a] p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Vision statement</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">THE PARADIGM SHIFT</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-3xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-white/10 bg-brand-800/70 p-6">
                  <div className="flex items-center gap-4">
                    <Sparkles className="h-8 w-8 text-gold" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Key focus</p>
                      <p className="mt-2 text-white">Youth leadership, women empowerment, governance, policy, and legal excellence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center shadow-glass backdrop-blur-xl">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Biography />

      <Impact />

      <Testimonials />

      <section id="contact" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Let’s connect</p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Start a strategic collaboration with Cornelia.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Share your initiative, speaking request, or partnership idea and a member of the team will follow up with next steps.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-brand-800/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Email</p>
                <p className="mt-3 text-lg font-semibold text-white">info@cornelia-wk.com</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-brand-800/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Availability</p>
                <p className="mt-3 text-lg font-semibold text-white">Speaking, policy advisory, and program partnerships</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm uppercase tracking-[0.3em] text-gold mb-6">Follow Cornelia</p>
              <div className="flex gap-6">
                <a href="https://twitter.com/CorneliaWK" target="_blank" rel="noopener noreferrer" title="Twitter" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition hover:border-gold/50 hover:bg-gold/10">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/cornelia-wonkerleh-kruah" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition hover:border-gold/50 hover:bg-gold/10">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/cornelia_wk" target="_blank" rel="noopener noreferrer" title="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition hover:border-gold/50 hover:bg-gold/10">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/cornelia.wonkerleh.kruah" target="_blank" rel="noopener noreferrer" title="Facebook" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition hover:border-gold/50 hover:bg-gold/10">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Newsletter />

            <div className="mt-10">
              <p className="text-sm uppercase tracking-[0.3em] text-gold mb-6">Send a Message</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="Tell us about your initiative, speaking request, or partnership idea..."
                  />
                </div>
                {submitMessage && (
                  <p className={`text-sm ${submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                    {submitMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Chatbot />
    </main>
  );
}
