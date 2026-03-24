import { NextRequest, NextResponse } from 'next/server'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'

export const runtime = 'nodejs'

/**
 * GET /api/announcements
 * Fetches data from "Novidades" tab in Google Sheets.
 * Expected columns: Data, Categoria, Título, Descrição, ImagemURL, LinkURL
 */
export async function GET() {
  try {
    const sheets = await getGoogleSheets()
    const sheetTab = process.env.GOOGLE_SHEET_TAB_NEWS || 'Novidades'

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTab}!A2:F10`, // Fetch up to 9 latest news items
    })

    const rows = response.data.values || []
    
    const announcements = rows.map((row, index) => ({
      id: index,
      date: row[0] || '',
      category: row[1] || 'Novidades',
      title: row[2] || '',
      description: row[3] || '',
      imageUrl: row[4] || '',
      linkUrl: row[5] || '',
    }))

    return NextResponse.json(announcements)
  } catch (error) {
    console.error('Announcements fetch error', error)
    // Return empty array instead of 500 to keep UI functional
    return NextResponse.json([])
  }
}
