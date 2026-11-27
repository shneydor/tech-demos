import type { AtlasSkill } from "../lib/types.ts";
import { CATEGORY_LABEL } from "../lib/types.ts";

type Props = {
  skill: AtlasSkill | null;
  missingName: string | null;
  hidden: boolean;
  onShow: () => void;
  onOpen: (name: string) => void;
};

export function SkillDetail({ skill, missingName, hidden, onShow, onOpen }: Props) {
  if (!skill) {
    return (
      <aside className="rounded-md border border-dashed border-rule bg-paper-2 p-4 text-sm text-muted">
        {missingName
          ? `No skill named ${missingName} is in this pack.`
          : "Select a skill to read its file, who calls it, and what you type next."}
      </aside>
    );
  }

  return (
    <aside
      id="skill-detail"
      className="flex min-h-0 flex-col gap-3 rounded-md border border-rule bg-paper-2 p-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-auto"
    >
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="font-mono text-lg text-ink">{skill.name}</h2>
        <Badge tone={skill.invocation === "user" ? "teal" : "rust"}>
          {skill.invocation === "user" ? "User-invoked" : "Model-invoked"}
        </Badge>
        <Badge tone="ink">{CATEGORY_LABEL[skill.category]}</Badge>
      </div>
      <p className="text-sm leading-6 text-ink">{skill.description}</p>
      {hidden && (
        <p className="text-sm text-muted">
          The current filters hide this card.{" "}
          <button type="button" className="underline" onClick={onShow}>
            Show it in the grid
          </button>
        </p>
      )}
      {skill.crossesInvocationRule && (
        <p className="rounded-md bg-rust-soft px-3 py-2 text-sm text-rust">
          This user-invoked skill calls another user-invoked skill. The pack's rule says a user-invoked skill calls model-invoked skills only.
        </p>
      )}
      <EdgeList label="Calls" names={skill.calls} empty="Does not call another skill." onOpen={onOpen} />
      <EdgeList label="Called by" names={skill.calledBy} empty="No other skill calls this one." onOpen={onOpen} />
      <EdgeList
        label="You type next"
        names={skill.youTypeNext}
        empty="Not a handoff on the main flow."
        onOpen={onOpen}
      />
      <EdgeList
        label="You might type this after"
        names={skill.youTypePrev}
        empty="Nothing on the main flow hands off here."
        onOpen={onOpen}
      />
      {skill.prerequisite.length > 0 && (
        <p className="text-sm text-muted">
          If the tracker is not configured, the file says to run{" "}
          <button type="button" className="font-mono underline" onClick={() => onOpen(skill.prerequisite[0])}>
            {skill.prerequisite[0]}
          </button>
          .
        </p>
      )}
      <p className="font-mono text-xs text-muted">{skill.path}</p>
      <pre className="max-h-[28rem] overflow-auto rounded-md border border-rule bg-paper p-3 font-mono text-xs leading-5 whitespace-pre-wrap">
        {skill.body}
      </pre>
    </aside>
  );
}

function EdgeList({
  label,
  names,
  empty,
  onOpen,
}: {
  label: string;
  names: string[];
  empty: string;
  onOpen: (name: string) => void;
}) {
  return (
    <div className="text-sm">
      <div className="text-xs tracking-wide text-muted uppercase">{label}</div>
      {names.length === 0 ? (
        <p className="text-muted">{empty}</p>
      ) : (
        <ul className="mt-1 flex flex-wrap gap-2">
          {names.map((name) => (
            <li key={name}>
              <button
                type="button"
                className="rounded-full border border-rule bg-paper px-2 py-0.5 font-mono text-xs"
                onClick={() => onOpen(name)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Badge({ children, tone }: { children: string; tone: "teal" | "rust" | "ink" }) {
  const toneClass =
    tone === "teal"
      ? "bg-teal-soft text-teal"
      : tone === "rust"
        ? "bg-rust-soft text-rust"
        : "bg-paper text-ink";
  return <span className={`rounded-full px-2 py-0.5 text-xs ${toneClass}`}>{children}</span>;
}
