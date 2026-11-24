import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProgressState, ReadyInfo, WorkerEvent } from './types.ts'

const initialProgress: ProgressState = {
  ratio: 0,
  label: 'Starting…',
  loaded: 0,
  total: 0,
}

type Pending = {
  resolve: (vector: Float32Array) => void
  reject: (error: Error) => void
}

export function useEmbedder() {
  const workerRef = useRef<Worker | null>(null)
  const pendingRef = useRef(new Map<string, Pending>())
  const queueRef = useRef(Promise.resolve())
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [progress, setProgress] = useState<ProgressState>(initialProgress)
  const [info, setInfo] = useState<ReadyInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
    workerRef.current = worker

    const onMessage = (event: MessageEvent<WorkerEvent>) => {
      const message = event.data
      if (message.type === 'progress') {
        setProgress(message.progress)
        return
      }
      if (message.type === 'ready') {
        setInfo(message.info)
        setStatus('ready')
        setError(null)
        return
      }
      if (message.type === 'error') {
        setStatus('error')
        setError(message.message)
        return
      }
      const pending = pendingRef.current.get(message.id)
      if (!pending) return
      pendingRef.current.delete(message.id)
      if (message.type === 'result') pending.resolve(message.vector)
      else pending.reject(new Error(message.message))
    }

    worker.addEventListener('message', onMessage)
    const base = new URL(import.meta.env.BASE_URL, window.location.href)
    worker.postMessage({
      type: 'init',
      mjs: new URL('ort/ort-wasm-simd-threaded.asyncify.js', base).href,
      wasm: new URL('ort/ort-wasm-simd-threaded.asyncify.wasm', base).href,
    })

    return () => {
      worker.removeEventListener('message', onMessage)
      worker.terminate()
      workerRef.current = null
      for (const pending of pendingRef.current.values()) {
        pending.reject(new Error('The model worker stopped.'))
      }
      pendingRef.current.clear()
      queueRef.current = Promise.resolve()
    }
  }, [attempt])

  const callWorker = useCallback((body: Record<string, unknown>, transfer?: Transferable[]) => {
    const worker = workerRef.current
    if (!worker) return Promise.reject(new Error('The model worker is not running.'))
    const id = crypto.randomUUID()
    const promise = new Promise<Float32Array>((resolve, reject) => {
      pendingRef.current.set(id, { resolve, reject })
    })
    worker.postMessage({ ...body, id }, transfer ?? [])
    return promise
  }, [])

  const enqueue = useCallback(<T,>(job: () => Promise<T>) => {
    const run = queueRef.current.then(job, job)
    queueRef.current = run.then(
      () => undefined,
      () => undefined,
    )
    return run
  }, [])

  const embedText = useCallback(
    (text: string, role: 'query' | 'document') =>
      enqueue(() => callWorker({ type: 'embed-text', text, role })),
    [callWorker, enqueue],
  )

  const embedImage = useCallback(
    (raster: { buffer: ArrayBuffer; width: number; height: number }) => {
      const buffer = raster.buffer.slice(0)
      return enqueue(() =>
        callWorker(
          { type: 'embed-image', width: raster.width, height: raster.height, data: buffer },
          [buffer],
        ),
      )
    },
    [callWorker, enqueue],
  )

  const retry = useCallback(() => {
    setStatus('loading')
    setError(null)
    setInfo(null)
    setProgress(initialProgress)
    setAttempt((value) => value + 1)
  }, [])

  return { status, progress, info, error, retry, embedText, embedImage }
}
