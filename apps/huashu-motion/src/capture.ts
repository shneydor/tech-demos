import commentJson from './data/comment.json'
import provenanceJson from './data/provenance.json'
import scanJson from './data/scan.json'
import inboxText from './data/inbox.txt?raw'
import automatComments from './data/automat/comment.json'
import automatProvenance from './data/automat/provenance.json'
import automatScan from './data/automat/scan.json'
import automatInbox from './data/automat/inbox.txt?raw'
import automatSound from './data/automat/sound.txt?raw'

export interface CommentRecord {
  id: string
  text: string
  t: number
  x: number
  y: number
  target: string
  scene: string
  element: string | null
  variables: Record<string, string | number | boolean>
  status: string
  created: string
  claimed: string
  agent: string
  note?: string
  done?: string
}

export interface ScanVariable {
  id: string
  type: string
  label: string
  value: string | number | boolean
}

export interface ScanScene {
  id: string
  line: number
}

export interface ScanFile {
  composition: string
  width: number
  height: number
  duration: number | null
  variables: ScanVariable[]
  scenes: ScanScene[]
}

export interface Provenance {
  repo: string
  commit: string
  version: string
  film: string
  title: string
  commentId: string
  capturedAt: string
  note: string
  commands: string[]
  look: string
  chrome: string
  sourceLine: string
  doneNote?: string
}

export const comment = commentJson as CommentRecord
export const scan = scanJson as ScanFile
export const provenance = provenanceJson as Provenance
export const inbox = inboxText

export const frameUrl = `${import.meta.env.BASE_URL}capture/frame.png`
export const zoomUrl = `${import.meta.env.BASE_URL}capture/zoom.png`
export const filmUrl = `${import.meta.env.BASE_URL}film/index.html`

export interface StillShot {
  src: string
  alt: string
  caption: string
}

export interface FilmPack {
  id: 'automat' | 'tea'
  name: string
  filmUrl: string
  comment: CommentRecord
  scan: ScanFile
  provenance: Provenance
  inbox: string
  stills: StillShot[]
  fallbackDuration: number
  soundtrack: string
  soundLog?: string
}

const base = import.meta.env.BASE_URL
const automatComment = (automatComments as CommentRecord[])[0]

export const films: FilmPack[] = [
  {
    id: 'automat',
    name: 'Automat-it',
    filmUrl: `${base}automat/index.html`,
    comment: automatComment,
    scan: automatScan as ScanFile,
    provenance: automatProvenance as Provenance,
    inbox: automatInbox,
    fallbackDuration: 17.14,
    soundLog: automatSound,
    soundtrack:
      'Soundtrack: the ABC score in the film, performed by om sound on synths (no instrument pack was installed) and saved as assets/sound.wav. Play starts that file. The browser does not compose it.',
    stills: [
      {
        src: `${base}automat-capture/before-frame.png`,
        alt: 'Before the edit: the closing line sits low, in a quiet grey, under the Automat-it wordmark.',
        caption: 'Before · om look frame at 14.00s',
      },
      {
        src: `${base}automat-capture/after-frame.png`,
        alt: 'After om done: the same closing line is higher, heavier, and set on the logo green.',
        caption: 'After · om still at 14s, the live film',
      },
      {
        src: `${base}automat-capture/before-zoom.png`,
        alt: 'Close-up of the click before the edit, showing the words of the closing line.',
        caption: 'Before · om look zoom on the click',
      },
      {
        src: `${base}automat-capture/after-zoom.png`,
        alt: 'The same click after the edit: the line has left that spot.',
        caption: 'After · the same click, the line has moved',
      },
    ],
  },
  {
    id: 'tea',
    name: 'Tea Across the Ages',
    filmUrl,
    comment,
    scan,
    provenance,
    inbox,
    fallbackDuration: scan.duration ?? 14.36,
    soundtrack:
      'This copy has no soundtrack. The showcase does not declare music, and om sound was not run.',
    stills: [
      {
        src: zoomUrl,
        alt: 'Close-up om look saved around the click on the opening title.',
        caption: 'zoom.png · 480×270 at 2× around the click',
      },
      {
        src: frameUrl,
        alt: 'Full frame om look saved at 0.55 seconds of Tea Across the Ages.',
        caption: 'frame.png · the frame at 0:00.55',
      },
    ],
  },
]

export const featured = films[0]

/** Year-card labels from examples/showcase/vendor/art-motion/eras.js, shortened for the strip. */
export const ERA_LABEL: Record<string, string> = {
  '01_cave': 'Cave',
  '02_egypt': 'Egypt',
  '03_greek': 'Greek',
  '04_roman': 'Roman',
  '05_gothic': 'Gothic',
  '06_renaissance': 'Renaissance',
  '08_impressionism': 'Impression',
  '09_postimp': 'Post-Imp.',
  '10_nouveau': 'Nouveau',
  '11_cubism': 'Cubism',
  '12_bauhaus': 'Bauhaus',
  '13_pop': 'Pop',
  '14_8bit': '8-bit',
  '15_raytrace': 'CGI',
  '16_2026': '2026',
}
