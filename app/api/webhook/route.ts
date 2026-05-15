import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const amountTotal = session.amount_total;
      
      if (amountTotal) {
        // Here you would find the primary donation Milestone in Sanity and increment its currentAmount
        // using the Sanity Node client (which needs a write token)
        
        /* 
        import { createClient } from 'next-sanity';
        
        const writeClient = createClient({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          apiVersion: '2024-03-24',
          useCdn: false,
          token: process.env.SANITY_API_WRITE_TOKEN
        });

        // 1. Fetch the active milestone document (example query)
        // const milestone = await writeClient.fetch(`*[_type == "donationMilestone"] | order(order asc) [0]`);
        
        // 2. Increment the amount by the donation amount (amount_total is in cents, so divide by 100)
        // if (milestone) {
        //   await writeClient.patch(milestone._id)
        //     .inc({ currentAmount: amountTotal / 100 })
        //     .commit();
        // }
        */

        console.log(`Payment successful for $${amountTotal / 100}. Sanity document would be updated here.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook payload error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
