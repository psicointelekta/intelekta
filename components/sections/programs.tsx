"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const programs = [
  {
    id: "neuroeducacao",
    title: "Neuroeducação",
    subtitle: "O programa central da Intelekta",
    image: "/images/program-infantil.png",
    description: "Um programa multidisciplinar 100% lúdico que estimula, desenvolve e fortalece a mente em todas as idades. Trabalhamos com jogos, oficinas criativas e atividades planejadas com base na neuroeducação, unindo cognição e habilidades socioemocionais.",
    highlight: "Brincar é estratégia. Aprender é experiência. Desenvolver é para a vida toda.",
    details: ["Personalizado por faixa etária", "Resultados observáveis", "Crianças a idosos"],
    badge: "Principal",
  },
  {
    id: "musicoterapia",
    title: "Musicoterapia",
    subtitle: "A música como ferramenta terapêutica",
    image: "/images/program-adolescente.png",
    description: "Programa lúdico e presencial que utiliza instrumentos, canto, ritmo, escuta guiada e movimento corporal para desenvolver capacidades cognitivas e socioemocionais. Promove atenção, memória, linguagem, autorregulação emocional e interação social.",
    highlight: "A música transforma, conecta e cura — em qualquer idade.",
    details: ["1 encontro semanal de 1h30", "Individual e em grupo", "Turmas por faixa etária"],
  },
  {
    id: "reforco-escolar",
    title: "Reforço Escolar",
    subtitle: "Da Educação Infantil ao Ensino Médio",
    image: "/images/program-adulto.png",
    description: "Programa lúdico e presencial voltado ao desenvolvimento acadêmico e socioemocional. Utilizamos jogos educativos, atividades práticas e estratégias pedagógicas que facilitam a compreensão e fortalecem a aprendizagem, em parceria com a família e alinhamento com a escola.",
    highlight: "Cada criança aprende de um jeito — e nós respeitamos isso.",
    details: ["1 encontro semanal de 1h30", "Individual e em grupo", "Infantil ao Ensino Médio"],
  },
  {
    id: "xadrez",
    title: "Xadrez",
    subtitle: "Pensamento estratégico em cada jogada",
    image: "/images/activity-children-chess.png",
    description: "Programa lúdico e pedagógico que utiliza o xadrez para desenvolver atenção, memória, raciocínio lógico, planejamento, tomada de decisão e autorregulação emocional. Inclui partidas, puzzles, jogos adaptados e desafios progressivos.",
    highlight: "Cada jogada ensina a pensar melhor — dentro e fora do tabuleiro.",
    details: ["Metas individuais", "Avaliação + acompanhamento", "Todas as idades"],
  },
  {
    id: "cubo-magico",
    title: "Cubo Mágico",
    subtitle: "Desafios que transformam a mente",
    image: "/images/activity-children-rubiks.png",
    description: "Programa lúdico e presencial que trabalha atenção, foco, raciocínio lógico e espacial, planejamento, memória, persistência e controle emocional através da resolução do cubo mágico e seus desafios progressivos.",
    highlight: "A persistência de resolver um cubo mágico transforma a forma de encarar qualquer desafio.",
    details: ["Encontros semanais de 1h30", "Quintas-feiras", "Crianças a idosos"],
  },
]

export function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="programas" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Dynamic background — blurs and decorative elements */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-20 -left-32 w-72 h-72 rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-secondary/[0.05] blur-[120px]" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:32px_32px] opacity-[0.025]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Nossos Programas
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-editorial-lg text-foreground text-balance mb-5"
          >
            Cinco caminhos para{" "}
            <span className="text-primary">desenvolver sua mente</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Programas presenciais, lúdicos e personalizados — cada um com uma abordagem
            única, todos fundamentados em neurociência e desenvolvimento humano.
          </motion.p>
        </div>

        {/* Programs — alternating cards */}
        <div className="space-y-6 lg:space-y-8">
          {programs.map((program, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="grid lg:grid-cols-2 gap-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.04]">
                  {/* Image */}
                  <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Image
                      src={program.image}
                      alt={`Programa ${program.title} da Intelekta — ${program.subtitle}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 img-warm-treatment"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {program.badge && (
                        <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
                          {program.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-xs sm:text-sm text-primary font-medium mb-2 block">
                      {program.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                      {program.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                      {program.details.map((detail) => (
                        <span key={detail} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.06] text-xs sm:text-sm text-foreground/80">
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </span>
                      ))}
                    </div>

                    {/* Highlight quote */}
                    <div className="p-4 rounded-xl bg-primary/[0.04] border border-primary/[0.08] mb-6 sm:mb-8">
                      <p className="font-serif text-sm sm:text-base text-foreground italic">
                        &quot;{program.highlight}&quot;
                      </p>
                    </div>

                    <Button size="lg" variant="outline" className="w-full sm:w-auto self-start" asChild>
                      <Link href="#agendar">
                        Agendar aula experimental
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
