/**
 * Assemble src/data/session.json from the recorded scratch session.
 * Narrative turns are the session. Command output is read from the log files.
 *
 *   bun scripts/build-session.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sessionDir = join(import.meta.dir, "session");
const read = (path: string) => readFileSync(join(sessionDir, path), "utf8").trimEnd();

const design = read("docs/superpowers/specs/2026-11-27-skim-design.md");
const plan = read("docs/superpowers/plans/2026-11-27-skim.md");
const task1Red = read("logs/task1-red.txt");
const task1Green = read("logs/task1-green.txt");
const task2Red = read("logs/task2-red.txt");
const task2Green = read("logs/task2-green.txt");
const task2Report = read("logs/task2-report.md");
const review = read("logs/review-report.md");

const session = {
  feature: "skim",
  recordedOn: "2026-11-27",
  harness:
    "Cursor cloud agent. Task 1 ran in this session. Task 2 and the review each ran in a fresh subagent that did not receive the earlier transcript.",
  steps: [
    {
      id: "brainstorm",
      label: "Brainstorm",
      skill: "brainstorming",
      provenance: "recorded",
      note: "Recorded against skills/brainstorming/SKILL.md at 22f0b463. The partner lines are the brief locked in this demo's plan, not a live person. No product code was written in this step.",
      turns: [
        {
          kind: "talk",
          role: "partner",
          speaker: "Partner",
          body: "I keep getting paragraphs from coding agents that are too long to skim. I want a tiny TypeScript function, skim(text, maxWords), I can call from other code. It should tell me the word count, whether that is over the cap, and a headline of the leading words. No UI. Success is trusting those three fields. A failure would be a clever summarizer, a cut through the middle of a word, or a character count wearing a word count's name.",
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "You want a function you can call, not a screen. You hand it a paragraph and a cap because agent text runs long, and you want three facts back: how many words, whether that is over the cap, and a headline of the leading words. Success is trusting those three. A rewrite of the paragraph, a cut through a word, or a character count labeled as words would miss it, even if the function returned.\n\nNothing exists for this yet. It would be a new module and a test file.\n\nOne choice still changes the function. When you say word, do you mean a split on whitespace, so well-known stays one word, or a language-aware split? I would ship the whitespace split: it is predictable and it matches a skim check. A language-aware split handles some scripts better and pulls in more rules than this function needs.",
        },
        {
          kind: "talk",
          role: "partner",
          speaker: "Partner",
          body: "Whitespace. Empty text is 0 words, status ok, headline empty. Whitespace-only is empty too. Status is over only when the count is greater than the cap. The cap has to be an integer of at least 1, otherwise throw TypeError. Collapse whitespace to single spaces in the headline. If you clip, end with one … character. If you don't clip, no ellipsis. A hyphenated token is one word. No HTML, no sentence detection, no stemming. Two tasks: counting first, headline second. bun test. You pick how it is built.",
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Three ways to build it:\n\n1. One function that splits on whitespace. Predictable, no dictionary, matches why you want it. Weaker for scripts that do not separate words with spaces.\n2. Intl.Segmenter. Better for some of those scripts. More API than you asked for.\n3. A character cap. Smaller, and it is the failure you named, so it is out.\n\nI will go with 1. The design is next.",
        },
        {
          kind: "talk",
          role: "partner",
          speaker: "Partner",
          body: "Go with the split. Write the short design.",
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Short design, written to docs/superpowers/specs/2026-11-27-skim-design.md. The error string and the file paths are my calls.\n\n" + design,
        },
        {
          kind: "talk",
          role: "partner",
          speaker: "Partner",
          body: "Approved.",
        },
      ],
    },
    {
      id: "plan",
      label: "Plan",
      skill: "writing-plans",
      provenance: "recorded",
      note: "Recorded against skills/writing-plans/SKILL.md after the design was approved. The self-review is that skill's checklist, run by the same agent, not a second model.",
      turns: [
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "I'm using the writing-plans skill to create the implementation plan.\n\nSaved to docs/superpowers/plans/2026-11-27-skim.md.\n\n" + plan,
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Self-review against the spec:\n\n1. Spec coverage. Count, status, validation, and clipping each have a task. Non-goals are not tasks.\n2. Steps. Each test step has the assertions. Each code step has the signature and the rule, not a function body.\n3. Types. Both tasks use skim(text: string, maxWords: number): SkimResult with the same four fields.\n4. Review focus. NaN, whitespace-only, hyphen, the ellipsis character, and an exact cap each have a test on the task that owns them.\n5. Proportion. The plan is longer than the spec because the tests are written out. It does not contain the function body.\n\nPlan complete and saved to docs/superpowers/plans/2026-11-27-skim.md. Two tasks share one signature, and a bad clip can be rejected without redoing the count. I recommend subagent-driven for that reason. Does the plan capture what you want, and which approach should we use?",
        },
        {
          kind: "talk",
          role: "partner",
          speaker: "Partner",
          body: "Subagent-driven. The plan matches.",
        },
      ],
    },
    {
      id: "tdd",
      label: "TDD",
      skill: "test-driven-development",
      provenance: "recorded",
      note: "Recorded. Task 1 in /tmp/skim-session with bun 1.4.5. The command output is the log file, unedited. Commit 76b41348a96733de5107cee8eb557fceb2e942af.",
      turns: [
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Using test-driven development for Task 1: count, status, and validation. The test file is the six tests from the plan. src/skim.ts exports skim and throws Error(\"not implemented\"). No counting code yet.",
        },
        {
          kind: "command",
          speaker: "bun test · red",
          command: "bun test tests/skim.test.ts",
          output: task1Red,
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "6 fail, 0 pass. Five tests die on \"not implemented\", which is the missing feature. The cap test expected TypeError and received Error, because the stub throws before any validation. That is still the missing function, not a typo, so I implement from the tests.\n\nValidate maxWords first. Split the trimmed text on whitespace. Status is over only when the count is greater than the cap. Headline is the collapsed words with no clipping yet. That clip is Task 2.",
        },
        {
          kind: "command",
          speaker: "bun test · green",
          command: "bun test tests/skim.test.ts",
          output: task1Green,
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "6 pass, 0 fail. Committed as 76b4134, \"feat: count words and reject a bad cap\".",
        },
      ],
    },
    {
      id: "handoff",
      label: "Handoff",
      skill: "subagent-driven-development",
      provenance: "recorded",
      note: "Recorded. A fresh implementer subagent got task-2-brief.md and the test-driven-development skill. It did not get the brainstorm transcript. Commit aedc0beb7029915e24ac1e689fe40159943e2ac0.",
      turns: [
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Using subagent-driven development. Ledger: # SDD ledger — plan: docs/superpowers/plans/2026-11-27-skim.md\n\nPreflight, before any implementer:\n\nTask 1 and Task 2 share src/skim.ts and tests/skim.test.ts. Task 1 produces skim with an unclipped headline. Task 2 keeps that signature and only changes clipping. The tests agree with those steps. The error string and the ellipsis character match the global constraints. No conflict to rule on.\n\nTask 1 is already committed (76b4134, 6 pass). The controller did that task so the red and green logs above would be from this session. Ruling: the scratch repo is its own branch, feature/skim, not the gallery repo. The brief asked for a standalone function. Cost if wrong: the sample is copied into the demo and merged nowhere else.\n\nDispatching a fresh implementer for Task 2 only, on a fast model. The plan already has the tests and the signature, so the work is the red/green cycle plus the clip. The brief is task-2-brief.md. The implementer does not get this transcript.",
        },
        {
          kind: "command",
          speaker: "Implementer · bun test · red",
          command: "bun test tests/skim.test.ts",
          output: task2Red,
        },
        {
          kind: "command",
          speaker: "Implementer · bun test · green",
          command: "bun test tests/skim.test.ts",
          output: task2Green,
        },
        {
          kind: "talk",
          role: "subagent",
          speaker: "Implementer",
          body: task2Report,
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Status from the implementer: DONE. Commit aedc0be, \"feat: clip the skim headline on a word boundary\". 10 pass, 0 fail. The red log failed on the two clip assertions and left the Task 1 tests green. Ledger marks Task 2 complete. No concerns to send back.",
        },
      ],
    },
    {
      id: "review",
      label: "Review",
      skill: "requesting-code-review",
      provenance: "recorded",
      note: "Recorded. A fresh reviewer subagent used skills/requesting-code-review/code-reviewer.md. Read-only. Base 0f3dfd81b869fd3f0ac2193b5b2fd02e61b2ca78, head aedc0beb7029915e24ac1e689fe40159943e2ac0.",
      turns: [
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "Using requesting-code-review before calling the feature done.\n\nBASE_SHA=0f3dfd81b869fd3f0ac2193b5b2fd02e61b2ca78\nHEAD_SHA=aedc0beb7029915e24ac1e689fe40159943e2ac0\n\nDispatching a fresh reviewer with the code-reviewer template. Description: skim(text, maxWords), word count, over/ok, headline clipped on a word boundary. Requirements: the spec and the plan. The reviewer does not get this transcript and does not edit the repo.",
        },
        {
          kind: "talk",
          role: "subagent",
          speaker: "Reviewer",
          body: review,
        },
        {
          kind: "talk",
          role: "agent",
          speaker: "Agent",
          body: "No Critical issues. No Important issues. Ready to merge: yes.\n\nFour minor notes, left for later, which is what this skill says to do with minors: pin the TypeError message on every bad cap, not only on 1.5; assert the clipped headline next to status over; test a negative cap; the extra SkimStatus export is slightly wider than the plan's name for the type. I am not changing the tests in this session. The function the page runs is the reviewed one.",
        },
      ],
    },
  ],
};

const out = join(import.meta.dir, "../src/data/session.json");
writeFileSync(out, JSON.stringify(session, null, 2) + "\n");
console.log(`wrote ${out}`);
