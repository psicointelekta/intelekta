"use client"

import { motion, useInView, type PanInfo } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    content: "A transformação que vimos em nosso filho foi extraordinária. Em poucos meses, ele desenvolveu uma capacidade de concentração e gestão emocional que impactou positivamente sua vida escolar e familiar.",
    author: "Maria Silva",
    role: "Mãe de aluno",
    program: "Programa Infantil",
    initials: "MS",
  },
  {
    id: 2,
    content: "Como adolescente, estava com dificuldades de organização e ansiedade. O programa me ajudou a entender como minha mente funciona e a desenvolver estratégias práticas para os desafios do dia a dia.",
    author: "Lucas Oliveira",
    role: "Aluno, 16 anos",
    program: "Programa Adolescente",
    initials: "LO",
  },
  {
    id: 3,
    content: "Busquei a Intelekta para melhorar minha produtividade e gestão do estresse. O resultado superou minhas expectativas: hoje consigo equilibrar melhor trabalho, família e bem-estar pessoal.",
    author: "Carolina Santos",
    role: "Executiva",
    program: "Programa Adulto",
    initials: "CS",
  },
  {
    id: 4,
    content: "Aos 68 anos, descobri que ainda posso aprender e evoluir. As atividades de estimulação cognitiva trouxeram mais clareza mental e o grupo me proporcionou novas amizades valiosas.",
    author: "Roberto Mendes",
    role: "Aposentado",
    program: "Programa Sênior",
    initials: "RM",
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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
    <section id="depoimentos" className="py-12 sm:py-16 lg:py-24 bg-card" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
          >
            Histórias de transformação
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-background border border-border p-6 sm:p-8 lg:p-12">
            {/* Quote icon */}
            <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>

            {/* Content */}
            <div className="pt-10 sm:pt-8">
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
                <p className="text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 sm:mb-8 font-serif italic">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-base sm:text-lg font-semibold text-primary-foreground">
                      {testimonials[currentIndex].initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                    <span className="text-xs text-primary font-medium">
                      {testimonials[currentIndex].program}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { value: "200+", label: "Famílias atendidas" },
            { value: "4.9", label: "Avaliação média" },
            { value: "95%", label: "Taxa de satisfação" },
            { value: "5+", label: "Anos de experiência" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
