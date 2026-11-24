import { useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Progress } from '@/components/ui/progress.tsx'
import { Composer } from '@/components/Composer.tsx'
import { Library, type RankedItem } from '@/components/Library.tsx'
import { MapView } from '@/components/MapView.tsx'
import { SearchPanel } from '@/components/SearchPanel.tsx'
import type { LibraryItem } from '@/embed/types.ts'
import { useEmbedder } from '@/embed/useEmbedder.ts'
import { rasterize } from '@/lib/rasterize.ts'
import { SAMPLE_IMAGES, SAMPLE_NOTES, sampleImageUrl } from '@/lib/samples.ts'
import { errorMessage, formatBytes } from '@/lib/utils.ts'

function cosine(a: ArrayLike<number>, b: ArrayLike<number>): number {
  let sum = 0
  const length = Math.min(a.length, b.length)
  for (let i = 0; i < length; i++) sum += a[i] * b[i]
  return sum
}

export default function App() {
  const embedder = useEmbedder()
  const { embedText, embedImage } = embedder
  const [items, setItems] = useState<LibraryItem[]>([])
  const [query, setQuery] = useState('')
  const [queryVector, setQueryVector] = useState<Float32Array | null>(null)
  const [searching, setSearching] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loadingSamples, setLoadingSamples] = useState(false)
  const [samplesLoaded, setSamplesLoaded] = useState(false)
  const queryGeneration = useRef(0)
  const itemsRef = useRef(items)
  itemsRef.current = items

  const modelReady = embedder.status === 'ready'

  useEffect(() => {
    if (!modelReady) return
    const text = query.trim()
    const generation = ++queryGeneration.current
    if (!text) {
      setQueryVector(null)
      setSearching(false)
      return
    }
    setSearching(true)
    const timer = window.setTimeout(() => {
      void embedText(text, 'query')
        .then((vector) => {
          if (queryGeneration.current !== generation) return
          setQueryVector(vector)
          setSearching(false)
        })
        .catch(() => {
          if (queryGeneration.current !== generation) return
          setSearching(false)
        })
    }, 220)
    return () => window.clearTimeout(timer)
  }, [query, modelReady, embedText])

  function updateItem(id: string, patch: Partial<LibraryItem>) {
    setItems((current) => {
      if (!current.some((item) => item.id === id)) return current
      return current.map((item) => (item.id === id ? { ...item, ...patch } : item))
    })
  }

  async function embedNote(id: string, text: string) {
    try {
      const vector = await embedText(text, 'document')
      updateItem(id, { status: 'ready', vector, error: undefined })
    } catch (error) {
      updateItem(id, { status: 'error', error: errorMessage(error) })
    }
  }

  async function embedPhoto(id: string, file: Blob) {
    try {
      const raster = await rasterize(file)
      if (!itemsRef.current.some((item) => item.id === id)) return
      const vector = await embedImage(raster)
      updateItem(id, { status: 'ready', vector, error: undefined })
    } catch (error) {
      updateItem(id, { status: 'error', error: errorMessage(error) })
    }
  }

  function addNote(text: string, id?: string) {
    const itemId = id ?? crypto.randomUUID()
    if (itemsRef.current.some((item) => item.id === itemId)) return
    const item: LibraryItem = {
      id: itemId,
      kind: 'note',
      label: text,
      text,
      status: 'embedding',
    }
    setItems((current) => [...current, item])
    void embedNote(itemId, text)
  }

  function addImages(files: File[]) {
    for (const file of files) {
      const id = crypto.randomUUID()
      const imageUrl = URL.createObjectURL(file)
      const item: LibraryItem = {
        id,
        kind: 'image',
        label: file.name || 'Photo',
        imageUrl,
        ownsUrl: true,
        status: 'embedding',
      }
      setItems((current) => [...current, item])
      void embedPhoto(id, file)
    }
  }

  async function addSampleImage(id: string, file: string, label: string) {
    if (itemsRef.current.some((item) => item.id === id)) return
    const imageUrl = sampleImageUrl(file)
    const item: LibraryItem = {
      id,
      kind: 'image',
      label,
      imageUrl,
      status: 'embedding',
    }
    setItems((current) => [...current, item])
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Could not load ${label}.`)
    await embedPhoto(id, await response.blob())
  }

  async function loadSamples() {
    if (!modelReady || samplesLoaded || loadingSamples) return
    setLoadingSamples(true)
    try {
      for (const note of SAMPLE_NOTES) addNote(note.text, note.id)
      for (const image of SAMPLE_IMAGES) {
        try {
          await addSampleImage(image.id, image.file, image.label)
        } catch (error) {
          updateItem(image.id, { status: 'error', error: errorMessage(error) })
        }
      }
      setSamplesLoaded(true)
    } finally {
      setLoadingSamples(false)
    }
  }

  function removeItem(id: string) {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id)
      if (item?.ownsUrl && item.imageUrl) URL.revokeObjectURL(item.imageUrl)
      return current.filter((entry) => entry.id !== id)
    })
    if (activeId === id) setActiveId(null)
  }

  const rows = useMemo<RankedItem[]>(() => {
    const ranked = items.map((item) => ({
      item,
      score: item.vector && queryVector ? cosine(item.vector, queryVector) : null,
    }))
    if (!query.trim() || !queryVector) return ranked
    return [...ranked].sort((a, b) => {
      if (a.score == null && b.score == null) return 0
      if (a.score == null) return 1
      if (b.score == null) return -1
      return b.score - a.score
    })
  }, [items, query, queryVector])

  const percent = embedder.progress.total > 0 ? Math.round(embedder.progress.ratio * 100) : null

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Tech Demos</p>
          {embedder.info && <Badge>{embedder.info.detail}</Badge>}
          {embedder.status === 'loading' && <Badge variant="outline">Loading model</Badge>}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">EmbeddingGemma 2</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Drop in photos and short notes. This page embeds them in the browser, then a query such as
            “dog on a beach” ranks the whole library.
          </p>
        </div>
        {embedder.status === 'loading' && (
          <Card>
            <CardHeader>
              <CardTitle>Downloading EmbeddingGemma 2</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Progress
                value={percent ?? undefined}
                aria-label="Model download progress"
                aria-valuetext={percent == null ? 'Starting download' : `${percent} percent`}
              />
              <p className="text-xs text-muted-foreground">
                {percent == null
                  ? 'Text and vision weights. About 280 MB on WebGPU, or about 880 MB for the WASM fallback.'
                  : `${percent}% · ${formatBytes(embedder.progress.loaded)} of ${formatBytes(embedder.progress.total)} · ${embedder.progress.label}`}
              </p>
            </CardContent>
          </Card>
        )}
        {embedder.status === 'error' && (
          <Card>
            <CardHeader>
              <CardTitle>The model did not load</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-3">
              <p className="text-sm text-destructive">{embedder.error}</p>
              <Button type="button" variant="secondary" onClick={embedder.retry}>
                Try again
              </Button>
            </CardContent>
          </Card>
        )}
      </header>

      <Composer
        disabled={!modelReady}
        samplesLoaded={samplesLoaded}
        loadingSamples={loadingSamples}
        onImages={addImages}
        onNote={(text) => addNote(text)}
        onLoadSamples={() => void loadSamples()}
      />

      <section className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Library</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <SearchPanel
              query={query}
              onQuery={setQuery}
              disabled={!modelReady}
              searching={searching}
            />
            <Library
              rows={rows}
              queryActive={Boolean(query.trim() && queryVector)}
              activeId={activeId}
              onHover={setActiveId}
              onRemove={removeItem}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>One shared space</CardTitle>
          </CardHeader>
          <CardContent>
            <MapView
              items={items}
              queryVector={queryVector}
              activeId={activeId}
              onHover={setActiveId}
            />
          </CardContent>
        </Card>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>Photos are embedded from pixels. Notes and queries are text. Nothing is uploaded.</p>
        <a className="hover:text-foreground" href="../">
          ← All demos
        </a>
      </footer>
    </main>
  )
}
