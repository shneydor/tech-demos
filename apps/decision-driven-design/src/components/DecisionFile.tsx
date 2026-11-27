import { sentenceMatches, text, type Lang, type Topic, type ViewSentence } from "@/lib/model"

type Props = {
  topic: Topic
  lang: Lang
  sentences: ViewSentence[]
  selected: number | null
  query: string
  personaId: string | null
  onSentence: (number: number) => void
}

export function DecisionFile({ topic, lang, sentences, selected, query, personaId, onSentence }: Props) {
  const dir = lang === "he" ? "rtl" : "ltr"
  return (
    <div className="flex max-h-[78vh] flex-col gap-6 overflow-auto pe-1">
      {topic.nodes.map((node) => {
        const rows = sentences.filter((sentence) => sentence.nodeId === node.id)
        if (rows.length === 0) return null
        return (
          <section key={node.id}>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-teal uppercase" dir={dir}>
              {node.code} · {text(node.title, lang)}
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {rows.map((sentence) => {
                const dimmed = !sentenceMatches(topic, sentence, query, personaId)
                const active = selected === sentence.number
                return (
                  <li key={sentence.number}>
                    <button
                      type="button"
                      data-sentence={sentence.number}
                      dir={dir}
                      aria-pressed={active}
                      onClick={() => onSentence(sentence.number)}
                      className={`w-full rounded-2xl border px-4 py-3 text-start ${
                        dimmed ? "opacity-35" : ""
                      } ${
                        active
                          ? "border-ink bg-ink text-[var(--card)]"
                          : sentence.status === "rewritten"
                            ? "border-amber bg-amber-bg"
                            : sentence.status === "closed"
                              ? "border-dashed border-muted bg-card text-muted"
                              : "border-line bg-card hover:border-teal"
                      }`}
                    >
                      <span className="text-[11px] font-semibold tracking-wide uppercase">
                        {text({ he: "החלטה", en: "Decision" }, lang)} {sentence.number}
                        {sentence.status === "rewritten" ? ` · ${text({ he: "זז", en: "Moved" }, lang)}` : ""}
                        {sentence.status === "closed" ? ` · ${text({ he: "יצא מהעץ", en: "Left the tree" }, lang)}` : ""}
                      </span>
                      <span className="mt-1 block font-serif text-lg leading-snug">{text(sentence.decided, lang)}</span>
                      <span className={`mt-1 block text-sm ${active ? "text-[var(--card)]/80" : "text-muted"}`}>
                        {text({ he: "כי", en: "Because" }, lang)} {text(sentence.because, lang)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
