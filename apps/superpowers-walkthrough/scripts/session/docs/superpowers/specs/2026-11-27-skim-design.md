# Skim

Short design. Small change: one function, no UI.

## Intent

A caller passes a paragraph and a word cap because a chunk of agent text is often too long to read. `skim` answers three questions: how many words are there, is that over the cap, and what is a headline of the leading words. The caller decides what to show.

## Why

The request is for a check you can trust while skimming, not for a summary. Success is trusting the count, the status, and the headline. A clever summarizer, a cut in the middle of a word, or a character count labeled as words would be a failure even if the function ran.

## Goals

- Return `{ words, maxWords, status, headline }`.
- `status` is `"ok"` or `"over"`.
- Clip the headline on a word boundary.

## Non-goals

- A user interface, a server, or a model.
- Summarization, sentence detection, HTML parsing, stemming, or locale segmentation.

## Anti-goals

- A headline that ends mid-word.
- A character budget presented as a word budget.

## Constraints

- TypeScript. Tests run with `bun:test`. No runtime dependencies.
- Words are split on whitespace. A hyphenated token is one word.
- Empty text, and whitespace-only text, yield `words: 0`, `status: "ok"`, `headline: ""`.
- `status` is `"over"` only when `words > maxWords`. Otherwise `"ok"`.
- `headline` is the text with whitespace collapsed to single spaces, then clipped to `maxWords` words. A clipped headline ends with one ellipsis character `…`. A headline that fits has no ellipsis.
- `maxWords` must be an integer greater than or equal to 1. Otherwise throw `TypeError`.

## Approaches

1. **One function, split on whitespace.** Chosen. It is predictable, it needs no dictionary, and it matches the reason for the function. It is weaker for scripts that do not separate words with spaces.
2. **`Intl.Segmenter`.** Better for some of those scripts. It pulls in more rules than this caller asked for.
3. **A character cap.** Smaller, and it is the failure the request named, so it is out.

The partner chose approach 1 and asked for two tasks: counting, status, and validation first; headline clipping second.

## What the partner decided

- The function name is `skim`.
- The return fields are `words`, `maxWords`, `status`, `headline`.
- No UI.
- The partner picks the behavior above. The builder picks file layout and the exact error string.

## Builder calls

- `TypeError` message is exactly `maxWords must be an integer greater than or equal to 1`.
- Implementation file: `src/skim.ts`. Tests: `tests/skim.test.ts`.
- Task 1 may return an unclipped collapsed headline. Task 2 makes clipping true. The finished function matches the constraints either way.
