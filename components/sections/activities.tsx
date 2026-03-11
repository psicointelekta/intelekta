"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Puzzle, Crown, BookOpen, Brain, Sparkles } from "lucide-react"

const activities = [
    {
        icon: Crown,
        title: "Xadrez Educativo",
        description: "Desenvolve raciocínio estratégico, concentração, paciência e tomada de decisão em todas as idades.",
        image: "/images/activity-children-chess.png",
        age: "Todas as idades",
    },
    {
        icon: Puzzle,
        title: "Cubo Mágico",
        description: "Estimula memória sequencial, lógica espacial e persistência de forma lúdica e desafiadora.",
        image: "/images/activity-children-rubiks.png",
        age: "Crianças e Adolescentes",
    },
    {
        icon: BookOpen,
        title: "Autonomia nos Estudos",
        description: "Técnicas para organização, planejamento e autogestão do aprendizado com independência.",
        image: "/images/activity-teens-study.png",
        age: "Adolescentes e Adultos",
    },
    {
        icon: Brain,
        title: "Estimulação Cognitiva",
        description: "Atividades personalizadas para fortalecer memória, atenção e funções executivas.",
        image: "/images/activity-seniors.png",
        age: "Adultos e Seniores",
    },
]

export function Activities() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <section id="atividades" className="py-12 sm:py-16 lg:py-24 bg-card" ref={ref}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-3"
                    >
                        Nossas Atividades
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-serif text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-tight text-balance"
                    >
                        Na Intelekta, o brincar é intencional
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty"
                    >
                        Cada jogo, movimento e desafio é pensado para estimular atenção, memória,
                        raciocínio, linguagem e habilidades socioemocionais, respeitando o ritmo
                        e a fase de cada pessoa.
                    </motion.p>
                </div>

                {/* Philosophy highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="max-w-4xl mx-auto mb-10 lg:mb-16"
                >
                    <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/8 to-secondary/5 border border-primary/15">
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                        <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
                            A <strong className="text-primary">neuroeducação</strong> transforma a experiência do aprender em algo
                            leve, prazeroso e profundamente eficaz. É desenvolvimento cognitivo e emocional
                            acontecendo de forma natural, significativa e com acompanhamento profissional.
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-primary font-medium">
                            Porque aprender pode — e deve — fazer sentido desde cedo. 💚
                        </p>
                    </div>
                </motion.div>

                {/* Activities grid */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="group"
                        >
                            <div className="relative rounded-2xl sm:rounded-3xl bg-background border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 h-full">
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                                    {/* Age badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                                            {activity.age}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        </div>
                                        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-foreground">
                                            {activity.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
