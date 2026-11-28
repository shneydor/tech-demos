# Onetake

## Goal

A visitor opens the gallery card and, in one click, watches a published Onetake film: one continuous camera move with no cut. Done means the page plays that film from a single button, says in a few sentences how the shot is built, and credits Patrick under the PolyForm Noncommercial license. The public cases do not include composition HTML, so the page plays the films the authors shipped and labels them as recordings.

## In scope

- A static page at `apps/onetake/` with relative asset URLs (`./`), playable at `/tech-demos/onetake/` with no server and no build step.
- Three published cases, chosen because their films are small enough to vendor and their breakdowns explain the camera: one-dot (15s), clearing (15s), skill-demo (15s).
- One button, "Play the take", that starts the selected film at 0:00 with sound. Choosing another case loads that recording; the same button starts it.
- A short, original explanation of how that shot is built (what carries across each beat, and how the camera is aimed), taken from the public case notes and not pasted from them.
- An honest label on every case: published recording, not a live HTML render, because `comp.html` is not in the public release.
- Credit and the required notice: Copyright (c) 2026 Patrick; PolyForm Noncommercial 1.0.0, with the license text beside the films.
- `demo.json` and this plan.

## Out of scope

- Rebuilding a composition, vendoring `lib/motion.js`, or presenting the move gallery as if it were a case.
- The larger films (launch, domino, clawd, infra, overlap, pith) and the GIF previews.
- A server, an API key, accounts, or a package install.
- Editing the gallery generator, CI, root config, or any other app. The only file outside this folder is the bookmark entry in `tracking/seen-bookmarks.json`.

## Stack

- Plain HTML, CSS, and JavaScript. No `package.json`. GitHub Pages copies the folder as-is.
- Every URL is relative (`films/one-dot.mp4`, `LICENSE`), which is the `./` base. A refresh on `/tech-demos/onetake/` still resolves them.
- The films are the mp4 files from `cases/<name>/` on github.com/feitangyuan/onetake at the tree fetched for this plan (`main`, tree `4e024be`).

## UX

- First screen: title, one-sentence lead, three case choices, a 16:9 stage resting on a mid-shot still of the selected film, and the Play button. The still is only a poster; Play always seeks to 0:00.
- Main interaction: Play the take. While it runs, the button reads "Playing" and a clock shows the time. When the film ends, the button returns to "Play the take" and restarts from the top. Switching cases stops playback and loads the new recording and its explanation.
- The explanation sits under the stage: what survives each boundary, and how `OM.rig` aims the camera. A banner states that this is the published recording.
- Empty/error: if a film fails to load, the stage says so and the button stays disabled. No key field.

## File structure

- `apps/onetake/PLAN.md`
- `apps/onetake/demo.json`
- `apps/onetake/index.html`
- `apps/onetake/LICENSE` — upstream PolyForm Noncommercial 1.0.0 text, including the required notice
- `apps/onetake/films/one-dot.mp4`
- `apps/onetake/films/clearing.mp4`
- `apps/onetake/films/skill-demo.mp4`
- `tracking/seen-bookmarks.json` — one new approved entry for the source bookmark

## Tasks

1. Vendor the three mp4s and the upstream LICENSE, and confirm each file is a playable H.264 film of the expected duration.
   - Acceptance: `ffprobe` reports a video stream for each file; durations are about 15 seconds; the license file begins with the required notice naming Patrick.
   - Dependencies: none.
2. Build `index.html`: case choice, one Play button, stage, per-case explanation, recording label, and credit.
   - Acceptance: opening the page shows One dot at rest; Play starts `films/one-dot.mp4` from 0:00; choosing Clearing or Skill demo swaps the film and the explanation; the recording label stays visible; all asset URLs are relative.
   - Dependencies: task 1.
3. Add `demo.json` and the bookmark entry.
   - Acceptance: `demo.json` has title, description, date `2026-11-28`, and `sourceUrl` `https://github.com/feitangyuan/onetake`. `tracking/seen-bookmarks.json` lists this bookmark with slug `onetake`.
   - Dependencies: none. Can land with task 2.
4. Play the page from a parent URL that mimics `/tech-demos/onetake/`.
   - Acceptance: the film plays after the button click, switching cases still loads a relative film, and a missing file shows the error line.
   - Dependencies: tasks 2 and 3.

## Risks

- The case READMEs describe `comp.html`, but those files are not in the public tree. Shipping a homemade composition would pretend to be the case. Mitigation: play the shipped mp4 and label it as a recording.
- Vendored video makes the commit large. Mitigation: three films under about 8 MB total, not the 18 MB launch film.
- Browsers block autoplay with sound. Mitigation: playback starts only from the button.
- An absolute `/films/...` path 404s under `/tech-demos/onetake/`. Mitigation: relative URLs only, and no build step that rewrites them.
- PolyForm Noncommercial requires the terms (or their URL) and the `Required Notice:` line to travel with any copy. Mitigation: the notice is on the page and the full license file sits next to the films. This gallery is a noncommercial demo; the page does not offer the films for commercial use.

## demo.json (draft)

- title: Onetake
- description: Watch a published Onetake film: one continuous camera, no cuts. The public cases ship as recordings, so this page plays those films and explains how the shot is built.
- date: 2026-11-28
- sourceUrl: https://github.com/feitangyuan/onetake
