import { NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { writeClient } from '@/sanity/client';
import { inboxId } from '@/lib/inbox';
import { addContactToSegment } from '@/lib/resendContacts';
import {
  SIGNATURE_TYPE,
  countSignatures,
  getPetition,
  isPetitionClosed,
  nameKey,
  networkHash,
  signaturesFromNetwork,
} from '@/lib/petition';

// Signing the petition. Only the full name is required; email and comment are
// optional and never published. No team email is sent per signature, so a
// busy day can't use up the email quota that donation alerts depend on.

const MAX_BODY = 8_000; // bytes; a real signature is far smaller
const MAX_PER_NETWORK_PER_HOUR = 10; // households and workplaces share a connection
const LIMITS = { fullName: 100, email: 254, comment: 2_000 };
const CONSENTS = ['anonymousQuote', 'petitionUpdates', 'communityProjects', 'campaignUpdates'] as const;
// Updates need somewhere to send them.
const EMAIL_CONSENTS = new Set(['petitionUpdates', 'communityProjects', 'campaignUpdates']);

const error = (message: string, status = 400) => NextResponse.json({ error: message }, { status });

// BotID wrongly flags some real people (in-app browsers such as Instagram's,
// privacy browsers, older phones), so a failed check never blocks a signature.
// It's saved and marked for review in the Studio instead. A fault in the
// check itself counts as a pass. The rate limit, duplicate check and hidden
// field still apply.
async function isBot(): Promise<boolean> {
  try {
    return (await checkBotId()).isBot;
  } catch (err) {
    console.error('BotID check unavailable, continuing without it:', err);
    return false;
  }
}

function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: Request) {
  try {
    if (isPetitionClosed()) return error('This petition has closed. Thank you for your support.', 410);

    const browserCheckFailed = await isBot();

    const raw = await req.text();
    if (raw.length > MAX_BODY) return error('Your submission is too long.', 413);
    const body = (JSON.parse(raw || '{}') ?? {}) as Record<string, unknown>;

    // Hidden field that people never see; bots that fill every field do.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const fullName = String(body.fullName ?? '').replace(/\s+/g, ' ').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const comment = String(body.comment ?? '').trim();

    if (fullName.length < 2 || !/\p{L}/u.test(fullName)) return error('Please enter your full name.');
    if (fullName.length > LIMITS.fullName) return error('Please shorten your name.');
    if (/[<>{}\\]|https?:|www\./i.test(fullName)) return error('Please enter your name only.');
    if (email && (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return error('Please check your email address, or leave it blank.');
    }
    if (comment.length > LIMITS.comment) return error(`Please keep your comment under ${LIMITS.comment} characters.`);

    const petition = getPetition();
    if (!petition) return error('The petition is unavailable right now. Please try again shortly.', 503);

    const network = networkHash(clientIp(req));
    const key = nameKey(fullName);
    const fromNetwork = await signaturesFromNetwork(petition.id, network);
    // Same name from the same connection: already signed, don't count twice.
    if (fromNetwork.some((s) => s.nameKey === key)) {
      return NextResponse.json({ ok: true, alreadySigned: true, count: await countSignatures(petition.id, { live: true }) });
    }
    const hourAgo = Date.now() - 60 * 60 * 1000;
    if (fromNetwork.filter((s) => Date.parse(s.signedAt) > hourAgo).length >= MAX_PER_NETWORK_PER_HOUR) {
      return error('Many signatures have come from this connection recently. Please try again in an hour.', 429);
    }

    const consents = Object.fromEntries(
      CONSENTS.map((c) => [c, body[c] === true && (!EMAIL_CONSENTS.has(c) || email !== '')])
    ) as Record<(typeof CONSENTS)[number], boolean>;

    await writeClient.create({
      _id: inboxId(),
      _type: SIGNATURE_TYPE,
      petitionId: petition.id,
      fullName,
      email: email || undefined,
      comment: comment || undefined,
      ...consents,
      signedAt: new Date().toISOString(),
      status: 'Counted',
      nameKey: key,
      networkHash: network,
      browserCheck: browserCheckFailed ? 'Failed' : 'Passed',
    });

    // The campaign's mailing list is only for people who asked to join it.
    if (consents.campaignUpdates) await addContactToSegment('subscribers', email, fullName);

    return NextResponse.json({ ok: true, count: await countSignatures(petition.id, { live: true }) });
  } catch (err) {
    console.error('Petition signature error:', err);
    return error('Something went wrong. Please try again.', 500);
  }
}
