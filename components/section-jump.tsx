"use client"

import { useLayoutEffect } from "react"

/**
 * Immediate jump to a section by its ID on mount.
 * Used for deep-links in a Single Page App architecture.
 */
export function SectionJump({ targetId }: { targetId?: string }) {
  useLayoutEffect(() => {
    if (!targetId) return

    const element = document.getElementById(targetId)
    if (element) {
      const html = document.documentElement
      
      // Force 'auto' behavior aggressively
      const originalStyle = html.style.scrollBehavior
      html.style.setProperty('scroll-behavior', 'auto', 'important')
      
      // Calculate position with header offset (approx 80px)
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      })
      
      // Restore original behavior
      setTimeout(() => {
        html.style.scrollBehavior = originalStyle
      }, 50)
    }
  }, [targetId])

  return null
}
