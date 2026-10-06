'use client';

import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <p className="max-w-lg mx-auto px-6 py-4 rounded-full bg-brand-cream/10 border border-brand-cream/20 text-lg font-bold" role="status">
        Thanks for joining! We&apos;ll keep you updated.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="flex-1 px-6 py-4 rounded-full bg-surface text-ink font-medium text-lg border-2 border-ink/20 focus:border-brand-mustard focus:outline-none focus:ring-0"
          required
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-brand-mustard text-on-gold px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === 'submitting' ? 'Joining…' : 'Join Us'}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}
    </form>
  );
}
