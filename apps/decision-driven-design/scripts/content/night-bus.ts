import {
  authored,
  effect,
  type Alternate,
  type Sentence,
  type SideOption,
  type Topic,
  type TreeNode,
} from "./types.ts"

function opt(
  id: string,
  code: string,
  he: string,
  en: string,
  taken: boolean,
  sentenceNumbers: number[] = [],
  effects: SideOption["effects"] = [],
): SideOption {
  return {
    id,
    code,
    label: { he, en },
    taken,
    sentenceNumbers,
    effects,
  }
}

const nodes: TreeNode[] = [
  {
    id: "a",
    code: "A",
    title: { he: "השירות", en: "The service" },
    question: { he: "האם העיר מפעילה שירות לילה?", en: "Does the city run a night service?" },
    options: [
      opt("a1", "A1", "משאירים את הלילה למוניות ולאוטובוס האחרון", "Leave the night to taxis and the last bus", false),
      opt("a2", "A2", "שירות עירוני מחצות עד חמש", "A city service from midnight to 5:00", true, [1]),
    ],
  },
  {
    id: "b",
    code: "B",
    title: { he: "צורה", en: "Shape" },
    question: { he: "קו קבוע או ואן לפי קריאה?", en: "A fixed line, or a van on call?" },
    options: [
      opt("b1", "B1", "שני קווי לילה קבועים", "Two fixed night lines", false),
      opt(
        "b2",
        "B2",
        "ואנים לפי קריאה",
        "On-demand vans",
        true,
        [2, 12],
        [
          effect(
            "limit",
            false,
            {
              he: "איסוף מדלת לדלת מאריך נסיעה שיתופית מעבר למה שמרגיש כמו דרך הביתה.",
              en: "Door-to-door pickup stretches a shared ride past what feels like a way home.",
            },
            {
              he: "מחייב תקרת עצירות ומגביל איסוף מהדלת לבקשת נגישות.",
              en: "Requires a stop cap, and limits door pickup to an accessibility request.",
            },
          ),
        ],
      ),
    ],
  },
  {
    id: "c",
    code: "C",
    title: { he: "מחיר", en: "Price" },
    question: { he: "כמה עולה לחזור הביתה?", en: "What does it cost to get home?" },
    options: [
      opt("c1", "C1", "כמו כרטיס יום, בלי האמרה, חינם מתחת ל-18 ומעל 67", "A day-ticket fare, no surge, free under 18 and over 67", true, [3]),
      opt("c2", "C2", "מחיר שוק עם תקרה", "A market fare with a cap", false),
    ],
  },
  {
    id: "d",
    code: "D",
    title: { he: "מי ברכב", en: "Who is in the van" },
    question: { he: "חולקים נסיעה עם זרים?", en: "Do strangers share the ride?" },
    options: [
      opt("d1", "D1", "שיתוף, ואחרי אחת בלילה אפשר לבקש בלי איסוף נוסף באותו מחיר", "Shared, and after 1:00 a rider can request no extra pickup at the same fare", true, [4]),
      opt("d2", "D2", "תמיד שיתוף, בלי אפשרות לבד", "Always shared, no alone option", false),
      opt("d3", "D3", "תמיד ואן פרטי", "Always a private van", false),
    ],
  },
  {
    id: "e",
    code: "E",
    title: { he: "מי נוהג", en: "Who drives" },
    question: { he: "עובד עירייה או מפעיל קבלני?", en: "A city employee, or a contractor?" },
    options: [
      opt("e1", "E1", "נהגי עירייה עם תוספת לילה", "City drivers on a night differential", true, [5, 16]),
      opt("e2", "E2", "מפעיל מורשה בחוזה", "A licensed operator under contract", false),
    ],
  },
  {
    id: "f",
    code: "F",
    title: { he: "מידע", en: "Data" },
    question: { he: "מה נשמר אחרי הירידה?", en: "What is kept after the drop-off?" },
    options: [
      opt("f1", "F1", "שיתוף מיקום עם איש קשר אחד, נמחק אחרי 24 שעות", "A live location shared with one contact, deleted after 24 hours", true, [7]),
      opt("f2", "F2", "שומרים מיקום 90 יום לתכנון", "Keep location for 90 days for planning", false),
      opt("f3", "F3", "בלי זיהוי פנים", "No face recognition", true, [8]),
      opt("f4", "F4", "מצלמה בפנים, 72 שעות, רק עם צו, הקובץ אצל העיר", "An interior camera, 72 hours, warrant only, the city holds the file", true, [9]),
    ],
  },
  {
    id: "g",
    code: "G",
    title: { he: "גישה", en: "Access" },
    question: { he: "מי יכול להזמין, ואיפה עולים?", en: "Who can book, and where do they board?" },
    options: [
      opt("g1", "G1", "אפליקציה או טלפון לאדם", "The city app, or a phone call to a person", true, [6]),
      opt("g2", "G2", "רק אפליקציה", "App only", false),
      opt("g3", "G3", "ואן נגיש אם מבקשים 30 דקות מראש", "An accessible van if requested 30 minutes ahead", true, [10]),
      opt("g4", "G4", "פינות מסומנות, ודלת רק לבקשת נגישות", "Signed corners, and a door only for an accessibility request", true, [11]),
    ],
  },
  {
    id: "h",
    code: "H",
    title: { he: "קצב ותקלה", en: "Pace and failure" },
    question: { he: "איך מתחילים, ומה קורה כשמאחרים?", en: "How does it start, and what happens when it is late?" },
    options: [
      opt("h1", "H1", "חורף אחד, שתי שכונות, ואז הצבעת מועצה", "One winter, two neighborhoods, then a council vote", true, [13]),
      opt("h2", "H2", "כל העיר ביום הראשון", "Citywide on day one", false),
      opt("h3", "H3", "איחור מעל 15 דקות: נסיעה חינם ושובר מונית באותו לילה", "More than 15 minutes late: a free ride and a taxi voucher that night", true, [14]),
      opt("h4", "H4", "כשהוואנים מלאים אומרים את זה באפליקציה ובטלפון", "When the vans are full, say so in the app and on the phone", true, [15]),
    ],
  },
]

