import { useEffect, useRef } from "react";
import catalog from "../data/skills.json";
import session from "../data/session.json";
import { Markdown } from "../lib/markdown";
import { STEP_IDS, walkHash } from "../lib/routes";
import type { Catalog, Session, StepId } from "../lib/types";
import { TrySkim } from "./TrySkim";

const skills = (catalog as Catalog).skills;
const recorded = session as Session;
const PIN = (catalog as Catalog).sourceSha;

type Props = {
  step: StepId;
};

export function Walkthrough({ step }: Props) {
  const current = recorded.steps.find((item) => item.id === step) ?? null;
  const skill = current ? skills.find((item) => item.name === current.skill) : undefined;
  const index = current ? STEP_IDS.indexOf(current.id) : -1;
  const skillPane = useRef<HTMLElement>(null);
  const transcriptPane = useRef<HTMLElement>(null);

  useEffect(() => {
    skillPane.current?.scrollTo(0, 0);
    transcriptPane.current?.scrollTo(0, 0);
  }, [current?.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const next = index + (event.key === "ArrowRight" ? 1 : -1);
      const id = STEP_IDS[next];
      if (!id) return;
      event.preventDefault();
      location.hash = walkHash(id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  if (!current) return <p className="missing">That step is not in the session.</p>;

  const linkRoot = skill
    ? `https://github.com/obra/superpowers/blob/${PIN}/${skill.path.replace(/\/SKILL\.md$/, "/")}`
    : `https://github.com/obra/superpowers/blob/${PIN}/`;

  return (
    <div className="walk">
      <nav className="rail" aria-label="Walkthrough steps">
        {recorded.steps.map((item, itemIndex) => {
          const active = item.id === current.id;
          return (
            <a
              key={item.id}
              href={walkHash(item.id)}
              className={active ? "step active" : "step"}
              aria-current={active ? "step" : undefined}
            >
              <span>{itemIndex + 1}</span>
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="split">
        <article className="pane" ref={skillPane}>
          {skill ? (
            <>
              <header className="pane-head">
                <p className="kicker">{skill.group}</p>
                <h2>{titleFrom(skill.body, skill.name)}</h2>
                <p className="desc">{skill.description}</p>
                <p className="file">
                  <a href={`https://github.com/obra/superpowers/blob/${PIN}/${skill.path}`}>
                    {skill.path}
                  </a>
                </p>
              </header>
              <Markdown source={skill.body} linkRoot={linkRoot} />
            </>
          ) : (
            <p className="missing">This step's skill is not in the pinned catalog.</p>
          )}
        </article>

        <article className="pane transcript" ref={transcriptPane} aria-label="Session transcript">
          <header className="pane-head">
            <p className="kicker">Session</p>
            <h2>{current.label}</h2>
            <p className={`stamp ${current.provenance}`}>{current.provenance}</p>
            <p className="note">{current.note}</p>
          </header>
          <ol className="turns">
            {current.turns.map((turn, turnIndex) => {
              const tone =
                turn.kind === "command"
                  ? /red/i.test(turn.speaker)
                    ? "red"
                    : /green/i.test(turn.speaker)
                      ? "green"
                      : ""
                  : "";
              return (
                <li
                  key={`${current.id}-${turnIndex}`}
                  className={`turn ${turn.kind} ${turn.kind === "talk" ? turn.role : "command"} ${tone}`}
                >
                  <p className="who">{turn.speaker}</p>
                  {turn.kind === "command" ? (
                    <>
                      <pre className="cmd">
                        <code>{turn.command}</code>
                      </pre>
                      <pre className="out">
                        <code>{turn.output}</code>
                      </pre>
                    </>
                  ) : (
                    <Markdown source={turn.body} linkRoot={`https://github.com/obra/superpowers/blob/${PIN}/`} />
                  )}
                </li>
              );
            })}
          </ol>
          <div className="pager">
            <Pager dir={-1} index={index} />
            <Pager dir={1} index={index} />
          </div>
        </article>
      </div>
      <TrySkim />
    </div>
  );
}

function Pager({ dir, index }: { dir: -1 | 1; index: number }) {
  const next = STEP_IDS[index + dir];
  if (!next) {
    return (
      <span className="pager-slot">
        {dir < 0 ? "Start" : "End"}
      </span>
    );
  }
  const label = dir < 0 ? `Back · ${labelOf(next)}` : `Next · ${labelOf(next)}`;
  return (
    <a className="pager-link" href={walkHash(next)}>
      {label}
    </a>
  );
}

function labelOf(id: StepId): string {
  return recorded.steps.find((step) => step.id === id)?.label ?? id;
}

function titleFrom(body: string, fallback: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? fallback;
}

