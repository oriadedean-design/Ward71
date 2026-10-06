import { createClient } from 'next-sanity';
import { defineLive } from 'next-sanity/live';

// Optional Viewer token. Required once the dataset is made private;
// never exposed to the browser.
const readToken = process.env.SANITY_API_READ_TOKEN || undefined;

const liveClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: readToken,
});

// sanityFetch caches query results and <SanityLive /> (in the root layout)
// revalidates them the moment content is published in the Studio.
export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: readToken ?? false,
  browserToken: false,
});