const sentences: Sentence[] = [
  {
    number: 1,
    nodeId: "a",
    optionId: "a2",
    parent: null,
    title: { he: "שירות עירייה עד חמש", en: "A city service until 5:00" },
    decided: {
      he: "החלטנו שהעיר מפעילה שירות לילה מחצות עד חמש, ולא משאירה את הלילה למוניות.",
      en: "We decided the city runs a night service from midnight to 5:00, and does not leave the night to taxis.",
    },
    because: {
      he: "אחרי האוטובוס האחרון מונית יקרה מדי למי שגומר משמרת.",
      en: "After the last bus, a taxi costs too much for someone ending a shift.",
    },
    rejected: { he: "להשאיר את הלילה למוניות", en: "Leave the night to taxis" },
    wonBy: ["hana", "leah"],
    arguments: [
      authored("hana", "for", "משמרת שנגמרת באחת לא יכולה להיתמחר מול מונית.", "A shift that ends at 1:00 cannot be bid against a taxi."),
      authored("leah", "against", "שירות לילה בלי תקרת עלות הוא חור בתקציב, לא קו.", "A night service with no cost ceiling is a hole in the budget, not a route."),
    ],
  },
  {
    number: 2,
    nodeId: "b",
    optionId: "b2",
    parent: 1,
    title: { he: "ואן לפי קריאה, לא קו", en: "A van on call, not a line" },
    decided: {
      he: "החלטנו שהשירות הוא ואנים לפי קריאה, לא קו קבוע.",
      en: "We decided the service is on-demand vans, not a fixed line.",
    },
    because: {
      he: "הביקוש דליל ומפוזר, וקו דליל משאיר את רוב הרחובות חשוכים.",
      en: "Demand is thin and spread out, and a sparse line leaves most streets dark.",
    },
    rejected: { he: "שני קווי לילה קבועים", en: "Two fixed night lines" },
    wonBy: ["gil"],
    arguments: [
      authored("gil", "for", "קו שמגיע פעם בשעה לא אוסף מישהו מרחוב צדדי.", "A line that comes once an hour does not collect someone from a side street."),
      authored("leah", "against", "לפי קריאה קשה לתקצב. קו עם לוח זמנים אפשר לספור.", "On-demand is hard to budget. A line with a timetable can be counted."),
    ],
  },
  {
    number: 3,
    nodeId: "c",
    optionId: "c1",
    parent: 2,
    title: { he: "בלי האמרה, כמו כרטיס יום", en: "No surge, a day-ticket fare" },
    decided: {
      he: "החלטנו שהמחיר לא מזנק, שווה לכרטיס יום בודד, וחינם מתחת ל-18 ומעל 67.",
      en: "We decided the fare never surges, equals a daytime single ticket, and is free under 18 and over 67.",
    },
    because: {
      he: "נסיעת ביטחון לא יכולה לעלות יותר בלילה גרוע.",
      en: "A safety ride cannot cost more on a bad night.",
    },
    rejected: { he: "מחיר שוק עם תקרה", en: "A market fare with a cap" },
    wonBy: ["hana", "omar"],
    arguments: [
      authored("hana", "for", "אם המחיר קופץ בגשם, חוזרים למונית שרצינו להחליף.", "If the price jumps in the rain, people are back to the taxi this was meant to replace."),
      authored("leah", "against", "מחיר קבוע בלילה ריק הוא סבסוד בלי תקרה של ביקוש.", "A flat night fare on an empty street is a subsidy with no demand ceiling."),
    ],
  },
  {
    number: 4,
    nodeId: "d",
    optionId: "d1",
    parent: 2,
    title: { he: "שיתוף, ולבד אחרי אחת", en: "Shared, and alone after 1:00" },
    decided: {
      he: "החלטנו שהנסיעות שיתופיות, ואחרי אחת בלילה אפשר לבקש בלי איסוף נוסף באותו מחיר.",
      en: "We decided rides are shared, and after 1:00 a rider can request no extra pickup at the same fare.",
    },
    because: {
      he: "השיתוף מממן את השירות, והאפשרות לבד הופכת אותו לשימושי.",
      en: "Sharing pays for the service, and the alone option makes it usable.",
    },
    rejected: { he: "תמיד עם זרים, או תמיד ואן פרטי", en: "Always with strangers, or always a private van" },
    wonBy: ["ruth", "gil"],
    arguments: [
      authored("ruth", "for", "אחרי אחת, האיסוף הנוסף הוא לא יעילות. הוא אדם זר ברכב.", "After 1:00, the extra pickup is not efficiency. It is a stranger in the van."),
      authored("gil", "against", "ואן לבד באותו מחיר שורף את הקיבולת של השכונה השנייה.", "An alone van at the same fare burns the capacity of the second neighborhood."),
    ],
  },
  {
    number: 5,
    nodeId: "e",
    optionId: "e1",
    parent: 1,
    title: { he: "נהג של העיר", en: "A driver who works for the city" },
    decided: {
      he: "החלטנו שהנהגים הם עובדי עירייה עם תוספת לילה, לא קבלני גיג.",
      en: "We decided drivers are city employees on a night differential, not gig contractors.",
    },
    because: {
      he: "העיר אחראית למי שנשאר לבד עם נוסע בשלוש בלילה.",
      en: "The city is accountable for who is alone with a rider at 3:00.",
    },
    rejected: { he: "מפעיל קבלני", en: "A contracted operator" },
    wonBy: ["ruth"],
    arguments: [
      authored("ruth", "for", "בשלוש בלילה צריך לדעת מי המעסיק, לא איזו אפליקציה שיבצה משמרת.", "At 3:00 you need to know the employer, not which app assigned the shift."),
      authored("leah", "against", "גיוס סגל לילה לפני שיש ביקוש מוכח הוא התחייבות ארוכה מדי לפיילוט.", "Hiring a night roster before demand is proven is too long a commitment for a pilot."),
    ],
  },
  {
    number: 6,
    nodeId: "g",
    optionId: "g1",
    parent: 2,
    title: { he: "אפליקציה או טלפון", en: "App or a phone call" },
    decided: {
      he: "החלטנו שמזמינים באפליקציית העיר או בטלפון לאדם.",
      en: "We decided people book in the city app or by phone to a person.",
    },
    because: {
      he: "רק אפליקציה משאירה בחוץ את מי שהכי צריך את האוטובוס.",
      en: "App-only leaves out the people who need the bus most.",
    },
    rejected: { he: "הזמנה רק באפליקציה", en: "Booking only in an app" },
    wonBy: ["omar", "rafi"],
    arguments: [
      authored("omar", "for", "בסוף משמרת הטלפון מת. צריך מספר שאדם עונה בו.", "At the end of a shift the phone is dead. There has to be a number a person answers."),
      authored("gil", "against", "מוקד טלפוני בלילה עולה כמו ואן נוסף.", "A night phone desk costs as much as another van."),
    ],
  },
  {
    number: 7,
    nodeId: "f",
    optionId: "f1",
    parent: 4,
    title: { he: "מיקום לאיש קשר אחד, 24 שעות", en: "Location to one contact, 24 hours" },
    decided: {
      he: "החלטנו שאפשר לשתף מיקום חי עם איש קשר אחד, והעיר מוחקת את השיתוף 24 שעות אחרי הירידה.",
      en: "We decided a rider can share live location with one trusted contact, and the city deletes that share 24 hours after drop-off.",
    },
    because: {
      he: "מישהו צריך לדעת שהנסיעה קורית, והעיר לא צריכה מפה של לילות בחוץ.",
      en: "Someone should know the ride is happening, and the city should not keep a map of nights out.",
    },
    rejected: { he: "לשמור מיקום 90 יום", en: "Keep location for 90 days" },
    wonBy: ["ruth", "omar"],
    arguments: [
      authored("ruth", "for", "איש קשר אחד הוא רשת ביטחון. ארכיון של תשעים יום הוא מעקב.", "One contact is a safety net. A ninety-day archive is surveillance."),
      authored("gil", "against", "בלי היסטוריה אי אפשר לדעת אילו רחובות בכלל ביקשו ואן.", "Without a history you cannot tell which streets asked for a van at all."),
    ],
  },
  {
    number: 8,
    nodeId: "f",
    optionId: "f3",
    parent: 5,
    title: { he: "בלי זיהוי פנים", en: "No face recognition" },
    decided: {
      he: "החלטנו שהוואנים לא משתמשים בזיהוי פנים.",
      en: "We decided the vans do not use face recognition.",
    },
    because: {
      he: "הוא נכשל בצורה לא שווה, ונסיעת לילה לא צריכה לדרוש אותו.",
      en: "It fails unevenly, and a night ride should not demand it.",
    },
    rejected: { he: "סריקת פנים כדי לעלות", en: "A face scan to board" },
    wonBy: ["omar"],
    arguments: [
      authored("omar", "for", "לא סורקים פנים כדי לעלות על אוטובוס של העיר.", "You do not scan a face to board a city bus."),
      authored("leah", "against", "בלי זיהוי קשה לסגור נסיעות כפולות וחשבונות שלא שילמו.", "Without identification it is harder to close duplicate rides and unpaid accounts."),
    ],
  },
  {
    number: 9,
    nodeId: "f",
    optionId: "f4",
    parent: 5,
    title: { he: "מצלמה ל-72 שעות, אצל העיר", en: "A camera for 72 hours, held by the city" },
    decided: {
      he: "החלטנו שמצלמה פנימית שומרת צילום 72 שעות, העיר מחזיקה בקובץ, והוא יוצא רק עם צו.",
      en: "We decided an interior camera keeps footage for 72 hours, the city holds the file, and it is released only with a warrant.",
    },
    because: {
      he: "גם נהג וגם נוסע צריכים תיעוד, וארכיון ארוך יותר נהיה מעקב.",
      en: "Both the driver and the rider need a record, and a longer archive becomes surveillance.",
    },
    rejected: { he: "בלי מצלמה, או שהקבלן מחזיק בצילום", en: "No camera, or the contractor holds the footage" },
    wonBy: ["ruth"],
    arguments: [
      authored("ruth", "for", "בלי צילום קצר אין מה לבדוק למחרת. עם ארכיון ארוך זה כבר לא תיעוד של נסיעה.", "Without a short recording there is nothing to check the next day. A long archive is no longer a record of a ride."),
      authored("omar", "against", "מצלמה שפונה לנוסע בלילה היא עוד סיבה לא לעלות.", "A camera pointed at the rider at night is one more reason not to get in."),
    ],
  },
  {
    number: 10,
    nodeId: "g",
    optionId: "g3",
    parent: 2,
    title: { he: "ואן נגיש בהזמנה מראש", en: "An accessible van if you ask ahead" },
    decided: {
      he: "החלטנו שוואן נגיש לכיסא גלגלים מובטח אם מבקשים 30 דקות מראש.",
      en: "We decided a wheelchair-accessible van is guaranteed when requested 30 minutes ahead.",
    },
    because: {
      he: "שירות לפי קריאה שלא יכול לקחת כיסא גלגלים הוא לא שירות ציבורי.",
      en: "An on-demand service that cannot take a wheelchair is not a public service.",
    },
    rejected: { he: "ואן נגיש רק אם במקרה פנוי", en: "An accessible van only if one happens to be free" },
    wonBy: ["rafi"],
    arguments: [
      authored("rafi", "for", "אם הנגישות היא מזל, אין שירות. יש הגרלה.", "If access is luck, there is no service. There is a lottery."),
      authored("gil", "against", "ואן נגיש שעומד 30 דקות ליתר ביטחון הוא ואן שלא אוסף אף אחד אחר.", "An accessible van held for 30 minutes just in case is a van that collects no one else."),
    ],
  },
  {
    number: 11,
    nodeId: "g",
    optionId: "g4",
    parent: 2,
    title: { he: "עולים בפינה מסומנת", en: "Board at a signed corner" },
    decided: {
      he: "החלטנו שהאיסוף הוא בפינות מסומנות, ואיסוף מהדלת רק לבקשת נגישות.",
      en: "We decided pickups are at signed corners, with a door pickup only for an accessibility request.",
    },
    because: {
      he: "מדלת לדלת לכולם הופך את הנסיעה השיתופית לאיטית מדי.",
      en: "Door-to-door for everyone makes the shared ride too slow.",
    },
    rejected: { he: "כל דלת, כל פעם", en: "Every door, every time" },
    wonBy: ["gil", "rafi"],
    arguments: [
      authored("gil", "for", "ארבע דלתות ברחוב אחד מוסיפות רבע שעה למי שכבר עלה.", "Four doors on one street add a quarter hour for someone already on board."),
      authored("hana", "against", "פינה לא מוארת בחצות היא לא תחנה. זו עוד הליכה.", "An unlit corner at midnight is not a stop. It is another walk."),
    ],
  },
  {
    number: 12,
    nodeId: "b",
    optionId: "b2",
    parent: 4,
    title: { he: "עד ארבע עצירות ועשרים דקות", en: "At most four stops and twenty minutes" },
    decided: {
      he: "החלטנו שנסיעה שיתופית מוסיפה לכל היותר ארבע עצירות ועשרים דקות.",
      en: "We decided a shared trip adds at most four stops and twenty minutes.",
    },
    because: {
      he: "אחרת הנסיעה הבטוחה היא סיור בעיר.",
      en: "Otherwise the safe ride is a tour of the city.",
    },
    rejected: { he: "בלי תקרה על העיקוף", en: "No cap on the detour" },
    wonBy: ["gil", "hana"],
    arguments: [
      authored("hana", "for", "עשרים דקות זה הגבול בין הסעה לבין ויתור וחזרה למונית.", "Twenty minutes is the line between a ride and giving up and taking a taxi."),
      authored("leah", "against", "תקרה קשיחה משאירה הזמנות על המדרכה כשהוואן כבר באזור.", "A hard cap leaves bookings on the sidewalk when the van is already nearby."),
    ],
  },
  {
    number: 13,
    nodeId: "h",
    optionId: "h1",
    parent: 1,
    title: { he: "חורף אחד, ואז המועצה", en: "One winter, then the council" },
    decided: {
      he: "החלטנו שהפיילוט רץ חורף אחד בשתי שכונות, ואז המועצה מצביעה.",
      en: "We decided the pilot runs one winter in two neighborhoods, then the council votes.",
    },
    because: {
      he: "רשת לילה קבועה לא נולדת מהודעה לעיתונות.",
      en: "A permanent night network should not start from a press release.",
    },
    rejected: { he: "כל העיר מהיום הראשון", en: "The whole city from day one" },
    wonBy: ["leah"],
    arguments: [
      authored("leah", "for", "חורף אחד אומר אם מישהו בכלל עולה. בלי זה אין על מה להצביע.", "One winter tells you whether anyone boards. Without that there is nothing to vote on."),
      authored("hana", "against", "שתי שכונות אומרות ששאר העיר עדיין הולכת הביתה ברגל.", "Two neighborhoods means the rest of the city is still walking home."),
    ],
  },
  {
    number: 14,
    nodeId: "h",
    optionId: "h3",
    parent: 13,
    title: { he: "איחור נהיה שובר מונית", en: "A late van becomes a taxi voucher" },
    decided: {
      he: "החלטנו שאם הוואן מאחר יותר מ-15 דקות הנסיעה חינם ויוצא שובר מונית באותו לילה.",
      en: "We decided that if the van is more than 15 minutes late, the ride is free and a taxi voucher is issued that night.",
    },
    because: {
      he: "ההבטחה היא להגיע הביתה, לא זיכוי בחודש הבא.",
      en: "The promise is getting home, not a credit next month.",
    },
    rejected: { he: "זיכוי בחשבון של החודש הבא", en: "A credit on next month's bill" },
    wonBy: ["hana"],
    arguments: [
      authored("hana", "for", "זיכוי בחשבון לא מחזיר מישהו הביתה הלילה.", "A credit on a bill does not get someone home tonight."),
      authored("leah", "against", "שובר מונית על כל איחור הוא המחיר של מונית, בתוספת המחיר של הוואן.", "A taxi voucher on every late van is the taxi's price, plus the van's."),
    ],
  },
  {
    number: 15,
    nodeId: "h",
    optionId: "h4",
    parent: 13,
    title: { he: "אומרים כשנגמר המקום", en: "Say so when the vans are full" },
    decided: {
      he: "החלטנו שחדר הבקרה עוצר הזמנות חדשות כשהוואנים מלאים, וחייב לומר זאת באפליקציה ובקו הטלפון.",
      en: "We decided the control room pauses new bookings when the vans are full, and must say so in the app and on the phone line.",
    },
    because: {
      he: "כשל שקט מחזיר אנשים למדרכה חשוכה.",
      en: "A silent failure sends people back to a dark sidewalk.",
    },
    rejected: { he: "ספינר שלא מסביר כלום", en: "A spinner that never explains" },
    wonBy: ["omar", "rafi"],
    arguments: [
      authored("omar", "for", "עדיף 'אין ואן' מאשר עיגול שסובב עד שהמשמרת הבאה מתחילה.", "Better an honest 'no van' than a circle that spins until the next shift starts."),
      authored("gil", "against", "הודעה מוקדמת מדי מרחיקה אנשים שעוד היה אפשר לאסוף בסיבוב.", "An early notice turns away people a later loop could still have collected."),
    ],
  },
  {
    number: 16,
    nodeId: "e",
    optionId: "e1",
    parent: 5,
    title: { he: "תוספת הלילה משולמת במשמרת", en: "The night differential is paid on the shift" },
    decided: {
      he: "החלטנו שתוספת הלילה משולמת על השעון, לא נצברת כחופשה.",
      en: "We decided the night differential is paid on the clock, not banked as time off.",
    },
    because: {
      he: "סידור מתנדבים לא מגיע בשתיים בלילה.",
      en: "A volunteer roster does not show up at 2:00.",
    },
    rejected: { he: "שעות נוספות שלא משולמות באותו החודש", en: "Overtime that is not paid that month" },
    wonBy: ["ruth", "leah"],
    arguments: [
      authored("ruth", "for", "מי שעובד בלילה צריך לראות את התוספת בתלוש, לא בהבטחה.", "Someone working the night needs the differential on the payslip, not in a promise."),
      authored("leah", "against", "תוספת על כל שעה מייקרת חורף שלם לפני שיודעים אם הקו עובד.", "A differential on every hour makes a whole winter expensive before anyone knows the route works."),
    ],
  },
]

