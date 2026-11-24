import { useMemo } from 'react'
import type { LibraryItem } from '@/embed/types.ts'
import { projectPca, type PcaPoint } from '@/lib/pca.ts'

const PHOTO = '#e8ff6b'
const NOTE = '#9ecbff'
const QUERY = '#ffb4a2'

export function MapView({
  items,
  queryVector,
  activeId,
  onHover,
}: {
  items: LibraryItem[]
  queryVector: Float32Array | null
  activeId: string | null
  onHover: (id: string | null) => void
}) {
  const ready = useMemo(() => items.filter((item) => item.vector), [items])
  const layout = useMemo(() => {
    const projected = projectPca(
      ready.map((item) => ({ id: item.id, vector: item.vector as Float32Array })),
      queryVector,
    )
    return place(projected.points, projected.query)
  }, [ready, queryVector])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-medium">Map</h2>
        <p className="text-xs text-muted-foreground">2D PCA of the embeddings</p>
      </div>
      <svg
        viewBox="0 0 320 260"
        role="img"
        aria-label="Two-dimensional map of embedded photos and notes"
        className="h-64 w-full rounded-xl border bg-background/40"
      >
        {ready.length < 2 ? (
          <text x="160" y="130" textAnchor="middle" fill="#9a9488" fontSize="12">
            Add at least two embedded items
          </text>
        ) : (
          <>
            {layout.points.map((point) => {
              const item = ready.find((entry) => entry.id === point.id)
              if (!item) return null
              const active = item.id === activeId
              return (
                <g
                  key={item.id}
                  onMouseEnter={() => onHover(item.id)}
                  onMouseLeave={() => onHover(null)}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={active ? 8 : 5.5}
                    fill={item.kind === 'image' ? PHOTO : NOTE}
                    stroke={active ? '#f4f1ea' : 'transparent'}
                    strokeWidth="2"
                  >
                    <title>{item.label}</title>
                  </circle>
                </g>
              )
            })}
            {layout.query && (
              <g>
                <circle cx={layout.query.x} cy={layout.query.y} r="7" fill="none" stroke={QUERY} strokeWidth="2" />
                <circle cx={layout.query.x} cy={layout.query.y} r="2" fill={QUERY} />
                <title>Query</title>
              </g>
            )}
          </>
        )}
      </svg>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <Legend color={PHOTO} label="Photo" />
        <Legend color={NOTE} label="Note" />
        <Legend color={QUERY} label="Query" ring />
      </div>
    </div>
  )
}

function Legend({ color, label, ring = false }: { color: string; label: string; ring?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="size-2.5 rounded-full"
        style={ring ? { border: `2px solid ${color}` } : { background: color }}
      />
      {label}
    </span>
  )
}

function place(points: Map<string, PcaPoint>, query: PcaPoint | null) {
  const raw = [...points.entries()].map(([id, point]) => ({ id, ...point }))
  const all = query ? [...raw, { id: '__query', ...query }] : raw
  if (all.length === 0) return { points: [] as { id: string; x: number; y: number }[], query: null }

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const point of all) {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  }
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1

  const scale = (point: PcaPoint) => ({
    x: 28 + ((point.x - minX) / spanX) * 264,
    y: 28 + (1 - (point.y - minY) / spanY) * 204,
  })

  return {
    points: raw.map((point) => ({ id: point.id, ...scale(point) })),
    query: query ? scale(query) : null,
  }
}
