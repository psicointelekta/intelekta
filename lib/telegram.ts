/**
 * Telegram Bot API Utility
 *
 * Sends a MarkdownV2-formatted message to a Telegram chat.
 * Retries up to MAX_RETRIES times on transient failures.
 * Safe to call from after() — does not block the HTTP response.
 */

const MAX_RETRIES = 3
const BASE_TIMEOUT_MS = 10_000 // 10s — safe because runs outside response path

export async function sendTelegramMessage(
  text: string
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return { ok: false, error: 'Config missing' }
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const payload = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
  })

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), BASE_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await response.json()

      if (data.ok) {
        if (attempt > 1) {
          console.log(`[Telegram] Sent successfully on attempt ${attempt}`)
        }
        return { ok: true }
      }

      // 4xx from Telegram = config error (bad token, wrong chat_id, invalid markdown).
      // No point retrying — fail fast.
      console.error(`[Telegram] API rejected message (${response.status}):`, data.description)
      if (response.status >= 400 && response.status < 500) {
        return { ok: false, error: data.description }
      }

      // 5xx or unexpected — fall through to retry
      throw new Error(`Telegram API ${response.status}: ${data.description}`)
    } catch (error: any) {
      clearTimeout(timeoutId)
      const isAbort = error.name === 'AbortError'
      console.warn(
        `[Telegram] Attempt ${attempt}/${MAX_RETRIES} failed — ${isAbort ? `timeout after ${BASE_TIMEOUT_MS}ms` : error.message}`
      )

      if (attempt === MAX_RETRIES) {
        return { ok: false, error: isAbort ? 'Max timeout exceeded' : error.message }
      }

      // Exponential backoff: 500ms, 1000ms, ...
      await new Promise((r) => setTimeout(r, 500 * attempt))
    }
  }

  return { ok: false, error: 'Max retries exceeded' }
}

/**
 * Escapes characters for Telegram MarkdownV2 compliance.
 */
export function escapeMarkdown(text: string): string {
  if (!text) return ''
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}