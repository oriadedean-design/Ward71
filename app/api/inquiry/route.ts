import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/client';
import { sendTeamEmail } from '@/lib/email';

const CATEGORIES = [
  'Housing',
  'Community Safety',
  'Streets and Parks',
  'Youth and Family',
  'Seniors',
  'Small Business',
  'Other',
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, postalCode, category, message } = body ?? {};

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'A message is required.' }, { status: 400 });
    }

    await writeClient.create({
      _type: 'inquiry',
      name: name.trim(),
      email: email.trim(),
      postalCode: postalCode?.trim() || undefined,
      category: CATEGORIES.includes(category) ? category : 'Other',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'New',
    });

    // Already saved in Sanity, so a failed email shouldn't fail the submission.
    const topic = CATEGORIES.includes(category) ? category : 'Other';
    try {
      await sendTeamEmail({
        subject: `Community inquiry (${topic}): ${name.trim()}`,
        heading: 'New community inquiry',
        intro: `${name.trim()} sent a message about ${topic} through the Community page.`,
        rows: [
          ['Name', name.trim()],
          ['Email', email.trim()],
          ['Postal code', postalCode?.trim()],
          ['Topic', topic],
        ],
        message: message.trim(),
        nextStep: `Reply to this email to respond to ${name.trim()} directly. The inquiry is also saved in Sanity Studio under Inquiries.`,
        replyTo: email.trim(),
      });
    } catch (emailError) {
      console.error('Inquiry notification email failed:', emailError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json({ error: 'Failed to send your message. Please try again.' }, { status: 500 });
  }
}
