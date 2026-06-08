/**
 * Programs section — Indexed Panel Navigator
 *
 * Melhorias v2:
 *   - Intent text redesenhado: eyebrow com linha decorativa, contraste correto (white/75)
 *   - Hierarquia tipográfica refeita na overlay (intent → title → subtitle → desc → tags)
 *   - Drag com threshold de velocidade — swipe leve já navega para o próximo card
 *   - Removido conflito animate + style={{ x }} (usamos só animate + info de drag)
 *   - Ghost number reposicionado (canto superior, maior, mais atmosphérico)
 */
"use client"

import {
  motion,
  useInView,
} from "framer-motion"
import { useRef, useState, useEffect, useCallback, Fragment } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { programs, ageStages, type ProgramCategory } from "@/lib/program-catalog"
import { ProgramCtaLink } from "@/components/program-cta-link"

// ─── Constants ───────────────────────────────────────────────────────────────

const PEEK            = 40   // px de preview do próximo slide no edge direito
const GAP             = 12   // gap entre slides
const ITEM_H          = 44   // altura do botão da sidebar (sync com h-11)
const SWIPE_THRESHOLD = 0.20 // 20% da largura do slide = snap
const VELOCITY_THRESHOLD = 400 // px/s = snap na direção do swipe

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

export function Programs() {
  const sectionRef  = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const tabStripRef = useRef<HTMLDivElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: "-80px" })

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth,  setSlideWidth]  = useState(0)
  const [mounted,     setMounted]     = useState(false)

  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(programs.length - 1, idx)))
  }, [])

  // ── Previne erro de hidratação e cuida do link profundo (Deep Linking) ──────
  useEffect(() => {
    setMounted(true)

    const handleHashSync = () => {
      const hash = window.location.hash
      if (hash.includes("?p=")) {
        const programId = hash.split("?p=")[1]
        const index = programs.findIndex(p => p.id === programId)
        if (index !== -1) {
          // Pequeno delay para garantir que o carrossel mediu a largura (slideWidth)
          setTimeout(() => goTo(index), 100)
        }
      }
    }

    handleHashSync()
    window.addEventListener("hashchange", handleHashSync)
    return () => window.removeEventListener("hashchange", handleHashSync)
  }, [goTo])

  // ── Mede o container do carrossel ──────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!carouselRef.current) return
      setSlideWidth(carouselRef.current.offsetWidth - PEEK)
    }
    update()
    const ro = new ResizeObserver(update)
    if (carouselRef.current) ro.observe(carouselRef.current)
    return () => ro.disconnect()
  }, [])

  // ── Centraliza a pill ativa no strip mobile ─────────────────────────────────
  useEffect(() => {
    const strip = tabStripRef.current
    if (!strip) return
    const btn = strip.children[activeIndex] as HTMLElement | undefined
    if (!btn) return

    // Scroll horizontal seguro que evita rolar a página verticalmente
    const stripRect = strip.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const centerOffset = (btnRect.left - stripRect.left) - (stripRect.width / 2) + (btnRect.width / 2)
    
    strip.scrollTo({ left: strip.scrollLeft + centerOffset, behavior: "smooth" })
  }, [activeIndex])

  const handleSidebarKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); goTo(activeIndex + 1) }
      if (e.key === "ArrowUp")   { e.preventDefault(); goTo(activeIndex - 1) }
    },
    [activeIndex, goTo],
  )

  // ── Drag handler com threshold de velocidade ────────────────────────────────
  // Resolve o travamento: um swipe curto + rápido já navega para o próximo card.
  // Antes o código usava x.get() sem considerar velocidade — ficava preso entre slides.
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info
      const didSwipeLeft  = offset.x < -(slideWidth * SWIPE_THRESHOLD) || velocity.x < -VELOCITY_THRESHOLD
      const didSwipeRight = offset.x >  (slideWidth * SWIPE_THRESHOLD) || velocity.x >  VELOCITY_THRESHOLD

      if (didSwipeLeft)  goTo(activeIndex + 1)
      else if (didSwipeRight) goTo(activeIndex - 1)
      else goTo(activeIndex) // snap de volta ao atual se o swipe foi pequeno demais
    },
    [activeIndex, goTo, slideWidth],
  )

  // ─── Render ─────────────────────────────────────────────────────────────────

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
          animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                9 programas especializados que promovem o aprendizado de forma lúdica,
                envolvente e significativa — para todas as fases da vida.
              </p>
            </div>

            {/* Age stages compact strip — clickable to jump to category */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:overflow-visible [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
              {ageStages.map((s) => {
                const firstIdx = programs.findIndex(p => p.category === s.category)
                const isActiveCategory = firstIdx !== -1 && programs[activeIndex]?.category === s.category
                return (
                  <button
                    key={s.phase}
                    onClick={() => firstIdx !== -1 && goTo(firstIdx)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActiveCategory
                        ? "border-primary/30 bg-primary/10"
                        : "border-primary/10 bg-primary/[0.04] hover:border-primary/20 hover:bg-primary/[0.07]"
                    }`}
                  >
                    <span className={`text-[10px] font-bold sm:text-[11px] ${isActiveCategory ? "text-primary" : "text-foreground"}`}>{s.phase}</span>
                    <span className="ml-1.5 text-[10px] text-primary/60 sm:ml-1.5 sm:text-[11px]">{s.age}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ━━━━━━━━ NAVIGATOR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
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
              {/* Active indicator — offset accounts for category label heights */}
              <motion.div
                aria-hidden
                className="absolute left-0 w-[2px] rounded-full bg-primary"
                animate={mounted ? {
                  // Each category label adds 28px; count how many labels appear before activeIndex
                  y: activeIndex * ITEM_H + (activeIndex >= 2 ? 28 * 2 : 28),
                  height: ITEM_H,
                } : {}}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />

              <div className="border-l-2 border-border/30">
                {/* ── Intelekta Sênior ── */}
                <div className="py-1.5 pl-5 pr-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary/50">Intelekta Sênior</span>
                </div>
                {programs.filter(p => p.category === "senior").map((program) => {
                  const idx = programs.indexOf(program)
                  return (
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
                      <span className={`shrink-0 font-mono text-[10px] font-bold tabular-nums transition-colors duration-150 ${idx === activeIndex ? "text-primary" : "text-muted-foreground/35"}`}>
                        {program.number}
                      </span>
                      <span className={`truncate text-sm font-medium transition-colors duration-150 ${idx === activeIndex ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/75"}`}>
                        {program.title}
                      </span>
                    </button>
                  )
                })}

                {/* ── Intelekta (Crianças, Adolescentes e Adultos) ── */}
                <div className="py-1.5 pl-5 pr-2 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary/50">Intelekta</span>
                </div>
                {programs.filter(p => p.category === "infantojuvenil").map((program) => {
                  const idx = programs.indexOf(program)
                  return (
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
                      <span className={`shrink-0 font-mono text-[10px] font-bold tabular-nums transition-colors duration-150 ${idx === activeIndex ? "text-primary" : "text-muted-foreground/35"}`}>
                        {program.number}
                      </span>
                      <span className={`truncate text-sm font-medium transition-colors duration-150 ${idx === activeIndex ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/75"}`}>
                        {program.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </aside>

          {/* ── Right column: carousel + details ─────────────────────────── */}
          <div className="min-w-0">

            {/* Mobile / tablet pill strip with category separators */}
            <div className="relative mb-3 lg:hidden">
              <div
                ref={tabStripRef}
                className="flex gap-1.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              >
                {programs.map((program, idx) => {
                  const showDivider = idx > 0 && program.category !== programs[idx - 1].category
                  return (
                    <Fragment key={program.id}>
                      {showDivider && (
                        <div className="flex shrink-0 items-center px-1" aria-hidden>
                          <div className="h-4 w-px bg-border" />
                        </div>
                      )}
                      <button
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
                    </Fragment>
                  )
                })}
                <div className="w-8 shrink-0" aria-hidden />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent"
              />
            </div>

            {/* ── Carousel ────────────────────────────────────────────────── */}
            <div ref={carouselRef} className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              {slideWidth > 0 ? (
                <>
                  {/*
                   * CORREÇÃO CRÍTICA DE PERFORMANCE:
                   * Antes: style={{ x }} + animate={{ x }} conflitavam — o motionValue x
                   *   era definido pelo drag e pelo animate ao mesmo tempo → jank.
                   * Agora: usamos APENAS animate={{ x: ... }} para posicionamento programático.
                   *   O drag atualiza via onDragEnd → goTo() → animate reage com spring.
                   *   onDragEnd usa info.offset + info.velocity (não x.get()) — sem conflito.
                   */}
                  <motion.div
                    className="flex flex-row flex-nowrap items-stretch gap-3 touch-pan-y select-none cursor-grab active:cursor-grabbing w-fit"
                    animate={{ x: -activeIndex * (slideWidth + GAP) }}
                    transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
                    drag="x"
                    dragConstraints={{
                      left:  -(programs.length - 1) * (slideWidth + GAP),
                      right: 0,
                    }}
                    dragElastic={0.08}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                  >
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        style={{ width: slideWidth }}
                        className="flex shrink-0 flex-col gap-3"
                      >
                        {/* Intent — eyebrow fora do card principal, melhorando ainda mais a legibilidade e hierarquia */}
                        <div className="flex items-center gap-2 px-1">
                          <div className="h-px w-5 shrink-0 bg-primary sm:w-6" />
                          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11.5px]">
                            {program.intent}
                          </p>
                        </div>

                        <div className="relative h-[540px] w-full overflow-hidden rounded-xl bg-muted sm:h-[500px] lg:h-auto lg:aspect-[16/10]">
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            className="pointer-events-none object-cover"
                            sizes="(max-width: 1024px) calc(100vw - 64px), 65vw"
                            loading="lazy"
                            draggable={false}
                          />

                          {/* Ghost number */}
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -left-1 top-0 select-none font-serif font-bold leading-none text-white/[0.06] sm:-left-2"
                            style={{ fontSize: "clamp(80px, 14vw, 160px)" }}
                          >
                            {program.number}
                          </span>

                          {/* OVERLAY REDESENHADO */}
                          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/75 to-transparent px-14 pb-6 pt-20 sm:p-8 sm:pt-28 lg:p-10 lg:pt-32">

                          {/* Título — principal, precisa ser o maior elemento */}
                          <h3 className="font-serif text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.6rem] drop-shadow-md">
                            {program.title}
                          </h3>

                          {/* Subtitle — secundário, bem menor, afastado do título */}
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 sm:mt-1.5 sm:text-[11px] drop-shadow-sm">
                            {program.subtitle}
                          </p>

                          {/* Divisor sutil */}
                          <div className="my-2.5 h-px w-full bg-white/20 sm:my-3.5" />

                          {/* Description — corpo legível, sem cortes no mobile */}
                          <p className="max-w-2xl text-[13px] leading-relaxed text-white/95 sm:text-[15px] font-medium drop-shadow-sm">
                            {program.description}
                          </p>

                          {/* Tags — Limpas e discretas no mobile */}
                          <div className="mt-3 flex flex-wrap items-center gap-y-1 sm:mt-4 sm:gap-2">
                            {program.tags.map((tag, idx) => (
                              <div key={tag} className="flex items-center">
                                {idx > 0 && <span className="mx-2 text-[10px] text-white/20 sm:hidden">•</span>}
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 sm:rounded-full sm:border sm:border-white/10 sm:bg-white/[0.06] sm:px-3 sm:py-1 sm:text-white/70 sm:backdrop-blur-sm sm:text-[10px]">
                                  {tag}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="mt-4 flex sm:mt-5">
                            <Button
                              className="group/btn h-9 px-4 text-[12px] sm:h-11 sm:px-6 sm:text-sm"
                              asChild
                            >
                              <ProgramCtaLink program={program.title} source={`programs:${program.id}`}>
                                Falar sobre o programa
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 sm:ml-2 sm:h-4 sm:w-4" />
                              </ProgramCtaLink>
                            </Button>
                          </div>
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
                    className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-0 sm:left-3 sm:h-10 sm:w-10"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  {/* Next button */}
                  <button
                    onClick={() => goTo(activeIndex + 1)}
                    disabled={activeIndex === programs.length - 1}
                    aria-label="Próximo programa"
                    style={{ right: PEEK + 8 }}
                    className="absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-0 sm:h-10 sm:w-10"
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
                <div className="h-[340px] animate-pulse rounded-xl bg-muted sm:h-[420px] lg:h-auto lg:aspect-[16/10]" />
              )}
            </div>

            {/* ── Progress indicator ──────────────────────────────────────── */}
            <div className="mt-3 flex items-center justify-between sm:justify-start sm:gap-4">
              <div className="flex items-center gap-1.5" role="group" aria-label="Progresso">
                {programs.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Ir para programa ${idx + 1}`}
                    animate={mounted ? {
                      width:   idx === activeIndex ? 24 : 6,
                      opacity: idx === activeIndex ? 1 : 0.25,
                    } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                      idx === activeIndex ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/45 sm:text-[11px]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(programs.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ━━━━━━━━ SEO: Block Visually Hidden ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
          animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
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