"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { MapPin, Phone, Mail, Clock, Instagram, Send } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }

  return (
    <section id="contato" className="py-12 sm:py-16 lg:py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Contato
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
          >
            Vamos conversar?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            Entre em contato para agendar uma visita ou tirar suas dúvidas.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact form - takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Nome completo</FieldLabel>
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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-11"
                    />
                  </Field>
                </FieldGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(27) 99999-9999"
                      className="h-11"
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="program">Programa de interesse</FieldLabel>
                    <Select name="program">
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infantil">Infantil (5-10 anos)</SelectItem>
                        <SelectItem value="adolescente">Adolescente (11-17)</SelectItem>
                        <SelectItem value="adulto">Adulto (18-59 anos)</SelectItem>
                        <SelectItem value="senior">Sênior (60+ anos)</SelectItem>
                        <SelectItem value="outro">Outro / Não sei</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="message">Mensagem</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Conte-nos sobre suas necessidades ou dúvidas..."
                    rows={3}
                    className="resize-none"
                  />
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
                    <Send className="mr-2 h-5 w-5" />
                    Enviar mensagem
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact info - compact sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-3"
          >
            {/* Compact info items */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Endereço</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
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
                  <a href="tel:+5527999999999" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    (27) 99999-9999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Email</h3>
                  <a href="mailto:contato@intelektamente.com" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
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
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Seg-Sex: 8h às 20h<br />
                    Sáb: 8h às 12h
                  </p>
                </div>
              </div>

              {/* Instagram inline */}
              <div className="pt-3 border-t border-border">
                <a
                  href="https://instagram.com/intelektamente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">@intelektamente</span>
                </a>
              </div>
            </div>

            {/* Google Maps - fills remaining space */}
            <div className="rounded-2xl overflow-hidden border border-border h-[180px] sm:h-[220px] lg:h-[200px]">
              <iframe
                src="https://maps.google.com/maps?q=Rua+Afonso+Pena,+403,+Praia+da+Costa,+Vila+Velha,+ES,+Brasil&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Intelekta no Google Maps"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
