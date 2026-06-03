'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setMessageType(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
        setName('');
      } else {
        setMessageType('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-gold/5 to-transparent p-8">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-6 w-6 text-gold" />
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Stay Connected</p>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Join the Leadership Conversation</h3>
        <p className="text-slate-300 mb-6">
          Get exclusive insights on governance, youth empowerment, and policy innovation delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="newsletter-name" className="block text-sm font-medium text-slate-300 mb-2">
                Name (Optional)
              </label>
              <input
                type="text"
                id="newsletter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Subscribe to Updates
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}