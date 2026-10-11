import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Volunteer in Ward 7',
  description: 'Join the Lorna Antwi campaign team in Ward 7. Find your role: door knocking, phone banking, event support, social media and more.',
  openGraph: {
    title: 'Volunteer | Lorna Antwi for Toronto City Council',
    description: 'Join the team. From door knocking to phone banking, every role matters in our grassroots campaign for Ward 7.',
    url: 'https://www.lornaantwi.com/volunteer',
  },
  alternates: { canonical: 'https://www.lornaantwi.com/volunteer' },
}

export default function VolunteerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
