import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/client';

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json({ error: 'Failed to send your message. Please try again.' }, { status: 500 });
  }
}
