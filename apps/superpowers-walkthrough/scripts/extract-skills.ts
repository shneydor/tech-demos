/**
 * Read obra/superpowers skill files at a pinned checkout and write src/data/skills.json.
 * bun run build does not run this. Refresh with:
 *   bun scripts/extract-skills.ts /tmp/superpowers
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { execSync } from "node:child_process";

const PIN = "22f0b463e7a5e579904dd6211a520321035526f7";
const checkout = process.argv[2] ?? "/tmp/superpowers";
const outPath = join(import.meta.dir, "../src/data/skills.json");

const groups: Record<string, string> = {
  "test-driven-development": "Testing",
  "systematic-debugging": "Debugging",
  "verification-before-completion": "Debugging",
  "diagnosing-superpowers": "Debugging",
  brainstorming: "Collaboration",
  "writing-plans": "Collaboration",
  "executing-plans": "Collaboration",
  "dispatching-parallel-agents": "Collaboration",
  "requesting-code-review": "Collaboration",
  "receiving-code-review": "Collaboration",
  "using-git-worktrees": "Collaboration",
  "finishing-a-development-branch": "Collaboration",
  "subagent-driven-development": "Collaboration",
  "writing-skills": "Meta",
  "using-superpowers": "Meta",
};

const sha = execSync("git rev-parse HEAD", { cwd: checkout }).toString().trim();
if (sha !== PIN) {
  throw new Error(`checkout ${checkout} is ${sha}, expected ${PIN}`);
}

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const info = statSync(path);
    if (info.isDirectory()) found.push(...walk(path));
    else if (entry === "SKILL.md") found.push(path);
  }
  return found;
}

function frontmatter(body: string): { name: string; description: string } {
  const match = body.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("missing frontmatter");
  const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = match[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!name || !description) throw new Error(`frontmatter missing name or description:\n${match[1]}`);
  return {
    name,
    description: description.replace(/^["']|["']$/g, ""),
  };
}

const skillsRoot = join(checkout, "skills");
const files = walk(skillsRoot).sort();
const skills = files.map((file) => {
  const body = readFileSync(file, "utf8");
  const meta = frontmatter(body);
  const path = relative(checkout, file).split("\\").join("/");
  return {
    name: meta.name,
    description: meta.description,
    group: groups[meta.name] ?? "Other",
    path,
    body,
  };
});

const payload = {
  sourceRepo: "https://github.com/obra/superpowers",
  sourceSha: sha,
  sourceVersion: "7.0.2",
  license: "MIT",
  copyright: "Copyright (c) 2025 Jesse Vincent",
  skills,
};

mkdirSync(join(import.meta.dir, "../src/data"), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`wrote ${skills.length} skills to ${outPath}`);
