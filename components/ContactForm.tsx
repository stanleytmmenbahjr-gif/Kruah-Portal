'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Mail, Send } from 'lucide-react';

const initialState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please complete all required fields.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      setStatus('success');
      setFormData(initialState);
    } catch (err) {
      setError('Unable to submit message. Please try again later.');
      setStatus('error');
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-3xl bg-gold text-black">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Contact & Collaboration</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Partner with Cornelia for leadership, policy, and community impact.</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="rounded-3xl border border-white/10 bg-brand-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="rounded-3xl border border-white/10 bg-brand-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full rounded-3xl border border-white/10 bg-brand-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Share your collaboration idea or booking request"
          className="w-full rounded-3xl border border-white/10 bg-brand-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        {status === 'success' && <p className="text-sm text-emerald-300">Message successfully sent.</p>}

        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