const fixedLines: Alternate = {
  id: "fixed-lines",
  sentenceNumber: 2,
  label: { he: "שני קווים קבועים", en: "Two fixed lines" },
  promptHe: "החלטה [2]: שנה ל-[שני קווי לילה קבועים]",
  promptEn: "Decision [2]: change it to [two fixed night lines]",
  summary: {
    he: "הצורה מתחלפת מואן לפי קריאה לשני קווים. ההזמנה, הנסיעה לבד, תקרת העצירות והמיקום זזים. המחיר, הנהגים, המצלמה ושובר האיחור נשארים.",
    en: "The shape switches from an on-demand van to two lines. Booking, the alone ride, the stop cap, and the location share move. The fare, the drivers, the camera, and the late voucher stay.",
  },
  rewrites: [
    {
      number: 2,
      title: { he: "שני קווי לילה קבועים", en: "Two fixed night lines" },
      decided: {
        he: "החלטנו להפעיל שני קווי לילה קבועים, לא ואנים לפי קריאה.",
        en: "We decided to run two fixed night lines, not on-demand vans.",
      },
      because: {
        he: "לוח זמנים קל יותר לבטוח בו ולאייש אותו.",
        en: "A timetable is easier to trust and to staff.",
      },
      rejected: { he: "ואנים לפי קריאה", en: "On-demand vans" },
      note: {
        he: "אפשרות B1 תופסת את מקום B2.",
        en: "Option B1 takes the place of B2.",
      },
    },
    {
      number: 4,
      title: { he: "כולם על הקו חולקים אוטובוס", en: "Everyone on the line shares the bus" },
      decided: {
        he: "החלטנו שכל מי שעולה לקו חולק את האוטובוס, ואין ואן לבד.",
        en: "We decided everyone who boards the line shares the bus, and there is no alone van.",
      },
      because: {
        he: "קו קבוע לא שולח נסיעה פרטית.",
        en: "A fixed line does not dispatch a private ride.",
      },
      rejected: { he: "ואן לבד אחרי אחת", en: "An alone van after 1:00" },
      note: {
        he: "אפשרות 'לבד אחרי אחת' יורדת, כי אין ואן לשלוח.",
        en: "The 'alone after 1:00' option comes off, because there is no van to send.",
      },
    },
    {
      number: 6,
      title: { he: "עולים בלי הזמנה", en: "Board without booking" },
      decided: {
        he: "החלטנו שעולים בלי הזמנה, ומתקשרים רק כדי לבקש את הוואן הנגיש.",
        en: "We decided you board without booking, and you phone only to request the accessible van.",
      },
      because: {
        he: "לוח זמנים לא צריך שמירת מקום.",
        en: "A timetable does not need a reservation.",
      },
      rejected: { he: "הזמנה לכל נסיעה", en: "A booking for every ride" },
      note: {
        he: "הטלפון נשאר, אבל רק לסטייה הנגישה.",
        en: "The phone line stays, but only for the accessible deviation.",
      },
    },
    {
      number: 7,
      title: { he: "משתפים את מיקום הקו", en: "Share the line's position" },
      decided: {
        he: "החלטנו ששיתוף המיקום הוא המיקום החי של הקו, לא של ואן פרטי, והוא עדיין נמחק אחרי 24 שעות.",
        en: "We decided the location share is the line's live position, not a private van, and it is still deleted after 24 hours.",
      },
      because: {
        he: "בקו אין נסיעה פרטית לשדר, ויש אוטובוס שאפשר לעקוב אחריו.",
        en: "On a line there is no private ride to broadcast, and there is a bus someone can follow.",
      },
      rejected: { he: "מיקום של ואן פרטי", en: "A private van's location" },
      note: {
        he: "מחיקת 24 השעות נשארת. מה שזז זה מה משדרים.",
        en: "The 24-hour deletion stays. What moves is what gets shared.",
      },
    },
    {
      number: 10,
      title: { he: "סטייה מתוזמנת לואן הנגיש", en: "A scheduled deviation for the accessible van" },
      decided: {
        he: "החלטנו שבקשת הנגישות היא סטייה מתוזמנת מהקו, עדיין 30 דקות מראש.",
        en: "We decided the accessibility request is a scheduled deviation from the line, still 30 minutes ahead.",
      },
      because: {
        he: "הקו יכול לרדת מהמסלול רק אם ביקשו בזמן.",
        en: "The line can leave the route only when it was asked in time.",
      },
      rejected: { he: "ואן נגיש לפי קריאה", en: "An on-demand accessible van" },
      note: {
        he: "ההבטחה נשארת. היא יושבת על לוח הזמנים, לא על צי ואנים.",
        en: "The guarantee stays. It sits on the timetable, not on a van fleet.",
      },
    },
    {
      number: 11,
      title: { he: "רק תחנות מסומנות", en: "Signed stops only" },
      decided: {
        he: "החלטנו שהעלייה היא בתחנות המסומנות בלבד, ואיסוף מהדלת נשאר החריג של הנגישות.",
        en: "We decided boarding is at the signed stops only, and door pickup remains the accessibility exception.",
      },
      because: {
        he: "לקו אין פינות לפי קריאה. יש לו תחנות.",
        en: "A line has no on-call corners. It has stops.",
      },
      rejected: { he: "פינות לפי קריאה", en: "On-call corners" },
      note: {
        he: "החריג של הדלת לא זז.",
        en: "The door exception does not move.",
      },
    },
    {
      number: 12,
      title: { he: "הגבול הוא לוח הזמנים", en: "The bound is the timetable" },
      decided: {
        he: "החלטנו שהגבול הוא לוח הזמנים שפורסם, לא תקרת ארבע עצירות.",
        en: "We decided the bound is the published timetable, not a four-stop cap.",
      },
      because: {
        he: "המסלול של הקו הוא המסלול.",
        en: "The line's path is the path.",
      },
      rejected: { he: "תקרת ארבע עצירות", en: "A four-stop cap" },
      note: {
        he: "תקרת העצירות יורדת כי אין עיקוף להגביל.",
        en: "The stop cap comes off because there is no detour to limit.",
      },
    },
  ],
  closeNumbers: [],
  closeNote: null,
  closeNodes: [],
  shifts: [
    {
      optionId: "b1",
      taken: true,
      note: { he: "הקווים הקבועים נבחרים.", en: "The fixed lines are chosen." },
    },
    {
      optionId: "b2",
      taken: false,
      note: { he: "לפי קריאה יורד.", en: "On-demand comes off." },
    },
  ],
  stays: [3, 5, 8, 9, 14],
  stayNote: {
    he: "המחיר, נהגי העירייה, האיסור על זיהוי פנים, המצלמה ושובר האיחור נשארים. מה שזז הוא צורת הנסיעה.",
    en: "The fare, the city drivers, the face-recognition ban, the camera, and the late voucher stay. What moves is the shape of the ride.",
  },
}

