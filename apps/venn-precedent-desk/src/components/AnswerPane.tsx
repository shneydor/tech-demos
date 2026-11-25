import { Badge } from '@/components/ui/badge.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import {
  catalogItem,
  fitsListedQueue,
  percent,
  provenance,
  queueLabel,
  type StepRecord,
} from '@/lib/traces.ts'

function answerTone(id: string): string {
  if (id === 'none') return 'text-[#e7a394]'
  if (id === 'digital-assets') return 'text-[#9dcec0]'
  return 'text-primary'
}

function evidenceSummary(record: StepRecord): string {
  const historyId = record.history.queue.answer
  const describedId = record.history.described.answer
  const history = record.outcome.options[historyId]
  const described = record.outcome.options[describedId]
  if (history && described && historyId !== describedId && history.mean_distance != null && described.mean_distance != null) {
    return `Outcome store · ${queueLabel(historyId)} cases are ${history.mean_distance.toFixed(2)} away, mean utility ${history.mean?.toFixed(2)}. ${queueLabel(describedId)} cases are ${described.mean_distance.toFixed(2)} away.`
  }
  if (history && history.mean_distance != null) {
    return `Outcome store · ${history.count} ${queueLabel(historyId)} cases, mean utility ${history.mean?.toFixed(2)}, mean distance ${history.mean_distance.toFixed(2)}.`
  }
  if (historyId === 'none' && described && described.mean_distance != null) {
    return `History abstained below the ${percent(provenance.threshold)} threshold. ${queueLabel(describedId)} cases in the outcome store are ${described.mean_distance.toFixed(2)} away. A supported utility is not a reason to assign that queue.`
  }
  return 'The recorded outcome evidence for this ticket could not be read.'
}

export function AnswerPane({ record }: { record: StepRecord | undefined }) {
  if (!record) {
    return (
      <Card>
        <CardContent className="pt-5 text-sm text-destructive">
          The recorded response for this step could not be read.
        </CardContent>
      </Card>
    )
  }

  const queue = record.history.queue
  const fits = record.history.fits
  const yes = fits.probabilities?.true
  const affirmed = queue.answer !== 'none'
  const precedents = (queue.evidence_ids ?? []).slice(0, 5)
  const fit = fitsListedQueue(fits)
  const fitLabel = fit
    ? 'Fits a listed queue'
    : affirmed
      ? 'Outside the four descriptions'
      : 'Does not fit this queue'

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Venn · nearest reference
          </p>
          <Badge variant={fit ? 'calm' : 'warn'} data-testid="fit">
            {fitLabel}
            {typeof yes === 'number' ? ` · yes ${percent(yes)}` : ''}
          </Badge>
        </div>
        <div>
          <p className={`text-4xl font-semibold tracking-tight ${answerTone(queue.answer)}`} data-testid="queue-answer">
            {queueLabel(queue.answer)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Confidence {percent(queue.confidence)}
            {typeof queue.margin === 'number' ? ` · margin ${queue.margin.toFixed(2)}` : ''}
            {queue.calibrated === false ? ' · not calibrated' : ''}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{evidenceSummary(record)}</p>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {affirmed ? 'Precedents' : 'Nearest closed tickets, not affirmed'}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {precedents.map((id) => {
              const item = catalogItem(id)
              return (
                <li key={id} data-testid="precedent" className="rounded-lg border bg-muted/60 px-3 py-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-xs text-primary">{id}</span>
                    <span className="text-xs text-muted-foreground">
                      {item ? queueLabel(item.queue ?? 'none') : 'Unknown id'}
                      {typeof item?.utility === 'number' ? ` · utility ${item.utility.toFixed(2)}` : ''}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{item?.title ?? 'This precedent id is not in the catalog.'}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
