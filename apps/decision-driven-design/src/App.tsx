import { useEffect, useMemo, useState } from "react"
import bundleJson from "@/data/trees.json"
import { DecisionFile } from "@/components/DecisionFile"
import { Detail } from "@/components/Detail"
import { PromptDialog } from "@/components/PromptDialog"
import { TreeBoard } from "@/components/TreeBoard"
import {
  ancestors,
  findAlternate,
  locateOption,
  sentenceByNumber,
  sentenceMatches,
  text,
  viewSentences,
  type Bundle,
  type Lang,
} from "@/lib/model"

const bundle = bundleJson as Bundle

export default function App() {
  const [topicId, setTopicId] = useState(bundle.topics[0]?.id ?? "voting")
  const [lang, setLang] = useState<Lang>("en")
  const [mode, setMode] = useState<"tree" | "file">("tree")
  const [sentenceNumber, setSentenceNumber] = useState<number | null>(bundle.topics[0]?.defaultSentence ?? null)
  const [pinnedOptionId, setPinnedOptionId] = useState<string | null>(null)
  const [alternateId, setAlternateId] = useState<string | null>(null)
  const [personaId, setPersonaId] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [promptOpen, setPromptOpen] = useState(false)

  const topic = bundle.topics.find((item) => item.id === topicId) ?? bundle.topics[0]
  const alternate = findAlternate(topic, alternateId)
  const sentences = useMemo(() => viewSentences(topic, alternate), [topic, alternate])
  const pinned = pinnedOptionId ? locateOption(topic, pinnedOptionId) : null
  const optionOnly = Boolean(pinned && pinned.option.sentenceNumbers.length === 0)
  const sentence = optionOnly || sentenceNumber === null ? null : sentenceByNumber(sentences, sentenceNumber)
  const detailOption = optionOnly ? pinned : sentence ? locateOption(topic, sentence.optionId) : pinned
  const path = sentenceNumber && !optionOnly ? ancestors(topic, sentenceNumber) : []
  const visibleCount = sentences.filter((item) => sentenceMatches(topic, item, query, personaId)).length
  const dir = lang === "he" ? "rtl" : "ltr"

  useEffect(() => {
    if (sentenceNumber === null) return
    document.querySelector(`[data-sentence="${sentenceNumber}"]`)?.scrollIntoView({ block: "nearest", inline: "center" })
  }, [sentenceNumber, topicId, mode, alternateId])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (promptOpen) return
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
      const list = sentences.filter((item) => sentenceMatches(topic, item, query, personaId)).map((item) => item.number)
      if (list.length === 0) return
      const index = sentenceNumber === null ? -1 : list.indexOf(sentenceNumber)
      const forward = event.key === "ArrowDown" || event.key === "ArrowRight"
      const next = forward ? list[Math.min(list.length - 1, index + 1)] : list[Math.max(0, index < 0 ? 0 : index - 1)]
      if (next === undefined) return
      event.preventDefault()
      setPinnedOptionId(null)
      setSentenceNumber(next)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [promptOpen, sentences, topic, query, personaId, sentenceNumber])

  function switchTopic(id: string) {
    const next = bundle.topics.find((item) => item.id === id)
    if (!next) return
    setTopicId(id)
    setSentenceNumber(next.defaultSentence)
    setPinnedOptionId(null)
    setAlternateId(null)
    setPersonaId(null)
    setQuery("")
  }

  const moved = sentences.filter((item) => item.status === "rewritten").length
  const closed = sentences.filter((item) => item.status === "closed").length
  const stayed = sentences.length - moved - closed

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 pb-16">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">DDD</p>
          <h1 className="font-serif text-3xl leading-tight sm:text-4xl">Decision Driven Design</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted" dir={dir}>
            {text(topic.blurb, lang)}
          </p>
        </div>
        <p className="max-w-sm rounded-2xl border border-teal/30 bg-card px-3 py-2 text-sm leading-snug" dir={dir}>
          {text(bundle.notice, lang)}
          <span className="mt-1 block text-xs text-muted">
            {bundle.generatedAt} · {bundle.hash}
          </span>
        </p>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {bundle.topics.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === topic.id}
            onClick={() => switchTopic(item.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${item.id === topic.id ? "bg-ink text-[var(--card)]" : "border border-line bg-card"}`}
          >
            {text(item.title, lang)}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-line sm:inline" />
        <button type="button" aria-pressed={mode === "tree"} onClick={() => setMode("tree")} className={chip(mode === "tree")}>
          {text({ he: "עץ", en: "Tree" }, lang)}
        </button>
        <button type="button" aria-pressed={mode === "file"} onClick={() => setMode("file")} className={chip(mode === "file")}>
          {text({ he: "קובץ החלטות", en: "Decision file" }, lang)}
        </button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")} className={chip(lang === "en")}>
          English
        </button>
        <button type="button" aria-pressed={lang === "he"} onClick={() => setLang("he")} className={chip(lang === "he")}>
          עברית
        </button>
        <button type="button" onClick={() => setPromptOpen(true)} className="rounded-full bg-teal px-3 py-1.5 text-sm font-semibold text-teal-ink">
          {text({ he: "העתקת הפרומפט", en: "Copy prompt" }, lang)}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="decision-search">
          {text({ he: "חיפוש החלטה", en: "Search decisions" }, lang)}
        </label>
        <input
          id="decision-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={text({ he: "חיפוש החלטה או פרסונה", en: "Search a decision or a persona" }, lang)}
          className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-teal sm:w-72"
        />
        <p className="text-sm text-muted">
          {visibleCount}/{sentences.length}{" "}
          {text({ he: "החלטות", en: "decisions" }, lang)}
          {" · "}
          {topic.alternates.length} {text({ he: "אפשר לשנות", en: "you can change" }, lang)}
        </p>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          aria-pressed={personaId === null}
          onClick={() => setPersonaId(null)}
          className={chip(personaId === null)}
        >
          {text({ he: "כל הפרסונות", en: "All personas" }, lang)}
        </button>
        {topic.personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={personaId === persona.id}
            onClick={() => setPersonaId((current) => (current === persona.id ? null : persona.id))}
            className={chip(personaId === persona.id)}
            title={text(persona.redLine, lang)}
          >
            {text(persona.name, lang)}
          </button>
        ))}
      </div>

      {alternate && (
        <div className="mt-3 rounded-2xl border border-amber/50 bg-amber-bg px-4 py-3 text-sm leading-relaxed" dir={dir}>
          <p className="font-semibold text-amber">
            {text({ he: "ענף שנוצר מראש", en: "Pre-generated branch" }, lang)}: {text(alternate.label, lang)}
          </p>
          <p className="mt-1">{text(alternate.summary, lang)}</p>
          <p className="mt-1 text-muted">
            {moved} {text({ he: "זזו", en: "moved" }, lang)} · {closed} {text({ he: "יצאו מהעץ", en: "left the tree" }, lang)} · {stayed}{" "}
            {text({ he: "נשארו", en: "stayed" }, lang)}
          </p>
          <button type="button" onClick={() => setAlternateId(null)} className="mt-2 rounded-full border border-ink px-3 py-1 text-sm font-semibold">
            {text({ he: "החזירו את הענף שפורסם", en: "Restore the published branch" }, lang)}
          </button>
        </div>
      )}

      {visibleCount === 0 && (
        <p className="mt-4 rounded-2xl border border-dashed border-line bg-card px-4 py-3 text-sm">
          {text({ he: "אין החלטה שמתאימה לחיפוש.", en: "No decision matches that search." }, lang)}
        </p>
      )}

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="order-2 min-w-0 lg:order-1">
          {path.length > 0 && sentence && (
            <p className="mb-2 flex flex-wrap items-center gap-1 text-xs text-muted" dir={dir}>
              {path.map((number) => {
                const item = sentences.find((row) => row.number === number)
                if (!item) return null
                return (
                  <button key={number} type="button" onClick={() => { setPinnedOptionId(null); setSentenceNumber(number) }} className="rounded-full border border-line bg-card px-2 py-1 hover:border-teal">
                    {number} {text(item.title, lang)}
                  </button>
                )
              })}
              <span className="rounded-full bg-ink px-2 py-1 text-[var(--card)]">
                {sentence.number} {text(sentence.title, lang)}
              </span>
            </p>
          )}
          {mode === "tree" ? (
            <TreeBoard
              topic={topic}
              lang={lang}
              sentences={sentences}
              alternate={alternate}
              selected={optionOnly ? null : sentenceNumber}
              path={path}
              query={query}
              personaId={personaId}
              onSentence={(number) => {
                setPinnedOptionId(null)
                setSentenceNumber(number)
              }}
              onOption={(optionId) => {
                const located = locateOption(topic, optionId)
                setPinnedOptionId(optionId)
                const linked = located?.option.sentenceNumbers[0]
                if (linked) setSentenceNumber(linked)
              }}
            />
          ) : (
            <DecisionFile
              topic={topic}
              lang={lang}
              sentences={sentences}
              selected={optionOnly ? null : sentenceNumber}
              query={query}
              personaId={personaId}
              onSentence={(number) => {
                setPinnedOptionId(null)
                setSentenceNumber(number)
              }}
            />
          )}
          <p className="mt-3 text-xs leading-relaxed text-muted" dir={dir}>
            {text(topic.provenance, lang)}
          </p>
        </div>
        <div className="order-1 lg:sticky lg:top-4 lg:order-2 lg:max-h-[calc(100vh-2rem)] lg:overflow-auto">
          <Detail
            topic={topic}
            lang={lang}
            sentence={sentence}
            option={detailOption}
            alternate={alternate}
            onSentence={(number) => {
              setPinnedOptionId(null)
              setSentenceNumber(number)
            }}
            onApply={(id) => {
              setAlternateId(id)
              setPinnedOptionId(null)
            }}
            onRestore={() => setAlternateId(null)}
          />
        </div>
      </div>

      <footer className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-sm text-muted">
        <a className="underline-offset-2 hover:underline" href="https://ddd-prompt.surge.sh">
          ddd-prompt.surge.sh
        </a>
        <a className="underline-offset-2 hover:underline" href="https://x.com/mati_h/status/2112791747168198850">
          {text({ he: "הפוסט של מתי", en: "Mati's post" }, lang)}
        </a>
        <a className="underline-offset-2 hover:underline" href="https://github.com/google-research/dream-rsi">
          Dream-RSI
        </a>
        <span>
          {text(
            {
              he: "הרעיון לשמור עץ מפורש ולנגן ענף אחר, במקום לרדוף אחרי בחירות נסתרות, הוא מה שמתי מייחס ל-Dream-RSI של גוגל.",
              en: "Keeping an explicit tree and replaying another branch, instead of chasing hidden choices, is what Mati credits to Google's Dream-RSI.",
            },
            lang,
          )}
        </span>
      </footer>

      <p className="sr-only">
        {text({ he: "מקשי החצים עוברים בין החלטות.", en: "Arrow keys move between decisions." }, lang)}
      </p>

      <PromptDialog
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        bundle={bundle}
        topic={topic}
        lang={lang}
        sentenceNumber={sentenceNumber}
      />
    </div>
  )
}

function chip(active: boolean): string {
  return active
    ? "rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-[var(--card)] whitespace-nowrap"
    : "rounded-full border border-line bg-card px-3 py-1.5 text-sm whitespace-nowrap"
}
