# Skills Atlas

## Goal

A gallery visitor opens one card and, in under a minute, browses every skill in Matt Pocock's [skills](https://github.com/mattpocock/skills) pack, filters who can invoke each one, and sees how they chain. Done means the page is a static atlas generated from the real `SKILL.md` files, plus a walkthrough of one chain — `/grill-me`, then `/to-spec`, then `/to-tickets` — on a small reading-list feature, with the skill text beside the recorded session.

## In scope

- Pin `mattpocock/skills` at commit `6f7f7831a625f040a8e06a0e7954826b87ce775a` (package version 1.3.2, MIT). Copy every `skills/**/SKILL.md` into this app and generate the atlas from those files. The published pack is engineering + productivity (27 skills). In-progress and misc ship too, behind filters, so "every skill" is the whole tree.
- Invocation comes from frontmatter. `disable-model-invocation: true` is **user-invoked** (you type it). Anything else is **model-invoked** (you can type it, or the agent may reach for it). This matches the README: user-invoked skills orchestrate; model-invoked skills hold the reusable discipline; a user-invoked skill may call a model-invoked skill and never another user-invoked skill.
- Two edge kinds, drawn differently:
  - **Calls** — parsed from the skill body wherever it says to call the Skill tool with a named skill (`grill-me` calls `grilling`, `implement` calls `tdd` and `code-review`, and the same for the other explicit calls).
  - **You type next** — the human handoff along the main flow written in `ask-matt`'s SKILL.md (`grill-with-docs` → `to-spec` → `to-tickets` → `implement` or `implement-spec` → `retro`), plus the portable cousin this demo walks (`grill-me` → `to-spec`) from the grill-me doc, plus the on-ramps `ask-matt` names (`wayfinder` → `to-spec`, `triage` → `implement`, `diagnosing-bugs` → `retro`). These are not Skill-tool calls. A prerequisite pointer to `/setup-matt-pocock-skills` ("if the tracker is not configured") is a third, quieter edge.
- Browse and filter: text search, user-invoked / model-invoked, and category (engineering, productivity, in progress, misc). Selecting a skill shows its description, both edge lists, and the raw `SKILL.md`.
- A chain map of the engineering spine. Clicking a node selects that skill. A control opens the recorded walk.
- Walkthrough of one chain on one feature: **Snooze until morning** on Shelf, a local reading list that already saves and archives articles. The session is produced by a coding agent that is given the skill file and told to follow it, with a human answering between rounds. `grill-me` loads `grilling` and stops after each frontier round. `to-spec` proposes test seams and waits, then writes `spec.md` only after confirmation. `to-tickets` quizzes the breakdown and writes one file per ticket only after approval. The page shows the governing skill text beside those turns, and the spec and tickets as the artifacts.
- The walk is labeled **Recorded** when the agent actually followed those gates. If a step cannot be produced that way, that step is labeled **Illustrative** and the page says so. The browser never calls a model. `bun run build` replays committed JSON.
- Fixture the agent reads: a few TypeScript files plus `AGENTS.md`, `GLOSSARY.md`, and `docs/agents/issue-tracker.md` (local markdown under `.scratch/`, the tracker template from `setup-matt-pocock-skills`). Triage labels are the five canonical roles. This is the "setup already ran" state, so `to-spec` and `to-tickets` do not stop to demand `/setup-matt-pocock-skills`.
- Footer: MIT, Matt Pocock, the pinned commit, links to the repo, https://aihero.dev/skills, and the bookmarked post https://x.com/mattpocockuk/status/2088290952704151671.
- `tracking/seen-bookmarks.json`: one approved entry for that post, slug `matt-pocock-skills-atlas`, date 2026-11-27. That file is the one allowed edit outside this app.

## Out of scope

- Running `/implement`, `/tdd`, or `/code-review`, and building the snooze feature itself.
- Re-running a model during `bun run build` or on GitHub Pages.
- Installing the skills into this monorepo, or changing root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.
- A server, an API key, or any committed secret.
- Live editing of skill text, or a general markdown editor.

## Stack

- Bun. `apps/matt-pocock-skills-atlas/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]`, matching the repo root.
- Vite + React + TypeScript. `base: './'` so `bun run build` writes `dist/` with relative asset URLs for `/tech-demos/matt-pocock-skills-atlas/`.
- Tailwind 4. No UI kit beyond a few local components. No graph library: the chain map is a fixed SVG.
- `bun run build` runs `scripts/extract-atlas.ts` (reads vendored `SKILL.md` files, writes `src/data/atlas.json`) and then `tsc -b && vite build`. The recorded session is `src/data/session.json`, written once by this build and committed. Playing the demo does not run the extractor against GitHub.

## UX

