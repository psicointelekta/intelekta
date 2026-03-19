import Image from "next/image"
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users,
} from "lucide-react"

const heroCards = [
  { src: "/images/hero-mobile-1.webp", alt: "Criança em atividade lúdica de neuroeducação" },
  { src: "/images/hero-mobile-2.webp", alt: "Adolescente em sessão de desenvolvimento cognitivo" },
  { src: "/images/hero-mobile-3.webp", alt: "Idosa sorrindo durante atividade terapêutica" },
] as const

const values = [
  {
    icon: HeartHandshake,
    title: "Olhar humano",
    text: "Cada família é ouvida com atenção e recebe uma jornada realmente pensada para sua realidade.",
  },
  {
    icon: Brain,
    title: "Ciência e sensibilidade",
    text: "Neurociência e psicologia cognitiva aplicadas com empatia, clareza e propósito terapêutico.",
  },
  {
    icon: Users,
    title: "Todas as fases da vida",
    text: "Crianças, adolescentes, adultos e idosos podem desenvolver novas habilidades com acompanhamento próximo.",
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

const programs = [
  {
    title: "Neuroeducação",
    subtitle: "Programa multidisciplinar 100% lúdico",
    description:
      "Desenvolve, estimula e reabilita a mente em todas as idades através de jogos, oficinas criativas e atividades sensório-motoras.",
    tags: ["Todas as idades", "Lúdico", "Neuroplasticidade"],
    image: "/images/program-infantil.webp",
  },
  {
    title: "Xadrez Pedagógico",
    subtitle: "Estratégia que transforma o pensar",
    description:
      "Utiliza o xadrez para desenvolver atenção, memória, raciocínio lógico, planejamento e autorregulação emocional.",
    tags: ["Estratégia", "Foco", "Raciocínio lógico"],
    image: "/images/activity-children-chess.webp",
  },
  {
    title: "Musicoterapia",
    subtitle: "A música como ferramenta terapêutica",
    description:
      "Instrumentos, canto, ritmo e movimento corporal para desenvolver capacidades cognitivas e socioemocionais.",
    tags: ["Bem-estar", "Expressão", "Mães e bebês"],
    image: "/images/program-adolescente.webp",
  },
  {
    title: "Reforço Escolar",
    subtitle: "Apoio personalizado que respeita o ritmo",
    description:
      "Programa lúdico com foco no desenvolvimento acadêmico e socioemocional por meio de jogos e estratégias pedagógicas.",
    tags: ["Acadêmico", "Personalizado", "Infantil ao Médio"],
    image: "/images/activity-teens-study.webp",
  },
] as const

const team = [
  {
    name: "Suzidarle Pereira",
    role: "Psicóloga e Neuropsicóloga",
    bio: "Especializada no atendimento de crianças a partir de 6 anos e adolescentes, com expertise em avaliação neuropsicológica e terapia psicológica.",
    image: "/images/suzidarle_pereira_retrato.webp",
  },
  {
    name: "Fabiana Lima",
    role: "Psicopedagoga",
    bio: "Professora há 12 anos dedicada ao desenvolvimento integral de crianças e adolescentes, unindo aprendizagem, ludicidade e acolhimento.",
    image: "/images/fabiana_lima_retrato.webp",
  },
  {
    name: "Flávia Luz",
    role: "Consultora Técnica",
    bio: "Psicóloga clínica há 24 anos, Mestre em Desenvolvimento Humano e referência em saúde mental e cuidado infantojuvenil.",
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
] as const

const faqs = [
  {
    question: "Para qual faixa etária a Intelekta atende?",
    answer:
      "Atendemos pessoas a partir dos 5 anos, com programas específicos para crianças, adolescentes, adultos e idosos.",
  },
  {
    question: "Como funciona a metodologia da Intelekta?",
    answer:
      "Nossa metodologia integra neurociência, psicologia cognitiva e inteligência emocional em atividades práticas e personalizadas.",
  },
  {
    question: "Posso fazer uma aula experimental?",
    answer:
      "Sim. Oferecemos uma avaliação inicial gratuita para entender o momento atual e indicar o melhor caminho.",
  },
  {
    question: "Onde fica a Intelekta?",
    answer:
      "Rua Afonso Pena, 403, Praia da Costa, Vila Velha - ES.",
  },
] as const

function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
}) {
  const eyebrowColor = dark ? "text-secondary" : "text-primary"
  const bodyColor = dark ? "text-dark-section-foreground/72" : "text-muted-foreground"
  const titleColor = dark ? "text-dark-section-foreground" : "text-foreground"

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="decorative-line" />
        <span className={`text-xs font-medium uppercase tracking-[0.18em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      </div>
      <h2 className={`font-serif text-[2rem] leading-[1.08] tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {description ? <p className={`text-[15px] leading-7 ${bodyColor}`}>{description}</p> : null}
    </div>
  )
}

export function HomeMobile() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <style>{`
        @keyframes marquee-mobile-about {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-mobile-about {
          animation: marquee-mobile-about 26s linear infinite;
        }
      `}</style>

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center">
            <Image
              src="/images/logo-intelekta.webp"
              alt="Intelekta"
              width={148}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </a>
          <a
            href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20na%20Intelekta."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Agendar aula
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-background px-6 pb-16 pt-10" id="conteudo-principal">
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-primary/[0.07] blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-primary/[0.05] blur-[80px]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-[length:56px_100%] opacity-[0.04]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:100%_56px] opacity-[0.04]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/70" />

          <div className="relative mx-auto max-w-7xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="mb-0 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="h-px w-8 bg-primary" />
                  Centro de desenvolvimento cognitivo e socioemocional
                </p>

                <h1 className="font-serif text-[2.8rem] leading-[1.02] tracking-tight text-foreground">
                  Fortalecendo <span className="text-primary">mentes</span>
                  <br />
                  <span className="text-muted-foreground">que moldam o amanhã</span>
                </h1>

                <p className="max-w-xl text-[15px] leading-7 text-muted-foreground">
                  Programas personalizados fundamentados em <span className="font-medium text-foreground">neurociência</span>
                  {" "}para crianças, adolescentes, adultos e idosos. Porque todo potencial merece ser descoberto em Vila Velha e além.
                </p>

                <div className="grid gap-3">
                  <a
                    href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o%20gratuita%20na%20Intelekta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground"
                  >
                    Fale Conosco
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="#sobre"
                    className="inline-flex h-14 items-center justify-center rounded-md border border-border bg-background px-6 text-base font-medium text-foreground"
                  >
                    Conheça a Intelekta
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={heroCards[0].src}
                    alt={heroCards[0].alt}
                    width={900}
                    height={1125}
                    className="h-auto w-full object-cover"
                    sizes="100vw"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/18 via-transparent to-transparent" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {heroCards.slice(1).map((image) => (
                    <div key={image.src} className="relative overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={420}
                        className="h-auto w-full object-cover"
                        sizes="50vw"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
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

        <section id="sobre" className="relative overflow-hidden px-6 py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/[0.035] blur-[120px]" />
          <div className="pointer-events-none absolute -left-16 bottom-12 h-56 w-56 rounded-full bg-secondary/[0.04] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_56px,var(--primary)_56px,var(--primary)_56.5px)] opacity-[0.018]" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Sobre nós"
              title="Um espaço onde pessoas são acolhidas e transformadas"
              description="A Intelekta foi idealizada por psicólogos e psicopedagogas que acreditam que o cuidado humano vai muito além do conteúdo escolar."
            />

            <div className="-mx-6 overflow-hidden border-y border-primary/[0.07] py-3" aria-hidden="true">
              <div className="animate-marquee-mobile-about flex whitespace-nowrap">
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

            <div className="grid gap-3">
              {values.map((value) => (
                <article key={value.title} className="rounded-3xl border border-primary/[0.08] bg-card/70 p-5">
                  <value.icon className="mb-4 h-5 w-5 text-primary" />
                  <h3 className="font-serif text-2xl text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{value.text}</p>
                </article>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04]">
              <div className="grid gap-4 px-6 py-8">
                <div className="relative mx-auto h-52 w-52">
                  <Image
                    src="/images/nino-mascote.webp"
                    alt="Nino, mascote da Intelekta"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="208px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-3xl text-foreground">Conheça o Nino</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Nosso mascote representa a curiosidade incansável, a inteligência ágil e o equilíbrio entre razão e emoção.
                  </p>
                  <div className="relative mt-6 border-l-[3px] border-primary/40 pl-5">
                    <span className="pointer-events-none absolute -left-1 -top-7 select-none font-serif text-6xl leading-none text-primary/10">
                      &ldquo;
                    </span>
                    <blockquote className="font-serif text-xl leading-8 italic text-foreground">
                      Nosso propósito é despertar em cada pessoa a confiança de que pode desenvolver novas habilidades e construir uma vida mais equilibrada.
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

        <div className="section-divider" />

        <section id="metodologia" className="relative overflow-hidden px-6 py-16">
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[120px]" />
          <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-primary/[0.035] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--primary)_0.5px,transparent_0.5px)] bg-[length:36px_36px] opacity-[0.02]" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Metodologia"
              title="Ciência a serviço do desenvolvimento humano"
              description="Nossa equipe combina conhecimento científico com sensibilidade humana para transformar cuidado em evolução real."
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
                      <h3 className="font-serif text-2xl text-foreground">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-center font-serif text-2xl font-semibold text-foreground">
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

        <section id="programas" className="relative overflow-hidden bg-background px-6 py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-to-bl from-primary/[0.02] to-transparent" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Programas"
              title="Cada pessoa merece um cuidado especial"
              description="No mobile mantivemos a mesma atmosfera editorial do desktop, mas com menos interações e sem custo extra de animação."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Crianças", "5–12 anos"],
                ["Adolescentes", "13–17 anos"],
                ["Adultos", "18–59 anos"],
                ["Idosos", "60+ anos"],
              ].map(([phase, age]) => (
                <div key={phase} className="rounded-2xl border border-primary/5 bg-muted/30 p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{phase}</span>
                  <span className="mt-1 block text-[10px] font-medium text-primary/70">{age}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {programs.map((program) => (
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
                  </div>
                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/50">
                        {program.subtitle}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl leading-tight text-foreground">{program.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{program.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/10 bg-primary/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20os%20programas%20da%20Intelekta."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Saiba mais
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="equipe" className="relative overflow-hidden bg-dark-section px-6 py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Nossa Equipe"
              title="Profissionais dedicadas ao seu desenvolvimento"
              description="Combinamos experiência clínica e educacional com acolhimento humano para criar experiências transformadoras."
              dark
            />

            <div className="grid gap-4">
              {team.map((member) => (
                <article key={member.name} className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-primary/[0.08] via-primary/[0.04] to-transparent">
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
                    <h3 className="font-serif text-2xl text-dark-section-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-3 text-sm leading-7 text-dark-section-foreground/70">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-dark" />

        <section id="depoimentos" className="relative overflow-hidden bg-dark-section px-6 py-16">
          <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/[0.03] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl space-y-8">
            <SectionHeader
              eyebrow="Depoimentos"
              title="Histórias reais de quem vivencia a transformação cognitiva"
              description="No mobile, substituímos o carrossel por cards estáticos, preservando o tom editorial e reduzindo o JavaScript ao mínimo."
              dark
            />

            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <article key={testimonial.author} className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-dark-section-foreground">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-xl leading-8 italic text-pretty">
                    {testimonial.content}
                  </blockquote>
                  <div className="mt-5 text-sm text-dark-section-foreground/70">
                    <div className="font-semibold text-dark-section-foreground">{testimonial.author}</div>
                    <div>{testimonial.role}</div>
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
              title="Tire suas dúvidas"
              description="Mantivemos a linguagem da área de FAQ do desktop, usando apenas HTML nativo para máxima eficiência no mobile."
            />

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-3xl border border-border bg-card px-5 py-4">
                  <summary className="cursor-pointer list-none pr-6 text-left text-base font-semibold text-foreground marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="pt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
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
              title="Vamos conversar?"
              description="No mobile simplificamos o fechamento da jornada: WhatsApp, telefone e endereço em blocos rápidos, mas com a mesma proposta visual do desktop."
            />

            <article className="rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
              <MessageCircle className="mb-4 h-8 w-8 opacity-80" />
              <h3 className="font-serif text-2xl">Primeira aula gratuita</h3>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/82">
                Conheça nosso espaço, nossa metodologia e entenda qual programa faz mais sentido para o seu momento atual.
              </p>
              <a
                href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o%20gratuita%20na%20Intelekta."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-base font-semibold text-primary"
              >
                Agendar agora
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <div className="grid gap-3">
              <a href="tel:+5527988773890" className="rounded-3xl border border-border bg-card p-5">
                <Phone className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold text-foreground">Telefone</h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">(27) 98877-3890</p>
              </a>

              <a
                href="mailto:contato@intelektamente.com"
                className="rounded-3xl border border-border bg-card p-5"
              >
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold text-foreground">Email</h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">contato@intelektamente.com</p>
              </a>

              <a
                href="https://maps.google.com/?q=Rua+Afonso+Pena,+403,+Praia+da+Costa,+Vila+Velha,+ES"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-border bg-card p-5"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold text-foreground">Endereço</h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  Rua Afonso Pena, 403, Praia da Costa, Vila Velha - ES
                </p>
              </a>

              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Horário de atendimento</h3>
                    <p className="text-sm text-muted-foreground">Seg-Sex: 9h às 18h • Sáb: 9h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            <footer className="space-y-4 border-t border-border pt-8 text-center">
              <Image
                src="/images/logo-intelekta.webp"
                alt="Intelekta"
                width={124}
                height={40}
                className="mx-auto h-8 w-auto"
                loading="lazy"
              />
              <p className="text-sm leading-6 text-muted-foreground">
                Centro de desenvolvimento cognitivo e socioemocional em Vila Velha, ES.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <a href="/privacidade">Privacidade</a>
                <a href="/termos">Termos</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur-xl">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href="tel:+5527988773890"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4" />
            Ligar
          </a>
          <a
            href="https://wa.me/5527988773890?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o%20gratuita%20na%20Intelekta."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <CheckCircle2 className="h-4 w-4" />
            Agendar
          </a>
        </div>
      </div>
    </div>
  )
}
