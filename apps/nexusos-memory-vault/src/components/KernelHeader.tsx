import { capture } from '../lib/search.ts'

const COUNT_KEYS = [
  'document_count',
  'chunk_count',
  'heading_count',
  'resolved_link_count',
  'unresolved_link_count',
  'ambiguous_link_count',
] as const

export function KernelHeader() {
  const status = capture.status
  const ready = status.status === 'ready'

  return (
    <header>
      <h1>NexusOS Kernel Data</h1>
      <p className="lede">
        Read-only view of the Northline company vault. Counts and documents come from a build-time{' '}
        <code>nexusos {capture.version}</code> index of the Markdown files. Nothing here mutates
        those files.
      </p>

      <h2>Status</h2>
      <p id="status">
        <span>status: </span>
        <strong className={ready ? 'ok' : 'err'}>{status.status}</strong>
        <span> · workspace: {capture.browse.workspace}</span>
        <span> · stale: {String(status.stale)}</span>
        <span> · server: {status.server_version}</span>
        {status.stale_reasons.length > 0 ? (
          <>
            <br />
            <span>reasons: {status.stale_reasons.join(', ')}</span>
          </>
        ) : null}
      </p>

      <h2>Counts</h2>
      <p id="counts">
        {COUNT_KEYS.map((key) => (
          <span key={key}>
            {key}: <strong>{status[key]}</strong>{' '}
          </span>
        ))}
      </p>
    </header>
  )
}
