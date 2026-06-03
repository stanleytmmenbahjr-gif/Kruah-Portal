'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { MessageCircle, RefreshCcw, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    text: 'Hello! I’m Cornelia’s digital assistant. Ask me about her leadership, youth advocacy, governance priorities, or speaking availability.',
  },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const latestMessage = useMemo(() => messages[messages.length - 1], [messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please type a question.');
      return;
    }

    const userMessage: Message = { role: 'user', text: input.trim() };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to get a response from the assistant right now.');
      }

      const assistantText = data.answer ?? 'I’m sorry, I could not answer that right now.';
      setMessages((current) => [...current, { role: 'assistant', text: assistantText }] );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to get a response from the assistant right now.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-3xl border border-white/10 bg-brand-900/95 shadow-glass backdrop-blur-xl sm:right-8">
      <div className="flex items-center justify-between gap-3 rounded-t-3xl bg-brand-800 px-5 py-4">
        <div className="flex items-center gap-3 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gold text-black">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Hey Let's Chat!</p>
            <p className="text-xs text-slate-400">Ask about Cornelia’s vision, leadership, and events.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen((current) => !current)} className="rounded-full bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10">
            {open ? 'Close' : 'Open'}
          </button>
          <button onClick={() => setMessages(initialMessages)} className="rounded-full bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10" aria-label="Reset conversation">
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-3 px-5 py-4">
          <div className="max-h-72 space-y-3 overflow-y-auto pr-2 text-sm">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-3xl p-4 ${message.role === 'assistant' ? 'bg-white/5 text-slate-100' : 'bg-gold/10 text-gold'} ${message.role === 'assistant' ? 'ml-0' : 'ml-auto'}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex flex-col gap-3">
            <label className="sr-only" htmlFor="chat-input">Ask a question</label>
            <input
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="Ask Cornelia’s AI assistant"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">{latestMessage?.text.slice(0, 40)}...</p>
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Sending...' : 'Send'}
                <Send className="h-4 w-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
