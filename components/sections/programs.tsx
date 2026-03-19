"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ageStages = [
  {
    phase: "Crianças",
    age: "5–12 anos",
    description: "Estimulamos atenção, memória, linguagem e coordenação de forma lúdica e acolhedora.",
  },
  {
    phase: "Adolescentes",
    age: "13–17 anos",
    description: "Foco em funções executivas, controle emocional e autonomia nos estudos.",
  },
  {
    phase: "Adultos",
    age: "18–59 anos",
    description: "Produtividade, gestão do estresse, resolução de problemas e tomada de decisão.",
  },
  {
    phase: "Idosos",
    age: "60+ anos",
    description: "Prevenção do declínio cognitivo com foco em memória, autonomia e qualidade de vida.",
  },
]

const programs = [
  {
    id: "neuroeducacao",
    number: "01",
    title: "Neuroeducação",
    subtitle: "Programa multidisciplinar 100% lúdico",
    description:
      "Desenvolve, estimula e reabilita a mente em todas as idades através de jogos, brincadeiras, oficinas criativas e atividades sensório-motoras. Fundamentado em neuroplasticidade.",
    tags: ["Todas as idades", "Lúdico", "Neuroplasticidade"],
    image: "/images/program-infantil.webp",
  },
  {
    id: "xadrez",
    number: "02",
    title: "Xadrez Pedagógico",
    subtitle: "Estratégia que transforma o pensar",
    description:
      "Programa pedagógico que utiliza o xadrez para desenvolver atenção, memória, raciocínio lógico, planejamento e autorregulação emocional.",
    tags: ["Raciocínio lógico", "Estratégia", "Foco"],
    image: "/images/activity-children-chess.webp",
  },
  {
    id: "musicoterapia",
    number: "03",
    title: "Musicoterapia",
    subtitle: "A música como ferramenta terapêutica",
    description:
      "Utiliza instrumentos, canto, ritmo, escuta guiada e movimento corporal para desenvolver capacidades cognitivas e socioemocionais. Inclui programa especial para mães e bebês.",
    tags: ["Expressão", "Bem-estar", "Mães e bebês"],
    image: "/images/program-adolescente.webp",
  },
  {
    id: "cubo-magico",
    number: "04",
    title: "Cubo Mágico",
    subtitle: "Desafio que expande a mente",
    description:
      "Trabalha atenção, foco, raciocínio lógico e espacial, planejamento, memória e persistência através da resolução do cubo mágico.",
    tags: ["Raciocínio espacial", "Persistência", "Memória"],
    image: "/images/activity-children-rubiks.webp",
  },
  {
    id: "reforco-escolar",
    number: "05",
    title: "Reforço Escolar",
    subtitle: "Apoio personalizado que respeita o ritmo",
    description:
      "Programa lúdico voltado da Educação Infantil ao Ensino Médio, com foco no desenvolvimento acadêmico e socioemocional através de jogos educativos e estratégias pedagógicas.",
    tags: ["Infantil ao Médio", "Personalizado", "Acadêmico"],
    image: "/images/activity-teens-study.webp",
  },
  {
    id: "neurole",
    number: "06",
    title: "Neurolê",
    subtitle: "Alfabetização lúdica e sensorial",
    description:
      "Programa de alfabetização inclusiva para crianças atípicas, utilizando abordagem lúdica e sensorial para desenvolver habilidades de leitura e escrita de forma acolhedora.",
    tags: ["Inclusivo", "Crianças atípicas", "Sensorial"],
    image: "/images/program-infantil.webp",
  },
  {
    id: "psicopedagogia",
    number: "07",
    title: "Psicopedagogia",
    subtitle: "Acompanhamento especializado",
    description:
      "Atendimento especializado em dificuldades de aprendizagem, com acompanhamento psicopedagógico personalizado que identifica barreiras e constrói caminhos para o desenvolvimento.",
    tags: ["Especializado", "Dificuldades de aprendizagem", "Individual"],
    image: "/images/activity-adults.webp",
  },
] as const

type Program = (typeof programs)[number]

function ProgramRow({
  program,
  index,
  isInView,
}: {
  program: Program
  index: number
  isInView: boolean
}) {
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className={`group grid items-center gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-[1fr_1fr] ${
        isReversed ? "sm:[direction:rtl]" : ""
      }`}
    >
      {/* Image */}
      <div className="sm:[direction:ltr] relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) calc(100vw - 32px), 45vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-3 select-none font-serif text-[52px] font-bold leading-none text-white/[0.08]"
        >
          {program.number}
        </span>
      </div>

      {/* Text */}
      <div className="sm:[direction:ltr]">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/50">
          {program.subtitle}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {program.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/10 bg-primary/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button className="mt-4 h-11 px-6 text-sm group/btn" asChild>
          <Link href="#contato">
            Saiba mais
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

export function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="programas"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
      ref={ref}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-to-bl from-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3"
          >
            <div className="decorative-line" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Programas
            </span>
          </motion.div>

          <div className="grid items-end gap-8 lg:grid-cols-5 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-3"
            >
              <h2 className="font-serif text-editorial-lg text-balance text-foreground">
                Cada pessoa merece um{" "}
                <span className="text-primary">cuidado especial.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Idealizada por psicólogos e psicopedagogas, a Intelekta oferece 7
                programas especializados que promovem o aprendizado de forma lúdica,
                envolvente e significativa — garantindo uma experiência única para
                cada participante.
              </p>
            </motion.div>

            {/* Age stage cards */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              {ageStages.map((stage, idx) => (
                <motion.div
                  key={stage.phase}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="group rounded-xl border border-primary/5 bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {stage.phase}
                    </span>
                  </div>
                  <span className="mb-1 block text-[10px] font-medium text-primary/70">
                    {stage.age}
                  </span>
                  <p className="text-[10px] leading-tight text-muted-foreground sm:text-xs">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Editorial Index Strip ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-primary/[0.08] py-4 lg:mb-14"
        >
          {programs.map((program, i) => (
            <span
              key={program.id}
              className="flex items-baseline gap-2 text-[11px] text-muted-foreground/50"
            >
              <span className="font-mono text-[9px] text-primary/35">
                {program.number}
              </span>
              <span className="font-medium tracking-wide">{program.title}</span>
              {i < programs.length - 1 && (
                <span className="hidden text-primary/20 sm:inline">·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* ── Programs — alternating rows ─────────────────────────── */}
        <div className="space-y-8 sm:space-y-10">
          {programs.map((program, index) => (
            <ProgramRow
              key={program.id}
              program={program}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center lg:mt-16"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            Não sabe qual programa é ideal? Nossa equipe ajuda você a encontrar o
            melhor caminho.
          </p>
          <Button size="lg" asChild>
            <Link href="#contato">
              Fale com a nossa equipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}