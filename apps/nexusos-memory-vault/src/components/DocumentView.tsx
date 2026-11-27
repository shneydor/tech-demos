import { useEffect, type ReactNode } from 'react'
import { capture } from '../lib/search.ts'
import type { OpenDoc, OutgoingLink } from '../lib/types.ts'

type Props = {
  open: OpenDoc
  onOpenPath: (path: string) => void
  onClose: () => void
}

export function DocumentView({ open, onOpenPath, onClose }: Props) {
  const read = capture.reads[open.path]
  const links = capture.links[open.path]
  const context = capture.contexts[open.path]

  useEffect(() => {
    document.getElementById('open-document')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [open.path])

  return (
    <section id="open-document">
      <h2>Document</h2>
      <p>
        <button type="button" onClick={onClose}>
          Back to index
        </button>
      </p>
      {!read || !links || !context ? (
        <p className="err">The recorded response could not be read for {open.path}.</p>
      ) : (
        <div className="doc-grid">
          <article>
            <p className="doc-title">{read.title}</p>
            <p className="muted">
              <code>{read.path}</code> · {read.collection} · <code>{read.document_id}</code>
            </p>
            {open.startLine != null && open.endLine != null ? (
              <div className="range-card">
                <p className="provenance">
                  {open.origin === 'nexusos' ? (
                    <>
                      <strong className="ok">NexusOS source lines {formatRange(open.startLine, open.endLine)}</strong>
                      <span> from the recorded search hit</span>
                    </>
                  ) : (
                    <>
                      <strong className="warn">Browser read line {open.startLine}</strong>
                      <span> a position in the frozen read text, not an index range</span>
                    </>
                  )}
                </p>
                {open.chunkText ? <pre>{open.chunkText}</pre> : null}
              </div>
            ) : null}
            <p className="muted">Recorded read output. Left numbers count that text, not the source file.</p>
            <div className="reader">
              {read.content.split('\n').map((line, index) => (
                <div className="line" key={index}>
                  <span className="ln">{index + 1}</span>
                  <span className="lt">{renderLine(line, links.outgoing, onOpenPath)}</span>
                </div>
              ))}
            </div>
            {read.truncated ? <p className="warn">read output was truncated</p> : null}
          </article>
          <aside>
            <h3>Links</h3>
            <p className="muted">Recorded links tool. Resolved targets open the other note.</p>
            <h4>Outgoing</h4>
            <LinkList
              empty="No outgoing wiki links."
              rows={links.outgoing.map((link) => ({
                key: `${link.source_line}-${link.raw_target}`,
                line: link.source_line,
                label: link.label || link.target_slug,
                state: link.resolution_state,
                path: link.target_path,
              }))}
              onOpenPath={onOpenPath}
            />
            <h4>Incoming</h4>
            <LinkList
              empty="No incoming wiki links."
              rows={links.incoming.map((link) => ({
                key: `${link.source_path}-${link.source_line}-${link.raw_target}`,
                line: link.source_line,
                label: displayTarget(link.raw_target),
                state: link.resolution_state,
                path: link.source_path,
              }))}
              onOpenPath={onOpenPath}
            />

            <h3>Context</h3>
            <p className="muted">
              Recorded context packet. Heading lines are source lines from the index.
            </p>
            <h4>Headings</h4>
            {context.headings.length === 0 ? (
              <p>No headings.</p>
            ) : (
              <ul className="plain">
                {context.headings.map((heading) => (
                  <li key={`${heading.line}-${heading.text}`}>
                    <span className="muted">{'·'.repeat(heading.level)} </span>
                    {heading.text} <code>line {heading.line}</code>
                  </li>
                ))}
              </ul>
            )}
            <h4>Siblings</h4>
            {context.siblings.length === 0 ? (
              <p>No other notes in {context.collection}.</p>
            ) : (
              <ul className="plain">
                {context.siblings.map((sibling) => (
                  <li key={sibling.path}>
                    <button type="button" className="linkish" onClick={() => onOpenPath(sibling.path)}>
                      {sibling.path}
                    </button>
                    <div className="muted">{sibling.title}</div>
                  </li>
                ))}
              </ul>
            )}
            <h4>Linked paths</h4>
            {context.linked.length === 0 ? (
              <p>No linked paths.</p>
            ) : (
              <ul className="plain">
                {context.linked.map((path) => (
                  <li key={path}>
                    <button type="button" className="linkish" onClick={() => onOpenPath(path)}>
                      {path}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      )}
    </section>
  )
}

function displayTarget(raw: string): string {
  const match = /^\[\[([^\]|#]+?)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]$/.exec(raw)
  if (!match) return raw
  return (match[2] ?? match[1] ?? raw).trim()
}

function formatRange(start: number, end: number): string {
  return start === end ? String(start) : `${start}–${end}`
}

function renderLine(line: string, outgoing: OutgoingLink[], onOpenPath: (path: string) => void) {
  const wikiLink = /\[\[([^\]|#]+?)(?:#([^\]|]+?))?(?:\|([^\]]+?))?\]\]/g
  const byRaw = new Map(outgoing.map((link) => [link.raw_target, link]))
  const nodes: ReactNode[] = []
  let last = 0
  let key = 0
  for (const match of line.matchAll(wikiLink)) {
    const start = match.index ?? 0
    if (start > last) nodes.push(line.slice(last, start))
    const raw = match[0]
    const label = (match[3] ?? match[1] ?? raw).trim()
    const link = byRaw.get(raw)
    if (link?.resolution_state === 'resolved' && link.target_path) {
      const target = link.target_path
      nodes.push(
        <button key={key} type="button" className="wikilink" onClick={() => onOpenPath(target)}>
          {label}
        </button>,
      )
    } else if (link && link.resolution_state !== 'resolved') {
      nodes.push(
        <span key={key} className="unresolved">
          {label} <span className="err">unresolved</span>
        </span>,
      )
    } else {
      nodes.push(raw)
    }
    last = start + raw.length
    key += 1
  }
  if (last < line.length) nodes.push(line.slice(last))
  if (nodes.length === 0) nodes.push('\u00a0')
  return nodes
}

function LinkList({
  rows,
  empty,
  onOpenPath,
}: {
  rows: Array<{ key: string; line: number; label: string; state: string; path: string | null }>
  empty: string
  onOpenPath: (path: string) => void
}) {
  if (rows.length === 0) return <p>{empty}</p>
  return (
    <ul className="plain">
      {rows.map((row) => (
        <li key={row.key}>
          <code>:{row.line}</code>{' '}
          {row.path && row.state === 'resolved' ? (
            <button type="button" className="linkish" onClick={() => onOpenPath(row.path as string)}>
              {row.label}
            </button>
          ) : (
            <span>{row.label}</span>
          )}{' '}
          <span className={row.state === 'resolved' ? 'ok' : 'err'}>{row.state}</span>
          {row.path ? <div className="muted">{row.path}</div> : null}
        </li>
      ))}
    </ul>
  )
}
