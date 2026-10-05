'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Site-wide link to the voting guide during the 2026 election period.
// Remove after Election Day (October 26, 2026).
export function VotingBanner() {
  const pathname = usePathname()
  if (pathname === '/resources' || pathname.startsWith('/studio')) return null

  return (
    <div className="bg-brand-mustard text-brand-slate px-4 py-2.5 text-center text-sm leading-snug">
      <span className="font-medium">
        Advance voting Oct 6–11 · Election Day Mon, Oct 26.
      </span>{' '}
      <Link
        href="/resources"
        className="font-bold underline underline-offset-2 hover:opacity-80 whitespace-nowrap"
      >
        How to vote in Ward 7 →
      </Link>
    </div>
  )
}
