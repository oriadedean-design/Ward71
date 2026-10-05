import { NextResponse } from 'next/server'
import { sendTeamEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { name, email, phone, postalCode, role, availability } = await req.json()

    if (!name || !email || !phone || !postalCode || !role || !availability) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // The email is the team's only record of this signup, so a failed send
    // returns an error and the volunteer can try again.
    await sendTeamEmail({
      subject: `New volunteer: ${name} (${role})`,
      heading: 'New volunteer signup',
      intro: `${name} signed up on the website to volunteer as ${role}.`,
      rows: [
        ['Name', name],
        ['Email', email],
        ['Phone', phone],
        ['Postal code', postalCode],
        ['Role', role],
        ['Availability', availability],
      ],
      nextStep: `The volunteer was told someone will be in touch within 48 hours. Reply to this email to reach ${name} directly.`,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Volunteer signup error:', error)
    return NextResponse.json({ error: 'Failed to process signup.' }, { status: 500 })
  }
}
