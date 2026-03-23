"use client"

import type { ReactNode } from "react"
import { track } from "@vercel/analytics/react"

import {
  buildProgramWhatsappUrl,
  PROGRAM_SELECTION_EVENT,
  readProgramSelection,
} from "@/lib/program-selection"
import { useEffect, useMemo, useState } from "react"

type ProgramAwareWhatsappLinkProps = {
  source: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function ProgramAwareWhatsappLink({
  source,
  className,
  children,
  onClick,
}: ProgramAwareWhatsappLinkProps) {
  const [selectedProgram, setSelectedProgram] = useState("")

  useEffect(() => {
    const selection = readProgramSelection()
    if (selection?.program) {
      setSelectedProgram(selection.program)
    }

    const handleSelection = (event: Event) => {
      const customEvent = event as CustomEvent<{ program?: string }>
      if (customEvent.detail?.program) {
        setSelectedProgram(customEvent.detail.program)
      }
    }

    window.addEventListener(PROGRAM_SELECTION_EVENT, handleSelection as EventListener)
    return () => {
      window.removeEventListener(PROGRAM_SELECTION_EVENT, handleSelection as EventListener)
    }
  }, [])

  const href = useMemo(() => buildProgramWhatsappUrl(selectedProgram), [selectedProgram])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        onClick?.()
        track("program_aware_whatsapp_click", { source, program: selectedProgram || "Outro / Não sei" })
      }}
    >
      {children}
    </a>
  )
}