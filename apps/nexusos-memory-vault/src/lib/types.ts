export type StatusReport = {
  status: string
  read_only: boolean
  server_version: string
  workspace_id: string
  document_count: number
  chunk_count: number
  heading_count: number
  resolved_link_count: number
  unresolved_link_count: number
  ambiguous_link_count: number
  stale: boolean
  stale_reasons: string[]
}

export type BrowseDocument = {
  document_id: string
  path: string
  title: string
  collection: string
}

export type SearchHit = {
  chunk_id: string
  document_id: string
  title: string
  relative_path: string
  heading_path: string[]
  start_line: number
  end_line: number
  text: string
  snippet: string
  score: number
}

export type SearchReport = {
  query: string
  total: number
  results: SearchHit[]
}

export type ReadReport = {
  document_id: string
  path: string
  title: string
  collection: string
  content: string
  truncated: boolean
}

export type OutgoingLink = {
  source_line: number
  raw_target: string
  target_slug: string
  target_heading: string | null
  label: string | null
  resolution_state: string
  target_path: string | null
}

export type IncomingLink = {
  source_path: string
  source_line: number
  raw_target: string
  target_slug: string
  resolution_state: string
}

export type LinksReport = {
  document_id: string
  path: string
  title: string
  collection: string
  outgoing: OutgoingLink[]
  incoming: IncomingLink[]
}

export type ContextHeading = {
  level: number
  text: string
  line: number
}

export type ContextSibling = {
  document_id: string
  path: string
  title: string
  collection: string
}

export type ContextReport = {
  document_id: string
  path: string
  title: string
  collection: string
  headings: ContextHeading[]
  siblings: ContextSibling[]
  linked: string[]
  outgoing: OutgoingLink[]
  incoming: IncomingLink[]
}

export type Capture = {
  tool: string
  version: string
  version_line: string
  queries: string[]
  status: StatusReport
  browse: {
    workspace: string
    collection: string | null
    count: number
    documents: BrowseDocument[]
  }
  searches: Record<string, SearchReport>
  reads: Record<string, ReadReport>
  links: Record<string, LinksReport>
  contexts: Record<string, ContextReport>
}

export type ShownHit = {
  path: string
  title: string
  startLine: number
  endLine: number
  snippet: string
  score: number
  heading: string
  chunkText: string | null
}

export type SearchOutcome =
  | { kind: 'idle' }
  | { kind: 'nexusos'; query: string; total: number; hits: ShownHit[] }
  | { kind: 'fallback'; query: string; hits: ShownHit[] }

export type OpenDoc = {
  path: string
  origin: 'nexusos' | 'fallback' | 'browse'
  startLine: number | null
  endLine: number | null
  chunkText: string | null
}
