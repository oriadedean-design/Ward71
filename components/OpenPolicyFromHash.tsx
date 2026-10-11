'use client';

import { useEffect } from 'react';

// Opens the policy named in the address (e.g. /platform#fast-track-housing-
// development-on-public-land) so direct links land on an expanded policy.
export function OpenPolicyFromHash({ ids }: { ids: string[] }) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!ids.includes(id)) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: 'start' });
      }
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, [ids]);

  return null;
}
