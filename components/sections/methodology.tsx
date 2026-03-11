"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Lightbulb, Users } from "lucide-react"

const pillars = [
  {
    icon: Brain,
    title: "Neurociência",
    description: "Aplicamos os avanços da neurociência sobre plasticidade cerebral e aprendizagem para criar experiências que realmente transformam.",
  },
  {
    icon: Lightbulb,
    title: "Psicologia Cognitiva",
    description: "Utilizamos técnicas comprovadas para desenvolver memória, atenção, raciocínio e outras funções executivas essenciais.",
  },
  {
    icon: Users,
    title: "Inteligência Emocional",
    description: "Integramos o desenvolvimento emocional em cada atividade, fortalecendo autoconhecimento, empatia e autorregulação.",
  },
]

export function Methodology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="metodologia" className="py-12 sm:py-16 lg:py-24 bg-card" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-3"
          >
            Metodologia
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
          >
            Ciência a serviço do desenvolvimento humano
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty"
          >
            Nossa abordagem é construída sobre três pilares científicos, unindo conhecimento
            de ponta a práticas acolhedoras e personalizadas.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 mb-10 lg:mb-14">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-5 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl bg-background border border-border h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 shadow-lg shadow-primary/20">
                  <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2 sm:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works - compact version */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-foreground text-center mb-8 lg:mb-10">
              Como funciona na prática
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { step: "01", title: "Avaliação", desc: "Mapeamento de necessidades e potenciais" },
                { step: "02", title: "Planejamento", desc: "Programa personalizado e objetivos claros" },
                { step: "03", title: "Desenvolvimento", desc: "Atividades práticas e acompanhamento" },
                { step: "04", title: "Evolução", desc: "Medição de resultados e ajustes" },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-primary/10" />
                  )}
                  <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-3">
                    <span className="font-serif text-base sm:text-lg lg:text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">{item.title}</h4>
                  <p className="text-xs lg:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
