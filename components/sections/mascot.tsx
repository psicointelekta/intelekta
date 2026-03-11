"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Sparkles, Heart, Lightbulb, Scale } from "lucide-react"

const qualities = [
  {
    icon: Sparkles,
    title: "Curiosidade",
    description: "Assim como o esquilo que explora cada canto da floresta, incentivamos a busca constante por conhecimento.",
  },
  {
    icon: Scale,
    title: "Equilíbrio",
    description: "Nino nos lembra que razão e emoção devem caminhar juntas para uma vida plena e significativa.",
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Representa o ambiente seguro e afetuoso que criamos para cada pessoa que confia em nós.",
  },
  {
    icon: Lightbulb,
    title: "Aprendizado",
    description: "Simboliza a alegria de descobrir, de superar desafios e de crescer a cada dia.",
  },
]

export function Mascot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Nino Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Background decoration */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 blur-3xl scale-75" />
              
              {/* Nino Image */}
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nino-5Q72SWZ4deOsw8GPnkTMefvAvv46aQ.png"
                  alt="Nino - Mascote da Intelekta, um esquilo simpático vestindo uma camiseta verde com o logo da árvore"
                  width={500}
                  height={600}
                  className="relative z-10 w-full h-auto drop-shadow-2xl"
                  priority
                />
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card shadow-lg flex items-center justify-center z-20"
                >
                  <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-1/4 left-0 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-card shadow-lg flex items-center justify-center z-20"
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/3 left-4 sm:left-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-card shadow-lg flex items-center justify-center z-20"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                </motion.div>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-16 left-8 w-3 h-3 rounded-full bg-primary/30" />
              <div className="absolute bottom-20 right-4 w-4 h-4 rounded-full bg-secondary/40" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Conheça o Nino
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
              Nosso mascote, nossa filosofia
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Nino é um esquilo curioso que representa a essência da Intelekta: 
              a busca pelo conhecimento aliada ao equilíbrio emocional. Ele nos 
              lembra que aprender pode ser uma jornada prazerosa quando cultivamos 
              curiosidade e cuidamos de nossas emoções.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <quality.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {quality.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {quality.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
