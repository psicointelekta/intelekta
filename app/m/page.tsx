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
