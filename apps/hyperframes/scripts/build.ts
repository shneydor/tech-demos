import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CLIPS, renderAll } from "./render.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function commandOk(command: string, args: string[]): boolean {
  const result = spawnSync(command, args, { stdio: "ignore" });
  return result.status === 0;
}

function mediaReady(): boolean {
  return (
    existsSync(join(root, "media/manifest.json")) &&
    CLIPS.every(
      (clip) =>
        existsSync(join(root, "media", `${clip.id}-a.mp4`)) &&
        existsSync(join(root, "media", `${clip.id}-b.mp4`)),
    )
  );
}

const force = process.env.HYPERFRAMES_RERENDER === "1";
const skip = process.env.HYPERFRAMES_SKIP_RENDER === "1";
const toolchain = commandOk("node", ["-v"]) && commandOk("ffmpeg", ["-version"]);

if (skip) {
  if (!mediaReady()) throw new Error("HYPERFRAMES_SKIP_RENDER is set, but media/ is incomplete.");
  console.log("Skipping render; using committed media.");
} else if (!toolchain && mediaReady()) {
  console.log("Node or FFmpeg is missing; copying committed renders.");
} else if (force || !mediaReady()) {
  if (!toolchain) {
    throw new Error("Node and FFmpeg are required to render, and media/ is incomplete.");
  }
  await renderAll();
} else {
  console.log("Committed renders are present. Set HYPERFRAMES_RERENDER=1 to render again.");
}

const dist = join(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const file of ["index.html", "styles.css", "main.js"]) {
  cpSync(join(root, file), join(dist, file));
}
cpSync(join(root, "compositions"), join(dist, "compositions"), { recursive: true });
cpSync(join(root, "media"), join(dist, "media"), { recursive: true });

const html = await Bun.file(join(dist, "index.html")).text();
if (!html.includes('href="./styles.css"') || !html.includes('src="./main.js"')) {
  throw new Error("dist/index.html is missing relative asset URLs.");
}
console.log("Wrote dist/");
