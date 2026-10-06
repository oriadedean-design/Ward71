// Adds people to Resend contacts, grouped into segments for broadcasts.
// Needs a Full access RESEND_API_KEY and the segment ids below (set in Vercel).
// Never throws: a Resend problem must not block a signup or donation.

export type Segment = 'subscribers' | 'volunteers' | 'donors';

const SEGMENT_ENV: Record<Segment, string> = {
  subscribers: 'RESEND_SEGMENT_SUBSCRIBERS',
  volunteers: 'RESEND_SEGMENT_VOLUNTEERS',
  donors: 'RESEND_SEGMENT_DONORS',
};

function splitName(fullName?: string | null): { first_name?: string; last_name?: string } {
  const parts = (fullName ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') || undefined };
}

async function resend(path: string, init: RequestInit & { apiKey: string }) {
  const { apiKey, ...rest } = init;
  return fetch(`https://api.resend.com${path}`, {
    ...rest,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  });
}

export async function addContactToSegment(
  segment: Segment,
  email: string | null | undefined,
  fullName?: string | null
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env[SEGMENT_ENV[segment]];
  const address = email?.trim().toLowerCase();
  if (!apiKey || !segmentId || !address) return;

  try {
    // Create the contact if it's new. An existing contact (e.g. a volunteer
    // who later donates) is fine; we just add them to another segment below.
    const created = await resend('/contacts', {
      apiKey,
      method: 'POST',
      body: JSON.stringify({ email: address, ...splitName(fullName) }),
    });
    if (!created.ok && created.status !== 409 && created.status !== 422) {
      console.error(`Resend contact create failed (${created.status}):`, await created.text());
    }

    const added = await resend(`/contacts/${encodeURIComponent(address)}/segments/${segmentId}`, {
      apiKey,
      method: 'POST',
    });
    if (!added.ok) {
      console.error(`Resend add to ${segment} failed (${added.status}):`, await added.text());
    }
  } catch (error) {
    console.error(`Resend contact sync (${segment}) failed:`, error);
  }
}
