/**
 * Mobile homepage — served via rewrite when proxy.ts detects a mobile UA.
 * Canonical URL is always / (handled by metadata.alternates below).
 */
import type { Metadata } from "next"

import { HomeMobile } from "@/components/pages/home-mobile"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://intelektamente.com/",
  },
}

export default function MobileHomePage() {
  return <HomeMobile />
}