const contracted: Alternate = {
  id: "contracted-drivers",
  sentenceNumber: 5,
  label: { he: "מפעיל קבלני", en: "A contracted operator" },
  promptHe: "החלטה [5]: שנה ל-[מפעיל מורשה בחוזה]",
  promptEn: "Decision [5]: change it to [a licensed operator under contract]",
  summary: {
    he: "הנהג עובר לקבלן לחורף הפיילוט. הצילום, המיקום, איסור הפנים, סוף החוזה, השובר והתוספת נכתבים לתוך החוזה. צורת הנסיעה לא זזה.",
    en: "The driver moves to a contractor for the pilot winter. Footage, location, the face ban, the end of the contract, the voucher, and the differential are written into the contract. The shape of the ride does not move.",
  },
  rewrites: [
    {
      number: 5,
      title: { he: "מפעיל מורשה לפיילוט", en: "A licensed operator for the pilot" },
      decided: {
        he: "החלטנו להתקשר עם מפעיל מורשה לוואנים, לא לגייס סגל עירוני לפני הפיילוט.",
        en: "We decided to contract a licensed operator for the vans, and not to hire a city roster before the pilot.",
      },
      because: {
        he: "העיר לא יכולה לגייס סגל לילה לפני שהביקוש הוכח.",
        en: "The city cannot hire a night roster before the demand is proven.",
      },
      rejected: { he: "לגייס סגל עירוני לפני הפיילוט", en: "Hire a city roster before the pilot" },
      note: {
        he: "אפשרות E2 תופסת את מקום E1 לחורף.",
        en: "Option E2 takes the place of E1 for the winter.",
      },
    },
    {
      number: 7,
      title: { he: "לקבלן אין עותק של המיקום", en: "The contractor keeps no copy of the location" },
      decided: {
        he: "החלטנו שהקבלן לא שומר עותק של שיתוף המיקום, והעיר עדיין מוחקת אותו אחרי 24 שעות.",
        en: "We decided the contractor cannot keep a copy of the location share, and the city still deletes it after 24 hours.",
      },
      because: {
        he: "המיקום הוא של הנסיעה, לא נכס של המפעיל.",
        en: "The location belongs to the ride, not to the operator.",
      },
      rejected: { he: "עותק מיקום אצל הקבלן", en: "A location copy kept by the contractor" },
      note: {
        he: "חלון 24 השעות נשאר. מי מחזיק עותק הוא מה שזז.",
        en: "The 24-hour window stays. Who may keep a copy is what moves.",
      },
    },
    {
      number: 8,
      title: { he: "איסור הפנים נכתב בחוזה", en: "The face ban is written into the contract" },
      decided: {
        he: "החלטנו שאיסור זיהוי הפנים נכתב בחוזה, עם סעיף ביטול אם ואן סורק פנים.",
        en: "We decided the face-recognition ban is written into the contract, with termination if a van scans a face.",
      },
      because: {
        he: "בלי סעיף, האיסור הוא בקשה למפעיל ולא כלל.",
        en: "Without a clause, the ban is a request to the operator and not a rule.",
      },
      rejected: { he: "איסור פנים שהוא רק בקשה", en: "A face ban that is only a request" },
      note: {
        he: "האיסור עצמו לא מתהפך.",
        en: "The ban itself does not flip.",
      },
    },
    {
      number: 9,
      title: { he: "הצילום נשאר אצל העיר", en: "The footage stays with the city" },
      decided: {
        he: "החלטנו שהעיר מחזיקה בצילום, לא הקבלן, וכלל 72 השעות והצו הוא סעיף ביטול בחוזה.",
        en: "We decided the city holds the footage, not the contractor, and the 72-hour warrant rule is a termination clause in the contract.",
      },
      because: {
        he: "קובץ אצל המפעיל הוא כבר לא תיעוד עירוני.",
        en: "A file held by the operator is no longer a city record.",
      },
      rejected: { he: "הקבלן מחזיק בצילום", en: "The contractor holds the footage" },
      note: {
        he: "משך השמירה לא זז. הבעלות על הקובץ זזה.",
        en: "The retention does not move. Ownership of the file does.",
      },
    },
    {
      number: 13,
      title: { he: "החוזה נגמר עם החורף", en: "The contract ends with the winter" },
      decided: {
        he: "החלטנו שהחוזה נגמר עם החורף, והצבעת המועצה כוללת אם להכניס את הנהגים פנימה.",
        en: "We decided the contract ends with the winter, and the council vote includes whether to bring the drivers in-house.",
      },
      because: {
        he: "פיילוט קבלני שלא נגמר נהיה ברירת המחדל.",
        en: "A contract pilot that does not end becomes the default.",
      },
      rejected: { he: "חוזה שלא נגמר", en: "A contract that does not end" },
      note: {
        he: "החורף ושתי השכונות נשארים. מה שנוסף הוא שאלת הבעלות על הנהגים.",
        en: "The winter and the two neighborhoods stay. What is added is the question of who employs the drivers.",
      },
    },
    {
      number: 14,
      title: { he: "השובר הוא של העיר", en: "The voucher is the city's" },
      decided: {
        he: "החלטנו שהשובר הוא של העיר, כדי שאיחור של הקבלן לא ישאיר את הנוסע להתווכח עם חברה.",
        en: "We decided the voucher is the city's, so a late contractor does not leave the rider arguing with a company.",
      },
      because: {
        he: "ההבטחה להגיע הביתה לא עוברת לספק.",
        en: "The promise of getting home does not move to the vendor.",
      },
      rejected: { he: "להשאיר את הנוסע להתווכח עם חברה", en: "Leave the rider arguing with a company" },
      note: {
        he: "15 הדקות והשובר נשארים. מי משלם הוא מה שננעל.",
        en: "The 15 minutes and the voucher stay. Who pays is what gets locked.",
      },
    },
    {
      number: 16,
      title: { he: "התוספת היא רצפת חוזה", en: "The differential is a contract floor" },
      decided: {
        he: "החלטנו שתוספת הלילה היא רצפה בחוזה, והעיר בודקת אותה, כי מחיר אחיד מזמין משמרת חסרה.",
        en: "We decided the night differential is a floor in the contract, audited by the city, because a flat fee invites an understaffed shift.",
      },
      because: {
        he: "בלי רצפה, החיסכון של הקבלן יוצא משעות הנהג.",
        en: "Without a floor, the contractor's saving comes out of the driver's hours.",
      },
      rejected: { he: "מחיר אחיד בלי רצפת לילה", en: "A flat fee with no night floor" },
      note: {
        he: "התשלום על השעון נשאר העיקרון. הוא עובר מתוספת עירונית לסעיף בחוזה.",
        en: "Pay on the clock stays the principle. It moves from a city differential to a contract clause.",
      },
    },
  ],
  closeNumbers: [],
  closeNote: null,
  closeNodes: [],
  shifts: [
    {
      optionId: "e2",
      taken: true,
      note: { he: "הקבלן נבחר לפיילוט.", en: "The contractor is chosen for the pilot." },
    },
    {
      optionId: "e1",
      taken: false,
      note: { he: "סגל עירוני יורד עד הצבעת המועצה.", en: "A city roster comes off until the council vote." },
    },
  ],
  stays: [2, 3, 4, 12],
  stayNote: {
    he: "הוואן לפי קריאה, המחיר, השיתוף ותקרת העצירות נשארים. מה שזז הוא מי נוהג ומי מחזיק בתיעוד.",
    en: "The on-demand van, the fare, the sharing, and the stop cap stay. What moves is who drives and who holds the record.",
  },
}

