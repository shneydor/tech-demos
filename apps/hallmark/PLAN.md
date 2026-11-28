# Hallmark

## Goal

A visitor opens the gallery card and, in one minute, drags a before/after slider across two real HTML pages. The left page is a landing page written to look generated. The right page is that same page after a coding agent followed Hallmark 2.0.0 at build time. Each gate the linter reported on the specimen sits beside the section it changed. Done means the visitor can see both documents, read which rule fired, and see that the browser did not call a model.

## In scope

- A static specimen at `before/index.html`: a fictional product, Lumenboard, a Monday decision board for a small studio. The page is written to trip Hallmark's usual tells (purple-to-blue gradient, Inter on the headline, an eyebrow, tracked capitals, an italic word in the heading, emoji icons, a card inside a card, a redrawn browser bar, middle-dot meta, an arrow glued to a button, decorative status dots, invented metrics, a Jane Doe quote, Acme and Nexus, buzzwords, a form script that says the visitor is on the list, `transition: all`, `100vw`, no focus ring, no Hallmark stamp).
- Stable ids the redesign must keep: `wordmark`, `join`, `see-board`, `see-quote`, `hero`, `proof`, `features`, `quote`, `signup`, `close`, `join-form`, `email`, `join-submit`, `join-note`. The form handler string stays `onsubmit="joinWait(event)"`. The email field stays `name="email"`.
- A full Hallmark redesign into `after/`, produced by a coding agent that reads `skills/hallmark/SKILL.md` and `references/redesign.md` from a local clone of https://github.com/Nutlope/hallmark (not committed). Headless: no one is here to answer the ask, so the run infers and stamps the inferences. Depth is full. Genre starts as modern-minimal because the specimen is a software landing page. The agent runs `theme.mjs deal` and `theme.mjs scaffold <slug> --redesign full`, then `sloplint.mjs`.
- Planted proof is not owner-supplied. No one can verify the metrics, the logo names, or the Jane Doe quote. Floor gates 46a and 19 drop them. The stamp records every dropped or reworded line. The product facts that stay are the name Lumenboard, a board with three columns (decided, waiting, carried from last Monday), and an email field that does not claim the note was sent.
- `lint/before.json` and `lint/after.json`: the `sloplint --json` output for each page. `rules.json` lists one entry per gate id that appears in the before file. Each entry has the tier, the grade, the linter evidence, the section id, a change sentence that matches the after page, and `stillOpen` when the after file still reports that gate.
- The gallery page `index.html`: both documents in iframes, a slider that clips one over the other, and a note beside each changed section. The first screen says the after page was written at build time by a coding agent following Hallmark, and that this page makes no model call.
- `tracking/seen-bookmarks.json`: approved entry for status `2125741618435101096`, title Hallmark, url the bookmark, date 2026-11-28, slug `hallmark`.

## Out of scope

- A live restyle, an API key, or a server.
- Vendoring Hallmark, its fifty themes, or its photo library into this app.
- Installing the skill for the visitor.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, `skills/`, or any other app.

## Stack

- No `package.json`. The Pages workflow copies this folder as-is. Asset URLs are relative (`./before/index.html`, `./after/index.html`, `./rules.json`, `./demo.css`, `./demo.js`), which is the relative base for `/tech-demos/hallmark/`.
- Hallmark's Node scripts run only while the demo is built, from a clone at `/tmp/hallmark`. Chrome at `/usr/local/bin/google-chrome` is used for `sloplint --render` when `puppeteer-core` loads. The published page does not need Node or Chrome.
- The comparison shell is plain HTML, CSS, and JS.

## UX

