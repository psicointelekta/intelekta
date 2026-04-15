import type { Metadata } from 'next'
import { HomeDesktop } from "@/components/pages/home-desktop"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"

export const metadata: Metadata = {
  title: 'Contato e Localização | Intelekta Vila Velha',
  description: 'Fale conosco pelo WhatsApp, telefone ou e-mail. Agende sua aula experimental gratuita na Praia da Costa, Vila Velha, ES. Veja como chegar.',
  alternates: {
    canonical: 'https://psicointelekta.com.br/contato',
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
    console.error('Error fetching announcements for /contato:', error)
    return []
  }
}

export default async function ContatoPage() {
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
        "name": "Contato",
        "item": "https://psicointelekta.com.br/contato"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeDesktop announcements={announcements} targetId="contato" />
    </>
  )
}
