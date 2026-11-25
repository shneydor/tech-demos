import replay from '../data/replay.json'

export interface QueueInfo {
  id: string
  label: string
  description: string
}

export interface CatalogItem {
  id: string
  title: string
  body: string
  queue: string | null
  kind: string
  sender?: string
  utility?: number
}

export interface ScoredAnswer {
  answer: string
  confidence: number
  probabilities?: Record<string, number>
  margin?: number
  evidence_ids?: string[]
  calibrated?: boolean
  none_semantics?: string
}

export interface OutcomeOption {
  mean: number | null
  count: number
  spread: number | null
  mean_distance: number | null
  evidence_ids: string[]
  supported: boolean
}

export interface OutcomeAnswer {
  answer: string
  calibrated: boolean
  confidence: number | null
  goal: string
  distance: string
  options: Record<string, OutcomeOption>
}

export interface StepRecord {
  history: {
    queue: ScoredAnswer
    described: ScoredAnswer
    fits: ScoredAnswer
  }
  outcome: OutcomeAnswer
}

export interface TourStep {
  id: string
  ticketId: string
  phase: 'before' | 'after'
  kicker: string
  narration: string
  action?: { id: string; label: string; to: string }
}

interface ReplayFile {
  provenance: {
    package: string
    version: string
    commit: string
    tag: string
    vectors: string
    embedderDownloaded: boolean
    note: string
    threshold: number
    referenceK: number
    closedCount: number
    incomingCount: number
    headRevision: string
  }
  queues: QueueInfo[]
  catalog: Record<string, CatalogItem>
  tour: TourStep[]
  steps: Record<string, StepRecord>
  source: string
}

const data = replay as ReplayFile

export const provenance = data.provenance
export const queues = data.queues
export const tour = data.tour
export const replaySource = data.source

const queueById = new Map(queues.map((queue) => [queue.id, queue]))

export function queueLabel(id: string): string {
  if (id === 'none') return 'No queue'
  return queueById.get(id)?.label ?? id
}

export function queueDescription(id: string): string {
  return queueById.get(id)?.description ?? ''
}

export function catalogItem(id: string): CatalogItem | undefined {
  return data.catalog[id]
}

export function stepRecord(step: TourStep): StepRecord | undefined {
  const key = step.phase === 'after' ? `${step.ticketId}:after` : step.ticketId
  return data.steps[key]
}

export function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function fitsListedQueue(fits: ScoredAnswer): boolean {
  const yes = fits.probabilities?.true
  return typeof yes === 'number' && yes >= 0.5
}
