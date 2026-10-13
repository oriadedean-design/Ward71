import { NextResponse } from 'next/server';
import { countSignatures, getPetition, isPetitionClosed } from '@/lib/petition';

// The public signature counter. Only the number is ever returned. Cached at
// the edge for a few seconds so a busy page doesn't query Sanity per visitor.

export const dynamic = 'force-dynamic';

export async function GET() {
  const petition = getPetition();
  const count = petition ? await countSignatures(petition.id, { live: true }) : 0;
  return NextResponse.json(
    { count, closed: isPetitionClosed() },
    { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=10, stale-while-revalidate=30' } }
  );
}
