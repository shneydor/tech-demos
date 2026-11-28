const COMMENT =
  "Don't retry card declines. Only retry timeouts, and send the same idempotency key so a slow success is not billed twice.";

const revisions = [
  {
    id: "r1",
    status:
      "Revision 1 · the agent is waiting for review. A comment on this draft is not approval to implement.",
    steps: [
      {
        id: "read",
        n: "01",
        lane: "understand",
        title: "Read the charge path",
        summary: "Start from ChargeService.capture, the path that already talks to the card provider.",
        decision: "Start from ChargeService.capture. Do not add a second payments service.",
        risk: "The timeout branch is easy to miss. The provider can return an error after the card has already settled.",
        done: "The plan names ChargeService.capture and the two failure shapes it will branch on: decline and timeout.",
        depends: [],
      },
      {
        id: "retry",
        n: "02",
        lane: "implement",
        title: "Retry every failed charge",
        summary: "Five immediate retries for any failure, with no extra guard.",
        decision: "Retry any failure immediately, up to five times.",
        risk: "A timeout after a successful charge can bill the card twice.",
        done: "Any failed capture is retried five times, immediately, with no extra guard.",
        depends: ["read"],
        comment: COMMENT,
      },
      {
        id: "email",
        n: "03",
        lane: "implement",
        title: "Email on the third failure",
        summary: "One note to the customer after three failures, whatever the cause.",
        decision: "Send one email after three failures. Do not distinguish a decline from a timeout.",
        risk: "A hard decline and a brief blip get the same “we’re retrying” note.",
        done: "The customer email fires on the third failure.",
        depends: ["retry"],
      },
      {
        id: "stamp",
        n: "04",
        lane: "implement",
        title: "Stamp the invoice paid or failed",
        summary: "Paid if any attempt succeeds, otherwise failed.",
        decision: "Write paid if any attempt succeeds. Otherwise write failed.",
        risk: "A double charge still looks like one paid invoice.",
        done: "The invoice row matches the last attempt: paid or failed.",
        depends: ["retry", "email"],
      },
    ],
  },
  {
    id: "r2",
    status:
      "Revision 2 · revised after the one comment on revision 1. This draft is not approved, and nothing has been implemented.",
    steps: [
      {
        id: "read",
        n: "01",
        lane: "understand",
        title: "Read the charge path",
        summary: "Same as revision 1. The capture path is still the starting point.",
        decision: "Start from ChargeService.capture. Do not add a second payments service.",
        risk: "The timeout branch is easy to miss. The provider can return an error after the card has already settled.",
        done: "The plan names ChargeService.capture and the two failure shapes it will branch on: decline and timeout.",
        depends: [],
        change: "same",
        because: "This step is the same in both revisions.",
      },
      {
        id: "classify",
        n: "02",
        lane: "implement",
        title: "Classify the failure",
        summary: "Declines stop. Timeouts, connection resets, and HTTP 5xx can retry.",
        decision: "Map each provider error to decline or timeout before any retry. Unknown codes stay failed.",
        risk: "Treating an unknown code as retryable would charge the card again.",
        done: "Each provider error maps to decline or timeout before a retry is scheduled. Unknown codes stay failed.",
        depends: ["read"],
        change: "new",
        because:
          "Added because of the comment on revision 1, so a decline is separated from a timeout before any retry.",
      },
      {
        id: "retry",
        n: "03",
        lane: "implement",
        title: "Retry timeouts with one idempotency key",
        summary: "At most three retries. Every attempt reuses the first capture’s key.",
        decision:
          "Retry timeouts at most three times. Every attempt reuses the idempotency key from the first capture. If the provider has no idempotency support, stop after the first attempt.",
        risk: "A provider that ignores idempotency keys can still double-charge. The plan records the key and stops when the provider cannot honor it.",
        done: "Declines are not retried. Timeout retries share the first capture’s idempotency key, and there are at most three.",
        depends: ["classify"],
        change: "revised",
        comment: COMMENT,
        reply:
          "Revision 1 retried every failure, five times. Declines now stop immediately. Timeouts retry at most three times, and every attempt reuses the idempotency key from the first capture.",
        replyExcerpt: "Declines now stop. Timeouts retry at most three times, on one idempotency key.",
      },
      {
        id: "email",
        n: "04",
        lane: "implement",
        title: "Email after the last timeout",
        summary: "Mail only when the timeout budget is spent. A decline sends no retry mail.",
        decision: "Send the email only after the last timeout retry fails.",
        risk: "A decline used to receive a “we’re retrying” note. That note is gone.",
        done: "One email is sent, and only after the last timeout retry fails.",
        depends: ["retry"],
        change: "revised",
        because:
          "The third-failure email belonged to the five-try loop. It now waits until the timeout budget is spent, and a decline sends no retry mail.",
      },
      {
        id: "stamp",
        n: "05",
        lane: "implement",
        title: "Stamp decline or recovered",
        summary: "The invoice records decline, recovered, or failed, plus the key on a recovery.",
        decision: "Write decline, recovered, or failed. A recovered invoice stores the idempotency key.",
        risk: "Paid or failed hid a decline that should never have been retried.",
        done: "The invoice shows decline, recovered, or failed. A recovered row stores the idempotency key.",
        depends: ["retry", "email"],
        change: "revised",
        because:
          "Paid or failed hid a decline that should never have been retried. The invoice now records decline, recovered, or failed, and a recovery stores the idempotency key.",
      },
    ],
  },
];

