import { Metadata } from 'next'
import { OurWardMap } from './OurWardMap'
import { WardStats } from '@/components/WardStats'

export const metadata: Metadata = {
  title: 'Ward 7: Humber River-Black Creek Neighbourhoods',
  description:
    'What ward am I in? Ward 7 covers Humber River-Black Creek in northwest North York, from Steeles to the 401 and the Humber River to Keele: Jane and Finch, Black Creek, Downsview, Humbermede, Humber Summit and more.',
  alternates: { canonical: 'https://www.lornaantwi.com/our-ward' },
  openGraph: {
    title: 'Ward 7: Humber River-Black Creek Neighbourhoods | Lorna Antwi',
    description:
      'The seven neighbourhoods of Ward 7, from Jane and Finch to Humber Summit to Oakdale-Beverley Heights, and what residents are telling Lorna Antwi.',
    url: 'https://www.lornaantwi.com/our-ward',
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
