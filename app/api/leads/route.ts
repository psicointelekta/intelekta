/**
 * POST /api/leads — Lead capture endpoint.
 *
 * Flow: validates form → checks honeypot → rate-limits by IP →
 * authenticates with Google Sheets API → ensures sheet+headers exist →
 * appends lead row with UTMs, UA, IP, and timestamp.
 *
 * Rate limit: 5 requests per 10 minutes per IP (in-memory Map).
 * Note: the in-memory Map resets on cold starts — acceptable for a
 * low-traffic site; not suitable for multi-instance deployments.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getGoogleSheets, SPREADSHEET_ID } from '@/lib/google-sheets'
import { sendTelegramMessage, escapeMarkdown } from '@/lib/telegram'

export const runtime = 'nodejs'

type RateEntry = {
  count: number
  reset: number
}

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5
const rateMap = new Map<string, RateEntry>()

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

const isRateLimited = (ip: string) => {
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

// Global cache to avoid redundant setup checks per cold start
let hasInitialized = false

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot field — bots fill hidden "website" input, humans don't
    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const fullName = (body.full_name || '').toString().trim()
    const phone = (body.phone || '').toString().trim()
    const program = (body.program || '').toString().trim()
    const message = (body.message || '').toString().trim()

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Nome e telefone são obrigatórios.' }, { status: 400 })
    }

    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em alguns minutos.' }, { status: 429 })
    }

    const sheetId = SPREADSHEET_ID
    const sheetTab = process.env.GOOGLE_SHEET_TAB || 'Leads'

    const sheets = await getGoogleSheets()

    const HEADERS = [
      'Data/Hora',
      'Nome Completo',
      'Telefone',
      'Programa',
      'Mensagem',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Página',
      'User-Agent',
      'IP',
    ]

    // Setup sheet and headers ONLY if not already checked during this instance's lifetime
    if (!hasInitialized) {
      try {
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
        const hasSheet = spreadsheet.data.sheets?.some(
          (s: any) => s.properties?.title === sheetTab
        )

        if (!hasSheet) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId: sheetId,
            requestBody: {
              requests: [{ addSheet: { properties: { title: sheetTab } } }],
            },
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
        console.error('Sheet initialization check failed (ignoring):', initError)
        // We continue anyway; append will likely work if columns match
      }
    }

    const now = new Date().toISOString()
    const leadValues = [
      now,
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

    // --- 🚀 PARALLEL EXECUTION: Append to Sheets + Notify Telegram ---
    const tasks: Promise<any>[] = [
      sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${sheetTab}!A:K`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [leadValues] },
      })
    ]

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
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
        `⏱ *Data/Hora:* \`${escapeMarkdown(new Date().toLocaleString('pt-BR'))}\``,
      ].join('\n')

      tasks.push(sendTelegramMessage(botMessage))
    }

    // Wait for all non-critical notifications to fire, but Sheets is the priority
    await Promise.all(tasks)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead submit error', error)
    return NextResponse.json({ error: 'Não foi possível registrar o contato.' }, { status: 500 })
  }
}
