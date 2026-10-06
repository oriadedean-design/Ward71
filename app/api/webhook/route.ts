import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { writeClient } from '@/sanity/client';
import { inboxId } from '@/lib/inbox';
import { addContactToSegment } from '@/lib/resendContacts';
import { sendTeamEmail } from '@/lib/email';
import { CONTRIBUTION_LIMITS } from '@/lib/compliance';

// Initialised lazily so the module loads cleanly at build time
// without requiring STRIPE_SECRET_KEY to be present.
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature error: ${err.message}`);
      // Details stay in the server logs; callers only learn the request was rejected.
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const m = intent.metadata;
      // Stripe's own total is authoritative; metadata is the fallback.
      const amountCad = intent.amount_received
        ? intent.amount_received / 100
        : Number(m.amount_cad);

      // One record per PaymentIntent. Stripe retries webhooks, so a repeat
      // delivery finds the existing record and does nothing (no duplicate
      // record or email). The progress bar is updated by hand in Sanity.
      const recordId = inboxId(`donation-${intent.id}`);
      if (await writeClient.getDocument(recordId)) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      // 1. Create donation record in Sanity
      await writeClient.createIfNotExists({
        _id: recordId,
        _type: 'donationRecord',
        donorName: m.donor_name,
        donorEmail: m.donor_email,
        donorPhone: m.donor_phone,
        donorAddress: {
          street: m.donor_street,
          city: m.donor_city,
          province: m.donor_province,
          postalCode: m.donor_postal_code,
          country: m.donor_country ?? 'Canada',
        },
        amount: amountCad,
        stripePaymentIntentId: intent.id,
        ontarioResidencyConfirmed: m.residency_confirmed === 'true',
        selfAttested: m.self_attested === 'true',
        contributorType: m.contributor_type,
        paidAt: new Date().toISOString(),
        receiptSent: false,
        status: 'completed',
      });

      // 2. Add to the Resend "Donors" segment (never throws).
      await addContactToSegment('donors', m.donor_email, m.donor_name);

      // 3. Notify the team. Caught so a failed email doesn't make Stripe retry.
      try {
        const disclosed = amountCad > CONTRIBUTION_LIMITS.publicDisclosureThreshold;
        const receipt = amountCad > CONTRIBUTION_LIMITS.receiptThreshold;
        await sendTeamEmail({
          subject: `New donation: $${amountCad} from ${m.donor_name}`,
          heading: `New donation of $${amountCad} CAD`,
          intro: `${m.donor_name} made a contribution through the website. Payment was confirmed by Stripe.`,
          rows: [
            ['Amount', `$${amountCad} CAD`],
            ['Donor', m.donor_name],
            ['Email', m.donor_email],
            ['Phone', m.donor_phone],
            ['Address', [m.donor_street, m.donor_city, m.donor_province, m.donor_postal_code].filter(Boolean).join(', ')],
            ['Contributor type', m.contributor_type],
            ['Ontario residency confirmed', m.residency_confirmed === 'true' ? 'Yes' : 'No'],
            ['Self-attested eligibility', m.self_attested === 'true' ? 'Yes' : 'No'],
            ['Receipt required', receipt ? `Yes (over $${CONTRIBUTION_LIMITS.receiptThreshold})` : 'No'],
            ['Public disclosure', disclosed ? `Yes (over $${CONTRIBUTION_LIMITS.publicDisclosureThreshold})` : 'No'],
            ['Stripe payment ID', intent.id],
          ],
          nextStep: receipt
            ? `Issue an official contribution receipt to ${m.donor_name} and send a thank-you. The record is saved in Sanity Studio under Donation Records.`
            : `Send ${m.donor_name} a thank-you. The record is saved in Sanity Studio under Donation Records.`,
          replyTo: m.donor_email,
        });
      } catch (emailError) {
        console.error('Donation notification email failed:', emailError);
      }
    }

    // Refunds: reduce the recorded amount, and mark the record refunded when the
    // whole payment is returned.
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      const intentId =
        typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
      const recordId = intentId ? inboxId(`donation-${intentId}`) : null;
      if (recordId && (await writeClient.getDocument(recordId))) {
        const fullyRefunded = charge.amount_refunded >= charge.amount;
        await writeClient
          .patch(recordId)
          .set(
            fullyRefunded
              ? { status: 'refunded' }
              : { amount: (charge.amount - charge.amount_refunded) / 100 }
          )
          .commit();
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
