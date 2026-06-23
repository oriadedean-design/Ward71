import { Metadata } from 'next'
import { OurWardMap } from './OurWardMap'
import { WardStats } from '@/components/WardStats'

export const metadata: Metadata = {
  title: 'Our Ward | Lorna Antwi for Toronto City Council, Ward 7',
  description:
    'Neighbourhood by neighbourhood — what Lorna Antwi is hearing from residents across Humber River-Black Creek (Ward 7) and what she\'ll do about it.',
  alternates: { canonical: 'https://lornaantwi.ca/our-ward' },
  openGraph: {
    title: 'Our Ward, Block by Block | Lorna Antwi',
    description:
      'Explore what residents across Ward 7 are telling Lorna — from Jane & Finch to Downsview to Oakdale — and her platform response to each neighbourhood.',
    url: 'https://lornaantwi.ca/our-ward',
  },
}

export default function OurWardPage() {
  return (
    <>
      <OurWardMap />
      <WardStats />
    </>
  )
}
