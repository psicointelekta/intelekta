import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Intelekta | Desenvolvimento Cognitivo e Socioemocional',
  description: 'Centro de desenvolvimento cognitivo e socioemocional baseado em neurociência. Programas personalizados para crianças, adolescentes, adultos e seniores em Vila Velha, ES.',
  keywords: ['desenvolvimento cognitivo', 'inteligência emocional', 'neurociência', 'psicopedagogia', 'Vila Velha', 'ES', 'crianças', 'adolescentes', 'adultos', 'seniores'],
  authors: [{ name: 'Intelekta' }],
  creator: 'Intelekta',
  publisher: 'Intelekta',
  metadataBase: new URL('https://intelektamente.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://intelektamente.com',
    siteName: 'Intelekta',
    title: 'Intelekta | Fortalecendo Mentes e Emoções',
    description: 'Centro de desenvolvimento cognitivo e socioemocional baseado em neurociência. Programas personalizados para todas as idades.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Intelekta - Desenvolvimento Cognitivo e Socioemocional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelekta | Fortalecendo Mentes e Emoções',
    description: 'Centro de desenvolvimento cognitivo e socioemocional baseado em neurociência.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2F8F78',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Intelekta',
              description: 'Centro de desenvolvimento cognitivo e socioemocional baseado em neurociência',
              url: 'https://intelektamente.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rua Afonso Pena, 403',
                addressLocality: 'Vila Velha',
                addressRegion: 'ES',
                postalCode: '29101-010',
                addressCountry: 'BR',
              },
              areaServed: {
                '@type': 'City',
                name: 'Vila Velha',
              },
              sameAs: [
                'https://instagram.com/intelektamente',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