const lanes = [
  { id: "understand", label: "01 · Understand" },
  { id: "implement", label: "02 · Implement" },
];

let revisionIndex = location.hash === "#revised" ? 1 : 0;
let selectedId = "retry";

const draftButton = document.getElementById("show-draft");
const revisedButton = document.getElementById("show-revised");
const statusEl = document.getElementById("status");
const lanesEl = document.getElementById("lanes");
const inspectorEl = document.getElementById("inspector");
const canvasEl = document.getElementById("canvas");
const edgesEl = document.getElementById("edges");

draftButton.addEventListener("click", () => setRevision(0));
revisedButton.addEventListener("click", () => setRevision(1));

function current() {
  return revisions[revisionIndex];
}

function stepById(id) {
  return current().steps.find((step) => step.id === id) || null;
}

function setRevision(next, focusId) {
  revisionIndex = next;
  const url = new URL(location.href);
  url.hash = next === 1 ? "revised" : "";
  history.replaceState(null, "", url.pathname + url.search + url.hash);
  if (!stepById(selectedId)) selectedId = "retry";
  render();
  if (focusId) document.getElementById(focusId)?.focus();
}

function selectStep(id) {
  if (!stepById(id)) return;
  selectedId = id;
  render();
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  const props = attrs || {};
  Object.keys(props).forEach((key) => {
    const value = props[key];
    if (value == null || value === false) return;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, String(value));
  });
  (children || []).forEach((child) => {
    if (child == null) return;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  });
  return node;
}

function badgeFor(step) {
  if (step.comment && revisionIndex === 0) {
    return el("span", { class: "badge comment", text: "1 comment" });
  }
  if (step.change === "new") return el("span", { class: "badge new", text: "New" });
  if (step.change === "revised") return el("span", { class: "badge revised", text: "Revised" });
  if (step.change === "same") return el("span", { class: "badge same", text: "Unchanged" });
  return null;
}

function renderCard(step) {
  const classes = ["step"];
  if (step.change === "revised") classes.push("revised");
  if (step.change === "new") classes.push("new");
  const quote =
    step.comment && revisionIndex === 0
      ? el("span", { class: "quote", text: step.comment })
      : null;
  const reply =
    step.replyExcerpt && revisionIndex === 1
      ? el("span", { class: "reply-chip", text: step.replyExcerpt })
      : null;
  const button = el(
    "button",
    {
      type: "button",
      class: classes.join(" "),
      "data-id": step.id,
      "aria-pressed": selectedId === step.id ? "true" : "false",
    },
    [
      el("span", { class: "step-top" }, [
        el("span", { class: "step-n", text: step.n }),
        el("span", { class: "badges" }, [badgeFor(step)]),
      ]),
      el("span", { class: "step-title", text: step.title }),
      el("span", { class: "step-summary", text: step.summary }),
      quote,
      reply,
    ],
  );
  button.addEventListener("click", () => selectStep(step.id));
  return button;
}

