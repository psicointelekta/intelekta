"use client"

import { useEffect, useState } from "react"

const WORDS = ["mentes", "emoções", "futuros"] as const
const LONGEST = "emoções"

export function MobileHeroWordRotator() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % WORDS.length)
    }, 2800)

    return () => window.clearInterval(id)
  }, [])

  return (
    <span
      className="relative inline-grid align-top text-primary"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="scraper-hidden col-start-1 row-start-1"
        aria-hidden="true"
        data-text={LONGEST}
      />

      <span
        key={wordIndex}
        className="mobile-hero-word col-start-1 row-start-1"
      >
        {WORDS[wordIndex]}
      </span>

      <span className="absolute -bottom-1.5 left-0 h-[3px] w-full origin-left rounded-full bg-primary/30" />
    </span>
  )
}
