import commentJson from './data/comment.json'
import provenanceJson from './data/provenance.json'
import scanJson from './data/scan.json'
import inboxText from './data/inbox.txt?raw'

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
  duration: number
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
}

export const comment = commentJson as CommentRecord
export const scan = scanJson as ScanFile
export const provenance = provenanceJson as Provenance
export const inbox = inboxText

export const frameUrl = `${import.meta.env.BASE_URL}capture/frame.png`
export const zoomUrl = `${import.meta.env.BASE_URL}capture/zoom.png`
export const filmUrl = `${import.meta.env.BASE_URL}film/index.html`

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
