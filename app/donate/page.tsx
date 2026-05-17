import { Metadata } from 'next'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import DonateClient from './DonateClient'

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

export default async function DonatePage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ candidatePhoto }`)
  const heroImageUrl = settings?.candidatePhoto
    ? urlFor(settings.candidatePhoto).width(224).height(224).fit('crop').url()
    : null

  return <DonateClient heroImageUrl={heroImageUrl} />
}
