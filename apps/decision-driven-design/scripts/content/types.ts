export type LangText = {
  he: string
  en: string
}

export type Persona = {
  id: string
  name: LangText
  role: LangText
  line: LangText
  redLine: LangText
}

export type Argument = {
  personaId: string
  side: "for" | "against"
  source: "round" | "red-line" | "authored"
  round: number | null
  text: LangText | null
}

export type Effect = {
  kind: "limit" | "benefit"
  assumption: boolean
  text: LangText
  impact: LangText
}

export type SideOption = {
  id: string
  code: string
  label: LangText
  taken: boolean
  sentenceNumbers: number[]
  effects: Effect[]
}

export type TreeNode = {
  id: string
  code: string
  title: LangText
  question: LangText
  options: SideOption[]
}

export type Sentence = {
  number: number
  nodeId: string
  optionId: string
  parent: number | null
  title: LangText
  decided: LangText
  because: LangText
  rejected: LangText
  arguments: Argument[]
  wonBy: string[]
}

export type Rewrite = {
  number: number
  title: LangText
  decided: LangText
  because: LangText
  rejected: LangText
  note: LangText
}

export type OptionShift = {
  optionId: string
  taken: boolean
  note: LangText
}

export type Alternate = {
  id: string
  sentenceNumber: number
  label: LangText
  promptHe: string
  promptEn: string
  summary: LangText
  rewrites: Rewrite[]
  closeNumbers: number[]
  closeNote: LangText | null
  closeNodes: string[]
  shifts: OptionShift[]
  stays: number[]
  stayNote: LangText | null
}

export type Topic = {
  id: string
  title: LangText
  subject: LangText
  blurb: LangText
  provenance: LangText
  defaultSentence: number
  personas: Persona[]
  nodes: TreeNode[]
  sentences: Sentence[]
  alternates: Alternate[]
}

export function quote(
  personaId: string,
  side: "for" | "against",
  round: number,
  he: string,
  en: string,
): Argument {
  return {
    personaId,
    side,
    source: "round",
    round,
    text: { he, en },
  }
}

export function redLine(personaId: string, side: "for" | "against"): Argument {
  return {
    personaId,
    side,
    source: "red-line",
    round: null,
    text: null,
  }
}

export function authored(
  personaId: string,
  side: "for" | "against",
  he: string,
  en: string,
): Argument {
  return {
    personaId,
    side,
    source: "authored",
    round: null,
    text: { he, en },
  }
}

export function effect(
  kind: "limit" | "benefit",
  assumption: boolean,
  text: LangText,
  impact: LangText,
): Effect {
  return { kind, assumption, text, impact }
}
