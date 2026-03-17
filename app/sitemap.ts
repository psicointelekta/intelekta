import type { MetadataRoute } from 'next'

const LAST_MODIFIED = new Date('2026-03-17')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://intelektamente.com',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://intelektamente.com/privacidade',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://intelektamente.com/termos',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
