/**
 * Programs section — Indexed Panel Navigator
 *
 * Layout: sidebar index (desktop) + horizontal carousel w/ peek effect
 * UX signals that hint "more to explore":
 *   1. Peek — next slide visible at right edge (PEEK px)
 *   2. Fade gradient over the peeping area
 *   3. Expanding dot progress bar + "01/07" counter
 *   4. Prev/Next overlay buttons on the image
 *   5. Sidebar immediately shows all 7 programs numbered
 *   6. Mobile pill strip has right-edge fade hint
 *
 * SEO: all 7 programs rendered in DOM via visually-hidden article list.
 * A11y: proper tablist/tab/tabpanel roles + keyboard support.
 */
"use client"

import {
  motion,
  useInView,
  useMotionValue,
  animate as motionAnimate,
} from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { programs, ageStages } from "@/lib/program-catalog"
import { ProgramCtaLink } from "@/components/program-cta-link"
import { ProgramAwareWhatsappLink } from "@/components/program-aware-whatsapp-link"

// ─── Constants ───────────────────────────────────────────────────────────────

const PEEK   = 40  // px of next slide visible at right edge no mobile/tablet
const GAP    = 12  // gap between carousel slides
const ITEM_H = 44  // sidebar button height (px) — keep in sync with h-11

// Estilo inline à prova de falhas para ocultar o SEO (evita que crie uma lista vertical se o Tailwind falhar)
const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
}

// ─── Component ───────────────────────────────────────────────────────────────

type Program = (typeof programs)[number]

