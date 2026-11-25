# Venn Precedent Desk

## Goal

A C-level visitor opens the gallery card and, in about a minute, watches a card-ops desk route incoming tickets from its own closed cases. Done means: Next walks a short scripted tour, Venn’s queue, confidence, and three to five precedent IDs are on screen, history is compared with described-options-only from the same run, one ticket does not fit a queue, and one new kind of ticket is written back so the next similar ticket routes to that queue. The page only replays traces produced by venn-vdm 0.1.0. Nothing is trained, and no server is required to play it.

## In scope

- Static replay of real `DecisionService.decide` and `OutcomeService.decide_batch` responses. No k-NN reimplemented in the browser, and no free-text box that pretends to call Venn.
- Authored unit vectors on the official download-free path (the same idea as `venn quickstart`). The 1.5 GB EmbeddingGemma reader is not downloaded. Choice and Noul are scored by the published venn-1 head (~3 MB). The UI says this in plain language: the vectors are authored coordinates, not embeddings of the ticket text.
- About 62 closed tickets (14 in each of Access, Payments, Cards, and Disputes, plus 6 dispute filings that sit on a “duplicate statement line” convention) and 18 incoming tickets. The visible tour plays 6 of those incoming tickets; every incoming ticket is still decided in the trace file.
- Questions in one run: `NearestReference` (the queue), `Choice` (described options only), `Noul` (does this fit a listed queue?), and `nearest_outcome` (evidence: mean, count, distance, precedent IDs). The queue on screen is nearest reference, which is how Precedent Desk routes when there is no separate utility to maximize.
- Reference abstains when confidence is below 0.55. That threshold sits between the convention ticket (about 0.60) and the off-topic and first digital-asset tickets (about 0.50).
- Write-back: the app appends the resolved digital-asset ticket and calls `DecisionService.register_index` again, then the next similar ticket is decided against that index. The same case is appended to the live `FaissOutcomeAdapter` and `OutcomeService.decide_batch` is called again. Venn does not write the store; the trace records the app write and the following official calls.
- One does-not-fit case: an internal florist invoice. Nearest reference abstains and Noul’s yes probability is about 0. Choice may still name a listed queue at low confidence; the UI shows that, because abstention is not a guardrail.
- A static callout quotes the official Precedent Desk Banking77 result (93.6% versus 79.7% for a matched Jev 1.13 run, nothing trained). This demo does not recompute it. PolyAI/banking77 (CC BY 4.0) and Venn’s Precedent Desk are cited.
- A caption that the same pattern applies to agent and tool routing in front of Amazon Bedrock.
- Footer: MIT, research preview, not calibrated, not a guardrail, with links to the project home and the Precedent Desk docs.
- `tracking/seen-bookmarks.json`: approved entry `venn-vdm` / Venn VDM / the project home / 2026-11-25 / slug `venn-precedent-desk`. That file is the one allowed edit outside this app.

## Out of scope

- Running Venn, PyTorch, or FAISS in the browser or on GitHub Pages.
- Downloading EmbeddingGemma, embedding raw ticket text, or a live “type a ticket” box.
- Training a family head, a backlog sweep, or a recomputed Banking77 accuracy.
- A server, an API key, or any committed secret.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- Bun. `apps/venn-precedent-desk/bunfig.toml` sets `minimumReleaseAge = 259200` under `[install]` before `bun install`, matching the repo root.
- Vite + React + TypeScript via `bunx create-vite` (`react-ts`). `base: './'` so `bun run build` writes `apps/venn-precedent-desk/dist` with relative asset URLs for `/tech-demos/venn-precedent-desk/`.
- shadcn/ui minimalist: button, card, and badge only, themed for a dark desk.
- Trace generation (not part of the Pages runtime): Python 3.12, CPU PyTorch, `venn-vdm==0.1.0`.

`bun run build` is Vite’s build. The committed `src/data/traces.json` is imported by the client. Playing the demo does not run Python.

## How the traces were generated

- Package: `venn-vdm` 0.1.0 (import name `venn`).
- Commit: `3307c6366b175d8cd19b24dc7831211b338ed570` (git tag `v0.1.0`).
- Head: `markrussinovich/venn-1` at `e618a6919e5a15c6ced46c9874424363c2955283`, downloaded by `venn download-model`. EmbeddingGemma (`venn download-embedder`) is not run.
- Vectors: authored 768-d unit coordinates. Queue descriptions sit on orthogonal axes. Closed tickets sit near their queue axis, with small deterministic noise (NumPy seed 1). They are not text embeddings.
- Command, from `apps/venn-precedent-desk`:

