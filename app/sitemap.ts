import { MetadataRoute } from 'next'
import { listPolicyAreas } from '@/lib/policies'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.lornaantwi.com'
  const now = new Date()

  return [
    { url: base,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/platform`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // One page per full policy plan (content/policies/*.xml)
    ...listPolicyAreas().map((a) => ({
      url: `${base}/platform/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${base}/our-ward`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/donate`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/community`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/resources`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/how-to-help`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/volunteer`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
