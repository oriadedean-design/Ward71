import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';

export interface Endorsement {
  name: string;
  category?: string;
  description: string;
  logoUrl?: string;
  logoAlt?: string;
  sourceUrl?: string;
}

// TODO: add CUPE Local 79's official endorsement page/post URL here.
// The source link is hidden until this is filled in.
const CUPE_LOCAL_79_SOURCE_URL = '';

// Endorsements built into the site. To add more, either append an entry here
// or create an "Endorsement" document in Sanity Studio (/studio); Studio entries
// appear after these, sorted by their display order.
const BUILT_IN: Endorsement[] = [
  {
    name: 'CUPE Local 79',
    category: 'Union',
    description:
      "CUPE Local 79 represents 32,000 frontline public sector workers across Toronto. For the first time in the union's history, members voted directly on which city council candidates to endorse, measuring them against the vision from Local 79's Toronto Workers Summit: equity built into every community through strong public services. Local 79 members voted to endorse Lorna Antwi in Ward 7, Humber River-Black Creek.",
    sourceUrl: CUPE_LOCAL_79_SOURCE_URL || undefined,
  },
];

interface SanityEndorsement {
  name?: string;
  category?: string;
  description?: string;
  logo?: { asset?: unknown; alt?: string };
  sourceUrl?: string;
}

export async function getEndorsements(): Promise<Endorsement[]> {
  let fromStudio: Endorsement[] = [];
  try {
    const docs: SanityEndorsement[] = await client.fetch(
      `*[_type == "endorsement" && defined(name)] | order(coalesce(order, 9999) asc, _createdAt asc){
        name, category, description, logo, sourceUrl
      }`
    );
    fromStudio = docs
      .filter((d) => d.name && d.description)
      .map((d) => ({
        name: d.name!,
        category: d.category,
        description: d.description!,
        logoUrl: d.logo?.asset ? urlFor(d.logo).height(96).fit('max').url() : undefined,
        logoAlt: d.logo?.alt,
        sourceUrl: d.sourceUrl,
      }));
  } catch (error) {
    console.error('Failed to load endorsements from Sanity:', error);
  }

  // A Studio entry with the same name replaces the built-in one, so details
  // like a logo or source link can be managed there later.
  const studioNames = new Set(fromStudio.map((e) => e.name.trim().toLowerCase()));
  const builtIn = BUILT_IN.filter((e) => !studioNames.has(e.name.trim().toLowerCase()));
  return [...builtIn, ...fromStudio];
}
