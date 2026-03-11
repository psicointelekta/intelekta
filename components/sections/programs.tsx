"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const programs = [
  {
    id: "infantil",
    title: "Infantil",
    ageRange: "5 a 10 anos",
    image: "/images/program-infantil.png",
    description: "Construindo as bases do pensamento e da inteligência emocional através da descoberta e do brincar.",
    focuses: [
      "Desenvolvimento da criatividade e imaginação",
      "Atenção e concentração através de jogos lúdicos",
      "Primeiras habilidades sociais e emocionais",
      "Expressão e reconhecimento de emoções",
    ],
    highlight: "Aprender brincando, crescer descobrindo.",
  },
  {
    id: "adolescente",
    title: "Adolescente",
    ageRange: "11 a 17 anos",
    image: "/images/program-adolescente.png",
    description: "Desenvolvendo autonomia intelectual e emocional em uma fase de descobertas e transformações.",
    focuses: [
      "Pensamento crítico e raciocínio lógico",
      "Autoconhecimento e gestão emocional",
      "Organização e planejamento de estudos",
      "Comunicação assertiva e habilidades sociais",
    ],
    highlight: "Preparando-se para as escolhas que moldarão seu futuro.",
  },
  {
    id: "adulto",
    title: "Adulto",
    ageRange: "18 a 59 anos",
    image: "/images/program-adulto.png",
    description: "Potencializando capacidades para os desafios da vida profissional e pessoal contemporânea.",
    focuses: [
      "Produtividade e tomada de decisão",
      "Flexibilidade cognitiva e adaptação",
      "Gerenciamento do estresse e equilíbrio",
      "Liderança e comunicação eficaz",
    ],
    highlight: "Evoluir continuamente, impactar positivamente.",
  },
  {
    id: "senior",
    title: "Sênior",
    ageRange: "60+ anos",
    image: "/images/program-senior.png",
    description: "Mantendo a vitalidade mental e fortalecendo conexões para uma vida plena e significativa.",
    focuses: [
      "Preservação e estimulação cognitiva",
      "Bem-estar emocional e qualidade de vida",
      "Fortalecimento de vínculos sociais",
      "Autonomia e independência",
    ],
    highlight: "Envelhecer com sabedoria, viver com propósito.",
  },
]

export function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProgram, setActiveProgram] = useState(programs[0].id)

  const currentProgram = programs.find((p) => p.id === activeProgram) || programs[0]

  return (
    <section id="programas" className="py-12 sm:py-16 lg:py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Nossos Programas
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
          >
            Desenvolvimento para cada fase da vida
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Programas personalizados que respeitam as necessidades e potenciais únicos
            de cada faixa etária, fundamentados em neurociência e psicologia.
          </motion.p>
        </div>

        {/* Program selector — full labels on all sizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 mb-10 lg:mb-12"
        >
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveProgram(program.id)}
              className={cn(
                "flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                activeProgram === program.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {program.title}
            </button>
          ))}
        </motion.div>

        {/* Program details */}
        <motion.div
          key={activeProgram}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
                  {currentProgram.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {currentProgram.ageRange}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {currentProgram.description}
            </p>

            <div className="space-y-4 mb-6 sm:mb-8">
              <h4 className="text-xs sm:text-sm font-medium text-foreground uppercase tracking-wider">
                Áreas de foco
              </h4>
              <ul className="grid gap-3">
                {currentProgram.focuses.map((focus, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10 mb-6 sm:mb-8">
              <p className="font-serif text-base sm:text-lg text-foreground italic">
                &quot;{currentProgram.highlight}&quot;
              </p>
            </div>

            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="#agendar">
                Agendar aula experimental
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image visual — replaces emoji/icon */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={currentProgram.image}
                alt={`Programa ${currentProgram.title} — ${currentProgram.ageRange}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {/* Age badge */}
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                <span className="text-sm font-semibold text-foreground">
                  {currentProgram.ageRange}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
