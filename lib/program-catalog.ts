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

export const programs = [
  {
    id: "neuroeducacao",
    number: "01",
    title: "Neuroeducação",
    subtitle: "Programa multidisciplinar 100% lúdico",
    description:
      "Desenvolve, estimula e reabilita a mente em todas as idades através de jogos, brincadeiras, oficinas criativas e atividades sensório-motoras. Fundamentado em neuroplasticidade.",
    tags: ["Todas as idades", "Lúdico", "Neuroplasticidade"],
    intent: "Quero estimular memória e desenvolvimento global",
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
    intent: "Quero desenvolver foco, raciocínio e planejamento",
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
    intent: "Quero desenvolver expressão e regulação emocional",
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
    intent: "Quero desafiar e expandir minhas habilidades mentais",
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
    intent: "Quero apoio para aprendizagem e rotina escolar",
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
    intent: "Quero apoio para alfabetização inclusiva e acolhedora",
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
    intent: "Procuro acompanhamento especializado em aprendizagem",
    image: "/images/activity-adults.webp",
  },
] as const