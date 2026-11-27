import { useEffect, useRef } from 'react'
import { AgentSimulator } from 'agent-think-map/react'
import type { AgentTraceEvent } from 'agent-think-map'

export function RunStage({
  kicker,
  title,
  status,
  events,
  replay,
  epoch,
  focusTitle,
  focusPulse,
  onSelect,
}: {
  kicker: string
  title: string
  status: string
  events: AgentTraceEvent[]
  replay: boolean
  epoch: number
  focusTitle?: string
  focusPulse: number
  onSelect: (id: string | undefined) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = stageRef.current
    const label = focusTitle
    if (!root || !label) return
    let tries = 0
    const timer = window.setInterval(() => {
      tries += 1
      const chip = [...root.querySelectorAll('button.atc-span')].find((element) =>
        (element.textContent ?? '').includes(label),
      )
      if (chip instanceof HTMLButtonElement) {
        chip.click()
        window.clearInterval(timer)
      } else if (tries > 40) {
        window.clearInterval(timer)
      }
    }, 100)
    return () => window.clearInterval(timer)
  }, [focusTitle, focusPulse])

  return (
    <section className="stage" aria-label={title} ref={stageRef}>
      <header className="stage-head">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className={`status status-${status}`}>{status}</p>
      </header>
      <p className="stage-hint">Click a step. On a narrow screen the map scrolls sideways.</p>
      <div className="stage-canvas">
        <AgentSimulator
          key={epoch}
          events={events}
          layout="split"
          replay={replay}
          intervalMs={380}
          onNodeSelect={(node) => onSelect(node?.id)}
        />
      </div>
    </section>
  )
}
