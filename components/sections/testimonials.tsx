/**
 * Desktop testimonials section — swipeable/draggable carousel
 * with framer-motion drag gestures and navigation dots.
 */
"use client"

import { motion, useInView, type PanInfo } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    content: "\"A transformação que tive foi extraordinária. Em poucos meses, desenvolvi uma capacidade de concentração e gestão emocional que impactou positivamente minha vida!\"",
    author: "João Gabriel Rosa",
    role: "Aluno Adulto",
    program: "Neuroeducação",
    stars: 5,
  },
  {
    id: 2,
    content: "\"Meu primo me indicou o programa e eu gostei muito! Me ajudou a entender como minha mente funciona e a desenvolver estratégias práticas para os desafios do dia a dia. A abordagem lúdica faz toda a diferença!\"",
    author: "Guto",
    role: "Aluno Adolescente",
    program: "Xadrez",
    stars: 5,
  },
  {
    id: 3,
    content: "\"Eu adoro as aulas e sempre volto cheia de energia. Percebo uma evolução enorme na forma como eu lido com as emoções e me organizo para estudar.\"",
    author: "Aninha",
    role: "Aluna do Infantil",
    program: "Musicoterapia",
    stars: 5,
  },
  {
    id: 4,
    content: "\"Como pai, ver meus filhos se desenvolvendo com acompanhamento tão atencioso e personalizado me dá uma tranquilidade enorme. A equipe da Intelekta é excepcional!\"",
    author: "Gildásio",
    role: "Pai de aluno",
    program: "Reforço Escolar",
    stars: 5,
  },
]


export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold || info.velocity.x < -50) {
      nextTestimonial()
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 50) {
      prevTestimonial()
    }
  }, [])

  return (
    <section id="depoimentos" className="py-16 sm:py-20 lg:py-28 bg-dark-section relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Depoimentos
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-editorial-lg text-dark-section-foreground text-balance leading-[1.04] max-w-2xl"
          >
            Histórias reais de quem vivencia a{" "}
            <span className="text-secondary italic">transformação cognitiva</span>
          </motion.h2>
        </div>

        {/* Testimonial display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="relative max-w-4xl"
        >
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/[0.08] p-6 sm:p-8 lg:p-12">
            {/* Large decorative quote */}
            <span className="absolute top-2 left-6 sm:top-4 sm:left-8 font-serif text-7xl sm:text-9xl text-primary/5 leading-none select-none pointer-events-none tracking-tighter">&ldquo;</span>

            {/* Content */}
            <div className="pt-8 sm:pt-6">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing select-none"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {Array.from({ length: testimonials[currentIndex].stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-dark-section-foreground leading-[1.45] tracking-[-0.02em] italic mb-8 sm:mb-10 text-pretty">
                  {testimonials[currentIndex].content}
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-dark-section-foreground text-sm sm:text-base">
                      {testimonials[currentIndex].author}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-section-foreground/50">
                      {testimonials[currentIndex].role} · {testimonials[currentIndex].program}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevTestimonial}
                      className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-white/10 text-dark-section-foreground hover:bg-white/10 bg-transparent"
                      aria-label="Depoimento anterior"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextTestimonial}
                      className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-white/10 text-dark-section-foreground hover:bg-white/10 bg-transparent"
                      aria-label="Próximo depoimento"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-white/20 hover:bg-white/30"
                )}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
