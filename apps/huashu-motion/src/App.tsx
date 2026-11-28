import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ERA_LABEL,
  comment,
  filmUrl,
  frameUrl,
  inbox,
  provenance,
  scan,
  zoomUrl,
} from './capture.ts'
import type { FilmWindow, OmPlayerElement, PlayerReadyDetail } from './player.ts'

const STEPS = ['C', 'Click', 'Note', 'Inbox', 'Stills'] as const

interface SceneMark {
  id: string
  start: number
}

interface Box {
  left: number
  top: number
  width: number
  height: number
}

function formatTime(t: number) {
  const s = Math.max(0, t)
  const m = Math.floor(s / 60)
  const rem = s - m * 60
  return `${m}:${rem.toFixed(2).padStart(5, '0')}`
}

function readScenes(el: OmPlayerElement): SceneMark[] {
  const win = el.iframeElement?.contentWindow as FilmWindow | null
  const labels = win?.__timelines?.showcase?.labels ?? {}
  return Object.entries(labels)
    .filter(([key]) => key.startsWith('scene:'))
    .map(([key, start]) => ({ id: key.slice(6), start }))
    .sort((a, b) => a.start - b.start)
}

function place(
  stage: HTMLElement,
  el: OmPlayerElement,
  x: number,
  y: number,
  w: number,
  h: number,
): Box | null {
  const iframe = el.iframeElement
  if (!iframe) return null
  const ir = iframe.getBoundingClientRect()
  const sr = stage.getBoundingClientRect()
  if (!ir.width) return null
  const k = ir.width / (scan.width || 1920)
  return {
    left: ir.left - sr.left + x * k,
    top: ir.top - sr.top + y * k,
    width: w * k,
    height: h * k,
  }
}

