import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lornaantwi.ca'
  const now = new Date()

  return [
    { url: base,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/donate`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/community`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/how-to-help`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/volunteer`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
