/**
 * ProgramCtaLink — anchor that saves the selected program to session
 * and fires a Vercel Analytics event before scrolling to #contato.
 * Used inside each program card in the Programs carousel.
 */
"use client"

import type { ReactNode } from "react"
import { track } from "@vercel/analytics/react"

import { saveProgramSelection } from "@/lib/program-selection"

type ProgramCtaLinkProps = {
  program: string
  source: string
  href?: string
  className?: string
  children: ReactNode
}

export function ProgramCtaLink({
  program,
  source,
  href = "#contato",
  className,
  children,
}: ProgramCtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        saveProgramSelection(program, source)
        track("program_cta_click", { program, source, href })
      }}
    >
      {children}
    </a>
  )
}