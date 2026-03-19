import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getDeviceVariantFromUserAgent } from "@/lib/device"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next()
  }

  const deviceVariant = getDeviceVariantFromUserAgent(
    request.headers.get("user-agent"),
  )

  if (deviceVariant !== "mobile") {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = "/m"

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/"],
}
