import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialised lazily so the module loads cleanly at build time
// without requiring STRIPE_SECRET_KEY to be present.
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
}

import {
  CONTRIBUTION_LIMITS,
  isOntarioPostalCode,
  isValidContributionAmount,
  isValidCanadianPhone,
  isValidEmail,
  isValidFullName,
} from '@/lib/compliance';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, ontarioResident, selfAttested, contributorType, donor } = body;

    // --- Server-side eligibility re-validation ---

    if (!ontarioResident) {
      return NextResponse.json({ error: 'Ontario residency must be confirmed.' }, { status: 400 });
    }

    if (contributorType !== 'individual') {
      return NextResponse.json({ error: 'Only individual contributions are permitted.' }, { status: 400 });
    }

    if (!selfAttested) {
      return NextResponse.json({ error: 'Self-attestation must be confirmed.' }, { status: 400 });
    }

    // Amount validation
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    }
    const amountCheck = isValidContributionAmount(parsedAmount);
    if (!amountCheck.valid) {
      return NextResponse.json({ error: amountCheck.error }, { status: 400 });
    }

    // Donor field validation
    const { fullName, email, phone, streetAddress, city, province, postalCode } = donor ?? {};

    if (!fullName || !isValidFullName(fullName)) {
      return NextResponse.json({ error: 'Full legal name (first and last) is required.' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!phone || !isValidCanadianPhone(phone)) {
      return NextResponse.json({ error: 'A valid 10-digit Canadian phone number is required.' }, { status: 400 });
    }
    if (!streetAddress?.trim()) {
      return NextResponse.json({ error: 'Street address is required.' }, { status: 400 });
    }
    if (!city?.trim()) {
      return NextResponse.json({ error: 'City is required.' }, { status: 400 });
    }
    if (province !== 'ON') {
      return NextResponse.json({ error: 'Province must be Ontario.' }, { status: 400 });
    }
    if (!postalCode || !isOntarioPostalCode(postalCode)) {
      return NextResponse.json({ error: 'Postal code must be a valid Ontario postal code.' }, { status: 400 });
    }

    // --- All checks passed — create PaymentIntent ---

    const intent = await getStripe().paymentIntents.create({
      amount: Math.round(parsedAmount * 100), // cents
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      description: 'Lorna Antwi Campaign Contribution',
      receipt_email: email.trim(),
      metadata: {
        donor_name: fullName.trim(),
        donor_email: email.trim(),
        donor_phone: phone.trim(),
        donor_street: streetAddress.trim(),
        donor_city: city.trim(),
        donor_province: province,
        donor_postal_code: postalCode.trim().toUpperCase(),
        donor_country: 'Canada',
        amount_cad: String(parsedAmount),
        contributor_type: 'individual',
        residency_confirmed: 'true',
        self_attested: 'true',
        public_disclosure_applies: parsedAmount > CONTRIBUTION_LIMITS.publicDisclosureThreshold ? 'true' : 'false',
        receipt_required: parsedAmount > CONTRIBUTION_LIMITS.receiptThreshold ? 'true' : 'false',
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (error: any) {
    console.error('PaymentIntent error:', error);
    return NextResponse.json({ error: 'Failed to initialize payment. Please try again.' }, { status: 500 });
  }
}
