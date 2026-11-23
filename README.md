# Tech Demos

Nir's sticky gallery of small, playable tech demos.

**Play them here: [https://shneydor.github.io/tech-demos/](https://shneydor.github.io/tech-demos/)**

Open the page, press a card, that's it. No clone, no install, no local server.

## How this repo works

- Every demo lives in `apps/<kebab-slug>/` inside this one repository.
- A GitHub Actions workflow builds each app to static files and publishes the gallery to GitHub Pages.
- The gallery reads each app's `demo.json` and lists the newest demos first.

## Add a demo

Cloud agents should follow [`AGENTS.md`](./AGENTS.md): plan with [`skills/project-planning/SKILL.md`](./skills/project-planning/SKILL.md), write `apps/<slug>/PLAN.md`, then build a self-contained Bun app that outputs static files to `apps/<slug>/dist` with a relative base path.

Every app needs `demo.json`:

```json
{
  "title": "Short title",
  "description": "One or two sentences.",
  "date": "YYYY-MM-DD",
  "sourceUrl": "https://example.com/inspiration-or-library"
}
```

Pull requests should include at least one screenshot and one video of the running app.
