'use client';

import { useState } from 'react';

// Share buttons for the petition: the phone's own share sheet (or copy the
// link on computers), plus direct links for the common apps.

const PETITION_URL = 'https://www.lornaantwi.com/TTCpetition';
const SHARE_TEXT = 'Sign the petition to restore safe, accessible local bus service on Finch West before winter.';
const EMAIL_SUBJECT = 'Please sign: Restore local transit on Finch West';

export function SharePetition({
  shareUrl = PETITION_URL,
  shareText = SHARE_TEXT,
  label = 'Share the petition',
  className = '',
}: {
  shareUrl?: string;
  shareText?: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = encodeURIComponent(shareUrl);
  const text = encodeURIComponent(shareText);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'X', href: `https://x.com/intent/post?text=${text}&url=${url}` },
    { label: 'Email', href: `mailto:?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${text}%0A%0A${url}` },
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
    await copy();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Copy this link:', shareUrl);
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        type="button"
        onClick={share}
        className="w-full min-h-[52px] rounded-full bg-brand-mustard text-on-gold font-bold text-lg px-8 py-3 hover:opacity-90 transition-opacity"
      >
        {copied ? 'Link copied!' : label}
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
        <button
          type="button"
          onClick={copy}
          className="min-h-[44px] inline-flex items-center rounded-full border border-ink/20 px-4 font-semibold text-ink hover:border-accent hover:text-accent"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
