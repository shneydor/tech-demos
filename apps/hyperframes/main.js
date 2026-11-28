const CLIPS = [
  {
    id: "signal",
    duration: 4,
    live: "compositions/signal.html",
    a: "media/signal-a.mp4",
    b: "media/signal-b.mp4",
  },
  {
    id: "orbit",
    duration: 4,
    live: "compositions/orbit.html",
    a: "media/orbit-a.mp4",
    b: "media/orbit-b.mp4",
  },
  {
    id: "bars",
    duration: 4,
    live: "compositions/bars.html",
    a: "media/bars-a.mp4",
    b: "media/bars-b.mp4",
  },
];

const playButton = document.getElementById("play");
const scrub = document.getElementById("scrub");
const timeEl = document.getElementById("time");
const live = document.getElementById("live");
const liveFrame = document.getElementById("live-frame");
const video = document.getElementById("video");
const sourceEl = document.getElementById("source");
const sourceName = document.getElementById("source-name");
const proofStatus = document.getElementById("proof-status");
const proofDetail = document.getElementById("proof-detail");
const hashAEl = document.getElementById("hash-a");
const hashBEl = document.getElementById("hash-b");
const proofNote = document.getElementById("proof-note");

const hashCache = new Map();
let manifest = null;
let current = CLIPS[0];
let playing = false;
let desired = 0;
let token = 0;
let liveReady = false;

function asset(path) {
  return new URL(path, document.baseURI).href;
}

function formatTime(seconds) {
  return `${seconds.toFixed(2)} / ${current.duration.toFixed(2)}`;
}

function timeline() {
  const win = live.contentWindow;
  if (!win || !win.__timelines) return null;
  return win.__timelines[current.id] || null;
}

function seekLive(time) {
  const tl = timeline();
  if (!tl) {
    liveReady = false;
    return;
  }
  liveReady = true;
  tl.seek(time, false);
}

function seekVideo(time) {
  desired = time;
  if (video.readyState >= 1) video.currentTime = time;
}

function paint(time) {
  scrub.value = String(time);
  timeEl.textContent = formatTime(time);
}

function seekAll(time) {
  const clamped = Math.min(current.duration, Math.max(0, time));
  seekVideo(clamped);
  seekLive(clamped);
  paint(clamped);
}

function stopPlayback() {
  playing = false;
  video.pause();
  playButton.textContent = "Play";
  playButton.setAttribute("aria-pressed", "false");
}

function tick() {
  if (!playing) return;
  if (video.ended || video.currentTime >= current.duration - 0.001) {
    seekAll(current.duration);
    stopPlayback();
    return;
  }
  seekLive(video.currentTime);
  paint(video.currentTime);
  requestAnimationFrame(tick);
}

async function startPlayback() {
  if (video.currentTime >= current.duration - 1 / 30) seekAll(0);
  playing = true;
  playButton.textContent = "Pause";
  playButton.setAttribute("aria-pressed", "true");
  try {
    await video.play();
  } catch {
    stopPlayback();
    return;
  }
  requestAnimationFrame(tick);
}

function fitLive() {
  const scale = liveFrame.clientWidth / 1280;
  live.style.transform = `scale(${scale})`;
}

function waitForTimeline(win, id, generation) {
  const started = performance.now();
  const step = () => {
    if (generation !== token) return;
    if (win.__timelines && win.__timelines[id]) {
      seekLive(desired);
      return;
    }
    if (performance.now() - started > 8000) {
      proofDetail.textContent = "The live composition did not register a timeline.";
      return;
    }
    requestAnimationFrame(step);
  };
  step();
}

