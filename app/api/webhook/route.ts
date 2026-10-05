import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { writeClient } from '@/sanity/client';
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
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const m = intent.metadata;
      const amountCad = Number(m.amount_cad);

      // 1. Create donation record in Sanity
      await writeClient.create({
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

      // 2. Increment the primary donation milestone
      const milestone = await writeClient.fetch(
        `*[_type == "donationMilestone"] | order(order asc) [0]`
      );
      if (milestone?._id) {
        await writeClient
          .patch(milestone._id)
          .inc({ currentAmount: amountCad, donorCount: 1 })
          .commit();
      }

      // 3. Notify the team. Caught so Stripe doesn't retry the webhook and
      //    create a duplicate donation record.
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

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
