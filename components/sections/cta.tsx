"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="agendar" className="py-12 sm:py-16 lg:py-20 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 sm:p-10 lg:p-16"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:48px_48px]" />
          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-white/8 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-primary-foreground leading-[1.04] tracking-[-0.03em] text-balance mb-4">
                Vamos cuidar juntos do que mais importa
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/85 leading-relaxed mb-2">
                Agende uma aula experimental gratuita e conheça a nossa equipe de psicólogos
                e psicopedagogas. Queremos ouvir a sua história e encontrar o melhor caminho — juntos.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-primary-foreground/70 mt-4">
                <span>✓ Primeira aula gratuita</span>
                <span>✓ Sem compromisso</span>
                <span>✓ Atendimento personalizado</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Button
                size="lg"
                variant="secondary"
                className="h-13 sm:h-14 px-8 bg-white text-primary hover:bg-white/90 font-semibold text-sm sm:text-base w-full sm:w-auto"
                asChild
              >
                <Link href="#contato">
                  Agendar aula gratuita
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 sm:h-14 px-8 border-white/25 text-primary-foreground hover:bg-white/10 bg-transparent text-sm sm:text-base w-full sm:w-auto"
                asChild
              >
                <Link href="https://wa.me/5527988773890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Falar pelo WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
