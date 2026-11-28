# Anything2Explainer

## Goal

A gallery visitor opens one card and, in under a minute, plays Vincent Wei’s published RAG explainer and steps through the real paper trail that produced the original cut: research, narration, storyboard, shots, and QC. Done means the page is honest that this is their published example, the films play with no server and no key, and every trail card quotes `examples/rag/` at commit `ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d`. The toolkit is not copied and is not run.

## In scope

- Two published README cuts, stored locally so playback does not depend on GitHub’s five-minute signed URLs:
  - English, *RAG & Knowledge Bases*, 5′02″, kokoro-82m `am_liam` (`e2771c68-a28c-4459-ac5a-a5b685181eeb`).
  - Chinese v2, *RAG 与知识库*, 4′54″, dot-field backdrop (`5c213990-cbba-439e-8371-fbb3aa348e05`).
- A cut switch on the player. The label says these later cuts were re-timed, so stepping the trail does not seek them.
- The paper trail of the original Chinese cut (2026-09-06, 4′35″, 8,246 frames, star field), quoted from `examples/rag/`:
  - Research: the one-sentence definition, the sixteen sourced facts in §7.1, and the five analogies in §7.2, each with its published URL.
  - Narration: all 44 lines of `narration.txt`, paired with the frame ranges in `timeline.md`.
  - Storyboard: all 44 shots from the filled `分镜表.md` (frames, beats, picture, motion).
  - Shots: one build group at a time (G0 overlays plus G1–G8), each with a verbatim excerpt of a published shot file and a link to that file.
  - QC: the v1 tally, the v3 flicker verdict, the seven measured fixes, the two low leftovers, and the v4 delivery note, quoted from `qc/qc_v3_final.md` and `交付说明.md`.
- Published stills from `examples/rag/frames/ref_*.jpg`, shown on the storyboard or shot whose frame range contains that still.
- Credit on the page: Yihao Wei (Vincent Wei), PolyForm Noncommercial 1.0.0, the required notice, and links to the repo, the example folder, and the source post. A `NOTICE.md` repeats the required notice.
- `tracking/seen-bookmarks.json`: approved entry for `2125741618435101096` / Anything2Explainer / the source post / 2026-11-26 / slug `anything2explainer`.

## Out of scope

- Copying or running the toolkit: `SKILL.md`, `template/`, `reference/`, `scripts/`, fonts, or `examples/contrast/`.
- Re-rendering, re-voicing, translating the trail, or inventing shots, numbers, or QC results.
- A server, an API key, a topic box, or any committed secret.
- Changes to root config, CI, the gallery generator, `AGENTS.md`, or `skills/`.

## Stack

- No `package.json`. GitHub Pages copies the folder as-is (`pages.yml` static branch). That is the zero-effort page this demo is.
- Relative URLs only (`media/rag-en.mp4`, `media/frames/…`, `trail.js`, `app.js`), which is the `base: './'` equivalent for a file that is itself the published page at `/tech-demos/anything2explainer/`.
- Plain HTML, CSS, and JavaScript. `trail.js` is generated once from the published Markdown and committed; the page does not fetch GitHub at runtime.

## UX

- First screen: the English cut, paused on the title still, beside Research item 1. A banner states this is the authors’ published example and that the skill was not run.
- One interaction: Next and Back walk the trail. The last item of a stage continues into the next stage. Stage buttons jump to the first item of that stage. Arrow keys do the same unless focus is on the video, so the player keeps its own seek keys.
- Inside Storyboard and Shots, the matching published still sits on the card. A strip under the player jumps to the storyboard shot that contains that frame.
- The cut switch reloads the other local MP4 and says which published cut it is.
- If a video file fails to load, the player area says so and links to the file on the authors’ README. Missing trail text says the published file did not include that field. There is no generated fallback film.
- No API key and no empty library.

## File structure

- `PLAN.md`, `demo.json`, `NOTICE.md`, `index.html`, `app.js`, `trail.js`
- `media/rag-en.mp4`, `media/rag-zh.mp4`
- `media/frames/ref_*.jpg` (the published reference stills only)
- `tracking/seen-bookmarks.json` — the approved bookmark entry only

## Tasks

1. Record this plan.
   - Acceptance: `apps/anything2explainer/PLAN.md` exists and names the two cuts, the five trail stages, and the license boundary.
   - Dependencies: none.
2. Vendor the published films and reference stills, with `NOTICE.md`.
   - Acceptance: both MP4s are playable local files; still filenames match `examples/rag/frames/ref_*.jpg`; the notice quotes the required copyright line and links the PolyForm terms.
   - Dependencies: task 1.
3. Build `trail.js` from the published files at the pinned commit.
   - Acceptance: 44 narration lines, 44 storyboard shots, 16 sourced facts, and the QC verdict strings match the source files; shot excerpts are verbatim prefixes of the named files.
   - Dependencies: task 1.
4. Build the static page.
   - Acceptance: opening `index.html` shows the English film and the first research card; Next reaches narration, storyboard, shots, and QC; the Chinese cut plays from the switch; asset URLs are relative.
   - Dependencies: tasks 2 and 3.
5. Add the bookmark entry.
   - Acceptance: `tracking/seen-bookmarks.json` approved list contains the Anything2Explainer entry and the two existing entries.
   - Dependencies: none.

## Risks

- Signed GitHub attachment URLs expire in five minutes, so a hotlinked `<video>` dies mid-film. Mitigation: commit the two published MP4s.
- The paper trail is the original 4′35″ cut, while the README films are later re-times. Mitigation: the page says so and does not pretend a trail step seeks the player.
- Quoting shot source could be read as redistributing the toolkit. Mitigation: excerpts only, from `examples/rag/shots_src/`, with the required notice; no template, skill, or scripts.
- Absolute asset paths would break under `/tech-demos/anything2explainer/`. Mitigation: every media and script URL is relative.

## demo.json (draft)

- title: Anything2Explainer
- description: Play Vincent Wei’s published RAG explainer and step the real paper trail — research, narration, storyboard, shots, and QC. Their example, not a re-run.
- date: 2026-11-26
- sourceUrl: https://github.com/Vincentwei1021/anything2explainer
