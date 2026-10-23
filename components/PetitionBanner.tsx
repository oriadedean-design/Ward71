'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Site-wide strip promoting the TTC Finch West petition while signing is open.
// The layout shows it in place of the voting banner until `closesAt`; the time
// is also checked in the browser, so a cached page drops it once signing closes.
export function PetitionBanner({ closesAt, href }: { closesAt: string; href: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(Date.now() <= new Date(closesAt).getTime()), [closesAt])
  if (!open || pathname === href || pathname.startsWith('/studio')) return null

  return (
    <div className="bg-brand-mustard text-on-gold px-4 py-2.5 text-center text-sm leading-snug">
      <span className="font-medium">Finch West lost its local bus. Help bring it back before winter. Sign by Monday, Oct 26.</span>{' '}
      <Link href={href} className="font-bold underline underline-offset-2 hover:opacity-80 whitespace-nowrap">
        Sign the petition →
      </Link>
    </div>
  )
}
