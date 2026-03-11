"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Para qual faixa etária a Intelekta atende?",
    answer: "Atendemos pessoas a partir dos 5 anos de idade, com programas específicos para crianças (5-10 anos), adolescentes (11-17 anos), adultos (18-59 anos) e seniores (60+ anos). Cada programa é adaptado às necessidades e características de cada fase da vida.",
  },
  {
    question: "Como funciona a metodologia da Intelekta?",
    answer: "Nossa metodologia é fundamentada em três pilares: neurociência, psicologia cognitiva e inteligência emocional. Utilizamos atividades práticas e personalizadas que estimulam o desenvolvimento de novas habilidades cognitivas e emocionais, baseadas em evidências científicas sobre neuroplasticidade.",
  },
  {
    question: "Qual a diferença entre a Intelekta e uma escola ou terapia?",
    answer: "A Intelekta é um centro de educação complementar. Não substituímos a escola, que foca em conteúdo acadêmico, nem a terapia, que trata questões clínicas. Nosso foco é o desenvolvimento de habilidades cognitivas e socioemocionais que potencializam o desempenho em todas as áreas da vida.",
  },
  {
    question: "Quanto tempo dura cada sessão?",
    answer: "As sessões têm duração média de 50 minutos a 1 hora, dependendo do programa e da faixa etária. A frequência recomendada é de uma a duas vezes por semana, mas isso pode ser ajustado de acordo com os objetivos individuais de cada pessoa.",
  },
  {
    question: "Como é feita a avaliação inicial?",
    answer: "Realizamos uma avaliação inicial completa que mapeia habilidades cognitivas, perfil emocional e objetivos pessoais. A partir dessa análise, elaboramos um plano de desenvolvimento personalizado que orienta todo o trabalho ao longo do programa.",
  },
  {
    question: "Posso fazer uma aula experimental?",
    answer: "Sim! Oferecemos uma aula experimental gratuita para que você ou seu filho conheça nosso espaço, metodologia e equipe. É uma oportunidade de vivenciar nossa abordagem antes de tomar qualquer decisão. Entre em contato para agendar.",
  },
  {
    question: "Onde fica a Intelekta?",
    answer: "Estamos localizados na Rua Afonso Pena, 403, no bairro Praia da Costa, em Vila Velha, ES. Nosso espaço foi cuidadosamente planejado para proporcionar um ambiente calmo, acolhedor e propício ao desenvolvimento.",
  },
]

export function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-dark-section" ref={ref}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-secondary uppercase tracking-wider mb-4"
          >
            Perguntas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-dark-section-foreground leading-tight text-balance"
          >
            Tire suas dúvidas
          </motion.h2>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-2xl px-5 sm:px-6 bg-white/5 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-dark-section-foreground hover:text-primary py-5 sm:py-6 text-sm sm:text-base [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-dark-section-foreground/70 leading-relaxed pb-5 sm:pb-6 text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <p className="text-dark-section-foreground/70">
            Ainda tem dúvidas?{" "}
            <a href="#contato" className="text-primary font-medium hover:underline">
              Entre em contato conosco
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
