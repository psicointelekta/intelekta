import type { Metadata } from 'next'
import { HomeDesktop } from "@/components/pages/home-desktop"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"

export const metadata: Metadata = {
  title: 'Sobre a Intelekta | Especialistas em Desenvolvimento Cognitivo',
  description: 'Conheça a história e a missão da Intelekta em Vila Velha, ES. Um centro de desenvolvimento cognitivo e socioemocional idealizado por psicólogos e pedagogos.',
  alternates: {
    canonical: 'https://psicointelekta.com.br/sobre',
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
    console.error('Error fetching announcements for /sobre:', error)
    return []
  }
}

export default async function SobrePage() {
  const announcements = await getAnnouncements()
  
  const jsonLd = {
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
        "name": "Sobre",
        "item": "https://psicointelekta.com.br/sobre"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeDesktop announcements={announcements} targetId="sobre" />
    </>
  )
}
