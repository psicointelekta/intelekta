export const PROGRAM_SELECTION_STORAGE_KEY = "intelekta:selected-program"
export const PROGRAM_SELECTION_EVENT = "intelekta:selected-program"

export type ProgramSelection = {
  program: string
  source?: string
}

export function saveProgramSelection(program: string, source?: string) {
  if (typeof window === "undefined") return

  const payload: ProgramSelection = { program, source }
  window.sessionStorage.setItem(PROGRAM_SELECTION_STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent<ProgramSelection>(PROGRAM_SELECTION_EVENT, { detail: payload }))
}

export function readProgramSelection() {
  if (typeof window === "undefined") return null

  const raw = window.sessionStorage.getItem(PROGRAM_SELECTION_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as ProgramSelection
  } catch {
    return null
  }
}

export function buildProgramWhatsappUrl(program?: string) {
  const message = program && program !== "Outro / Não sei"
    ? `Olá! Quero agendar uma aula experimental gratuita e saber mais sobre o programa ${program} da Intelekta.`
    : "Olá! Quero agendar uma aula experimental gratuita e entender qual programa da Intelekta faz mais sentido para mim."

  return `https://wa.me/5527988773890?text=${encodeURIComponent(message)}`
}