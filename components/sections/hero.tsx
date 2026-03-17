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
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Star, TrendingUp, Users, Award, ChevronDown, Brain } from "lucide-react"
import { NeuralTree } from "@/components/neural-tree"
import { useEffect, useRef, useState, memo, useCallback } from "react"
import { track } from "@vercel/analytics/react"

/* ─── Animated Counter ─── */
const Counter = memo(function Counter({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setCount(Math.floor(eased * to))
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
        else setCount(to)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [to, duration])

  return <span ref={ref}>{count}</span>
})

/* ─── Floating Stat Card ─── */
const StatCard = memo(function StatCard({
  icon: Icon,
  value,
  label,
  delay,
  className = "",
}: {
  icon: React.ElementType
  value: React.ReactNode
  label: string
  delay: number
  className?: string
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      style={{ willChange: "transform, opacity" }}
      className={`absolute bg-background/80 border border-border/50 rounded-2xl px-4 py-3.5 shadow-md ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-[17px] font-bold text-foreground leading-none mb-0.5">{value}</p>
          <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
        </div>
      </div>
    </m.div>
  )
})

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
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className="relative min-h-[100svh] flex flex-col overflow-hidden bg-background pt-16 sm:pt-20"
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

        {/* ── Editorial letterform background ── */}
        <div
          className="absolute right-0 top-[4%] text-[clamp(140px,22vw,360px)] font-black leading-none select-none pointer-events-none text-foreground/[0.02] tracking-tighter"
          aria-hidden
        >
          IK
        </div>

        {/* ── Neural network ── */}
        <div className="absolute inset-0 pointer-events-none">
          <NeuralTree />
        </div>

        {/* ── Readability overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/65 pointer-events-none" />

        {/* ══ MAIN CONTENT — fills full height ══ */}
        <div className="relative z-10 flex-1 flex items-center">
          {/*
            Push to the very edge: pl-4 sm:pl-6 lg:pl-8
            No auto-centering max-width wrapper that adds phantom margins.
            Content starts near the left edge with just the safety gutter.
          */}
          <div className="w-full pl-8 sm:pl-14 lg:pl-24 xl:pl-32 pr-4 sm:pr-6 lg:pr-8 py-10 sm:py-14 lg:py-16">

            {/*
              3-COLUMN GRID
              [accent | content | cards]
              No max-w-7xl centering — content is flush to the left gutter.
            */}
            <div className="grid lg:grid-cols-[44px_1fr_264px] xl:grid-cols-[52px_1fr_280px] gap-8 lg:gap-10 items-center max-w-[1400px]">

              {/* ── LEFT ACCENT (desktop only) ── */}
              <div className="hidden lg:flex flex-col items-center gap-3 self-stretch justify-center py-8">
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent" />
                <p
                  className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground/35 font-medium"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Intelekta © {new Date().getFullYear()}
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                <p
                  className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/30 font-mono"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Vila Velha · ES
                </p>
                <div className="flex-1 w-px bg-gradient-to-b from-border/60 via-border/30 to-transparent" />
              </div>

              {/* ── CENTER: main content ── */}
              <div className="min-w-0">

                {/* Location badge */}
                <m.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-3 mb-6 sm:mb-7"
                >
                  <div className="flex items-center gap-2 border border-primary/30 bg-primary/5 rounded-full pl-2 pr-4 py-1.5">
                    <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary/30" />
                      <span className="relative w-2.5 h-2.5 rounded-full bg-primary" />
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-primary tracking-wide">
                      Vila Velha, ES
                    </span>
                  </div>
                  <span className="hidden sm:block text-[11px] text-muted-foreground/45 font-mono tracking-widest">
                    20°21′S 40°17′O
                  </span>
                </m.div>

                {/* Eyebrow */}
                <m.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground/55 font-medium mb-4 sm:mb-5 flex items-center gap-3"
                >
                  <span className="w-5 h-px bg-muted-foreground/30 shrink-0" />
                  Centro de desenvolvimento cognitivo e socioemocional
                </m.p>

                {/* ── HEADLINE ── */}
                <m.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.58, delay: 0.11, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-editorial-xl text-foreground leading-[1.07]"
                >
                  Fortalecendo{" "}
                  <span
                    className="relative inline-grid"
                    style={{ verticalAlign: "top" }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {/* Invisible spacer — reserves width permanently */}
                    <span
                      className="col-start-1 row-start-1 text-primary"
                      aria-hidden
                      style={{ visibility: "hidden", pointerEvents: "none" }}
                    >
                      {LONGEST}
                    </span>
                    {/* Animated word */}
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
                    {/* Static underline */}
                    <m.span
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.38, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded-full bg-primary/30 origin-left"
                    />
                  </span>
                  <br className="hidden sm:block" />
                  {" "}que moldam o amanhã
                </m.h1>

                {/* Body copy */}
                <m.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[50ch] text-pretty"
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
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    size="lg"
                    className="h-13 sm:h-14 px-7 sm:px-8 text-sm sm:text-base w-full sm:w-auto animate-cta-pulse group"
                    asChild
                  >
                    <a
                      href="https://wa.me/5527996194455?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20na%20Intelekta."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("cta_hero_whatsapp")}
                    >
                      Agendar aula gratuita
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 sm:h-14 px-7 sm:px-8 text-sm sm:text-base w-full sm:w-auto bg-background/50 group"
                    asChild
                  >
                    <Link href="#programas">
                      Descubra seu programa ideal
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </Button>
                </m.div>

                {/* Trust bar */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.46 }}
                  className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-7"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-foreground">5</span>
                    <span className="text-sm text-muted-foreground">/5</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary/55 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">+200 famílias</strong> atendidas
                    </span>
                  </div>
                  <div className="h-4 w-px bg-border hidden sm:block" />
                  <div className="hidden sm:flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary/55 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">30+ anos</strong> de experiência na equipe
                    </span>
                  </div>
                </m.div>

                {/* Program pills */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7 sm:mt-9 flex flex-wrap gap-2"
                >
                  {[
                    { label: "Crianças",     tag: "5–12 anos"  },
                    { label: "Adolescentes", tag: "13–17 anos" },
                    { label: "Adultos",      tag: "18–59 anos" },
                    { label: "Idosos",       tag: "60+ anos"   },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 border border-border/50 rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:bg-primary/5 hover:border-primary/30 cursor-default"
                    >
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                  <Link
                    href="#programas"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-primary font-medium rounded-full transition-all duration-200 hover:bg-primary/5 hover:gap-2.5"
                  >
                    Ver todos <ArrowRight className="w-3 h-3" />
                  </Link>
                </m.div>
              </div>

              {/* ── RIGHT: stat cards (desktop only) ── */}
              <div className="hidden lg:block relative h-[308px] shrink-0">
                <StatCard
                  icon={Users}
                  value={<><Counter to={200} />+</>}
                  label="Famílias em Vila Velha, ES"
                  delay={0.6}
                  className="top-0 inset-x-0"
                />
                <StatCard
                  icon={Brain}
                  value="5.0 / 5"
                  label="Avaliação média dos alunos"
                  delay={0.75}
                  className="top-[104px] inset-x-3"
                />
                <StatCard
                  icon={TrendingUp}
                  value={<><Counter to={93} />%</>}
                  label="Melhora relatada em 60 dias"
                  delay={0.9}
                  className="top-[208px] inset-x-0"
                />
                <m.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 -translate-x-px top-14 bottom-12 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent origin-top"
                />
              </div>

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

        {/* ── Scroll caret — pinned to very bottom of viewport ── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
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
