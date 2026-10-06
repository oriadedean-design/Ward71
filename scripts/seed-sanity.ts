/**
 * Copies the site's current content into Sanity so editors start from what's
 * live. Creates one document per page, Site Settings and the Donation Goal, and
 * carries over the candidate photo and community gallery from the older Site
 * Settings document.
 *
 * Run from the project root (you must be logged in: `npx sanity login`):
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * Safe to re-run: documents that already exist are left untouched.
 * To overwrite them with the built-in content instead (discarding Studio edits):
 *   SEED_REPLACE=1 npx sanity exec scripts/seed-sanity.ts --with-user-token
 */
import { randomUUID } from 'node:crypto';
import { getCliClient } from 'sanity/cli';
import { PAGE_DEFAULTS, type PageId, type SanityImage } from '../lib/content/defaults';
import { DONATION_GOAL_ID, donationGoalDefaults } from '../lib/content/donationGoal';

const client = getCliClient({ apiVersion: '2024-01-01' });
const replace = process.env.SEED_REPLACE === '1';

// Sanity needs a unique _key on every object inside an array.
function withKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) =>
      item && typeof item === 'object' && !Array.isArray(item)
        ? { _key: randomUUID().slice(0, 12), ...(withKeys(item) as object) }
        : withKeys(item)
    );
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).filter(([, v]) => v !== null).map(([k, v]) => [k, withKeys(v)])
    );
  }
  return value;
}

async function main() {
  const legacy = await client.fetch<{ candidatePhoto?: SanityImage; galleryImages?: SanityImage[] } | null>(
    `*[_type == "siteSettings" && _id != "siteSettings" && !(_id in path("drafts.**"))]
      | order(_updatedAt desc)[0]{ candidatePhoto, galleryImages }`
  );

  const extras: Partial<Record<PageId, Record<string, unknown>>> = {
    siteSettings: legacy?.candidatePhoto ? { candidatePhoto: legacy.candidatePhoto } : {},
    communityPage: legacy?.galleryImages?.length ? { gallery: legacy.galleryImages } : {},
  };

  const tx = client.transaction();
  for (const id of Object.keys(PAGE_DEFAULTS) as PageId[]) {
    const doc = {
      _id: id,
      _type: id,
      ...(withKeys(PAGE_DEFAULTS[id]) as object),
      ...extras[id],
    };
    if (replace) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
    console.log(`${replace ? 'Replacing' : 'Creating (if missing)'}: ${id}`);
  }
  const goalDoc = { _id: DONATION_GOAL_ID, _type: 'donationMilestone', ...donationGoalDefaults };
  if (replace) tx.createOrReplace(goalDoc);
  else tx.createIfNotExists(goalDoc);
  console.log(`${replace ? 'Replacing' : 'Creating (if missing)'}: ${DONATION_GOAL_ID}`);

  await tx.commit();

  console.log(
    `\nDone. Photo carried over: ${legacy?.candidatePhoto ? 'yes' : 'no'}. ` +
      `Gallery photos carried over: ${legacy?.galleryImages?.length ?? 0}.`
  );
  console.log('Open /studio → Pages to review. The older "Site Settings" documents are no longer used and can be deleted.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
