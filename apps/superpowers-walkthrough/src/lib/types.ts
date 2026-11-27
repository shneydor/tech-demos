export type TalkRole = "partner" | "agent" | "subagent";

export type Turn =
  | {
      kind: "talk";
      role: TalkRole;
      speaker: string;
      body: string;
    }
  | {
      kind: "command";
      speaker: string;
      command: string;
      output: string;
    };

export type StepId = "brainstorm" | "plan" | "tdd" | "handoff" | "review";

export type Step = {
  id: StepId;
  label: string;
  skill: string;
  provenance: "recorded" | "illustrative";
  note: string;
  turns: Turn[];
};

export type Session = {
  feature: string;
  recordedOn: string;
  harness: string;
  steps: Step[];
};

export type Skill = {
  name: string;
  description: string;
  group: string;
  path: string;
  body: string;
};

export type Catalog = {
  sourceRepo: string;
  sourceSha: string;
  sourceVersion: string;
  license: string;
  copyright: string;
  skills: Skill[];
};
