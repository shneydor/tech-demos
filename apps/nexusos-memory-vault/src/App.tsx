import { useMemo, useState } from 'react'
import { DocumentView } from './components/DocumentView.tsx'
import { KernelHeader } from './components/KernelHeader.tsx'
import { SearchPanel } from './components/SearchPanel.tsx'
import { capture, lookupSearch } from './lib/search.ts'
import type { OpenDoc, ShownHit } from './lib/types.ts'

export default function App() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<OpenDoc | null>(null)
  const outcome = useMemo(() => lookupSearch(query), [query])

  function openHit(hit: ShownHit, origin: 'nexusos' | 'fallback') {
    setOpen({
      path: hit.path,
      origin,
      startLine: hit.startLine,
      endLine: hit.endLine,
      chunkText: hit.chunkText,
    })
  }

  function openPath(path: string) {
    setOpen({
      path,
      origin: 'browse',
      startLine: null,
      endLine: null,
      chunkText: null,
    })
  }

  return (
    <div className="page">
      <KernelHeader />
      <SearchPanel query={query} outcome={outcome} onQuery={setQuery} onOpen={openHit} />
      {open ? (
        <DocumentView open={open} onOpenPath={openPath} onClose={() => setOpen(null)} />
      ) : outcome.kind === 'idle' ? (
        <Documents onOpenPath={openPath} />
      ) : null}
      <footer>
        Apache-2.0 · {capture.version_line} · Markdown stays the source of truth and the SQLite
        index is rebuildable.{' '}
        <a href="https://github.com/asimons81/nexusos">NexusOS</a>
        {' · '}
        <a href="https://x.com/tonysimons/status/2085923509784756353">bookmarked post</a>
      </footer>
    </div>
  )
}

function Documents({ onOpenPath }: { onOpenPath: (path: string) => void }) {
  return (
    <section>
      <h2>Documents</h2>
      <p className="lede">
        {capture.browse.count} indexed files from <code>nexusos browse --json</code>, ordered by
        path. Open one to read it and inspect links and context.
      </p>
      <div className="table-wrap">
        <table id="documents">
          <thead>
            <tr>
              <th>Relative path</th>
              <th>Title</th>
              <th>Collection</th>
            </tr>
          </thead>
          <tbody>
            {capture.browse.documents.map((doc) => (
              <tr key={doc.path}>
                <td>
                  <button type="button" className="linkish" onClick={() => onOpenPath(doc.path)}>
                    {doc.path}
                  </button>
                </td>
                <td>{doc.title}</td>
                <td>{doc.collection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
