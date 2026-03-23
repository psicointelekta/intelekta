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

type LeadStatus = "idle" | "success" | "error"

const PROGRAMS = [
  "Neuroeducação",
  "Xadrez Pedagógico",
  "Musicoterapia",
  "Cubo Mágico",
  "Reforço Escolar",
  "Neurolê",
  "Psicopedagogia",
  "Outro / Não sei",
] as const

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
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtmSource(params.get("utm_source") || "")
    setUtmMedium(params.get("utm_medium") || "")
    setUtmCampaign(params.get("utm_campaign") || "")
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    const formData = new FormData(event.currentTarget)

    if (formData.get("website")) {
      setIsSubmitting(false)
      return
    }

    const fullName = String(formData.get("full_name") || "")
    const phoneValue = String(formData.get("phone") || "")
    const program = String(formData.get("program") || "Não informado")
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

      const text = `Olá! Meu nome é ${fullName}. Gostaria de agendar uma aula experimental gratuita e saber mais sobre o programa ${program}. Meu contato é ${phoneValue}. ${message ? `Observação: ${message}` : ""}`
      const whatsappUrl = `https://wa.me/5527988773890?text=${encodeURIComponent(text)}`
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
      event.currentTarget.reset()
      setPhone("")
    } catch {
      setStatus("error")
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
            Retornamos em até 24 horas.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input type="text" name="website" aria-hidden tabIndex={-1} className="hidden" />

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
            name="program"
            required
            defaultValue=""
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
          >
            <option value="" disabled>
              Selecione um programa
            </option>
            {PROGRAMS.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
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
          <span>Retorno em até 24h · Dados seguros</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Enviando..." : "Enviar e abrir WhatsApp"}
        </button>

        <p className="text-xs text-muted-foreground" aria-live="polite" role="status">
          {status === "success" && "Lead registrado com sucesso. Abrindo WhatsApp..."}
          {status === "error" && "Não conseguimos registrar. Tente novamente ou fale direto no WhatsApp."}
        </p>
      </form>
    </div>
  )
}
