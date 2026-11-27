import type { WalkStepId } from "./types.ts";
import { WALK_STEPS } from "./types.ts";

export type Route =
  | { screen: "atlas"; skill: string | null }
  | { screen: "walk"; step: WalkStepId };

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (raw === "walk") return { screen: "walk", step: "grill-me" };
  if (raw.startsWith("walk/")) {
    const step = raw.slice("walk/".length);
    if (isWalkStep(step)) return { screen: "walk", step };
    return { screen: "walk", step: "grill-me" };
  }
  if (raw.startsWith("skill/")) {
    const skill = decodeURIComponent(raw.slice("skill/".length));
    return { screen: "atlas", skill: skill || null };
  }
  return { screen: "atlas", skill: null };
}

export function hrefFor(route: Route): string {
  if (route.screen === "walk") return `#/walk/${route.step}`;
  if (route.skill) return `#/skill/${encodeURIComponent(route.skill)}`;
  return "#/";
}

export function navigate(route: Route) {
  const next = hrefFor(route);
  if (window.location.hash !== next) window.location.hash = next;
}

function isWalkStep(value: string): value is WalkStepId {
  return WALK_STEPS.some((step) => step === value);
}
