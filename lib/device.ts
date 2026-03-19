export type DeviceVariant = "desktop" | "mobile"

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
