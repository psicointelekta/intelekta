import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getDeviceVariantFromUserAgent } from "@/lib/device"

function withUserAgentVary(response: NextResponse) {
  response.headers.append("Vary", "User-Agent")
  return response
}

export function proxy(request: NextRequest) {
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

  const url = request.nextUrl.clone()
  url.pathname = "/m"

  return withUserAgentVary(NextResponse.rewrite(url))
}

export const config = {
  matcher: ["/", "/m"],
}
