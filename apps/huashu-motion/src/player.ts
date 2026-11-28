export interface OmPlayerElement extends HTMLElement {
  play(): void
  pause(): void
  seek(t: number): void
  currentTime: number
  duration: number
  paused: boolean
  iframeElement: HTMLIFrameElement | null
}

export interface PlayerReadyDetail {
  duration: number
  compositionWidth: number
  compositionHeight: number
}

export interface FilmWindow extends Window {
  __timelines?: Record<string, { labels?: Record<string, number> }>
  __om?: {
    boxOf?: (id: string, t: number) => [number, number, number, number] | null
    regionLabel?: (id: string) => string | null
  }
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'om-player': React.DetailedHTMLProps<React.HTMLAttributes<OmPlayerElement>, OmPlayerElement> & {
          src?: string
        }
      }
    }
  }
}
