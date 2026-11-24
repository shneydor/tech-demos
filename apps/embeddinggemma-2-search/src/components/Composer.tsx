import { ImagePlus } from 'lucide-react'
import { useState, type DragEvent } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { cn } from '@/lib/utils.ts'

export function Composer({
  disabled,
  samplesLoaded,
  loadingSamples,
  onImages,
  onNote,
  onLoadSamples,
}: {
  disabled: boolean
  samplesLoaded: boolean
  loadingSamples: boolean
  onImages: (files: File[]) => void
  onNote: (text: string) => void
  onLoadSamples: () => void
}) {
  const [note, setNote] = useState('')
  const [dragging, setDragging] = useState(false)

  function addNote() {
    const text = note.trim()
    if (!text || disabled) return
    onNote(text)
    setNote('')
  }

  function takeFiles(fileList: FileList | File[]) {
    const images = [...fileList].filter((file) => file.type.startsWith('image/'))
    if (images.length > 0) onImages(images)
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragging(false)
    if (disabled) return
    takeFiles(event.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium">Add to the library</h2>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={disabled || samplesLoaded || loadingSamples}
          onClick={onLoadSamples}
        >
          {samplesLoaded ? 'Samples loaded' : loadingSamples ? 'Loading samples…' : 'Load samples'}
        </Button>
      </div>
      <label
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center text-sm text-muted-foreground',
          dragging && 'border-primary bg-primary/5 text-foreground',
          disabled && 'pointer-events-none opacity-40',
        )}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <ImagePlus />
        <span>Drop photos here, or click to choose</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={disabled}
          onChange={(event) => {
            if (event.target.files) takeFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </label>
      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value.slice(0, 1000))}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') addNote()
        }}
        disabled={disabled}
        placeholder="Write a short note"
        aria-label="Note"
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Ctrl+Enter adds the note.</p>
        <Button type="button" size="sm" disabled={disabled || note.trim().length === 0} onClick={addNote}>
          Add note
        </Button>
      </div>
    </div>
  )
}