export function Programs() {
  const sectionRef  = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const tabStripRef = useRef<HTMLDivElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: "-80px" })

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth,  setSlideWidth]  = useState(0)
  const x = useMotionValue(0)

  // ── Measure the carousel container ─────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!carouselRef.current) return
      setSlideWidth(carouselRef.current.offsetWidth - PEEK)
    }
    update()
    const ro = new ResizeObserver(update)
    if (carouselRef.current) ro.observe(carouselRef.current)
    return () => ro.disconnect()
  },[])

  // ── Spring the strip to the active slide ───────────────────────────────────
  useEffect(() => {
    if (slideWidth === 0) return
    motionAnimate(x, -activeIndex * (slideWidth + GAP), {
      type:      "spring",
      stiffness: 300,
      damping:   30,
      mass:      0.8,
    })
  }, [activeIndex, slideWidth, x])

  // ── Keep mobile tab strip centred on active pill ────────────────────────────
  useEffect(() => {
    const strip = tabStripRef.current
    if (!strip) return
    const btn = strip.children[activeIndex] as HTMLElement | undefined
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  },[activeIndex])

  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(programs.length - 1, idx)))
  },[])

  // Keyboard navigation for the sidebar
  const handleSidebarKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); goTo(activeIndex + 1) }
      if (e.key === "ArrowUp")   { e.preventDefault(); goTo(activeIndex - 1) }
    },
    [activeIndex, goTo],
  )

  const active = programs[activeIndex]

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section
      id="programas"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-10 sm:py-16 lg:py-24"
    >
      {/* Subtle bg accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-to-bl from-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ━━━━━━━━ HEADER + AGE STAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 lg:mb-12"
        >
          <div className="mb-3 flex items-center gap-3 lg:mb-4">
            <div className="decorative-line" />
            <span className="text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
              Programas
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:gap-5">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl leading-[1.04] text-balance text-foreground sm:text-editorial-lg">
                Cada pessoa merece um{" "}
                <span className="text-primary">cuidado especial.</span>
              </h2>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                7 programas especializados que promovem o aprendizado de forma lúdica,
                envolvente e significativa — para todas as fases da vida.
              </p>
            </div>

            {/* Age stages compact strip */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 sm:justify-end">
              {ageStages.map((s) => (
                <span
                  key={s.phase}
                  className="rounded-full border border-primary/10 bg-primary/[0.04] px-2.5 py-1 sm:px-3 sm:py-1.5"
                >
                  <span className="text-[10px] font-bold text-foreground sm:text-[11px]">{s.phase}</span>
                  <span className="ml-1 text-[10px] text-primary/60 sm:ml-1.5 sm:text-[11px]">{s.age}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ━━━━━━━━ NAVIGATOR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid lg:grid-cols-[220px_1fr] lg:gap-10"
        >

          {/* ── Sidebar index (desktop only) ──────────────────────────────── */}
          <aside
            className="hidden lg:block"
            aria-label="Índice de programas"
            onKeyDown={handleSidebarKeyDown}
          >
            <nav role="tablist" className="relative">
              {/* Spring-animated active indicator */}
              <motion.div
                aria-hidden
                className="absolute left-0 w-[2px] rounded-full bg-primary"
                animate={{ y: activeIndex * ITEM_H, height: ITEM_H }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />

              <div className="border-l-2 border-border/30">
                {programs.map((program, idx) => (
                  <button
                    key={program.id}
                    role="tab"
                    id={`tab-${program.id}`}
                    tabIndex={idx === activeIndex ? 0 : -1}
                    aria-selected={idx === activeIndex}
                    aria-controls={`panel-${program.id}`}
                    onClick={() => goTo(idx)}
                    style={{ height: ITEM_H }}
                    className={`group flex w-full items-center gap-3 pl-5 pr-2 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-primary ${
                      idx === activeIndex ? "bg-primary/[0.05]" : "hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className={`shrink-0 font-mono text-[10px] font-bold tabular-nums transition-colors duration-150 ${
                        idx === activeIndex ? "text-primary" : "text-muted-foreground/35"
                      }`}
                    >
                      {program.number}
                    </span>
                    <span
                      className={`truncate text-sm font-medium transition-colors duration-150 ${
                        idx === activeIndex
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground/75"
                      }`}
                    >
                      {program.title}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* ── Right column: carousel + details ─────────────────────────── */}
          <div className="min-w-0">

            {/* Mobile / tablet pill strip */}
            <div className="relative mb-3 lg:hidden">
              <div
                ref={tabStripRef}
                className="flex gap-1.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              >
                {programs.map((program, idx) => (
                  <button
                    key={program.id}
                    onClick={() => goTo(idx)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      idx === activeIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground/70"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-bold tabular-nums ${
                        idx === activeIndex ? "opacity-75" : "opacity-45"
                      }`}
                    >
                      {program.number}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide">
                      {program.title}
                    </span>
                  </button>
                ))}
                {/* Spacer so last pill isn't hidden under fade */}
                <div className="w-8 shrink-0" aria-hidden />
              </div>
              {/* Right-edge fade: hints more pills exist */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent"
              />
            </div>

            {/* ── Carousel ────────────────────────────────────────────────── */}
            <div ref={carouselRef} className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              {slideWidth > 0 ? (
                <>
                  <motion.div
                    /* Aqui garantimos que nunca vai quebrar linha e formar lista vertical */
                    className="flex flex-row flex-nowrap items-stretch gap-3 touch-pan-y select-none cursor-grab w-fit"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{
                      left:  -(programs.length - 1) * (slideWidth + GAP),
                      right: 0,
                    }}
                    dragElastic={0.05}
                    dragMomentum={false}
                    whileDrag={{ cursor: "grabbing" }}
                    onDragEnd={() => {
                      const nearest = Math.round(-x.get() / (slideWidth + GAP))
                      goTo(Math.max(0, Math.min(programs.length - 1, nearest)))
                    }}
                  >
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        style={{ width: slideWidth }}
                        className="relative h-[340px] shrink-0 overflow-hidden rounded-xl bg-muted sm:h-[420px] lg:h-auto lg:aspect-[16/10]"
                      >
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="pointer-events-none object-cover"
                          sizes="(max-width: 1024px) calc(100vw - 64px), 65vw"
                          loading="lazy"
                          draggable={false}
                        />

                        {/* Ghost program number */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-3 top-2 select-none font-serif text-[56px] font-bold leading-none text-white/[0.07] sm:right-6 sm:top-4 sm:text-[96px] lg:text-[120px]"
                        >
                          {program.number}
                        </span>

                        {/* Bottom details overlay with gradient */}
                        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-16 sm:p-8 sm:pt-28 lg:p-12 lg:pt-32">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-primary sm:text-[11px]">
                            {program.subtitle}
                          </p>
                          <h3 className="font-serif text-xl font-bold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
                            {program.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 max-w-2xl text-[13px] leading-relaxed text-white/80 sm:mt-3 sm:line-clamp-none sm:text-base">
                            {program.description}
                          </p>
                          
                          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                            {program.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[10px]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex sm:mt-6">
                            <Button className="group/btn h-9 px-4 text-[12px] sm:h-11 sm:px-6 sm:text-sm" asChild>
                              <ProgramCtaLink program={program.title} source={`programs:${program.id}`}>
                                Falar sobre o programa
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 sm:ml-2 sm:h-4 sm:w-4" />
                              </ProgramCtaLink>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Prev button */}
                  <button
                    onClick={() => goTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Programa anterior"
                    className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-0 sm:left-3 sm:h-9 sm:w-9"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  {/* Next button */}
                  <button
                    onClick={() => goTo(activeIndex + 1)}
                    disabled={activeIndex === programs.length - 1}
                    aria-label="Próximo programa"
                    style={{ right: PEEK + 8 }}
                    className="absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-0 sm:h-9 sm:w-9"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  {/* Peek gradient */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 rounded-r-xl sm:rounded-r-2xl"
                    style={{
                      width:      PEEK,
                      background: "linear-gradient(to left, var(--background) 0%, transparent 100%)",
                    }}
                  />
                </>
              ) : (
                /* Placeholder while measuring (prevents CLS) */
                <div className="h-[340px] animate-pulse rounded-xl bg-muted sm:h-[420px] lg:h-auto lg:aspect-[16/10]" />
              )}
            </div>

            {/* ── Progress indicator ──────────────────────────────────────── */}
            <div className="mt-3 flex items-center justify-between sm:justify-start sm:gap-4">
              {/* Expanding dot bar */}
              <div className="flex items-center gap-1.5" role="group" aria-label="Progresso">
                {programs.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Ir para programa ${idx + 1}`}
                    animate={{
                      width:   idx === activeIndex ? 24 : 6,
                      opacity: idx === activeIndex ? 1 : 0.25,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary sm:h-1.5 ${
                      idx === activeIndex ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              {/* Counter */}
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/45 sm:text-[11px]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(programs.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ━━━━━━━━ SEO: Block Visually Hidden Seguro ━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Usando inline css garante que sob nenhuma circunstância o texto apareça empilhado na tela caso a classe sr-only falhe */}
        <div style={visuallyHidden} aria-hidden="true">
          {programs.map((p) => (
            <article key={`seo-${p.id}`}>
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <p>{p.description}</p>
            </article>
          ))}
        </div>

        {/* ━━━━━━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 text-center sm:mt-10 lg:mt-14"
        >
          <p className="mb-3 text-[13px] text-muted-foreground sm:mb-4 sm:text-sm">
            Não sabe qual programa é ideal? Nossa equipe ajuda você a encontrar o melhor caminho.
          </p>
          <Button size="default" className="sm:h-11 sm:px-8 sm:text-base" asChild>
            <Link href="#contato">
              Fale com a nossa equipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}