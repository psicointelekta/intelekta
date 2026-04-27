'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * AccessTracker — Silent component that registers the visit in Google Sheets.
 * Uses sessionStorage to ensure we only log once per browser session.
 */
export function AccessTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only track once per session to avoid cluttering the sheet
    const sessionKey = 'intelekta_tracked_session'
    if (sessionStorage.getItem(sessionKey)) return

    const trackAccess = async () => {
      try {
        const payload = {
          utm_source: searchParams.get('utm_source'),
          utm_medium: searchParams.get('utm_medium'),
          utm_campaign: searchParams.get('utm_campaign'),
          gclid: searchParams.get('gclid'),
          referrer: document.referrer,
          page_path: window.location.pathname + window.location.search,
        }

        const res = await fetch('/api/tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          sessionStorage.setItem(sessionKey, 'true')
        }
      } catch (error) {
        // Silent fail — don't affect user experience
      }
    }

    // Wait a bit to ensure it's not a bot bounce or immediate close
    const timer = setTimeout(trackAccess, 2000)
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null // Invisible component
}
