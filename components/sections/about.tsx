"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const values = [
  {
    title: "Olhar humano",
    text: "Cada família é ouvida com atenção. Nossos profissionais criam vínculos reais com cada participante.",
  },
  {
    title: "Acolhimento genuíno",
    text: "Um ambiente seguro onde cada pessoa se sente valorizada, respeitada e cuidada em sua individualidade.",
  },
  {
    title: "Ciência e sensibilidade",
    text: "Neurociência e psicologia cognitiva aplicadas com empatia — porque dados sem afeto não transformam.",
  },
  {
    title: "Personalização real",
    text: "Programas adaptados às necessidades, ritmo e objetivos únicos de cada pessoa.",
  },
]

const keywords = [
  "Neuroplasticidade",
  "Acolhimento",
  "Aprendizagem",
  "Inclusão",
  "Emoção",
  "Cognição",
  "Memória",
  "Autonomia",
  "Confiança",
  "Desenvolvimento",
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="sobre"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.035] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-secondary/[0.04] blur-[100px]" />
      {/* Diagonal lines texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_60px,var(--primary)_60px,var(--primary)_60.5px)] opacity-[0.018]" />

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee-about {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee-about {
          animation: marquee-about 28s linear infinite;
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section intro ────────────────────────────────────────── */}
        <div className="mb-12 grid items-start gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              <div className="decorative-line" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Sobre nós
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-serif text-editorial-lg text-balance text-foreground leading-[1.04]"
            >
              Um espaço onde pessoas são{" "}
              <span className="text-primary">acolhidas e transformadas</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="lg:pt-14"
          >
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              A Intelekta foi idealizada por{" "}
              <strong className="text-foreground">
                psicólogos e psicopedagogas
              </strong>{" "}
              que acreditam que o cuidado humano vai muito além do conteúdo
              escolar. Somos um centro de desenvolvimento cognitivo e
              socioemocional dedicado a acolher e estimular pessoas em todas as
              fases da vida.
            </p>
          </motion.div>
        </div>

        {/* ── Keyword marquee — visual rhythm break ─────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="-mx-4 mb-14 overflow-hidden border-y border-primary/[0.07] py-3 sm:-mx-6 lg:-mx-8 lg:mb-20"
          aria-hidden="true"
        >
          <div className="animate-marquee-about flex whitespace-nowrap">
            {[...keywords, ...keywords, ...keywords, ...keywords].map(
              (kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-5 px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/25"
                >
                  {kw}
                  <span className="inline-block h-[3px] w-[3px] rounded-full bg-primary/20" />
                </span>
              ),
            )}
          </div>
        </motion.div>

        {/* ── Values as manifesto rows ──────────────────────────────── */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/35">
              Nossos valores
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/10 to-transparent" />
          </motion.div>

          <div className="border-t border-primary/[0.08]">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28 + index * 0.09 }}
                className="group -mx-1 grid grid-cols-[44px_1fr] items-start gap-x-5 gap-y-1 rounded-sm border-b border-primary/[0.08] px-1 py-6 transition-colors duration-200 hover:bg-primary/[0.013] sm:gap-x-7 lg:grid-cols-[72px_1fr_1fr] lg:gap-x-10 lg:py-7"
              >
                {/* Ordinal number */}
                <span className="font-serif text-3xl font-black leading-none text-primary/[0.12] transition-colors duration-300 group-hover:text-primary/[0.25] lg:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold leading-snug tracking-[-0.02em] text-foreground sm:text-2xl">
                  {value.title}
                </h3>

                {/* Description — below title on mobile, own column on desktop */}
                <p className="col-start-2 mt-1 text-sm leading-relaxed text-muted-foreground lg:col-start-3 lg:mt-0 lg:text-base">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Nino + Mission ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04] sm:rounded-[2rem]">
            {/* Inner glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />

            <div className="relative grid lg:grid-cols-5">
              {/* Nino */}
              <div className="relative flex items-center justify-center px-8 py-10 lg:col-span-2 lg:px-12 lg:py-16">
                <div className="relative h-52 w-52 sm:h-60 sm:w-60 lg:h-72 lg:w-72">
                  <Image
                    src="/images/nino-mascote.webp"
                    alt="Nino — Mascote da Intelekta, um esquilo que representa a curiosidade, inteligência e equilíbrio entre razão e emoção"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 288px"
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
                </div>
              </div>

              {/* Quote + context */}
              <div className="px-6 pb-10 lg:col-span-3 lg:px-12 lg:py-16 lg:pl-4">
                <h3 className="mb-4 font-serif text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl lg:text-3xl">
                  Conheça o Nino
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Nosso mascote representa a curiosidade incansável, a
                  inteligência ágil e o equilíbrio perfeito entre razão e
                  emoção — qualidades que cultivamos em cada pessoa que passa
                  pela Intelekta.
                </p>

                {/* Mission quote */}
                <div className="relative border-l-[3px] border-primary/40 pl-6 sm:pl-8">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-8 select-none font-serif text-6xl leading-none text-primary/10"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="font-serif text-editorial-quote text-pretty font-bold italic text-foreground">
                    Nosso propósito é despertar em cada pessoa a confiança de
                    que pode desenvolver novas habilidades, superar desafios e
                    construir uma vida mais equilibrada e significativa.
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="decorative-line" />
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
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