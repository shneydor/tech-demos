# Caliboard

## Goal

Someone opens the gallery card and, in under a minute, sees a coding-agent plan as a canvas: click a step, read what it depends on, read the one reviewer comment on the risky step, then open the revised draft that answers that comment. Done means the page is honest that this is a recreation. Caliboard is hosted, and its MCP does not answer without an account.

## What was checked

On 28 Nov 2026, `POST https://caliboard.pro/mcp` with an MCP `initialize` request and no token returned `401` and `{"error":"A valid Caliboard OAuth access token is required."}`. The public docs (https://caliboard.pro/docs, https://caliboard.pro/for/coding-agents, https://caliboard.pro/llms.txt) say the same thing: sign in before creating or saving a plan. No tool list and no plan JSON were captured. The page says it is a recreation of the public workflow, not a live board.

The source bookmark is https://x.com/FisherNimrod/status/2112787120813482361. Nimrod Fisher describes Caliboard as a visual layer over a long text plan, with an MCP connection to a coding agent, so the plan is easier to understand and comment on.

## In scope

- A static page. No `package.json`. The gallery copies this directory as-is. Stylesheet, script, and the gallery link use relative URLs (`./` and `../`).
- One sample plan, “Retry failed invoice charges,” for a fictional `acme/billing` repo. It is written for this replay. It is not a captured Caliboard board and not the marketing sample on caliboard.pro.
- Revision 1, four steps in two phases (Understand, Implement), with dependency arrows:
  1. Read the charge path.
  2. Retry every failed charge. Depends on 1. Decision: five immediate retries for any failure. Risk: a timeout after a successful charge can bill the card twice.
  3. Email on the third failure. Depends on 2.
  4. Stamp the invoice paid or failed. Depends on 2 and 3.
- Clicking a step selects it and shows its decision, risk, done-when, and the steps it depends on. Those dependency names are clickable. Edges tied to the selected step are emphasized.
- One reviewer comment, already attached to step 2 of revision 1: do not retry card declines; only retry timeouts; reuse one idempotency key. The comment stays on revision 1.
- A control, “Show the revised plan,” switches to revision 2. Nothing is sent anywhere. The same control’s pair, “Back to the commented draft,” returns to revision 1.
- Revision 2 answers that one comment:
  - Read the charge path is unchanged.
  - New step: classify the failure (decline vs timeout). Depends on the read.
  - The retry step is revised: at most three retries, timeouts only, one idempotency key. Depends on classify.
  - The email step waits until the timeout budget is spent.
  - The stamp step records decline, recovered, or failed, and keeps the idempotency key on a recovery.
  - The retry step shows the agent’s acknowledgment of the comment. Email and stamp show a shorter note that they moved because of the same comment.
- Visible status: revision 1 is waiting for review; revision 2 is the draft after the comment and is not approved. Copy states that submitting feedback is not approval to implement. There is no approve button and no pretend implementation.
- A banner on first paint: recreation, MCP requires a signed-in account, unauthenticated call returned 401, no agent is connected.
- `tracking/seen-bookmarks.json`: approved entry for the source post, slug `caliboard`. That file is the one allowed edit outside this app.

## Out of scope

- A Caliboard account, OAuth, or any call that needs a token.
- Inventing MCP tool names or a fake live session.
- A free-text comment box. A typed comment could not be revised honestly without a model or the real MCP.
- An approval action, implementation, or a server.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- No Bun packages and no `package.json`. `bun run build` does not apply. GitHub Pages copies `apps/caliboard/` into `_site/caliboard/` (see `.github/workflows/pages.yml`).
- One HTML document, one stylesheet, one script. No framework.
- Self-hosted OFL font files (Fraunces and Outfit, latin woff2) referenced with relative `@font-face` URLs, so the page does not call a font CDN. System serif and sans-serif are the fallback.
- Asset URLs are relative, so a refresh at `/tech-demos/caliboard/` still loads the stylesheet and script.

## UX

- First screen is revision 1 with “Retry every failed charge” already selected, so the comment, the risk, and the dependency arrows are visible without a click. The banner is above the board.
- Main interaction: click other steps, then “Show the revised plan,” then click the revised retry step to read the acknowledgment. “Back to the commented draft” restores revision 1 and the same comment.
- There is no empty library and no API-key field. If the script fails to start, a noscript line says the canvas needs JavaScript and that this is a local replay.
- Narrow viewports stack the inspector under the canvas. Arrows are redrawn from the cards’ positions. A dependency that skips a card in the same column runs in the gutter to the right of those cards, so it stays visible.
- `#revised` opens revision 2, and a refresh keeps that revision. The commented draft has no hash.

## File structure

- `PLAN.md`, `demo.json`, `index.html`, `styles.css`, `replay.js`
- `fonts/` — Fraunces and Outfit latin woff2 files, plus `OFL.txt`
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Write this plan.
   - Acceptance: `apps/caliboard/PLAN.md` exists and names the 401 result, the sample plan, the one comment, and both revisions.
   - Dependencies: none.
2. Add the static page and the bookmark entry.
   - Acceptance: opening `index.html` shows the banner, four connected steps, and the comment on “Retry every failed charge.” “Show the revised plan” shows the classify step and the idempotency-key retry, with the agent acknowledgment. “Back to the commented draft” shows the original comment again. No request leaves the browser except loading the page’s own files.
   - Dependencies: task 1.
3. Play the built files under a `/tech-demos/caliboard/` subpath, including a refresh and a narrow viewport.
   - Acceptance: stylesheet and script load from the subpath; both revisions are clickable; the comment does not disappear from revision 1.
   - Dependencies: task 2.

## Risks

- A visitor could think this is a live Caliboard board. Mitigation: the banner, the title area, and the comment caption all say it is a recreation and that the comment is not sent.
- Absolute asset paths would 404 under `/tech-demos/caliboard/`. Mitigation: only relative URLs.
- Arrow positions can miss if they are hardcoded. Mitigation: measure the cards after each revision change and on resize.
- Publishing the plan file: static apps are copied whole, so `PLAN.md` is in the site folder. That matches the copier and does not affect playback.

## demo.json (draft)

- `title`: Caliboard
- `description`: A coding-agent plan as a canvas you can click through. One comment on a risky step, then the revised draft. This page recreates Caliboard’s public review loop; the hosted MCP needs a signed-in account, so no live board is connected.
- `date`: 2026-11-28
- `sourceUrl`: https://caliboard.pro
