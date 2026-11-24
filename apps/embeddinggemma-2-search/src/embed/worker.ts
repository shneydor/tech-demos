import {
  AutoConfig,
  AutoModel,
  AutoProcessor,
  RawImage,
  env,
  type ProgressInfo,
} from '@huggingface/transformers'
import type { DeviceName, DtypeName, ProgressState, WorkerEvent, WorkerRequest } from './types.ts'

const MODEL_ID = 'onnx-community/embeddinggemma-2-ONNX'

env.allowLocalModels = false
env.useBrowserCache = true

function configureWasm(mjs: string, wasm: string) {
  const wasmBackend = env.backends.onnx.wasm
  if (!wasmBackend) return
  wasmBackend.numThreads = 1
  wasmBackend.proxy = false
  wasmBackend.wasmPaths = { mjs, wasm }
}

type Session = {
  processor: (text: string | null, images?: RawImage | null) => Promise<unknown>
  model: (inputs: unknown) => Promise<{
    sentence_embedding?: { data: Float32Array; dims: number[]; dispose?: () => void }
  }>
}

let session: Session | null = null
const files = new Map<string, { loaded: number; total: number }>()

function post(event: WorkerEvent) {
  self.postMessage(event)
}

function publishProgress(label: string) {
  let loaded = 0
  let total = 0
  for (const file of files.values()) {
    loaded += file.loaded
    total += file.total > 0 ? file.total : file.loaded
  }
  const progress: ProgressState = {
    ratio: total > 0 ? Math.max(0, Math.min(1, loaded / total)) : 0,
    label,
    loaded,
    total,
  }
  post({ type: 'progress', progress })
}

function onProgress(info: ProgressInfo) {
  if (info.status === 'progress_total') {
    post({
      type: 'progress',
      progress: {
        ratio: Math.max(0, Math.min(1, info.progress / 100)),
        label: 'Downloading weights',
        loaded: info.loaded,
        total: info.total,
      },
    })
    return
  }
  if (info.status !== 'progress' && info.status !== 'done' && info.status !== 'download') return
  const file = info.file || 'model'
  const previous = files.get(file) ?? { loaded: 0, total: 0 }
  if (info.status === 'done') {
    const total = previous.total || previous.loaded
    files.set(file, { loaded: total, total })
  } else if (info.status === 'progress') {
    files.set(file, { loaded: info.loaded, total: info.total || previous.total })
  }
  publishProgress(file.split('/').pop() || file)
}

async function hasWebGpu(): Promise<boolean> {
  const gpu = navigator.gpu
  if (!gpu) return false
  try {
    const adapter = await gpu.requestAdapter()
    if (!adapter) return false
    const details = adapter as GPUAdapter & {
      isFallbackAdapter?: boolean
      info?: { architecture?: string; description?: string; vendor?: string }
    }
    if (details.isFallbackAdapter) return false
    const description = `${details.info?.architecture ?? ''} ${details.info?.description ?? ''} ${details.info?.vendor ?? ''}`.toLowerCase()
    // SwiftShader and lavapipe advertise WebGPU but run the vision encoder far too slowly to search photos.
    if (description.includes('swiftshader') || description.includes('llvmpipe') || description.includes('softpipe')) {
      return false
    }
    return true
  } catch {
    return false
  }
}

async function createSession(device: DeviceName, dtype: DtypeName): Promise<Session> {
  const config = await AutoConfig.from_pretrained(MODEL_ID, { progress_callback: onProgress })
  ;(config as { audio_config?: unknown }).audio_config = null
  const processor = await AutoProcessor.from_pretrained(MODEL_ID, { progress_callback: onProgress })
  const model = await AutoModel.from_pretrained(MODEL_ID, {
    config,
    device,
    dtype: { model: dtype, vision_encoder: dtype },
    progress_callback: onProgress,
  })
  return {
    processor: processor as Session['processor'],
    model: model as unknown as Session['model'],
  }
}

async function init() {
  const webgpu = await hasWebGpu()
  // The WASM build in Transformers.js 4.3.2 has no GatherBlockQuantized kernel, so q4/q8
  // cannot run there. A failed q4 session also leaves the runtime unusable, so WASM starts at fp16.
  const attempts: { device: DeviceName; dtype: DtypeName }[] = webgpu
    ? [
        { device: 'webgpu', dtype: 'q4' },
        { device: 'wasm', dtype: 'fp16' },
      ]
    : [{ device: 'wasm', dtype: 'fp16' }]

  let lastError: unknown = null
  for (const attempt of attempts) {
    try {
      console.info(`Loading EmbeddingGemma 2 on ${attempt.device} (${attempt.dtype})`)
      session = await createSession(attempt.device, attempt.dtype)
      const where = attempt.device === 'webgpu' ? 'WebGPU' : 'WASM'
      post({
        type: 'ready',
        info: {
          device: attempt.device,
          dtype: attempt.dtype,
          detail: `${where} · ${attempt.dtype} · text and vision`,
        },
      })
      return
    } catch (error) {
      lastError = error
      session = null
      console.warn(`EmbeddingGemma 2 failed on ${attempt.device} ${attempt.dtype}`, error)
    }
  }

  const message = lastError instanceof Error ? lastError.message : 'The model could not be loaded.'
  post({ type: 'error', message })
}

function vectorFrom(output: { sentence_embedding?: { data: Float32Array; dims: number[]; dispose?: () => void } }) {
  const tensor = output.sentence_embedding
  if (!tensor) throw new Error('The model did not return an embedding.')
  const dim = tensor.dims[tensor.dims.length - 1] ?? tensor.data.length
  const vector = new Float32Array(dim)
  vector.set(tensor.data.subarray(0, dim))
  tensor.dispose?.()
  let norm = 0
  for (let i = 0; i < vector.length; i++) norm += vector[i] * vector[i]
  norm = Math.sqrt(norm) || 1
  for (let i = 0; i < vector.length; i++) vector[i] /= norm
  return vector
}

async function embedText(text: string, role: 'query' | 'document') {
  if (!session) throw new Error('The model is not ready.')
  const prefixed = role === 'query' ? `task: search result | query: ${text}` : `title: none | text: ${text}`
  const inputs = await session.processor(prefixed)
  return vectorFrom(await session.model(inputs))
}

async function embedImage(data: ArrayBuffer, width: number, height: number) {
  if (!session) throw new Error('The model is not ready.')
  const image = new RawImage(new Uint8ClampedArray(data), width, height, 4)
  const inputs = await session.processor(null, image)
  return vectorFrom(await session.model(inputs))
}

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  const message = event.data
  if (message.type === 'init') {
    configureWasm(message.mjs, message.wasm)
    void init()
    return
  }

  void (async () => {
    try {
      const vector =
        message.type === 'embed-text'
          ? await embedText(message.text, message.role)
          : await embedImage(message.data, message.width, message.height)
      post({ type: 'result', id: message.id, vector })
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Embedding failed.'
      post({ type: 'failed', id: message.id, message: text })
    }
  })()
})
