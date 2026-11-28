import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export const CLIPS = [
  { id: "signal", title: "Signal", file: "compositions/signal.html" },
  { id: "orbit", title: "Orbit", file: "compositions/orbit.html" },
  { id: "bars", title: "Bars", file: "compositions/bars.html" },
] as const;

const FPS = 30;
const WIDTH = 1280;
const HEIGHT = 720;
const DURATION = 4;

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

function capture(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root });
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve(Buffer.concat(stdout).toString("utf8"));
      else reject(new Error(`${command} exited ${code}: ${Buffer.concat(stderr).toString("utf8")}`));
    });
  });
}

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

async function frameDigest(path: string): Promise<string> {
  const text = await capture("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    path,
    "-map",
    "0:v:0",
    "-f",
    "framemd5",
    "-",
  ]);
  return createHash("sha256").update(text).digest("hex");
}

function vendorGsap(): void {
  const destDir = join(root, "compositions/vendor");
  mkdirSync(destDir, { recursive: true });
  copyFileSync(join(root, "node_modules/gsap/dist/gsap.min.js"), join(destDir, "gsap.min.js"));
}

export async function renderAll(): Promise<void> {
  vendorGsap();
  mkdirSync(join(root, "media"), { recursive: true });
  const bin = join(root, "node_modules/.bin/hyperframes");
  const pkg = JSON.parse(readFileSync(join(root, "node_modules/hyperframes/package.json"), "utf8")) as {
    version: string;
  };

  for (const clip of CLIPS) {
    await run("node", [bin, "lint", clip.file]);
  }

  const clips = [];
  for (const clip of CLIPS) {
    const outputs = ["a", "b"].map((pass) => join(root, "media", `${clip.id}-${pass}.mp4`));
    for (const [index, output] of outputs.entries()) {
      console.log(`\n== render ${clip.id} ${index === 0 ? "A" : "B"} ==`);
      await run("node", [
        bin,
        "render",
        "-c",
        clip.file,
        "-o",
        output,
        "--fps",
        String(FPS),
        "--workers",
        "1",
        "--low-memory-mode",
        "--experimental-fast-capture=false",
      ]);
    }

    const sha256A = sha256(outputs[0]);
    const sha256B = sha256(outputs[1]);
    const frameSha256A = await frameDigest(outputs[0]);
    const frameSha256B = await frameDigest(outputs[1]);
    const bytesMatch = sha256A === sha256B;
    const framesMatch = frameSha256A === frameSha256B;
    console.log(
      `${clip.id}: bytes ${bytesMatch ? "match" : "differ"}, frames ${framesMatch ? "match" : "DIFFER"}`,
    );
    if (!framesMatch) {
      throw new Error(`${clip.id}: decoded frames differ between the two renders`);
    }

    clips.push({
      id: clip.id,
      title: clip.title,
      duration: DURATION,
      width: WIDTH,
      height: HEIGHT,
      fps: FPS,
      fileA: `${clip.id}-a.mp4`,
      fileB: `${clip.id}-b.mp4`,
      sha256A,
      sha256B,
      bytesMatch,
      frameSha256A,
      frameSha256B,
      framesMatch,
    });
  }

  const manifest = {
    hyperframes: pkg.version,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
    duration: DURATION,
    clips,
  };
  writeFileSync(join(root, "media/manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log("wrote media/manifest.json");
}

if (import.meta.main) {
  renderAll().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
