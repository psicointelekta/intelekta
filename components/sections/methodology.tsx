/**
 * Methodology section — three scientific pillars
 * (Neurociência, Psicologia Cognitiva, Inteligência Emocional)
 * displayed in a catalog strip, plus a 4-step horizontal timeline.
 */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Lightbulb, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    icon: Brain,
    title: "Neurociência",
    description:
      "Aplicamos os avanços sobre plasticidade cerebral e aprendizagem para criar experiências que realmente transformam.",
    roman: "I",
  },
  {
    icon: Lightbulb,
    title: "Psicologia Cognitiva",
    description:
      "Técnicas comprovadas para desenvolver memória, atenção, raciocínio e funções executivas essenciais.",
    roman: "II",
  },
  {
    icon: Users,
    title: "Inteligência Emocional",
    description:
      "Desenvolvimento emocional integrado em cada atividade — autoconhecimento, empatia e autorregulação.",
    roman: "III",
  },
]

const steps = [
  {
    number: "01",
    title: "Avaliação",
    desc: "Mapeamento completo de necessidades e potenciais",
    badge: "Gratuita",
  },
  {
    number: "02",
    title: "Planejamento",
    desc: "Programa personalizado com objetivos claros",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    desc: "Atividades práticas com acompanhamento contínuo",
  },
  {
    number: "04",
    title: "Evolução",
    desc: "Medição de resultados e ajustes constantes",
  },
]

export function Methodology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="metodologia"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      ref={ref}
    >
      <div className="absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-secondary/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-primary/[0.035] blur-[100px]" />

      {/* Dot matrix texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:40px_40px] opacity-[0.02]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ────────────────────────────────────────── */}
        <div className="mb-14 grid items-start gap-6 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              <div className="decorative-line" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Metodologia
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-serif text-editorial-lg text-balance text-foreground leading-[1.04]"
            >
              Ciência a serviço do{" "}
              <span className="text-primary">desenvolvimento humano</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:pt-14"
          >
            Nossa equipe de psicólogos e psicopedagogas combina conhecimento
            científico com sensibilidade humana — porque acreditamos que o cuidado
            genuíno é o que transforma de verdade.
          </motion.p>
        </div>

        {/* ── Pillars — catalog strip ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 lg:mb-28"
        >
          {/* Catalog label */}
          <div className="mb-5 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/35">
              Fundamentação teórica
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/10 to-transparent" />
          </div>

          {/* The catalog strip — bordered, divided by vertical rules */}
          <div className="overflow-hidden rounded-2xl border border-primary/[0.09]">
            <div className="grid divide-y divide-primary/[0.07] md:grid-cols-3 md:divide-x md:divide-y-0">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 + index * 0.1 }}
                  className="group relative overflow-hidden p-7 transition-colors duration-300 hover:bg-primary/[0.015] sm:p-9 lg:p-10"
                >
                  {/* Roman numeral — large ghost decoration */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1 right-4 select-none font-serif text-[96px] font-black leading-none text-primary/[0.045] transition-colors duration-500 group-hover:text-primary/[0.085] lg:text-[112px]"
                  >
                    {pillar.roman}
                  </span>

                  {/* Thin top accent per column */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <pillar.icon className="h-6 w-6 text-primary-foreground" />
                    </div>

                    <h3 className="mb-3 font-serif text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── How it works — horizontal timeline ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="mb-10 text-center font-serif text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl lg:mb-14">
            Como funciona na prática
          </h3>

          <div className="mx-auto max-w-4xl">
            {/* Desktop: horizontal connected steps */}
            <div className="hidden md:grid md:grid-cols-4">
              {steps.map((item, index) => (
                <div key={item.number} className="relative px-4 text-center">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+24px)] right-0 top-8 z-0 h-[2px] bg-gradient-to-r from-primary/40 to-primary/10" />
                  )}
                  {/* Step circle */}
                  <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10">
                    <span className="font-serif text-xl font-black text-primary">
                      {item.number}
                    </span>
                    {item.badge && (
                      <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="mb-1.5 text-sm font-semibold text-foreground lg:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground lg:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile: vertical list */}
            <div className="space-y-6 md:hidden">
              {steps.map((item) => (
                <div key={item.number} className="flex items-start gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/10">
                    <span className="font-serif text-lg font-black text-primary">
                      {item.number}
                    </span>
                    {item.badge && (
                      <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-10 text-center lg:mt-14"
          >
            <Link
              href="#contato"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:gap-3 sm:text-base"
            >
              Comece com uma aula experimental gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}