"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Brain, Heart, Sparkles, Target } from "lucide-react"

const values = [
  {
    icon: Brain,
    title: "Ciência como base",
    description: "Cada programa é construído sobre evidências sólidas da neurociência e psicologia cognitiva.",
  },
  {
    icon: Heart,
    title: "Acolhimento genuíno",
    description: "Um ambiente seguro onde cada pessoa se sente valorizada e respeitada em sua individualidade.",
  },
  {
    icon: Sparkles,
    title: "Potencial ilimitado",
    description: "Acreditamos que todas as pessoas podem aprender, evoluir e fortalecer suas capacidades.",
  },
  {
    icon: Target,
    title: "Personalização real",
    description: "Programas adaptados às necessidades, ritmo e objetivos únicos de cada pessoa.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="sobre" className="py-12 sm:py-16 lg:py-24 bg-dark-section" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-secondary uppercase tracking-wider mb-3"
          >
            Sobre nós
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-dark-section-foreground leading-tight text-balance"
          >
            Um espaço onde mente e emoções evoluem lado a lado
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-dark-section-foreground/70 leading-relaxed text-pretty"
          >
            A Intelekta nasceu da convicção de que o desenvolvimento humano vai muito além
            do conteúdo escolar. Somos um centro de educação complementar dedicado a
            estimular o potencial cognitivo e emocional de pessoas em todas as fases da vida.
          </motion.p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
              className="group"
            >
              <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-primary/20 flex items-center justify-center mb-3 sm:mb-5 lg:mb-6 group-hover:bg-primary/30 transition-colors">
                  <value.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <h3 className="font-serif text-sm sm:text-base lg:text-xl font-semibold text-dark-section-foreground mb-1 sm:mb-2 lg:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-dark-section-foreground/70 leading-relaxed hidden sm:block">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nino + Mission combined */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 lg:mt-16"
        >
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 via-white/5 to-secondary/5 border border-primary/15 overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center">
              {/* Nino image - large, left side */}
              <div className="relative flex items-center justify-center py-8 px-6 lg:py-12 lg:px-10">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
                  <Image
                    src="/images/nino-mascote.webp"
                    alt="Nino - Mascote da Intelekta"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 288px"
                    loading="lazy"
                  />
                </div>
                {/* Decorative glow behind Nino */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-primary/8 blur-3xl" />
                </div>
              </div>

              {/* Text content - right side */}
              <div className="px-6 pb-8 lg:py-12 lg:px-10 lg:pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-dark-section-foreground">
                    Conheça o Nino 🐿️
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-dark-section-foreground/70 leading-relaxed mb-6">
                  Nosso mascote representa a curiosidade incansável, a inteligência ágil
                  e o equilíbrio perfeito entre razão e emoção — qualidades que cultivamos
                  em cada pessoa que passa pela Intelekta.
                </p>
                <blockquote className="font-serif text-base sm:text-lg lg:text-xl text-dark-section-foreground leading-relaxed italic border-l-4 border-primary/30 pl-4 sm:pl-6">
                  &quot;Nosso propósito é despertar em cada pessoa a confiança de que pode
                  desenvolver novas habilidades, superar desafios e construir uma vida
                  mais equilibrada e significativa.&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-px bg-primary/30" />
                  <span className="text-xs sm:text-sm text-dark-section-foreground/60 font-medium">
                    Fundadoras da Intelekta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
