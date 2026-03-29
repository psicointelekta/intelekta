/**
 * Telegram Bot API Utility
 * 
 * Sends a message to a Telegram chat using a bot token.
 * Uses MarkdownV2 for formatting. 
 * Special characters in values must be escaped.
 */
export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram Bot configuration missing (TOKEN or CHAT_ID)')
    return { ok: false, error: 'Config missing' }
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'MarkdownV2'
      })
    })

    const data = await response.json()
    return { ok: data.ok, error: data.description }
  } catch (error) {
    console.error('Telegram notification failed:', error)
    return { ok: false, error }
  }
}

/**
 * Escapes characters for Telegram MarkdownV2 compliance.
 */
export function escapeMarkdown(text: string): string {
  if (!text) return ''
  // Telegram MarkdownV2 required escaping: _ * [ ] ( ) ~ ` > # + - = | { } . !
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}
