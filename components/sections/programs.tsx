"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Baby, GraduationCap, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const programs = [
  {
    id: "infantil",
    icon: Baby,
    title: "Infantil",
    ageRange: "5 a 10 anos",
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
    icon: GraduationCap,
    title: "Adolescente",
    ageRange: "11 a 17 anos",
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
    icon: Briefcase,
    title: "Adulto",
    ageRange: "18 a 59 anos",
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
    icon: Heart,
    title: "Sênior",
    ageRange: "60+ anos",
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

        {/* Program selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 lg:mb-12"
        >
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveProgram(program.id)}
              className={cn(
                "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                activeProgram === program.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <program.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{program.title}</span>
              <span className="sm:hidden">{program.title.slice(0, 3)}</span>
            </button>
          ))}
        </motion.div>

        {/* Program details */}
        <motion.div
          key={activeProgram}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center"
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <currentProgram.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
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
                "{currentProgram.highlight}"
              </p>
            </div>

            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="#agendar">
                Agendar aula experimental
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
              <div className="absolute inset-6 sm:inset-8 rounded-full border-2 border-dashed border-secondary/30" />
              <div className="absolute inset-12 sm:inset-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-card shadow-2xl flex items-center justify-center border border-border">
                  <currentProgram.icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 sm:top-12 right-8 sm:right-12 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">+</span>
              </div>
              <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <span className="text-secondary-foreground font-serif text-xl sm:text-2xl">&#8734;</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
