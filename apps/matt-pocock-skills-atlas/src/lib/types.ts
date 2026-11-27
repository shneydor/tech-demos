export type Category = "engineering" | "productivity" | "in-progress" | "misc";
export type Invocation = "user" | "model";

export type AtlasSkill = {
  name: string;
  description: string;
  category: Category;
  invocation: Invocation;
  body: string;
  path: string;
  calls: string[];
  prerequisite: string[];
  calledBy: string[];
  youTypeNext: string[];
  youTypePrev: string[];
  crossesInvocationRule: boolean;
};

export type Handoff = {
  from: string;
  to: string;
  source: string;
};

export type Atlas = {
  upstream: string;
  homepage: string;
  commit: string;
  version: string;
  license: string;
  copyright: string;
  skillCount: number;
  handoffs: Handoff[];
  skills: AtlasSkill[];
};

export type SessionTurn = {
  role: "user" | "agent";
  text: string;
};

export type SessionArtifact = {
  name: string;
  body: string;
};

export type WalkStepId = "grill-me" | "to-spec" | "to-tickets";

export type SessionStep = {
  id: WalkStepId;
  title: string;
  invocation: string;
  skillNames: string[];
  label: "recorded" | "illustrative";
  note: string;
  turns: SessionTurn[];
  artifacts: SessionArtifact[];
};

export type Session = {
  feature: string;
  featureDetail: string;
  recordedOn: string;
  agent: string;
  model: string;
  skillsCommit: string;
  skillsVersion: string;
  steps: SessionStep[];
};

export const WALK_STEPS: WalkStepId[] = ["grill-me", "to-spec", "to-tickets"];

export const CATEGORY_LABEL: Record<Category, string> = {
  engineering: "Engineering",
  productivity: "Productivity",
  "in-progress": "In progress",
  misc: "Misc",
};
