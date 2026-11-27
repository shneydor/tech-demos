import captureJson from '../data/capture.json'
import type { Capture, SearchOutcome, ShownHit } from './types.ts'

export const capture = captureJson as Capture

const recordedKeys = new Map(capture.queries.map((query) => [normalizeQuery(query), query]))

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function lookupSearch(raw: string): SearchOutcome {
  const query = normalizeQuery(raw)
  if (!query) return { kind: 'idle' }

  const recorded = recordedKeys.get(query)
  if (recorded) {
    const report = capture.searches[recorded]
    if (!report) {
      return { kind: 'nexusos', query: recorded, total: 0, hits: [] }
    }
    return {
      kind: 'nexusos',
      query: report.query,
      total: report.total,
      hits: report.results.map((hit) => ({
        path: hit.relative_path,
        title: hit.title,
        startLine: hit.start_line,
        endLine: hit.end_line,
        snippet: hit.snippet,
        score: hit.score,
        heading: hit.heading_path.join(' / '),
        chunkText: hit.text,
      })),
    }
  }

  return { kind: 'fallback', query: raw.trim(), hits: fallbackHits(query) }
}

function fallbackHits(query: string): ShownHit[] {
  const terms = query.match(/[a-z0-9]+/g) ?? []
  if (terms.length === 0) return []

  const hits: ShownHit[] = []
  for (const doc of capture.browse.documents) {
    const read = capture.reads[doc.path]
    if (!read) continue
    const title = doc.title.toLowerCase()
    const body = read.content.toLowerCase()
    let matches = 0
    let missing = false
    for (const term of terms) {
      const inTitle = countToken(title, term)
      const inBody = countToken(body, term)
      if (inTitle + inBody === 0) {
        missing = true
        break
      }
      matches += inTitle * 3 + inBody
    }
    if (missing || matches === 0) continue

    const lines = read.content.split('\n')
    let lineNo = 1
    let snippet = lines[0] ?? ''
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index] ?? ''
      if (terms.some((term) => line.toLowerCase().includes(term))) {
        lineNo = index + 1
        snippet = markTerms(line, terms)
        break
      }
    }

    hits.push({
      path: doc.path,
      title: doc.title,
      startLine: lineNo,
      endLine: lineNo,
      snippet,
      score: matches,
      heading: '',
      chunkText: null,
    })
  }

  hits.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
  return hits.slice(0, 8)
}

function countToken(haystack: string, term: string): number {
  let count = 0
  let from = 0
  while (from < haystack.length) {
    const found = haystack.indexOf(term, from)
    if (found === -1) break
    count += 1
    from = found + term.length
  }
  return count
}

function markTerms(line: string, terms: string[]): string {
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi')
  return line.replace(pattern, '[$1]')
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
