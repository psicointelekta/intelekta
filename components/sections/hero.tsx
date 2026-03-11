"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { NeuralTree } from "@/components/neural-tree"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background pt-16 sm:pt-20">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49.5%,var(--border)_50%,transparent_50.5%,transparent_100%)] bg-[length:140px_100%] opacity-[0.12]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49.5%,var(--border)_50%,transparent_50.5%,transparent_100%)] bg-[length:100%_140px] opacity-[0.12]" />

      {/* NEURAL NETWORK — full background */}
      <div className="absolute inset-0">
        <NeuralTree />
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent lg:via-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Context line — human, not corporate */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base text-primary font-medium mb-5 sm:mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-primary" />
            Centro de desenvolvimento cognitivo e socioemocional
          </motion.p>

          {/* Main headline — dramatic editorial typography */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-editorial-xl text-foreground text-balance"
          >
            Fortalecendo{" "}
            <span className="text-primary">mentes</span>
            <br className="hidden sm:block" />{" "}
            e emoções
          </motion.h1>

          {/* Impact statement — the "why" */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty"
          >
            Programas personalizados fundamentados em neurociência para crianças,
            adolescentes, adultos e seniores. Porque todo potencial merece ser descoberto.
          </motion.p>

          {/* CTAs — benefit-driven */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              className="h-13 sm:h-14 px-7 sm:px-8 text-sm sm:text-base w-full sm:w-auto animate-cta-pulse"
              asChild
            >
              <Link href="#agendar">
                Agende uma aula grátis
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-13 sm:h-14 px-7 sm:px-8 text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm bg-background/50"
              asChild
            >
              <Link href="#programas">
                Descubra seu programa ideal
              </Link>
            </Button>
          </motion.div>

          {/* Trust — real and simple */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                4.9/5
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">+200 famílias</strong> confiam na Intelekta
            </span>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-sm text-muted-foreground hidden sm:block">
              Vila Velha, ES
            </span>
          </motion.div>
        </div>

        {/* Hint — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden lg:block absolute bottom-24 right-12 xl:right-20"
        >
          <motion.p
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xs text-muted-foreground/50 italic"
          >
            ← Mova o mouse para estimular a rede neural
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
            Descubra
          </span>
          <div className="w-5 h-9 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-primary/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
