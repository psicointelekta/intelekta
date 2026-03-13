"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Baby, GraduationCap, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ageStages = [
  {
    phase: "Crianças",
    description: "Estimulamos atenção, memória e raciocínio de forma lúdica e acolhedora.",
    icon: Baby,
  },
  {
    phase: "Adolescentes",
    description: "Foco em habilidades socioemocionais, organização e autonomia nos estudos.",
    icon: GraduationCap,
  },
  {
    phase: "Adultos",
    description: "Reforçamos a produtividade, resolução de problemas e tomada de decisão.",
    icon: Briefcase,
  },
  {
    phase: "Idosos",
    description: "Prevenção do declínio cognitivo com foco em autonomia e qualidade de vida.",
    icon: Heart,
  },
]

const pillars = [
  {
    id: "neuroeducacao",
    title: "Neuroeducação",
    description: "O alicerce científico de cada prática. Através das evidências da neuroplasticidade, transformamos a maneira como o conhecimento é processado e consolidado em qualquer idade.",
    image: "/images/program-infantil.png",
    details: ["Base Científica", "Potencial Pleno"],
    align: "left",
  },
  {
    id: "raciocinio-estrategia",
    title: "Raciocínio e Estratégia",
    description: "Onde a lógica encontra o propósito. Desenvolvemos o pensamento crítico e a capacidade de resolução de problemas através de desafios que estimulam a mente de forma estratégica.",
    image: "/images/activity-children-chess.png",
    details: ["Lógica Aplicada", "Foco Estratégico"],
    align: "right",
  },
  {
    id: "equilibrio-expressao",
    title: "Equilíbrio e Expressão",
    description: "A integração essencial entre mente e emoção. Criamos ferramentas para a autorregulação e autoconhecimento através de formas sensíveis de comunicação e ritmo.",
    image: "/images/program-adolescente.png",
    details: ["Inteligência Emocional", "Bem-estar"],
    align: "left",
  },
  {
    id: "apoio-pedagogico",
    title: "Apoio Pedagógico",
    description: "O suporte que respeita o tempo individual. Facilitamos a jornada acadêmica com estratégias personalizadas que fortalecem a confiança e removem barreiras de aprendizagem.",
    image: "/images/program-adulto.png",
    details: ["Acompanhamento Focado", "Confiança"],
    align: "right",
  },
  {
    id: "vinculos-socializacao",
    title: "Vínculos e Socialização",
    description: "A inteligência voltada ao convívio. Potencializamos habilidades sociais e empáticas para construir relações saudáveis e fortalecer o senso de comunidade.",
    image: "/images/activity-seniors.png",
    details: ["Conexão Humana", "Longevidade Ativa"],
    align: "left",
  },
]

export function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="programas" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-background" ref={ref}>
      {/* Subtle background context */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="h-px w-10 bg-primary/30" />
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
              Programas
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                Cada fase exige um <span className="italic text-primary">cuidado especial.</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                Sabemos que as necessidades mudam com o tempo. Por isso, nossas atividades são 
                planejadas de forma personalizada para cada idade, respeitando o ritmo e os desafios individuais.
              </p>
            </motion.div>

            {/* Compact Age Grid - Integration of user content */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {ageStages.map((stage, idx) => (
                <motion.div
                  key={stage.phase}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="p-4 rounded-xl bg-muted/30 border border-primary/5 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stage.icon className="h-4 w-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{stage.phase}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Pillars with Refined Copy */}
        <div className="mt-20 lg:mt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Pilares de Estimulação</span>
            <div className="h-px flex-grow bg-gradient-to-r from-primary/10 to-transparent" />
          </motion.div>

          <div className="space-y-16 lg:space-y-20">
            {pillars.map((pillar, index) => {
              const isRight = pillar.align === "right"
              const isLast = index === pillars.length - 1
              
              return (
                <div key={pillar.id} className="relative">
                  <div className={`flex flex-col ${isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16 pb-16 lg:pb-20`}>
                    {/* Image part */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="w-full lg:w-2/5 relative group"
                    >
                      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl border border-primary/5">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-neutral-900/5" />
                      </div>
                    </motion.div>

                    {/* Content part */}
                    <motion.div 
                      initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-full lg:w-3/5 lg:px-4"
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-5 leading-tight text-foreground">
                        {pillar.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {pillar.details.map((detail) => (
                          <span key={detail} className="text-[10px] font-bold uppercase tracking-wider text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                            {detail}
                          </span>
                        ))}
                      </div>

                      <Link 
                        href="#agendar" 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all group"
                      >
                        Saber mais
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>
                  </div>

                  {!isLast && (
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
