import { useEffect, useRef, useState } from "react"
import { alternateFor, fillSubject, text, type Bundle, type Lang, type Topic } from "@/lib/model"

type Tab = "design" | "change" | "illustrate"

type Props = {
  open: boolean
  onClose: () => void
  bundle: Bundle
  topic: Topic
  lang: Lang
  sentenceNumber: number | null
}

export function PromptDialog({ open, onClose, bundle, topic, lang, sentenceNumber }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [tab, setTab] = useState<Tab>("design")
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const change = (sentenceNumber ? alternateFor(topic, sentenceNumber) : null) ?? topic.alternates[0]
  const blocks = {
    design: {
      he: fillSubject(bundle.prompts.design.he, topic.subject.he),
      en: fillSubject(bundle.prompts.design.en, topic.subject.en),
    },
    change: change
      ? { he: change.promptHe, en: change.promptEn }
      : { he: "", en: "" },
    illustrate: bundle.prompts.illustrate,
  }
  const current = blocks[tab]

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(id)
    } catch {
      setCopied(`manual-${id}`)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="prompt-dialog"
    >
      <form method="dialog" className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="font-serif text-xl">{text({ he: "הפרומפט", en: "The prompt" }, lang)}</h2>
          <p className="text-sm text-muted">{text(bundle.prompts.notes, lang)}</p>
        </div>
        <button type="submit" className="rounded-full border border-line px-3 py-1 text-sm">
          {text({ he: "סגירה", en: "Close" }, lang)}
        </button>
      </form>
      <div className="flex gap-2 px-4 pt-3">
        {(
          [
            ["design", { he: "עיצוב", en: "Design" }],
            ["change", { he: "שינוי החלטה", en: "Change one" }],
            ["illustrate", { he: "איור", en: "Illustrate" }],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => {
              setTab(id)
              setCopied(null)
            }}
            className={`rounded-full px-3 py-1 text-sm ${tab === id ? "bg-ink text-[var(--card)]" : "border border-line"}`}
          >
            {text(label, lang)}
          </button>
        ))}
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-2">
        <PromptPane
          title={text({ he: "עברית", en: "Hebrew" }, lang)}
          body={current.he}
          dir="rtl"
          copied={copied === "he"}
          failed={copied === "manual-he"}
          onCopy={() => void copy("he", current.he)}
          copyLabel={text({ he: "העתקה", en: "Copy" }, lang)}
          copiedLabel={text({ he: "הועתק", en: "Copied" }, lang)}
          failedLabel={text({ he: "בחרו את הטקסט והעתיקו אותו.", en: "Select the text and copy it." }, lang)}
        />
        <PromptPane
          title={text({ he: "אנגלית", en: "English" }, lang)}
          body={current.en}
          dir="ltr"
          copied={copied === "en"}
          failed={copied === "manual-en"}
          onCopy={() => void copy("en", current.en)}
          copyLabel={text({ he: "העתקה", en: "Copy" }, lang)}
          copiedLabel={text({ he: "הועתק", en: "Copied" }, lang)}
          failedLabel={text({ he: "בחרו את הטקסט והעתיקו אותו.", en: "Select the text and copy it." }, lang)}
        />
      </div>
    </dialog>
  )
}

function PromptPane({
  title,
  body,
  dir,
  copied,
  failed,
  onCopy,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  title: string
  body: string
  dir: "rtl" | "ltr"
  copied: boolean
  failed: boolean
  onCopy: () => void
  copyLabel: string
  copiedLabel: string
  failedLabel: string
}) {
  return (
    <section className="rounded-2xl bg-ink text-[var(--card)]">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button type="button" onClick={onCopy} className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-teal-ink">
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre dir={dir} className="max-h-72 overflow-auto px-3 pb-3 text-sm leading-relaxed whitespace-pre-wrap">
        {body}
      </pre>
      {failed && <p className="px-3 pb-3 text-xs text-amber-bg">{failedLabel}</p>}
    </section>
  )
}
