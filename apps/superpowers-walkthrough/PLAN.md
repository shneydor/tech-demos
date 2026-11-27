# Superpowers Walkthrough

## Goal

Someone opens the gallery card and, in under a minute, walks one small feature through the Superpowers methodology: brainstorm, plan, test-driven development, a subagent handoff, and review. Each step shows the skill file from [obra/superpowers](https://github.com/obra/superpowers) beside a session transcript. A second view lists every skill in that repo so the files can be read in the browser. Done means the page is static, plays with no server, and the transcript says whether each step was recorded from a real agent run or is illustrative.

The bookmark that prompted this demo is Nimrod Fisher's post (https://x.com/FisherNimrod/status/2112787120813482361). He names Superpowers as still useful for brainstorming and for complex work broken into subagent-driven development. The same post also names Agent Think Map; that is a different demo and is not built here.

## In scope

- A five-step walkthrough of one feature, **skim**: a pure function that takes a paragraph and a word cap and returns the word count, whether the paragraph is over budget, and a headline clipped to that cap. The feature is the thing the skills were applied to. It is small on purpose so red/green TDD and a two-task handoff fit on one screen.
- Steps, in order, each bound to the real skill file at commit `22f0b463e7a5e579904dd6211a520321035526f7` (release v7.0.2, 2026-11-03):
  1. **Brainstorm** — `skills/brainstorming/SKILL.md`
  2. **Plan** — `skills/writing-plans/SKILL.md`
  3. **TDD** — `skills/test-driven-development/SKILL.md`
  4. **Handoff** — `skills/subagent-driven-development/SKILL.md`
  5. **Review** — `skills/requesting-code-review/SKILL.md`
- Side-by-side layout: skill text on one side, transcript on the other. Next and Back move between steps. The full skill markdown is scrollable, not a paraphrase.
- Transcript provenance, stated on the page: the session is recorded while building this demo by reading those skill files and carrying the skim brief through them, including a fresh coding subagent for the handoff task and a fresh reviewer subagent for the review. Commands and test output that appear are copied from that run. Any step that could not be run that way is labeled **illustrative** in the data and in the UI. Steps that were run are labeled **recorded**.
- The skim contract the session implements (the brief the agent is given, so the page and the transcript describe the same function):
  - `skim(text: string, maxWords: number)` returns `{ words, maxWords, status, headline }`.
  - Words split on whitespace. Empty text has 0 words, status `"ok"`, headline `""`.
  - `status` is `"over"` when `words > maxWords`, otherwise `"ok"`.
  - `maxWords` must be an integer greater than or equal to 1; otherwise the function throws `TypeError`.
  - `headline` is `text` with whitespace collapsed to single spaces, clipped to `maxWords` words. A clip ends with one ellipsis character `…`. An unclipped headline has no ellipsis.
  - No HTML parsing, sentence detection, or stemming.
  - Two tasks, so the handoff is a second task rather than the whole feature: (1) count, status, and validation; (2) headline clip.
  - Tests use `bun:test`. Implementation is TypeScript with no runtime dependencies.
- A **Try skim** control on the walkthrough: a text area, a word cap, and the result of the same function, so the recorded code runs in the page.
- A browsable index of all 15 skills at that commit, extracted from the real `SKILL.md` files (name, description, path, full body). Grouped the way the README groups them (Testing, Debugging, Collaboration, Meta). Search filters by name and description. A search with no hits says so. Opening a skill shows its full text.
- Hash routes so a refresh under `/tech-demos/superpowers-walkthrough/` keeps the step or the skill: `#/walk/<step>` and `#/skills` and `#/skills/<name>`.
- `tracking/seen-bookmarks.json`: one approved entry, id `2112787120813482361`, title Superpowers, url the post above, date `2026-11-27`, slug `superpowers-walkthrough`. That file is the one edit outside this app.
- Footer: MIT, copyright Jesse Vincent, link to the repo and to the post. No Prime Radiant telemetry image.

## Out of scope

- Running a coding agent when the gallery page loads, or on every `bun run build` in GitHub Actions. The recording happens once while this demo is built. The Pages site only replays it.
- Installing Superpowers into a harness, the visual-companion server, git worktrees as a sixth step, systematic debugging as a walkthrough step, or finishing-a-development-branch. Those skills stay in the index.
- A live model, an API key, or a server.
- Agent Think Map, Trove, or Caliboard.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- Bun. `apps/superpowers-walkthrough/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]`, matching the repo root, before `bun install`.
- Vite + React + TypeScript. `base: './'` so `bun run build` writes `apps/superpowers-walkthrough/dist` with relative asset URLs for `/tech-demos/superpowers-walkthrough/`.
- Controls are styled in the app stylesheet. No component library beyond Vite and React.
- Skill catalog: `scripts/extract-skills.ts` reads a local checkout of superpowers (default `/tmp/superpowers` at the pinned commit) and writes `src/data/skills.json`. The JSON is committed. `bun run build` does not clone GitHub and does not need the checkout.
- Session: `src/data/session.json` is written by hand from the recorded run (transcript turns, provenance, the skim source that the page executes). `scripts/session/` holds the scratch feature's tests and source as they were produced, so the recording can be re-read. The page imports `session.json` and `skills.json` only.

`bun run build` is `tsc -b && vite build`. Playing the demo does not run Bun tests or an agent.

## UX

- First screen is walkthrough step 1 (Brainstorm). A line under the title states the pin (`22f0b463`, v7.0.2) and whether the open step is recorded or illustrative.
- A rail of five steps. The current step is obvious. Next and Back, and the rail, all move the hash.
- Left panel: skill name, one-line description, link to the file on GitHub at the pin, and the full markdown in a scroll area.
- Right panel: the transcript as turns (partner, agent, subagent, command). Command turns show the command and the output from the run.
- Below the split: Try skim. Empty text shows 0 words and an empty headline. A non-integer cap shows the TypeError message instead of a result. The control does not call a network.
- Skills view: list with group labels, a search box, and the selected skill's full text. Empty search result is a short sentence, not a blank page.
- Footer links: the Superpowers repo, the skill file for the open step (or the skills directory on the index), and the bookmark post. A back link returns to the gallery (`../`).

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.gitignore`
- `scripts/extract-skills.ts`, `scripts/build-session.ts`
- `scripts/session/` — the recorded scratch feature (spec, plan, tests, source, logs, task brief) and a short `README.md` saying how the session was run
- `src/data/skills.json`, `src/data/session.json`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/lib/skim.ts` — the function the Try skim control runs, copied from the recorded implementation
- `src/lib/routes.ts`, `src/lib/types.ts`, `src/lib/markdown.tsx`
- `src/components/Walkthrough.tsx`, `src/components/SkillIndex.tsx`, `src/components/TrySkim.tsx`
- `public/favicon.svg`
- `tracking/seen-bookmarks.json` — the one approved entry

## Tasks

1. Extract the skill catalog from the pinned checkout.
   - What: run `scripts/extract-skills.ts` against `/tmp/superpowers` at `22f0b463e7a5e579904dd6211a520321035526f7`.
   - Acceptance: `src/data/skills.json` lists exactly the 15 `skills/*/SKILL.md` files, each `body` equal to that file, each `sourceSha` equal to that commit, and the five walkthrough skills present.
   - Dependencies: none.

2. Record the skim session by following the five skills.
   - What: read each skill, produce the brainstorm design and the writing-plans document, implement task 1 with a failing test first and keep the failing and passing command output, dispatch a fresh subagent for task 2 (headline) with the plan and spec and without the coordinator's earlier transcript, then dispatch a fresh reviewer subagent with the requesting-code-review template (description, requirements, base and head SHAs). Save the turns in `src/data/session.json` and the scratch files under `scripts/session/`.
   - Acceptance: the TDD step contains a real failing `bun test` output and a later passing one; the handoff step names the subagent's task-2 work and not a paste of task 1; the review step contains the reviewer's findings; each step's `provenance` is `recorded` or `illustrative`, and the page will show that word. The scratch tests pass.
   - Dependencies: task 1 is independent. Task 2 needs the skill files only as reading material (the checkout), not the JSON.

3. Scaffold the Vite app and the two views.
   - What: package, relative `base`, `demo.json`, hash routing, walkthrough, skill index, Try skim.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative (`./assets/...`). Opening the built files shows step 1's skill title "Brainstorming" and a transcript turn. The skills view lists all 15 names from the JSON.
   - Dependencies: tasks 1 and 2 for the data files. Scaffolding can start once this plan file exists; the views need the JSON before they can show content.

4. Play the built app under a `/tech-demos/superpowers-walkthrough/` subpath.
   - What: serve `dist` at that prefix, click every step, open the skill index, search, run Try skim on an over-budget paragraph and on a bad cap.
   - Acceptance: assets load; the hash survives a reload; Try skim reports `over` for a paragraph past the cap and shows the TypeError for a bad cap; search with no match shows the empty sentence.
   - Dependencies: task 3.

## Risks

- A transcript written from memory would claim a run that did not happen. Mitigation: copy commands and subagent replies from the run; mark anything reconstructed as illustrative.
- Skill files are long. Mitigation: independent scroll on the skill panel, full text still in the page.
- Absolute asset paths 404 under `/tech-demos/superpowers-walkthrough/`. Mitigation: Vite `base: './'` and hash routing, which needs no server rewrite.
- GitHub Actions `bun run build` has no checkout of obra/superpowers. Mitigation: commit `skills.json` and `session.json`. The extract script is for refresh, not for CI.
- Skill text is MIT (Copyright 2025 Jesse Vincent). Mitigation: keep the license notice in the footer and in `skills.json`.
- The Pages build must not need a model API. Mitigation: no key, no fetch of a model at build or at runtime.

## demo.json (draft)

- `title`: Superpowers Walkthrough
- `description`: One small word-budget function, taken through Superpowers from brainstorm to plan, TDD, a subagent handoff, and review. Each step pairs the real skill text with a recorded session, and every skill in the repo is browsable.
- `date`: 2026-11-27
- `sourceUrl`: https://github.com/obra/superpowers