- First screen is the atlas. No empty library and no API key. A one-line banner names the pin and says the page was generated from the skill files.
- Top: chain map of the spine, with a "Walk grill-me → to-spec → to-tickets" control. Solid edges are Skill-tool calls. Dashed edges are commands you type next.
- Below: search and filter chips, then two groups, "You type these" and "The agent may reach for these". Cards show the name, category, and a one-line description from frontmatter.
- Selecting a card (or a map node) opens the skill: badges, callers, callees, the you-type-next list, and the raw file. Hash `#/skill/<name>` survives refresh.
- Empty filter: "No skills match" and a control that clears the filters.
- Walk screen (`#/walk`, `#/walk/<step>`): the feature in one sentence, a Recorded or Illustrative banner, three steps, the skill file on one side and the session turns on the other. Next / Previous move through turns. On a narrow viewport the skill text stacks above the session. The spec and the ticket files appear at the end of their steps.
- If a recorded turn is missing, that pane says the step was not recorded.

## File structure

- `PLAN.md`, `demo.json`, `package.json`, `bun.lock`, `bunfig.toml`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.gitignore`, `public/favicon.svg`
- `vendor/SOURCE.json` — commit, version, license, upstream URL
- `vendor/skills/**/SKILL.md` — the copied skill files
- `example/` — the Shelf fixture the agent reads, including `.scratch/snooze-until-morning/` after the run
- `scripts/extract-atlas.ts`
- `src/data/atlas.json`, `src/data/session.json`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/lib/types.ts`, `src/lib/hash.ts`
- `src/components/Atlas.tsx`, `src/components/ChainMap.tsx`, `src/components/SkillDetail.tsx`, `src/components/Walkthrough.tsx`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Vendor the skill files and write the extractor.
   - Acceptance: `bun scripts/extract-atlas.ts` writes `src/data/atlas.json` containing every vendored `SKILL.md`; `grill-me` is user-invoked and its calls edge is `grilling`; `tdd` is model-invoked; a handoff edge `to-spec` → `to-tickets` exists with kind `you-type-next`.
   - Dependencies: none.
2. Record the chain with a coding agent against `example/`.
   - Acceptance: `src/data/session.json` has three steps whose turns are the agent's messages; grill-me turns contain a frontier round in the skill's question format and a later confirmation that the frontier is empty; to-spec turns contain a seam proposal before the spec body, and the spec has Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, and Out of Scope; to-tickets turns contain a numbered quiz before one file per ticket with blocking edges. The JSON says `recorded` or `illustrative` per step.
   - Dependencies: task 1's vendor tree (the agent reads the real skill files). The fixture can be written in parallel with task 1.
3. Scaffold the Vite app and the atlas UI.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative; opening it shows every published skill, the invocation filter hides the other group, and selecting `grill-me` shows that it calls `grilling`.
   - Dependencies: task 1. The walk screen can show a placeholder until task 2 lands.
4. Walkthrough UI bound to `session.json`.
   - Acceptance: the walk opens on grill-me with that skill's text visible beside the first agent turn; Next reaches the to-spec seam proposal and the to-tickets quiz; the banner matches the recorded/illustrative label.
   - Dependencies: tasks 2 and 3.
5. Play the built files under a `/tech-demos/matt-pocock-skills-atlas/` subpath: filter, select a skill, refresh on a skill hash, and step the whole walk.
   - Acceptance: assets load from the subpath; refresh keeps the selected skill; the three walk steps are reachable.
   - Dependencies: task 4.

## Risks

- Absolute asset paths 404 under `/tech-demos/matt-pocock-skills-atlas/`. Mitigation: Vite `base: './'` and hash routing, which needs no server rewrite.
- The Skill-tool parser could miss a call or grab a mention that is not a call. Mitigation: only lines that instruct a Skill-tool call, and only names that match a real skill. The extractor fails if `grill-me` does not call `grilling`. You-type-next edges stay a short cited list, not every backtick in `ask-matt`.
- A user-invoked skill calling another user-invoked skill would contradict the README. Mitigation: the extractor records the edge anyway and the UI flags it, so the page does not hide a contradiction.
- The agent may skip a gate (write the spec before the seam check, or publish tickets before the quiz). Mitigation: re-prompt that step. If it still skips, label the step illustrative.
- GitHub Pages has no agent. Mitigation: commit `atlas.json` and `session.json`. The client never fetches the skills repo.
- Vendored skill text is MIT. Mitigation: `vendor/SOURCE.json` and the footer carry the copyright line. No other upstream prose is copied in bulk.

## demo.json (draft)

- `title`: Skills Atlas
- `description`: Browse every skill in Matt Pocock's pack, filter user-invoked and model-invoked, and walk a recorded grill-me → to-spec → to-tickets chain on one small feature.
- `date`: 2026-11-27
- `sourceUrl`: https://github.com/mattpocock/skills
