"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin, Instagram, Mail } from "lucide-react"

const founders = [
  {
    name: "Suzidarle Pereira",
    role: "Psicóloga e Neuropsicóloga",
    bio: "Especializada no atendimento de crianças a partir de 6 anos e adolescentes.",
    expertise: ["Avaliação Neuropsicológica", "Terapia Psicológica", "Avaliações para Transtorno de Aprendizagem"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suzidarle-tA111Mhxjd1OlV9uu7BZIgMsy7neaV.png",
  },
  {
    name: "Fabiana Lima",
    role: "Psicopedagoga",
    bio: "Palestrante e professora há 12 anos dedicada ao desenvolvimento integral de crianças e adolescentes, unindo aprendizagem, ludicidade e acolhimento.",
    expertise: ["Psicopedagogia", "Ludopedagogia", "Desenho Infantil", "Ludoterapia"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fabiana-ti3j0K9JyGqSpVQ9yv1bQvKXI6C1N1.png",
  },
  {
    name: "Flávia Luz",
    role: "Consultora Técnica da Intelekta",
    bio: "Psicóloga clínica há 24 anos, Mestre em Desenvolvimento Humano, palestrante em saúde mental e coordenadora do Projeto Guardiões da Infância.",
    expertise: ["Psicologia Clínica", "Desenvolvimento Humano", "Consultoria Técnica"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flavia-3Xl8S22arctRDaphFFMsHTBXSxxstf.png",
  },
]

export function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="equipe" className="py-12 sm:py-16 lg:py-24 bg-dark-section" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-secondary uppercase tracking-wider mb-4"
          >
            Nossa Equipe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-dark-section-foreground leading-tight text-balance"
          >
            Profissionais dedicadas ao seu desenvolvimento
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-dark-section-foreground/70 leading-relaxed"
          >
            Combinamos expertise técnica com acolhimento humano para criar
            experiências transformadoras.
          </motion.p>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-3xl bg-card/5 border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-section via-dark-section/20 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-1">
                    {founder.name}
                  </h3>
                  <span className="text-primary font-medium text-sm sm:text-base">
                    {founder.role}
                  </span>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-3">
                    {founder.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="mt-5 flex gap-2">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com/intelektamente"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#contato"
                      className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
