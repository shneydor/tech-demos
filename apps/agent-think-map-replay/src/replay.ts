import type { AgentTraceEvent } from 'agent-think-map'
import replayFile from './data/replay.json'

export interface NodeSummary {
  id: string
  kind: string
  title: string
  status: string
  reason: string
  text: string
  input: string | null
  outputPreview: string | null
  error: string | null
  durationMs: number | null
  elapsedMs: number | null
  durationSource: 'durationMs' | 'timestamps' | null
  operation: { name: string; providerName?: string; server?: string } | null
}

export interface RunRecord {
  runId: string
  label: string
  status: string
  events: AgentTraceEvent[]
  nodes: NodeSummary[]
}

export interface AlignmentRow {
  goodOrdinal?: number
  badOrdinal?: number
  classification: 'matched' | 'inserted' | 'missing' | 'changed' | 'reordered'
  match: 'exact' | 'inferred'
  matchBasis: string
  confidence: string
  reason: string
}

export interface AnalyzedRef {
  ordinal: number
  nodeId: string
  kind: string
  status: string
  operationName: string
  providerName: string | null
  error: string | null
  durationMs: number | null
}

export interface ReplayFile {
  provenance: {
    package: string
    version: string
    tag: string
    commit: string
    recorded: boolean
    live: boolean
    provider: string
    note: string
  }
  prompt: string
  focus: {
    failedToolId: string
    failedAnswerId: string
    skillId: string
    readId: string
    subagentId: string
    mcpId: string
    retryAnswerId: string
  }
  failed: RunRecord
  retry: RunRecord
  comparison: {
    diffId: string
    analyzerVersion: number
    fingerprintVersion: number
    provisional: boolean
    warnings: string[]
    firstDivergence: number | null
    rows: AlignmentRow[]
    badSteps: AnalyzedRef[]
    goodSteps: AnalyzedRef[]
  }
}

export const replay = replayFile as ReplayFile

export function nodeById(run: RunRecord, id: string | undefined): NodeSummary | undefined {
  if (!id) return undefined
  return run.nodes.find((node) => node.id === id)
}

export function stepAt(steps: AnalyzedRef[], ordinal: number | undefined): AnalyzedRef | undefined {
  if (ordinal == null) return undefined
  return steps.find((step) => step.ordinal === ordinal)
}

export function timingLine(node: NodeSummary): string {
  if (node.durationSource === 'durationMs' && node.durationMs != null) {
    return `${node.durationMs} ms, from durationMs on the completed event.`
  }
  if (node.durationSource === 'timestamps' && node.elapsedMs != null) {
    return `${node.elapsedMs} ms from started to failed. node.failed has no durationMs, so the canvas inspector omits Duration.`
  }
  return 'This step has no recorded timing.'
}
