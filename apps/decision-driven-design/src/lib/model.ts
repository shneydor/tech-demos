export type Lang = "en" | "he"

export type LangText = {
  he: string
  en: string
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

export type Persona = {
  id: string
  name: LangText
  role: LangText
  line: LangText
  redLine: LangText
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

export type Bundle = {
  generatedAt: string
  pregenerated: true
  hash: string
  notice: LangText
  prompts: {
    design: LangText
    illustrate: LangText
    notes: LangText
  }
  topics: Topic[]
}

export type SentenceStatus = "same" | "rewritten" | "closed"

export type ViewSentence = Sentence & {
  status: SentenceStatus
  note: LangText | null
  published: {
    title: LangText
    decided: LangText
    because: LangText
  }
}

export function text(value: LangText, lang: Lang): string {
  const chosen = value[lang].trim()
  return chosen || value.en
}

export function fillSubject(template: string, subject: string): string {
  return template.split("{subject}").join(subject)
}

export function findAlternate(topic: Topic, id: string | null): Alternate | null {
  if (!id) return null
  return topic.alternates.find((alternate) => alternate.id === id) ?? null
}

export function viewSentences(topic: Topic, alternate: Alternate | null): ViewSentence[] {
  return topic.sentences.map((sentence) => {
    const published = {
      title: sentence.title,
      decided: sentence.decided,
      because: sentence.because,
    }
    const rewrite = alternate?.rewrites.find((item) => item.number === sentence.number)
    if (rewrite) {
      return {
        ...sentence,
        title: rewrite.title,
        decided: rewrite.decided,
        because: rewrite.because,
        rejected: rewrite.rejected,
        status: "rewritten",
        note: rewrite.note,
        published,
      }
    }
    if (alternate?.closeNumbers.includes(sentence.number)) {
      return {
        ...sentence,
        status: "closed",
        note: alternate.closeNote,
        published,
      }
    }
    return { ...sentence, status: "same", note: null, published }
  })
}

export function optionState(
  topic: Topic,
  alternate: Alternate | null,
  optionId: string,
): { taken: boolean; note: LangText | null; nodeClosed: boolean } {
  const located = locateOption(topic, optionId)
  const shift = alternate?.shifts.find((item) => item.optionId === optionId)
  const nodeClosed = located ? Boolean(alternate?.closeNodes.includes(located.node.id)) : false
  if (nodeClosed) return { taken: false, note: alternate?.closeNote ?? null, nodeClosed: true }
  if (shift) return { taken: shift.taken, note: shift.note, nodeClosed: false }
  return { taken: located?.option.taken ?? false, note: null, nodeClosed: false }
}

export function locateOption(
  topic: Topic,
  optionId: string,
): { node: TreeNode; option: SideOption } | null {
  for (const node of topic.nodes) {
    const option = node.options.find((item) => item.id === optionId)
    if (option) return { node, option }
  }
  return null
}

export function sentenceByNumber(sentences: ViewSentence[], number: number): ViewSentence | null {
  return sentences.find((sentence) => sentence.number === number) ?? null
}

export function ancestors(topic: Topic, number: number): number[] {
  const chain: number[] = []
  const seen = new Set<number>()
  let current = topic.sentences.find((sentence) => sentence.number === number) ?? null
  while (current?.parent !== null && current?.parent !== undefined) {
    if (seen.has(current.parent)) break
    seen.add(current.parent)
    chain.push(current.parent)
    current = topic.sentences.find((sentence) => sentence.number === current?.parent) ?? null
  }
  return chain.reverse()
}

export function downstreamCount(alternate: Alternate): number {
  return alternate.rewrites.length - 1 + alternate.closeNumbers.length
}

export function personaMatches(sentence: Sentence, personaId: string | null): boolean {
  if (!personaId) return true
  return (
    sentence.wonBy.includes(personaId) ||
    sentence.arguments.some((argument) => argument.personaId === personaId)
  )
}

export function sentenceMatches(
  topic: Topic,
  sentence: Sentence,
  query: string,
  personaId: string | null,
): boolean {
  if (!personaMatches(sentence, personaId)) return false
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  const people = topic.personas.filter(
    (persona) => sentence.wonBy.includes(persona.id) || sentence.arguments.some((argument) => argument.personaId === persona.id),
  )
  const blob = [
    String(sentence.number),
    sentence.title.he,
    sentence.title.en,
    sentence.decided.he,
    sentence.decided.en,
    sentence.because.he,
    sentence.because.en,
    sentence.rejected.he,
    sentence.rejected.en,
    ...people.flatMap((persona) => [persona.name.he, persona.name.en, persona.role.he, persona.role.en]),
  ]
    .join(" ")
    .toLowerCase()
  return blob.includes(needle)
}

export function alternateFor(topic: Topic, number: number): Alternate | null {
  return topic.alternates.find((alternate) => alternate.sentenceNumber === number) ?? null
}
