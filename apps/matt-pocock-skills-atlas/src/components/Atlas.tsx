import { useEffect, useMemo, useState } from "react";
import type { Atlas, Category, Invocation } from "../lib/types.ts";
import { CATEGORY_LABEL } from "../lib/types.ts";
import { ChainMap } from "./ChainMap.tsx";
import { SkillDetail } from "./SkillDetail.tsx";

const ALL_CATEGORIES: Category[] = ["engineering", "productivity", "in-progress", "misc"];

type Props = {
  atlas: Atlas;
  selectedName: string | null;
  onSelect: (name: string) => void;
  onWalk: () => void;
};

export function Atlas({ atlas, selectedName, onSelect, onWalk }: Props) {
  const [query, setQuery] = useState("");
  const [invocation, setInvocation] = useState<Invocation | "all">("all");
  const [categories, setCategories] = useState<Set<Category>>(
    () => new Set(["engineering", "productivity"]),
  );

  const selected = atlas.skills.find((skill) => skill.name === selectedName) ?? null;

  const visible = useMemo(
    () => atlas.skills.filter((skill) => matches(skill, query, invocation, categories)),
    [atlas.skills, query, invocation, categories],
  );

  const userSkills = visible.filter((skill) => skill.invocation === "user");
  const modelSkills = visible.filter((skill) => skill.invocation === "model");
  const hiddenCount = atlas.skillCount - visible.length;
  const publishedHidden =
    atlas.skills.filter((skill) => skill.category === "in-progress" || skill.category === "misc").length;

  function toggleCategory(category: Category) {
    setCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function showSelected() {
    if (!selected) return;
    setCategories((current) => new Set(current).add(selected.category));
    setInvocation("all");
    setQuery("");
  }

  function clearFilters() {
    setQuery("");
    setInvocation("all");
    setCategories(new Set(ALL_CATEGORIES));
  }

  const selectedHidden = selected !== null && !visible.some((skill) => skill.name === selected.name);

  useEffect(() => {
    if (!selectedName) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    document.getElementById("skill-detail")?.scrollIntoView({ block: "nearest" });
  }, [selectedName]);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl text-ink">How they chain</h2>
            <p className="max-w-3xl text-sm leading-6 text-muted">
              Solid lines are Skill-tool calls parsed from the file. Dashed lines are commands you type next.
              A user-invoked skill does not call another user-invoked skill. Rust dashes are the chain this demo walks.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md bg-rust px-3 py-2 text-sm text-paper-2"
            onClick={onWalk}
          >
            Walk grill-me → to-spec → to-tickets
          </button>
        </div>
        <ChainMap skills={atlas.skills} selected={selected?.name ?? null} onSelect={onSelect} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="min-w-48 flex-1">
            <span className="sr-only">Search skills</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or description"
              className="w-full rounded-md border border-rule bg-paper-2 px-3 py-2 text-sm"
            />
          </label>
          <Chip active={invocation === "all"} onClick={() => setInvocation("all")}>
            All
          </Chip>
          <Chip active={invocation === "user"} onClick={() => setInvocation("user")}>
            You type these
          </Chip>
          <Chip active={invocation === "model"} onClick={() => setInvocation("model")}>
            Agent may reach
          </Chip>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => (
            <Chip key={category} active={categories.has(category)} onClick={() => toggleCategory(category)}>
              {CATEGORY_LABEL[category]}
            </Chip>
          ))}
          <span className="self-center text-xs text-muted">
            {visible.length} shown
            {hiddenCount > 0 ? `, ${hiddenCount} hidden` : ""}. In progress and misc ({publishedHidden}) start off.
          </span>
        </div>
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_22rem]">
        {visible.length === 0 ? (
          <div className="order-2 rounded-md border border-dashed border-rule bg-paper-2 p-6 text-sm lg:order-none lg:col-span-2">
            <p>No skills match.</p>
            <button type="button" className="mt-3 underline" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="order-2 lg:order-none">
              <SkillColumn
                title="You type these"
                skills={userSkills}
                selected={selected?.name ?? null}
                onSelect={onSelect}
              />
            </div>
            <div className="order-3 lg:order-none">
              <SkillColumn
                title="The agent may reach for these"
                skills={modelSkills}
                selected={selected?.name ?? null}
                onSelect={onSelect}
              />
            </div>
          </>
        )}
        <div className="order-1 lg:order-none">
          <SkillDetail
            skill={selected}
            missingName={selectedName && !selected ? selectedName : null}
            hidden={selectedHidden}
            onShow={showSelected}
            onOpen={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

function SkillColumn({
  title,
  skills,
  selected,
  onSelect,
}: {
  title: string;
  skills: Atlas["skills"];
  selected: string | null;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-serif text-lg">{title}</h3>
      {skills.length === 0 ? (
        <p className="text-sm text-muted">None in this filter.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {skills.map((skill) => {
            const active = skill.name === selected;
            return (
              <li key={skill.name}>
                <button
                  type="button"
                  onClick={() => onSelect(skill.name)}
                  className={`w-full rounded-md border px-3 py-2 text-left ${
                    active ? "border-ink bg-ink text-paper-2" : "border-rule bg-paper-2"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className={`text-xs ${active ? "text-paper" : "text-muted"}`}>
                      {CATEGORY_LABEL[skill.category]}
                    </span>
                  </div>
                  <p className={`mt-1 line-clamp-2 text-xs leading-5 ${active ? "text-paper" : "text-muted"}`}>
                    {skill.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm ${
        active ? "border-ink bg-ink text-paper-2" : "border-rule bg-paper-2 text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function matches(
  skill: Atlas["skills"][number],
  query: string,
  invocation: Invocation | "all",
  categories: Set<Category>,
) {
  if (!categories.has(skill.category)) return false;
  if (invocation !== "all" && skill.invocation !== invocation) return false;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    skill.name.toLowerCase().includes(needle) ||
    skill.description.toLowerCase().includes(needle) ||
    skill.calls.some((name) => name.includes(needle))
  );
}
