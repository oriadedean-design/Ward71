import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support Lorna Antwi\'s grassroots campaign for Toronto City Council Ward 7. No corporate money — just neighbours helping neighbours build a stronger community.',
  openGraph: {
    title: 'Donate | Lorna Antwi for Toronto City Council',
    description: 'Power a grassroots campaign. Our goal is $25,000 — every dollar goes directly into community outreach in Ward 7.',
    url: 'https://lornaantwi.ca/donate',
  },
  alternates: { canonical: 'https://lornaantwi.ca/donate' },
}

export default function DonateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
