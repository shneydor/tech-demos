import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the built demo works at /tech-demos/huashu-motion/.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
