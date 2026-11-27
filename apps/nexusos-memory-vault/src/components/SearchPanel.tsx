import { capture } from '../lib/search.ts'
import type { SearchOutcome, ShownHit } from '../lib/types.ts'

type Props = {
  query: string
  outcome: SearchOutcome
  onQuery: (query: string) => void
  onOpen: (hit: ShownHit, origin: 'nexusos' | 'fallback') => void
}

export function SearchPanel({ query, outcome, onQuery, onOpen }: Props) {
  return (
    <section>
      <h2>Search</h2>
      <p className="lede">
        Chips replay <code>nexusos search --json</code>. Any other words are an in-browser match
        over the frozen <code>read</code> text, and the label says so.
      </p>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label htmlFor="search">Query</label>
        <input
          id="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="vendor freeze"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
      <div className="chips">
        {capture.queries.map((term) => (
          <button key={term} type="button" className={query === term ? 'chip on' : 'chip'} onClick={() => onQuery(term)}>
            {term}
          </button>
        ))}
      </div>
      <Outcome outcome={outcome} onOpen={onOpen} />
    </section>
  )
}

function Outcome({
  outcome,
  onOpen,
}: {
  outcome: SearchOutcome
  onOpen: (hit: ShownHit, origin: 'nexusos' | 'fallback') => void
}) {
  if (outcome.kind === 'idle') return null

  if (outcome.kind === 'nexusos') {
    return (
      <>
        <p className="provenance">
          <strong className="ok">NexusOS {capture.version}</strong>
          <span> recorded FTS5 · query “{outcome.query}” · {outcome.total} hits</span>
        </p>
        {outcome.hits.length === 0 ? (
          <p>NexusOS returned no hits for this recorded query.</p>
        ) : (
          <HitTable
            hits={outcome.hits}
            scoreLabel="score"
            rangeLabel="source lines"
            onOpen={(hit) => onOpen(hit, 'nexusos')}
          />
        )}
      </>
    )
  }

  return (
    <>
      <p className="provenance">
        <strong className="warn">Browser fallback</strong>
        <span> not a NexusOS query · token match on the frozen read text · “{outcome.query}”</span>
      </p>
      {outcome.hits.length === 0 ? (
        <p>No note in the frozen vault contains every word.</p>
      ) : (
        <HitTable
          hits={outcome.hits}
          scoreLabel="matches"
          rangeLabel="read line"
          onOpen={(hit) => onOpen(hit, 'fallback')}
        />
      )}
    </>
  )
}

function HitTable({
  hits,
  scoreLabel,
  rangeLabel,
  onOpen,
}: {
  hits: ShownHit[]
  scoreLabel: string
  rangeLabel: string
  onOpen: (hit: ShownHit) => void
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>{rangeLabel}</th>
            <th>Heading</th>
            <th>Snippet</th>
            <th>{scoreLabel}</th>
          </tr>
        </thead>
        <tbody>
          {hits.map((hit, index) => (
            <tr key={`${hit.path}-${hit.startLine}-${index}`}>
              <td>
                <button type="button" className="linkish" onClick={() => onOpen(hit)}>
                  {hit.path}
                </button>
                <div className="muted">{hit.title}</div>
              </td>
              <td className="num">
                {hit.startLine === hit.endLine ? hit.startLine : `${hit.startLine}–${hit.endLine}`}
              </td>
              <td>{hit.heading || '—'}</td>
              <td>
                <Snippet text={hit.snippet} />
              </td>
              <td className="num">{formatScore(hit.score, scoreLabel)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Snippet({ text }: { text: string }) {
  // FTS5 wraps matched terms in single brackets. Wiki links are [[...]] and
  // must stay plain text, or every link looks like a hit.
  const links: string[] = []
  const shielded = text.replace(/\[\[[\s\S]*?\]\]/g, (link) => {
    const token = `\u0000${links.length}\u0000`
    links.push(link)
    return token
  })
  const parts = shielded.split(/\[([^\]]+)\]/g)
  return (
    <>
      {parts.map((part, index) => {
        const restored = part.replace(/\u0000(\d+)\u0000/g, (_, n: string) => links[Number(n)] ?? '')
        return index % 2 === 1 ? <mark key={index}>{restored}</mark> : <span key={index}>{restored}</span>
      })}
    </>
  )
}

function formatScore(score: number, label: string): string {
  if (label === 'matches') return String(score)
  return score.toFixed(3)
}
