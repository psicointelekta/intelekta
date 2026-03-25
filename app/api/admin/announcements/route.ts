import { google } from 'googleapis'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'
import { del } from '@vercel/blob'

const TAB_NAME = process.env.GOOGLE_SHEET_TAB_NEWS || 'Novidades'

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json()

    const sheets = await getGoogleSheets()

    function normalizeUrl(url: string) {
      if (!url) return ''
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) return url
      return `https://${url}`
    }

    if (action === 'add') {
      const { date, category, title, description, imageUrl, linkUrl, imagePosition, imageZoom } = data
      const cleanLink = normalizeUrl(linkUrl)
      const pos = imagePosition || '50% 50%'
      const zoom = imageZoom || '1'
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${TAB_NAME}!A:H`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[date, category, title, description, imageUrl, cleanLink, pos, zoom]],
        },
      })
      return NextResponse.json({ success: true })
    }

    if (action === 'update') {
      const { index, date, category, title, description, imageUrl, linkUrl, imagePosition, imageZoom } = data
      const cleanLink = normalizeUrl(linkUrl)
      const rowIndex = index + 2 
      const pos = imagePosition || '50% 50%'
      const zoom = imageZoom || '1'
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${TAB_NAME}!A${rowIndex}:H${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[date, category, title, description, imageUrl, cleanLink, pos, zoom]],
        },
      })
      return NextResponse.json({ success: true })
    }

    if (action === 'move') {
      const { index, direction } = data // index: current row index (0-based), direction: 'up' or 'down'
      
      const sheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      })
      
      const tab = sheet.data.sheets?.find(s => s.properties?.title === TAB_NAME)
      if (!tab) throw new Error('Tab not found')
      
      const sheetId = tab.properties?.sheetId
      const fromIndex = index + 1 // 1-based index (Header is row 1, index 0 is row 2)
      const destinationIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1

      // Don't move up if it's already at the top (row 2)
      if (direction === 'up' && fromIndex <= 1) return NextResponse.json({ success: true })
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              moveDimension: {
                source: {
                  sheetId,
                  dimension: 'ROWS',
                  startIndex: fromIndex,
                  endIndex: fromIndex + 1,
                },
                destinationIndex: destinationIndex < fromIndex ? destinationIndex : destinationIndex + 1,
              },
            },
          ],
        },
      })
      return NextResponse.json({ success: true })
    }

    if (action === 'delete') {
      const { index } = data // Zero-based index from the fetched list (row 2 = index 0)
      
      // 1. Fetch the data to find the imageUrl before deleting
      const range = `${TAB_NAME}!A${index + 2}:F${index + 2}`
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range,
      })
      
      const row = response.data.values?.[0]
      const imageUrl = row?.[4] // ImagemURL is column E (index 4)

      // 2. If it's a Vercel Blob, delete it
      if (imageUrl && imageUrl.includes('blob.vercel-storage.com')) {
        try {
          await del(imageUrl)
        } catch (blobErr) {
          console.error('Error deleting blob:', blobErr)
          // Continue even if blob deletion fails
        }
      }

      // 3. Delete the row from Google Sheets
      const sheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      })
      
      const tab = sheet.data.sheets?.find(s => s.properties?.title === TAB_NAME)
      if (!tab) throw new Error('Tab not found')
      
      const sheetId = tab.properties?.sheetId

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId,
                  dimension: 'ROWS',
                  startIndex: index + 1,
                  endIndex: index + 2,
                },
              },
            },
          ],
        },
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Admin API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
