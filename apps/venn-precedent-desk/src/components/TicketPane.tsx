import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { catalogItem, provenance, type TourStep } from '@/lib/traces.ts'

interface TicketPaneProps {
  step: TourStep
  index: number
  total: number
  onNext: () => void
  onReplay: () => void
}

export function TicketPane({ step, index, total, onNext, onReplay }: TicketPaneProps) {
  const ticket = catalogItem(step.ticketId)
  const last = index === total - 1

  if (!ticket) {
    return (
      <Card>
        <CardContent className="pt-5 text-sm text-destructive">
          The recorded tour names ticket {step.ticketId}, which is missing from the catalog.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 text-xs font-medium uppercase tracking-[0.16em] text-primary">{step.kicker}</p>
          <p className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
            {index + 1} / {total}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground">{ticket.id}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{ticket.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ticket.body}</p>
        </div>
        <p className="text-sm">
          <span className="text-muted-foreground">From </span>
          {ticket.sender ?? 'Harbor Card Ops'}
        </p>
        <p className="text-sm leading-relaxed">{step.narration}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {step.action ? (
            <Button data-testid="writeback" onClick={onNext}>
              {step.action.label}
            </Button>
          ) : null}
          {last ? (
            <Button data-testid="replay" variant="secondary" onClick={onReplay}>
              Replay
            </Button>
          ) : (
            <Button data-testid="next" variant={step.action ? 'secondary' : 'default'} onClick={onNext}>
              Next
            </Button>
          )}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Tour of {total} tickets from {provenance.incomingCount} decided this run. {provenance.closedCount}{' '}
          closed cases are the store.
        </p>
      </CardContent>
    </Card>
  )
}

export function TourDots({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, dot) => (
        <span
          key={dot}
          className={dot === index ? 'h-1.5 w-5 rounded-full bg-primary' : 'h-1.5 w-1.5 rounded-full bg-border'}
        />
      ))}
    </div>
  )
}

