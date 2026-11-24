# EmbeddingGemma 2 search

## Goal

A visitor opens the gallery card and, in one sitting, searches their own photos and short notes with Google DeepMind's EmbeddingGemma 2 running entirely in the browser. Done means: the model loads with a visible progress bar, Load samples fills the library, and a query such as "dog on a beach" re-ranks every photo and note by cosine similarity, with the same items drawn on a 2D PCA map.

## In scope

- Client-only playground. No server, no API key, no account.
- Add photos (drop or file picker) and short notes. Each item is embedded as it is added.
- Load samples button: bundled photos plus notes, so the demo works in one click.
- Live ranking while the query is typed. Scores are cosine similarity in the shared 768-d space.
- Small 2D PCA scatter of the library, with the current query projected into the same basis.
- Download progress for model files. WebGPU when the adapter is a real GPU, otherwise WASM. Software adapters such as SwiftShader are treated as WASM.
- Static `bun run build` into `dist/` with Vite `base: './'`.

## Out of scope

- A backend, accounts, or committed secrets.
- Audio and video embedding, even though the model supports them.
- IndexedDB persistence, offline service worker, query-by-image, and a dimension slider.
- Changing the gallery, CI, root config, or other apps. The only file outside this folder is the approved bookmark entry.

## Stack

- Bun — repo package manager. `bunfig.toml` in this app sets `minimumReleaseAge = 259200` before install, matching the root constraint.
- Vite + React + TypeScript — `bunx create-vite` SPA so `base: './'` emits relative asset URLs for `/tech-demos/embeddinggemma-2-search/`.
- shadcn/ui (button, input, textarea, progress, card, badge only) — accessible controls themed to the gallery palette, without a second design system.
- `@huggingface/transformers@4.3.2` — current stable Transformers.js v4 (published 2026-10-28). It knows the `embedding_gemma2` architecture.
- `onnx-community/embeddinggemma-2-ONNX` — verified model card includes the image path via `AutoProcessor` + `vision_encoder`. Audio config is removed so the download is text + vision only. WebGPU uses `q4` (~175 MB text + ~109 MB vision). WASM uses `fp16` (~543 MB text + ~336 MB vision): Transformers.js 4.3.2's WASM runtime has no `GatherBlockQuantized` kernel, and a failed q4 session leaves that runtime unusable.

`bun run build` is Vite's build. Output is `apps/embeddinggemma-2-search/dist`. ONNX Runtime WASM is bundled from `onnxruntime-web` so GitHub Pages does not depend on a third-party CDN for the runtime. `numThreads` stays 1 because Pages does not send COOP/COEP.

## UX

- First screen: title, device line, and a progress bar while weights download. The search box, drop zone, and Load samples stay disabled until the session is ready. A short line states the approximate download size.
- Main interaction: one search field. Each keystroke (debounced) embeds `task: search result | query: …` and sorts the library. Notes are embedded as `title: none | text: …`. Photos are passed to the processor with no task prefix.
- Empty library: a prompt to drop a photo, write a note, or load samples. The map asks for at least two embedded items.
- Errors: model load failure shows the message and a retry. A single item that fails to embed stays in the list with that error and is skipped by search.
- No API key field.

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `components.json`
- `public/samples/` — JPEG photos and the sample manifest
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/lib/utils.ts`, `src/lib/pca.ts`, `src/lib/samples.ts`
- `src/embed/worker.ts`, `src/embed/useEmbedder.ts`, `src/embed/types.ts`
- `src/components/ui/{button,input,textarea,progress,card,badge}.tsx`
- `src/components/{SearchPanel,Library,Composer,MapView}.tsx`

## Tasks

1. Scaffold the Vite React TS app with relative `base`, shadcn tokens, `demo.json`, and `bunfig.toml`.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative.
   - Dependencies: none.
2. Model worker: pick WebGPU or WASM, load text + vision, report file progress, embed one text or one image at a time.
   - Acceptance: a ready message names the device and dtype; a text call returns a 768-d vector; progress events fire before ready.
   - Dependencies: task 1.
3. Library and live search: add notes, load sample notes, rank by cosine as the query changes.
   - Acceptance: with the model loaded, typing a query reorders notes and shows a numeric score; an empty query lists notes without scores.
   - Dependencies: task 2.
4. Photos: drop zone, file picker, sample images, per-item thumbnail and embed status.
   - Acceptance: Load samples adds the bundled photos and notes; after embedding, "dog on a beach" ranks the beach dog photo first.
   - Dependencies: task 3.
5. PCA map: fit two components on embedded items and project the query into that basis.
   - Acceptance: with two or more ready items the map shows one point per item; a query adds a distinct marker without moving the item points.
   - Dependencies: task 3. Can land in parallel with task 4 once vectors exist.
6. Empty, error, and retry states; confirm the production build under a subpath.
   - Acceptance: failed init can be retried; opening `dist` from a parent folder still loads assets; a sample query shows ranked results.
   - Dependencies: tasks 4 and 5.

## Risks

- First visit downloads hundreds of megabytes from Hugging Face. Mitigation: progress bar with loaded/total bytes, browser cache on later visits, audio encoder omitted.
- WASM rejects `q4` (`GatherBlockQuantized`) and a failed session sticks. Mitigation: load `fp16` directly on WASM; embed one image at a time.
- A software WebGPU adapter (SwiftShader) accepts the session but spends minutes on one photo. Mitigation: ignore fallback and software adapters and use WASM.
- WebGPU batches above ~2,700 tokens throw. Mitigation: one image per call, default vision budget (280 soft tokens).
- GitHub Pages and missing cross-origin isolation. Mitigation: WASM thread count 1, relative Vite base, no server routes.
- Absolute asset paths would 404 under `/tech-demos/<slug>/`. Mitigation: `base: './'` and `import.meta.env.BASE_URL` for samples.

## Deferred

- Audio and video, including the soundtrack of a video.
- Saving the library in IndexedDB and embedding it again after refresh.
- Matryoshka truncation control (128/256/512/768) with re-normalization.
- Search by dropping a query image.
- Service worker so the shell works offline after the first load.
- Multithreaded WASM if Pages ever sends COOP/COEP.

## demo.json (draft)

- title: EmbeddingGemma 2
- description: Drop in photos and notes, then search them in the browser. EmbeddingGemma 2 maps every item into one space and ranks matches live.
- date: 2026-11-24
- sourceUrl: https://x.com/mmastrac/status/2115098609356284223
