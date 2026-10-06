import { NextResponse } from 'next/server'
import { sendTeamEmail } from '@/lib/email'
import { writeClient } from '@/sanity/client'
import { inboxId } from '@/lib/inbox'

export async function POST(req: Request) {
  try {
    const { name, email, phone, postalCode, role, availability } = await req.json()

    if (!name || !email || !phone || !postalCode || !role || !availability) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // Keep a record in Sanity (Inbox → Volunteer Submissions); the email is the
    // main notification, so only a failed email returns an error.
    try {
      await writeClient.create({
        _id: inboxId(),
        _type: 'volunteerSubmission',
        name,
        email,
        phone,
        postalCode,
        calculatedRole: role,
        availability,
        submittedAt: new Date().toISOString(),
        status: 'New',
      })
    } catch (saveError) {
      console.error('Failed to save volunteer to Sanity:', saveError)
    }

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
