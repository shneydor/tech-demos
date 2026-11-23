# Agent rules for tech-demos

This is Nir's **one sticky monorepo** for interactive tech demos. Every demo is played from a single GitHub Pages gallery. Never create a new repository per demo.

Gallery: https://shneydor.github.io/tech-demos/

## Scope

- Only add or update files under `apps/<kebab-slug>/`.
- Do not change root config, CI, the gallery generator, `AGENTS.md`, `skills/`, or `tracking/` unless the task explicitly says to.
- Each app is self-contained. Do not add cross-app dependencies or a hoisted workspace that couples demos together.
- Leave other apps alone.

## Plan first

Before writing application code:

1. Read and follow `skills/project-planning/SKILL.md`.
2. Write the plan to `apps/<kebab-slug>/PLAN.md`.
3. Then implement against that plan.

## Stack

- Use **Bun** for package management and scripts.
- The repo root has `bunfig.toml` with:

  ```toml
  [install]
  minimumReleaseAge = 259200
  ```

  Honor this. Run `bun install` so Bun can walk up to the root config (or copy the same constraint into the app if you must install in isolation).
- Prefer **client-only** demos. No server process should be required to play the demo on GitHub Pages.
- If an API key is needed, present a field in the UI, let the user paste it, and store it in `localStorage`. Never commit secrets or `.env` files with real keys.

## Build output

Every app with a `package.json` must define `bun run build` so that:

- Static files land in `apps/<kebab-slug>/dist`.
- Asset URLs use a **relative base path**, so the demo works at `https://shneydor.github.io/tech-demos/<kebab-slug>/`.
  - Vite: `base: './'`
  - Next.js: `output: 'export'` plus a relative `basePath` / `assetPrefix` that works under `/tech-demos/<kebab-slug>/` (prefer `base: './'`-style relative assets when the framework allows it).
- The built `index.html` and assets must work when opened from that subpath, including a refresh or a deep link.

Apps without a `package.json` are copied as-is (plain HTML/CSS/JS is fine). They still need `demo.json` and a playable `index.html`.

## Demo metadata

Every app must include `apps/<kebab-slug>/demo.json`:

```json
{
  "title": "Short title",
  "description": "One or two sentences.",
  "date": "YYYY-MM-DD",
  "sourceUrl": "https://example.com/inspiration-or-library"
}
```

The gallery lists demos from these files, newest `date` first. A card is one click to the demo.

## Pull requests

Every PR must attach **at least one screenshot** and **at least one video** of the running app. Do not open or merge a PR without both.

## Checks before you finish

- [ ] Files only landed under `apps/<kebab-slug>/` (unless explicitly asked otherwise).
- [ ] `PLAN.md` exists and matches what was built.
- [ ] `demo.json` is present and accurate.
- [ ] `bun run build` emits static files to `dist/` with a relative base path.
- [ ] The demo is playable with no server and no committed secrets.
- [ ] Screenshot and video of the running app are attached to the PR.
