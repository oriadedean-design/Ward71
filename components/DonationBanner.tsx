'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HIDE_ON = ['/', '/donate', '/thank-you']
const AMOUNTS = [25, 50, 100, 250]

export function DonationBanner() {
  const pathname = usePathname()
  if (HIDE_ON.includes(pathname)) return null

  return (
    <section className="bg-brand-slate text-brand-cream py-7 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">

        {/* Label */}
        <div className="flex-shrink-0">
          <p className="font-fraunces font-bold text-xl md:text-2xl leading-tight">
            Support Lorna Antwi
          </p>
          <p className="text-brand-cream/50 text-sm mt-0.5">
            No corporate money. Just neighbours.
          </p>
        </div>

        {/* Amount buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          {AMOUNTS.map(a => (
            <Link
              key={a}
              href={`/donate?amount=${a}`}
              className="min-w-[68px] text-center bg-white/8 hover:bg-brand-mustard hover:text-brand-slate text-brand-cream border border-white/15 px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-150"
            >
              ${a}
            </Link>
          ))}
          <Link
            href="/donate"
            className="flex items-center gap-1.5 bg-brand-red text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-opacity-90 transition-opacity"
          >
            Other →
          </Link>
        </div>

      </div>
    </section>
  )
}
