"use client"

import { useMemo, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

type Testimonial = {
  id?: number
  content: string
  author: string
  role: string
  program?: string
  stars?: number
}

const SWIPE_THRESHOLD = 50
const VELOCITY_THRESHOLD = 50

export function MobileTestimonialsCarousel({
  testimonials,
}: {
  testimonials: readonly Testimonial[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  const current = useMemo(
    () => testimonials[currentIndex] ?? testimonials[0],
    [currentIndex, testimonials],
  )

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex((index + testimonials.length) % testimonials.length)
  }, [currentIndex, testimonials.length])

  const prev = () => goTo(currentIndex - 1)
  const next = () => goTo(currentIndex + 1)

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD) {
      next()
    } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD) {
      prev()
    }
  }

  if (!current) return null

  return (
    <div className="relative max-w-4xl overflow-hidden">
      <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-dark-section-foreground">
        <span className="pointer-events-none absolute left-6 top-4 select-none font-serif text-7xl leading-none tracking-tighter text-primary/5">
          &ldquo;
        </span>

        <div className="pt-7 min-h-[320px] flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="flex-1 cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: current.stars ?? 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="mb-8 font-serif text-xl font-bold leading-8 tracking-[-0.02em] italic text-pretty min-h-[140px]">
                {current.content}
              </blockquote>

              <div className="flex items-end justify-between gap-4 mt-auto">
                <div>
                  <h3 className="text-sm font-semibold text-dark-section-foreground">{current.author}</h3>
                  <p className="text-sm text-dark-section-foreground/60">
                    {current.program ? `${current.role} · ${current.program}` : current.role}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-dark-section-foreground active:bg-white/5"
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-dark-section-foreground active:bg-white/5"
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id ?? `${testimonial.author}-${index}`}
            type="button"
            onClick={() => goTo(index)}
            className={`flex items-center justify-center h-7 w-7 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary/20" : "bg-transparent"
            }`}
            aria-label={`Ir para depoimento ${index + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === currentIndex ? "h-1.5 w-5 bg-primary" : "h-1.5 w-1.5 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
