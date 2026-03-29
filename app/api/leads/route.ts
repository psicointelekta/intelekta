/**
 * POST /api/leads — Lead capture endpoint.
 *
 * Flow: validates form → checks honeypot → rate-limits by IP →
 * authenticates with Google Sheets API → ensures sheet+headers exist →
 * appends lead row → returns 200 immediately → sends Telegram in background.
 *
 * Rate limit: 5 requests per 10 minutes per IP (in-memory Map).
 * Note: resets on cold starts — acceptable for low-traffic; not for multi-instance.
 *
 * Telegram is dispatched via after() so it NEVER blocks the HTTP response.
 */
import { NextRequest, NextResponse, after } from 'next/server'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'
import { sendTelegramMessage, escapeMarkdown } from '@/lib/telegram'

export const runtime = 'nodejs'

type RateEntry = { count: number; reset: number }

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const rateMap = new Map<string, RateEntry>()

const getClientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count += 1
  return false
}

let hasInitialized = false

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot — bots fill hidden "website" field, humans don't
    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const fullName = (body.full_name || '').toString().trim()
    const phone = (body.phone || '').toString().trim()
    const program = (body.program || '').toString().trim()
    const message = (body.message || '').toString().trim()

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios.' },
        { status: 400 }
      )
    }

    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
        { status: 429 }
      )
    }

    const sheetId = SPREADSHEET_ID
    const sheetTab = process.env.GOOGLE_SHEET_TAB || 'Leads'
    const sheets = await getGoogleSheets()

    const HEADERS = [
      'Data/Hora', 'Nome Completo', 'Telefone', 'Programa', 'Mensagem',
      'UTM Source', 'UTM Medium', 'UTM Campaign', 'Página', 'User-Agent', 'IP',
    ]

    if (!hasInitialized) {
      try {
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
        const hasSheet = spreadsheet.data.sheets?.some(
          (s: any) => s.properties?.title === sheetTab
        )

        if (!hasSheet) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId: sheetId,
            requestBody: { requests: [{ addSheet: { properties: { title: sheetTab } } }] },
          })
        }

        const headerCheck = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: `${sheetTab}!A1:K1`,
        })
        const firstRow = headerCheck.data.values?.[0] ?? []

        if (firstRow.length === 0 || firstRow[0] !== HEADERS[0]) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: `${sheetTab}!A1:K1`,
            valueInputOption: 'RAW',
            requestBody: { values: [HEADERS] },
          })
        }

        hasInitialized = true
      } catch (initError) {
        console.error('[Leads] Sheet init check failed (continuing):', initError)
      }
    }

    const now = new Date()
    const leadValues = [
      now.toISOString(),
      fullName,
      phone,
      program || 'Não informado',
      message,
      body.utm_source || '',
      body.utm_medium || '',
      body.utm_campaign || '',
      body.page_path || '',
      req.headers.get('user-agent') || '',
      ip,
    ]

    // ── Critical path: only Sheets is awaited ────────────────────────────────
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetTab}!A:K`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [leadValues] },
    })
    // ─────────────────────────────────────────────────────────────────────────

    // ── Telegram: runs AFTER response is sent — never blocks the user ────────
    const hasTelegram =
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID

    if (hasTelegram) {
      const platform = body.page_path?.includes('/m') ? '📱 Mobile' : '💻 Desktop'
      const botMessage = [
        `*🚀 Novo Lead Capturado \\- Intelekta*`,
        ``,
        `👤 *Nome:* ${escapeMarkdown(fullName)}`,
        `📞 *Telefone:* [${escapeMarkdown(phone)}](tel:${phone.replace(/\D/g, '')})`,
        `🎯 *Programa:* ${escapeMarkdown(program || 'Não informado')}`,
        `📝 *Mensagem:* ${escapeMarkdown(message || 'Sem mensagem')}`,
        ``,
        `🌐 *Origem:* ${platform}`,
        `📍 *Página:* \`${escapeMarkdown(body.page_path || '/')}\``,
        `⏱ *Data/Hora:* \`${escapeMarkdown(now.toLocaleString('pt-BR'))}\``,
      ].join('\n')

      after(
        sendTelegramMessage(botMessage).catch((err) =>
          console.error('[Telegram] Background send failed after retries:', err)
        )
      )
    }
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Leads] Submit error:', error)
    return NextResponse.json(
      { error: 'Não foi possível registrar o contato.' },
      { status: 500 }
    )
  }
}