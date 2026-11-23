// Generate the gallery index from each app's demo.json.
// Only include slugs that already have _site/<slug>/index.html
// so a failed build is listed nowhere, not as a broken card.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Demo = {
  slug: string;
  title: string;
  description: string;
  date: string;
  sourceUrl: string;
};

const root = join(import.meta.dir, "..");
const appsDir = join(root, "apps");
const siteDir = join(root, "_site");

function loadDemos(): Demo[] {
  if (!existsSync(appsDir)) return [];
  const demos: Demo[] = [];
  for (const entry of readdirSync(appsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const metaPath = join(appsDir, slug, "demo.json");
    const built = join(siteDir, slug, "index.html");
    if (!existsSync(metaPath) || !existsSync(built)) continue;
    try {
      const raw = JSON.parse(readFileSync(metaPath, "utf8")) as Partial<Demo>;
      if (!raw.title) throw new Error("missing title");
      demos.push({
        slug,
        title: String(raw.title),
        description: String(raw.description ?? ""),
        date: String(raw.date ?? ""),
        sourceUrl: String(raw.sourceUrl ?? ""),
      });
    } catch (error) {
      console.warn(`Skipping ${slug}: invalid demo.json (${error})`);
    }
  }
  return demos.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title);
    return a.date < b.date ? 1 : -1;
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function render(demos: Demo[]): string {
  const cards = demos
    .map((demo) => {
      let source = "";
      if (demo.sourceUrl) {
        try {
          source = `<span class="src">${escapeHtml(new URL(demo.sourceUrl).hostname.replace(/^www\./, ""))}</span>`;
        } catch {
          source = "";
        }
      }
      return `<a class="card" href="./${encodeURIComponent(demo.slug)}/">
  <div class="meta">
    <time datetime="${escapeHtml(demo.date)}">${escapeHtml(formatDate(demo.date))}</time>
    ${source}
  </div>
  <h2>${escapeHtml(demo.title)}</h2>
  <p>${escapeHtml(demo.description)}</p>
  <span class="go">Open demo</span>
</a>`;
    })
    .join("\n");

  const empty = `<p class="empty">No demos have been published yet.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tech Demos</title>
  <meta name="description" content="Nir's playable tech demos. Open a card and go." />
  <style>
    :root {
      --bg: #0b0c10;
      --bg-2: #111318;
      --card: #16181f;
      --card-hover: #1c1f28;
      --line: #2a2d36;
      --ink: #f4f1ea;
      --muted: #9a9488;
      --accent: #e8ff6b;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    body {
      min-height: 100vh;
      font-family: "Segoe UI", "Helvetica Neue", ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(900px 420px at -10% -20%, #1c2736 0%, transparent 55%),
        radial-gradient(700px 360px at 110% 0%, #242018 0%, transparent 50%),
        var(--bg);
      color: var(--ink);
    }
    header {
      width: min(72rem, calc(100% - 2.5rem));
      margin: 0 auto;
      padding: 4rem 0 2.5rem;
    }
    p.kicker {
      margin: 0 0 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 0.72rem;
      color: var(--muted);
    }
    h1 {
      margin: 0 0 0.75rem;
      font-size: clamp(2.4rem, 5vw, 4rem);
      letter-spacing: -0.045em;
      font-weight: 650;
      line-height: 0.95;
    }
    .lede {
      margin: 0;
      max-width: 36rem;
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.55;
    }
    .grid {
      width: min(72rem, calc(100% - 2.5rem));
      margin: 0 auto 4rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
      gap: 1rem;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding: 1.2rem 1.2rem 1.15rem;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 1rem;
      text-decoration: none;
      color: inherit;
      min-height: 13.5rem;
      transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;
    }
    .card:hover, .card:focus-visible {
      background: var(--card-hover);
      border-color: #3a3e4a;
      transform: translateY(-2px);
      outline: none;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      color: var(--muted);
      font-size: 0.78rem;
    }
    .src { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    h2 {
      margin: 0;
      font-size: 1.25rem;
      letter-spacing: -0.03em;
    }
    .card p {
      margin: 0;
      color: var(--muted);
      line-height: 1.45;
      flex: 1;
    }
    .go {
      color: var(--accent);
      font-size: 0.85rem;
      font-weight: 600;
    }
    .empty {
      width: min(72rem, calc(100% - 2.5rem));
      margin: 0 auto 4rem;
      color: var(--muted);
    }
    footer {
      width: min(72rem, calc(100% - 2.5rem));
      margin: 0 auto;
      padding: 0 0 3rem;
      color: var(--muted);
      font-size: 0.85rem;
    }
    footer a { color: var(--ink); }
  </style>
</head>
<body>
  <header>
    <p class="kicker">Nir Shney-dor</p>
    <h1>Tech Demos</h1>
    <p class="lede">One page. One click. No install, no clone, no local server.</p>
  </header>
  ${demos.length ? `<section class="grid">${cards}</section>` : empty}
  <footer>
    Source: <a href="https://github.com/shneydor/tech-demos">github.com/shneydor/tech-demos</a>
  </footer>
</body>
</html>
`;
}

const demos = loadDemos();
mkdirSync(siteDir, { recursive: true });
writeFileSync(join(siteDir, "index.html"), render(demos));
console.log(`Gallery written with ${demos.length} demo(s).`);