export const nightBus: Topic = {
  id: "night-bus",
  title: { he: "אוטובוס לילה עירוני", en: "City night bus" },
  subject: { he: "אוטובוס לילה עירוני לפי קריאה", en: "a city on-demand night bus" },
  blurb: {
    he: "נושא שני, באותה צורה: פרסונות, עץ, ומשפטי 'החלטנו X כי Y'. נכתב להדגמה הזו.",
    en: "A second topic, in the same shape: personas, a tree, and 'we decided X because Y'. Written for this demo.",
  },
  provenance: {
    he: "אוטובוס הלילה לא מופיע בעמוד המקור. הוא נכתב להדגמה באותה שיטה, בעברית ובאנגלית, והוקפא בזמן הבנייה. אין כאן קריאה למודל.",
    en: "The night bus is not on the source page. It was written for this demo in the same method, in Hebrew and in English, and frozen at build time. Nothing here calls a model.",
  },
  defaultSentence: 2,
  personas: [
    {
      id: "hana",
      name: { he: "חנה", en: "Hana" },
      role: { he: "אחות במשמרת לילה", en: "Night-shift nurse" },
      line: {
        he: "המשמרת נגמרת כשהאוטובוס האחרון כבר לא נוסע.",
        en: "The shift ends when the last bus is already gone.",
      },
      redLine: {
        he: "נסיעה הביתה לא יכולה להיות תלויה במחיר שמזנק.",
        en: "A ride home cannot depend on a price that surges.",
      },
    },
    {
      id: "gil",
      name: { he: "גיל", en: "Gil" },
      role: { he: "מתכנן תחבורה", en: "Transit scheduler" },
      line: {
        he: "נסיעה בלי גבול היא לא שירות. היא סיבוב בעיר.",
        en: "A ride with no bound is not a service. It is a loop around the city.",
      },
      redLine: {
        he: "נסיעה לא יכולה לשוטט שעה ולאסוף זרים.",
        en: "A trip cannot wander for an hour picking up strangers.",
      },
    },
    {
      id: "ruth",
      name: { he: "רות", en: "Ruth" },
      role: { he: "פעילת ביטחון אישי", en: "Personal-safety advocate" },
      line: {
        he: "בשלוש בלילה השאלה היא מי עוד ברכב, ומי מעסיק אותו.",
        en: "At 3:00 the question is who else is in the van, and who employs them.",
      },
      redLine: {
        he: "אין נסיעה שבה זר או נהג גיג הוא האדם האחר היחיד, ובלי מעסיק עירוני שאפשר לפנות אליו.",
        en: "No ride where a stranger or a gig driver is the only other person, with no city employer to answer for it.",
      },
    },
    {
      id: "omar",
      name: { he: "עומר", en: "Omar" },
      role: { he: "בן 17, סוגר משמרת", en: "17, closing a shift" },
      line: {
        he: "אם צריך אפליקציה וסריקת פנים, אני הולך.",
        en: "If it needs an app and a face scan, I walk.",
      },
      redLine: {
        he: "לא רק אפליקציה, ולא סריקת פנים.",
        en: "Not app-only, and not a face scan.",
      },
    },
    {
      id: "leah",
      name: { he: "לאה", en: "Leah" },
      role: { he: "גזברית העיר", en: "City treasurer" },
      line: {
        he: "פיילוט בלי סוף הוא תקציב בלי הצבעה.",
        en: "A pilot with no ending is a budget with no vote.",
      },
      redLine: {
        he: "אין תקציב פתוח לפי קריאה בלי פיילוט של חורף.",
        en: "No open-ended on-demand budget without a winter pilot.",
      },
    },
    {
      id: "rafi",
      name: { he: "רפי", en: "Rafi" },
      role: { he: "נוסע בכיסא גלגלים", en: "Wheelchair rider" },
      line: {
        he: "אם אי אפשר להזמין ואן נגיש, זה לא שירות ציבורי.",
        en: "If an accessible van cannot be booked, it is not a public service.",
      },
      redLine: {
        he: "נגישות לא יכולה להיות תלויה בזה שמשהו במקרה פנוי.",
        en: "Access cannot depend on something happening to be free.",
      },
    },
  ],
  nodes,
  sentences,
  alternates: [fixedLines, contracted],
}