```bash
python3.12 -m venv .venv
.venv/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu
.venv/bin/pip install 'venn-vdm==0.1.0'
.venv/bin/python scripts/generate_traces.py
```

The script writes `src/data/traces.json` and exits non-zero if the tour’s real answers do not match the story (Access and Payments agree, the duplicate-line ticket is Disputes by history and Payments by description, the florist invoice abstains, the first wallet ticket abstains, the written-back wallet ticket is Digital assets).

## UX

- First screen is the first incoming ticket. No empty library and no API key. A banner states that the page replays authored-vector traces and that the 1.5 GB reader was not downloaded.
- Left: the ticket, a step count, Next, and on the new-wallet ticket a single scripted button, “Resolve in Digital assets and write back”. The last step offers Replay.
- Center: the nearest-reference queue (or “No queue”), confidence, the Noul fit line, and 3–5 precedents with IDs. Outcome-store mean distance for the history queue and the description queue is shown from that call’s evidence.
- Right: history versus described-options-only for this ticket, then the static Banking77 callout and the Bedrock caption.
- Footer links: [Venn](https://markrussinovich.github.io/venn-vdm/) and [Precedent Desk](https://github.com/markrussinovich/venn-vdm/blob/v0.1.0/examples/precedent_desk/README.md).
- If a trace is missing an answer field, the pane says the recorded response could not be read. There is no fallback classifier.

## File structure

- `PLAN.md`, `demo.json`, `bunfig.toml`, `package.json`, `bun.lock`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `components.json`, `.gitignore`
- `scripts/generate_traces.py`
- `src/data/traces.json` — exact request and response envelopes, including vectors
- `src/data/replay.json` — the same answers and evidence, without vectors, which the page imports
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- `src/lib/utils.ts`, `src/lib/traces.ts`
- `src/components/ui/{button,card,badge}.tsx`
- `src/components/{TicketPane,AnswerPane,ComparePane}.tsx`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Generate traces with the real APIs.
   - Acceptance: `scripts/generate_traces.py` exits 0; `src/data/traces.json` contains `DecisionService.decide` envelopes for nearest reference, Choice, and Noul, and `OutcomeService.decide_batch` envelopes; the write-back step’s later reference answer is `digital-assets`; the florist step’s reference answer is `none`.
   - Dependencies: none.
2. Scaffold the Vite React TS app with relative `base`, shadcn button/card/badge, `demo.json`, and `bunfig.toml`.
   - Acceptance: `bun run build` writes `dist/index.html` whose script and stylesheet URLs are relative.
   - Dependencies: none. Can proceed once the plan file exists; the UI needs task 1’s JSON before it can show answers.
3. Replay UI: tour, precedents, comparison, callout, footer.
   - Acceptance: opening the built app shows the first ticket and Venn’s Access answer with precedent IDs; the comparison shows two queues from the trace; the Banking77 figures 93.6% and 79.7% are visible and labeled as the official result.
   - Dependencies: tasks 1 and 2.
4. Play the built files under a `/tech-demos/venn-precedent-desk/` subpath and click the whole tour, including write-back.
   - Acceptance: assets load from the subpath; write-back advances to a Digital assets route; Replay returns to the first ticket.
   - Dependencies: task 3.

## Risks

- Authored vectors do not measure semantic accuracy. Mitigation: the banner says so, and the Banking77 number is quoted from the official write-up rather than computed here.
- The venn-1 head’s abstention MLP was trained on EmbeddingGemma geometry, so Choice on an off-topic authored vector can still name a queue. Mitigation: show that low-confidence choice beside reference abstention and the Noul no. Do not hide it.
- `nearest_outcome` maximizes recorded utility. A single high utility on a new queue would outrank older queues for every later ticket, including ones that are far away. Mitigation: the queue on screen is nearest reference. Outcome evidence (mean distance, precedent IDs) is shown as evidence. The trace still contains the outcome calls, including the write-back.
- Absolute asset paths would 404 under `/tech-demos/venn-precedent-desk/`. Mitigation: Vite `base: './'`.
- GitHub Pages has no Python. Mitigation: commit `traces.json`; the client never imports `venn`.

## demo.json (draft)

- `title`: Venn Precedent Desk
- `description`: A card-ops desk routes tickets from its closed cases. This page replays venn-vdm 0.1.0: history versus queue descriptions, one ticket that does not fit, and a new queue learned from a single write-back.
- `date`: 2026-11-25
- `sourceUrl`: https://markrussinovich.github.io/venn-vdm/
