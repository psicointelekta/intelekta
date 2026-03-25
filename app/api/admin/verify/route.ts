import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * BIG TECH SECURITY LOGIN
 * - Verify Password
 * - Set Secure, HTTP-only Cookie
 */
export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (password === process.env.ADMIN_PASSWORD) {
      // Setting Cookie with BigTech security flags
      const cookieStore = await cookies()
      cookieStore.set('intelekta_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
      
      return NextResponse.json({ success: true })
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
export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('intelekta_admin_session')
  
  if (session?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

/**
 * DELETE /api/admin/verify
 * Logout
 */
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('intelekta_admin_session')
  return NextResponse.json({ success: true })
}
