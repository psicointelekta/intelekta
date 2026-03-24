/**
 * Mobile home page — Server Component (zero client JS for the main shell).
 *
 * Design decisions:
 * - All data (programs, team, faqs, testimonials) is defined inline
 *   instead of shared with desktop to enable independent optimization.
 * - CSS-only hero word rotator (no framer-motion) to minimise JS.
 * - Interactive widgets (carousel, FAQ, form) are deferred via
 *   DeferredMobile* wrappers (dynamic import, ssr:false).
 * - Fixed bottom CTA bar (Ligar + Agendar) with safe-area padding.
 */
import Image from "next/image"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartHandshake,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react"

import {
  DeferredMobileContactForm,
  DeferredMobileFaq,
  DeferredMobileNewsCarousel,
  DeferredMobileTestimonialsCarousel,
} from "@/components/pages/mobile-deferred-widgets"
import { MobileHomeHeader } from "@/components/pages/mobile-home-header"
import { ProgramCtaLink } from "@/components/program-cta-link"
import { ProgramAwareWhatsappLink } from "@/components/program-aware-whatsapp-link"
import { ProgramDiscovery } from "@/components/sections/program-discovery"

export interface Announcement {
  date: string
  category: string
  title: string
  description: string
  imageUrl?: string
  linkUrl?: string
}
const heroCards = [
  { src: "/images/hero-mobile-1.webp", alt: "Criança em atividade lúdica de neuroeducação" },
  { src: "/images/hero-mobile-2.webp", alt: "Adolescente em sessão de desenvolvimento cognitivo" },
  { src: "/images/hero-mobile-3.webp", alt: "Idosa sorrindo durante atividade terapêutica" },
] as const

const values = [
  {
    icon: HeartHandshake,
    title: "Olhar humano",
    text: "Cada família é ouvida com atenção. Nossos profissionais criam vínculos reais com cada participante.",
  },
  {
    icon: HeartHandshake,
    title: "Acolhimento genuíno",
    text: "Um ambiente seguro onde cada pessoa se sente valorizada, respeitada e cuidada em sua individualidade.",
  },
  {
    icon: Brain,
    title: "Ciência e sensibilidade",
    text: "Neurociência e psicologia cognitiva aplicadas com empatia — porque dados sem afeto não transformam.",
  },
  {
    icon: Users,
    title: "Personalização real",
    text: "Programas adaptados às necessidades, ritmo e objetivos únicos de cada pessoa.",
  },
] as const

const keywords = [
  "Neuroplasticidade",
  "Acolhimento",
  "Aprendizagem",
  "Inclusão",
  "Emoção",
  "Cognição",
  "Memória",
  "Autonomia",
  "Confiança",
  "Desenvolvimento",
] as const

const pillars = [
  {
    icon: Brain,
    title: "Neurociência",
    description:
      "Aplicamos avanços sobre plasticidade cerebral e aprendizagem para criar experiências que realmente transformam.",
    roman: "I",
  },
  {
    icon: Lightbulb,
    title: "Psicologia Cognitiva",
    description:
      "Técnicas comprovadas para desenvolver memória, atenção, raciocínio e funções executivas essenciais.",
    roman: "II",
  },
  {
    icon: Users,
    title: "Inteligência Emocional",
    description:
      "Autoconhecimento, empatia e autorregulação emocional integrados a cada atividade prática.",
    roman: "III",
  },
] as const

type MethodologyStep = {
  number: string
  title: string
  desc: string
  badge?: string
}

const steps: ReadonlyArray<MethodologyStep> = [
  {
    number: "01",
    title: "Avaliação",
    desc: "Mapeamento completo de necessidades, potenciais e objetivos.",
    badge: "Gratuita",
  },
  {
    number: "02",
    title: "Planejamento",
    desc: "Programa personalizado com objetivos claros e prioridades reais.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    desc: "Atividades práticas com acompanhamento próximo e ajustes contínuos.",
  },
  {
    number: "04",
    title: "Evolução",
    desc: "Medição de resultados e refinamento constante do processo.",
  },
]

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
] as const

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

const featuredProgramIds = new Set<string>(["neuroeducacao", "reforco-escolar", "xadrez", "musicoterapia"])
const featuredPrograms = programs.filter((program) => featuredProgramIds.has(program.id))
const additionalPrograms = programs.filter((program) => !featuredProgramIds.has(program.id))

