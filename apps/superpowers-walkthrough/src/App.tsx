import { useEffect, useState } from "react";
import catalog from "./data/skills.json";
import { SkillIndex } from "./components/SkillIndex";
import { Walkthrough } from "./components/Walkthrough";
import { parseHash, skillsHash, walkHash, type Route } from "./lib/routes";
import type { Catalog } from "./lib/types";

const meta = catalog as Catalog;

export function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", sync);
    if (!window.location.hash) {
      history.replaceState(null, "", walkHash("brainstorm"));
    }
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onWalk = route.view === "walk";

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <p className="mark">Superpowers</p>
          <h1>Walkthrough</h1>
        </div>
        <p className="pin">
          <a href={`${meta.sourceRepo}/tree/${meta.sourceSha}`}>
            v{meta.sourceVersion}
            <span> {meta.sourceSha.slice(0, 7)}</span>
          </a>
          <span className="dot">·</span>
          {meta.license}
        </p>
        <nav className="views" aria-label="Views">
          <a href={walkHash(onWalk ? route.step : "brainstorm")} className={onWalk ? "active" : undefined} aria-current={onWalk ? "page" : undefined}>
            Walkthrough
          </a>
          <a href={skillsHash(route.view === "skills" ? route.skill : null)} className={!onWalk ? "active" : undefined} aria-current={!onWalk ? "page" : undefined}>
            Skills
          </a>
        </nav>
      </header>

      <main>
        {route.view === "walk" ? (
          <Walkthrough step={route.step} />
        ) : (
          <SkillIndex selected={route.skill} />
        )}
      </main>

      <footer className="foot">
        <p>
          {meta.copyright}. {meta.license}. Skill text is from{" "}
          <a href={meta.sourceRepo}>obra/superpowers</a>. Bookmark:{" "}
          <a href="https://x.com/FisherNimrod/status/2112787120813482361">Nimrod Fisher on the flow</a>.
        </p>
        <a className="back" href="../">
          ← All demos
        </a>
      </footer>
    </div>
  );
}