export default function App() {
  const playerRef = useRef<OmPlayerElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(scan.duration)
  const [scenes, setScenes] = useState<SceneMark[]>([])
  const [step, setStep] = useState(0)
  const [walking, setWalking] = useState(false)
  const [region, setRegion] = useState<Box | null>(null)
  const [pin, setPin] = useState<Box | null>(null)
  const [stillError, setStillError] = useState(false)

  const syncMarks = useCallback(() => {
    const stage = stageRef.current
    const el = playerRef.current
    if (!stage || !el || step < 2) {
      setRegion(null)
      setPin(null)
      return
    }
    const win = el.iframeElement?.contentWindow as FilmWindow | null
    const box = win?.__om?.boxOf?.('title', comment.t)
    setRegion(box ? place(stage, el, box[0], box[1], box[2], box[3]) : null)
    const point = place(stage, el, comment.x, comment.y, 0, 0)
    setPin(point)
  }, [step])

  useEffect(() => {
    const el = playerRef.current
    if (!el) return
    el.setAttribute('disable-click-to-play', '')
    const markReady = (detail?: PlayerReadyDetail) => {
      setReady(true)
      setError(null)
      setDuration(detail?.duration || el.duration || scan.duration)
      setScenes(readScenes(el))
      setTime(el.currentTime || 0)
    }
    const onReady = (event: Event) => {
      markReady((event as CustomEvent<PlayerReadyDetail>).detail)
    }
    const onTime = () => setTime(el.currentTime || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail
      setError(detail?.message || 'The film did not start.')
    }
    el.addEventListener('ready', onReady)
    let poll = 0
    if (el.duration > 0) markReady()
    else {
      poll = window.setInterval(() => {
        if (el.duration > 0) {
          markReady()
          window.clearInterval(poll)
        }
      }, 200)
    }
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onPause)
    el.addEventListener('error', onError)
    const slow = window.setTimeout(() => {
      if (!el.duration) setError('The film did not become ready. It has to load from this same page.')
    }, 20000)
    return () => {
      window.clearTimeout(slow)
      window.clearInterval(poll)
      el.removeEventListener('ready', onReady)
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onPause)
      el.removeEventListener('error', onError)
    }
  }, [])

  useEffect(() => {
    if (step < 1) return
    const el = playerRef.current
    el?.pause()
    el?.seek(comment.t)
    setPlaying(false)
    setTime(comment.t)
  }, [step])

  useEffect(() => {
    syncMarks()
  }, [syncMarks, ready, time])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new ResizeObserver(() => syncMarks())
    observer.observe(stage)
    return () => observer.disconnect()
  }, [syncMarks])

  useEffect(() => {
    if (!walking) return
    const id = window.setTimeout(() => {
      setStep((current) => {
        if (current >= STEPS.length) {
          setWalking(false)
          return current
        }
        return current + 1
      })
    }, 2600)
    return () => window.clearTimeout(id)
  }, [walking, step])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, a')) return
      if (event.key === ' ' && event.target === document.body) {
        event.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function togglePlay() {
    const el = playerRef.current
    if (!el || !ready) return
    if (el.paused) {
      setWalking(false)
      if (step > 0) {
        setStep(0)
        el.seek(0)
      }
      el.play()
    } else {
      el.pause()
    }
  }

  function seek(next: number) {
    const el = playerRef.current
    if (!el || !ready) return
    el.seek(next)
    setTime(next)
  }

  function startWalk() {
    if (!ready) return
    setStillError(false)
    setWalking(true)
    setStep(1)
  }

  function stopWalk() {
    setWalking(false)
  }

  function goToFilm() {
    stopWalk()
    setStep(0)
    const el = playerRef.current
    el?.pause()
    el?.seek(0)
    setTime(0)
    setPlaying(false)
  }

  const currentScene = [...scenes].reverse().find((scene) => time >= scene.start - 1e-3)
  const shortCommit = provenance.commit.slice(0, 7)

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="kicker">huashu-motion · MIT · v{provenance.version}</p>
          <h1>{provenance.title}</h1>
        </div>
        <div className="badges">
          <span className="badge live">
            <i />
            Live film
          </span>
          <span className="badge rec">
            <i />
            Recorded edit
          </span>
        </div>
      </header>

      <p className="banner">
        <strong>Press Play</strong> and this browser draws Tea Across the Ages, the published
        showcase, through the official player. <strong>Walk the edit</strong> replays comment{' '}
        {comment.id}: the note recorded for this capture, the packet <code>om inbox --wait</code>{' '}
        printed, and the stills <code>om look</code> saved. The film file is the published
        showcase. <code>om done</code> was not run.
      </p>

      <div className="layout">
        <section>
          <div className="stage-wrap" ref={stageRef}>
            <om-player ref={playerRef} src={filmUrl} />
            {region && (
              <div className="mark" style={region}>
                <span>#{comment.target}</span>
              </div>
            )}
            {pin && (
              <div className="pin" style={{ left: pin.left, top: pin.top }}>
                <b>1</b>
              </div>
            )}
            {!ready && !error && (
              <div className="veil">
                <div>
                  <strong>Drawing the film…</strong>
                  The published canvas engine is loading its fonts.
                </div>
              </div>
            )}
            {error && (
              <div className="veil">
                <div>
                  <strong>The player stopped.</strong>
                  {error}
                </div>
              </div>
            )}
          </div>

          <div className="transport">
            <button className="play" type="button" onClick={togglePlay} disabled={!ready}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <input
              className="scrub"
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={Math.min(time, duration || 0)}
              aria-label="Film time"
              disabled={!ready}
              onChange={(event) => {
                stopWalk()
                seek(Number(event.target.value))
              }}
            />
            <span className="clock">
              {formatTime(time)} / {formatTime(duration)}
            </span>
            <button className="walk" type="button" onClick={walking ? stopWalk : startWalk} disabled={!ready}>
              {walking ? 'Pause the walk' : 'Walk the edit'}
            </button>
          </div>

          <div className="scenes" aria-label="Scenes">
            {(scenes.length ? scenes : scan.scenes.map((scene) => ({ id: scene.id, start: 0 }))).map(
              (scene) => {
                const on = scenes.length > 0 && currentScene?.id === scene.id
                return (
                  <button
                    key={scene.id}
                    type="button"
                    className={on ? 'on' : ''}
                    title={`${scene.id} · ${formatTime(scene.start)}`}
                    disabled={!ready || scenes.length === 0}
                    onClick={() => {
                      stopWalk()
                      seek(scene.start)
                    }}
                  >
                    <b>{ERA_LABEL[scene.id] ?? scene.id}</b>
                    <small>{scenes.length ? formatTime(scene.start) : scene.id}</small>
                  </button>
                )
              },
            )}
          </div>
          <p className="quiet">
            Scene names are the film’s own GSAP labels. This copy has no soundtrack: the showcase
            does not declare music, and <code>om sound</code> was not run.
          </p>
        </section>

        <aside className="panel" aria-label="Point at the frame">
          <h2>Point at the frame</h2>
          <div className="step-row">
            {STEPS.map((label, index) => (
              <button
                key={label}
                type="button"
                className={step === index + 1 ? 'on' : ''}
                onClick={() => {
                  stopWalk()
                  if (ready) setStep(index + 1)
                }}
              >
                {index + 1}. {label}
              </button>
            ))}
          </div>

          {step === 0 && (
            <>
              <p>
                In the studio, C selects the comment tool, a click records the time, the scene, the
                object, and the source line, and <code>om look</code> saves the frame plus a
                close-up. This column plays that capture back on the live film.
              </p>
              <p>
                The note was written for this recording on {comment.created.slice(0, 10)}, against
                commit {shortCommit}. The claim name on the packet is the CLI default, “{comment.agent}”.
                Nothing edited the source after the claim.
              </p>
            </>
          )}

          {step === 1 && (
            <p>
              C selects the comment tool and the film pauses. This replay is paused at{' '}
              {formatTime(comment.t)}, scene {comment.scene}. The picture is the live engine at that
              time.
            </p>
          )}

          {step === 2 && (
            <p>
              The click is x={comment.x}, y={comment.y}, on #{comment.target}. The outline is the
              live box from <code>OM.region('title')</code>, which exists while the time is under
              1.13 seconds.
            </p>
          )}

          {step === 3 && (
            <>
              <blockquote className="note">“{comment.text}”</blockquote>
              <p>
                That sentence was the input to <code>addComment</code>. The fields around it — time,
                coordinates, target, scene, and the four composition variables — are what the CLI
                stored.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <pre className="inbox">{inbox}</pre>
              <p>
                <code>om inbox --wait</code> printed this and claimed {comment.id}. The SOURCE path
                is the local copy of <code>examples/showcase/index.html</code>. Line 139 is that
                file.{' '}
                <a href={provenance.sourceLine}>Open the line on GitHub</a>.
              </p>
            </>
          )}

          {step === 5 && (
            <>
              <p>{provenance.look}. These are the files <code>om look</code> wrote.</p>
              {stillError ? (
                <p>The recorded stills could not be read.</p>
              ) : (
                <div className="stills">
                  <figure>
                    <img
                      src={zoomUrl}
                      alt="Close-up om look saved around the click: the words Across the from the opening title."
                      onError={() => setStillError(true)}
                    />
                    <figcaption>zoom.png · 480×270 at 2× around the click</figcaption>
                  </figure>
                  <figure>
                    <img
                      src={frameUrl}
                      alt="Full frame om look saved at 0.55 seconds: the cave-painting era and the title Tea Across the Ages."
                      onError={() => setStillError(true)}
                    />
                    <figcaption>frame.png · the frame at {formatTime(comment.t)}</figcaption>
                  </figure>
                </div>
              )}
            </>
          )}

          <h3 className="kicker" style={{ marginTop: 8 }}>
            Variables from om scan
          </h3>
          <div className="vars">
            {scan.variables.map((variable) => (
              <div key={variable.id}>
                <b>{variable.id}</b>
                <span>
                  {String(variable.value)} · {variable.label}
                </span>
              </div>
            ))}
          </div>
          <p className="quiet">
            These are the fields the studio would edit in place. Changing them is <code>om set</code>,
            which rewrites the source. They are read-only on this page.
          </p>

          <div className="row-actions">
            <button className="ghost" type="button" onClick={goToFilm}>
              Back to the film
            </button>
            <button
              className="ghost"
              type="button"
              disabled={step >= STEPS.length}
              onClick={() => {
                stopWalk()
                if (ready) setStep((current) => Math.min(STEPS.length, current + 1))
              }}
            >
              Next
            </button>
          </div>
        </aside>
      </div>

      <footer>
        MIT · captured from{' '}
        <a href={`${provenance.repo}/tree/${provenance.commit}`}>{shortCommit}</a>
        {' · '}
        <a href={provenance.repo}>huashu-motion</a>
        {' · '}
        <a href={`${provenance.repo}/blob/${provenance.commit}/examples/showcase/index.html`}>
          showcase source
        </a>
        . GSAP stays under its own license, the art-motion engine is MIT, and the fonts are SIL OFL
        1.1. Those notices ship in the film folder.
      </footer>
    </div>
  )
}
