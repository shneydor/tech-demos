const split = document.getElementById("split");
const divider = document.getElementById("divider");
const frameBefore = document.getElementById("frame-before");
const frameAfter = document.getElementById("frame-after");
const pair = document.getElementById("pair");
const outline = document.getElementById("outline");
const counts = document.getElementById("counts");
const ruleStatus = document.getElementById("rule-status");
const railList = document.getElementById("rail-list");
const frameError = document.getElementById("frame-error");

let rules = [];
let selected = null;
const narrowQuery = window.matchMedia("(max-width: 860px)");

function afterAmount() {
  return Number(split.value);
}

function applySplit() {
  const after = afterAmount();
  const beforeWidth = 100 - after;
  frameBefore.style.clipPath = `inset(0 ${after}% 0 0)`;
  divider.style.left = `${beforeWidth}%`;
  split.setAttribute("aria-valuenow", String(after));
  split.setAttribute(
    "aria-valuetext",
    after <= 1
      ? "Specimen only"
      : after >= 99
        ? "Hallmark page only"
        : `${beforeWidth}% specimen, ${after}% Hallmark page`
  );
  document.getElementById("show-before").setAttribute("aria-pressed", after <= 1 ? "true" : "false");
  document.getElementById("show-after").setAttribute("aria-pressed", after >= 99 ? "true" : "false");
  placeOutline();
}

function frameForPins() {
  return afterAmount() <= 1 ? frameBefore : frameAfter;
}

const outlineLabel = document.getElementById("outline-label");
let scrollLock = false;

function measure() {
  let failed = false;
  for (const frame of [frameBefore, frameAfter]) {
    if (!frame.contentDocument || !frame.contentDocument.body) failed = true;
  }
  frameError.hidden = !failed;
  placeOutline();
}

function placeOutline() {
  if (!selected) {
    outline.hidden = true;
    return;
  }
  const frame = frameForPins();
  const doc = frame.contentDocument;
  const el = doc && doc.getElementById(selected.section);
  if (!el) {
    outline.hidden = true;
    return;
  }
  const frameRect = frame.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const top = rect.top - frameRect.top;
  const bottom = rect.bottom - frameRect.top;
  const visTop = Math.max(0, top);
  const visBottom = Math.min(frameRect.height, bottom);
  if (visBottom - visTop < 12) {
    outline.hidden = true;
    return;
  }
  const left = Math.max(8, rect.left - frameRect.left);
  const width = Math.min(rect.width, frameRect.width - left - 8);
  outline.hidden = false;
  outline.style.top = `${visTop}px`;
  outline.style.left = `${left}px`;
  outline.style.width = `${Math.max(width, 24)}px`;
  outline.style.height = `${visBottom - visTop}px`;
  outlineLabel.textContent = `${selected.gate} ${selected.tier}`;
}

function scrollFrameTo(frame, id) {
  const doc = frame.contentDocument;
  const el = doc && doc.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ block: "start", behavior: "auto" });
}

