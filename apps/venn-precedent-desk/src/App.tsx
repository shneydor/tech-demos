import { useState } from 'react'
import { AnswerPane } from '@/components/AnswerPane.tsx'
import { ComparePane } from '@/components/ComparePane.tsx'
import { TicketPane, TourDots } from '@/components/TicketPane.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { provenance, replaySource, stepRecord, tour } from '@/lib/traces.ts'

export default function App() {
  const [index, setIndex] = useState(0)
  const step = tour[index]
  const record = step ? stepRecord(step) : undefined

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-4 pb-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Harbor Card Ops</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Precedent Desk</h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Your closed cases are the model. A one-minute tour of how Venn routes the next ticket.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">venn-vdm {provenance.version}</Badge>
              <Badge variant="secondary">Recorded run</Badge>
            </div>
            <TourDots index={index} total={tour.length} />
          </div>
        </div>
        <p className="rounded-lg border bg-card/80 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {provenance.note} Commit {provenance.commit.slice(0, 12)} on tag {provenance.tag}. This page replays
          those responses. {replaySource}
        </p>
      </header>
      {step ? (
        <main className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)_minmax(0,0.95fr)]">
          <TicketPane
            step={step}
            index={index}
            total={tour.length}
            onNext={() => setIndex((current) => Math.min(tour.length - 1, current + 1))}
            onReplay={() => setIndex(0)}
          />
          <AnswerPane record={record} />
          <ComparePane record={record} />
        </main>
      ) : (
        <p className="text-sm text-destructive">The tour is missing from the recorded trace.</p>
      )}
      <footer className="mt-6 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
        MIT · research preview · not calibrated · not a guardrail.{' '}
        <a className="underline underline-offset-2" href="https://markrussinovich.github.io/venn-vdm/">
          Venn
        </a>
        {' · '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/markrussinovich/venn-vdm/blob/v0.1.0/examples/precedent_desk/README.md"
        >
          Precedent Desk
        </a>
      </footer>
    </div>
  )
}
