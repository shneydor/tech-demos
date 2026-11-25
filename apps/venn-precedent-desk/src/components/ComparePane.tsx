import { Card, CardContent } from '@/components/ui/card.tsx'
import { percent, queueLabel, type StepRecord } from '@/lib/traces.ts'

const BANKING = 'https://huggingface.co/datasets/PolyAI/banking77'

function Column({
  kicker,
  answer,
  detail,
}: {
  kicker: string
  answer: string
  detail: string
}) {
  return (
    <div className="rounded-lg border bg-muted/50 p-3">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{kicker}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight" data-testid={kicker === 'History' ? 'history-answer' : 'described-answer'}>
        {queueLabel(answer)}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  )
}

export function ComparePane({ record }: { record: StepRecord | undefined }) {
  if (!record) {
    return (
      <Card>
        <CardContent className="pt-5 text-sm text-destructive">
          The comparison for this step is missing from the trace.
        </CardContent>
      </Card>
    )
  }

  const history = record.history.queue
  const described = record.history.described
  const same = history.answer === described.answer

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3 pt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Same run
            </p>
            <p className="text-xs text-muted-foreground" data-testid="agreement">
              {same ? 'Same queue' : 'Different queues'}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Column
              kicker="History"
              answer={history.answer}
              detail={`Nearest reference · ${percent(history.confidence)}. Closed tickets only.`}
            />
            <Column
              kicker="Descriptions"
              answer={described.answer}
              detail={`Choice · ${percent(described.confidence)}. Four queue descriptions, no store.`}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="border-[#3d4a3a] bg-[#161c18]">
        <CardContent className="pt-5 text-sm leading-relaxed">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#b7c7a4]">
            Official Precedent Desk · not recomputed
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#e7f0dc]">
            93.6% <span className="text-base font-normal text-[#b7c7a4]">vs</span> 79.7%
          </p>
          <p className="mt-2 text-[#d5e0cc]">
            On Banking77, Venn with all 10,003 closed tickets scored 93.6%. A matched Jev 1.13 run on the
            same 3,080 test tickets scored 79.7%. Nothing was trained.
          </p>
          <p className="mt-2 text-xs text-[#b7c7a4]">
            <a className="underline decoration-[#b7c7a4]/50 underline-offset-2" href={BANKING}>
              PolyAI/banking77
            </a>
            , CC BY 4.0. Cited from Venn’s Precedent Desk, not measured in this demo.
          </p>
        </CardContent>
      </Card>
      <p className="text-sm leading-relaxed text-muted-foreground">
        The same pattern applies to agent and tool routing in front of Amazon Bedrock: keep the resolved
        cases, pick the agent or tool whose precedents fit, and fall through when none do.
      </p>
    </div>
  )
}
