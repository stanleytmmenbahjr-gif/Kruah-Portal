'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter the admin password.');
      return;
    }

    setStatus('submitting');

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.replace('/admin/messages');
      return;
    }

    const body = await response.json();
    setError(body?.error || 'Invalid password');
    setStatus('error');
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
          <Lock className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-white">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Enter the admin password to view submitted contact messages.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-300">
          Admin password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-3 w-full rounded-3xl border border-white/10 bg-brand-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Password"
          />
        </label>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Signing in...' : 'Sign in'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
