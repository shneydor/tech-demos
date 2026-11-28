# Huashu Motion

## Goal

A visitor opens the gallery card and, in one sitting, presses play on a real huashu-motion film, then walks a point-at-a-frame edit that the tool itself recorded. Done means: Tea Across the Ages (the published `examples/showcase` film) draws in the browser through the official player, and a second control replays one real `om inbox` packet plus the stills `om look` saved for that comment. The page says which part is live and which part is a recording. No server, no key, no agent.

## In scope

- Live playback of the published showcase, Tea Across the Ages (15 art-history eras, one cat, 1920×1080, 14.358125 s). Every frame is the film's own canvas engine. The player is upstream `runtime/om-player.js` driving `runtime/om-engine.js`, injected the same way `om export html` injects it (`window.__omConfig={video:"live",lenient:true}`).
- Scene strip and clock taken from that live player (the film's GSAP `scene:` labels and `currentTime`), not from a fake timeline.
- A recorded replay of one comment captured with the real CLI against that film: `addComment` from `cli/lib/inbox.js`, then `om inbox --wait` (the `describe()` packet, including the source line of `OM.region('title', …)`), then `om look` (frame PNG and a close-up around the click). The walk seeks the live player to that comment's time and draws the pin on the live `#title` region.
- Honest labels. The picture is live. The comment text, inbox printout, and look stills are a recording from the commands below. `om done` was not run. Nothing rewrites `index.html`. No agent is answering.
- The published composition variables (title, signature, finale year, credit) shown as read from `om scan`. They are not editable here: changing them is `om set`, which rewrites the source.
- A line that this copy has no soundtrack. The showcase HTML does not declare `OM.music`, and `om sound` / `om render` were not run. Upstream documents that the browser player does not synthesize the score.
- Footer: MIT, the pinned commit, links to the repository and to the showcase source.
- `tracking/seen-bookmarks.json`: approved entry for the source bookmark. That file is the one allowed edit outside this app.

## Out of scope

- Running an agent, the studio server, Chrome, or FFmpeg on GitHub Pages.
- A free-text comment box that pretends to call an agent.
- Rendering an MP4. The published film is HTML; the page plays that HTML.
- Live edits of variables or of the canvas source.
- Narration, the voice demo, or the music library.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- Bun. `apps/huashu-motion/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]` before `bun install`, matching the repo root.
- Vite + React + TypeScript. `base: './'` so `bun run build` writes `apps/huashu-motion/dist` with relative asset URLs for `/tech-demos/huashu-motion/`.
- Tailwind CSS 4 for the page chrome. No shadcn: the page is one screen, and the film player is upstream code.
- The film, player, and engine are copied from huashu-motion `f4f38bfe295a3f768753857be9236cc3277c7dad` (tag `v0.6.1`, published 2026-11-23). Licenses travel with the copy: MIT for the project and the art-motion engine, GSAP Standard License, SIL OFL 1.1 for the fonts.

`bun run build` is `tsc -b && vite build`. It does not clone, render, or call Chrome. The capture below is committed.

## How the film and the comment were captured

Pinned tree: https://github.com/alchaincyf/huashu-motion/tree/f4f38bfe295a3f768753857be9236cc3277c7dad

From a depth-1 clone of that commit:

```bash
rm -rf /tmp/tea && mkdir /tmp/tea && cp -a examples/showcase/. /tmp/tea/
# addComment() in cli/lib/inbox.js — the same function the studio's POST /api/comments uses
node cli/om.js inbox /tmp/tea --wait --timeout 30
node cli/om.js look <id> /tmp/tea
node cli/om.js scan /tmp/tea
node cli/om.js export html /tmp/tea --out /tmp/tea-share --title "Tea Across the Ages"
```

The comment passed to `addComment`:

- text: `The opening title sits too low and too quiet. Lift it and give it more weight. Leave the cat and the year card alone.`
- t: `0.55` (the title region exists only while `t < 1.13`, scene `01_cave`)
- x, y: `900`, `980` (inside the published title box `[480, 945, 960, 100]`)
- target: `title`
- scene: `01_cave`
- variables: the four defaults declared on the film (`TEA ACROSS THE AGES`, `Opus 5.5`, `2026`, `true`)

That text is the note recorded for this demo. The time, target, scene, source line, and PNGs are what the CLI printed back. `om done` is intentionally not called, so the inbox stays at `working` and no reply is invented.

`om export html` writes `film/index.html` with the engine tag, plus `player/om-player.js` and `player/om-engine.js`. Those three trees are what the page serves. The share-page `index.html`, `source.zip`, and the export's UI fonts are not copied.

`om look` needs Chrome. It ran once on this machine (Chrome 157) through a `--no-sandbox` wrapper, because the capture user is not root and the CLI only adds that flag for uid 0. The CLI itself was not modified. The PNGs are committed so Pages never launches a browser.

## UX

- First screen: the film at frame 0, a Play control, and a short banner. Play starts the official player from the beginning. Space toggles play when focus is not in a button that already handles it.
- The scene strip lists the live `scene:` labels. The current one follows the playhead. Seeking is the player's own control plus the strip (click a scene, seek to its start).
- "Walk the edit" pauses, seeks to 0.55 s, and steps the recorded comment: the comment tool, the pin on `#title`, the note, the verbatim inbox printout, then the frame and close-up from `om look`. Next and Back move one step. Replay returns to the film at frame 0.
- Badges: Live on the player, Recorded on the edit column.
- Empty: there is no empty library. The film and the capture ship with the page.
- Error: if the player fires `error` or never reaches `ready`, the stage shows that message and says the film has to be served with the page (the upstream player refuses a cross-origin frame). The edit column still shows the recorded packet. If a look PNG fails to load, that step says the still could not be read.

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `.gitignore`
- `public/film/` — exported showcase (`index.html` with the engine injected, `vendor/`, `assets/`)
- `public/player/om-player.js`, `public/player/om-engine.js`
- `public/capture/frame.png`, `public/capture/zoom.png` — `om look`
- `public/favicon.svg`
- `src/data/comment.json` — the comment object after `om inbox --wait` claimed it
- `src/data/inbox.txt` — verbatim `describe()` printout
- `src/data/scan.json` — `om scan`
- `src/data/provenance.json` — commit, version, commands, the note that was sent
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/player.ts` — element type for `<om-player>`
- `src/capture.ts` — the committed JSON, the inbox text, and the still URLs
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Capture the film and one comment with the real CLI, and commit the outputs under `public/`.
   - Acceptance: `public/film/index.html` contains `__omConfig` and `om-engine.js`; `src/data/inbox.txt` names the comment id, `0.55s`, scene `01_cave`, `#title`, and a source line that calls `OM.region('title'`; `public/capture/frame.png` and `zoom.png` are non-empty PNGs; `src/data/provenance.json` records commit `f4f38bfe295a3f768753857be9236cc3277c7dad`.
   - Dependencies: none.
2. Scaffold the Vite React TS app with relative `base`, `demo.json`, and `bunfig.toml`.
   - Acceptance: `bun run build` writes `dist/index.html` whose script URL is relative, and `dist/film/index.html` and `dist/player/om-player.js` are present.
   - Dependencies: task 1 for the public files. The scaffold itself can be written once this plan file exists.
3. Player and edit replay.
   - Acceptance: opening the built app shows the film and a Play control; Play moves the clock; Walk the edit seeks to 0.55 s, shows the recorded note and the inbox text, and shows both stills; the banner distinguishes live playback from the recording.
   - Dependencies: tasks 1 and 2.
4. Play the built files under a `/tech-demos/huashu-motion/` subpath.
   - Acceptance: the player reaches ready (the engine script loads); Play draws a later era; Walk the edit still finds the capture files.
   - Dependencies: task 3.

## Risks

- Absolute asset paths would 404 under `/tech-demos/huashu-motion/`. Mitigation: Vite `base: './'`, and the film's engine tag is the relative `../player/om-engine.js` that `om export html` writes. Capture URLs use `import.meta.env.BASE_URL`.
- The upstream player waits for `__omReady` and fails if the engine is missing or the frame is cross-origin. Mitigation: serve `film/` and `player/` from the same origin; show the player's error text.
- A visitor can think the edit changed the film. Mitigation: the recorded column says the source was not rewritten, `om done` was not run, and Play still shows the original title.
- The comment note was written for this capture, not copied from a published inbox. Mitigation: `provenance.json` and the page say so. The CLI output around that note is unmodified.
- GitHub Pages has no Chrome. Mitigation: commit the export and the look PNGs. `bun run build` only bundles them.
- GSAP and the fonts are not MIT. Mitigation: keep `vendor/GSAP-LICENSE.txt`, `vendor/art-motion/LICENSE`, `vendor/art-motion/NOTICE.md`, and `assets/fonts/OFL.txt` in the copy.

## demo.json (draft)

- title: Huashu Motion
- description: Press play on Tea Across the Ages, the published huashu-motion example, drawn live in the browser. Then replay one real point-at-a-frame comment: the inbox packet and the stills om look saved.
- date: 2026-11-28
- sourceUrl: https://github.com/alchaincyf/huashu-motion
