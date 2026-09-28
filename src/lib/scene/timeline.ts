/**
 * A scripted scene as a timeline: a clock in milliseconds of scene time and
 * a sorted list of events, each a pure step from one scene state to the
 * next. Nothing here touches the DOM or starts a timer, so a view renders
 * whatever state it is handed and a test can drive the clock by hand.
 *
 * - The clock only advances while playing, at most `MAX_STEP_MS` a tick, so
 *   a tab that was in the background does not jump ahead.
 * - `seek(t)` rebuilds the state from the resting frame, applying every
 *   event before `t` with `instant = true`; the view turns transitions off
 *   for that frame.
 * - At `end` the scene resets and plays again from 0.
 * - Every reset or seek starts a new run (`run` goes up by one), so anything
 *   the view scheduled for an older run can check and drop it.
 */

export interface SceneEvent<S> {
  /** Scene time in ms. The event fires once the clock reaches it. */
  t: number;
  /** The next state. `instant` is true while seeking: skip anything that only makes sense as motion. */
  apply: (state: S, instant: boolean) => S;
}

export interface SceneSnapshot<S> {
  clock: number;
  state: S;
  playing: boolean;
  /** Increments on every reset, seek and loop. */
  run: number;
  /** True for the snapshot a seek produced: render it without transitions. */
  instant: boolean;
}

export interface Timeline<S> {
  snapshot: () => SceneSnapshot<S>;
  /** Advance by a frame's elapsed time (capped). Returns the new snapshot. */
  tick: (elapsedMs: number) => SceneSnapshot<S>;
  play: () => SceneSnapshot<S>;
  pause: () => SceneSnapshot<S>;
  seek: (t: number) => SceneSnapshot<S>;
  /** The state at `t`, from a fresh resting frame, without moving the clock. */
  stateAt: (t: number) => S;
  subscribe: (listener: (snapshot: SceneSnapshot<S>) => void) => () => void;
}

export const MAX_STEP_MS = 100;

export function createTimeline<S>({ initial, events, end }: { initial: S; events: SceneEvent<S>[]; end: number }): Timeline<S> {
  const sorted = [...events].sort((a, b) => a.t - b.t);
  const listeners = new Set<(snapshot: SceneSnapshot<S>) => void>();

  let clock = 0;
  let state = initial;
  let next = 0; // index of the first event not yet applied
  let playing = false;
  let run = 0;
  let instant = false;

  const snapshot = (): SceneSnapshot<S> => ({ clock, state, playing, run, instant });
  const emit = () => {
    const snap = snapshot();
    listeners.forEach((l) => l(snap));
    return snap;
  };

  /** Apply every event with t < until (or <= until when `inclusive`), in order. */
  const applyUpTo = (until: number, asInstant: boolean, inclusive: boolean) => {
    while (next < sorted.length && (inclusive ? sorted[next].t <= until : sorted[next].t < until)) {
      state = sorted[next].apply(state, asInstant);
      next++;
    }
  };

  const reset = () => {
    clock = 0;
    state = initial;
    next = 0;
    run++;
  };

  const stateAt = (t: number) => {
    let s = initial;
    for (const e of sorted) {
      if (e.t >= t) break;
      s = e.apply(s, true);
    }
    return s;
  };

  return {
    snapshot,
    stateAt,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    play: () => {
      playing = true;
      instant = false;
      return emit();
    },
    pause: () => {
      playing = false;
      instant = false;
      return emit();
    },
    seek: (t) => {
      reset();
      const target = Math.max(0, Math.min(t, end));
      applyUpTo(target, true, false);
      clock = target;
      instant = true;
      return emit();
    },
    tick: (elapsedMs) => {
      if (!playing) return snapshot();
      const step = Math.max(0, Math.min(elapsedMs, MAX_STEP_MS));
      const wasInstant = instant;
      instant = false;
      if (step === 0) return wasInstant ? emit() : snapshot();
      clock += step;
      if (clock >= end) {
        reset();
        return emit();
      }
      const before = next;
      applyUpTo(clock, false, true);
      return next !== before || wasInstant ? emit() : { clock, state, playing, run, instant };
    },
  };
}
