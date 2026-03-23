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