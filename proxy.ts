/**
 * Next.js 16 Proxy (replaces traditional middleware.ts).
 *
 * Routes users based on User-Agent:
 * - Mobile UA → rewrites `/` to `/m` (separate mobile page, invisible to user)
 * - Desktop UA → serves `/` normally
 * - Direct `/m` access → 301 redirects to `/` (prevents duplicate content)
 *
 * Every response includes `Vary: User-Agent` so CDN caches
 * separate versions per device class.
 */
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getDeviceVariantFromUserAgent } from "@/lib/device"

/** Ensures CDN/edge caches store separate responses per User-Agent */
function withUserAgentVary(response: NextResponse) {
  response.headers.append("Vary", "User-Agent")
  return response
}

export function proxy(request: NextRequest) {
  // Prevent direct /m access — canonical URL is always /
  if (request.nextUrl.pathname === "/m") {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return withUserAgentVary(NextResponse.redirect(url))
  }

  if (request.nextUrl.pathname !== "/") {
    return withUserAgentVary(NextResponse.next())
  }

  const deviceVariant = getDeviceVariantFromUserAgent(
    request.headers.get("user-agent"),
  )

  if (deviceVariant !== "mobile") {
    return withUserAgentVary(NextResponse.next())
  }

  // Rewrite (not redirect) so the URL bar stays on / for mobile users
  const url = request.nextUrl.clone()
  url.pathname = "/m"

  return withUserAgentVary(NextResponse.rewrite(url))
}

export const config = {
  matcher: ["/", "/m"],
}
