# Agent Think Map Replay

## Goal

Someone opens the gallery card and, in about a minute, replays one agent turn that fails beside the retry that works. Done means: both runs sit on Agent Think Map’s canvas, a click on any step shows its input, output, error, and timing, and a comparison of the two runs comes from the library’s own analyzer. The page says, in plain language, that the traces are a recorded synthetic replay checked at build time, and that nothing on the page is a live Claude, Codex, or SSE session.

## In scope

- One story. Prompt: “File a GitHub issue for the login form overflowing on 320px screens.”
- Failed run `run-login-skipped-skill`: the agent does not load `frontend-engineer`. It runs `Bash` `npm test`, which fails with a missing-script error, then `Grep`s `package-lock.json`, then answers as if the bug were already handled. The run stays failed because a node failed. The answer still appears, so a finished answer is not treated as success.
- Retry `run-login-skill-retry`: the same prompt. The agent reads `.claude/skills/frontend-engineer/SKILL.md` (the library classifies that Read as a skill), reads `src/Login.tsx`, delegates to a layout subagent, calls `github / create_issue`, and answers with issue #41.
- Build-time recording with the published package `agent-think-map@0.2.1` (tag `v0.2.1`, commit `5ee8ffc291b240518b5dfb439b617a3c7db9880b`):
  - `classifyToolName`, `reasonFor`, and `operationFromName` decide kind, title, reason, and captured operation.
  - `parseAgentTraceEvent` validates every event.
  - `parseTraceEnvelope` wraps each event (`provider: "custom"`, stable ids, no random UUIDs).
  - `reduceTraceAll` builds the canvas graph.
  - `compareRuns` from the shipped `packages/core/src/diff.ts` (it is not on the public entry) writes the alignment.
  - `redactSecrets` is applied to text fields before they are written.
- The script exits non-zero unless the failed run has a failed `npm test` step and no skill, the retry has a skill, a Read, a subagent, and an MCP call, and the alignment contains a missing skill plus an inserted Bash step.
- The page embeds `AgentSimulator` from `agent-think-map/react` twice, with the library stylesheet. Clicking a node uses the library inspector (Why, Input, Output, Error, Duration when `durationMs` is present).
- A comparison list shows each `compareRuns` row: classification, match basis, the two step titles, and the library’s reason. Clicking a row selects the matching node on each canvas.
- Guided controls: replay the failed run, inspect the Bash failure, replay the retry, show the missing skill, and jump to the analyzer’s first non-matched row.
- Honesty copy that stays on screen:
  - These events were authored for this page and then checked by the library. They were not captured from Claude Code or Codex.
  - The page does not open Studio, a hook, or an SSE stream.
  - `compareRuns` marks the first non-matched row from recorded evidence. The user steps are structural (a `run.started` node has no captured operation), so that first row can be the user step even when the prompt text is the same. The missing skill is a separate row. Alignment is an investigative lead, and the library’s warnings are shown.
  - The canvas inspector prints Duration only when the event included `durationMs`. `node.failed` has no such field. Elapsed time for that step is `completedAt - startedAt` from the reduced trace, labeled as timestamps.
  - A matched fingerprint does not mean the reasoning or answer text is identical. The text is on the step.
- `tracking/seen-bookmarks.json`: approved entry for post `2112787120813482361`, title Agent Think Map, url the X status, date `2026-11-27`, slug `agent-think-map-replay`. That file is the one allowed edit outside this app.

## Out of scope

- A live agent, an API key, Claude Code or Codex hooks, or Studio’s local server.
- Reimplementing the canvas, the protocol, or `compareRuns`.
- History import, Problems, bookmarks, or a database.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- Bun. `apps/agent-think-map-replay/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]`, matching the repo root. `0.2.1` was published `2026-09-06`, so the age gate allows it.
- Vite 7 + React 19 + TypeScript. `base: './'` so `bun run build` writes `apps/agent-think-map-replay/dist` with relative asset URLs for `/tech-demos/agent-think-map-replay/`.
- `agent-think-map@0.2.1` for the canvas, styles, protocol, reducer, and comparison. No Tailwind, so the library’s `.atc-*` rules stay intact.
- `bun run build` runs `scripts/record-runs.ts`, then `tsc -b`, then `vite build`. Playing the built page does not run the script again; it imports the JSON the script wrote.

