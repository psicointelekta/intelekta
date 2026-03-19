"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const IMAGES = [
  {
    src: "/images/hero-1.jpg",
    alt: "Sessão de psicopedagogia com criança",
  },
  {
    src: "/images/hero-2.jpg", 
    alt: "Atendimento psicológico acolhedor",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Ambiente terapêutico tranquilo",
  },
]

const WORDS = ["mentes", "emoções", "futuros"] as const

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(imageInterval)
  }, [])

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 2800)
    return () => clearInterval(wordInterval)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary" />
              Centro Cognitivo
            </motion.p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] tracking-tight">
              Fortalecendo{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-primary inline-block"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30 origin-left"
                />
              </span>
              <br />
              <span className="text-muted-foreground">que moldam o amanhã</span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 lg:mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Psicólogos e psicopedagogas cuidando do desenvolvimento 
              cognitivo e emocional com acolhimento e ciência.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-8 text-base group"
                asChild
              >
                <a
                  href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Intelekta."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar consulta
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base bg-transparent"
                asChild
              >
                <Link href="#sobre">
                  Conheça a Intelekta
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={IMAGES[currentImage].src}
                    alt={IMAGES[currentImage].alt}
                    fill
                    className="object-cover"
                    priority={currentImage === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Image indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage 
                      ? "w-8 bg-primary" 
                      : "w-1.5 bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-4 lg:-right-8 top-1/4 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-primary/20 pointer-events-none"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -left-4 lg:-left-8 bottom-1/4 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/5 pointer-events-none"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
