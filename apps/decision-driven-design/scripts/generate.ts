import { mkdirSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { nightBus } from "./content/night-bus.ts"
import { designPrompt, illustratePrompt, promptNotes } from "./content/prompts.ts"
import type { Topic } from "./content/types.ts"
import { voting } from "./content/voting.ts"

const here = dirname(fileURLToPath(import.meta.url))
const outPath = join(here, "../src/data/trees.json")

function validate(topic: Topic, errors: string[]): void {
  const prefix = topic.id
  const personaIds = new Set(topic.personas.map((persona) => persona.id))
  const nodeIds = new Set(topic.nodes.map((node) => node.id))
  const options = new Map(topic.nodes.flatMap((node) => node.options.map((option) => [option.id, { option, nodeId: node.id }] as const)))
  const numbers = topic.sentences.map((sentence) => sentence.number)
  const numberSet = new Set(numbers)

  if (numbers.length === 0) errors.push(`${prefix}: no sentences`)
  const expected = numbers.slice().sort((a, b) => a - b)
  expected.forEach((number, index) => {
    if (number !== index + 1) errors.push(`${prefix}: sentence numbers are not 1..n (${number} at position ${index})`)
  })
  if (new Set(numbers).size !== numbers.length) errors.push(`${prefix}: duplicate sentence numbers`)

  for (const sentence of topic.sentences) {
    if (!nodeIds.has(sentence.nodeId)) errors.push(`${prefix} #${sentence.number}: missing node ${sentence.nodeId}`)
    const found = options.get(sentence.optionId)
    if (!found) errors.push(`${prefix} #${sentence.number}: missing option ${sentence.optionId}`)
    else if (!found.option.sentenceNumbers.includes(sentence.number)) {
      errors.push(`${prefix} #${sentence.number}: option ${sentence.optionId} does not list this sentence`)
    }
    if (sentence.parent !== null && !numberSet.has(sentence.parent)) {
      errors.push(`${prefix} #${sentence.number}: missing parent ${sentence.parent}`)
    }
    if (sentence.parent !== null && sentence.parent >= sentence.number) {
      errors.push(`${prefix} #${sentence.number}: parent ${sentence.parent} is not earlier`)
    }
    const sides = new Set(sentence.arguments.map((argument) => argument.side))
    if (!sides.has("for") || !sides.has("against")) {
      errors.push(`${prefix} #${sentence.number}: needs a for and an against`)
    }
    for (const argument of sentence.arguments) {
      if (!personaIds.has(argument.personaId)) {
        errors.push(`${prefix} #${sentence.number}: unknown persona ${argument.personaId}`)
      }
      if (argument.source === "round" && (argument.round === null || argument.text === null)) {
        errors.push(`${prefix} #${sentence.number}: round argument missing quote`)
      }
      if ((argument.source === "red-line") && argument.text !== null) {
        errors.push(`${prefix} #${sentence.number}: red-line argument should use the persona record`)
      }
    }
    for (const id of sentence.wonBy) {
      if (!personaIds.has(id)) errors.push(`${prefix} #${sentence.number}: unknown winner ${id}`)
    }
    for (const field of ["title", "decided", "because", "rejected"] as const) {
      if (!sentence[field].he.trim() || !sentence[field].en.trim()) {
        errors.push(`${prefix} #${sentence.number}: empty ${field}`)
      }
    }
  }

  for (const node of topic.nodes) {
    for (const option of node.options) {
      for (const number of option.sentenceNumbers) {
        if (!numberSet.has(number)) errors.push(`${prefix} ${option.id}: unknown sentence ${number}`)
      }
    }
  }

  const alternateIds = new Set<string>()
  for (const alternate of topic.alternates) {
    if (alternateIds.has(alternate.id)) errors.push(`${prefix}: duplicate alternate ${alternate.id}`)
    alternateIds.add(alternate.id)
    if (!numberSet.has(alternate.sentenceNumber)) {
      errors.push(`${prefix} ${alternate.id}: missing anchor ${alternate.sentenceNumber}`)
    }
    const rewriteNumbers = new Set(alternate.rewrites.map((rewrite) => rewrite.number))
    if (!rewriteNumbers.has(alternate.sentenceNumber)) {
      errors.push(`${prefix} ${alternate.id}: anchor is not rewritten`)
    }
    for (const rewrite of alternate.rewrites) {
      if (!rewrite.rejected?.he?.trim() || !rewrite.rejected?.en?.trim()) {
        errors.push(`${prefix} ${alternate.id}: rewrite ${rewrite.number} needs a rejected line`)
      }
    }
    const closed = new Set(alternate.closeNumbers)
    for (const number of alternate.closeNumbers) {
      if (!numberSet.has(number)) errors.push(`${prefix} ${alternate.id}: closes missing ${number}`)
      if (rewriteNumbers.has(number)) errors.push(`${prefix} ${alternate.id}: ${number} is both rewritten and closed`)
    }
    for (const number of alternate.stays) {
      if (!numberSet.has(number)) errors.push(`${prefix} ${alternate.id}: stay missing ${number}`)
      if (rewriteNumbers.has(number) || closed.has(number)) {
        errors.push(`${prefix} ${alternate.id}: stay ${number} also moves`)
      }
    }
    for (const shift of alternate.shifts) {
      if (!options.has(shift.optionId)) errors.push(`${prefix} ${alternate.id}: unknown shift ${shift.optionId}`)
    }
    for (const nodeId of alternate.closeNodes) {
      if (!nodeIds.has(nodeId)) errors.push(`${prefix} ${alternate.id}: unknown closed node ${nodeId}`)
    }
    if (alternate.closeNumbers.length > 0 && !alternate.closeNote) {
      errors.push(`${prefix} ${alternate.id}: closed sentences need a note`)
    }
  }

  if (!numberSet.has(topic.defaultSentence)) errors.push(`${prefix}: bad default sentence`)
}

const topics = [voting, nightBus]
const errors: string[] = []
if (voting.personas.length !== 8) errors.push("voting: expected 8 personas")
if (voting.sentences.length !== 32) errors.push("voting: expected 32 sentences")
if (voting.nodes.length !== 10) errors.push("voting: expected 10 nodes")
if (voting.alternates.length !== 3) errors.push("voting: expected 3 alternates")
if (!voting.alternates.some((alternate) => alternate.id === "biometric" && alternate.sentenceNumber === 8)) {
  errors.push("voting: decision 8 biometric alternate missing")
}
if (nightBus.sentences.length !== 16) errors.push("night-bus: expected 16 sentences")
if (nightBus.alternates.length !== 2) errors.push("night-bus: expected 2 alternates")
for (const topic of topics) validate(topic, errors)

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

const body = {
  generatedAt: "2026-11-27",
  pregenerated: true,
  notice: {
    he: "נוצר מראש בבניית העמוד. פתיחת החלטה או שינוי שלה לא קוראים למודל.",
    en: "Pre-generated when this page was built. Opening or changing a decision does not call a model.",
  },
  prompts: {
    design: designPrompt,
    illustrate: illustratePrompt,
    notes: promptNotes,
  },
  topics,
}

const hash = createHash("sha256").update(JSON.stringify(body)).digest("hex").slice(0, 12)
const bundle = { ...body, hash }
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, `${JSON.stringify(bundle, null, 2)}\n`)
console.log(`wrote ${outPath} (${topics.map((topic) => `${topic.id}:${topic.sentences.length}`).join(", ")}) ${hash}`)
