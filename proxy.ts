/**
 * Next.js 16 Proxy (replaces traditional middleware.ts).
 * 
 * BIG TECH SECURITY LAYER INTEGRATED:
 * - Device-based routing (Mobile/Desktop)
 * - Security Headers (CSP, HSTS, X-Frame)
 * - Session Cookie Protection for Admin
 */
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getDeviceVariantFromUserAgent } from "@/lib/device"

/** Ensures CDN/edge caches store separate responses per User-Agent and adds Security Headers */
function injectSecurityAndVary(response: NextResponse) {
  // 1. Device Vary
  response.headers.append("Vary", "User-Agent")
  
  // 2. BIG TECH SECURITY HEADERS
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.public.blob.vercel-storage.com https://images.unsplash.com https://*.google.com https://*.google.com.br https://www.googletagmanager.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://va.vercel-scripts.com https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
    frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com https://*.google.com.br;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- 🔒 SEGURANÇA: ADMIN API PROTECTION ---
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/verify') {
    const session = request.cookies.get('intelekta_admin_session')
    if (!session) {
      return NextResponse.json({ error: 'Auth required' }, { status: 401 })
    }
  }

  // --- 📱 ROUTING: MOBILE vs DESKTOP ---
  
  const seoRoutes = ['/sobre', '/programas', '/metodologia', '/equipe', '/depoimentos', '/faq', '/contato']
  const isRoot = pathname === "/"
  const isSeoRoute = seoRoutes.includes(pathname)

  // Prevent direct /m access
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/m/, "") || "/"
    return injectSecurityAndVary(NextResponse.redirect(url))
  }

  // Only handle root and SEO routes for mobile rewrite
  if (!isRoot && !isSeoRoute) {
    return injectSecurityAndVary(NextResponse.next())
  }

  const deviceVariant = getDeviceVariantFromUserAgent(
    request.headers.get("user-agent"),
  )

  if (deviceVariant !== "mobile") {
    return injectSecurityAndVary(NextResponse.next())
  }

  // Rewrite for mobile users
  const url = request.nextUrl.clone()
  url.pathname = isRoot ? "/m" : `/m${pathname}`

  return injectSecurityAndVary(NextResponse.rewrite(url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
