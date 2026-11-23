---
name: project-planning
description: Plan a tech-demos app before writing code. Use at the start of any new demo in this monorepo, or when a substantial change needs a fresh plan. Writes apps/<kebab-slug>/PLAN.md and stops short of implementation until the plan is written.
---

# Project planning

Plan first. Do not start implementing a demo until `apps/<kebab-slug>/PLAN.md` exists and covers the sections below.

This skill is for the **tech-demos** monorepo only. The user should be able to open the gallery and press one card to play the demo, with no local setup.

## When to use

- Starting a new app under `apps/<kebab-slug>/`.
- Replanning an existing app after a meaningful scope change.

## Inputs to gather (do not invent silently)

- The library, post, or idea being demoed, including `sourceUrl` when one exists.
- The one-sentence goal: what someone should be able to do in under a minute.
- Constraints from root `AGENTS.md` (Bun, static build, relative base path, client-only, no committed secrets).

If a required input is missing and would change the plan, ask. Otherwise choose a simple default and record it in the plan.

## Workflow

1. Read root `AGENTS.md` and any existing files under `apps/<kebab-slug>/`.
2. Choose a kebab-case slug if one is not already given. Keep it short and stable.
3. Write a tight MVP plan. Prefer the smallest thing that is fun to click and clearly shows the library or idea.
4. Save the plan to `apps/<kebab-slug>/PLAN.md` using the template below.
5. Only after the file is written, implement against it (or stop if the caller asked for a plan only).

## PLAN.md template

```markdown
# <Title>

## Goal

One paragraph: who it is for, what they can do, and what "done" looks like in the gallery.

## In scope

- Bullet the MVP behaviors that will ship in this change.

## Out of scope

- Explicit non-goals. Cut anything that needs a server, an account, or a long setup.

## Stack

- Bun, plus UI/library choices (prefer a simple client-only stack; shadcn/ui and Vite are welcome when they help).
- How `bun run build` will emit static files to `dist/` with a relative base path (e.g. Vite `base: './'`).

## UX

- The first screen, the one main interaction, and empty/error states.
- If an API key is required: a paste field in the UI, stored in `localStorage`. Never commit keys.

## File structure

- List the files you will add or change under `apps/<kebab-slug>/`.
- Include `demo.json` and this `PLAN.md`.

## Tasks

For each task:

- What to do
- Acceptance criteria (observable, not "code is written")
- Dependencies on other tasks

Keep the graph acyclic. Sequence so a mid-plan build still has something playable.

## Risks

- Anything that could break GitHub Pages (absolute asset paths, server-only APIs, missing `dist`).
- Mitigations.

## demo.json (draft)

- `title`, `description`, `date` (YYYY-MM-DD), `sourceUrl`
```

## Quality bar

A plan is ready when:

- [ ] Goal, in scope, and out of scope are specific enough to implement without guessing.
- [ ] The demo is client-only (or the one exception is an in-UI API key + `localStorage`).
- [ ] Build output is static, in `dist/`, with a relative base path for `/tech-demos/<slug>/`.
- [ ] Tasks have acceptance criteria and no circular dependencies.
- [ ] `demo.json` fields are filled.
- [ ] The plan lives at `apps/<kebab-slug>/PLAN.md`.

Do not skip the plan file to "save time." The plan is part of the app.
