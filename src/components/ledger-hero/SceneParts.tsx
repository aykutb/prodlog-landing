'use client';

import React, { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { StripMarker } from '@/src/components/kit';
import { formatShort } from '@/src/content/demo/priya';
import { HERO_ASK, type HeroSceneData } from '@/src/content/demo/heroScene';
import { CHAPTERS, MOTION, chapterAt, type HeroSceneState } from './heroTimeline';
import type { HeroScene } from './useHeroScene';

const Icon = ({ d, className = 'h-4 w-4' }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
// lucide: arrow-left, check, copy, skip-forward, calendar-clock, plus (the dashboard's icons)
const ICONS = {
  back: 'M12 19l-7-7 7-7M19 12H5',
  check: 'M20 6 9 17l-5-5',
  copy: 'M8 8h12v12H8zM4 16V4h12',
  skip: 'M5 4l10 8-10 8V4zM19 5v14',
  calendar: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h5M17.5 17.5 16 16.3V14M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0z',
  plus: 'M12 5v14M5 12h14',
};

const BUTTON = 'inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-body font-medium';
const SECONDARY = `${BUTTON} border border-border bg-surface text-ink`;

/**
 * The 1:1 prep screen (prodlog2 features/occasions/OneOnOnePrep.tsx inside
 * OccasionScreen), slid up over the log below the frame's top bar. Same
 * classes as the dashboard, a little tighter so it fits the frame (panel
 * title, 20px gaps, 10px row padding, a 64px ask box); nothing here is a control. Everything fits
 * from 390px except "Move to another day", which goes below 480px (the
 * Copy button keeps its longer label's width, so the row would wrap twice);
 * below 380px the rows also drop their outcome labels. Type never shrinks.
 */
export const PrepSheet = ({ prep, day, state }: { prep: HeroSceneData['prep']; day: string; state: HeroSceneState }) => (
  <div
    aria-hidden="true"
    inert
    className={`absolute inset-x-0 bottom-0 top-[45px] z-10 overflow-hidden bg-background px-4 py-5 transition-transform ease-out sm:px-6 sm:py-6 ${state.sheetOpen ? 'translate-y-0' : 'translate-y-[102%]'}`}
    style={{ transitionDuration: `${MOTION.SHEET_MS}ms` }}
  >
    <div className="space-y-5">
      <span className="-ml-2 inline-flex h-8 items-center gap-2 rounded-lg px-2 text-body font-medium text-ink">
        <Icon d={ICONS.back} />
        Back to your log
      </span>
      <header className="space-y-1">
        <p className="font-serif text-panel-title font-semibold text-ink">{prep.title}</p>
        <p className="text-sm text-muted-foreground">{prep.since}</p>
      </header>

      <section className="space-y-3">
        <p className="text-body font-semibold text-ink">Entries</p>
        <ul className="space-y-2">
          {prep.rows.map((row) => (
            <li key={row.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-2.5">
              <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-sm border border-ink bg-ink text-on-ink">
                <Icon d={ICONS.check} className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium leading-snug text-ink">{row.title}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <time dateTime={row.date} className="text-xs text-muted-foreground">
                    {formatShort(row.date, day)}
                  </time>
                  {row.outcome ? (
                    <span className="inline-flex max-w-full items-center gap-2 text-meta text-sage-strong max-[379px]:hidden">
                      <StripMarker tone="sage" />
                      <span className="truncate">{row.outcome}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-meta text-muted-foreground max-[379px]:hidden">
                      <Icon d={ICONS.plus} className="h-3.5 w-3.5" />
                      Add an outcome
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-body font-semibold text-ink">Gaps</p>
        <p className="text-sm text-muted-foreground">{prep.gaps}</p>
      </section>

      <section className="space-y-2">
        <p className="text-sm font-medium leading-none text-ink">{prep.askLabel}</p>
        <div
          data-scene-target="ask"
          className={`h-[4.75rem] w-full overflow-hidden rounded-md border bg-surface px-3 py-2 text-sm text-ink transition-shadow ${
            state.askFocus ? 'border-ink ring-2 ring-ink/15' : 'border-border'
          }`}
        >
          {state.askChars === 0 && !state.askFocus ? (
            <span className="text-muted-foreground">A decision, a resource, a question</span>
          ) : (
            <span className={`whitespace-pre-wrap break-words ${state.askFocus ? 'animate-caret-border border-r-[1.5px] border-ink pr-px' : ''}`}>
              {HERO_ASK.slice(0, state.askChars)}
            </span>
          )}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
        <span
          data-scene-target="copy"
          className={`${BUTTON} ${state.copied ? 'bg-sage-strong text-on-ink' : 'bg-ink text-on-ink'} ${state.copyPressed ? 'scale-95' : ''}`}
          style={{ transition: 'transform 150ms ease-out, background-color 250ms ease-out' }}
        >
          {/* Both labels share one cell, so the button keeps its width and "Skip this 1:1" never moves. */}
          <span className="grid">
            <span className={`col-start-1 row-start-1 inline-flex items-center gap-2 ${state.copied ? 'invisible' : ''}`}>
              <Icon d={ICONS.copy} />
              Copy for your 1:1 doc
            </span>
            <span className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${state.copied ? '' : 'invisible'}`}>
              <Icon d={ICONS.check} />
              Copied
            </span>
          </span>
        </span>
        <span className={SECONDARY}>
          <Icon d={ICONS.skip} />
          Skip this 1:1
        </span>
        <span className={`${SECONDARY} max-[479px]:hidden`}>
          <Icon d={ICONS.calendar} />
          Move to another day
        </span>
      </section>
    </div>
  </div>
);

/**
 * The demo's pointer: a plain arrow with a light shadow, moving on an
 * ease-in-out curve. It aims just inside the right edge of its target, in
 * the padding past the label, so it never covers the words it is about
 * to click.
 */
export const SceneCursor = ({ frameRef, state, instant, run }: { frameRef: RefObject<HTMLElement | null>; state: HeroSceneState; instant: boolean; run: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { target, moveMs, shown } = state.cursor;

  useLayoutEffect(() => {
    const place = (animate: boolean) => {
      const frame = frameRef.current;
      const el = ref.current;
      if (!frame || !el) return;
      const box = frame.getBoundingClientRect();
      // From lg the frame is zoomed; measure on screen, then place in the frame's own units.
      const scale = frame.offsetWidth ? box.width / frame.offsetWidth : 1;
      let x = frame.offsetWidth - 64;
      let y = frame.offsetHeight - 56;
      const aim = target === 'home' ? null : frame.querySelector(`[data-scene-target="${target}"]`);
      if (aim) {
        const r = aim.getBoundingClientRect();
        const inset = target === 'ask' ? 36 : 10;
        x = (r.right - box.left) / scale - inset;
        y = target === 'ask' ? (r.bottom - box.top) / scale - 18 : (r.top - box.top + r.height * 0.6) / scale;
      }
      el.style.transitionDuration = `${animate ? moveMs : 0}ms, ${MOTION.CURSOR_FADE_MS}ms`;
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    };
    place(!instant && moveMs > 0);
    const onResize = () => place(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [frameRef, target, moveMs, instant, run]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 z-20 ${shown ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionProperty: 'transform, opacity', transitionTimingFunction: 'cubic-bezier(.45,0,.2,1), ease-out' }}
    >
      <svg
        viewBox="0 0 18 22"
        className={`h-[22px] w-[18px] origin-top-left drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.25)] transition-transform ${state.cursor.pressed ? 'scale-[0.82]' : ''}`}
        style={{ transitionDuration: `${MOTION.CLICK_PRESS_MS}ms` }}
      >
        <path d="M1.5 1.5v16.2l4.3-4.1 2.9 6.6 2.9-1.3-2.9-6.4 6.1-.3z" fill="#fff" stroke="#1f2a44" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const PLAY = 'M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z';
const PAUSE = 'M7 4h3v16H7zM14 4h3v16h-3z';

/**
 * Under the frame: a round pause/play button and four chapters, each with a
 * thin track that fills in mauve as the clock passes through it. A chapter
 * jumps there and plays. After a take-over the chapters dim to 40% and the
 * button reads "Replay the demo"; the hero decides what each press does. The fills are written straight to the DOM each
 * frame, so the page does not re-render 60 times a second.
 */
export const SceneControls = ({
  scene,
  dimmed = false,
  playLabel,
  onPlayButton,
  onChapter,
}: {
  scene: HeroScene;
  dimmed?: boolean;
  playLabel?: string;
  onPlayButton: () => void;
  onChapter: (start: number) => void;
}) => {
  const fills = useRef<Array<HTMLSpanElement | null>>([]);
  const { timeline } = scene;

  // Redrawn every frame while the clock runs, and once whenever it jumps (a seek, a loop, a take-over).
  useEffect(() => {
    const draw = () => {
      const { clock } = timeline.snapshot();
      CHAPTERS.forEach((c, i) => {
        const el = fills.current[i];
        if (el) el.style.transform = `scaleX(${dimmed ? 0 : Math.max(0, Math.min(1, (clock - c.start) / (c.end - c.start)))})`;
      });
    };
    draw();
    if (!scene.running) return;
    let raf = requestAnimationFrame(function frame() {
      draw();
      raf = requestAnimationFrame(frame);
    });
    return () => cancelAnimationFrame(raf);
  }, [timeline, dimmed, scene.running, scene.run, scene.clock]);

  const active = dimmed || scene.still ? null : chapterAt(scene.clock).key;
  const label = playLabel ?? (scene.paused ? 'Play the demo' : 'Pause the demo');

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        type="button"
        onClick={onPlayButton}
        aria-label={label}
        title={label}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          <path d={scene.paused || playLabel ? PLAY : PAUSE} />
        </svg>
      </button>
      <div role="group" aria-label="Jump to part of the demo" className={`grid flex-1 grid-cols-4 gap-2 transition-opacity ${dimmed ? 'opacity-40' : ''}`}>
        {CHAPTERS.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onChapter(c.start)}
            aria-current={active === c.key ? 'step' : undefined}
            className={`min-w-0 rounded-sm pb-0.5 text-left text-meta font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
              active === c.key ? 'text-ink' : 'text-muted-foreground hover:text-ink'
            }`}
          >
            <span className="mb-1.5 block h-[3px] overflow-hidden rounded-full bg-border" aria-hidden="true">
              <span
                ref={(el) => {
                  fills.current[i] = el;
                }}
                className="block h-full origin-left scale-x-0 bg-mauve"
              />
            </span>
            <span className="block truncate">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
