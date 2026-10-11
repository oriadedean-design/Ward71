'use client';

import { useEffect } from 'react';

// Policies used to live on /platform. Links shared before they moved
// (/platform#housing, /platform#<policy id>) go to the policy's own page.
export function RedirectOldPolicyLinks({ moved }: { moved: Record<string, string> }) {
  useEffect(() => {
    const target = moved[decodeURIComponent(window.location.hash.slice(1))];
    if (target) window.location.replace(target);
  }, [moved]);

  return null;
}
