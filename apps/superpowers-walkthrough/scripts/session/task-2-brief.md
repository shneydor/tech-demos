### Task 2: Clip the headline

**Files:**
- Modify: `src/skim.ts`
- Test: `tests/skim.test.ts`

**Interfaces:**
- Consumes: `skim(text: string, maxWords: number): SkimResult` from Task 1
- Produces: the same signature. `headline` is now clipped to `maxWords` words, with one `…` only when words were dropped.

- [ ] **Step 1: Write the failing test**

Append these tests. Do not change the existing tests.

```ts
test("clips the headline to the cap with one ellipsis", () => {
  expect(skim("alpha beta gamma", 2).headline).toBe("alpha beta…");
});

test("does not add an ellipsis when the text fits", () => {
  expect(skim("alpha beta", 5).headline).toBe("alpha beta");
});

test("an exact cap does not clip", () => {
  expect(skim("alpha beta", 2).headline).toBe("alpha beta");
  expect(skim("alpha beta", 2).status).toBe("ok");
});

test("collapses whitespace and then clips", () => {
  expect(skim("  alpha   beta\tgamma ", 2).headline).toBe("alpha beta…");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/skim.test.ts`
Expected: the clip test FAILS because the headline is still the full collapsed string `alpha beta gamma`. The Task 1 tests still pass.

Save the full output to `logs/task2-red.txt`.

- [ ] **Step 3: Clip in `skim`**

When there are more words than `maxWords`, `headline` is the first `maxWords` words joined by spaces, plus `…`. Otherwise it stays the collapsed text. Do not change count, status, or validation.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/skim.test.ts`
Expected: PASS, 10 tests.

Save the full output to `logs/task2-green.txt`.

- [ ] **Step 5: Commit**

```bash
git add src/skim.ts tests/skim.test.ts logs/task2-red.txt logs/task2-green.txt
git commit -m "feat: clip the skim headline on a word boundary"
```

Do not commit `task-2-brief.md`. Do not push. Do not amend the previous commit.