async function sha256(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url} (${response.status}).`);
  const bytes = await response.arrayBuffer();
  if (!crypto.subtle) throw new Error("This page needs a secure context to hash the files.");
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setProof(state, status, detail) {
  proofStatus.dataset.state = state;
  proofStatus.textContent = status;
  proofDetail.textContent = detail;
}

async function showProof(clip, generation) {
  hashAEl.textContent = "Hashing…";
  hashBEl.textContent = "Hashing…";
  setProof("", "Hashing both files…", "");
  try {
    const recordedManifest = await manifestPromise;
    let hashes = hashCache.get(clip.id);
    if (!hashes) {
      const [a, b] = await Promise.all([sha256(asset(clip.a)), sha256(asset(clip.b))]);
      hashes = { a, b };
      hashCache.set(clip.id, hashes);
    }
    if (generation !== token) return;
    hashAEl.textContent = hashes.a;
    hashBEl.textContent = hashes.b;
    const recorded =
      recordedManifest && recordedManifest.clips.find((entry) => entry.id === clip.id);
    const recordedNote =
      recorded && (recorded.sha256A !== hashes.a || recorded.sha256B !== hashes.b)
        ? " These bytes do not match the hashes recorded when the files were rendered."
        : "";
    if (hashes.a === hashes.b) {
      setProof(
        "match",
        "Byte-identical",
        `Both files hash to the same SHA-256.${recordedNote}`,
      );
      return;
    }
    const frames = recorded
      ? recorded.framesMatch
        ? "The build compared decoded frames with ffmpeg framemd5, and those hashes matched, so the pictures are the same."
        : "The build’s decoded-frame hashes did not match either."
      : "Frame comparison from the build is unavailable.";
    setProof(
      "differ",
      "Not byte-identical",
      `The two files hash differently. ${frames}${recordedNote}`,
    );
  } catch (error) {
    if (generation !== token) return;
    hashAEl.textContent = "—";
    hashBEl.textContent = "—";
    setProof("differ", "Could not hash", error instanceof Error ? error.message : "Hash failed.");
  }
}

async function showSource(clip, generation) {
  sourceName.textContent = clip.live;
  sourceEl.textContent = "Loading…";
  try {
    const response = await fetch(asset(clip.live));
    if (!response.ok) throw new Error(`Could not load source (${response.status}).`);
    const text = await response.text();
    if (generation !== token) return;
    sourceEl.textContent = text;
  } catch (error) {
    if (generation !== token) return;
    sourceEl.textContent = error instanceof Error ? error.message : "Could not load source.";
  }
}

function selectClip(id) {
  const clip = CLIPS.find((entry) => entry.id === id);
  if (!clip || (clip === current && live.getAttribute("src"))) return;
  stopPlayback();
  const generation = ++token;
  current = clip;
  desired = 0;
  liveReady = false;
  for (const button of document.querySelectorAll(".tab")) {
    const selected = button.dataset.clip === id;
    button.setAttribute("aria-selected", selected ? "true" : "false");
  }
  scrub.max = String(clip.duration);
  paint(0);
  video.src = asset(clip.a);
  video.load();
  live.src = asset(clip.live);
  showProof(clip, generation);
  showSource(clip, generation);
}

playButton.addEventListener("click", () => {
  if (playing) stopPlayback();
  else startPlayback();
});

scrub.addEventListener("input", () => {
  stopPlayback();
  seekAll(Number(scrub.value));
});

video.addEventListener("loadedmetadata", () => {
  if (Math.abs(video.currentTime - desired) > 0.001) video.currentTime = desired;
  seekLive(desired);
});

live.addEventListener("load", () => {
  waitForTimeline(live.contentWindow, current.id, token);
});

document.querySelector(".tabs").addEventListener("click", (event) => {
  const button = event.target.closest(".tab");
  if (!button) return;
  selectClip(button.dataset.clip);
});

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.target !== document.body) return;
  event.preventDefault();
  playButton.click();
});

new ResizeObserver(fitLive).observe(liveFrame);

const manifestPromise = fetch(asset("media/manifest.json"))
  .then((response) => (response.ok ? response.json() : null))
  .catch(() => null)
  .then((data) => {
    manifest = data;
    if (data && data.hyperframes) {
      proofNote.textContent = `Each clip was rendered twice, back to back, with HyperFrames ${data.hyperframes}. This page hashes both files in your browser. The check compares those two MP4s with each other, not the live pane with the video.`;
    }
    return data;
  });

selectClip("signal");
fitLive();
