/**
 * Creates the Subscribers / Volunteers / Donors segments in Resend (if missing)
 * and adds everyone already in the Sanity Inbox to them. Safe to re-run.
 *
 *   RESEND_API_KEY=re_... npx sanity exec scripts/sync-resend-contacts.ts --with-user-token
 *
 * The key needs Full access. Prints the segment ids to set in Vercel as
 * RESEND_SEGMENT_SUBSCRIBERS / _VOLUNTEERS / _DONORS.
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2024-01-01' });
const apiKey = process.env.RESEND_API_KEY;

const SEGMENTS = {
  subscribers: { name: 'Subscribers', query: `*[_type == "emailSubscriber" && status != "Unsubscribed"]{ "email": email }` },
  volunteers: { name: 'Volunteers', query: `*[_type == "volunteerSubmission"]{ email, name }` },
  donors: { name: 'Donors', query: `*[_type == "donationRecord" && status == "completed"]{ "email": donorEmail, "name": donorName }` },
} as const;

// Resend's default rate limit is a few requests per second.
const pause = () => new Promise((r) => setTimeout(r, 600));

async function api(path: string, method = 'GET', body?: unknown) {
  await pause();
  const res = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, json: text ? JSON.parse(text) : null };
}

function splitName(fullName?: string) {
  const parts = (fullName ?? '').trim().split(/\s+/).filter(Boolean);
  return parts.length ? { first_name: parts[0], last_name: parts.slice(1).join(' ') || undefined } : {};
}

async function main() {
  if (!apiKey) throw new Error('Set RESEND_API_KEY (Full access).');

  const existing = await api('/segments');
  if (!existing.ok) throw new Error(`Listing segments failed (${existing.status}): ${JSON.stringify(existing.json)}`);
  const byName = new Map<string, string>((existing.json?.data ?? []).map((s: any) => [s.name, s.id]));

  for (const [key, { name, query }] of Object.entries(SEGMENTS)) {
    let segmentId = byName.get(name);
    if (!segmentId) {
      const created = await api('/segments', 'POST', { name });
      if (!created.ok) throw new Error(`Creating segment ${name} failed: ${JSON.stringify(created.json)}`);
      segmentId = created.json.id as string;
    }

    const people: Array<{ email?: string; name?: string }> = await client.fetch(query);
    const unique = new Map<string, string | undefined>();
    for (const p of people) {
      const email = p.email?.trim().toLowerCase();
      if (email && !unique.has(email)) unique.set(email, p.name);
    }

    let added = 0;
    for (const [email, fullName] of unique) {
      await api('/contacts', 'POST', { email, ...splitName(fullName) }); // ok if it already exists
      const res = await api(`/contacts/${encodeURIComponent(email)}/segments/${segmentId}`, 'POST');
      if (res.ok) added++;
      else console.error(`  could not add a ${key} contact (${res.status}): ${JSON.stringify(res.json)}`);
    }
    console.log(`${name}: ${added}/${unique.size} contacts  (RESEND_SEGMENT_${key.toUpperCase()}=${segmentId})`);
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