function selectRule(rule, scroll) {
  selected = rule;
  for (const button of railList.querySelectorAll(".rule")) {
    button.classList.toggle("on", button.dataset.gate === rule.gate);
    if (button.dataset.gate === rule.gate) {
      button.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }
  const where = rule.stillOpen ? "Still open on the Hallmark page." : "Cleared on the Hallmark page.";
  ruleStatus.textContent = `${rule.gate} ${rule.tier}. ${rule.change} ${where}`;
  if (scroll) {
    scrollLock = true;
    scrollFrameTo(frameBefore, rule.section);
    scrollFrameTo(frameAfter, rule.section);
    if (frameBefore.contentWindow) frameBefore.contentWindow.__hallmarkY = frameBefore.contentWindow.scrollY;
    if (frameAfter.contentWindow) frameAfter.contentWindow.__hallmarkY = frameAfter.contentWindow.scrollY;
    scrollLock = false;
  }
  placeOutline();
}

function bindScroll(frame) {
  const win = frame.contentWindow;
  if (!win || win.__hallmarkScroll) return;
  win.__hallmarkScroll = true;
  win.addEventListener("scroll", () => {
    if (scrollLock) return;
    const other = frame === frameBefore ? frameAfter : frameBefore;
    const delta = win.scrollY - (win.__hallmarkY || 0);
    win.__hallmarkY = win.scrollY;
    if (!other.contentWindow || !delta) {
      placeOutline();
      return;
    }
    scrollLock = true;
    other.contentWindow.scrollBy(0, delta);
    other.contentWindow.__hallmarkY = other.contentWindow.scrollY;
    scrollLock = false;
    placeOutline();
  }, { passive: true });
}

function renderRules(data) {
  const theme = data.theme ? ` Theme dealt at build time: ${data.theme}.` : "";
  const render = data.render ? ` Render tier: ${data.render}.` : "";
  counts.textContent = `sloplint on the specimen: ${data.before.fails} FAIL, ${data.before.reflex} REFLEX, ${data.before.warns} WARN. On the Hallmark page: ${data.after.fails} FAIL, ${data.after.reflex} REFLEX, ${data.after.warns} WARN.${theme}${render}`;
  const groups = new Map();
  for (const rule of data.rules) {
    if (!groups.has(rule.section)) groups.set(rule.section, []);
    groups.get(rule.section).push(rule);
  }
  railList.replaceChildren();
  for (const [section, list] of groups) {
    const card = document.createElement("article");
    card.className = "pin" + (list.some((rule) => rule.stillOpen) ? " open" : "");
    card.dataset.section = section;
    const title = document.createElement("h2");
    title.textContent = section;
    card.appendChild(title);
    for (const rule of list) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rule";
      button.dataset.gate = rule.gate;
      const places = rule.count > 1 ? ` · ${rule.count} places` : "";
      const title = document.createElement("strong");
      title.textContent = rule.gate;
      const meta = document.createElement("span");
      meta.className = "end";
      meta.textContent = ` ${rule.tier}${places}`;
      const detail = document.createElement("small");
      detail.textContent = rule.change;
      button.append(title, meta, detail);
      if (rule.stillOpen) {
        const flag = document.createElement("span");
        flag.className = "still";
        flag.textContent = " Still open";
        button.appendChild(flag);
      }
      button.addEventListener("click", () => selectRule(rule, true));
      card.appendChild(button);
    }
    railList.appendChild(card);
  }
  rules = data.rules;
  ruleStatus.textContent = "Choose a rule. Its note sits beside that section.";
}

function watchFrame(frame) {
  frame.addEventListener("load", () => {
    bindScroll(frame);
    measure();
  });
  frame.addEventListener("error", () => {
    frameError.hidden = false;
  });
}

split.addEventListener("input", applySplit);

let dragging = false;
function splitFromPointer(event) {
  const rect = pair.getBoundingClientRect();
  if (!rect.width) return;
  const beforeWidth = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
  split.value = String(Math.round(100 - beforeWidth));
  applySplit();
}
divider.addEventListener("pointerdown", (event) => {
  dragging = true;
  divider.setPointerCapture(event.pointerId);
  splitFromPointer(event);
});
divider.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  splitFromPointer(event);
});
divider.addEventListener("pointerup", () => {
  dragging = false;
});
divider.addEventListener("pointercancel", () => {
  dragging = false;
});
document.getElementById("show-before").addEventListener("click", () => {
  split.value = "0";
  applySplit();
});
document.getElementById("show-after").addEventListener("click", () => {
  split.value = "100";
  applySplit();
});
window.addEventListener("resize", () => {
  placeOutline();
});
narrowQuery.addEventListener("change", placeOutline);

watchFrame(frameBefore);
watchFrame(frameAfter);
for (const frame of [frameBefore, frameAfter]) {
  if (frame.contentDocument && frame.contentDocument.readyState === "complete") {
    bindScroll(frame);
    measure();
  }
}
applySplit();

fetch("./rules.json")
  .then((response) => {
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  })
  .then(renderRules)
  .catch(() => {
    counts.textContent = "The rule list did not load. The slider still compares the two pages.";
  });
