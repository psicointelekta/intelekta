/**
 * Team section — displays the 3 Intelekta founders/consultants
 * with portrait images, bios, and expertise areas.
 * Dark-section background for visual contrast.
 */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"

const founders = [
  {
    name: "Suzidarle Pereira",
    role: "Psicóloga e Neuropsicóloga",
    bio: "Especializada no atendimento de crianças a partir de 6 anos e adolescentes, com expertise em avaliação neuropsicológica e terapia psicológica.",
    expertise: ["Avaliação Neuropsicológica", "Terapia Psicológica", "Transtornos de Aprendizagem"],
    image: "/images/suzidarle_pereira_retrato.webp",
  },
  {
    name: "Fabiana Lima",
    role: "Psicopedagoga",
    bio: "Palestrante e professora há 12 anos dedicada ao desenvolvimento integral de crianças e adolescentes, unindo aprendizagem, ludicidade e acolhimento.",
    expertise: ["Psicopedagogia", "Ludopedagogia", "Ludoterapia"],
    image: "/images/fabiana_lima_retrato.webp",
  },
  {
    name: "Flávia Luz Vaz",
    role: "Consultora Técnica",
    bio: "Psicóloga clínica há 24 anos, Mestre em Desenvolvimento Humano, palestrante em saúde mental e coordenadora do Projeto Guardiões da Infância.",
    expertise: ["Psicologia Clínica", "Desenvolvimento Humano", "Consultoria"],
    image: "/images/flavia_luz_retrato.webp",
  },
]

export function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="equipe" className="py-16 sm:py-20 lg:py-28 bg-dark-section relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Nossa Equipe
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-editorial-lg text-dark-section-foreground text-balance leading-[1.04] mb-5"
          >
            Profissionais dedicadas ao{" "}
            <span className="text-secondary">seu desenvolvimento</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-dark-section-foreground/70 leading-relaxed"
          >
            Combinamos décadas de experiência clínica e educacional com acolhimento
            humano para criar experiências transformadoras.
          </motion.p>
        </div>

        {/* Team grid — image on top, content below (no overlap) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
              className="group"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] hover:border-primary/25 transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.05] bg-white/[0.03]">
                {/* Image — gradient bg for transparent portraits */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-gradient-to-b from-primary/[0.08] via-primary/[0.04] to-transparent">
                  {/* Subtle glow behind portrait */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 rounded-full bg-primary/[0.06] blur-[50px] pointer-events-none" />
                  <Image
                    src={founder.image}
                    alt={`${founder.name} — ${founder.role} na Intelekta`}
                    fill
                    className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>

                {/* Content — below image, NOT overlapping */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-[-0.02em] text-dark-section-foreground mb-1">
                    {founder.name}
                  </h3>
                  <span className="text-primary font-medium text-sm block mb-3">
                    {founder.role}
                  </span>
                  <p className="text-sm text-dark-section-foreground/70 leading-relaxed mb-3">
                    {founder.bio}
                  </p>

                  {/* Expertise as text */}
                  <p className="text-xs text-dark-section-foreground/40 mb-4">
                    {founder.expertise.join(" · ")}
                  </p>

                  {/* Instagram link */}
                  <a
                    href="https://www.instagram.com/psicointelekta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-dark-section-foreground/40 hover:text-primary transition-colors text-xs"
                    aria-label={`Instagram da Intelekta`}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    @psicointelekta
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
