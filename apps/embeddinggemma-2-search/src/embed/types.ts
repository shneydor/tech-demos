export type DeviceName = 'webgpu' | 'wasm'
export type DtypeName = 'q4' | 'fp16'

export type ReadyInfo = {
  device: DeviceName
  dtype: DtypeName
  detail: string
}

export type ProgressState = {
  ratio: number
  label: string
  loaded: number
  total: number
}

export type WorkerRequest =
  | { type: 'init'; mjs: string; wasm: string }
  | { type: 'embed-text'; id: string; text: string; role: 'query' | 'document' }
  | { type: 'embed-image'; id: string; width: number; height: number; data: ArrayBuffer }

export type WorkerEvent =
  | { type: 'progress'; progress: ProgressState }
  | { type: 'ready'; info: ReadyInfo }
  | { type: 'error'; message: string }
  | { type: 'result'; id: string; vector: Float32Array }
  | { type: 'failed'; id: string; message: string }

export type ItemKind = 'image' | 'note'
export type ItemStatus = 'embedding' | 'ready' | 'error'

export type LibraryItem = {
  id: string
  kind: ItemKind
  label: string
  text?: string
  imageUrl?: string
  ownsUrl?: boolean
  status: ItemStatus
  error?: string
  vector?: Float32Array
}
