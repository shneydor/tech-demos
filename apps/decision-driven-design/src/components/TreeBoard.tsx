import {
  locateOption,
  optionState,
  sentenceMatches,
  text,
  type Alternate,
  type Lang,
  type Topic,
  type ViewSentence,
} from "@/lib/model"

type Props = {
  topic: Topic
  lang: Lang
  sentences: ViewSentence[]
  alternate: Alternate | null
  selected: number | null
  path: number[]
  query: string
  personaId: string | null
  onSentence: (number: number) => void
  onOption: (optionId: string) => void
}

function cardClass(selected: boolean, status: ViewSentence["status"], onPath: boolean, dimmed: boolean): string {
  const base = "w-full rounded-2xl border px-3 py-2.5 text-start transition"
  if (dimmed) return `${base} border-line bg-card opacity-35`
  if (selected) return `${base} border-ink bg-ink text-[var(--card)] shadow-sm`
  if (status === "rewritten") return `${base} border-amber bg-amber-bg`
  if (status === "closed") return `${base} border-dashed border-muted/70 bg-card text-muted`
  if (onPath) return `${base} border-teal bg-card`
  return `${base} border-line bg-card hover:border-teal`
}

export function TreeBoard({
  topic,
  lang,
  sentences,
  alternate,
  selected,
  path,
  query,
  personaId,
  onSentence,
  onOption,
}: Props) {
  const dir = lang === "he" ? "rtl" : "ltr"

  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3" aria-label={text({ he: "עץ ההחלטות", en: "Decision tree" }, lang)}>
      {topic.nodes.map((node) => {
        const nodeSentences = sentences.filter((sentence) => sentence.nodeId === node.id)
        const primaryIds = new Set(nodeSentences.map((sentence) => sentence.optionId))
        const extras = node.options.filter((option) => !primaryIds.has(option.id))
        const closed = Boolean(alternate?.closeNodes.includes(node.id))
        return (
          <section
            key={node.id}
            className={`w-[15.5rem] shrink-0 snap-start rounded-3xl border bg-card/70 p-3 ${closed ? "border-dashed border-muted/50" : "border-line"}`}
          >
            <header className="mb-3 px-1" dir={dir}>
              <p className="text-xs font-semibold tracking-[0.14em] text-teal">
                {node.code}
                {closed ? ` · ${text({ he: "נסגר", en: "closed" }, lang)}` : ""}
              </p>
              <h2 className="font-serif text-lg leading-tight">{text(node.title, lang)}</h2>
              <p className="mt-1 text-sm leading-snug text-muted">{text(node.question, lang)}</p>
            </header>
            <div className="flex flex-col gap-2 border-s border-line ps-2">
              {nodeSentences.map((sentence) => {
                const option = locateOption(topic, sentence.optionId)
                const dimmed = !sentenceMatches(topic, sentence, query, personaId)
                const onPath = path.includes(sentence.number)
                return (
                  <button
                    key={sentence.number}
                    type="button"
                    data-sentence={sentence.number}
                    dir={dir}
                    aria-pressed={selected === sentence.number}
                    onClick={() => onSentence(sentence.number)}
                    className={cardClass(selected === sentence.number, sentence.status, onPath, dimmed)}
                  >
                    <span className="flex items-center justify-between gap-2 text-[11px] font-semibold tracking-wide uppercase">
                      <span>
                        {sentence.number}
                        {option ? ` · ${option.option.code}` : ""}
                      </span>
                      <Status lang={lang} status={sentence.status} selected={selected === sentence.number} />
                    </span>
                    <span className="mt-1 block font-serif text-[15px] leading-snug">{text(sentence.title, lang)}</span>
                    <span className={`clamp-3 mt-1 block text-xs leading-snug ${selected === sentence.number ? "text-[var(--card)]/80" : "text-muted"}`}>
                      {text(sentence.because, lang)}
                    </span>
                  </button>
                )
              })}
            </div>
            {extras.length > 0 && (
              <div className="mt-3 border-t border-line pt-2">
                <p className="px-1 text-[11px] font-semibold tracking-wide text-muted uppercase">
                  {text({ he: "גם על העץ", en: "Also on the tree" }, lang)}
                </p>
                <ul className="mt-1 flex flex-col gap-1">
                  {extras.map((option) => {
                    const state = optionState(topic, alternate, option.id)
                    const needle = query.trim().toLowerCase()
                    const hit =
                      !needle ||
                      `${option.code} ${option.label.he} ${option.label.en}`.toLowerCase().includes(needle)
                    const dimmed = Boolean(personaId) || !hit
                    return (
                      <li key={option.id}>
                        <button
                          type="button"
                          dir={dir}
                          onClick={() => onOption(option.id)}
                          className={`w-full rounded-xl px-2 py-1.5 text-start text-xs leading-snug hover:bg-paper ${dimmed ? "opacity-40" : ""} ${state.taken ? "text-ink" : "text-muted"}`}
                        >
                          <span className={state.taken ? "text-teal" : "text-rose"}>{state.taken ? "✓" : "✕"}</span>{" "}
                          <span className="font-semibold">{option.code}</span> {text(option.label, lang)}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

function Status({
  lang,
  status,
  selected,
}: {
  lang: Lang
  status: ViewSentence["status"]
  selected: boolean
}) {
  if (status === "same") return null
  const label =
    status === "rewritten"
      ? text({ he: "זז", en: "Moved" }, lang)
      : text({ he: "יצא", en: "Left" }, lang)
  return (
    <span className={selected ? "text-amber-bg" : status === "rewritten" ? "text-amber" : "text-rose"}>
      {label}
    </span>
  )
}