- First screen: a short instrument bar, then the two pages in one viewport. The bar states three facts: the left page was written as a specimen; the right page was written once, at build time, by a coding agent following Hallmark 2.0.0; this browser does not call a model. It names the dealt theme and the before/after fail counts from the lint files. A slider labeled with Specimen and Hallmark buttons clips the specimen iframe from the right, so the left side is the specimen and the right side is the Hallmark page. The buttons jump the slider to either end. Links open each document on its own.
- Main interaction: drag the slider or the divider. Both documents are the real HTML, each in an iframe that fills the frame and scrolls inside it. Scrolling one moves the other by the same amount. Choosing a rule scrolls both documents so that section sits at the top of the frame, draws a yellow outline on the section, and puts the gate id on that outline. The full change sentence stays in the side list and in the status line. A gate the after page still fails is marked still open.
- Narrow viewport: the compare frame stays under the slider at about 72vh, and the rule list sits below it in a scroller. Choosing a rule still scrolls the frame and outlines the section. The clip slider still works.
- Empty and error: if `rules.json` fails to load, the bar says the rule list did not load and the slider still compares the two pages. If an iframe fails, its frame says that document did not load. There is no API key field.
- The specimen form still runs its script and claims the visitor is on the list. The redesigned form keeps the field and the handler and tells the visitor the list is not wired.

## File structure

- `PLAN.md`, `demo.json`
- `index.html`, `demo.css`, `demo.js`
- `before/index.html`
- `after/index.html` and the CSS the scaffold writes beside it (`tokens.css`, `base.css`, and the page stylesheet the agent adds)
- `lint/before.json`, `lint/after.json`
- `rules.json`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

The clone, `.hallmark/` records, and any screenshot Hallmark writes while linting stay out of git.

## Tasks

1. Write the specimen page.
   - Acceptance: `before/index.html` shows the Lumenboard landing page with the tells listed above. `node /tmp/hallmark/skills/hallmark/scripts/sloplint.mjs before/index.html --genre modern-minimal --json` reports FAIL for gates 2a, 4, 19, 38i, and 63.
   - Dependencies: this plan file.
2. Apply Hallmark with a coding agent.
   - Acceptance: `after/index.html` is a different document. Its first CSS comment is a Hallmark stamp. The email field, the handler string, and the section ids are still there. The Jane Doe quote, the Acme and Nexus names, and the invented metrics are gone, and the stamp says they were dropped. `sloplint` reports fewer Floor FAILs than on the specimen.
   - Dependencies: task 1.
3. Save the lint and write `rules.json`.
   - Acceptance: every `rules.json` gate id occurs in `lint/before.json`. Every rule's section id exists in both HTML documents. `stillOpen` is true only when `lint/after.json` still contains that gate. The change sentence describes the after page.
   - Dependencies: task 2.
4. Build the comparison shell.
   - Acceptance: opening `index.html` over HTTP shows both pages, the slider reveals one then the other, and choosing a rule scrolls to that section with the gate label beside it. The bar states the build-time agent and that the page makes no model call.
   - Dependencies: task 3.
5. Bookmark entry, then play the folder under a `/tech-demos/hallmark/` subpath on a desktop width and a narrow width.
   - Acceptance: the approved bookmark entry is present. From the subpath, both iframes, the slider, and a callout still work. The specimen form shows its fake success line. The redesigned form does not.
   - Dependencies: task 4.

## Risks

- A root-absolute asset URL 404s under `/tech-demos/hallmark/`. Mitigation: relative URLs only, checked by opening the folder on a subpath.
- The redesign drops an id or the email field and `--kept` fails. Mitigation: the agent runs `sloplint --before` before editing and `--kept` after, and restores anything the record requires.
- Floor fails remain on the after page. Mitigation: fix them before shipping. Any that remain are `stillOpen` on the page, with the lint counts visible.
- The two pages are different heights, so a section on the left is not the same y as that section on the right. Mitigation: choosing a rule scrolls each document to its own copy of that section. Further scrolling moves both by the same delta.
- `sloplint --render` needs Puppeteer. Mitigation: install `puppeteer-core` only in the build environment and point it at system Chrome. If the render tier does not run, `rules.json` says so and the static findings still ship.
- A theme font is loaded from a third-party stylesheet. Mitigation: that is the theme's face. The page still shows its text if the stylesheet is blocked.

## demo.json (draft)

- `title`: Hallmark
- `description`: A landing page written to look generated, then the same page after Hallmark. Drag the slider. Each note is a rule the linter reported when the demo was built.
- `date`: 2026-11-28
- `sourceUrl`: https://github.com/Nutlope/hallmark

The bookmark entry uses https://x.com/eluchocha/status/2125741618435101096. `sourceUrl` points at the skill repository the agent followed.
