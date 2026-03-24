import { google } from 'googleapis'

/**
 * Shared logic for interacting with Google Sheets.
 * Requires GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in .env.
 */

const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
const sheetId = process.env.GOOGLE_SHEET_ID

export async function getGoogleSheets() {
  if (!serviceEmail || !privateKey || !sheetId) {
    throw new Error('Google Sheets environment variables are missing')
  }

  const auth = new google.auth.JWT({
    email: serviceEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

export const SPREADSHEET_ID = sheetId!
