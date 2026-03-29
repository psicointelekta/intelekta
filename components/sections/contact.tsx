/**
 * Contact section — lead capture form + WhatsApp CTA + Google Maps embed.
 *
 * Form flow: validates locally → POST /api/leads → on success opens
 * WhatsApp with a pre-filled message. Honeypot + server-side rate limiting.
 * UTM parameters captured from URL on section enter (useInView).
 */
"use client"

import { motion, useInView } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { track } from "@vercel/analytics/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { MapPin, Phone, Mail, Clock, Instagram, Send, MessageCircle, ShieldCheck } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { PROGRAM_OPTIONS } from "@/lib/program-catalog"
import {
  buildProgramWhatsappUrl,
  PROGRAM_SELECTION_EVENT,
  readProgramSelection,
} from "@/lib/program-selection"

type LeadStatus = "idle" | "success" | "error"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<LeadStatus>("idle")
  const [phone, setPhone] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")

  const whatsappMessage = useMemo(
    () => buildProgramWhatsappUrl(selectedProgram),
    [selectedProgram]
  )

  const formatPhone = useCallback((value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget // Capture here
    setIsSubmitting(true)
    setStatus("idle")

    const formData = new FormData(form)
    if (formData.get("website")) {
      setIsSubmitting(false)
      return
    }

    const fullName = formData.get("full_name") as string
    const phoneValue = (formData.get("phone") as string) || ""
    const program = selectedProgram || (formData.get("program") as string) || "Não informado"
    const message = (formData.get("message") as string) || ""
    const payload = {
      full_name: fullName,
      phone: phoneValue,
      program,
      message,
      utm_source: formData.get("utm_source") || "",
      utm_medium: formData.get("utm_medium") || "",
      utm_campaign: formData.get("utm_campaign") || "",
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Erro ao salvar lead")
      }

      setStatus("success")
      track("lead_submit_success", { program })

      form.reset() // Use captured ref
      setPhone("")
    } catch (error) {
      console.error(error)
      setStatus("error")
      track("lead_submit_error", { program })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  useEffect(() => {
    if (!isInView) return
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get("utm_source") || ""
    const utmMedium = params.get("utm_medium") || ""
    const utmCampaign = params.get("utm_campaign") || ""
    const inputs = document.querySelectorAll<HTMLInputElement>("[data-utm-field]")
    inputs.forEach((input) => {
      if (input.name === "utm_source") input.value = utmSource
      if (input.name === "utm_medium") input.value = utmMedium
      if (input.name === "utm_campaign") input.value = utmCampaign
    })
  }, [isInView])

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" aria-hidden />
      <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[120px] pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Contato
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-editorial-lg text-foreground text-balance mb-4"
          >
            Vamos <span className="text-primary">conversar?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-muted-foreground"
          >
            Entre em contato para agendar sua aula experimental gratuita ou tirar suas dúvidas. Retornamos pelo WhatsApp em até 24 horas úteis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 grid gap-3 sm:grid-cols-3"
          >
            {[
              "1. Entendemos seu objetivo",
              "2. Indicamos o melhor caminho",
              "3. Agendamos sua aula experimental",
            ].map((step) => (
              <div key={step} className="rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm font-medium text-foreground/85">
                {step}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Fale conosco pelo WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedProgram && selectedProgram !== "Outro / Não sei"
                      ? `A maneira mais rápida de falar sobre ${selectedProgram} e agendar sua aula experimental.`
                      : "A maneira mais rápida de tirar dúvidas e agendar sua aula experimental."}
                  </p>
                  <Button
                    className="bg-green-700 hover:bg-green-800 text-white"
                    asChild
                    onClick={() => track("cta_whatsapp_abertura")}
                  >
                    <a
                      href={whatsappMessage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Ou envie uma mensagem rápida</h3>
                </div>
                <ShieldCheck className="w-5 h-5 text-primary" aria-hidden />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input type="text" name="website" aria-hidden tabIndex={-1} className="hidden" />
                <input data-utm-field type="hidden" name="utm_source" />
                <input data-utm-field type="hidden" name="utm_medium" />
                <input data-utm-field type="hidden" name="utm_campaign" />
                <input type="hidden" name="program" value={selectedProgram} />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="full_name">Nome completo</FieldLabel>
                      <Input
                        id="full_name"
                        name="full_name"
                        type="text"
                        placeholder="Como gostaria de ser chamado?"
                        autoComplete="name"
                        required
                        className="h-11"
                      />
                    </Field>
                  </FieldGroup>

                  <Field>
                    <FieldLabel htmlFor="phone">WhatsApp</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="(27) 99999-9999"
                      autoComplete="tel"
                      required
                      className="h-11"
                      value={phone}
                      onChange={(event) => setPhone(formatPhone(event.target.value))}
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="program">Programa de interesse</FieldLabel>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram} required>
                    <SelectTrigger id="program" className="h-11 w-full">
                      <SelectValue placeholder="Selecione um programa" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROGRAM_OPTIONS.map((program) => (
                        <SelectItem value={program} key={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProgram ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Programa pré-selecionado. Você pode ajustar se quiser.
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">Mensagem (opcional)</FieldLabel>
                  <Input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Conte-nos objetivo, idade, horários..."
                    className="h-11"
                  />
                </Field>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Retorno pelo WhatsApp em até 24h úteis · Dados seguros</span>
                </div>

                <div className="space-y-2">
                  <Button type="submit" size="lg" className="w-full h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </Button>
                  <p
                    className="text-xs text-muted-foreground"
                    aria-live="polite"
                    role="status"
                  >
                    {status === "success" && "Mensagem enviada com sucesso! Entraremos em contato em breve."}
                    {status === "error" && "Não conseguimos registrar. Tente novamente ou fale direto no WhatsApp."}
                    {status === "idle" && ""}
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="p-5 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Rua Afonso Pena, 403<br />
                    Praia da Costa, Vila Velha - ES
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Telefone</h3>
                  <a href="tel:+5527988773890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    (27) 98877-3890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Email</h3>
                  <a href="mailto:contato@intelektamente.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    contato@intelektamente.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Horário</h3>
                  <p className="text-sm text-muted-foreground">
                    Seg-Sex: 9h às 18h<br />
                    Sáb: 9h às 12h
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <a
                  href="https://www.instagram.com/psicointelekta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">@psicointelekta</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-[200px] sm:h-[240px]">
              <iframe
                src="https://maps.google.com/maps?q=Rua+Afonso+Pena,+403,+Praia+da+Costa,+Vila+Velha,+ES,+Brasil&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Intelekta — Rua Afonso Pena, 403, Praia da Costa, Vila Velha, ES"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
