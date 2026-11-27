import { useMemo, useState } from "react";
import { skim } from "../lib/skim";

const SAMPLE =
  "We do not stand a chance of reading half the text an agent dumps on us. You start at the top, then you skim, then you approve, and later you learn it did the other thing.";

export function TrySkim() {
  const [text, setText] = useState("");
  const [cap, setCap] = useState("12");

  const outcome = useMemo(() => {
    const maxWords = Number(cap);
    try {
      return { ok: true as const, result: skim(text, maxWords) };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not run skim.";
      return { ok: false as const, message };
    }
  }, [text, cap]);

  return (
    <section className="try" aria-label="Try the skim function">
      <div className="try-head">
        <h2>Try skim</h2>
        <p>The function from the recorded session. Nothing is sent anywhere.</p>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            setText(SAMPLE);
            setCap("12");
          }}
        >
          Use a sample
        </button>
      </div>
      <label className="field">
        <span>Paragraph</span>
        <textarea
          id="skim-paragraph"
          name="paragraph"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          placeholder="Paste a paragraph. Empty text is 0 words."
        />
      </label>
      <label className="field cap">
        <span>Word cap</span>
        <input
          id="skim-cap"
          name="cap"
          value={cap}
          onChange={(event) => setCap(event.target.value)}
          inputMode="numeric"
          aria-label="Word cap"
        />
      </label>
      <div className="try-out" aria-live="polite">
        {outcome.ok ? (
          <>
            <p className="metrics">
              <strong>{outcome.result.words}</strong> words
              <span className={`badge ${outcome.result.status}`}>{outcome.result.status}</span>
              <span className="cap-read">cap {outcome.result.maxWords}</span>
            </p>
            <p className="headline">
              {outcome.result.headline === "" ? (
                <span className="dim">Empty headline</span>
              ) : (
                outcome.result.headline
              )}
            </p>
          </>
        ) : (
          <p className="error">
            <span className="badge bad">Error</span>
            {outcome.message}
          </p>
        )}
      </div>
    </section>
  );
}
