import { useEffect, useMemo, useState } from "react";
import catalog from "../data/skills.json";
import { Markdown } from "../lib/markdown";
import { skillsHash } from "../lib/routes";
import type { Catalog, Skill } from "../lib/types";

const data = catalog as Catalog;
const GROUP_ORDER = ["Testing", "Debugging", "Collaboration", "Meta", "Other"];
const PIN = data.sourceSha;

type Props = {
  selected: string | null;
};

export function SkillIndex({ selected }: Props) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!needle) return data.skills;
    return data.skills.filter((skill) => {
      const hay = `${skill.name} ${skill.description} ${skill.group}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [needle]);

  const groups = GROUP_ORDER.map((group) => ({
    group,
    skills: filtered.filter((skill) => skill.group === group),
  })).filter((group) => group.skills.length > 0);

  const known = data.skills.find((skill) => skill.name === selected) ?? null;
  const current = known && filtered.some((skill) => skill.name === known.name) ? known : null;

  useEffect(() => {
    if (!selected && data.skills[0]) {
      location.hash = skillsHash(data.skills[0].name);
    }
  }, [selected]);

  const linkRoot = current
    ? `https://github.com/obra/superpowers/blob/${PIN}/${current.path.replace(/\/SKILL\.md$/, "/")}`
    : `https://github.com/obra/superpowers/blob/${PIN}/`;

  return (
    <div className="index">
      <aside className="index-list">
        <label className="search">
          <span>Search skills</span>
          <input
            id="skill-search"
            name="skill-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or description"
            type="search"
          />
        </label>
        <p className="count">
          {filtered.length} of {data.skills.length} from {data.sourceVersion}
        </p>
        {filtered.length === 0 ? (
          <p className="empty">No skill matches that.</p>
        ) : (
          groups.map((group) => (
            <section key={group.group}>
              <h2>{group.group}</h2>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <a
                      href={skillsHash(skill.name)}
                      className={current?.name === skill.name ? "active" : undefined}
                      aria-current={current?.name === skill.name ? "page" : undefined}
                    >
                      <strong>{skill.name}</strong>
                      <span>{skill.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </aside>
      <article className="pane index-body">
        {filtered.length === 0 ? (
          <p className="missing">No skill matches that.</p>
        ) : current ? (
          <SkillBody skill={current} linkRoot={linkRoot} />
        ) : known ? (
          <p className="missing">That skill is hidden by the search. Clear it to read {known.name}.</p>
        ) : (
          <p className="missing">That skill is not in this pin.</p>
        )}
      </article>
    </div>
  );
}

function SkillBody({ skill, linkRoot }: { skill: Skill; linkRoot: string }) {
  const title = skill.body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? skill.name;
  return (
    <>
      <header className="pane-head">
        <p className="kicker">{skill.group}</p>
        <h2>{title}</h2>
        <p className="desc">{skill.description}</p>
        <p className="file">
          <a href={`https://github.com/obra/superpowers/blob/${PIN}/${skill.path}`}>{skill.path}</a>
        </p>
      </header>
      <Markdown source={skill.body} linkRoot={linkRoot} />
    </>
  );
}
