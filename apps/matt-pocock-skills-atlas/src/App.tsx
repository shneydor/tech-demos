import { useEffect, useState } from "react";
import atlas from "./data/atlas.json" with { type: "json" };
import session from "./data/session.json" with { type: "json" };
import { Atlas } from "./components/Atlas.tsx";
import { Walkthrough } from "./components/Walkthrough.tsx";
import { parseHash, navigate } from "./lib/hash.ts";
import type { Atlas as AtlasData, Session, WalkStepId } from "./lib/types.ts";

const data = atlas as AtlasData;
const recorded = session as Session;
const shortCommit = data.commit.slice(0, 7);
const userCount = data.skills.filter((skill) => skill.invocation === "user").length;
const modelCount = data.skills.length - userCount;

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const published = data.skills.filter(
    (skill) => skill.category === "engineering" || skill.category === "productivity",
  ).length;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-3 border-b border-rule pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-widest text-rust uppercase">Matt Pocock · skills {data.version}</p>
            <h1 className="font-serif text-4xl text-ink">Skills Atlas</h1>
          </div>
          <nav className="flex gap-2">
            <button
              type="button"
              className={`rounded-md border px-3 py-1.5 text-sm ${
                route.screen === "atlas" ? "border-ink bg-ink text-paper-2" : "border-rule bg-paper-2"
              }`}
              onClick={() => navigate({ screen: "atlas", skill: null })}
            >
              Atlas
            </button>
            <button
              type="button"
              className={`rounded-md border px-3 py-1.5 text-sm ${
                route.screen === "walk" ? "border-ink bg-ink text-paper-2" : "border-rule bg-paper-2"
              }`}
              onClick={() => navigate({ screen: "walk", step: "grill-me" })}
            >
              Walk the chain
            </button>
          </nav>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Every skill file in the pack, generated from commit {shortCommit}. {published} published skills,{" "}
          {data.skillCount} files in the tree. {userCount} are user-invoked. {modelCount} are model-invoked.
        </p>
      </header>

      <main>
        {route.screen === "atlas" ? (
          <Atlas
            atlas={data}
            selectedName={route.skill}
            onSelect={(name) => navigate({ screen: "atlas", skill: name })}
            onWalk={() => navigate({ screen: "walk", step: "grill-me" })}
          />
        ) : (
          <Walkthrough
            atlas={data}
            session={recorded}
            step={route.step}
            onStep={(step: WalkStepId) => navigate({ screen: "walk", step })}
            onBack={() => navigate({ screen: "atlas", skill: null })}
          />
        )}
      </main>

      <footer className="mt-auto border-t border-rule pt-4 text-xs leading-5 text-muted">
        {data.copyright}. {data.license}. Files from{" "}
        <a className="underline" href={data.upstream}>
          {data.upstream}
        </a>{" "}
        at {shortCommit}. Homepage{" "}
        <a className="underline" href={data.homepage}>
          {data.homepage}
        </a>
        . Bookmark{" "}
        <a className="underline" href="https://x.com/mattpocockuk/status/2088290952704151671">
          mattpocockuk/status/2088290952704151671
        </a>
        .
      </footer>
    </div>
  );
}
