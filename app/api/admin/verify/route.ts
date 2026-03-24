import { NextResponse } from 'next/server'

/**
 * BIG TECH SECURITY LOGIN
 * - Verify Password
 * - Set Secure, HTTP-only Cookie
 */
export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      
      // Setting Cookie with BigTech security flags
      response.cookies.set('intelekta_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
      
      return response
    } else {
      return NextResponse.json({ success: false }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

/**
 * GET /api/admin/verify
 * Silent session check
 */
export async function GET(req: Request) {
  const cookieStore = req.headers.get('cookie')
  if (cookieStore?.includes('intelekta_admin_session=authenticated')) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}
