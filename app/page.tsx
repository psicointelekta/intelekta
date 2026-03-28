/** Desktop homepage — served to non-mobile UAs (see proxy.ts). */
import { HomeDesktop } from "@/components/pages/home-desktop"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"

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
    return rows.map((row) => ({
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
    console.error('Error fetching announcements for desktop home:', error)
    return []
  }
}

export default async function HomePage() {
  const announcements = await getAnnouncements()
  return <HomeDesktop announcements={announcements} />
}
