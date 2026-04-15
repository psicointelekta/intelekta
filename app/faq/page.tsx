import type { Metadata } from 'next'
import { HomeDesktop } from "@/components/pages/home-desktop"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"

export const metadata: Metadata = {
  title: 'Perguntas Frequentes (FAQ) | Intelekta FAQ',
  description: 'Tire suas dúvidas sobre neuroeducação, avaliação neuropsicológica e nossos programas em Vila Velha. Respostas claras para as famílias.',
  alternates: {
    canonical: 'https://psicointelekta.com.br/faq',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAnnouncements() {
  try {
    const sheets = await getGoogleSheets()
    const sheetTab = process.env.GOOGLE_SHEET_TAB_NEWS || 'Novidades'
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTab}!A2:H10`,
    })

    const rows = response.data.values || []
    return rows.map((row: any) => ({
      date: row[0] || '',
      category: row[1] || 'Novidades',
      title: row[2] || '',
      description: row[3] || '',
      imageUrl: row[4] || '',
      linkUrl: row[5] || '',
      imagePosition: row[6] || '50% 50%',
      imageZoom: row[7] || '1',
    }))
  } catch (error) {
    console.error('Error fetching announcements for /faq:', error)
    return []
  }
}

export default async function FaqPage() {
  const announcements = await getAnnouncements()
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://psicointelekta.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://psicointelekta.com.br/faq"
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Para qual faixa etária a Intelekta atende?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atendemos pessoas a partir dos 5 anos de idade, com programas específicos para crianças (5-12 anos), adolescentes (13-17 anos), adultos (18-63 anos) e idosos (64+ anos)."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona a metodologia da Intelekta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nossa metodologia é fundamentada em três pilares: neurociência, psicologia cognitiva e inteligência emocional. Utilizamos atividades práticas e personalizadas baseadas em evidências científicas sobre neuroplasticidade."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre a Intelekta e uma escola ou terapia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Intelekta é um centro de educação complementar. Não substituímos a escola nem a terapia. Nosso foco é o desenvolvimento de habilidades cognitivas e socioemocionais que potencializam o desempenho em todas as áreas da vida."
        }
      },
      {
        "@type": "Question",
        "name": "Onde fica a Intelekta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Estamos localizados na Rua Afonso Pena, 403, no bairro Praia da Costa, em Vila Velha, ES."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeDesktop announcements={announcements} targetId="faq" />
    </>
  )
}
