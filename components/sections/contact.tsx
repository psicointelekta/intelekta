"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
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
import { MapPin, Phone, Mail, Clock, Instagram, Send, MessageCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const program = formData.get("program") as string

    const message = `Olá! Meu nome é ${name}. Gostaria de agendar uma visita e saber mais sobre o programa ${program}. Meu contato é ${phone}.`
    const whatsappUrl = `https://wa.me/5527996194455?text=${encodeURIComponent(message)}`

    // Small delay for UX feel then redirect
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            Entre em contato para agendar uma visita ou tirar suas dúvidas.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Quick actions + mini form — takes more space */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* WhatsApp — Primary action */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Fale conosco pelo WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A maneira mais rápida de tirar dúvidas e agendar sua aula experimental.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                    <a href="https://wa.me/5527996194455?text=Olá! Gostaria de tirar algumas dúvidas e saber mais sobre a Intelekta." target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mini form — reduced friction */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-1">Ou envie uma mensagem rápida</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Preencha e entraremos em contato em até 24 horas.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Nome</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        required
                        className="h-11"
                      />
                    </Field>
                  </FieldGroup>

                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="phone">WhatsApp</FieldLabel>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(27) 99619-4455"
                        required
                        className="h-11"
                      />
                    </Field>
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="program">Programa de interesse</FieldLabel>
                    <Select name="program">
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neuroeducacao">Neuroeducação</SelectItem>
                        <SelectItem value="musicoterapia">Musicoterapia</SelectItem>
                        <SelectItem value="reforco-escolar">Reforço Escolar</SelectItem>
                        <SelectItem value="xadrez">Xadrez</SelectItem>
                        <SelectItem value="cubo-magico">Cubo Mágico</SelectItem>
                        <SelectItem value="outro">Outro / Não sei</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                <Button type="submit" size="lg" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact details */}
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
                  <a href="tel:+5527996194455" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    (27) 99619-4455
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

            {/* Map */}
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
