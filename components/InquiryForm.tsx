'use client';

import { useState } from 'react';

const CATEGORIES = [
  'Housing',
  'Community Safety',
  'Streets and Parks',
  'Youth and Family',
  'Seniors',
  'Small Business',
  'Other',
];

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      postalCode: data.get('postal'),
      category: data.get('category'),
      message: data.get('message'),
    };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Failed to send your message. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <p className="text-xl font-medium text-brand-mustard">
        Thank you. Lorna's team will reach out within 48 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium" htmlFor="postal">Postal Code</label>
        <input id="postal" name="postal" type="text" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" maxLength={7} />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium" htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue="Housing" className="px-5 py-4 rounded-xl text-brand-slate bg-white focus:outline-none focus:ring-2 focus:ring-brand-mustard">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium" htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required></textarea>
      </div>
      {error && <p className="text-brand-mustard font-medium">{error}</p>}
      <button type="submit" disabled={status === 'submitting'} className="bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-opacity mt-2 disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
