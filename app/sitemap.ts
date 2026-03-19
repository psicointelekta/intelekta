/**
 * Dynamic sitemap — auto-updates lastModified on every deploy.
 * Only desktop canonical URLs are listed (/m is disallowed in robots.ts).
 */
import type { MetadataRoute } from 'next'

/** Date is set at build time — updates automatically on every deploy */
const LAST_MODIFIED = new Date()

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
