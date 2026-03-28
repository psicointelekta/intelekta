/**
 * Next.js configuration for Intelekta.
 *
 * Key decisions:
 * - optimizePackageImports: tree-shakes framer-motion & lucide to cut JS bundle
 * - cssChunking 'strict': prevents flash-of-unstyled-content on route changes
 * - AVIF-first images with 1-year cache: best compression, CloudFront-friendly
 * - CSP allows Vercel Analytics + future GA4 domains
 * - Vary headers on / and /m enable per-device CDN caching (see proxy.ts)
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    cssChunking: 'strict',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year — images are content-hashed by Next.js
  },
  // Fix workspace root warning by pinning the root to the current directory
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
      // Per-device Vary headers — critical for CDN cache splitting (desktop vs mobile)
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value:
              'rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding, User-Agent',
          },
        ],
      },
      {
        source: '/m',
        headers: [
          {
            key: 'Vary',
            value:
              'rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding, User-Agent',
          },
        ],
      },
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.google.com https://*.google.com.br https://www.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://va.vercel-scripts.com https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com https://*.google.com.br; frame-ancestors 'none'; upgrade-insecure-requests; object-src 'none'; base-uri 'self';",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
