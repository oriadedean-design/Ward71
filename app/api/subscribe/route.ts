import { NextResponse } from 'next/server';
import { sendTeamEmail } from '@/lib/email';
import { writeClient } from '@/sanity/client';

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) ?? {};

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    // Keep a list in Sanity (Inbox → Email Subscribers); the email still goes out if this fails.
    try {
      await writeClient.create({
        _type: 'emailSubscriber',
        email: email.trim(),
        status: 'Active',
        submittedAt: new Date().toISOString(),
      });
    } catch (saveError) {
      console.error('Failed to save subscriber to Sanity:', saveError);
    }

    await sendTeamEmail({
      subject: `New subscriber: ${email.trim()}`,
      heading: 'New campaign subscriber',
      intro: 'Someone joined the campaign mailing list from the "Join the community" box on the home page.',
      rows: [['Email', email.trim()]],
      nextStep: 'Add this address to the campaign mailing list for updates.',
      replyTo: email.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
