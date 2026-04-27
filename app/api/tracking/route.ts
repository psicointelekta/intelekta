import { NextRequest, NextResponse } from 'next/server'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'

export const runtime = 'nodejs'

// Simple in-memory de-duplication for very rapid hits from same IP
const recentHits = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    
    // basic info
    const utm_source = body.utm_source || ''
    const utm_medium = body.utm_medium || ''
    const utm_campaign = body.utm_campaign || ''
    const referrer = body.referrer || ''
    const page_path = body.page_path || '/'
    
    // 1. Classification Logic
    let access_type = 'Direto'
    if (utm_medium === 'cpc' || utm_source.includes('ads') || body.gclid) {
      access_type = 'Tráfego Pago'
    } else if (referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo')) {
      access_type = 'Orgânico (Busca)'
    } else if (referrer.includes('instagram') || referrer.includes('facebook') || referrer.includes('t.co')) {
      access_type = 'Social (Orgânico)'
    } else if (referrer) {
      access_type = 'Referência'
    }

    const sheetId = SPREADSHEET_ID
    const sheetTab = 'Acessos'
    const sheets = await getGoogleSheets()

    const HEADERS = [
      'Data/Hora', 'Tipo', 'Fonte (Source)', 'Mídia (Medium)', 'Campanha', 'Referrer', 'Página', 'IP', 'User-Agent'
    ]

    // Ensure sheet exists and has headers
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
      const hasSheet = spreadsheet.data.sheets?.some(s => s.properties?.title === sheetTab)

      if (!hasSheet) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: sheetId,
          requestBody: { requests: [{ addSheet: { properties: { title: sheetTab } } }] }
        })
        // add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `${sheetTab}!A1:I1`,
          valueInputOption: 'RAW',
          requestBody: { values: [HEADERS] }
        })
      }
    } catch (e) {
      console.error('[Tracking] Setup error:', e)
    }

    const row = [
      new Date().toLocaleString('pt-BR'),
      access_type,
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      page_path,
      ip,
      userAgent
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetTab}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] }
    })

    return NextResponse.json({ ok: true, type: access_type })
  } catch (error) {
    console.error('[Tracking] API Error:', error)
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
  }
}
