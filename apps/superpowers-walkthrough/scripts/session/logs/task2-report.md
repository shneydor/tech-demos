# Task 2 Report: Clip the Headline

## RED Phase

**Command:** `bun test tests/skim.test.ts`

**Summary:** 8 pass, 2 fail

**Failing assertions (expected clip behavior missing):**

```
test("clips the headline to the cap with one ellipsis", () => {
  expect(skim("alpha beta gamma", 2).headline).toBe("alpha beta…");
                                                    ^
error: expect(received).toBe(expected)

Expected: "alpha beta…"
Received: "alpha beta gamma"
```

```
test("collapses whitespace and then clips", () => {
  expect(skim("  alpha   beta\tgamma ", 2).headline).toBe("alpha beta…");
                                                          ^
error: expect(received).toBe(expected)

Expected: "alpha beta…"
Received: "alpha beta gamma"
```

Failures match the intended RED: headline was still the full collapsed string without clipping.

Full output: `logs/task2-red.txt`

## GREEN Phase

**Command:** `bun test tests/skim.test.ts`

**Summary:** 10 pass, 0 fail

Full output: `logs/task2-green.txt`

## Files Changed

| File | Change |
|------|--------|
| `src/skim.ts` | When `words.length > maxWords`, headline is first `maxWords` words joined by single spaces plus U+2026 ellipsis; otherwise unchanged collapsed text |
| `tests/skim.test.ts` | Appended four headline clip tests per brief |
| `logs/task2-red.txt` | RED run capture |
| `logs/task2-green.txt` | GREEN run capture |

## Self-Review

- TDD followed: tests appended before implementation; RED verified on missing clip; minimal clip logic added; GREEN at 10/10.
- Scope unchanged: count, status, and cap validation untouched.
- Ellipsis is single character `…` (U+2026), not three ASCII periods.
- Existing Task 1 assertions were not modified.
- No concerns.