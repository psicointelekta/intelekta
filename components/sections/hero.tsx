/**
 * Desktop hero section with:
 * - Interactive neural network canvas (NeuralTree)
 * - Mouse-reactive parallax gradient orbs (framer-motion springs)
 * - Cycling word animation ("mentes", "emoções", "futuros") with clip-path transitions
 * - Auto-rotating image carousels (desktop: 4:5, mobile: 16:9)
 *
 * Layout-shift prevention: invisible "emoções" (longest word) reserves
 * the inline-grid width so the headline never reflows.
 */
"use client"

import {
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, ChevronDown, ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react"
import { NeuralTree } from "@/components/neural-tree"
import { MobileNewsCarousel } from "@/components/pages/mobile-news-carousel"
import { useEffect, useState, useCallback } from "react"
import { track } from "@vercel/analytics/react"

const DEFAULT_HERO_IMAGES = [
  {
    src: "/images/hero-1.webp",
    alt: "Sessão de psicopedagogia com criança",
    title: "Fortalecendo mentes",
    category: "BEM-VINDO",
    description: "Programas especializados fundamentados em neurociência para todas as idades.",
    date: "",
    link: "#programas",
    imagePosition: "50% 50%",
    imageZoom: "1"
  },
  {
    src: "/images/hero-2.webp",
    alt: "Atendimento psicológico acolhedor",
    title: "Transformando emoções",
    category: "ESPECIALIDADE",
    description: "Equipe multidisciplinar dedicada ao desenvolvimento integral de mentes e emoções.",
    date: "",
    link: "#sobre",
    imagePosition: "50% 50%",
    imageZoom: "1"
  },
  {
    src: "/images/hero-3.webp",
    alt: "Ambiente terapêutico tranquilo",
    title: "Moldando futuros",
    category: "INFRAESTRUTURA",
    description: "Ambiente planejado para proporcionar acolhimento, segurança e resultados reais.",
    date: "",
    link: "#contato",
    imagePosition: "50% 50%",
    imageZoom: "1"
  },
]

interface Announcement {
  date: string
  category: string
  title: string
  description: string
  imageUrl?: string
  linkUrl?: string
  imagePosition?: string
  imageZoom?: string
}

const HERO_IMAGES_MOBILE = [
  { src: "/images/hero-mobile-1.webp", alt: "Criança em atividade lúdica de neuroeducação" },
  { src: "/images/hero-mobile-2.webp", alt: "Adolescente em sessão de desenvolvimento cognitivo" },
  { src: "/images/hero-mobile-3.webp", alt: "Idosa sorrindo durante atividade terapêutica" },
]

/* ─── Layout-shift-free word cycling ─── */
const WORDS = ["mentes", "emoções", "futuros"] as const
const LONGEST = "emoções"

/* ─── MAIN HERO ─── */
export function Hero({ initialAnnouncements = [] }: { initialAnnouncements?: Announcement[] }) {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 38, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 38, damping: 26 })
  const orb1X = useTransform(springX, [0, 1], ["-6%", "6%"])
  const orb1Y = useTransform(springY, [0, 1], ["-6%", "6%"])
  const orb2X = useTransform(springX, [0, 1], ["5%", "-5%"])
  const orb2Y = useTransform(springY, [0, 1], ["4%", "-4%"])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth)
    mouseY.set(e.clientY / window.innerHeight)
  }, [mouseX, mouseY])

  const [wordIndex, setWordIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [imageResetKey, setImageResetKey] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(!initialAnnouncements?.length)
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements || [])

  useEffect(() => {
    // Only fetch if we didn't get initial announcements or we want to force a client-side update
    if (initialAnnouncements?.length > 0) {
      setIsInitialLoad(false)
      return
    }

    async function fetchAnnouncements() {
      try {
        const res = await fetch(`/api/announcements?t=${Date.now()}`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setAnnouncements(data)
          }
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
      }
    }
    fetchAnnouncements().finally(() => setIsInitialLoad(false))
  }, [])

  const ensureAbsoluteUrl = (url: string) => {
    if (!url) return undefined
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) return url
    return `https://${url}`
  }

  const displayImages = announcements.length > 0
    ? announcements.map(a => ({
      src: a.imageUrl || "/images/hero-1.webp",
      alt: a.title,
      title: a.title,
      category: a.category,
      description: a.description,
      date: a.date,
      link: ensureAbsoluteUrl(a.linkUrl || ""),
      imagePosition: a.imagePosition || '50% 50%',
      imageZoom: a.imageZoom || '1'
    }))
    : isInitialLoad ? [] : DEFAULT_HERO_IMAGES

  const hasImages = displayImages.length > 0

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (displayImages.length === 0) return
    const id = setInterval(() => setCurrentImage((i) => (i + 1) % displayImages.length), 5000)
    return () => clearInterval(id)
  }, [imageResetKey, displayImages.length])

  // Mobile carousel is now handled by its own component with drag support

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className="relative min-h-[100svh] flex flex-col overflow-hidden bg-background pt-16 sm:pt-20 pb-16 sm:pb-0"
        onMouseMove={handleMouseMove}
      >
        {/* ── Gradient orbs ── */}
        <m.div
          style={{ x: orb1X, y: orb1Y, willChange: "transform" }}
          className="absolute -top-[10%] -right-[8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-primary/[0.07] blur-[90px] pointer-events-none"
          aria-hidden
        />
        <m.div
          style={{ x: orb2X, y: orb2Y, willChange: "transform" }}
          className="absolute -bottom-[15%] -left-[8%] w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full bg-primary/[0.05] blur-[80px] pointer-events-none"
          aria-hidden
        />

        {/* ── Grid lines Refined ── */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-[length:80px_100%] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:100%_80px] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:40px_40px] opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

        {/* ── Neural network ── */}
        <div className="absolute inset-0 pointer-events-none">
          <NeuralTree />
        </div>

        {/* ── Readability overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/65 pointer-events-none" />

        {/* ══ MAIN CONTENT ══ */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-10 sm:py-14 lg:py-16">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

              {/* ── LEFT: content ── */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <m.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-3"
                >
                  <span className="w-8 h-px bg-primary" />
                  Centro de desenvolvimento cognitivo e socioemocional
                </m.p>

                {/* Headline */}
                <m.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.58, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.01] tracking-[-0.045em]"
                >
                  Fortalecendo{" "}
                  <span
                    className="relative inline-grid"
                    style={{ verticalAlign: "top" }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span
                      className="scraper-hidden-reserver col-start-1 row-start-1 text-primary pointer-events-none select-none"
                      aria-hidden="true"
                      data-text={LONGEST}
                    />
                    <AnimatePresence mode="wait">
                      <m.span
                        key={wordIndex}
                        initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, y: -8, clipPath: "inset(100% 0 0% 0)" }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="col-start-1 row-start-1 text-primary"
                        style={{ willChange: "transform, opacity, clip-path" }}
                        aria-label={WORDS[wordIndex]}
                      >
                        {WORDS[wordIndex]}
                      </m.span>
                    </AnimatePresence>
                    <m.span
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded-full bg-primary/30 origin-left"
                    />
                  </span>
                  <br />
                  <span className="text-muted-foreground">que moldam o amanhã</span>
                </m.h1>

                {/* Body copy */}
                <m.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 lg:mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg"
                >
                  Programas personalizados fundamentados em{" "}
                  <span className="text-foreground font-medium">neurociência</span>{" "}
                  para crianças, adolescentes, adultos e idosos.
                  Porque todo potencial merece ser descoberto —
                  aqui em{" "}
                  <span className="text-foreground font-medium">Vila Velha</span>{" "}
                  e além.
                </m.p>

                {/* CTAs */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base group"
                    asChild
                  >
                    <a
                      href="#contato"
                      onClick={() => track("cta_hero_primary_click")}
                    >
                      Agendar aula experimental
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base bg-transparent group hover:bg-neutral-200 hover:text-black hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md"
                    asChild
                  >
                    <Link href="#programas" onClick={() => track("cta_hero_programs_click")}>
                      Ver programas
                    </Link>
                  </Button>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 }}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {[
                    "A partir de 5 anos",
                    "Psicólogos e psicopedagogas",
                    "Praia da Costa, Vila Velha",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </m.div>

                {/* ── Mobile image carousel ── */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mt-8 lg:hidden"
                >
                  {isInitialLoad && !announcements?.length ? (
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-muted shadow-lg ring-1 ring-white/10 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground animate-pulse">
                          Buscando novidades...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <MobileNewsCarousel items={displayImages} />
                  )}
                </m.div>

                {/* Trust indicators */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="mt-12 pt-8 border-t border-border"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                    Atendimento especializado
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
                    <span>Crianças</span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>Adolescentes</span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>Adultos</span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>Idosos</span>
                  </div>
                </m.div>
              </m.div>

              {/* ── RIGHT: Image gallery (desktop) ── */}
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:flex items-center justify-center"
              >
                <div className="relative w-full max-w-[550px] xl:max-w-[700px] mx-auto group space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-px bg-primary/30" />
                    <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                      Fique por dentro das novidades na Intelekta!
                    </h4>
                  </div>

                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-white/10">
                    {isInitialLoad && !announcements?.length && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-b-2 border-primary animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                          </div>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/50 font-bold animate-pulse">
                          Sincronizando com Intelekta
                        </p>
                      </div>
                    )}

                    <AnimatePresence>
                      {displayImages.map((img, index) => index === currentImage && (
                        <m.div
                          key={`${index}-${imageResetKey}`}
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 0.8 }
                          }}
                          className="absolute inset-0"
                          style={{ willChange: "opacity, transform" }}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            style={{
                              objectPosition: img.imagePosition || '50% 50%',
                              transform: `scale(${img.imageZoom || 1})`
                            }}
                            sizes="460px"
                            priority
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end px-8 pt-8 pb-14 xl:px-10 xl:pt-10 xl:pb-16">
                            {img.date && (
                              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-white/90 font-medium whitespace-nowrap">
                                {img.date}
                              </div>
                            )}
                            <m.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.6 }}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <span className="inline-block px-3 py-1 bg-primary/90 text-[10px] font-bold tracking-[0.2em] text-primary-foreground rounded-full backdrop-blur-sm uppercase">
                                  {img.category || "Novidade"}
                                </span>
                              </div>
                              <h3 className="font-serif text-3xl xl:text-4xl font-bold text-white leading-[1.1] mb-3 drop-shadow-sm">
                                {img.title}
                              </h3>
                              <p className="text-white/70 text-sm xl:text-base line-clamp-3 font-light leading-relaxed max-w-[90%]">
                                {img.description}
                              </p>
                              {img.link && (
                                <Link
                                  href={img.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-4 pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                                >
                                  Saiba mais
                                  <Plus className="w-3.5 h-3.5" />
                                </Link>
                              )}
                            </m.div>
                          </div>
                        </m.div>
                      ))}
                    </AnimatePresence>

                    <div className="absolute bottom-6 right-8 left-8 flex items-center justify-between z-20">
                      <div className="flex gap-2">
                        {displayImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setCurrentImage(idx); setImageResetKey(k => k + 1) }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImage ? "w-8 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/50"
                              }`}
                          />
                        ))}
                      </div>

                      <div className="flex gap-2 z-30">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-10 h-10 rounded-full border border-white/40 text-white bg-black/20 hover:bg-white/20 backdrop-blur-sm transition-all shadow-lg"
                          onClick={(e) => { e.stopPropagation(); setCurrentImage(i => (i - 1 + displayImages.length) % displayImages.length); setImageResetKey(k => k + 1) }}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-10 h-10 rounded-full border border-white/40 text-white bg-black/20 hover:bg-white/20 backdrop-blur-sm transition-all shadow-lg"
                          onClick={(e) => { e.stopPropagation(); setCurrentImage(i => (i + 1) % displayImages.length); setImageResetKey(k => k + 1) }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>

            </div>
          </div>
        </div>

        {/* ── Mouse hint ── */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1.2 }}
          className="hidden lg:block absolute bottom-14 right-10 xl:right-16 text-xs text-muted-foreground/30 italic pointer-events-none z-10"
        >
          ← Mova o mouse para estimular a rede neural
        </m.p>

        {/* ── Scroll caret ── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            <ChevronDown className="w-6 h-6 text-primary/40" strokeWidth={2} />
          </m.div>
        </m.div>

      </section>
    </LazyMotion>
  )
}
