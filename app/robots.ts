/**
 * Dynamic robots.txt.
 * Allows indexing of all public pages, blocks /api/ (internal)
 * and /m (mobile variant — canonical is /, served via rewrite in proxy.ts).
 */
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/m/', '/api/', '/admin/'],
    },
    sitemap: 'https://psicointelekta.com.br/sitemap.xml',
  }
}
