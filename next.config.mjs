/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // Fix workspace root warning by pinning the root to the current directory
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
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
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://*.google.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://va.vercel-scripts.com; frame-src 'self' https://www.google.com https://maps.google.com; frame-ancestors 'none'; upgrade-insecure-requests; object-src 'none'; base-uri 'self';",
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
