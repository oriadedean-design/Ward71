import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, phone, postalCode, role, availability } = await req.json()

    if (!name || !email || !phone || !postalCode || !role || !availability) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // TODO: replace console.log with an email delivery service (e.g. Resend)
    // Example with Resend:
    //   await resend.emails.send({
    //     from: 'campaign@lornaantwi.ca',
    //     to: 'votelornaantwi@gmail.com',
    //     subject: `New volunteer signup — ${role}`,
    //     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPostal: ${postalCode}\nRole: ${role}\nAvailability: ${availability}`,
    //   })

    console.log('Volunteer signup:', { name, email, phone, postalCode, role, availability })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to process signup.' }, { status: 500 })
  }
}