## UX

- First screen shows both canvases already reduced (no empty state, no API key). The failed run is first, the retry second. The maps stack full width so fitView can show every step; the comparison cards stay side by side until the viewport is narrow.
- The provenance banner is above the canvases.
- Guided buttons replay one canvas by remounting `AgentSimulator` with `replay`. Inspect buttons and comparison rows click that run’s timeline chip (`button.atc-span`). The page does not pass `selectedNodeId`. After the first paint, a controlled selection fights the reducer: `run.started` resets the store to the user node, and the library’s selection effect calls `select` again, which exceeds React’s update depth. A timeline click uses the library’s own uncontrolled handler, and the page’s detail cards follow `onNodeSelect`.
- The comparison list sits with the canvases. The selected step’s input, output, error, and timing are repeated beside the list, including timestamp elapsed time for the failed step.
- If `replay.json` is missing a run, the page says the recorded trace could not be read. There is no invented fallback graph.
- Footer links: the GitHub repo, the hosted canvas, and the bookmarked post. MIT.

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `.gitignore`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `public/favicon.svg`
- `scripts/record-runs.ts`
- `src/data/replay.json` — events, envelopes, reduced nodes, and the `compareRuns` result
- `src/main.tsx`, `src/App.tsx`, `src/RunStage.tsx`, `src/index.css`, `src/vite-env.d.ts`, `src/replay.ts`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Record the two runs with the published package.
   - Acceptance: `bun scripts/record-runs.ts` exits 0; `src/data/replay.json` contains parsed events for both run ids, a failed Bash step and no skill on the failed run, a skill plus Read plus subagent plus MCP on the retry, and `compareRuns` rows that include a missing skill and an inserted Bash step.
   - Dependencies: none.
2. Scaffold the Vite app with relative `base`, `demo.json`, and `bunfig.toml`, and embed two `AgentSimulator` canvases.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative, and the page imports `agent-think-map/react` and `agent-think-map/styles.css`.
   - Dependencies: task 1 for the JSON the page imports. Scaffold files can be written with the plan; the build is green only after task 1.
3. Guided replay, inspector selection, and the comparison list, including the recorded-versus-live banner.
   - Acceptance: the built page shows both run titles, the missing-script error, the skill title, and a comparison row whose classification is `missing` or `inserted`. The banner states that the replay is recorded and not a live session.
   - Dependencies: tasks 1 and 2.
4. Play the built files under a `/tech-demos/agent-think-map-replay/` subpath. Click a failed step, a retry step, and a comparison row.
   - Acceptance: assets load from the subpath; the library inspector shows input or error for the clicked step; the comparison row selects a node.
   - Dependencies: task 3.

## Risks

- `compareRuns` is not exported from the package entry. Mitigation: import the shipped `packages/core/src/diff.ts` by filesystem path from the script only. The browser bundle does not import it.
- The analyzer’s first non-matched row may be the user step, because that node has no captured operation. Mitigation: show that row and the library warning, and point the guided “missing skill” control at the skill row.
- `node.failed` does not carry `durationMs`, so the canvas inspector omits Duration. Mitigation: show elapsed time from reduced timestamps and say where it came from.
- Two canvases side by side, with the inspector beside the graph, hit the library’s minimum zoom and hide later steps. Mitigation: stack the maps, put the inspector under the graph, and keep a 760px minimum map width on narrow screens so the stage can scroll sideways.
- Absolute asset paths 404 under `/tech-demos/agent-think-map-replay/`. Mitigation: Vite `base: './'`.
- The library stylesheet requests Excalifont from jsDelivr. Mitigation: the font is optional; the canvas falls back to Segoe UI. This page does not add another remote runtime.
- GitHub Pages has no Node. Mitigation: commit `replay.json` and import it. The client never imports `compareRuns`.

## demo.json (draft)

- `title`: Agent Think Map Replay
- `description`: A recorded login-bug run skips a skill and calls the wrong tool. Replay it beside the retry on Agent Think Map’s canvas, then click any step for its input, output, error, and timing.
- `date`: 2026-11-27
- `sourceUrl`: https://github.com/nimrodfisher/agent-think-map
