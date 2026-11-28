import { useCallback, useEffect, useRef, useState } from 'react'
import { ERA_LABEL, films, featured, type FilmPack } from './capture.ts'
import type { FilmWindow, OmPlayerElement, PlayerReadyDetail } from './player.ts'

const TEA_STEPS = ['C', 'Click', 'Note', 'Inbox', 'Stills'] as const
const AUTOMAT_STEPS = ['C', 'Click', 'Note', 'Inbox', 'Before / After'] as const

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
  const labels = Object.values(win?.__timelines ?? {}).reduce<Record<string, number>>(
    (all, timeline) => ({ ...all, ...(timeline?.labels ?? {}) }),
    {},
  )
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
  width: number,
): Box | null {
  const iframe = el.iframeElement
  if (!iframe) return null
  const ir = iframe.getBoundingClientRect()
  const sr = stage.getBoundingClientRect()
  if (!ir.width) return null
  const k = ir.width / (width || 1920)
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
  const [film, setFilm] = useState<FilmPack>(featured)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(film.scan.duration || film.fallbackDuration)
  const [scenes, setScenes] = useState<SceneMark[]>([])
  const [step, setStep] = useState(0)
  const [walking, setWalking] = useState(false)
  const [region, setRegion] = useState<Box | null>(null)
  const [pin, setPin] = useState<Box | null>(null)
  const [stillError, setStillError] = useState(false)
  const steps = film.id === 'automat' ? AUTOMAT_STEPS : TEA_STEPS
  const { comment, scan, provenance, inbox } = film

  const syncMarks = useCallback(() => {
    const stage = stageRef.current
    const el = playerRef.current
    if (!stage || !el || step < 2) {
      setRegion(null)
      setPin(null)
      return
    }
    const win = el.iframeElement?.contentWindow as FilmWindow | null
    const box = win?.__om?.boxOf?.(comment.target, comment.t)
    setRegion(box ? place(stage, el, box[0], box[1], box[2], box[3], scan.width || 1920) : null)
    const point = place(stage, el, comment.x, comment.y, 0, 0, scan.width || 1920)
    setPin(point)
  }, [step, comment, scan.width])

  useEffect(() => {
    const el = playerRef.current
    if (!el) return
    el.setAttribute('disable-click-to-play', '')
    const markReady = (detail?: PlayerReadyDetail) => {
      setReady(true)
      setError(null)
      setDuration(detail?.duration || el.duration || scan.duration || film.fallbackDuration)
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
  }, [film])

  useEffect(() => {
    if (step < 1) return
    const el = playerRef.current
    el?.pause()
    el?.seek(comment.t)
    setPlaying(false)
    setTime(comment.t)
  }, [step, comment.t])

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
        if (current >= steps.length) {
          setWalking(false)
          return current
        }
        return current + 1
      })
    }, 2600)
    return () => window.clearTimeout(id)
  }, [walking, step, steps.length])

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

  function selectFilm(next: FilmPack) {
    if (next.id === film.id) return
    setFilm(next)
    setReady(false)
    setError(null)
    setPlaying(false)
    setTime(0)
    setDuration(next.scan.duration || next.fallbackDuration)
    setScenes([])
    setStep(0)
    setWalking(false)
    setRegion(null)
    setPin(null)
    setStillError(false)
  }

  const currentScene = [...scenes].reverse().find((scene) => time >= scene.start - 1e-3)
  const shortCommit = provenance.commit.slice(0, 7)

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="kicker">huashu-motion · MIT · v{provenance.version}</p>
          <h1>Huashu Motion</h1>
          <div className="switch" role="tablist" aria-label="Film">
            {films.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={film.id === item.id}
                className={film.id === item.id ? 'on' : ''}
                onClick={() => selectFilm(item)}
              >
                {item.name}
                {item.id === 'automat' ? <small>Featured</small> : null}
              </button>
            ))}
          </div>
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
        {film.id === 'automat' ? (
          <>
            <strong>Press Play</strong> and this browser plays the Automat-it launch film that
            huashu-motion {provenance.version} scored from the public homepage. The picture is that
            composition. The sound is the wav <code>om sound</code> wrote. <strong>Walk the edit</strong>{' '}
            replays comment {comment.id}, which was applied with <code>om set</code> and closed with{' '}
            <code>om done</code>. The player shows the film after that edit. The stills are the before
            and the after. This page does not re-run the tool.
          </>
        ) : (
          <>
            <strong>Press Play</strong> and this browser draws Tea Across the Ages, the published
            showcase, through the official player. <strong>Walk the edit</strong> replays comment{' '}
            {comment.id}: the note recorded for this capture, the packet <code>om inbox --wait</code>{' '}
            printed, and the stills <code>om look</code> saved. <code>om done</code> was not run.
          </>
        )}
      </p>

      <div className="layout">
        <section>
          <div className="stage-wrap" ref={stageRef}>
            <om-player key={film.id} ref={playerRef} src={film.filmUrl} />
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
                  The player is loading this film.
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
            Scene names are the film’s own GSAP labels. {film.soundtrack}
          </p>
        </section>

        <aside className="panel" aria-label="Point at the frame">
          <h2>Point at the frame</h2>
          <div className="step-row">
            {steps.map((label, index) => (
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

          {step === 0 && film.id === 'automat' && (
            <>
              <p>
                This film was made with huashu-motion {provenance.version}: <code>om grab</code> on
                automat-it.com, an ABC score, <code>om sound</code>, <code>om check</code>,{' '}
                <code>om render</code>, and <code>om qa</code>. Words and figures are from that
                public homepage. The logo file is the one <code>om grab</code> saved.
              </p>
              <p>
                Walk the edit replays comment {comment.id}. The note was written for that capture.
                <code> om inbox</code> claimed it, <code>om look</code> saved the before,{' '}
                <code>om set</code> changed only the closing-line variables, and <code>om done</code>{' '}
                recorded the reply. The player is that after state.
              </p>
            </>
          )}

          {step === 0 && film.id === 'tea' && (
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

          {step === 2 && film.id === 'automat' && (
            <p>
              The click is x={comment.x}, y={comment.y}, on #{comment.target}. The pin stays on that
              click. The outline is the live <code>OM.region('{comment.target}')</code> after the
              edit, so the line sits higher than the pin.
            </p>
          )}

          {step === 2 && film.id === 'tea' && (
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
                <code>om inbox --wait</code> printed this and claimed {comment.id}.
                {film.id === 'tea' ? (
                  <>
                    {' '}
                    The SOURCE path is the local copy of <code>examples/showcase/index.html</code>.
                    Line 139 is that file. <a href={provenance.sourceLine}>Open the line on GitHub</a>.
                  </>
                ) : (
                  <>
                    {' '}
                    The SOURCE path is the local composition. The line it names is the closing line.
                    A later opening-frame fix added one CSS rule, so that line sits one line lower in
                    the shipped file than in this print.
                  </>
                )}
              </p>
            </>
          )}

          {step === 5 && (
            <>
              {film.id === 'automat' && comment.note ? (
                <blockquote className="note">{comment.note}</blockquote>
              ) : null}
              <p>
                {film.id === 'automat'
                  ? 'om done wrote that note. The first pair is the full frame before and after. The second pair is om look on the same click: the line is in the before close-up, and gone from that spot after.'
                  : `${provenance.look}. These are the files om look wrote. om done was not run.`}
              </p>
              {stillError ? (
                <p>The recorded stills could not be read.</p>
              ) : (
                <div className="stills">
                  {film.stills.map((shot) => (
                    <figure key={shot.src}>
                      <img src={shot.src} alt={shot.alt} onError={() => setStillError(true)} />
                      <figcaption>{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {film.soundLog ? (
                <>
                  <pre className="inbox">{film.soundLog}</pre>
                  <p>
                    Those lines are the last <code>om sound</code> print. The cue is the score fitted
                    to the picture. The closing line is a later render reusing the same wav.
                  </p>
                </>
              ) : null}
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
            {film.id === 'automat'
              ? 'om scan read these after om set. They are the live film. The comment packet above still has the earlier closing-line values.'
              : 'These are the fields the studio would edit in place. Changing them is om set, which rewrites the source. They are read-only on this page.'}
          </p>

          <div className="row-actions">
            <button className="ghost" type="button" onClick={goToFilm}>
              Back to the film
            </button>
            <button
              className="ghost"
              type="button"
              disabled={step >= steps.length}
              onClick={() => {
                stopWalk()
                if (ready) setStep((current) => Math.min(steps.length, current + 1))
              }}
            >
              Next
            </button>
          </div>
        </aside>
      </div>

      <footer>
        MIT · huashu-motion{' '}
        <a href={`${provenance.repo}/tree/${provenance.commit}`}>{shortCommit}</a>. Automat-it facts
        are from <a href="https://www.automat-it.com">automat-it.com</a>. Tea Across the Ages is the
        published showcase. GSAP, Poppins, and the showcase fonts keep their own licenses in the film
        folders.
      </footer>
    </div>
  )
}