const team = [
  {
    name: "Suzidarle Pereira",
    role: "Psicóloga e Neuropsicóloga",
    bio: "Especializada no atendimento de crianças a partir de 6 anos e adolescentes, com expertise em avaliação neuropsicológica e terapia psicológica.",
    expertise: ["Avaliação Neuropsicológica", "Terapia Psicológica", "Transtornos de Aprendizagem"],
    image: "/images/suzidarle_pereira_retrato.webp",
  },
  {
    name: "Fabiana Lima",
    role: "Psicopedagoga",
    bio: "Palestrante e professora há 12 anos dedicada ao desenvolvimento integral de crianças e adolescentes, unindo aprendizagem, ludicidade e acolhimento.",
    expertise: ["Psicopedagogia", "Ludopedagogia", "Ludoterapia"],
    image: "/images/fabiana_lima_retrato.webp",
  },
  {
    name: "Flávia Luz Vaz",
    role: "Consultora Técnica",
    bio: "Psicóloga clínica há 24 anos, Mestre em Desenvolvimento Humano, palestrante em saúde mental e coordenadora do Projeto Guardiões da Infância.",
    expertise: ["Psicologia Clínica", "Desenvolvimento Humano", "Consultoria"],
    image: "/images/flavia_luz_retrato.webp",
  },
] as const

const testimonials = [
  {
    content:
      "A transformação que tive foi extraordinária. Em poucos meses, desenvolvi concentração e gestão emocional que impactaram positivamente minha vida.",
    author: "João Gabriel Rosa",
    role: "Aluno adulto",
  },
  {
    content:
      "A abordagem lúdica faz toda a diferença. Me ajudou a entender melhor como minha mente funciona e a criar estratégias práticas para o dia a dia.",
    author: "Guto",
    role: "Aluno adolescente",
  },
  {
    content:
      "Eu adoro as aulas e sempre volto cheia de energia. Percebo uma evolução enorme na forma como lido com as emoções e me organizo para estudar.",
    author: "Aninha",
    role: "Aluna do infantil",
  },
  {
    content:
      "Como pai, ver meus filhos se desenvolvendo com acompanhamento tão atencioso e personalizado me dá uma tranquilidade enorme.",
    author: "Gildásio",
    role: "Pai de aluno",
  },
] as const

const faqs = [
  {
    question: "Para qual faixa etária a Intelekta atende?",
    answer:
      "Atendemos pessoas a partir dos 5 anos de idade, com programas específicos para crianças (5-12 anos), adolescentes (13-17 anos), adultos (18-59 anos) e idosos (60+ anos). Cada programa é adaptado às necessidades e características de cada fase da vida.",
  },
  {
    question: "Como funciona a metodologia da Intelekta?",
    answer:
      "Nossa metodologia é fundamentada em três pilares: neurociência, psicologia cognitiva e inteligência emocional. Utilizamos atividades práticas e personalizadas que estimulam o desenvolvimento de novas habilidades cognitivas e emocionais, baseadas em evidências científicas sobre neuroplasticidade.",
  },
  {
    question: "Qual a diferença entre a Intelekta e uma escola ou terapia?",
    answer:
      "A Intelekta é um centro de educação complementar. Não substituímos a escola, que foca em conteúdo acadêmico, nem a terapia, que trata questões clínicas. Nosso foco é o desenvolvimento de habilidades cognitivas e socioemocionais que potencializam o desempenho em todas as áreas da vida.",
  },
  {
    question: "Quanto tempo dura cada sessão?",
    answer:
      "As sessões têm duração de 1 hora e 30 minutos, com um encontro semanal. A frequência pode ser ajustada de acordo com os objetivos individuais de cada pessoa.",
  },
  {
    question: "Como é feita a avaliação inicial?",
    answer:
      "Realizamos uma avaliação inicial completa que mapeia habilidades cognitivas, perfil emocional e objetivos pessoais. A partir dessa análise, elaboramos um plano de desenvolvimento personalizado que orienta todo o trabalho ao longo do programa.",
  },
  {
    question: "Posso fazer uma aula experimental?",
    answer:
      "Sim! Oferecemos uma aula experimental gratuita para que você ou seu filho conheça nosso espaço, metodologia e equipe. É uma oportunidade de vivenciar nossa abordagem antes de tomar qualquer decisão. Entre em contato para agendar.",
  },
  {
    question: "Onde fica a Intelekta?",
    answer:
      "Estamos localizados na Rua Afonso Pena, 403, no bairro Praia da Costa, em Vila Velha, ES. Nosso espaço foi cuidadosamente planejado para proporcionar um ambiente calmo, acolhedor e propício ao desenvolvimento.",
  },
] as const

