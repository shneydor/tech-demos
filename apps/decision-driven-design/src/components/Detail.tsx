import {
  alternateFor,
  downstreamCount,
  locateOption,
  optionState,
  text,
  type Alternate,
  type Lang,
  type LangText,
  type SideOption,
  type Topic,
  type TreeNode,
  type ViewSentence,
} from "@/lib/model"

type Props = {
  topic: Topic
  lang: Lang
  sentence: ViewSentence | null
  option: { node: TreeNode; option: SideOption } | null
  alternate: Alternate | null
  onSentence: (number: number) => void
  onApply: (id: string) => void
  onRestore: () => void
}

export function Detail({ topic, lang, sentence, option, alternate, onSentence, onApply, onRestore }: Props) {
  const dir = lang === "he" ? "rtl" : "ltr"
  if (!sentence && option) {
    return (
      <article className="rounded-3xl border border-line bg-card p-4 shadow-sm" dir={dir}>
        <OptionBlock topic={topic} lang={lang} option={option} alternate={alternate} />
      </article>
    )
  }
  if (!sentence) {
    return (
      <article className="rounded-3xl border border-dashed border-line bg-card p-4 text-sm text-muted">
        {text({ he: "בחרו החלטה בעץ.", en: "Open a decision on the tree." }, lang)}
      </article>
    )
  }

  const linked = locateOption(topic, sentence.optionId)
  const parent = sentence.parent
    ? topic.sentences.find((item) => item.number === sentence.parent) ?? null
    : null
  const change = alternateFor(topic, sentence.number)
  const activeHere = alternate?.id === change?.id && change !== null
  const personas = new Map(topic.personas.map((persona) => [persona.id, persona]))
  const fors = sentence.arguments.filter((argument) => argument.side === "for")
  const against = sentence.arguments.filter((argument) => argument.side === "against")

  return (
    <article id="decision" className="rounded-3xl border border-line bg-card p-4 shadow-sm" dir={dir}>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-teal uppercase">
        {text({ he: "החלטה", en: "Decision" }, lang)} {sentence.number}
        {linked ? ` · ${linked.option.code}` : ""}
        {sentence.status === "rewritten" ? ` · ${text({ he: "זז בענף", en: "Moved on this branch" }, lang)}` : ""}
        {sentence.status === "closed" ? ` · ${text({ he: "יצא מהעץ", en: "Left the tree" }, lang)}` : ""}
      </p>
      <h2 className="mt-1 font-serif text-2xl leading-tight">{text(sentence.title, lang)}</h2>
      {topic.id === "voting" && sentence.number === 8 && !alternate && (
        <p className="mt-2 rounded-xl bg-amber-bg px-3 py-2 text-sm text-amber">
          {text(
            {
              he: "זו ההחלטה שהפרומפט המקורי אומר לשנות: לזיהוי ביומטרי.",
              en: "This is the decision the source prompt tells you to change: to biometric identification.",
            },
            lang,
          )}
        </p>
      )}
      {sentence.status === "closed" && sentence.note && (
        <p className="mt-3 text-sm leading-relaxed text-rose">{text(sentence.note, lang)}</p>
      )}
      <p className={`mt-3 font-serif text-lg leading-snug ${sentence.status === "closed" ? "text-muted line-through decoration-rose/60" : ""}`}>
        {text(sentence.status === "closed" ? sentence.published.decided : sentence.decided, lang)}
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        <span className="font-semibold">{text({ he: "כי", en: "Because" }, lang)} </span>
        {text(sentence.status === "closed" ? sentence.published.because : sentence.because, lang)}
      </p>
      {sentence.status === "rewritten" && (
        <div className="mt-3 rounded-2xl border border-amber/40 bg-amber-bg px-3 py-2 text-sm">
          <p className="font-semibold text-amber">{text({ he: "המשפט שפורסם", en: "Published sentence" }, lang)}</p>
          <p className="mt-1 leading-snug">{text(sentence.published.decided, lang)}</p>
          <p className="mt-1 text-muted">
            {text({ he: "כי", en: "Because" }, lang)} {text(sentence.published.because, lang)}
          </p>
          {sentence.note && <p className="mt-2 leading-snug">{text(sentence.note, lang)}</p>}
        </div>
      )}
      <p className="mt-3 text-sm text-muted">
        <span className="font-semibold text-rose">{text({ he: "נדחה", en: "Rejected" }, lang)} </span>
        {text(sentence.rejected, lang)}
      </p>
      {parent && (
        <button type="button" onClick={() => onSentence(parent.number)} className="mt-3 text-start text-sm text-teal underline-offset-2 hover:underline">
          {text({ he: "נובע מהחלטה", en: "Follows decision" }, lang)} {parent.number} · {text(parent.title, lang)}
        </button>
      )}
      <ChangeBlock
        topic={topic}
        lang={lang}
        sentence={sentence}
        alternate={alternate}
        change={change}
        activeHere={Boolean(activeHere)}
        onApply={onApply}
        onRestore={onRestore}
        onSentence={onSentence}
      />
      {sentence.wonBy.length > 0 && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">{text({ he: "מי נשא את הצומת", en: "Who carried this" }, lang)}: </span>
          {sentence.wonBy.map((id) => text(personas.get(id)?.name ?? { he: id, en: id }, lang)).join(", ")}
        </p>
      )}
      <ArgumentList lang={lang} title={{ he: "בעד", en: "For" }} items={fors} personas={personas} />
      <ArgumentList lang={lang} title={{ he: "נגד", en: "Against" }} items={against} personas={personas} />
      {linked && linked.option.effects.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
            {text({ he: "מהסימולציה שפורסמה", en: "From the published simulation" }, lang)}
          </h3>
          <ul className="mt-2 flex flex-col gap-2">
            {linked.option.effects.map((effect) => (
              <li key={`${effect.kind}-${effect.text.en}`} className="rounded-2xl bg-paper px-3 py-2 text-sm leading-snug">
                <span className={effect.kind === "limit" ? "font-semibold text-rose" : "font-semibold text-teal"}>
                  {effect.kind === "limit"
                    ? text({ he: "מגבלה", en: "Limit" }, lang)
                    : text({ he: "תועלת", en: "Benefit" }, lang)}
                </span>
                {effect.assumption ? ` · ${text({ he: "הנחה, לא מדידה", en: "Assumption, not a measurement" }, lang)}` : ""}
                <p className="mt-1">{text(effect.text, lang)}</p>
                <p className="mt-1 text-muted">{text(effect.impact, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

function ArgumentList({
  lang,
  title,
  items,
  personas,
}: {
  lang: Lang
  title: LangText
  items: ViewSentence["arguments"]
  personas: Map<string, Topic["personas"][number]>
}) {
  if (items.length === 0) return null
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{text(title, lang)}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((argument, index) => {
          const persona = personas.get(argument.personaId)
          if (!persona) return null
          const body =
            argument.source === "red-line"
              ? text(persona.redLine, lang)
              : argument.text
                ? text(argument.text, lang)
                : text(persona.line, lang)
          const source =
            argument.source === "round"
              ? `${text({ he: "סבב", en: "Round" }, lang)} ${argument.round ?? ""}`
              : argument.source === "red-line"
                ? text({ he: "קו אדום", en: "Red line" }, lang)
                : text({ he: "נכתב להדגמה", en: "Written for this demo" }, lang)
          return (
            <li key={`${argument.personaId}-${argument.side}-${index}`} className="rounded-2xl bg-paper px-3 py-2">
              <p className="text-sm font-semibold">
                {text(persona.name, lang)}
                <span className="font-normal text-muted"> · {text(persona.role, lang)}</span>
              </p>
              <p className="text-[11px] font-semibold tracking-wide text-teal uppercase">{source}</p>
              <p className="mt-1 text-sm leading-snug">{body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ChangeBlock({
  topic,
  lang,
  sentence,
  alternate,
  change,
  activeHere,
  onApply,
  onRestore,
  onSentence,
}: {
  topic: Topic
  lang: Lang
  sentence: ViewSentence
  alternate: Alternate | null
  change: Alternate | null
  activeHere: boolean
  onApply: (id: string) => void
  onRestore: () => void
  onSentence: (number: number) => void
}) {
  if (sentence.status === "closed") return null
  return (
    <div className="mt-4 border-t border-line pt-4">
      {change && !activeHere && !alternate && (
        <>
          <button
            type="button"
            onClick={() => onApply(change.id)}
            className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-teal-ink"
          >
            {text({ he: "שנו את ההחלטה הזו", en: "Change this decision" }, lang)}
          </button>
          <p className="mt-2 text-sm leading-snug text-muted">
            {text(
              {
                he: `ענף שנוצר מראש: ${text(change.label, "he")}. ${downstreamCount(change)} החלטות בהמשך זזות.`,
                en: `Pre-generated branch: ${text(change.label, "en")}. ${downstreamCount(change)} decisions downstream change.`,
              },
              lang,
            )}
          </p>
          {change.stayNote && <p className="mt-1 text-sm leading-snug">{text(change.stayNote, lang)}</p>}
        </>
      )}
      {activeHere && (
        <button type="button" onClick={onRestore} className="rounded-full border border-ink px-4 py-2 text-sm font-semibold">
          {text({ he: "החזירו את הענף שפורסם", en: "Restore the published branch" }, lang)}
        </button>
      )}
      {alternate && !activeHere && change && (
        <div>
          <p className="text-sm leading-snug">
            {text(
              {
                he: "ענף אחר פעיל. החזירו את הענף שפורסם לפני שינוי נוסף.",
                en: "Another branch is active. Restore the published branch before changing this one.",
              },
              lang,
            )}
          </p>
          <button type="button" onClick={onRestore} className="mt-2 rounded-full border border-ink px-4 py-2 text-sm font-semibold">
            {text({ he: "החזירו את הענף שפורסם", en: "Restore the published branch" }, lang)}
          </button>
        </div>
      )}
      {!change && !alternate && (
        <div>
          <p className="text-sm text-muted">
            {text(
              {
                he: "לא נוצר מראש ענף חלופי להחלטה הזו.",
                en: "No alternate was pre-generated for this decision.",
              },
              lang,
            )}
          </p>
          <p className="mt-2 text-sm">
            {text({ he: "אפשר לשנות את", en: "You can change" }, lang)}{" "}
            {topic.alternates.map((item, index) => (
              <span key={item.id}>
                {index > 0 ? ", " : ""}
                <button type="button" className="text-teal underline-offset-2 hover:underline" onClick={() => onSentence(item.sentenceNumber)}>
                  {item.sentenceNumber}
                </button>
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}

function OptionBlock({
  topic,
  lang,
  option,
  alternate,
}: {
  topic: Topic
  lang: Lang
  option: { node: TreeNode; option: SideOption }
  alternate: Alternate | null
}) {
  const state = optionState(topic, alternate, option.option.id)
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-teal uppercase">
        {option.option.code} · {text(option.node.title, lang)}
      </p>
      <h2 className="mt-1 font-serif text-2xl leading-tight">{text(option.option.label, lang)}</h2>
      <p className="mt-2 text-sm">
        {state.taken
          ? text({ he: "על הענף הזה האפשרות נבחרה.", en: "On this branch the option is chosen." }, lang)
          : text({ he: "על הענף הזה האפשרות לא נבחרה.", en: "On this branch the option was not taken." }, lang)}
      </p>
      {state.note && <p className="mt-2 text-sm leading-snug">{text(state.note, lang)}</p>}
      {option.option.sentenceNumbers.length > 0 && (
        <p className="mt-2 text-sm text-muted">
          {text({ he: "קשור להחלטות", en: "Tied to decisions" }, lang)} {option.option.sentenceNumbers.join(", ")}
        </p>
      )}
      {option.option.effects.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {option.option.effects.map((effect) => (
            <li key={effect.text.en} className="rounded-2xl bg-paper px-3 py-2 text-sm">
              <span className="font-semibold">{effect.kind === "limit" ? text({ he: "מגבלה", en: "Limit" }, lang) : text({ he: "תועלת", en: "Benefit" }, lang)}</span>
              <p className="mt-1">{text(effect.text, lang)}</p>
              <p className="mt-1 text-muted">{text(effect.impact, lang)}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-muted">
        {text(
          {
            he: "אפשרות מהעץ שפורסם, בלי משפט ממוספר משלה.",
            en: "An option from the published tree, without a numbered sentence of its own.",
          },
          lang,
        )}
      </p>
    </div>
  )
}
