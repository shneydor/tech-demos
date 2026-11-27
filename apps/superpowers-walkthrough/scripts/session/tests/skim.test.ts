import { expect, test } from "bun:test";
import { skim } from "../src/skim.ts";

test("empty text is zero words and ok", () => {
  expect(skim("", 5)).toEqual({ words: 0, maxWords: 5, status: "ok", headline: "" });
});

test("whitespace only is empty", () => {
  expect(skim("  \n\t ", 3)).toEqual({ words: 0, maxWords: 3, status: "ok", headline: "" });
});

test("counts words under the cap", () => {
  expect(skim("alpha  beta", 5)).toEqual({
    words: 2,
    maxWords: 5,
    status: "ok",
    headline: "alpha beta",
  });
});

test("a hyphenated token is one word", () => {
  expect(skim("well-known path", 5).words).toBe(2);
});

test("status is over when the count exceeds the cap", () => {
  const result = skim("one two three", 2);
  expect(result.words).toBe(3);
  expect(result.status).toBe("over");
  expect(result.maxWords).toBe(2);
});

test("rejects a cap that is not an integer >= 1", () => {
  expect(() => skim("one", 0)).toThrow(TypeError);
  expect(() => skim("one", 1.5)).toThrow(
    "maxWords must be an integer greater than or equal to 1",
  );
  expect(() => skim("one", Number.NaN)).toThrow(TypeError);
});

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
