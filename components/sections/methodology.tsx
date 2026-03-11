"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Lightbulb, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    icon: Brain,
    title: "Neurociência",
    description: "Aplicamos os avanços sobre plasticidade cerebral e aprendizagem para criar experiências que realmente transformam.",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Lightbulb,
    title: "Psicologia Cognitiva",
    description: "Técnicas comprovadas para desenvolver memória, atenção, raciocínio e funções executivas essenciais.",
    color: "from-teal-500/20 to-cyan-500/10",
  },
  {
    icon: Users,
    title: "Inteligência Emocional",
    description: "Desenvolvimento emocional integrado em cada atividade — autoconhecimento, empatia e autorregulação.",
    color: "from-cyan-500/20 to-emerald-500/10",
  },
]

const steps = [
  { number: "01", title: "Avaliação", desc: "Mapeamento completo de necessidades e potenciais", badge: "Gratuita" },
  { number: "02", title: "Planejamento", desc: "Programa personalizado com objetivos claros" },
  { number: "03", title: "Desenvolvimento", desc: "Atividades práticas com acompanhamento contínuo" },
  { number: "04", title: "Evolução", desc: "Medição de resultados e ajustes constantes" },
]

export function Methodology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="metodologia" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Dynamic background decorations */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -right-20 w-[400px] h-[400px] rounded-full bg-primary/[0.035] blur-[100px] pointer-events-none" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:40px_40px] opacity-[0.02]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — editorial, left-aligned */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-12 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="decorative-line" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Metodologia
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-serif text-editorial-lg text-foreground text-balance"
            >
              Ciência a serviço do{" "}
              <span className="text-primary">desenvolvimento humano</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pt-14"
          >
            Nossa abordagem é construída sobre três pilares científicos, unindo
            conhecimento de ponta a práticas acolhedoras e personalizadas.
          </motion.p>
        </div>

        {/* Three Pillars — larger, more visual */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-16 lg:mb-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
              className="group"
            >
              <div className={`relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${pillar.color} border border-primary/[0.08] h-full transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 sm:mb-8 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <pillar.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works — vertical timeline style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground text-center mb-10 lg:mb-14">
            Como funciona na prática
          </h3>

          <div className="max-w-4xl mx-auto">
            {/* Desktop: horizontal connected steps */}
            <div className="hidden md:grid md:grid-cols-4 gap-0">
              {steps.map((item, index) => (
                <div key={item.number} className="relative text-center px-4">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(50%+24px)] right-0 h-[2px] bg-gradient-to-r from-primary/40 to-primary/10 z-0" />
                  )}
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="font-serif text-xl font-bold text-primary">{item.number}</span>
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1.5 text-sm lg:text-base">{item.title}</h4>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile: vertical list */}
            <div className="md:hidden space-y-6">
              {steps.map((item) => (
                <div key={item.number} className="flex gap-4 items-start">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <span className="font-serif text-lg font-bold text-primary">{item.number}</span>
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA after methodology */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="text-center mt-10 lg:mt-14"
          >
            <Link
              href="#agendar"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 text-sm sm:text-base"
            >
              Comece com uma avaliação gratuita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
