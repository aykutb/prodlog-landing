'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type { SceneSnapshot, Timeline } from '@/src/lib/scene/timeline';
import { T, afterFrame, createHeroTimeline, type HeroSceneState } from './heroTimeline';

export interface HeroScene {
  state: HeroSceneState;
  clock: number;
  run: number;
  /** Render this frame without transitions (it came from a seek, or is the still). */
  instant: boolean;
  /** The visitor's own choice: the play/pause button shows this. */
  paused: boolean;
  /** The clock is moving right now (every pause rule allows it). */
  running: boolean;
  /** Reduced motion: the still after frame until the visitor presses Play. */
  still: boolean;
  /** The visitor took over the paste box: the scene rests on its first frame until a replay. */
  visitor: boolean;
  timeline: Timeline<HeroSceneState>;
  toggle: () => void;
  /** Jump to a scene time and play from there (also ends a take-over). */
  seekAndPlay: (t: number) => void;
  /** Stop the scene and rest on the first frame, for the visitor. Returns false if already taken over. */
  takeOver: () => boolean;
}

/** The share of the frame that must be on screen for the scene to play. */
const VISIBLE_RATIO = 0.2;

/**
 * The hero's timeline, driven by requestAnimationFrame while `autoplay` is
 * on. Server and first client render are the resting frame; nothing moves
 * until after hydration. The clock runs only while every rule allows it:
 * the visitor has not paused it, at least 20% of the frame is on screen,
 * the tab is visible, and the visitor is not using the paste box
 * (`engaged`). Under reduced motion it shows the after frame, still, and
 * plays only once the visitor presses Play.
 *
 * A take-over (the visitor reaches for the paste box) stops the scene on
 * its first frame until `seekAndPlay` hands it back.
 *
 * Outside production, `?scene=after` shows the still after frame and
 * `?scene=<ms>` shows the frame at that time, paused, for screenshots.
 */
export function useHeroScene({ autoplay, frameRef, engaged }: { autoplay: boolean; frameRef: RefObject<HTMLElement | null>; engaged: boolean }): HeroScene {
  const timelineRef = useRef<Timeline<HeroSceneState> | null>(null);
  if (!timelineRef.current) timelineRef.current = createHeroTimeline();
  const timeline = timelineRef.current;
  const [snapshot, setSnapshot] = useState<SceneSnapshot<HeroSceneState>>(() => timeline.snapshot());
  const [still, setStill] = useState<HeroSceneState | null>(null);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [visitor, setVisitor] = useState(false);
  const visitorRef = useRef(false);
  // A take-over lands on the first frame without motion, then gives transitions back to the paste flow.
  const [landing, setLanding] = useState(false);
  useEffect(() => {
    if (!landing) return;
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setLanding(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [landing]);

  useEffect(() => timeline.subscribe(setSnapshot), [timeline]);

  // Reduced motion and the dev frames decide the first state after hydration.
  useEffect(() => {
    if (!autoplay) return;
    const devFrame = process.env.NODE_ENV === 'production' ? null : new URLSearchParams(window.location.search).get('scene');
    if (devFrame) {
      setPaused(true);
      if (devFrame === 'after') setStill(afterFrame());
      else timeline.seek(Math.max(0, Math.min(Number(devFrame) || 0, T.END - 1)));
      return;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (!media.matches) return;
      setStill(afterFrame());
      setPaused(true);
      timeline.seek(0);
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [autoplay, timeline]);

  // At least 20% of the frame on screen, and the tab visible.
  useEffect(() => {
    if (!autoplay) return;
    const el = frameRef.current;
    let observer: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => setOnScreen(entry.intersectionRatio >= VISIBLE_RATIO), { threshold: [0, VISIBLE_RATIO, 0.5, 1] });
      observer.observe(el);
    }
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoplay, frameRef]);

  const running = autoplay && !visitor && !paused && !still && onScreen && tabVisible && !engaged;

  // The clock: one requestAnimationFrame loop, only while running.
  useEffect(() => {
    if (!running) return;
    timeline.play();
    let last: number | null = null;
    let raf = requestAnimationFrame(function frame(now) {
      timeline.tick(last === null ? 0 : now - last);
      last = now;
      raf = requestAnimationFrame(frame);
    });
    return () => {
      cancelAnimationFrame(raf);
      timeline.pause();
    };
  }, [running, timeline]);

  const seekAndPlay = useCallback(
    (t: number) => {
      visitorRef.current = false;
      setVisitor(false);
      setStill(null);
      setPaused(false);
      timeline.seek(t);
    },
    [timeline],
  );

  const takeOver = useCallback(() => {
    if (visitorRef.current) return false;
    visitorRef.current = true;
    setVisitor(true);
    setLanding(true);
    setStill(null);
    timeline.pause();
    timeline.seek(0);
    return true;
  }, [timeline]);

  const toggle = useCallback(() => {
    // From the still, Play starts the scene from its beginning.
    if (still) return seekAndPlay(0);
    setPaused((p) => !p);
  }, [still, seekAndPlay]);

  return {
    state: still ?? snapshot.state,
    clock: snapshot.clock,
    run: snapshot.run,
    instant: still !== null || (visitor ? landing : snapshot.instant),
    paused: paused || still !== null,
    running,
    still: still !== null,
    visitor,
    timeline,
    toggle,
    seekAndPlay,
    takeOver,
  };
}
