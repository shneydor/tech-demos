import type { LangText } from "./types.ts"

/** `{subject}` is replaced with the topic on screen. */
export const designPrompt: LangText = {
  he: `צור דיון סוער בין פרסונות שונות לתכנון [{subject}]

תיצור ויכוח סוער, תיצור צמתי החלטה, תיצור עץ החלטות מאוד רחב ומאוד עמוק
לאחר מכן תסמלץ מגבלות או תועלות שעולות מכל מיני צמתים בעץ
תסמלץ החלטות שלי
התוצאה היא קובץ עם משפטי החלטות בשפה פשוטה
לדוגמה: החלטנו לעשות x כי y`,
  en: `Create a heated debate among different personas to design [{subject}].

Create a heated argument, create decision junctions, create a very wide and very deep decision tree.
Then simulate the constraints or benefits that arise from nodes in the tree.
Simulate my decisions.
The result is a file of decision sentences in plain language.
For example: we decided to do X because Y.`,
}

/** English text is the illustration prompt published on the source page. */
export const illustratePrompt: LangText = {
  he: `הוסף איור כזה לכל החלטה.
איור החלטה, 1200×600, SVG + PNG.
כותרת למעלה: הכלל ב-4–6 מילים.
שני מצבים זה לצד זה, ושום דבר אחר:
- שמאל: האפשרות שנדחתה. מסגרת אדומה מקווקוות, ✕.
- ימין: האפשרות שנבחרה. מסגרת ירוקה רציפה, ✓.
כל מצב מראה:
- חפץ אחד מוחשי (שורת כתובת, חשבונית, רשימת חברים, יומן ריצה…)
- שורת מונוספייס אחת אמיתית מתוך מסמך המקור (שאילתה / כתובת / קישור תפקיד)
- תווית תוצאה של 2–4 מילים
הראה את הדילמה עצמה, לא דמויות שמתווכחות. רעיון אחד לאיור,
בערך 2 אלמנטים ובערך 2 מילים בכל צד. בלי דיאלוג, פסקאות או הערות צד.
גודל גופן מינימלי 20px.`,
  en: `Add such an illustration to every decision.
Decision illustration, 1200×600, SVG + PNG.
Title on top: the rule in 4–6 words.
Two side-by-side scenes, nothing else:
- Left: the rejected option. Red dashed frame, ✕.
- Right: the chosen option. Solid green frame, ✓.
Each scene shows:
- one concrete artifact (URL bar, invoice, member list, run log…)
- one real monospace technical line from the source doc (query / URL / role binding)
- a 2–4 word consequence label
Show the dilemma itself, not characters arguing. One idea per illustration,
~2 elements and ~2 words per side. No dialogue, paragraphs or side notes.
Min font 20px.`,
}

export const promptNotes: LangText = {
  he: "בעמוד המקור כפתור ההעתקה מכניס [הנושא שלך]. כאן המשבצת מתמלאת בנושא שעל המסך. תרגום הפרומפט לאיור נכתב להדגמה; האנגלית היא הטקסט שפורסם.",
  en: "On the source page the copy button inserts [your topic]. Here the slot is filled with the topic on screen. The Hebrew illustration prompt is a translation for this demo; the English is the published text.",
}
