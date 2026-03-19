"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

type Testimonial = {
  id?: number
  content: string
  author: string
  role: string
  program?: string
  stars?: number
}

export function MobileTestimonialsCarousel({
  testimonials,
}: {
  testimonials: readonly Testimonial[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = useMemo(
    () => testimonials[currentIndex] ?? testimonials[0],
    [currentIndex, testimonials],
  )

  const prev = () => {
    setCurrentIndex((index) => (index - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setCurrentIndex((index) => (index + 1) % testimonials.length)
  }

  if (!current) {
    return null
  }

  return (
    <div className="relative max-w-4xl">
      <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-dark-section-foreground">
        <span className="pointer-events-none absolute left-6 top-4 select-none font-serif text-7xl leading-none tracking-tighter text-primary/5">
          &ldquo;
        </span>

        <div className="pt-7">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: current.stars ?? 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="mb-8 font-serif text-xl leading-8 italic text-pretty">
            {current.content}
          </blockquote>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-dark-section-foreground">{current.author}</h3>
              <p className="text-sm text-dark-section-foreground/60">{current.program ? `${current.role} · ${current.program}` : current.role}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-dark-section-foreground"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-dark-section-foreground"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id ?? `${testimonial.author}-${index}`}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={
              index === currentIndex
                ? "h-1.5 w-8 rounded-full bg-primary"
                : "h-1.5 w-1.5 rounded-full bg-white/20"
            }
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
