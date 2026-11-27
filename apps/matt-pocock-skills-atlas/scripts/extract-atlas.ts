/**
 * Build src/data/atlas.json from the vendored SKILL.md files.
 * Calls edges are parsed only from lines that tell the agent to call the Skill tool.
 * You-type-next edges are the short list cited in PLAN.md, not every mention in ask-matt.
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorRoot = join(appRoot, "vendor", "skills");
const source = JSON.parse(readFileSync(join(appRoot, "vendor", "SOURCE.json"), "utf8")) as {
  commit: string;
  version: string;
  license: string;
  copyright: string;
  upstream: string;
  homepage: string;
};

type Category = "engineering" | "productivity" | "in-progress" | "misc";
type Invocation = "user" | "model";

type Handoff = {
  from: string;
  to: string;
  source: string;
};

const handoffs: Handoff[] = [
  {
    from: "grill-with-docs",
    to: "to-spec",
    source: "ask-matt SKILL.md, The main flow: idea → ship",
  },
  {
    from: "to-spec",
    to: "to-tickets",
    source: "ask-matt SKILL.md, The main flow: idea → ship",
  },
  {
    from: "to-tickets",
    to: "implement",
    source: "ask-matt SKILL.md, The main flow: idea → ship",
  },
  {
    from: "to-tickets",
    to: "implement-spec",
    source: "ask-matt SKILL.md, The main flow: idea → ship",
  },
  {
    from: "implement",
    to: "retro",
    source: "ask-matt SKILL.md, The main flow: idea → ship",
  },
  {
    from: "grill-me",
    to: "to-spec",
    source: "docs/productivity/grill-me.md, Where it fits: hand the same conversation to to-spec",
  },
  {
    from: "wayfinder",
    to: "to-spec",
    source: "ask-matt SKILL.md, On-ramps: when the map clears, merge at to-spec",
  },
  {
    from: "triage",
    to: "implement",
    source: "ask-matt SKILL.md, On-ramps: triage produces issues implement picks up",
  },
  {
    from: "diagnosing-bugs",
    to: "retro",
    source: "ask-matt SKILL.md, On-ramps: after the fix, run retro in the same session",
  },
];

type RawSkill = {
  name: string;
  description: string;
  category: Category;
  invocation: Invocation;
  body: string;
  path: string;
  calls: string[];
  prerequisite: string[];
};

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (entry === "SKILL.md") found.push(full);
  }
  return found;
}

function parseFrontmatter(text: string): { name: string; description: string; userInvoked: boolean } {
  if (!text.startsWith("---\n")) throw new Error("SKILL.md is missing frontmatter");
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("SKILL.md frontmatter does not close");
  const front = text.slice(4, end);
  const name = front.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const descriptionLine = front.match(/^description:\s*(.*)$/m)?.[1]?.trim() ?? "";
  let description = descriptionLine.replace(/^["']|["']$/g, "");
  if (description === "" || description === ">" || description === "|") {
    const folded = front.match(/^description:\s*[>|]-?\s*\n((?:[ \t].*\n?)*)/m)?.[1] ?? "";
    description = folded
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ");
  }
  if (!name) throw new Error("SKILL.md is missing name");
  return {
    name,
    description,
    userInvoked: /^disable-model-invocation:\s*true\s*$/m.test(front),
  };
}

function callClauses(body: string): string[] {
  const clauses: string[] = [];
  const re = /[^\n]*\bcall(?:s|ing)? the Skill tool\b[^\n]*/gi;
  for (const match of body.matchAll(re)) clauses.push(match[0]);
  return clauses;
}

function namesIn(clause: string, known: Set<string>): string[] {
  const found = new Set<string>();
  for (const match of clause.matchAll(/["'`]([a-z0-9]+(?:-[a-z0-9]+)*)["'`]/g)) {
    if (known.has(match[1])) found.add(match[1]);
  }
  return [...found];
}

const files = walk(vendorRoot).sort();
const parsed = files.map((file) => {
  const text = readFileSync(file, "utf8");
  const front = parseFrontmatter(text);
  const category = relative(vendorRoot, file).split("/")[0] as Category;
  return { file, text, front, category };
});

const known = new Set(parsed.map((item) => item.front.name));

const skills: RawSkill[] = parsed.map((item) => {
  const calls = new Set<string>();
  for (const clause of callClauses(item.text)) {
    for (const name of namesIn(clause, known)) {
      if (name !== item.front.name) calls.add(name);
    }
  }
  const prerequisite =
    item.front.name === "setup-matt-pocock-skills" || !item.text.includes("/setup-matt-pocock-skills")
      ? []
      : ["setup-matt-pocock-skills"];
  return {
    name: item.front.name,
    description: item.front.description,
    category: item.category,
    invocation: item.front.userInvoked ? "user" : "model",
    body: item.text.replace(/\s+$/, "") + "\n",
    path: relative(join(appRoot, "vendor"), item.file).replaceAll("\\", "/"),
    calls: [...calls].sort(),
    prerequisite,
  };
});

const byName = new Map(skills.map((skill) => [skill.name, skill]));

for (const edge of handoffs) {
  if (!byName.has(edge.from) || !byName.has(edge.to)) {
    throw new Error(`Handoff names a skill that is not in the vendor tree: ${edge.from} → ${edge.to}`);
  }
}

const grill = byName.get("grill-me");
if (!grill || grill.invocation !== "user" || !grill.calls.includes("grilling")) {
  throw new Error("Expected grill-me to be user-invoked and to call grilling");
}
const tdd = byName.get("tdd");
if (!tdd || tdd.invocation !== "model") throw new Error("Expected tdd to be model-invoked");
if (!handoffs.some((edge) => edge.from === "to-spec" && edge.to === "to-tickets")) {
  throw new Error("Expected a you-type-next edge from to-spec to to-tickets");
}

const withEdges = skills
  .map((skill) => {
    const invocationOf = (name: string) => byName.get(name)?.invocation;
    const crossesInvocationRule = skill.calls.some((name) => invocationOf(name) === "user");
    return {
      ...skill,
      calledBy: skills.filter((other) => other.calls.includes(skill.name)).map((other) => other.name).sort(),
      youTypeNext: handoffs.filter((edge) => edge.from === skill.name).map((edge) => edge.to),
      youTypePrev: handoffs.filter((edge) => edge.to === skill.name).map((edge) => edge.from),
      crossesInvocationRule,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const atlas = {
  upstream: source.upstream,
  homepage: source.homepage,
  commit: source.commit,
  version: source.version,
  license: source.license,
  copyright: source.copyright,
  skillCount: withEdges.length,
  handoffs,
  skills: withEdges,
};

const outPath = join(appRoot, "src", "data", "atlas.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(atlas, null, 2) + "\n");

const userCount = withEdges.filter((skill) => skill.invocation === "user").length;
const modelCount = withEdges.length - userCount;
console.log(
  `wrote ${withEdges.length} skills (${userCount} user-invoked, ${modelCount} model-invoked) to ${outPath}`,
);
