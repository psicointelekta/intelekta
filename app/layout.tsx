/**
 * Root layout — configures fonts, metadata, structured data, and analytics.
 *
 * Fonts: Lato (body) + Nunito (headings) via next/font/google with display:swap.
 * Analytics: Vercel Analytics + SpeedInsights (cookieless, LGPD-compliant).
 * Structured Data: EducationalOrganization (9 services, 3 employees),
 *   FAQPage (5 Q&As), and WebSite schema for rich search results.
 */
import type { Metadata, Viewport } from 'next'
import { Lato, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'
import { AccessTracker } from '@/components/access-tracker'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['400', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'Intelekta | Centro de Desenvolvimento Cognitivo e Socioemocional em Vila Velha, ES',
    template: '%s | Intelekta'
  },
  description:
    'Centro de desenvolvimento cognitivo e socioemocional fundamentado em neurociência em Vila Velha, ES. Programas personalizados para crianças a partir de 5 anos, adolescentes, adultos e idosos. Aula experimental gratuita mediante agendamento.',
  keywords: [
    'intelekta',
    'psicólogo em vila velha',
    'psicóloga em vila velha',
    'clínica de psicologia vila velha',
    'psicólogo infantil vila velha',
    'neuropsicólogo vila velha',
    'avaliação neuropsicológica vila velha',
    'psicopedagogia vila velha',
    'terapia para ansiedade vila velha',
    'avaliação tdah vila velha',
    'diagnóstico autismo infantil',
    'diagnóstico TEA infantil',
    'atraso no desenvolvimento infantil',
    'dificuldade de aprendizagem criança',
    'psicólogo na praia da costa',
    'psicólogo em itaparica vila velha',
    'orientação parental vila velha',
    'desenvolvimento cognitivo infantil',
    'inteligência emocional crianças',
    'neurociência educação',
    'estimulação cognitiva sênior',
    'reforço escolar vila velha',
    'centro de desenvolvimento cognitivo',
    'curso de xadrez e cubo mágico vila velha',
    'atendimento psicológico particular',
    'psicologia infantil vila velha',
    'fisioterapia funcional idosos vila velha',
    'neuroreabilitação vila velha',
    'prevenção de quedas idosos',
    'fisioterapia em grupo para idosos',
    'estimulação cognitiva grupo idosos',
    'neuropsicóloga idosos vila velha',
    'envelhecimento ativo vila velha',
  ],
  applicationName: 'Intelekta',
  authors: [{ name: 'Intelekta' }],
  creator: 'Intelekta',
  publisher: 'Intelekta',
  metadataBase: new URL('https://psicointelekta.com.br'),
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://psicointelekta.com.br',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://psicointelekta.com.br',
    siteName: 'Intelekta',
    title: 'Intelekta | Centro de Desenvolvimento Cognitivo e Socioemocional',
    description:
      'Centro de desenvolvimento cognitivo, neuropsicologia e psicologia infantil em Vila Velha, ES. Especialistas em TDAH, autismo (TEA), ansiedade e dificuldades de aprendizagem. Aula experimental gratuita.',
    images: [
      {
        url: '/og-image.png',
        width: 1920,
        height: 1080,
        alt: 'Intelekta - Psicólogo, Neuropsicólogo e Psicopedagogia em Vila Velha, ES',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelekta | Psicólogo e Neuropsicólogo em Vila Velha',
    description:
      'Desenvolvimento cognitivo e socioemocional sob medida. Especialistas em psicologia infantil, TDAH, autismo (TEA), ansiedade e avaliação neuropsicológica em Vila Velha.',
    images: ['/og-image.png'],
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
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#2F8F78',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Comprehensive structured data for SEO and LLM optimization
const structuredData = [
  // WebPage - Explicitly define the primary image
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://psicointelekta.com.br/#webpage',
    url: 'https://psicointelekta.com.br',
    name: 'Intelekta | Centro de Desenvolvimento Cognitivo e Socioemocional',
    description: 'Centro de desenvolvimento cognitivo, neuropsicologia e psicologia infantil em Vila Velha, ES.',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': 'https://psicointelekta.com.br/#primaryimage',
      url: 'https://psicointelekta.com.br/og-image.png',
      width: 1920,
      height: 1080
    },
    image: {
      '@id': 'https://psicointelekta.com.br/#primaryimage'
    }
  },
  // Organization
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization', 'MedicalOrganization'],
    '@id': 'https://psicointelekta.com.br/#organization',
    name: 'Intelekta',
    alternateName: 'Intelekta - Centro de Desenvolvimento Cognitivo e Socioemocional',
    description:
      'Centro de desenvolvimento cognitivo, neuropsicologia e psicologia infantil em Vila Velha, ES. Idealizado por psicólogos e psicopedagogas, oferecemos avaliação de TDAH, autismo (TEA), terapia para ansiedade e programas personalizados para todas as idades fundamentados em neurociência.',
    url: 'https://psicointelekta.com.br',
    logo: 'https://psicointelekta.com.br/icon.svg',
    image: 'https://psicointelekta.com.br/og-image.png',
    brand: {
      '@type': 'Brand',
      name: 'Intelekta'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Afonso Pena, 403',
      addressLocality: 'Vila Velha',
      addressRegion: 'ES',
      postalCode: '29101-010',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.3467,
      longitude: -40.2925,
    },
    areaServed: {
      '@type': 'City',
      name: 'Vila Velha',
      containedInPlace: {
        '@type': 'State',
        name: 'Espírito Santo',
      },
    },
    sameAs: ['https://www.instagram.com/psicointelekta/'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-27-98877-3890',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '200',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Programas de Desenvolvimento',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Intelekta Sênior + Fisioterapia Funcional',
            description:
              'Programa de fisioterapia funcional em grupo para idosos, focado em mobilidade, equilíbrio, prevenção de quedas e autonomia. Sessões em grupo que promovem socialização e envelhecimento ativo.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Intelekta Sênior + Neuroreabilitação',
            description:
              'Programa de neuroreabilitação em grupo para idosos, conduzido por neuropsicóloga, focado em estimulação cognitiva, memória, atenção e raciocínio. Combate isolamento social e promove autonomia.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Neuroeducação',
            description:
              'Programa multidisciplinar 100% lúdico que estimula, desenvolve e fortalece a mente em todas as idades. Jogos, oficinas criativas e atividades planejadas com base na neuroeducação.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Musicoterapia',
            description:
              'Programa lúdico e presencial que utiliza instrumentos, canto, ritmo, escuta guiada e movimento corporal para desenvolver capacidades cognitivas e socioemocionais em todas as idades. Inclui programa especial para mães e bebês.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reforço Escolar',
            description:
              'Programa lúdico e presencial voltado da Educação Infantil ao Ensino Médio, com foco no desenvolvimento acadêmico e socioemocional através de jogos educativos e estratégias pedagógicas.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Xadrez',
            description:
              'Programa lúdico e pedagógico que utiliza o xadrez para desenvolver atenção, memória, raciocínio lógico, planejamento e autorregulação emocional em todas as idades.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cubo Mágico',
            description:
              'Programa lúdico e presencial que trabalha atenção, foco, raciocínio lógico e espacial, planejamento, memória e persistência através da resolução do cubo mágico.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Neurolê',
            description:
              'Programa de alfabetização inclusiva para crianças atípicas, utilizando abordagem lúdica e sensorial para desenvolver habilidades de leitura e escrita.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Psicopedagogia',
            description:
              'Atendimento especializado em dificuldades de aprendizagem, com acompanhamento psicopedagógico personalizado que identifica barreiras e constrói caminhos para o desenvolvimento.',
          },
        },
      ],
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Suzidarle Pereira',
        jobTitle: 'Psicóloga e Neuropsicóloga',
        description:
          'Especializada no atendimento de crianças a partir de 6 anos e adolescentes com expertise em avaliação neuropsicológica.',
      },
      {
        '@type': 'Person',
        name: 'Fabiana Lima',
        jobTitle: 'Psicopedagoga',
        description:
          `Professora há ${new Date().getFullYear() - 2014} anos dedicada ao desenvolvimento integral de crianças e adolescentes, unindo aprendizagem e ludicidade.`,
      },
      {
        '@type': 'Person',
        name: 'Flávia Luz Vaz',
        jobTitle: 'Consultora Técnica',
        description:
          `Psicóloga clínica há ${new Date().getFullYear() - 2002} anos, Mestre em Desenvolvimento Humano e coordenadora do Projeto Guardiões da Infância.`,
      },
    ],
  },
  // FAQ Page
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Para qual faixa etária a Intelekta atende?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Atendemos pessoas a partir dos 5 anos de idade, com programas específicos para crianças (5-12 anos), adolescentes (13-17 anos), adultos (18-63 anos) e idosos (64+ anos).',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona a metodologia da Intelekta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Nossa metodologia é fundamentada em três pilares: neurociência, psicologia cognitiva e inteligência emocional. Utilizamos atividades práticas e personalizadas baseadas em evidências científicas sobre neuroplasticidade.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual a diferença entre a Intelekta e uma escola ou terapia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'A Intelekta é um centro de educação complementar. Não substituímos a escola nem a terapia. Nosso foco é o desenvolvimento de habilidades cognitivas e socioemocionais que potencializam o desempenho em todas as áreas da vida.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso fazer uma aula experimental gratuita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Sim! Oferecemos uma aula experimental gratuita para que você ou seu filho conheça nosso espaço, metodologia e equipe. Entre em contato pelo WhatsApp para agendar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Onde fica a Intelekta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Estamos localizados na Rua Afonso Pena, 403, no bairro Praia da Costa, em Vila Velha, ES.',
        },
      },
    ],
  },
  // LocalBusiness for SEO Local
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://psicointelekta.com.br/#localbusiness',
    name: 'Intelekta - Psicologia e Desenvolvimento',
    description: 'Psicólogo em Vila Velha, neuropsicologia infantil e psicopedagogia na Praia da Costa. Avaliação de TDAH e Autismo (TEA).',
    url: 'https://psicointelekta.com.br',
    telephone: '+55-27-98877-3890',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Afonso Pena, 403',
      addressLocality: 'Vila Velha',
      addressRegion: 'ES',
      postalCode: '29101-010',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.3467,
      longitude: -40.2925,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      }
    ],
    image: 'https://psicointelekta.com.br/og-image.png',
    thumbnailUrl: 'https://psicointelekta.com.br/og-image.png',
  }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${lato.variable} ${nunito.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNGVFWC8');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="image_src" href="https://psicointelekta.com.br/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNGVFWC8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
        <SpeedInsights />
        <Suspense fallback={null}>
          <AccessTracker />
        </Suspense>
      </body>
    </html>
  )
}
