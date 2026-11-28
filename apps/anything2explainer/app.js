(function () {
  const data = window.A2E;
  const film = document.getElementById("film");
  const filmMeta = document.getElementById("film-meta");
  const filmNote = document.getElementById("film-note");
  const filmError = document.getElementById("film-error");
  const strip = document.getElementById("strip");
  const stagesEl = document.getElementById("stages");
  const blurb = document.getElementById("blurb");
  const source = document.getElementById("source");
  const card = document.getElementById("card");
  const cardKicker = document.getElementById("card-kicker");
  const cardTitle = document.getElementById("card-title");
  const cardBlocks = document.getElementById("card-blocks");
  const cardBody = document.getElementById("card-body");
  const cardStills = document.getElementById("card-stills");
  const cardCode = document.getElementById("card-code");
  const cardLinks = document.getElementById("card-links");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  const pos = document.getElementById("pos");

  if (!data || !data.stages) {
    cardTitle.textContent = "The published file did not include that field.";
    return;
  }

  const state = { stage: 0, index: 0, cut: "en" };
  const example = document.getElementById("example-link");
  if (data.example) example.href = data.example;

  function stage() {
    return data.stages[state.stage];
  }
  function item() {
    return stage().items[state.index];
  }
  function cut() {
    return data.films.find(function (row) { return row.id === state.cut; });
  }

  function appendRich(parent, text) {
    const re = /\*\*([^*]+)\*\*|`([^`]+)`/g;
    let last = 0;
    let match;
    while ((match = re.exec(text))) {
      if (match.index > last) parent.append(text.slice(last, match.index));
      const node = document.createElement(match[1] != null ? "strong" : "code");
      node.textContent = match[1] != null ? match[1] : match[2];
      parent.append(node);
      last = match.index + match[0].length;
    }
    if (last < text.length) parent.append(text.slice(last));
  }

  function textEl(tag, text) {
    const el = document.createElement(tag);
    appendRich(el, text);
    return el;
  }

  function showFilmError() {
    filmError.hidden = false;
    filmError.replaceChildren();
    filmError.append("This copy of the published film did not load. ");
    const link = document.createElement("a");
    link.href = "https://github.com/Vincentwei1021/anything2explainer#anything2explainer";
    link.textContent = "Watch it on the authors’ README.";
    filmError.append(link);
  }

  function setCut(id) {
    const row = data.films.find(function (filmRow) { return filmRow.id === id; });
    if (!row) return;
    state.cut = id;
    document.getElementById("cut-en").setAttribute("aria-pressed", id === "en" ? "true" : "false");
    document.getElementById("cut-zh").setAttribute("aria-pressed", id === "zh" ? "true" : "false");
    filmError.hidden = true;
    if (film.getAttribute("src") !== row.src) {
      film.src = row.src;
    }
    film.setAttribute("aria-label", row.title);
    filmMeta.textContent = row.title + " — " + row.meta;
    filmNote.textContent = row.note + " The trail is the original star-field cut from 2026-09-06: 4′35″, 8,246 frames. Stepping it does not move this playhead.";
  }

  function stillOn(still) {
    const current = item();
    if (current.stills && current.stills.some(function (row) { return row.src === still.src; })) return true;
    if (current.shot && current.shot === still.shot) return true;
    return false;
  }

  function jumpStill(still) {
    if (still.shot) {
      const stageIndex = data.stages.findIndex(function (row) { return row.id === "storyboard"; });
      const itemIndex = data.stages[stageIndex].items.findIndex(function (row) { return row.shot === still.shot; });
      if (itemIndex >= 0) {
        state.stage = stageIndex;
        state.index = itemIndex;
        render();
        return;
      }
    }
    state.stage = data.stages.findIndex(function (row) { return row.id === "shots"; });
    state.index = 0;
    render();
  }

  function buildStrip() {
    data.stills.forEach(function (still) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.src = still.src;
      const img = document.createElement("img");
      img.src = still.src;
      img.alt = still.file + ", frame " + still.frame;
      button.append(img);
      button.addEventListener("click", function () { jumpStill(still); });
      strip.append(button);
    });
  }

  function paintStrip() {
    const buttons = strip.querySelectorAll("button");
    data.stills.forEach(function (still, index) {
      const on = stillOn(still);
      buttons[index].classList.toggle("on", on);
      if (on) buttons[index].setAttribute("aria-current", "true");
      else buttons[index].removeAttribute("aria-current");
    });
  }

  function buildStages() {
    data.stages.forEach(function (row, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "tab");
      button.textContent = row.title;
      button.addEventListener("click", function () {
        state.stage = index;
        state.index = 0;
        render();
      });
      stagesEl.append(button);
    });
  }

  function paintStages() {
    const buttons = stagesEl.querySelectorAll("button");
    data.stages.forEach(function (row, index) {
      const on = index === state.stage;
      buttons[index].setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderCard() {
    const current = item();
    card.lang = current.lang || "en";
    cardKicker.textContent = current.kicker || "";
    cardTitle.replaceChildren();
    if (!current.title) {
      cardTitle.textContent = "The published file did not include that field.";
    } else {
      appendRich(cardTitle, current.title);
    }

    cardBlocks.replaceChildren();
    (current.blocks || []).forEach(function (block) {
      const chip = document.createElement("span");
      chip.textContent = block;
      cardBlocks.append(chip);
    });

    cardStills.replaceChildren();
    (current.stills || []).forEach(function (still) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = still.src;
      img.alt = still.caption;
      img.addEventListener("error", function () {
        const note = document.createElement("p");
        note.textContent = "This published still did not load.";
        img.replaceWith(note);
      });
      const caption = document.createElement("figcaption");
      caption.textContent = still.caption;
      figure.append(img, caption);
      cardStills.append(figure);
    });

    if (current.code) {
      cardCode.hidden = false;
      cardCode.querySelector("code").textContent = current.code;
    } else {
      cardCode.hidden = true;
      cardCode.querySelector("code").textContent = "";
    }

    cardBody.replaceChildren();
    (current.paragraphs || []).forEach(function (paragraph) {
      cardBody.append(textEl("p", paragraph));
    });
    (current.meta || []).forEach(function (field) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const label = document.createElement("p");
      label.className = "field-label";
      label.textContent = field.label;
      const value = textEl("p", field.value || "The published file did not include that field.");
      wrap.append(label, value);
      cardBody.append(wrap);
    });

    if (current.code) {
      cardBody.before(cardCode);
      cardBody.before(cardStills);
    } else {
      cardBody.before(cardStills);
    }

    cardLinks.replaceChildren();
    (current.links || []).forEach(function (link) {
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      anchor.rel = "noreferrer";
      anchor.target = "_blank";
      li.append(anchor);
      cardLinks.append(li);
    });
  }

  function atStart() {
    return state.stage === 0 && state.index === 0;
  }
  function atEnd() {
    return state.stage === data.stages.length - 1 && state.index === stage().items.length - 1;
  }

  function render() {
    const currentStage = stage();
    blurb.textContent = currentStage.blurb;
    source.replaceChildren();
    const link = document.createElement("a");
    link.href = currentStage.href;
    link.textContent = currentStage.source;
    link.rel = "noreferrer";
    link.target = "_blank";
    source.append(link);
    paintStages();
    renderCard();
    paintStrip();
    const count = currentStage.items.length;
    pos.textContent = currentStage.title + " · " + (state.index + 1) + " / " + count;
    backBtn.disabled = atStart();
    nextBtn.textContent = atEnd() ? "Replay trail" : "Next";
  }

  function step(direction) {
    if (direction > 0) {
      if (state.index < stage().items.length - 1) state.index += 1;
      else if (state.stage < data.stages.length - 1) {
        state.stage += 1;
        state.index = 0;
      } else {
        state.stage = 0;
        state.index = 0;
      }
    } else if (!atStart()) {
      if (state.index > 0) state.index -= 1;
      else {
        state.stage -= 1;
        state.index = stage().items.length - 1;
      }
    }
    card.scrollTop = 0;
    render();
  }

  document.getElementById("cut-en").addEventListener("click", function () { setCut("en"); });
  document.getElementById("cut-zh").addEventListener("click", function () { setCut("zh"); });
  nextBtn.addEventListener("click", function () { step(1); });
  backBtn.addEventListener("click", function () { step(-1); });
  document.addEventListener("keydown", function (event) {
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.target && event.target.closest && event.target.closest("video")) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  });
  film.addEventListener("error", function () {
    if (film.error) showFilmError();
  });
  film.addEventListener("loadedmetadata", function () {
    filmError.hidden = true;
  });

  buildStages();
  buildStrip();
  setCut("en");
  render();
})();
