"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const values = [
  {
    accent: "bg-emerald-500/15 text-emerald-600",
    dot: "bg-emerald-500",
    title: "Ciência como base",
    text: "Cada programa é construído sobre evidências sólidas da neurociência e psicologia cognitiva.",
  },
  {
    accent: "bg-teal-500/15 text-teal-600",
    dot: "bg-teal-500",
    title: "Acolhimento genuíno",
    text: "Um ambiente seguro onde cada pessoa se sente valorizada e respeitada em sua individualidade.",
  },
  {
    accent: "bg-cyan-500/15 text-cyan-600",
    dot: "bg-cyan-500",
    title: "Potencial ilimitado",
    text: "Acreditamos que todas as pessoas podem aprender, evoluir e fortalecer suas capacidades.",
  },
  {
    accent: "bg-green-500/15 text-green-600",
    dot: "bg-green-500",
    title: "Personalização real",
    text: "Programas adaptados às necessidades, ritmo e objetivos únicos de cada pessoa.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="sobre" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Dynamic background decorations */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.035] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary/[0.04] blur-[100px] pointer-events-none" />
      {/* Subtle diagonal lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_60px,var(--primary)_60px,var(--primary)_60.5px)] opacity-[0.018]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section intro — editorial, not centered */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="decorative-line" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Sobre nós
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-serif text-editorial-lg text-foreground text-balance"
            >
              Um espaço onde mente e emoções{" "}
              <span className="text-primary">evoluem lado a lado</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="lg:pt-14"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              A Intelekta nasceu da convicção de que o desenvolvimento humano vai muito além
              do conteúdo escolar. Somos um centro de educação complementar dedicado a
              estimular o <strong className="text-foreground">potencial cognitivo e emocional</strong> de
              pessoas em todas as fases da vida — do infantil ao sênior.
            </p>
          </motion.div>
        </div>

        {/* Values — with colored dot indicators instead of emojis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-x-8 lg:gap-y-0 mb-16 lg:mb-24"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              className="relative"
            >
              {/* Custom colored indicator — replaces generic emoji */}
              <div className={`w-10 h-10 rounded-xl ${value.accent} flex items-center justify-center mb-4`}>
                <div className={`w-2.5 h-2.5 rounded-full ${value.dot}`} />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nino + Mission — hero-level presence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04] border border-primary/10 overflow-hidden">
            {/* Decorative blur inside the card */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/[0.06] blur-[60px] pointer-events-none" />

            <div className="relative grid lg:grid-cols-5 items-center">
              {/* Nino — large, hero presence */}
              <div className="relative lg:col-span-2 flex items-center justify-center py-10 px-8 lg:py-16 lg:px-12">
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
                  <Image
                    src="/images/nino-mascote.webp"
                    alt="Nino — Mascote da Intelekta, um esquilo que representa a curiosidade, inteligência e equilíbrio entre razão e emoção"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 288px"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-primary/[0.06] blur-3xl" />
                </div>
              </div>

              {/* Quote + context */}
              <div className="lg:col-span-3 px-6 pb-10 lg:py-16 lg:px-12 lg:pl-4">
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                  Conheça o Nino
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                  Nosso mascote representa a curiosidade incansável, a inteligência ágil
                  e o equilíbrio perfeito entre razão e emoção — qualidades que cultivamos
                  em cada pessoa que passa pela Intelekta.
                </p>

                {/* Mission quote — editorial style */}
                <div className="relative pl-6 sm:pl-8 border-l-[3px] border-primary/40">
                  <span className="absolute -left-3 -top-1 font-serif text-5xl text-primary/20 leading-none select-none">&ldquo;</span>
                  <blockquote className="font-serif text-editorial-quote text-foreground italic text-pretty">
                    Nosso propósito é despertar em cada pessoa a confiança de que pode
                    desenvolver novas habilidades, superar desafios e construir uma vida
                    mais equilibrada e significativa.
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="decorative-line" />
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Fundadoras da Intelekta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
