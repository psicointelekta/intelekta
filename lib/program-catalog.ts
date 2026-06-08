/**
 * Program catalog — single source of truth for all program data used
 * across the site (Programs section, contact form, footer, etc.).
 *
 * Exports:
 *  - PROGRAM_OPTIONS  — dropdown values for lead forms
 *  - ProgramOption    — TypeScript union of valid program names
 *  - ageStages        — age brackets shown next to the Programs header
 *  - programs         — full program details (title, subtitle, image, SEO intent, etc.)
 */

export const PROGRAM_OPTIONS = [
  "Fisioterapia Funcional",
  "Neuroreabilitação",
  "Neuroeducação",
  "Xadrez Pedagógico",
  "Musicoterapia",
  "Cubo Mágico",
  "Reforço Escolar",
  "Neurolê",
  "Psicopedagogia",
  "Outro / Não sei",
] as const

export type ProgramOption = (typeof PROGRAM_OPTIONS)[number]

/** Categories used for visual grouping in the carousel sidebar */
export type ProgramCategory = "senior" | "infantojuvenil"

export const ageStages = [
  {
    phase: "Crianças",
    age: "5-12 anos",
    description: "Estimulamos atenção, memória, e o desenvolvimento infantil de forma lúdica em Vila Velha.",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    phase: "Adolescentes",
    age: "13-17 anos",
    description: "Foco em funções executivas, controle emocional e autonomia escolar.",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    phase: "Adultos",
    age: "18-63 anos",
    description: "Produtividade, ansiedade, estresse e tomada de decisão estratégica.",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    phase: "Idosos",
    age: "64+ anos",
    description: "Prevenção do declínio cognitivo com foco em memória (estimulação cognitiva sênior).",
    category: "senior" as ProgramCategory,
  },
] as const

export const programs = [
  {
    id: "fisioterapia-funcional",
    number: "01",
    title: "Fisioterapia Funcional",
    subtitle: "Programa Intelekta Sênior — movimento e autonomia",
    description:
      "Oficinas e atendimentos em grupo para idosos, com foco em movimento, funcionalidade e qualidade de vida. Fortalece mobilidade, equilíbrio e coordenação com prevenção de quedas.",
    tags: ["Fisioterapia Funcional", "Prevenção de Quedas", "Longevidade"],
    intent: "Fisioterapia funcional para idosos em grupo Vila Velha",
    image: "/images/senior-fisioterapia.webp",
    category: "senior" as ProgramCategory,
  },
  {
    id: "neuroreabilitacao",
    number: "02",
    title: "Neuroreabilitação",
    subtitle: "Programa Intelekta Sênior — cognição e autonomia",
    description:
      "Sessões em grupo de neuroreabilitação para idosos, com foco em cognição, funcionalidade e qualidade de vida. Estimula memória, atenção e raciocínio com socialização.",
    tags: ["Neuroreabilitação", "Estimulação Cognitiva", "Memória"],
    intent: "Neuroreabilitação e estimulação cognitiva sênior Vila Velha",
    image: "/images/senior-neuroreabilitacao.webp",
    category: "senior" as ProgramCategory,
  },
  {
    id: "neuroeducacao",
    number: "03",
    title: "Neuroeducação",
    subtitle: "Programa multidisciplinar 100% lúdico em Vila Velha",
    description:
      "Estimulação cognitiva global que desenvolve a mente através de jogos e oficinas criativas. Ideal para crianças com atraso no desenvolvimento ou que buscam neuroplasticidade.",
    tags: ["Desenvolvimento Infantil", "Neuroplasticidade", "Estimulação Cognitiva"],
    intent: "Quero suporte para desenvolvimento infantil Vila Velha",
    image: "/images/neuroeducacao.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "xadrez",
    number: "04",
    title: "Xadrez Pedagógico",
    subtitle: "Raciocínio lógico e foco estratégico",
    description:
      "O xadrez como ferramenta para desenvolver atenção, memória e autorregulação emocional. Excelente apoio para crianças com TDAH ou dificuldade de concentração.",
    tags: ["TDAH Infantil", "Foco", "Raciocínio Lógico"],
    intent: "Psicólogo TDAH infantil Vila Velha e região",
    image: "/images/activity-children-chess.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "musicoterapia",
    number: "05",
    title: "Musicoterapia",
    subtitle: "Regulação emocional através da música",
    description:
      "Terapia musical para desenvolvimento cognitivo e socioemocional. Oferecemos suporte para regulação de emoções e vínculo para mães, bebês e crianças atípicas.",
    tags: ["Regulação Emocional", "Terapia Vila Velha", "Mães e Bebês"],
    intent: "Terapia emocional e psicólogo para crianças Vila Velha",
    image: "/images/musicoterapia.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "cubo-magico",
    number: "06",
    title: "Cubo Mágico",
    subtitle: "Planejamento e funções executivas",
    description:
      "Trabalha foco, raciocínio espacial e persistência. Ajuda no treinamento de funções executivas, sendo um diferencial para o desenvolvimento cognitivo infantil.",
    tags: ["Funções Executivas", "Persistência", "Memória"],
    intent: "Treinamento cognitivo e ajuda psicológica Vila Velha",
    image: "/images/activity-children-rubiks.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "reforco-escolar",
    number: "07",
    title: "Reforço Escolar",
    subtitle: "Apoio escolar personalizado",
    description:
      "Suporte pedagógico da Educação Infantil ao Ensino Médio. Ideal para crianças com baixo rendimento escolar ou dificuldade de concentração nos estudos.",
    tags: ["Reforço em Vila Velha", "Dificuldade de Aprendizagem", "Estudo"],
    intent: "Apoio escolar e psicólogo para dificuldade escolar",
    image: "/images/reforco_escolar.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "neurole",
    number: "08",
    title: "Neurolê",
    subtitle: "Alfabetização inclusiva para autismo (TEA)",
    description:
      "Abordagem sensorial e lúdica para o aprendizado da leitura e escrita. Programa especializado para crianças atípicas e diagnóstico de autismo (TEA) infantil.",
    tags: ["Autismo Vila Velha", "Alfabetização", "Neurodivergência"],
    intent: "Diagnóstico autismo e psicólogo autismo Vila Velha",
    image: "/images/neurole.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
  {
    id: "psicopedagogia",
    number: "09",
    title: "Psicopedagogia",
    subtitle: "Atendimento especializado em aprendizagem",
    description:
      "Acompanhamento focado em identificar barreiras no aprendizado. Avaliação cognitiva e psicopedagogia para crianças com dificuldades escolares em Vila Velha.",
    tags: ["Psicopedagoga Vila Velha", "Avaliação Cognitiva", "Barreiras Escolares"],
    intent: "Avaliação neuropsicológica e psicopedagogia Vila Velha",
    image: "/images/psicopedagogia.webp",
    category: "infantojuvenil" as ProgramCategory,
  },
] as const