/**
 * Mobile homepage — served via rewrite when proxy.ts detects a mobile UA.
 * Canonical URL is always / (handled by metadata.alternates below).
 */
import type { Metadata } from "next"

import { HomeMobile } from "@/components/pages/home-mobile"
import { getGoogleSheets, SPREADSHEET_ID } from "@/lib/google-sheets"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://intelektamente.com/",
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAnnouncements() {
  try {
    const sheets = await getGoogleSheets()
    const sheetTab = process.env.GOOGLE_SHEET_TAB_NEWS || 'Novidades'
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTab}!A2:F10`,
    })

    const rows = response.data.values || []
    return rows.map((row) => ({
      date: row[0] || '',
      category: row[1] || 'Novidades',
      title: row[2] || '',
      description: row[3] || '',
      imageUrl: row[4] || '',
      linkUrl: row[5] || '',
    }))
  } catch (error) {
    console.error('Error fetching announcements for mobile home:', error)
    return []
  }
}

export default async function MobileHomePage() {
  const announcements = await getAnnouncements()
  return <HomeMobile announcements={announcements} />
}
