import { NextRequest, NextResponse } from 'next/server'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
      range: `${sheetTab}!A2:H10`,
    })
    
    console.log(`Successfully fetched from ${sheetTab}`)
    const rows = response.data.values || []
    
    const announcements = rows.map((row, index) => ({
      id: index,
      date: row[0] || '',
      category: row[1] || 'Novidades',
      title: row[2] || '',
      description: row[3] || '',
      imageUrl: row[4] || '',
      linkUrl: row[5] || '',
      imagePosition: row[6] || '50% 50%',
      imageZoom: row[7] || '1',
    }))

    return NextResponse.json(announcements)
  } catch (error: any) {
    console.error(`Announcements fetch error for tab "${process.env.GOOGLE_SHEET_TAB_NEWS || 'Novidades'}":`, {
      message: error.message,
      status: error.status,
      details: error.errors
    })
    return NextResponse.json([])
  }
}
