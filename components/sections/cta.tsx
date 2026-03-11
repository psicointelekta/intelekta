"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="agendar" className="py-12 sm:py-16 lg:py-24 bg-card" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 sm:p-12 lg:p-20"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:64px_64px]" />
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground leading-tight text-balance"
            >
              Comece sua jornada de desenvolvimento hoje
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed"
            >
              Agende uma aula experimental gratuita e descubra como nossa abordagem
              pode transformar seu desenvolvimento ou o de seu filho.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Button
                size="lg"
                variant="secondary"
                className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="#contato">
                  <Calendar className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Agendar aula gratuita
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-white/30 text-primary-foreground hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="https://wa.me/5527999999999" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Falar pelo WhatsApp
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-xs sm:text-sm text-primary-foreground/80"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary-foreground/60" />
                Primeira aula gratuita
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary-foreground/60" />
                Sem compromisso
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary-foreground/60" />
                Atendimento personalizado
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
