'use client';

import { useState } from 'react';
import { COUNT_EVENT } from './PetitionCounter';

// The signature form, built from the fields and consent boxes in the petition
// export. Only the name is required.

interface Spec {
  fields: Array<{ name: string; label: string; type: string; required: boolean }>;
  consents: Array<{ name: string; label: string }>;
  note: string;
  submitLabel: string;
}

// Consent boxes that only mean something with an email address.
const NEEDS_EMAIL = new Set(['petitionUpdates', 'communityProjects', 'campaignUpdates']);

const INPUT =
  'w-full rounded-xl border border-ink/20 bg-surface px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent';

export function PetitionForm({ spec, shareUrl, shareText }: { spec: Spec; shareUrl: string; shareText: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [website, setWebsite] = useState(''); // hidden trap field for bots
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'already'>('idle');
  const [error, setError] = useState<string | null>(null);

  const email = (values.email ?? '').trim();
  const wantsUpdatesWithoutEmail = !email && [...NEEDS_EMAIL].some((c) => checked[c]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setState('sending');
    try {
      const res = await fetch('/api/petition/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...checked, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      if (typeof data.count === 'number') window.dispatchEvent(new CustomEvent(COUNT_EVENT, { detail: data.count }));
      setState(data.alreadySigned ? 'already' : 'done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setState('idle');
    }
  }

  if (state === 'done' || state === 'already') {
    return <ThankYou already={state === 'already'} shareUrl={shareUrl} shareText={shareText} />;
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      {spec.fields.map((f) => {
        const id = `petition-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          value: values[f.name] ?? '',
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValues((v) => ({ ...v, [f.name]: e.target.value })),
          className: INPUT,
        };
        return (
          <div key={f.name}>
            <label htmlFor={id} className="block font-semibold text-ink mb-1.5">
              {f.label}
              {f.required && <span className="text-accent" aria-hidden="true"> *</span>}
            </label>
            {f.type === 'textarea' ? (
              <textarea {...common} rows={4} maxLength={2000} />
            ) : (
              <input
                {...common}
                type={f.type === 'email' ? 'email' : 'text'}
                autoComplete={f.name === 'fullName' ? 'name' : f.type === 'email' ? 'email' : undefined}
                maxLength={f.type === 'email' ? 254 : 100}
              />
            )}
          </div>
        );
      })}

      {/* Bots fill in every field; people never see this one. */}
      <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
        <label htmlFor="petition-website">Website</label>
        <input id="petition-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Optional choices</legend>
        {spec.consents.map((c) => (
          <label key={c.name} className="flex items-start gap-3 min-h-[44px] cursor-pointer text-ink/85">
            <input
              type="checkbox"
              name={c.name}
              checked={!!checked[c.name]}
              onChange={(e) => setChecked((v) => ({ ...v, [c.name]: e.target.checked }))}
              className="mt-1 h-5 w-5 flex-shrink-0 accent-[var(--color-cta)]"
            />
            <span>{c.label}</span>
          </label>
        ))}
        {wantsUpdatesWithoutEmail && (
          <p className="text-sm font-semibold text-accent">Add your email address above to receive updates.</p>
        )}
      </fieldset>

      {spec.note && <p className="text-sm text-ink/70">{spec.note}</p>}
      <p className="text-sm text-ink/70">
        Your name will be included in the petition submitted to the TTC. Your email and comment are kept private and are never
        given to the TTC. Comments are only ever quoted anonymously, and only if you tick the box above.
      </p>

      {error && (
        <p role="alert" className="rounded-xl bg-accent/10 border border-accent/40 px-4 py-3 text-ink font-semibold">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full min-h-[52px] rounded-full bg-cta text-white font-bold text-lg px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {state === 'sending' ? 'Signing…' : spec.submitLabel}
      </button>
    </form>
  );
}

function ThankYou({ already, shareUrl, shareText }: { already: boolean; shareUrl: string; shareText: string }) {
  const [copied, setCopied] = useState(false);
  const url = encodeURIComponent(shareUrl);
  const text = encodeURIComponent(shareText);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'X', href: `https://x.com/intent/post?text=${text}&url=${url}` },
    { label: 'Email', href: `mailto:?subject=${encodeURIComponent('Please sign: Restore local transit on Finch West')}&body=${text}%0A%0A${url}` },
  ];

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
      } catch {
        // Closing the share sheet isn't an error.
      }
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  }

  return (
    <div className="text-center space-y-5 py-4" role="status">
      <p className="text-3xl font-fraunces font-bold text-ink">{already ? 'You’ve already signed. Thank you!' : 'Thank you for signing!'}</p>
      <p className="text-ink/80">
        The petition goes to the TTC on October 20. Every signature counts, so please ask friends, family and neighbours to sign too.
      </p>
      <button
        type="button"
        onClick={share}
        className="w-full min-h-[52px] rounded-full bg-brand-mustard text-on-gold font-bold text-lg px-8 py-3 hover:opacity-90 transition-opacity"
      >
        {copied ? 'Link copied!' : 'Share the petition'}
      </button>
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center rounded-full border border-ink/20 px-4 font-semibold text-ink hover:border-accent hover:text-accent"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
