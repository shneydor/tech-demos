import { useEffect, useRef, useState } from "react";
import type { Atlas, Session, WalkStepId } from "../lib/types.ts";
import { WALK_STEPS } from "../lib/types.ts";

type Props = {
  atlas: Atlas;
  session: Session;
  step: WalkStepId;
  onStep: (step: WalkStepId) => void;
  onBack: () => void;
};

export function Walkthrough({ atlas, session, step, onStep, onBack }: Props) {
  const current = session.steps.find((item) => item.id === step) ?? session.steps[0];
  const [shown, setShown] = useState(1);
  const [skillName, setSkillName] = useState(current.skillNames[0] ?? "");
  const [playing, setPlaying] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    setShown(1);
    setSkillName(current.skillNames[0] ?? "");
    setPlaying(false);
  }, [current]);

  useEffect(() => {
    if (!playing) return;
    if (shown >= current.turns.length) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setShown((count) => count + 1), 1400);
    return () => window.clearTimeout(timer);
  }, [playing, shown, current.turns.length]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelectorAll("li").item(shown - 1);
    if (!(item instanceof HTMLElement)) return;
    const top = item.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    list.scrollTop = top;
  }, [shown, step]);

  const skill = atlas.skills.find((item) => item.name === skillName) ?? null;
  const turns = current.turns.slice(0, shown);
  const atEnd = shown >= current.turns.length;
  const label = current.label === "recorded" ? "Recorded" : "Illustrative";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div>
          <button type="button" className="text-sm underline" onClick={onBack}>
            Back to the atlas
          </button>
          <h2 className="mt-2 font-serif text-2xl">{session.feature}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{session.featureDetail}</p>
        </div>
        <p className="min-h-16 rounded-md border border-rule bg-paper-2 px-3 py-2 text-sm leading-6 text-muted">
          <span className={current.label === "recorded" ? "text-teal" : "text-rust"}>{label}.</span> {current.note}{" "}
          {session.recordedOn}, {session.model}, skills@{session.skillsCommit.slice(0, 7)}. The page replays this
          transcript. It does not call a model.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {WALK_STEPS.map((id, index) => {
          const item = session.steps.find((stepItem) => stepItem.id === id);
          const active = id === current.id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onStep(id)}
              className={`rounded-md border px-3 py-2 text-left text-sm ${
                active ? "border-ink bg-ink text-paper-2" : "border-rule bg-paper-2"
              }`}
            >
              {index + 1}. {item?.invocation ?? id}
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <section className="rounded-md border border-rule bg-paper-2 p-3">
          <h3 className="font-serif text-lg">Skill text</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {current.skillNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSkillName(name)}
                className={`rounded-full border px-2 py-0.5 font-mono text-xs ${
                  name === skillName ? "border-teal bg-teal text-paper-2" : "border-rule"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          {skill ? (
            <pre className="mt-3 max-h-[36rem] overflow-auto font-mono text-xs leading-5 whitespace-pre-wrap">
              {skill.body}
            </pre>
          ) : (
            <p className="mt-3 text-sm text-muted">This step was not recorded.</p>
          )}
        </section>

        <section className="rounded-md border border-rule bg-paper-2 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-lg">Session</h3>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md border border-rule px-2 py-1 text-sm disabled:opacity-40"
                onClick={() => setShown((count) => Math.max(1, count - 1))}
                disabled={shown <= 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-md border border-rule px-2 py-1 text-sm disabled:opacity-40"
                onClick={() => setShown((count) => Math.min(current.turns.length, count + 1))}
                disabled={atEnd}
              >
                Next
              </button>
              <button
                type="button"
                className="rounded-md bg-ink px-2 py-1 text-sm text-paper-2"
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted">
            Turn {Math.min(shown, current.turns.length)} of {current.turns.length}
          </p>
          {current.turns.length === 0 ? (
            <p className="mt-3 text-sm">This step was not recorded.</p>
          ) : (
            <ol ref={listRef} className="relative mt-3 flex max-h-[36rem] flex-col gap-3 overflow-auto">
              {turns.map((turn, index) => (
                <li
                  key={`${turn.role}-${index}`}
                  className={`rounded-md px-3 py-2 text-sm leading-6 whitespace-pre-wrap ${
                    turn.role === "user" ? "bg-teal-soft" : "bg-paper"
                  }`}
                >
                  <div className="mb-1 font-mono text-xs text-muted">{turn.role === "user" ? "You" : "Agent"}</div>
                  <RichText text={turn.text} />
                </li>
              ))}
            </ol>
          )}
          {atEnd && current.artifacts.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="font-serif text-base">Published files</h4>
              {current.artifacts.map((artifact) => (
                <article key={artifact.name} className="rounded-md border border-rule bg-paper p-3">
                  <h5 className="font-mono text-xs">{artifact.name}</h5>
                  <pre className="mt-2 max-h-80 overflow-auto font-mono text-xs leading-5 whitespace-pre-wrap">
                    {artifact.body}
                  </pre>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={index} className="font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
