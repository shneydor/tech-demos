# HyperFrames

## Goal

A visitor opens the gallery card and, in one sitting, plays a short HTML animation next to the MP4 HyperFrames rendered from that same file. One playhead drives both. They can read the composition source, and the page hashes two separate renders of each clip in the browser. Done means the live pane and the video stay in step, the labels say which is which, and the hash rows show whether those two files are byte-identical.

## In scope

- Three short compositions (about 4 seconds, 1280×720, 30 fps). Each is one HTML file: a paused GSAP timeline registered on `window.__timelines` under `data-composition-id`, motion on transform and opacity only, no `Date.now`, no `Math.random`, no network inside the composition.
- A build-time render. `bun run render` invokes the HyperFrames CLI (pinned to 0.9.93, the newest release that clears the repo's 3-day `minimumReleaseAge` on 2026-11-28) twice per composition and writes both MP4s plus `media/manifest.json`. Those files are committed. `bun run build` runs that render when any MP4 is missing or when `HYPERFRAMES_RERENDER=1`. A later rebuild with the files already present only copies them, so a fresh FFmpeg creation time does not rewrite the committed videos.
- A static page, relative URLs only (`./`), that shows the live composition in an iframe beside the pre-rendered MP4. One play/pause control and one scrubber seek both.
- A source panel with the composition HTML.
- A determinism panel. The browser SHA-256s both MP4s. If the bytes match, it says so. If they do not, it says they do not, and it shows the build's decoded-frame comparison (`ffmpeg -f framemd5`) so a timestamp in the container is not described as a different picture.
- Honest labels: the live pane is the HTML running here; the video is a file HyperFrames captured at build time and committed. The page does not claim the live pixels match the video.
- `demo.json` and this plan. One new entry in `tracking/seen-bookmarks.json` for the source bookmark.

## Out of scope

- A server, an account, an API key, or cloud render.
- Docker renders. HyperFrames documents `--docker` for cross-machine byte identity. This demo only claims what two back-to-back renders on the build machine actually produced.
- Re-rendering on GitHub Actions. That workflow installs Bun and does not install Node 22 or FFmpeg. If `node` or `ffmpeg` is missing and the committed MP4s are present, `bun run build` copies them and still emits `dist/`.
- The Studio app, catalog blocks, audio, captions, and nested compositions.
- Editing the gallery generator, CI, root config, or any other app.

## Stack

- Bun for install and scripts. `apps/hyperframes/bunfig.toml` repeats `minimumReleaseAge = 259200`.
- Plain HTML, CSS, and JS for the page. No Vite. `bun run build` copies the page, compositions, font, GSAP, and MP4s into `dist/` with relative URLs, which is the `base: './'` equivalent for a file copy.
- `hyperframes@0.9.93` as a dependency. The render script runs it with Node 22 (`node_modules/.bin/hyperframes`), because the CLI requires Node ≥ 22. Node is present on the machine that produces the committed MP4s.
- `gsap@3.12.7`, copied to `compositions/vendor/gsap.min.js` so the composition and the published page do not fetch a CDN.
- Syne (SIL Open Font License) as a local `@font-face`, so the live page and the render share a font file instead of the viewer's system fonts.

## UX

- First screen: title, one sentence on what is live versus pre-rendered, and three composition tabs. The first composition is selected, paused at 0.
- Main interaction: Play seeks both panes from the shared clock. The video element is the clock while playing; each frame seeks the GSAP timeline in the iframe to `video.currentTime`. Pause freezes both. The scrubber pauses, then sets both times. At the end, Play starts from 0 again. The video loops only when the visitor asks, not on its own.
- Source sits under the stage and updates with the selected composition.
- Determinism sits under the transport: "Hashing…", then either "Byte-identical" with both SHA-256 lines, or both hashes plus a plain sentence that the files differ and whether the build's frame hashes matched.
- Empty and error: a composition whose timeline is missing shows that in the live pane. A hash that fails to load shows the error on that row. No API key field.
- Narrow viewport: the two panes stack. The play control stays one control for both.

## File structure

- `PLAN.md`, `demo.json`, `package.json`, `bunfig.toml`, `bun.lock`, `.gitignore`
- `index.html`, `styles.css`, `main.js` — the gallery page
- `compositions/signal.html`, `compositions/orbit.html`, `compositions/bars.html`
- `compositions/vendor/gsap.min.js` — copy of the pinned GSAP build
- `compositions/fonts/Syne[wght].ttf`, `compositions/fonts/OFL.txt`
- `media/*-a.mp4`, `media/*-b.mp4`, `media/manifest.json` — committed render output
- `scripts/render.ts` — lint, render twice, hash, framemd5, write the manifest
- `scripts/build.ts` — render when Node and FFmpeg exist, then copy a static `dist/`

`tracking/seen-bookmarks.json` gains one approved entry. Nothing else outside `apps/hyperframes/` changes.

## Tasks

1. Scaffold `package.json`, `bunfig.toml`, `demo.json`, and `.gitignore`.
   - Acceptance: `bun install` resolves `hyperframes@0.9.93` and `gsap@3.12.7` under the age gate.
   - Dependencies: none.
2. Write the three compositions and vendor GSAP plus Syne.
   - Acceptance: each file has a root `data-composition-id`, `data-duration="4"`, `data-width="1280"`, `data-height="720"`, `data-fps="30"`, and a paused timeline on `window.__timelines` under that id. `hyperframes lint` reports no errors. Opening the file shows a still of the first frame, not a wall-clock animation.
   - Dependencies: task 1.
3. Render each composition twice and write `media/manifest.json`.
   - Acceptance: six MP4s exist. The manifest records both SHA-256s, whether the bytes match, and whether `framemd5` matches. The render script exits non-zero if frame hashes differ.
   - Dependencies: task 2.
4. Static page: tabs, side-by-side stage, one transport, source, determinism hashes.
   - Acceptance: Play moves the live timeline and the video together; scrubbing either direction keeps them on the same time; the source is the selected file; labels distinguish live HTML from the pre-rendered MP4; the hash rows are computed in the page.
   - Dependencies: task 3 for the MP4s. The page can be built against task 2 and wired to media paths before the renders finish.
5. `bun run build` emits `dist/` with relative URLs, including the MP4s.
   - Acceptance: `dist/index.html` references `./styles.css` and `./main.js`. `dist/media/` contains both renders of each clip. With Node or FFmpeg absent and `media/` already filled, build still produces that `dist/` and does not delete the committed MP4s. With the MP4s present, build does not call HyperFrames unless `HYPERFRAMES_RERENDER=1`.
   - Dependencies: tasks 3 and 4.
6. Play the built page in a browser at desktop and a narrow width.
   - Acceptance: switching compositions resets to 0 and pauses; play, pause, and scrub stay in sync; the narrow layout stacks the panes without a second play button; hash status resolves for the selected clip.
   - Dependencies: task 5.

## Risks

- FFmpeg writes a creation time, so two visually identical renders may not be byte-identical. Mitigation: compare bytes and decoded frames, and let the page say which one matched. Do not rewrite the MP4s to force a hash match.
- x264 thread slicing can change the bitstream. Mitigation: same check. Frame equality is the floor; byte equality is shown only when the files match.
- GitHub Actions has Bun and not Node or FFmpeg, so a render inside `bun run build` would fail and the workflow would skip the demo. Mitigation: if the toolchain is missing and `media/*.mp4` is already committed, build only copies. The committed files are the ones HyperFrames wrote.
- A live browser can rasterize the same font a pixel differently from the pinned Chrome HyperFrames captured. Mitigation: the copy says the determinism check compares the two MP4s, not the live pane to the video.
- Absolute asset paths 404 under `/tech-demos/hyperframes/`. Mitigation: every URL in the page and compositions is relative. No `<base href>` that would retarget the gallery link.
- GSAP from a CDN would make the render depend on the network and the published page depend on jsDelivr. Mitigation: vendor the file.
- `minimumReleaseAge` rejects `hyperframes@latest` (0.9.104 was published 2026-11-27). Mitigation: pin 0.9.93 (published 2026-11-25T02:55:36Z).

## demo.json (draft)

- `title`: HyperFrames
- `description`: Short HTML animations beside the MP4s HyperFrames rendered at build time, driven by one playhead. The page hashes two renders of each clip in the browser.
- `date`: 2026-11-28
- `sourceUrl`: https://github.com/heygen-com/hyperframes
