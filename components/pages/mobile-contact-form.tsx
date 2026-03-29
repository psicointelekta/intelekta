/**
 * Mobile lead capture form.
 *
 * Uses native HTML elements instead of Radix UI to minimise JS on mobile.
 * On success, opens WhatsApp with a pre-filled message including the user's
 * name, phone, program choice, and optional message.
 *
 * Honeypot field + server-side rate limiting protect against spam.
 * UTM parameters are captured from the URL on mount.
 */
"use client"

import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { track } from "@vercel/analytics/react"

import { PROGRAM_OPTIONS } from "@/lib/program-catalog"
import { PROGRAM_SELECTION_EVENT, readProgramSelection } from "@/lib/program-selection"

type LeadStatus = "idle" | "success" | "error"

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function MobileContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<LeadStatus>("idle")
  const [phone, setPhone] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtmSource(params.get("utm_source") || "")
    setUtmMedium(params.get("utm_medium") || "")
    setUtmCampaign(params.get("utm_campaign") || "")

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget // Capture before await
    setIsSubmitting(true)
    setStatus("idle")

    const formData = new FormData(form)

    if (formData.get("website")) {
      setIsSubmitting(false)
      return
    }

    const fullName = String(formData.get("full_name") || "")
    const phoneValue = String(formData.get("phone") || "")
    const program = selectedProgram || String(formData.get("program") || "Não informado")
    const message = String(formData.get("message") || "")

    const payload = {
      full_name: fullName,
      phone: phoneValue,
      program,
      message,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar lead")
      }

      setStatus("success")
      track("lead_submit_success_mobile", { program })

      form.reset() // Use captured ref
      setPhone("")
    } catch {
      setStatus("error")
      track("lead_submit_error_mobile", { program })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">Ou envie uma mensagem rápida</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Retornamos pelo WhatsApp em até 24 horas úteis.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input type="text" name="website" aria-hidden tabIndex={-1} className="hidden" />
        <input type="hidden" name="program" value={selectedProgram} />

        <div className="space-y-1.5">
          <label htmlFor="mobile-full-name" className="text-sm font-medium text-foreground">
            Nome completo
          </label>
          <input
            id="mobile-full-name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Como gostaria de ser chamado?"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mobile-phone" className="text-sm font-medium text-foreground">
            WhatsApp
          </label>
          <input
            id="mobile-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            placeholder="(27) 99999-9999"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mobile-program" className="text-sm font-medium text-foreground">
            Programa de interesse
          </label>
          <select
            id="mobile-program"
            required
            value={selectedProgram}
            onChange={(event) => setSelectedProgram(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
          >
            <option value="" disabled>
              Selecione um programa
            </option>
            {PROGRAM_OPTIONS.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
          {selectedProgram ? (
            <p className="text-xs text-muted-foreground">
              Programa pré-selecionado. Você pode alterar se quiser.
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mobile-message" className="text-sm font-medium text-foreground">
            Mensagem (opcional)
          </label>
          <input
            id="mobile-message"
            name="message"
            type="text"
            placeholder="Conte-nos objetivo, idade, horários..."
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Retorno pelo WhatsApp em até 24h úteis · Dados seguros</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>

        <p className="text-xs text-muted-foreground" aria-live="polite" role="status">
          {status === "success" && "Mensagem enviada com sucesso! Entraremos em contato em breve."}
          {status === "error" && "Não conseguimos registrar. Tente novamente ou fale direto no WhatsApp."}
        </p>
      </form>
    </div>
  )
}
