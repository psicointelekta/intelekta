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
      url: 'https://psicointelekta.com.br',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://psicointelekta.com.br/privacidade',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://psicointelekta.com.br/termos',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
