import { useState } from 'react'
import { RunStage } from './RunStage.tsx'
import { nodeById, replay, stepAt, timingLine, type AlignmentRow, type NodeSummary } from './replay.ts'

export default function App() {
  const [failedEpoch, setFailedEpoch] = useState(0)
  const [retryEpoch, setRetryEpoch] = useState(0)
  const [failedReplay, setFailedReplay] = useState(false)
  const [retryReplay, setRetryReplay] = useState(false)
  const [failedId, setFailedId] = useState<string | undefined>(replay.focus.failedToolId)
  const [retryId, setRetryId] = useState<string | undefined>(replay.focus.skillId)
  const [activeRow, setActiveRow] = useState<number | null>(null)
  const [failedFocus, setFailedFocus] = useState('npm')
  const [retryFocus, setRetryFocus] = useState('frontend-engineer')
  const [failedPulse, setFailedPulse] = useState(0)
  const [retryPulse, setRetryPulse] = useState(0)

  const failedNode = nodeById(replay.failed, failedId)
  const retryNode = nodeById(replay.retry, retryId)
  const firstIndex = replay.comparison.firstDivergence
  const firstRow = firstIndex == null ? undefined : replay.comparison.rows[firstIndex]

  function playFailed() {
    setFailedReplay(true)
    setFailedEpoch((value) => value + 1)
    setFailedId(undefined)
    setActiveRow(null)
  }

  function playRetry() {
    setRetryReplay(true)
    setRetryEpoch((value) => value + 1)
    setRetryId(undefined)
    setActiveRow(null)
  }

  function focusSide(side: 'failed' | 'retry', nodeId: string | undefined) {
    const run = side === 'failed' ? replay.failed : replay.retry
    const node = nodeById(run, nodeId)
    if (side === 'failed') {
      setFailedId(nodeId)
      if (node) {
        setFailedFocus(node.title)
        setFailedPulse((value) => value + 1)
      }
    } else {
      setRetryId(nodeId)
      if (node) {
        setRetryFocus(node.title)
        setRetryPulse((value) => value + 1)
      }
    }
    setActiveRow(null)
  }

  function focusRow(index: number, row: AlignmentRow) {
    const bad = stepAt(replay.comparison.badSteps, row.badOrdinal)
    const good = stepAt(replay.comparison.goodSteps, row.goodOrdinal)
    const failedNode = nodeById(replay.failed, bad?.nodeId)
    const retryNode = nodeById(replay.retry, good?.nodeId)
    setFailedId(bad?.nodeId)
    setRetryId(good?.nodeId)
    if (failedNode) {
      setFailedFocus(failedNode.title)
      setFailedPulse((value) => value + 1)
    }
    if (retryNode) {
      setRetryFocus(retryNode.title)
      setRetryPulse((value) => value + 1)
    }
    setActiveRow(index)
  }

  const skillRow = replay.comparison.rows.findIndex((row) => {
    const good = stepAt(replay.comparison.goodSteps, row.goodOrdinal)
    return row.classification === 'missing' && good?.nodeId === replay.focus.skillId
  })

  return (
    <div className="shell">
      <header className="top">
        <div>
          <p className="kicker">Recorded replay</p>
          <h1>Agent Think Map</h1>
          <p className="lead">{replay.prompt}</p>
        </div>
        <p className="meta">
          {replay.provenance.package} {replay.provenance.version}
          <span>tag {replay.provenance.tag}</span>
        </p>
      </header>

      <p className="banner">{replay.provenance.note}</p>

      <div className="actions">
        <button type="button" onClick={playFailed}>
          Replay the failed run
        </button>
        <button type="button" onClick={() => focusSide('failed', replay.focus.failedToolId)}>
          Inspect the failed npm test
        </button>
        <button type="button" onClick={playRetry}>
          Replay the retry
        </button>
        <button
          type="button"
          onClick={() => {
            if (skillRow >= 0) focusRow(skillRow, replay.comparison.rows[skillRow]!)
            else focusSide('retry', replay.focus.skillId)
          }}
        >
          Show the missing skill
        </button>
        <button
          type="button"
          disabled={firstIndex == null || !firstRow}
          onClick={() => {
            if (firstIndex != null && firstRow) focusRow(firstIndex, firstRow)
          }}
        >
          Analyzer’s first difference
        </button>
      </div>

      <div className="boards">
        <RunStage
          kicker="Failed run"
          title={replay.failed.label}
          status={replay.failed.status}
          events={replay.failed.events}
          replay={failedReplay}
          epoch={failedEpoch}
          focusTitle={failedFocus}
          focusPulse={failedPulse}
          onSelect={setFailedId}
        />
        <RunStage
          kicker="Successful retry"
          title={replay.retry.label}
          status={replay.retry.status}
          events={replay.retry.events}
          replay={retryReplay}
          epoch={retryEpoch}
          focusTitle={retryFocus}
          focusPulse={retryPulse}
          onSelect={setRetryId}
        />
      </div>

      <section className="compare" aria-label="Run comparison">
        <header className="compare-head">
          <div>
            <p className="kicker">compareRuns</p>
            <h2>Same prompt, two traces</h2>
          </div>
          <p>
            Analyzer v{replay.comparison.analyzerVersion}. A matched row means the captured fingerprint and outcome
            class agree. It does not mean the reasoning or answer text is the same. Read the step for that.
          </p>
        </header>
        {firstRow ? (
          <p className="lead-row">
            First non-matched row is {rowTitle(firstRow)}. {firstRow.reason}. User steps come from run.started and
            have no captured operation, so a structural pairing can be this first row even when both prompts are the
            same sentence. The missing skill is its own row.
          </p>
        ) : null}
        <ul className="warnings">
          {replay.comparison.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
        <div className="rows">
          {replay.comparison.rows.map((row, index) => {
            const bad = stepAt(replay.comparison.badSteps, row.badOrdinal)
            const good = stepAt(replay.comparison.goodSteps, row.goodOrdinal)
            return (
              <button
                key={`${row.classification}-${index}`}
                type="button"
                className={`row row-${row.classification}${activeRow === index ? ' is-active' : ''}`}
                onClick={() => focusRow(index, row)}
              >
                <span className="row-class">{row.classification}</span>
                <span className="row-pair">
                  <b>{titleFor(replay.failed.nodes, bad?.nodeId) ?? '—'}</b>
                  <b>{titleFor(replay.retry.nodes, good?.nodeId) ?? '—'}</b>
                </span>
                <span className="row-why">
                  {row.match} · {row.matchBasis}
                </span>
              </button>
            )
          })}
        </div>
        <div className="details">
          <StepCard side="Failed run" node={failedNode} />
          <StepCard side="Retry" node={retryNode} />
        </div>
      </section>

      <footer>
        <p>
          MIT · agent-think-map {replay.provenance.version} · commit {replay.provenance.commit.slice(0, 12)} · recorded
          synthetic replay, not a live session.
        </p>
        <p>
          <a href="https://github.com/nimrodfisher/agent-think-map">Repository</a>
          {' · '}
          <a href="https://nimrodfisher.github.io/agent-think-map/">Hosted canvas</a>
          {' · '}
          <a href="https://x.com/FisherNimrod/status/2112787120813482361">Bookmarked post</a>
          {' · '}
          <a href="../">All demos</a>
        </p>
      </footer>
    </div>
  )
}

function rowTitle(row: AlignmentRow): string {
  const bad = stepAt(replay.comparison.badSteps, row.badOrdinal)
  const good = stepAt(replay.comparison.goodSteps, row.goodOrdinal)
  const left = titleFor(replay.failed.nodes, bad?.nodeId) ?? 'no failed step'
  const right = titleFor(replay.retry.nodes, good?.nodeId) ?? 'no retry step'
  return `${left} beside ${right} (${row.classification})`
}

function titleFor(nodes: NodeSummary[], id: string | undefined): string | undefined {
  if (!id) return undefined
  return nodes.find((node) => node.id === id)?.title
}

function StepCard({ side, node }: { side: string; node: NodeSummary | undefined }) {
  if (!node) {
    return (
      <article className="card">
        <p className="kicker">{side}</p>
        <p>Click a step on this canvas, or a comparison row, to read its input, output, error, and timing.</p>
      </article>
    )
  }
  return (
    <article className="card">
      <p className="kicker">
        {side} · {node.kind} · {node.status}
      </p>
      <h3>{node.title}</h3>
      <dl>
        <div>
          <dt>Input</dt>
          <dd>
            <pre>{node.input || node.text || 'No input was recorded.'}</pre>
          </dd>
        </div>
        <div>
          <dt>Output</dt>
          <dd>
            <pre>{node.outputPreview || 'No output was recorded.'}</pre>
          </dd>
        </div>
        <div>
          <dt>Error</dt>
          <dd>{node.error || 'No error was recorded.'}</dd>
        </div>
        <div>
          <dt>Timing</dt>
          <dd>{timingLine(node)}</dd>
        </div>
      </dl>
    </article>
  )
}
