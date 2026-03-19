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
import { ArrowRight, MapPin, ChevronDown } from "lucide-react"
import { NeuralTree } from "@/components/neural-tree"
import { useEffect, useState, useCallback } from "react"
import { track } from "@vercel/analytics/react"

const HERO_IMAGES = [
  { src: "/images/hero-1.webp", alt: "Sessão de psicopedagogia com criança" },
  { src: "/images/hero-2.webp", alt: "Atendimento psicológico acolhedor" },
  { src: "/images/hero-3.webp", alt: "Ambiente terapêutico tranquilo" },
]

const HERO_IMAGES_MOBILE = [
  { src: "/images/hero-mobile-1.webp", alt: "Criança em atividade lúdica de neuroeducação" },
  { src: "/images/hero-mobile-2.webp", alt: "Adolescente em sessão de desenvolvimento cognitivo" },
  { src: "/images/hero-mobile-3.webp", alt: "Idosa sorrindo durante atividade terapêutica" },
]

/* ─── Layout-shift-free word cycling ─── */
const WORDS = ["mentes", "emoções", "futuros"] as const
const LONGEST = "emoções"

/* ─── MAIN HERO ─── */
export function Hero() {
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
  const [currentMobileImage, setCurrentMobileImage] = useState(0)
  const [imageResetKey, setImageResetKey] = useState(0)
  const [mobileResetKey, setMobileResetKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setCurrentImage((i) => (i + 1) % HERO_IMAGES.length), 3000)
    return () => clearInterval(id)
  }, [imageResetKey])

  useEffect(() => {
    const id = setInterval(() => setCurrentMobileImage((i) => (i + 1) % HERO_IMAGES_MOBILE.length), 3000)
    return () => clearInterval(id)
  }, [mobileResetKey])

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

        {/* ── Grid lines ── */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-[length:80px_100%] opacity-[0.05] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:100%_80px] opacity-[0.05] pointer-events-none" />

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
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.07] tracking-tight"
                >
                  Fortalecendo{" "}
                  <span
                    className="relative inline-grid"
                    style={{ verticalAlign: "top" }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span
                      className="col-start-1 row-start-1 text-primary"
                      aria-hidden
                      style={{ visibility: "hidden", pointerEvents: "none" }}
                    >
                      {LONGEST}
                    </span>
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
                      href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20na%20Intelekta."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("cta_hero_whatsapp")}
                    >
                      Fale Conosco
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base bg-transparent group"
                    asChild
                  >
                    <Link href="#sobre">
                      Conheça a Intelekta
                    </Link>
                  </Button>
                </m.div>

                {/* ── Mobile image carousel ── */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mt-8 lg:hidden"
                >
                  <div
                    className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-muted cursor-pointer"
                    onClick={() => { setCurrentMobileImage((i) => (i + 1) % HERO_IMAGES_MOBILE.length); setMobileResetKey((k) => k + 1) }}
                  >
                    {HERO_IMAGES_MOBILE.map((img, index) => (
                      <m.div
                        key={index}
                        animate={{ opacity: index === currentMobileImage ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 384px"
                          priority={index === 0}
                        />
                      </m.div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {HERO_IMAGES_MOBILE.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => { setCurrentMobileImage(index); setMobileResetKey((k) => k + 1) }}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === currentMobileImage
                            ? "w-6 bg-primary"
                            : "w-1 bg-border"
                        }`}
                        aria-label={`Ver imagem ${index + 1}`}
                      />
                    ))}
                  </div>
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
                <div className="relative w-full max-w-[380px] xl:max-w-[420px] mx-auto">
                  <div
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted cursor-pointer"
                    onClick={() => { setCurrentImage((i) => (i + 1) % HERO_IMAGES.length); setImageResetKey((k) => k + 1) }}
                  >
                    {HERO_IMAGES.map((img, index) => (
                      <m.div
                        key={index}
                        animate={{ opacity: index === currentImage ? 1 : 0, scale: index === currentImage ? 1 : 1.03 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="420px"
                          priority={index === 0}
                        />
                      </m.div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Image indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {HERO_IMAGES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => { setCurrentImage(index); setImageResetKey((k) => k + 1) }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentImage
                            ? "w-8 bg-primary"
                            : "w-1.5 bg-border hover:bg-muted-foreground/30"
                        }`}
                        aria-label={`Ver imagem ${index + 1}`}
                      />
                    ))}
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
