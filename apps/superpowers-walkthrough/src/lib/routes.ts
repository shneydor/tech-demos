import type { StepId } from "./types";

export const STEP_IDS: StepId[] = ["brainstorm", "plan", "tdd", "handoff", "review"];

export type Route =
  | { view: "walk"; step: StepId }
  | { view: "skills"; skill: string | null };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, "").replace(/\/$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "skills") {
    const skill = parts[1] ? decodeURIComponent(parts[1]) : null;
    return { view: "skills", skill };
  }
  if (parts[0] === "walk") {
    const step = STEP_IDS.find((id) => id === parts[1]) ?? "brainstorm";
    return { view: "walk", step };
  }
  return { view: "walk", step: "brainstorm" };
}

export function walkHash(step: StepId): string {
  return `#/walk/${step}`;
}

export function skillsHash(skill: string | null): string {
  return skill ? `#/skills/${encodeURIComponent(skill)}` : "#/skills";
}
