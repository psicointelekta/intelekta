"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
    {
        title: "Jogos estratégicos",
        description: "Xadrez, cubo mágico e desafios que estimulam o raciocínio de forma natural e divertida.",
        image: "/images/activity-children-chess.png",
        featured: true,
    },
    {
        title: "Oficinas criativas",
        description: "Atividades práticas que desenvolvem memória, atenção e habilidades motoras.",
        image: "/images/activity-children-rubiks.png",
    },
    {
        title: "Música e movimento",
        description: "Instrumentos, ritmo e expressão corporal como ferramenta de desenvolvimento.",
        image: "/images/activity-teens-study.png",
    },
    {
        title: "Momentos de conexão",
        description: "Atividades em grupo que fortalecem vínculos sociais e habilidades emocionais.",
        image: "/images/activity-seniors.png",
    },
]

export function Activities() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const featured = highlights[0]
    const others = highlights.slice(1)

    return (
        <section id="atividades" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden" ref={ref}>
            {/* Dynamic background */}
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-primary/[0.03] blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/[0.04] blur-[90px]" />
            {/* Subtle cross pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.8%,var(--primary)_50%,transparent_50.2%)] bg-[length:64px_100%] opacity-[0.015]" />

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
                            Na Prática
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="font-serif text-editorial-lg text-foreground text-balance mb-5"
                    >
                        Como o desenvolvimento{" "}
                        <span className="text-primary">acontece</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                    >
                        Cada sessão é planejada com intenção. Jogos, música, desafios e dinâmicas
                        se combinam para estimular cognição e emoções — sempre respeitando
                        o ritmo de cada pessoa.
                    </motion.p>
                </div>

                {/* Magazine layout — 1 featured + 3 beside */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid lg:grid-cols-5 gap-4 sm:gap-5"
                >
                    {/* Featured — large */}
                    <div className="lg:col-span-3 group">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-full min-h-[300px] sm:min-h-[400px]">
                            <Image
                                src={featured.image}
                                alt={`${featured.title} — momentos na Intelekta`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 img-warm-treatment"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2">
                                    {featured.title}
                                </h3>
                                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
                                    {featured.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Others — stacked right */}
                    <div className="lg:col-span-2 grid gap-4 sm:gap-5">
                        {others.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                                className="group"
                            >
                                <div className="relative rounded-2xl overflow-hidden h-full min-h-[140px] sm:min-h-[160px]">
                                    <Image
                                        src={item.image}
                                        alt={`${item.title} — momentos na Intelekta`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 img-warm-treatment"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                        <h3 className="font-serif text-base sm:text-lg font-semibold text-white mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Single CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-10 lg:mt-14 text-center"
                >
                    <Button size="lg" asChild>
                        <Link href="#agendar">
                            Venha conhecer nosso espaço
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