function renderLanes() {
  lanesEl.replaceChildren();
  lanes.forEach((lane) => {
    const cards = current()
      .steps.filter((step) => step.lane === lane.id)
      .map(renderCard);
    lanesEl.append(
      el("div", { class: "lane" }, [
        el("p", { class: "lane-label", text: lane.label }),
        el("div", { class: "lane-cards" }, cards),
      ]),
    );
  });
}

function section(title, text) {
  return el("section", { class: "block" }, [
    el("h3", { text: title }),
    el("p", { text: text }),
  ]);
}

function renderInspector() {
  const step = stepById(selectedId);
  inspectorEl.replaceChildren();
  if (!step) {
    inspectorEl.append(el("p", { text: "This step could not be read." }));
    return;
  }

  const phase = step.lane === "understand" ? "Understand" : "Implement";
  inspectorEl.append(
    el("p", { class: "eyebrow", text: `Step ${step.n} · ${phase}` }),
    el("h2", { text: step.title }),
  );

  const deps = el("ul", { class: "depends" });
  if (step.depends.length === 0) {
    deps.append(el("li", { text: "No dependencies" }));
  } else {
    step.depends.forEach((id) => {
      const target = stepById(id);
      const label = target ? target.title : "Missing step";
      const button = el("button", { type: "button", text: `Depends on ${label}` });
      if (target) button.addEventListener("click", () => selectStep(id));
      deps.append(el("li", {}, [button]));
    });
  }
  inspectorEl.append(deps);
  inspectorEl.append(section("Decision", step.decision));
  inspectorEl.append(section("Risk", step.risk));
  inspectorEl.append(section("Done when", step.done));

  if (step.because) inspectorEl.append(section("In this revision", step.because));

  if (step.reply) {
    const thread = el("div", { class: "thread" }, [
      el("p", { class: "who agent", text: "Agent · acknowledgment" }),
      el("blockquote", { text: step.reply }),
    ]);
    inspectorEl.append(thread);
  }

  if (step.comment) {
    const caption =
      revisionIndex === 0
        ? "Sample comment on this step of revision 1. It stays on this revision. Showing the revised plan does not send it, and it is not approval."
        : "This comment was left on revision 1. It stays attached to that revision.";
    const thread = el("div", { class: "thread" }, [
      el("p", {
        class: "who you",
        text: revisionIndex === 0 ? "You · comment on this step" : "You · comment on revision 1",
      }),
      el("blockquote", { text: step.comment }),
      el("p", { class: "caption", text: caption }),
    ]);
    if (revisionIndex === 0) {
      const action = el("button", { type: "button", class: "action", text: "Show the revised plan" });
      action.addEventListener("click", () => setRevision(1, "show-revised"));
      thread.append(action);
    } else {
      const action = el("button", {
        type: "button",
        class: "action secondary",
        text: "Back to the commented draft",
      });
      action.addEventListener("click", () => setRevision(0, "show-draft"));
      thread.append(action);
    }
    inspectorEl.append(thread);
  }
}

function renderChrome() {
  const revision = current();
  statusEl.textContent = revision.status;
  draftButton.setAttribute("aria-pressed", revisionIndex === 0 ? "true" : "false");
  revisedButton.setAttribute("aria-pressed", revisionIndex === 1 ? "true" : "false");
}

function marker(id, color) {
  const ns = "http://www.w3.org/2000/svg";
  const mark = document.createElementNS(ns, "marker");
  mark.setAttribute("id", id);
  mark.setAttribute("markerUnits", "userSpaceOnUse");
  mark.setAttribute("markerWidth", "12");
  mark.setAttribute("markerHeight", "12");
  mark.setAttribute("refX", "10");
  mark.setAttribute("refY", "6");
  mark.setAttribute("orient", "auto");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", "M2 2 L10 6 L2 10");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", "1.6");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  mark.append(path);
  return mark;
}

