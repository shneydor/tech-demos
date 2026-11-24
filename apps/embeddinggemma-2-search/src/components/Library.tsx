import { ImageIcon, StickyNote, X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import type { LibraryItem } from '@/embed/types.ts'
import { cn, formatScore } from '@/lib/utils.ts'

export type RankedItem = {
  item: LibraryItem
  score: number | null
}

export function Library({
  rows,
  queryActive,
  activeId,
  onHover,
  onRemove,
}: {
  rows: RankedItem[]
  queryActive: boolean
  activeId: string | null
  onHover: (id: string | null) => void
  onRemove: (id: string) => void
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
        Nothing here yet. Drop a photo, write a note, or load the samples.
      </div>
    )
  }

  const topScore = queryActive ? Math.max(...rows.map((row) => row.score ?? 0), 0.001) : 1

  return (
    <ol className="flex flex-col gap-2">
      {rows.map((row, index) => {
        const { item, score } = row
        const width = score == null ? 0 : Math.max(0, Math.min(100, (score / topScore) * 100))
        return (
          <li
            key={item.id}
            className={cn(
              'flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5',
              activeId === item.id && 'border-primary/70',
              queryActive && index === 0 && item.status === 'ready' && 'border-primary',
            )}
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={() => onHover(null)}
          >
            {item.kind === 'image' && item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt=""
                className="size-14 shrink-0 rounded-md object-cover"
              />
            ) : (
              <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                {item.kind === 'image' ? <ImageIcon /> : <StickyNote />}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-sm font-medium">
                  {queryActive ? `${index + 1}. ` : ''}
                  {item.label}
                </p>
                {score != null && (
                  <span className="shrink-0 font-mono text-xs text-primary">{formatScore(score)}</span>
                )}
              </div>
              {item.kind === 'note' && item.text && item.text !== item.label && (
                <p className="truncate text-xs text-muted-foreground">{item.text}</p>
              )}
              {item.status === 'embedding' && (
                <p className="text-xs text-muted-foreground">Embedding…</p>
              )}
              {item.status === 'error' && (
                <p className="text-xs text-destructive">{item.error ?? 'Could not embed this item.'}</p>
              )}
              {score != null && (
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full bg-primary" style={{ width: `${width}%` }} />
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remove ${item.label}`}
              onClick={() => onRemove(item.id)}
            >
              <X />
            </Button>
          </li>
        )
      })}
    </ol>
  )
}
