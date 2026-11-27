export type SkimStatus = "ok" | "over";

export type SkimResult = {
  words: number;
  maxWords: number;
  status: SkimStatus;
  headline: string;
};

const CAP_ERROR = "maxWords must be an integer greater than or equal to 1";

export function skim(text: string, maxWords: number): SkimResult {
  if (!Number.isInteger(maxWords) || maxWords < 1) {
    throw new TypeError(CAP_ERROR);
  }
  const trimmed = text.trim();
  const words = trimmed === "" ? [] : trimmed.split(/\s+/);
  const collapsed = words.join(" ");
  const headline =
    words.length > maxWords
      ? `${words.slice(0, maxWords).join(" ")}…`
      : collapsed;
  return {
    words: words.length,
    maxWords,
    status: words.length > maxWords ? "over" : "ok",
    headline,
  };
}