function drawEdges() {
  const ns = "http://www.w3.org/2000/svg";
  const width = canvasEl.clientWidth;
  const height = canvasEl.clientHeight;
  edgesEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
  edgesEl.replaceChildren();
  if (width < 2 || height < 2) return;

  const defs = document.createElementNS(ns, "defs");
  defs.append(marker("arrow-muted", "#8a8176"));
  defs.append(marker("arrow-active", "#24356e"));
  edgesEl.append(defs);

  const canvasRect = canvasEl.getBoundingClientRect();
  const steps = current().steps;
  const edges = [];
  steps.forEach((step) => {
    step.depends.forEach((fromId) => {
      if (stepById(fromId)) edges.push({ from: fromId, to: step.id });
    });
  });

  const incoming = new Map();
  edges.forEach((edge) => {
    const list = incoming.get(edge.to) || [];
    list.push(edge);
    incoming.set(edge.to, list);
  });

  edges.forEach((edge) => {
    const fromEl = lanesEl.querySelector(`[data-id="${edge.from}"]`);
    const toEl = lanesEl.querySelector(`[data-id="${edge.to}"]`);
    if (!fromEl || !toEl) return;
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    const fromStep = stepById(edge.from);
    const toStep = stepById(edge.to);
    const laneIds = current()
      .steps.filter((step) => step.lane === fromStep.lane)
      .map((step) => step.id);
    const skipsAhead =
      fromStep.lane === toStep.lane &&
      Math.abs(laneIds.indexOf(edge.to) - laneIds.indexOf(edge.from)) > 1;
    const aCx = a.left + a.width / 2 - canvasRect.left;
    const aCy = a.top + a.height / 2 - canvasRect.top;
    const bCx = b.left + b.width / 2 - canvasRect.left;
    const bCy = b.top + b.height / 2 - canvasRect.top;
    const vertical = Math.abs(bCy - aCy) > Math.abs(bCx - aCx);
    let x1;
    let y1;
    let x2;
    let y2;
    let sideRail = false;
    if (skipsAhead) {
      sideRail = true;
      x1 = a.right - canvasRect.left;
      y1 = aCy;
      x2 = b.right - canvasRect.left;
      y2 = bCy;
    } else if (vertical) {
      const down = bCy >= aCy;
      x1 = aCx;
      y1 = (down ? a.bottom : a.top) - canvasRect.top;
      x2 = bCx;
      y2 = (down ? b.top : b.bottom) - canvasRect.top;
    } else {
      const right = bCx >= aCx;
      x1 = (right ? a.right : a.left) - canvasRect.left;
      y1 = aCy;
      x2 = (right ? b.left : b.right) - canvasRect.left;
      y2 = bCy;
    }

    const active = edge.from === selectedId || edge.to === selectedId;
    let d;
    if (sideRail) {
      const rail = Math.max(x1, x2) + 22;
      const endX = x2 + 2;
      d = `M ${x1} ${y1} H ${rail} V ${y2} H ${endX}`;
    } else {
      const group = incoming.get(edge.to) || [edge];
      const index = group.indexOf(edge);
      const spread = (index - (group.length - 1) / 2) * 16;
      if (vertical) x2 += spread;
      else y2 += spread;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const startPad = Math.min(6, len * 0.12);
      const endPad = Math.min(16, len * 0.28);
      const sx = x1 + (dx / len) * startPad;
      const sy = y1 + (dy / len) * startPad;
      const ex = x2 - (dx / len) * endPad;
      const ey = y2 - (dy / len) * endPad;
      if (vertical || Math.abs(ey - sy) < 10) {
        d = `M ${sx} ${sy} L ${ex} ${ey}`;
      } else {
        const mid = sx + (ex - sx) * 0.55;
        d = `M ${sx} ${sy} H ${mid} V ${ey} H ${ex}`;
      }
    }
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", active ? "#24356e" : "#8a8176");
    path.setAttribute("stroke-width", active ? "2.2" : "1.5");
    path.setAttribute("marker-end", active ? "url(#arrow-active)" : "url(#arrow-muted)");
    edgesEl.append(path);
  });
}

function render() {
  renderChrome();
  renderLanes();
  renderInspector();
  requestAnimationFrame(drawEdges);
}

const observer = new ResizeObserver(() => drawEdges());
observer.observe(canvasEl);
window.addEventListener("hashchange", () => {
  const next = location.hash === "#revised" ? 1 : 0;
  if (next === revisionIndex) return;
  revisionIndex = next;
  if (!stepById(selectedId)) selectedId = "retry";
  render();
});
if (document.fonts) document.fonts.ready.then(() => drawEdges());

render();
