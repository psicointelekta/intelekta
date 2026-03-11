"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const articles = [
  {
    id: 1,
    title: "Desenvolvimento emocional e cognitivo na adolescência",
    excerpt: "Como apoiar jovens durante as transformações cerebrais e emocionais dessa fase crucial da vida.",
    category: "Adolescência",
    readTime: "5 min",
    author: "Equipe Intelekta",
    slug: "desenvolvimento-adolescencia",
  },
  {
    id: 2,
    title: "Estimulação cognitiva para o público sênior",
    excerpt: "Estratégias baseadas em neurociência para manter a mente ativa e saudável ao longo dos anos.",
    category: "Sênior",
    readTime: "6 min",
    author: "Equipe Intelekta",
    slug: "estimulacao-senior",
  },
  {
    id: 3,
    title: "Como as emoções influenciam a aprendizagem",
    excerpt: "Entenda a relação entre emoções e memória, e como criar ambientes favoráveis ao aprendizado.",
    category: "Infantil",
    readTime: "4 min",
    author: "Equipe Intelekta",
    slug: "emocoes-aprendizagem",
  },
]

export function Articles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="artigos" className="py-24 lg:py-32 bg-card" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
            >
              Conhecimento
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
            >
              Artigos e insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Conteúdo educativo sobre desenvolvimento cognitivo e emocional.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" asChild>
              <Link href="#artigos">
                Ver todos os artigos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Link href={`#${article.slug}`} className="block">
                <div className="relative rounded-2xl bg-background border border-border overflow-hidden hover:border-primary/30 transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <span className="font-serif text-2xl text-primary font-bold">
                          {article.category[0]}
                        </span>
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium text-foreground">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
