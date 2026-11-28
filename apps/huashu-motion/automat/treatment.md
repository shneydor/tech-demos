# Automat-it — treatment

Commission: a launch film for Automat-it, using only the public homepage and the files `om grab` saved. Narration: none (music and effects). Length: 8 bars at 112 bpm, 17.14 s, 1920×1080.

## What was read

- `om grab https://www.automat-it.com` on 2026-11-28. Logo file used on screen: `materials/web-www-automat-it-com/logo-05.svg` (the wordmark, copied to `assets/logo.svg` unchanged).
- Colours the grabber listed: grounds `#ffffff` `#f7f7f8` `#111111`, type `#111111` `#ffffff` `#353535`.
- Colours in the logo file itself, which the grabber did not list: `#A7EB20`, `#4C9AD4`, `#01486D`, wordmark `#121212`.
- Type the grabber listed: Poppins. The film uses the OFL Poppins 600 and 800 files shipped with huashu-motion 0.6.1.
- Homepage sentences used verbatim are listed in `materials/facts.md`. No customer logos. The grabbed page screenshots are not in the film: the hero capture includes a cookie dialog.

## Directions

The task asked for the film, so this run did not wait for a style reply. The three cards:

1. **Kinetic type (chosen).** The homepage opens on one sentence and five figures. The type is the picture. Palette: grabbed grounds and type, plus the three fills in the logo file.
2. **Photo-led.** Cut the grabbed screenshots. Not chosen: `screen-01.png` is covered by a cookie dialog and a modal, and a screenshot with a caption would be a slide.
3. **Depth (the one depth option).** Three practice cards in a shallow 3D stack. Not chosen: the site has no product object to put in space, and a fake interface would invent UI the homepage does not show.

## Rhythm

112 bpm, 4/4. One beat = 0.5357 s. One bar = 2.1429 s. Route: montage. Cuts on `OM.beat`.

| Bar | Beat | Scene | Energy | What happens |
|---|---|---|---|---|
| 1 | 0 | hook | medium | Poster: the real wordmark and the Premier Partner sentence. A lime rule wipes in the first 0.7 s. |
| 2 | 4 | line | rising | The homepage headline lands. Hook is inside 3 s. |
| 3 | 8 | burst | high | The three practices split into cards. First burst before 5 s. |
| 4 | 12 | stop | low | Hold on `1000+` / Customers. Almost still. |
| 5 | 16 | peak | peak | The other four homepage figures. |
| 6 | 20 | claim | high | `40-50%` and the cost-optimization sentence. |
| 7–8 | 24 | end | landing | Closing line, then a hold through bar 8. Signature in the last 1.2 s. |

Sync points in the score (five): hook, burst, stop, peak, end. Line and claim sit on beats and are not marks.

## Score

Composer mode, not a library track. `om samples` reported no instrument pack, so the score is synths (`synpluck`, `pad`, `synbass`, `drums kit=808`). Key of A minor, motif A–C–E–G, stated on the hook, restated at the peak, and played as the last chord. `om sound` performs it. The browser does not.

## Edit planned after the first clean render

One comment on `#tagline` (“By your side at startup speed.”): it sits too low and too quiet. Change only `taglineSize`, `taglineTop`, `taglineWeight`, `taglineColor`, and `taglineBar` with `om set`, then `om done`.
