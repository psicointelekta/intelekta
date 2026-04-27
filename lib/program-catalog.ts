export const PROGRAM_OPTIONS = [
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

export const PROGRAM_DISCOVERY_PATHS = [
  {
    id: "aprendizagem",
    eyebrow: "Aprendizagem",
    title: "Quero apoio para aprendizagem e rotina escolar",
    description:
      "Para crianças e adolescentes que precisam de apoio acadêmico, organização, autonomia nos estudos e acompanhamento mais próximo.",
    recommendedProgram: "Reforço Escolar",
    badges: ["Infantil ao Médio", "Acadêmico", "Socioemocional"],
    image: "/images/activity-teens-study.webp",
  },
  {
    id: "foco-estrategia",
    eyebrow: "Foco e estratégia",
    title: "Quero desenvolver foco, raciocínio e planejamento",
    description:
      "Ideal para quem precisa fortalecer atenção, estratégia, tomada de decisão, persistência e funções executivas.",
    recommendedProgram: "Xadrez Pedagógico",
    badges: ["Atenção", "Estratégia", "Autonomia"],
    image: "/images/activity-children-chess.webp",
  },
  {
    id: "cognicao-ludica",
    eyebrow: "Cognição lúdica",
    title: "Quero estimular memória, atenção e desenvolvimento global",
    description:
      "Uma porta de entrada ampla para desenvolvimento cognitivo e socioemocional em diferentes fases da vida, com abordagem lúdica.",
    recommendedProgram: "Neuroeducação",
    badges: ["Todas as idades", "Lúdico", "Neuroplasticidade"],
    image: "/images/program-infantil.webp",
  },
  {
    id: "alfabetizacao",
    eyebrow: "Inclusão",
    title: "Quero apoio para alfabetização inclusiva",
    description:
      "Pensado para crianças atípicas que precisam de uma abordagem acolhedora, sensorial e personalizada para leitura e escrita.",
    recommendedProgram: "Neurolê",
    badges: ["Sensorial", "Inclusivo", "Crianças atípicas"],
    image: "/images/program-infantil.webp",
  },
  {
    id: "emocao-expressao",
    eyebrow: "Expressão e bem-estar",
    title: "Quero desenvolver expressão, vínculo e regulação emocional",
    description:
      "Uma alternativa potente para trabalhar cognição, vínculo, ritmo, expressão e bem-estar emocional com a música como ferramenta.",
    recommendedProgram: "Musicoterapia",
    badges: ["Bem-estar", "Expressão", "Mães e bebês"],
    image: "/images/program-adolescente.webp",
  },
  {
    id: "orientacao",
    eyebrow: "Orientação da equipe",
    title: "Ainda não sei qual programa faz mais sentido",
    description:
      "Se a dúvida ainda está aberta, nossa equipe ajuda a entender o perfil, o objetivo e o melhor caminho antes da decisão.",
    recommendedProgram: "Outro / Não sei",
    badges: ["Orientação", "Sem compromisso", "Escolha assistida"],
    image: "/images/activity-adults.webp",
  },
] as const

export const ageStages = [
  {
    phase: "Crianças",
    age: "5–12 anos",
    description: "Estimulamos atenção, memória, e o desenvolvimento infantil de forma lúdica em Vila Velha.",
  },
  {
    phase: "Adolescentes",
    age: "13–17 anos",
    description: "Foco em funções executivas, controle emocional e autonomia escolar.",
  },
  {
    phase: "Adultos",
    age: "18–63 anos",
    description: "Produtividade, ansiedade, estresse e tomada de decisão estratégica.",
  },
  {
    phase: "Idosos",
    age: "64+ anos",
    description: "Prevenção do declínio cognitivo com foco em memória (estimulação cognitiva sênior).",
  },
] as const

export const programs = [
  {
    id: "neuroeducacao",
    number: "01",
    title: "Neuroeducação",
    subtitle: "Programa multidisciplinar 100% lúdico em Vila Velha",
    description:
      "Estimulação cognitiva global que desenvolve a mente através de jogos e oficinas criativas. Ideal para crianças com atraso no desenvolvimento ou que buscam neuroplasticidade.",
    tags: ["Desenvolvimento Infantil", "Neuroplasticidade", "Estimulação Cognitiva"],
    intent: "Quero suporte para desenvolvimento infantil Vila Velha",
    image: "/images/program-infantil.webp",
  },
  {
    id: "xadrez",
    number: "02",
    title: "Xadrez Pedagógico",
    subtitle: "Raciocínio lógico e foco estratégico",
    description:
      "O xadrez como ferramenta para desenvolver atenção, memória e autorregulação emocional. Excelente apoio para crianças com TDAH ou dificuldade de concentração.",
    tags: ["TDAH Infantil", "Foco", "Raciocínio Lógico"],
    intent: "Psicólogo TDAH infantil Vila Velha e região",
    image: "/images/activity-children-chess.webp",
  },
  {
    id: "musicoterapia",
    number: "03",
    title: "Musicoterapia",
    subtitle: "Regulação emocional através da música",
    description:
      "Terapia musical para desenvolvimento cognitivo e socioemocional. Oferecemos suporte para regulação de emoções e vínculo para mães, bebês e crianças atípicas.",
    tags: ["Regulação Emocional", "Terapia Vila Velha", "Mães e Bebês"],
    intent: "Terapia emocional e psicólogo para crianças Vila Velha",
    image: "/images/program-adolescente.webp",
  },
  {
    id: "cubo-magico",
    number: "04",
    title: "Cubo Mágico",
    subtitle: "Planejamento e funções executivas",
    description:
      "Trabalha foco, raciocínio espacial e persistência. Ajuda no treinamento de funções executivas, sendo um diferencial para o desenvolvimento cognitivo infantil.",
    tags: ["Funções Executivas", "Persistência", "Memória"],
    intent: "Treinamento cognitivo e ajuda psicológica Vila Velha",
    image: "/images/activity-children-rubiks.webp",
  },
  {
    id: "reforco-escolar",
    number: "05",
    title: "Reforço Escolar",
    subtitle: "Apoio escolar personalizado",
    description:
      "Suporte pedagógico da Educação Infantil ao Ensino Médio. Ideal para crianças com baixo rendimento escolar ou dificuldade de concentração nos estudos.",
    tags: ["Reforço em Vila Velha", "Dificuldade de Aprendizagem", "Estudo"],
    intent: "Apoio escolar e psicólogo para dificuldade escolar",
    image: "/images/activity-teens-study.webp",
  },
  {
    id: "neurole",
    number: "06",
    title: "Neurolê",
    subtitle: "Alfabetização inclusiva para autismo e TEA",
    description:
      "Abordagem sensorial e lúdica para o aprendizado da leitura e escrita. Programa especializado para crianças atípicas e diagnóstico de autismo infantil.",
    tags: ["Autismo Vila Velha", "Alfabetização", "Neurodivergência"],
    intent: "Diagnóstico autismo e psicólogo autismo Vila Velha",
    image: "/images/program-infantil.webp",
  },
  {
    id: "psicopedagogia",
    number: "07",
    title: "Psicopedagogia",
    subtitle: "Atendimento especializado em aprendizagem",
    description:
      "Acompanhamento focado em identificar barreiras no aprendizado. Avaliação cognitiva e psicopedagogia para crianças com dificuldades escolares em Vila Velha.",
    tags: ["Psicopedagoga Vila Velha", "Avaliação Cognitiva", "Barreiras Escolares"],
    intent: "Avaliação neuropsicológica e psicopedagogia Vila Velha",
    image: "/images/activity-adults.webp",
  },
] as const