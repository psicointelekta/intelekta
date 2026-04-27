/**
 * FAQ section — Radix Accordion with a sticky CTA sidebar
 * (schedule free class + WhatsApp quick action).
 */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Para qual faixa etária a Intelekta atende?",
    answer: "Atendemos pessoas a partir dos 5 anos de idade em Vila Velha, com programas específicos para crianças (5-12 anos), adolescentes (13-17 anos), adultos (18-63 anos) e idosos (64+ anos). Cada programa é adaptado para desenvolvimento infantil, acadêmico ou estimulação cognitiva sênior.",
  },
  {
    question: "A Intelekta atende autismo ou TDAH em Vila Velha?",
    answer: "Sim! Somos especialistas em programas de desenvolvimento para crianças atípicas. Oferecemos suporte especializado para TDAH, autismo (TEA), déficit de atenção e outras demandas do neurodesenvolvimento com foco em autonomia e funções executivas.",
  },
  {
    question: "Como funciona a avaliação neuropsicológica infantil?",
    answer: "Nossa avaliação neuropsicológica em Vila Velha mapeia minuciosamente o perfil cognitivo, atencional e emocional. É fundamental para identificar causas de dificuldades escolares, suspeitas de TDAH ou atrasos no desenvolvimento, gerando um plano de intervenção preciso.",
  },
  {
    question: "Vocês ajudam com dificuldades de aprendizagem e rendimento escolar?",
    answer: "Com certeza. Nossos programas de Psicopedagogia e Reforço Escolar são desenhados para crianças com baixo desempenho acadêmico, falta de concentração ou desmotivação, unindo estratégias pedagógicas com psicologia cognitiva.",
  },
  {
    question: "Como funciona a metodologia da Intelekta?",
    answer: "Nossa metodologia é fundamentada em neurociência, psicologia cognitiva e inteligência emocional. Utilizamos atividades práticas baseadas em neuroplasticidade para fortalecer memória, atenção e regulação emocional em todas as idades.",
  },
  {
    question: "Qual a diferença entre a Intelekta e uma clínica de psicologia comum?",
    answer: "Diferente de uma clínica de terapia tradicional, a Intelekta é um centro de educação complementar e treinamento cognitivo. Focamos no desenvolvimento prático de habilidades, sendo o complemento ideal para o acompanhamento escolar e clínico.",
  },
  {
    question: "Como agendar uma aula experimental gratuita?",
    answer: "Você pode agendar pelo nosso WhatsApp. Oferecemos esse primeiro contato gratuito para que você conheça nosso espaço na Praia da Costa e como nossa metodologia pode ajudar no desenvolvimento do seu filho ou na sua própria produtividade.",
  },
]

export function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 -left-20 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Perguntas Frequentes
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-editorial-lg text-foreground text-balance leading-[1.04]"
          >
            Tire suas <span className="text-primary">dúvidas</span>
          </motion.h2>
        </div>

        {/* Two column layout: FAQ + Sticky CTA */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="lg:col-span-2"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl sm:rounded-2xl px-5 sm:px-6 bg-card data-[state=open]:border-primary/20 data-[state=open]:shadow-sm transition-all duration-200"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 sm:py-6 text-sm sm:text-base [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 sm:pb-6 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Sticky CTA sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-28 space-y-5">
              {/* Primary CTA card */}
              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-accent p-6 sm:p-8 text-primary-foreground relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10">
                  <Calendar className="w-8 h-8 mb-4 opacity-80" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-2">
                    Aula experimental gratuita
                  </h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                    Conheça nosso espaço, metodologia e equipe sem compromisso.
                    Agende agora e comece a jornada de desenvolvimento.
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
                    asChild
                  >
                    <Link href="#contato">
                      Agendar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* WhatsApp quick action */}
              <div className="rounded-2xl border border-border p-5 sm:p-6 bg-card">
                <p className="text-sm text-muted-foreground mb-4">
                  Prefere tirar dúvidas rapidamente?
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="https://wa.me/5527988773890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar pelo WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
