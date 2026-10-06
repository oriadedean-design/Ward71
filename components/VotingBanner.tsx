'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Site-wide link to the voting guide during the 2026 election period.
// Text and on/off switch: Sanity Studio → Site Settings → Voting banner.
export function VotingBanner({
  enabled,
  text,
  linkText,
}: {
  enabled: boolean
  text: string
  linkText: string
}) {
  const pathname = usePathname()
  if (!enabled || pathname === '/resources' || pathname.startsWith('/studio')) return null

  return (
    <div className="bg-brand-mustard text-brand-slate px-4 py-2.5 text-center text-sm leading-snug">
      <span className="font-medium">{text}</span>{' '}
      <Link
        href="/resources"
        className="font-bold underline underline-offset-2 hover:opacity-80 whitespace-nowrap"
      >
        {linkText}
      </Link>
    </div>
  )
}
