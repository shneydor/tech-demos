# Decision Driven Design

## Goal

A gallery visitor opens one card and, in under a minute, walks a decision tree instead of a flat write-up. They open any decision, read the plain sentence “we decided X because Y” and the personas who argued it, then press “Change this decision” and watch a pre-generated alternate branch rewrite only what sits downstream. Done means the voting example from [ddd-prompt.surge.sh](https://ddd-prompt.surge.sh) is on screen (32 decisions, 8 personas, the A–J tree), a second topic is switchable, the Hebrew prompt and an English translation can be copied, and the page says the content was pre-generated. No model runs when the page is open.

## In scope

- Voting topic, taken from the published example:
  - The 32 sentences on the source homepage, in the original Hebrew and in English.
  - The eight personas (name, role, characteristic line, red line) from `personas.html`.
  - Debate lines from `debate.html`, attached to the decisions they actually argue, labeled by round.
  - The A–J option tree from `tree.html`, including roads that were not taken.
  - Simulation notes from `simulation.html` where they explain a limit or a benefit. The page keeps the source’s warning that those figures are assumptions.
- Three pre-generated alternates on the voting tree, one active at a time:
  - Decision 8 → biometric identification (the repair line on the source page). Face recognition stays rejected. Downstream identity, abroad stations, and the paper path for people without a card move.
  - Decision 2 → allow voting from home. Coercion, secrecy, the audit, and the air gap move.
  - Decision 1 → stay with paper only. The source tree says this branch ends. Decisions 2–32 leave the tree.
- A second topic, a city on-demand night bus, written for this demo in the same shape: personas with red lines, a tree, “we decided X because Y” sentences, and two alternates (fixed lines, and contracted drivers). It is labeled as demo writing, not as part of the surge.sh example.
- Copy the design prompt, the one-line “change decision N” prompt, and the illustration prompt. Each is shown in Hebrew and in English. The design prompt’s bracketed slot fills with the topic on screen. The Hebrew design prompt matches the source page, including the line breaks.
- A build step (`scripts/generate.ts`) validates the trees and writes `src/data/trees.json` with a fixed content date and a content hash. The client imports that file only. The UI badge reads that the branch was pre-generated and that opening or changing a decision does not call a model.
- `tracking/seen-bookmarks.json`: approved entry for post `2112791747168198850`, title Decision Driven Design, url `https://x.com/mati_h/status/2112791747168198850`, date `2026-11-27`, slug `decision-driven-design`.

## Out of scope

- A live LLM, an API key, or a server.
- Generating illustrations (the illustration prompt is copied, not run).
- Editing root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.
- Claiming the night-bus tree, or the voting alternates, were returned by Mati’s model. The 32 voting sentences, personas, debate, tree, and simulation notes are the published example. Alternates and the night bus were written for this demo from that material and frozen at build time.

## Stack

- Bun. `apps/decision-driven-design/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]`, matching the repo root, because CI runs `bun install` inside the app directory.
- Vite + React + TypeScript. `base: './'` so `bun run build` writes `apps/decision-driven-design/dist` with relative asset URLs for `/tech-demos/decision-driven-design/`.
- Tailwind CSS for layout. No shadcn CLI. No runtime dependency beyond React.
- `bun run build` runs `bun scripts/generate.ts`, then `tsc -b`, then `vite build`.

## UX

- First screen is the voting tree, with decision 8 open. A one-line hint says this is the decision the source prompt tells you to change. A banner says the content is pre-generated.
- The tree is ten columns (A–J). Each column is a question. Cards are the numbered decisions. A path highlight walks parent links across columns. Roads that never became a numbered sentence sit under the column and open the same detail.
- Detail shows the sentence, the because, the rejected option, the personas (for and against, with the round quote or the red line), and the simulation note when the source has one.
- “Change this decision” appears on decisions 1, 2, and 8. It names how many downstream decisions move, then applies the alternate. Moved cards turn amber and show the new sentence. Closed cards stay visible and read as having left the tree. “Restore the published branch” clears it. One alternate at a time.
- Toolbar: topic switch (voting / night bus), Tree or Decision file, search, persona filter, English or Hebrew, Copy prompt.
- Copy prompt opens a dialog with three prompts (design, change one decision, illustrate). Hebrew is `dir="rtl"`. Each side has its own copy button. If the clipboard is unavailable, the text stays selected and the dialog says to copy it manually.
- Empty search: “No decision matches that search.” A missing field in the generated file is a build failure, not a runtime fallback.
- The night-bus topic uses the same controls. Its Hebrew was written for the demo; the provenance line says so.
- Footer links: the surge page, the bookmarked post, and Dream-RSI.

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.gitignore`
- `public/favicon.svg`
- `scripts/generate.ts`, `scripts/content/types.ts`, `scripts/content/voting.ts`, `scripts/content/night-bus.ts`, `scripts/content/prompts.ts`
- `src/data/trees.json` (generator output, committed)
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/fonts/` — Noto Hebrew (SIL OFL) so the Hebrew prompt and sentences render without a system font
- `src/lib/model.ts`
- `src/components/TreeBoard.tsx`, `src/components/DecisionFile.tsx`, `src/components/Detail.tsx`, `src/components/PromptDialog.tsx`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Write this plan.
   - Acceptance: `apps/decision-driven-design/PLAN.md` exists and names the voting source, the second topic, the build step, and `demo.json`.
   - Dependencies: none.
2. Author the trees and the generator.
   - Acceptance: `bun scripts/generate.ts` exits 0, writes `src/data/trees.json`, and fails if a parent is missing, a persona id is unknown, an alternate points at a missing decision, or a voting sentence has no Hebrew.
   - Dependencies: task 1.
3. Build the page against the generated file.
   - Acceptance: the voting tree shows 32 decisions; opening one shows personas; “Change this decision” on decision 8 rewrites the downstream cards and leaves the others; the night-bus topic switches in the same shell; Copy prompt shows Hebrew and English.
   - Dependencies: task 2.
4. Scaffold the Vite app and produce `dist/`.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative (`./`).
   - Dependencies: task 3.
5. Record the bookmark.
   - Acceptance: `tracking/seen-bookmarks.json` lists the post id, title, url, date, and slug above, and no other entry is edited.
   - Dependencies: none.

## Risks

- Absolute asset paths would break the page under `/tech-demos/decision-driven-design/`. Mitigation: Vite `base: './'`, and a check that `dist/index.html` contains no root-absolute script or stylesheet URL.
- CI installs inside the app directory, so the root `bunfig.toml` may not apply. Mitigation: copy `minimumReleaseAge` into the app’s `bunfig.toml`, and pin dependencies that are already older than three days.
- A huge tree can become a flat list again. Mitigation: columns, path highlight, search, persona filter, and the alternate diff. The decision-file view is the readable list; the tree is the default.
- Inventing persona quotes would misrepresent the source. Mitigation: round quotes are the published debate; other lines are marked as that persona’s red line. Alternates and the night bus are labeled as written for this demo.

## demo.json (draft)

- `title`: Decision Driven Design
- `description`: Walk a pre-generated decision tree, read who argued each choice, and change one decision to see what moves downstream.
- `date`: 2026-11-27
- `sourceUrl`: https://ddd-prompt.surge.sh
