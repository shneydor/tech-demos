import type { AtlasSkill } from "../lib/types.ts";

type Node = {
  name: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { name: "grill-me", x: 16, y: 36 },
  { name: "grill-with-docs", x: 176, y: 36 },
  { name: "to-spec", x: 360, y: 36 },
  { name: "to-tickets", x: 520, y: 36 },
  { name: "implement", x: 690, y: 36 },
  { name: "implement-spec", x: 850, y: 36 },
  { name: "retro", x: 1030, y: 36 },
  { name: "grilling", x: 96, y: 168 },
  { name: "domain-modeling", x: 250, y: 168 },
  { name: "tdd", x: 620, y: 168 },
  { name: "code-review", x: 800, y: 168 },
  { name: "writing-for-agents", x: 990, y: 168 },
];

const BOX_W = 148;
const BOX_H = 32;

const placed = new Map(NODES.map((node) => [node.name, node]));

type Props = {
  skills: AtlasSkill[];
  selected: string | null;
  onSelect: (name: string) => void;
};

export function ChainMap({ skills, selected, onSelect }: Props) {
  const byName = new Map(skills.map((skill) => [skill.name, skill]));
  const solids: { key: string; d: string }[] = [];
  const dashes: { key: string; d: string; walk: boolean }[] = [];

  for (const skill of skills) {
    const from = placed.get(skill.name);
    if (!from) continue;
    for (const target of skill.calls) {
      const to = placed.get(target);
      if (!to) continue;
      solids.push({ key: `${skill.name}-${target}`, d: curve(from, to) });
    }
    for (const target of skill.youTypeNext) {
      const to = placed.get(target);
      if (!to || to.y !== from.y) continue;
      const walk =
        (skill.name === "grill-me" && target === "to-spec") ||
        (skill.name === "to-spec" && target === "to-tickets");
      dashes.push({ key: `${skill.name}-${target}`, d: handoff(from, to, walk ? 16 : 6), walk });
    }
  }

  return (
    <div className="overflow-x-auto rounded-md border border-rule bg-paper-2">
      <svg viewBox="0 0 1190 236" className="min-w-[760px]" role="img" aria-label="Skill chain map">
        <text x="16" y="18" className="fill-muted" fontSize="11">
          You type these
        </text>
        <text x="16" y="228" className="fill-muted" fontSize="11">
          The agent may reach for these
        </text>
        {dashes.map((edge) => (
          <path
            key={edge.key}
            d={edge.d}
            fill="none"
            stroke={edge.walk ? "#9a3412" : "#5e564c"}
            strokeWidth={edge.walk ? 1.8 : 1}
            strokeDasharray="5 4"
          />
        ))}
        {solids.map((edge) => (
          <path key={edge.key} d={edge.d} fill="none" stroke="#1f4e5f" strokeWidth="1.4" />
        ))}
        {NODES.map((node) => {
          const skill = byName.get(node.name);
          const active = selected === node.name;
          const user = skill?.invocation === "user";
          return (
            <g
              key={node.name}
              role="button"
              tabIndex={0}
              aria-label={node.name}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect(node.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(node.name);
                }
              }}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={BOX_W}
                height={BOX_H}
                rx="4"
                fill={active ? (user ? "#1f4e5f" : "#9a3412") : "#f7f1e4"}
                stroke={user ? "#1f4e5f" : "#9a3412"}
                strokeWidth={active ? 0 : 1.25}
              />
              <text
                x={node.x + BOX_W / 2}
                y={node.y + 21}
                textAnchor="middle"
                fontSize="12"
                fontFamily="ui-monospace, Menlo, Consolas, monospace"
                fill={active ? "#f7f1e4" : "#1a1814"}
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function center(node: Node) {
  return { x: node.x + BOX_W / 2, y: node.y + BOX_H / 2 };
}

function curve(from: Node, to: Node) {
  const a = center(from);
  const b = center(to);
  const startY = from.y + BOX_H;
  const endY = to.y;
  const mid = (startY + endY) / 2;
  return `M ${a.x} ${startY} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${endY}`;
}

function handoff(from: Node, to: Node, drop: number) {
  const y = from.y + BOX_H + drop;
  const x1 = from.x + BOX_W;
  const x2 = to.x;
  return `M ${x1} ${from.y + BOX_H} L ${x1} ${y} L ${x2} ${y} L ${x2} ${to.y + BOX_H}`;
}
