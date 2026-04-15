import { HomeMobile } from "@/components/pages/home-mobile"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://psicointelekta.com.br/contato",
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
    console.error('Error fetching announcements for mobile /contato:', error)
    return []
  }
}

export default async function MobileContatoPage() {
  const announcements = await getAnnouncements()
  return <HomeMobile announcements={announcements} targetId="contato" />
}
