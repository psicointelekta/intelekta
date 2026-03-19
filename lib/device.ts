/**
 * Device detection via User-Agent string.
 * Used by proxy.ts to route mobile users to the /m page.
 */

export type DeviceVariant = "desktop" | "mobile"

/**
 * Broad regex covering the most common mobile UA tokens.
 * Intentionally includes iPad/Tablet because the mobile page
 * is optimised for touch-first viewports.
 */
const MOBILE_USER_AGENT_RE =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|iPad/i

export function getDeviceVariantFromUserAgent(
  userAgent: string | null | undefined,
): DeviceVariant {
  if (!userAgent) {
    return "desktop"
  }

  return MOBILE_USER_AGENT_RE.test(userAgent) ? "mobile" : "desktop"
}
