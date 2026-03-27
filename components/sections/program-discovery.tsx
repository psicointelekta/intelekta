"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics/react"

import { PROGRAM_DISCOVERY_PATHS } from "@/lib/program-catalog"
import { saveProgramSelection } from "@/lib/program-selection"

export function ProgramDiscovery() {
  const [slideWidth, setSlideWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const featuredPaths = PROGRAM_DISCOVERY_PATHS.filter((path) =>
    ["aprendizagem", "cognicao-ludica", "emocao-expressao", "orientacao"].includes(path.id),
  )

  useEffect(() => {
    const measure = () => {
      if (!carouselRef.current) return
      // No mobile usamos um peek de 40px para mostrar que tem mais vindo
      const peek = window.innerWidth < 1024 ? 40 : 0
      setSlideWidth(carouselRef.current.offsetWidth - peek)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <section id="encontrar-programa" className="relative overflow-hidden bg-muted/20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-secondary/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="decorative-line" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Encontre seu caminho
            </span>
          </div>
          <h2 className="font-serif text-editorial-lg text-balance text-foreground leading-[1.04]">
            Ainda não sabe qual programa escolher? <span className="text-primary">Comece por aqui.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Escolha um caminho inicial. Nós levamos essa intenção para o contato e deixamos a conversa mais rápida e personalizada.
          </p>
        </div>

        <div className="mt-10 overflow-hidden lg:overflow-visible" ref={carouselRef}>
          {/* Mobile Carousel Wrapper */}
          <motion.div
            className="flex flex-row flex-nowrap items-stretch gap-4 lg:grid lg:grid-cols-2 lg:gap-4 w-fit lg:w-full"
            style={slideWidth > 0 && typeof window !== 'undefined' && window.innerWidth < 1024 ? { x } : {}}
            drag={slideWidth > 0 && typeof window !== 'undefined' && window.innerWidth < 1024 ? "x" : false}
            dragConstraints={{
              left: -(featuredPaths.length - 1) * (slideWidth + 16), // 16 is gap-4
              right: 0,
            }}
          >
            {featuredPaths.map((path, index) => (
              <article
                key={path.id}
                style={slideWidth > 0 && typeof window !== 'undefined' && window.innerWidth < 1024 ? { width: slideWidth } : {}}
                className="shrink-0 overflow-hidden rounded-3xl border border-border bg-card/90 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
              <div className="relative aspect-[16/10] bg-muted">
                <Image
                  src={path.image}
                  alt={path.recommendedProgram}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
                    {path.title}
                  </h3>
                </div>
              </div>

              <div className="flex h-full flex-col p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  {path.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {path.badges.slice(0, 2).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-foreground">
                  Recomendação: {path.recommendedProgram}
                </p>

                <Link
                  href="#contato"
                  onClick={() => {
                    saveProgramSelection(path.recommendedProgram, `discovery:${path.id}`)
                    track("program_discovery_click", {
                      program: path.recommendedProgram,
                      path: path.id,
                      position: index + 1,
                    })
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3"
                >
                  Escolher este caminho
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              </article>
            ))}
          </motion.div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Quer explorar todas as possibilidades? A seção de programas logo abaixo mostra os atendimentos em mais detalhe.
        </p>
      </div>
    </section>
  )
}