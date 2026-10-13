'use client';

import { useEffect, useState } from 'react';

// Public signature count. Starts from the server's number, checks once on
// load, then every 20 seconds while the page is visible. A signature made on
// this page updates it straight away (see PetitionForm).

export const COUNT_EVENT = 'petition:count';

export function PetitionCounter({ initial, label, size = 'large' }: { initial: number; label: string; size?: 'large' | 'small' }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    let stopped = false;
    const refresh = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const res = await fetch('/api/petition/count');
        const data = await res.json();
        if (!stopped && typeof data.count === 'number') setCount((c) => Math.max(c, data.count));
      } catch {
        // Keep showing the last known number.
      }
    };
    refresh(); // the page's number can be up to 30 seconds old
    const timer = setInterval(refresh, 20_000);
    const onSigned = (e: Event) => setCount((c) => Math.max(c, (e as CustomEvent<number>).detail));
    window.addEventListener(COUNT_EVENT, onSigned);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      stopped = true;
      clearInterval(timer);
      window.removeEventListener(COUNT_EVENT, onSigned);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return (
    <div aria-live="polite">
      <p className={`font-fraunces font-bold text-ink tabular-nums leading-none ${size === 'large' ? 'text-5xl md:text-6xl' : 'text-4xl'}`}>
        {count.toLocaleString('en-CA')}
      </p>
      <p className="mt-2 text-sm font-semibold text-ink/70">{label}</p>
    </div>
  );
}
