/**
 * Deferred mobile widgets — wraps heavy interactive components
 * (testimonials carousel, FAQ accordion, contact form) in next/dynamic
 * with ssr:false so they are loaded only after the main content paints.
 *
 * Each component renders a static SSR placeholder until mounted,
 * preventing layout shift while reducing the initial JS bundle.
 */
"use client"
import { Star } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

type Testimonial = {
  content: string
  author: string
  role: string
  program?: string
  stars?: number
}

type FaqItem = {
  question: string
  answer: string
}

const MobileTestimonialsCarousel = dynamic(
  () => import("@/components/pages/mobile-testimonials-carousel").then((mod) => mod.MobileTestimonialsCarousel),
  { ssr: false },
)

const MobileFaq = dynamic(
  () => import("@/components/pages/mobile-faq").then((mod) => mod.MobileFaq),
  { ssr: false },
)

const MobileContactForm = dynamic(
  () => import("@/components/pages/mobile-contact-form").then((mod) => mod.MobileContactForm),
  { ssr: false },
)

export function DeferredMobileTestimonialsCarousel({ testimonials }: { testimonials: readonly Testimonial[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    const testimonial = testimonials[0]

    return (
      <article className="relative max-w-4xl rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-dark-section-foreground">
        <span className="pointer-events-none absolute left-6 top-4 select-none font-serif text-7xl leading-none tracking-tighter text-primary/5">
          &ldquo;
        </span>
        <div className="pt-7">
          <div className="mb-4 flex gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="mb-8 font-serif text-xl font-bold leading-8 tracking-[-0.02em] italic text-pretty">
            {testimonial?.content}
          </blockquote>
          <div>
            <h3 className="text-sm font-semibold text-dark-section-foreground">{testimonial?.author}</h3>
            <p className="text-sm text-dark-section-foreground/60">{testimonial?.role}</p>
          </div>
        </div>
      </article>
    )
  }

  return <MobileTestimonialsCarousel testimonials={testimonials} />
}

export function DeferredMobileFaq({ faqs }: { faqs: readonly FaqItem[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="space-y-3" aria-hidden>
        {faqs.slice(0, 3).map((faq) => (
          <div key={faq.question} className="rounded-3xl border border-border bg-card px-5 py-4">
            <p className="text-base font-semibold text-foreground">{faq.question}</p>
          </div>
        ))}
      </div>
    )
  }

  return <MobileFaq faqs={faqs} />
}

export function DeferredMobileContactForm() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-foreground">Formulário de contato</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Carregando formulário rápido...
        </p>
      </div>
    )
  }

  return <MobileContactForm />
}