const mobileNavigation = [
  { name: "Programas", href: "#programas" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Sobre", href: "#sobre" },
  { name: "Equipe", href: "#equipe" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
] as const

/**
 * CSS-only word rotator — cycles through "mentes", "emoções", "futuros".
 *
 * Animation math (8.4s total, 3 words):
 * - Each word occupies 33% of the cycle (2.8s)
 * - 0→4%: fade-in + translateY(8px→0)
 * - 4→29%: visible hold
 * - 29→33%: fade-out + translateY(0→-6px)
 * - 33→100%: hidden
 *
 * Negative animation-delay offsets stagger the 3 spans so exactly
 * one word is visible at any given time (0s, -5.6s, -2.8s).
 *
 * The invisible "emoções" span (longest word) reserves inline-grid
 * width to prevent layout shift during cycling.
 */
function MobileHeroWordRotator() {
  return (
    <span className="mobile-hero-word-rotator relative inline-grid align-top text-primary" role="text" aria-label="mentes, emoções e futuros">
      <span
        className="col-start-1 row-start-1"
        aria-hidden
        style={{ visibility: "hidden", pointerEvents: "none" }}
      >
        emoções
      </span>
      <span className="mobile-hero-word-cycle col-start-1 row-start-1" style={{ animationDelay: "0s" }} aria-hidden>
        mentes
      </span>
      <span className="mobile-hero-word-cycle col-start-1 row-start-1" style={{ animationDelay: "-5.6s" }} aria-hidden>
        emoções
      </span>
      <span className="mobile-hero-word-cycle col-start-1 row-start-1" style={{ animationDelay: "-2.8s" }} aria-hidden>
        futuros
      </span>
      <span className="absolute -bottom-1.5 left-0 h-[3px] w-full origin-left rounded-full bg-primary/30" />
    </span>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  dark?: boolean
}) {
  const eyebrowColor = dark ? "text-secondary" : "text-primary"
  const bodyColor = dark ? "text-dark-section-foreground/70" : "text-muted-foreground"
  const titleColor = dark ? "text-dark-section-foreground" : "text-foreground"

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="decorative-line" />
        <span className={`text-xs font-medium uppercase tracking-[0.18em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      </div>
      <h2 className={`font-serif text-editorial-lg text-balance font-extrabold leading-[1.04] tracking-[-0.03em] ${titleColor}`}>
        {title}
      </h2>
      {description ? <div className={`text-base leading-relaxed sm:text-lg ${bodyColor}`}>{description}</div> : null}
    </div>
  )
}

export function HomeMobile({ announcements = [] }: { announcements?: Announcement[] }) {
  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @keyframes marquee-mobile-about {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-mobile-about {
          animation: marquee-mobile-about 26s linear infinite;
        }
        @keyframes mobile-hero-word-cycle {
          0% { opacity: 0; transform: translateY(8px); }
          4% { opacity: 1; transform: translateY(0); }
          29% { opacity: 1; transform: translateY(0); }
          33% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        .mobile-hero-word-cycle {
          opacity: 0;
          animation-name: mobile-hero-word-cycle;
          animation-duration: 8.4s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-hero-word-cycle {
            animation-name: none;
          }
          .mobile-hero-word-cycle:not(:first-of-type) {
            display: none;
          }
        }
      `}</style>

      <MobileHomeHeader navigation={mobileNavigation} />

      <main id="top">
        <section className="relative overflow-hidden bg-background px-6 pb-16 pt-10" id="conteudo-principal">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/70" />

          <div className="relative mx-auto max-w-7xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="mb-0 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="h-px w-8 bg-primary" />
                  Centro de desenvolvimento cognitivo e socioemocional
                </p>

                <h1 className="font-serif text-[2.8rem] font-black leading-[0.98] tracking-[-0.045em] text-foreground">
                  Fortalecendo <MobileHeroWordRotator />
                  <br />
                  <span className="text-muted-foreground">que moldam o amanhã</span>
                </h1>

                <p className="max-w-xl text-[15px] leading-7 text-muted-foreground">
                  Programas personalizados fundamentados em <span className="font-medium text-foreground">neurociência</span>
                  {" "}para crianças, adolescentes, adultos e idosos. Porque todo potencial merece ser descoberto em Vila Velha e além.
                </p>

                <div className="grid gap-3">
                  <a
                    href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Quero%20agendar%20uma%20aula%20experimental%20gratuita%20na%20Intelekta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground"
                  >
                    Agendar aula experimental
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="#programas"
                    className="inline-flex h-14 items-center justify-center rounded-md border border-border bg-background px-6 text-base font-medium text-foreground"
                  >
                    Ver programas
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "A partir de 5 anos",
                    "Equipe especializada",
                    "Praia da Costa, Vila Velha",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Immersive Horizontal Carousel for Mobile Hero */}
                {(() => {
                  const ensureAbsoluteUrl = (url: string) => {
                    if (!url) return undefined
                    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) return url
                    return `https://${url}`
                  }

                  const activeItems = announcements.length > 0 
                    ? announcements.map(a => ({
                        src: a.imageUrl || "/images/hero-mobile-1.webp",
                        alt: a.title,
                        title: a.title,
                        category: a.category,
                        description: a.description,
                        date: a.date,
                        link: ensureAbsoluteUrl(a.linkUrl || "")
                      }))
                    : heroCards.map(c => ({
                        ...c,
                        title: c.alt,
                        category: "BEM-VINDO",
                        description: "Programas especializados da Intelekta.",
                        date: "",
                        link: undefined
                      }))

                  return (
                    <div className="space-y-4">
                      <div className="px-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <h4 className="text-[10px] font-bold tracking-widest text-primary uppercase">
                          Novidades Intelekta
                        </h4>
                      </div>
                      <DeferredMobileNewsCarousel items={activeItems} />
                    </div>
                  )
                })()}
              </div>

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Atendimento especializado
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground">
                  <span>Crianças</span>
                  <span className="text-muted-foreground/35">|</span>
                  <span>Adolescentes</span>
                  <span className="text-muted-foreground/35">|</span>
                  <span>Adultos</span>
                  <span className="text-muted-foreground/35">|</span>
                  <span>Idosos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgramDiscovery />

        <section id="programas" className="relative overflow-hidden bg-background px-6 py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-to-bl from-primary/[0.02] to-transparent" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Programas"
              title={
                <>
                  Cada pessoa merece um <span className="text-primary">cuidado especial.</span>
                </>
              }
              description="Selecionamos os atendimentos mais procurados para facilitar a leitura. Se nenhum deles for o ideal, você encontra outras opções logo abaixo."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {ageStages.map((stage) => (
                <div key={stage.phase} className="rounded-2xl border border-primary/5 bg-muted/30 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{stage.phase}</span>
                  <span className="mt-1 block text-[11px] font-medium text-foreground/70">{stage.age}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {featuredPrograms.map((program) => (
                <article key={program.title} className="overflow-hidden rounded-3xl border border-border bg-card/80">
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute bottom-2 right-3 select-none font-serif text-[52px] font-bold leading-none text-white/[0.08]">
                      {program.number}
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                        {program.subtitle}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground">{program.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{program.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ProgramCtaLink
                      program={program.title}
                      source={`mobile-programs:${program.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Falar sobre este programa
                      <ChevronRight className="h-4 w-4" />
                    </ProgramCtaLink>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/35">
                  Mais opções
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/10 to-transparent" />
              </div>

              <div className="grid gap-4">
                {additionalPrograms.map((program) => (
                  <article key={program.id} className="overflow-hidden rounded-3xl border border-border bg-card/80">
                    <div className="grid grid-cols-[112px_1fr] gap-0">
                      <div className="relative min-h-[140px] bg-muted">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                          sizes="112px"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                          {program.subtitle}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-bold leading-snug tracking-[-0.02em] text-foreground">
                          {program.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {program.description}
                        </p>
                        <ProgramCtaLink
                          program={program.title}
                          source={`mobile-programs-compact:${program.id}`}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
                        >
                          Ver detalhes
                          <ChevronRight className="h-4 w-4" />
                        </ProgramCtaLink>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div className="section-divider-dark" />

        <section id="depoimentos" className="relative overflow-hidden bg-dark-section px-6 py-16">
          <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/[0.03] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-8">
            <SectionHeader
              eyebrow="Depoimentos"
              title={
                <>
                  Histórias reais de quem vivencia a <span className="text-secondary italic">transformação cognitiva</span>
                </>
              }
              description="Depoimentos reais de quem encontrou na Intelekta um espaço para fortalecer cognição, emoção e autonomia."
              dark
            />

            <DeferredMobileTestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>

        <div className="section-divider" />

        <section id="metodologia" className="relative overflow-hidden px-6 py-16">
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[120px]" />
          <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-primary/[0.035] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:36px_36px] opacity-[0.02]" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Metodologia"
              title={
                <>
                  Ciência a serviço do <span className="text-primary">desenvolvimento humano</span>
                </>
              }
              description="Nossa equipe de psicólogos e psicopedagogas combina conhecimento científico com sensibilidade humana — porque acreditamos que o cuidado genuíno é o que transforma de verdade."
            />

            <div className="overflow-hidden rounded-3xl border border-primary/[0.09] bg-card/70">
              <div className="grid divide-y divide-primary/[0.07]">
                {pillars.map((pillar) => (
                  <article key={pillar.title} className="group relative overflow-hidden p-6">
                    <span className="pointer-events-none absolute bottom-1 right-4 select-none font-serif text-[88px] font-bold leading-none text-primary/[0.045]">
                      {pillar.roman}
                    </span>
                    <div className="relative">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                        <pillar.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold tracking-[-0.02em] text-foreground">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-center font-serif text-2xl font-bold tracking-[-0.02em] text-foreground">
                Como funciona na prática
              </h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <article key={step.number} className="flex items-start gap-4 rounded-3xl border border-primary/[0.08] bg-card/70 p-5">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/10">
                      <span className="font-serif text-lg font-bold text-primary">{step.number}</span>
                      {step.badge ? (
                        <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground">
                          {step.badge}
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{step.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section id="sobre" className="relative isolate overflow-hidden px-6 py-16 [contain:paint]">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-72 w-72 rounded-full bg-primary/[0.035] blur-[120px] sm:block" />
          <div className="pointer-events-none absolute -left-16 bottom-12 hidden h-56 w-56 rounded-full bg-secondary/[0.04] blur-[100px] sm:block" />
          <div className="pointer-events-none absolute inset-0 hidden bg-[repeating-linear-gradient(135deg,transparent,transparent_56px,var(--primary)_56px,var(--primary)_56.5px)] opacity-[0.018] sm:block" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Sobre nós"
              title={
                <>
                  Um espaço onde pessoas são <span className="text-primary">acolhidas e transformadas</span>
                </>
              }
              description={
                <>
                  A Intelekta foi idealizada por <strong className="text-foreground">psicólogos e psicopedagogas</strong> que acreditam que o cuidado humano vai muito além do conteúdo escolar. Somos um centro de desenvolvimento cognitivo e socioemocional dedicado a acolher e estimular pessoas em todas as fases da vida.
                </>
              }
            />

            <div className="-mx-6 overflow-hidden border-y border-primary/[0.07] py-3 [transform:translateZ(0)]" aria-hidden="true">
              <div className="animate-marquee-mobile-about flex whitespace-nowrap [backface-visibility:hidden]">
                {[...keywords, ...keywords, ...keywords].map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="inline-flex items-center gap-5 px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/25"
                  >
                    {keyword}
                    <span className="inline-block h-[3px] w-[3px] rounded-full bg-primary/20" />
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Nossos valores
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/10 to-transparent" />
              </div>

              <div className="border-t border-primary/[0.08]">
                {values.map((value, index) => (
                  <article
                    key={value.title}
                    className="relative isolate grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-primary/[0.08] py-5 [contain:paint] sm:gap-x-5"
                  >
                    <span className="font-serif text-3xl font-black leading-none text-primary/[0.12]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="mb-2 flex items-start gap-3">
                        <value.icon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <h3 className="min-w-0 font-serif text-[1.35rem] leading-snug text-foreground sm:text-2xl">{value.title}</h3>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">{value.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04] [contain:paint]">
              <div className="grid gap-4 px-6 py-8">
                <div className="relative mx-auto h-52 w-52">
                  <Image
                    src="/images/nino-mascote.webp"
                    alt="Nino, mascote da Intelekta"
                    fill
                    className="object-contain drop-shadow-lg sm:drop-shadow-2xl"
                    sizes="208px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold tracking-[-0.02em] text-foreground">Conheça o Nino</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Nosso mascote representa a curiosidade incansável, a inteligência ágil e o equilíbrio perfeito entre razão e emoção — qualidades que cultivamos em cada pessoa que passa pela Intelekta.
                  </p>
                  <div className="relative mt-6 border-l-[3px] border-primary/40 pl-5">
                    <span className="pointer-events-none absolute -left-1 -top-7 select-none font-serif text-6xl leading-none text-primary/10">
                      &ldquo;
                    </span>
                    <blockquote className="font-serif text-xl font-bold leading-8 tracking-[-0.02em] italic text-foreground">
                      Nosso propósito é despertar em cada pessoa a confiança de que pode desenvolver novas habilidades, superar desafios e construir uma vida mais equilibrada e significativa.
                    </blockquote>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="decorative-line" />
                      <span className="text-xs font-medium text-muted-foreground">Fundadoras da Intelekta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="equipe" className="relative overflow-hidden bg-dark-section px-6 py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Nossa Equipe"
              title={
                <>
                  Profissionais dedicadas ao <span className="text-secondary">seu desenvolvimento</span>
                </>
              }
              description="Combinamos décadas de experiência clínica e educacional com acolhimento humano para criar experiências transformadoras."
              dark
            />

            <div className="grid gap-4">
              {team.map((member) => (
                <article key={member.name} className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain object-bottom"
                      sizes="100vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl font-bold tracking-[-0.02em] text-dark-section-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-3 text-sm leading-7 text-dark-section-foreground/70">{member.bio}</p>
                    <p className="mt-3 text-xs text-dark-section-foreground/60">
                      {member.expertise.join(" · ")}
                    </p>
                    <a
                      href="https://www.instagram.com/psicointelekta/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs text-dark-section-foreground/60"
                      aria-label="Instagram da Intelekta"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      @psicointelekta
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative overflow-hidden px-6 py-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-primary/[0.03] blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-8">
            <SectionHeader
              eyebrow="Perguntas Frequentes"
              title={
                <>
                  Tire suas <span className="text-primary">dúvidas</span>
                </>
              }
              description="Respondemos as dúvidas mais comuns sobre metodologia, duração das sessões, avaliação inicial e faixa etária atendida." 
            />

            <DeferredMobileFaq faqs={faqs} />

            <div className="grid gap-4 pt-2">
              <article className="rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
                <MessageCircle className="mb-4 h-8 w-8 opacity-80" />
                <h3 className="font-serif text-2xl font-bold tracking-[-0.02em]">Aula experimental gratuita</h3>
                <p className="mt-2 text-sm leading-7 text-primary-foreground/82">
                  Conheça nosso espaço, metodologia e equipe sem compromisso. Agende agora e comece a jornada de desenvolvimento.
                </p>
                <a
                  href="#contato"
                  className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-base font-semibold text-primary"
                >
                  Agendar agora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>

              <article className="rounded-3xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">
                  Prefere tirar dúvidas rapidamente?
                </p>
                <a
                  href="https://wa.me/5527988773890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar pelo WhatsApp
                </a>
              </article>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section id="contato" className="relative overflow-hidden px-6 py-16">
          <div className="pointer-events-none absolute top-16 -right-16 h-56 w-56 rounded-full bg-primary/[0.03] blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-8">
            <SectionHeader
              eyebrow="Contato"
              title={
                <>
                  Vamos <span className="text-primary">conversar?</span>
                </>
              }
              description="Entre em contato para agendar sua aula experimental gratuita ou tirar suas dúvidas. Retornamos pelo WhatsApp em até 24 horas úteis."
            />

            <div className="grid gap-3">
              {[
                "1. Entendemos seu objetivo",
                "2. Indicamos o melhor caminho",
                "3. Agendamos sua aula experimental",
              ].map((step) => (
                <div key={step} className="rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm font-medium text-foreground/85">
                  {step}
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <article className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Fale conosco pelo WhatsApp</h3>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      A maneira mais rápida de tirar dúvidas e agendar sua aula experimental.
                    </p>
                    <ProgramAwareWhatsappLink
                      source="mobile-contact-card"
                      className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-green-700 px-5 text-sm font-medium text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Abrir WhatsApp
                    </ProgramAwareWhatsappLink>
                  </div>
                </div>
              </article>

              <DeferredMobileContactForm />

              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Endereço</h3>
                      <p className="text-sm text-muted-foreground">
                        Rua Afonso Pena, 403
                        <br />
                        Praia da Costa, Vila Velha - ES
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Telefone</h3>
                      <a href="tel:+5527988773890" className="text-sm text-muted-foreground">
                        (27) 98877-3890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Email</h3>
                      <a href="mailto:contato@intelektamente.com" className="text-sm text-muted-foreground">
                        contato@intelektamente.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Horário</h3>
                      <p className="text-sm text-muted-foreground">
                        Seg-Sex: 9h às 18h
                        <br />
                        Sáb: 9h às 12h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border h-[240px]">
                <iframe
                  src="https://maps.google.com/maps?q=Rua+Afonso+Pena,+403,+Praia+da+Costa,+Vila+Velha,+ES,+Brasil&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Intelekta — Rua Afonso Pena, 403, Praia da Costa, Vila Velha, ES"
                />
              </div>
            </div>

          </div>
        </section>

        <footer className="relative overflow-hidden bg-dark-section px-6 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-10 text-dark-section-foreground">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" />
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/[0.04] blur-[100px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/[0.03] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="space-y-4 text-center">
              <Image
                src="/images/logo-intelekta.webp"
                alt="Intelekta"
                width={140}
                height={48}
                className="mx-auto h-9 w-auto brightness-0 invert"
                loading="lazy"
              />
              <p className="text-sm leading-6 text-dark-section-foreground/80">
                Centro de desenvolvimento cognitivo e socioemocional fundamentado em neurociência. Vila Velha, ES.
              </p>
              <div className="flex items-center justify-center gap-2">
                <a
                  href="https://instagram.com/psicointelekta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/8 text-dark-section-foreground/80"
                  aria-label="Instagram da Intelekta"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="mailto:contato@intelektamente.com"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/8 text-dark-section-foreground/80"
                  aria-label="Email de contato"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/5527988773890?text=Olá! Gostaria de tirar algumas dúvidas sobre a Intelekta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/8 text-dark-section-foreground/80"
                  aria-label="WhatsApp de contato"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-white/8 pt-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-dark-section-foreground">Navegação</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-dark-section-foreground/80">
                  {mobileNavigation.map((item) => (
                    <a key={item.name} href={item.href}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-dark-section-foreground">Programas</h3>
                <div className="grid gap-y-2 text-sm text-dark-section-foreground/80">
                  {programs.map((program) => (
                    <a key={program.id} href="#programas">
                      {program.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-sm font-semibold text-dark-section-foreground">Contato</h3>
              <div className="space-y-3 text-sm text-dark-section-foreground/80">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Rua Afonso Pena, 403
                    <br />
                    Praia da Costa, Vila Velha - ES
                  </span>
                </div>
                <a href="tel:+5527988773890" className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>(27) 98877-3890</span>
                </a>
                <a href="mailto:contato@intelektamente.com" className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>contato@intelektamente.com</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 text-center text-sm text-dark-section-foreground/70">
              <p>&copy; {new Date().getFullYear()} Intelekta. Todos os direitos reservados.</p>
              <div className="flex items-center justify-center gap-4">
                <a href="/privacidade">Política de Privacidade</a>
                <a href="/termos">Termos de Uso</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/98 p-3">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href="tel:+5527988773890"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4" />
            Ligar
          </a>
          <ProgramAwareWhatsappLink
            source="mobile-sticky-bar"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <CheckCircle2 className="h-4 w-4" />
            Agendar
          </ProgramAwareWhatsappLink>
        </div>
      </div>
    </div>
  )
}
