/**
 * Build-time recorder. Authors two synthetic runs, then checks them with
 * agent-think-map 0.2.1: classify, parse, envelope, reduce, compare.
 * Nothing here talks to Claude, Codex, or an SSE endpoint.
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";
import {
  classifyToolName,
  operationFromName,
  parseAgentTraceEvent,
  parseTraceEnvelope,
  reasonFor,
  redactSecrets,
  reduceTraceAll,
  type AgentTraceEvent,
  type TraceNode,
} from "agent-think-map";

const require = createRequire(import.meta.url);
const packageJson = require.resolve("agent-think-map/package.json");
const diffModule = pathToFileURL(join(dirname(packageJson), "packages/core/src/diff.ts"));
const { compareRuns } = (await import(diffModule.href)) as {
  compareRuns: (
    badRunId: string,
    goodRunId: string,
    badEvents: readonly AgentTraceEvent[],
    goodEvents: readonly AgentTraceEvent[],
  ) => {
    diffId: string;
    badRunId: string;
    goodRunId: string;
    analyzerVersion: number;
    fingerprintVersion: 1;
    provisional: true;
    warnings: string[];
    firstDivergence?: number;
    rows: Array<{
      goodOrdinal?: number;
      badOrdinal?: number;
      classification: string;
      match: string;
      matchBasis: string;
      confidence: string;
      reason: string;
    }>;
    good: { steps: Analyzed[] };
    bad: { steps: Analyzed[] };
  };
};

interface Analyzed {
  ordinal: number;
  nodeId: string;
  kind: string;
  status: string;
  operation: { name: string; providerName?: string; server?: string };
  error?: string;
  durationMs?: number;
}

const PROMPT = redactSecrets(
  "File a GitHub issue for the login form overflowing on 320px screens.",
);
const FAILED_ID = "run-login-skipped-skill";
const RETRY_ID = "run-login-skill-retry";
const SKILL_PATH = ".claude/skills/frontend-engineer/SKILL.md";

interface Draft {
  type: string;
  ts: number;
  id?: string;
  runId?: string;
  [key: string]: unknown;
}

function clean(text: string): string {
  return redactSecrets(text);
}

function thinking(id: string, parentId: string, text: string, ts: number, durationMs: number): Draft[] {
  return [
    {
      type: "node.started",
      id,
      kind: "thinking",
      title: "Thinking",
      operation: operationFromName("thinking"),
      parentId,
      reason: clean("The agent recorded a reasoning step before choosing a tool."),
      ts,
    },
    { type: "node.delta", id, text: clean(text), ts: ts + 40 },
    {
      type: "node.completed",
      id,
      outputPreview: clean(text),
      durationMs,
      ts: ts + durationMs,
    },
  ];
}

function answer(id: string, parentId: string, text: string, ts: number, durationMs: number): Draft[] {
  const body = clean(text);
  return [
    {
      type: "node.started",
      id,
      kind: "answer",
      title: "Answer",
      operation: operationFromName("answer"),
      parentId,
      ts,
    },
    { type: "node.delta", id, text: body, ts: ts + 40 },
    {
      type: "node.completed",
      id,
      outputPreview: body,
      durationMs,
      ts: ts + durationMs,
    },
  ];
}

function call(options: {
  id: string;
  toolName: string;
  input: Record<string, unknown>;
  parentId: string;
  ts: number;
  inputSummary: string;
}): { events: Draft[]; kind: string; title: string } {
  const classified = classifyToolName(options.toolName, options.input);
  const reason = reasonFor({
    kind: classified.kind,
    title: classified.title,
    server: classified.server,
    tool: classified.tool,
    inputSummary: options.inputSummary,
  });
  return {
    kind: classified.kind,
    title: classified.title,
    events: [
      {
        type: "node.started",
        id: options.id,
        kind: classified.kind,
        title: classified.title,
        operation: operationFromName(options.toolName),
        parentId: options.parentId,
        reason: clean(reason),
        ts: options.ts,
      },
      {
        type: "tool.input",
        id: options.id,
        partial: JSON.stringify(options.input),
        ts: options.ts + 24,
      },
    ],
  };
}

function finish(id: string, output: string, ts: number, durationMs: number): Draft {
  return {
    type: "node.completed",
    id,
    outputPreview: clean(output),
    durationMs,
    ts,
  };
}

function fail(id: string, error: string, ts: number): Draft {
  return { type: "node.failed", id, error: clean(error), ts };
}

function runMeta(runId: string, ts: number): Draft {
  return {
    type: "run.meta",
    runId,
    model: "none — recorded replay",
    effort: "scripted",
    ts,
  };
}

const failedDraft: Draft[] = [
  { type: "run.started", runId: FAILED_ID, prompt: PROMPT, ts: 0 },
  runMeta(FAILED_ID, 30),
  ...thinking(
    "think-fail",
    `user-${FAILED_ID}`,
    "The report says overflow. I will skip the skill file and run the test script, then search the lockfile.",
    80,
    180,
  ),
  ...call({
    id: "tool-bash",
    toolName: "Bash",
    input: { command: "npm test" },
    parentId: "think-fail",
    ts: 300,
    inputSummary: "npm test",
  }).events,
  fail("tool-bash", 'npm error Missing script: "test"\nTo see a list of scripts, run:\n  npm run', 520),
  ...call({
    id: "tool-grep",
    toolName: "Grep",
    input: { pattern: "overflow", path: "package-lock.json" },
    parentId: "tool-bash",
    ts: 560,
    inputSummary: "package-lock.json",
  }).events,
  finish(
    "tool-grep",
    'package-lock.json\n  node_modules/wrap-ansi: "overflow"\n  node_modules/cli-boxes: "overflow"',
    740,
    160,
  ),
  ...answer(
    "answer-fail",
    "tool-grep",
    "No code change. npm test is not defined, and package-lock.json mentions overflow inside dependencies, so the 320px report looks already handled.",
    820,
    140,
  ),
  {
    type: "run.completed",
    runId: FAILED_ID,
    ts: 1000,
  },
];

const skillCall = call({
  id: "skill-frontend",
  toolName: "Read",
  input: { file_path: SKILL_PATH },
  parentId: "think-ok",
  ts: 280,
  inputSummary: SKILL_PATH,
});
const readCall = call({
  id: "tool-read",
  toolName: "Read",
  input: { file_path: "src/Login.tsx" },
  parentId: "skill-frontend",
  ts: 420,
  inputSummary: "src/Login.tsx",
});
const taskCall = call({
  id: "subagent-layout",
  toolName: "Task",
  input: {
    description: "Check 320px overflow",
    subagent_type: "layout-reviewer",
    prompt: "Review src/Login.tsx at 320px. The form uses a fixed 480px width.",
  },
  parentId: "tool-read",
  ts: 640,
  inputSummary: "layout-reviewer",
});
const mcpCall = call({
  id: "mcp-issue",
  toolName: "mcp__github__create_issue",
  input: {
    title: "Login form overflows at 320px",
    body: "src/Login.tsx uses a fixed 480px flex row. frontend-engineer says not to ship horizontal scroll at 320px.",
  },
  parentId: "subagent-layout",
  ts: 980,
  inputSummary: "Login form overflows at 320px",
});

const retryDraft: Draft[] = [
  { type: "run.started", runId: RETRY_ID, prompt: PROMPT, ts: 0 },
  runMeta(RETRY_ID, 30),
  ...thinking(
    "think-ok",
    `user-${RETRY_ID}`,
    "This is a layout bug. Load frontend-engineer, read Login.tsx, ask the layout reviewer, then open a GitHub issue.",
    80,
    160,
  ),
  ...skillCall.events,
  finish(
    "skill-frontend",
    "Use a distinctive layout, check overflow, never ship a horizontal scroll on 320px.",
    360,
    64,
  ),
  ...readCall.events,
  finish(
    "tool-read",
    'export function Login() {\n  return <form className="flex w-[480px]">...</form>;\n}',
    560,
    48,
  ),
  ...taskCall.events,
  finish(
    "subagent-layout",
    "The fixed 480px row overflows a 320px viewport. Do not ship horizontal scroll.",
    920,
    260,
  ),
  ...mcpCall.events,
  finish("mcp-issue", "Created issue #41 in acme/web", 1280, 280),
  ...answer(
    "answer-ok",
    "mcp-issue",
    "Opened GitHub issue #41. Login.tsx is a fixed 480px flex row, so it overflows at 320px. frontend-engineer says not to ship horizontal scroll at that width.",
    1360,
    120,
  ),
  { type: "run.completed", runId: RETRY_ID, ts: 1520 },
];

function materialize(drafts: Draft[], runId: string) {
  const events = drafts.map((draft) => parseAgentTraceEvent(draft));
  const envelopes = events.map((event, sequence) => {
    const stableId =
      "id" in event && typeof event.id === "string" ? `${event.type}:${event.id}:${event.ts}` : `${event.type}:${runId}:${event.ts}`;
    return parseTraceEnvelope(event, {
      provider: "custom",
      sessionId: runId,
      stableId,
      sequence,
    });
  });
  const state = reduceTraceAll(events);
  const nodes = state.nodes.map((node) => summarizeNode(node));
  return { events, envelopes, state, nodes };
}

function summarizeNode(node: TraceNode) {
  const elapsedMs = node.completedAt == null ? null : node.completedAt - node.startedAt;
  return {
    id: node.id,
    kind: node.kind,
    title: node.title,
    status: node.status,
    reason: node.reason ?? "",
    text: node.text,
    input: node.input ?? null,
    outputPreview: node.outputPreview ?? null,
    error: node.error ?? null,
    durationMs: node.durationMs ?? null,
    elapsedMs,
    durationSource: node.durationMs != null ? "durationMs" : elapsedMs != null ? "timestamps" : null,
    operation: node.operation ?? null,
  };
}

function stepsOf(steps: Analyzed[]) {
  return steps.map((step) => ({
    ordinal: step.ordinal,
    nodeId: step.nodeId,
    kind: step.kind,
    status: step.status,
    operationName: step.operation.name,
    providerName: step.operation.providerName ?? null,
    error: step.error ?? null,
    durationMs: step.durationMs ?? null,
  }));
}

function assertStory(options: {
  failed: ReturnType<typeof materialize>;
  retry: ReturnType<typeof materialize>;
  diff: ReturnType<typeof compareRuns>;
}) {
  const { failed, retry, diff } = options;
  if (failed.state.status !== "failed") {
    throw new Error(`Failed run status is ${failed.state.status}, expected failed.`);
  }
  if (failed.state.nodes.some((node) => node.kind === "skill")) {
    throw new Error("Failed run loaded a skill.");
  }
  const bash = failed.state.nodes.find((node) => node.id === "tool-bash");
  if (!bash || bash.status !== "failed" || !bash.error?.includes("Missing script")) {
    throw new Error("Failed run is missing the npm test failure.");
  }
  if (bash.operation?.providerName !== "Bash") {
    throw new Error("Bash step has no captured Bash operation.");
  }
  if (retry.state.status !== "completed") {
    throw new Error(`Retry status is ${retry.state.status}, expected completed.`);
  }
  const skill = retry.state.nodes.find((node) => node.id === "skill-frontend");
  if (!skill || skill.kind !== "skill" || skill.title !== "frontend-engineer") {
    throw new Error(`Skill classification was ${skill?.kind ?? "missing"} / ${skill?.title ?? ""}.`);
  }
  if (!retry.state.nodes.some((node) => node.id === "tool-read" && node.kind === "tool")) {
    throw new Error("Retry is missing the Login.tsx Read.");
  }
  if (!retry.state.nodes.some((node) => node.kind === "subagent")) {
    throw new Error("Retry is missing the subagent.");
  }
  if (!retry.state.nodes.some((node) => node.kind === "mcp" && node.title === "github / create_issue")) {
    throw new Error("Retry is missing the GitHub MCP call.");
  }
  const skillOrdinal = diff.good.steps.find((step) => step.nodeId === "skill-frontend")?.ordinal;
  const bashOrdinal = diff.bad.steps.find((step) => step.nodeId === "tool-bash")?.ordinal;
  if (skillOrdinal == null || bashOrdinal == null) {
    throw new Error("Analyzer dropped the skill or Bash step.");
  }
  if (!diff.rows.some((row) => row.classification === "missing" && row.goodOrdinal === skillOrdinal)) {
    throw new Error("compareRuns did not mark the skill as missing from the failed run.");
  }
  if (!diff.rows.some((row) => row.classification === "inserted" && row.badOrdinal === bashOrdinal)) {
    throw new Error("compareRuns did not mark Bash as inserted in the failed run.");
  }
  if (skillCall.kind !== "skill" || readCall.kind !== "tool" || taskCall.kind !== "subagent" || mcpCall.kind !== "mcp") {
    throw new Error(
      `classifyToolName kinds were skill=${skillCall.kind} read=${readCall.kind} task=${taskCall.kind} mcp=${mcpCall.kind}.`,
    );
  }
}

const failed = materialize(failedDraft, FAILED_ID);
const retry = materialize(retryDraft, RETRY_ID);
const diff = compareRuns(FAILED_ID, RETRY_ID, failed.events, retry.events);
assertStory({ failed, retry, diff });

const replay = {
  provenance: {
    package: "agent-think-map",
    version: "0.2.1",
    tag: "v0.2.1",
    commit: "5ee8ffc291b240518b5dfb439b617a3c7db9880b",
    recorded: true,
    live: false,
    provider: "custom",
    note: "These events were authored for this page, then parsed, enveloped, reduced, and compared by agent-think-map 0.2.1 at build time. They were not captured from Claude Code or Codex. This page does not open Studio, a hook, or an SSE stream.",
  },
  prompt: PROMPT,
  focus: {
    failedToolId: "tool-bash",
    failedAnswerId: "answer-fail",
    skillId: "skill-frontend",
    readId: "tool-read",
    subagentId: "subagent-layout",
    mcpId: "mcp-issue",
    retryAnswerId: "answer-ok",
  },
  failed: {
    runId: FAILED_ID,
    label: "Skipped the skill",
    status: failed.state.status,
    events: failed.events,
    envelopes: failed.envelopes,
    nodes: failed.nodes,
  },
  retry: {
    runId: RETRY_ID,
    label: "Loaded the skill",
    status: retry.state.status,
    events: retry.events,
    envelopes: retry.envelopes,
    nodes: retry.nodes,
  },
  comparison: {
    diffId: diff.diffId,
    analyzerVersion: diff.analyzerVersion,
    fingerprintVersion: diff.fingerprintVersion,
    provisional: diff.provisional,
    warnings: diff.warnings,
    firstDivergence: diff.firstDivergence ?? null,
    rows: diff.rows,
    badSteps: stepsOf(diff.bad.steps),
    goodSteps: stepsOf(diff.good.steps),
  },
};

const out = join(dirname(fileURLToPath(import.meta.url)), "../src/data/replay.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(replay, null, 2)}\n`);
console.log(
  `Wrote ${out} (${failed.events.length} failed events, ${retry.events.length} retry events, ${diff.rows.length} comparison rows).`,
);
