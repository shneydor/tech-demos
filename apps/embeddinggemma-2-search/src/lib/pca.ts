export type PcaPoint = { x: number; y: number }

type VectorItem = { id: string; vector: ArrayLike<number> }

/** Project items onto the first two principal components. The query is mapped into that same basis. */
export function projectPca(items: VectorItem[], query: ArrayLike<number> | null): {
  points: Map<string, PcaPoint>
  query: PcaPoint | null
} {
  const points = new Map<string, PcaPoint>()
  if (items.length === 0) return { points, query: null }

  const dim = items[0].vector.length
  const mean = new Float64Array(dim)
  for (const item of items) {
    for (let j = 0; j < dim; j++) mean[j] += item.vector[j]
  }
  for (let j = 0; j < dim; j++) mean[j] /= items.length

  const centered = items.map((item) => {
    const row = new Float64Array(dim)
    for (let j = 0; j < dim; j++) row[j] = item.vector[j] - mean[j]
    return row
  })

  if (items.length === 1) {
    points.set(items[0].id, { x: 0, y: 0 })
    return { points, query: query ? projectQuery(query, mean, null, null) : null }
  }

  const axis1 = principalAxis(centered)
  const deflated = centered.map((row) => {
    const copy = row.slice()
    const scale = dot(row, axis1)
    for (let j = 0; j < dim; j++) copy[j] -= scale * axis1[j]
    return copy
  })
  const axis2 = principalAxis(deflated)

  items.forEach((item, index) => {
    points.set(item.id, {
      x: dot(centered[index], axis1),
      y: dot(centered[index], axis2),
    })
  })

  return {
    points,
    query: query ? projectQuery(query, mean, axis1, axis2) : null,
  }
}

function projectQuery(
  query: ArrayLike<number>,
  mean: Float64Array,
  axis1: Float64Array | null,
  axis2: Float64Array | null,
): PcaPoint {
  if (!axis1 || !axis2) return { x: 0.35, y: 0 }
  const centered = new Float64Array(mean.length)
  for (let j = 0; j < mean.length; j++) centered[j] = query[j] - mean[j]
  return { x: dot(centered, axis1), y: dot(centered, axis2) }
}

function principalAxis(rows: Float64Array[]): Float64Array {
  const dim = rows[0]?.length ?? 0
  const axis = new Float64Array(dim)
  if (dim === 0) return axis
  for (let j = 0; j < dim; j++) axis[j] = ((j * 17) % 29) / 29 - 0.5
  normalize(axis)

  for (let iteration = 0; iteration < 30; iteration++) {
    const next = multiplyCovariance(rows, axis)
    const magnitude = norm(next)
    if (magnitude < 1e-10) break
    for (let j = 0; j < dim; j++) axis[j] = next[j] / magnitude
  }
  return axis
}

function multiplyCovariance(rows: Float64Array[], vector: Float64Array): Float64Array {
  const projected = new Float64Array(rows.length)
  for (let i = 0; i < rows.length; i++) projected[i] = dot(rows[i], vector)
  const out = new Float64Array(vector.length)
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const scale = projected[i]
    for (let j = 0; j < out.length; j++) out[j] += row[j] * scale
  }
  return out
}

function dot(a: ArrayLike<number>, b: ArrayLike<number>): number {
  let sum = 0
  const length = Math.min(a.length, b.length)
  for (let i = 0; i < length; i++) sum += a[i] * b[i]
  return sum
}

function norm(vector: ArrayLike<number>): number {
  return Math.sqrt(dot(vector, vector))
}

function normalize(vector: Float64Array) {
  const magnitude = norm(vector) || 1
  for (let i = 0; i < vector.length; i++) vector[i] /= magnitude
}
