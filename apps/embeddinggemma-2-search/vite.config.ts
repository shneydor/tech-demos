import { copyFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

const appRoot = dirname(fileURLToPath(import.meta.url))
function copyOrtWasm() {
  const from = join(appRoot, 'node_modules/onnxruntime-web/dist')
  const to = join(appRoot, 'public/ort')
  mkdirSync(to, { recursive: true })
  rmSync(join(to, 'ort-wasm-simd-threaded.asyncify.mjs'), { force: true })
  // Serve the factory as .js so GitHub Pages sends a JavaScript MIME type.
  copyFileSync(
    join(from, 'ort-wasm-simd-threaded.asyncify.mjs'),
    join(to, 'ort-wasm-simd-threaded.asyncify.js'),
  )
  copyFileSync(
    join(from, 'ort-wasm-simd-threaded.asyncify.wasm'),
    join(to, 'ort-wasm-simd-threaded.asyncify.wasm'),
  )
}

function ortAssets(): Plugin {
  return {
    name: 'ort-assets',
    buildStart: copyOrtWasm,
    configureServer: copyOrtWasm,
  }
}

// Relative base so the built demo works at /tech-demos/embeddinggemma-2-search/.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), ortAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['@huggingface/transformers'],
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 3000,
  },
})
