/**
 * The homepage hero's scene: every timing constant and every beat, as pure
 * steps on `HeroSceneState` (see src/lib/scene/timeline.ts). The view in
 * LedgerHero renders whatever state it is handed; nothing here knows about
 * the DOM. Brief: docs/hero-loop-prompt.md section 4.2.
 */

import { createTimeline, type SceneEvent } from '../../lib/scene/timeline';
import { HERO_ASK, HERO_NOTE } from '../../content/demo/heroScene';

// ── Timing (ms of scene time) ───────────────────────────────────────────────

export const T = {
  FOCUS: 500,
  TYPE_START: 700,
  /** Per character of the note. 34 in the brief ends at 5154 for this note, past the keypress; 31 ends at 4761. */
  TYPE_CHAR: 31,
  KEYS_HIT: 4950,
  KEYS_HIT_FOR: 300,
  DISSOLVE: 5300,
  ENTRIES: 5800,
  SECOND_ROW: 6050,
  BARS: 6550,
  ONE_ON_ONE: 7400,
  COUNT_FLASH_FOR: 1400,
  STRIPS: [7550, 7750],
  STRIP_BRIGHT_FOR: 500,
  RING: 8300,
  CURSOR_IN: 8450,
  CURSOR_TO_PREP: 8500,
  CURSOR_TO_PREP_MS: 800,
  CLICK_PREP: 9350,
  PRESS_FOR: 180,
  PREP: 9600,
  CURSOR_TO_ASK: 10150,
  CURSOR_TO_ASK_MS: 600,
  CLICK_ASK: 10750,
  ASK_START: 10850,
  /** Per character of the ask. 26 in the brief ends at 13164 for this ask, past the cursor's move; 24 ends at 12986. */
  ASK_CHAR: 24,
  CURSOR_TO_COPY: 13100,
  CURSOR_TO_COPY_MS: 600,
  CLICK_COPY: 13700,
  COPIED: 13800,
  SHEET_CLOSE: 15100,
  FOLD: 15700,
  END: 16500,
  /** The still frame for reduced motion: both entries in, the card counted, before the cursor. */
  AFTER: 8300,
} as const;

/** Motion durations the view uses (CSS), kept with the beats they belong to. */
export const MOTION = {
  KEY_HINTS_MS: 300,
  DISSOLVE_MS: 400,
  ROW_OPEN_MS: 550,
  BAR_DRAW_MS: 500,
  COUNT_COLOR_MS: 600,
  STRIP_DROP_MS: 550,
  CLICK_PRESS_MS: 120,
  STRIP_SETTLE_MS: 1200,
  SHEET_MS: 500,
  CURSOR_FADE_MS: 300,
} as const;

export type ChapterKey = 'paste' | 'entries' | 'one_on_one' | 'prep';

export const CHAPTERS: Array<{ key: ChapterKey; label: string; start: number; end: number }> = [
  { key: 'paste', label: 'Paste', start: 0, end: T.ENTRIES },
  { key: 'entries', label: 'Entries', start: T.ENTRIES, end: T.ONE_ON_ONE },
  { key: 'one_on_one', label: 'Your 1:1', start: T.ONE_ON_ONE, end: T.PREP },
  { key: 'prep', label: 'Prep', start: T.PREP, end: T.END },
];

export const chapterAt = (clock: number) => CHAPTERS.find((c) => clock >= c.start && clock < c.end) ?? CHAPTERS[0];
export const chapterKeyAt = (clock: number) => chapterAt(clock).key;

// ── State ───────────────────────────────────────────────────────────────────

/** A strip the scene drops onto the Now stack: off, just landed (bright), in its own tone, or lifting away. */
export type StripPhase = 'off' | 'bright' | 'settled' | 'lifted';
export type CursorTarget = 'home' | 'prep' | 'ask' | 'copy';

export interface HeroSceneState {
  lineFocus: boolean;
  typedChars: number;
  keysHit: boolean;
  dissolving: boolean;
  /** The new rows are in the DOM (from the Entries beat until the loop resets). */
  rowsMounted: boolean;
  /** How many of the new rows are open. */
  rowsOpen: 0 | 1 | 2;
  barsDrawn: boolean;
  counted: boolean;
  countFlash: boolean;
  strips: [StripPhase, StripPhase];
  ring: boolean;
  prepPressed: boolean;
  cursor: { shown: boolean; target: CursorTarget; moveMs: number; clicks: number; pressed: boolean };
  sheetOpen: boolean;
  /** The ask box has focus (from the cursor's click until it moves on to Copy). */
  askFocus: boolean;
  askChars: number;
  copyPressed: boolean;
  copied: boolean;
}

export const RESTING: HeroSceneState = {
  lineFocus: false,
  typedChars: 0,
  keysHit: false,
  dissolving: false,
  rowsMounted: false,
  rowsOpen: 0,
  barsDrawn: false,
  counted: false,
  countFlash: false,
  strips: ['off', 'off'],
  ring: false,
  prepPressed: false,
  cursor: { shown: false, target: 'home', moveMs: 0, clicks: 0, pressed: false },
  sheetOpen: false,
  askFocus: false,
  askChars: 0,
  copyPressed: false,
  copied: false,
};

// ── Beats ───────────────────────────────────────────────────────────────────

type Event = SceneEvent<HeroSceneState>;
const at = (t: number, patch: (s: HeroSceneState, instant: boolean) => Partial<HeroSceneState>): Event => ({
  t,
  apply: (s, instant) => ({ ...s, ...patch(s, instant) }),
});
const strip = (s: HeroSceneState, i: 0 | 1, phase: StripPhase): Partial<HeroSceneState> => {
  const strips: [StripPhase, StripPhase] = [...s.strips];
  strips[i] = phase;
  return { strips };
};
const moveCursor = (s: HeroSceneState, target: CursorTarget, moveMs: number): Partial<HeroSceneState> => ({ cursor: { ...s.cursor, target, moveMs } });
const click = (s: HeroSceneState): Partial<HeroSceneState> => ({ cursor: { ...s.cursor, clicks: s.cursor.clicks + 1, pressed: true } });
const release = (s: HeroSceneState): Partial<HeroSceneState> => ({ cursor: { ...s.cursor, pressed: false } });

/** When the last character of a typed string lands. */
export const typedEnd = (start: number, perChar: number, text: string) => start + text.length * perChar;

export const EVENTS: Event[] = [
  // Paste
  at(T.FOCUS, () => ({ lineFocus: true })),
  ...Array.from({ length: HERO_NOTE.length }, (_, i) => at(T.TYPE_START + (i + 1) * T.TYPE_CHAR, () => ({ typedChars: i + 1 }))),
  at(T.KEYS_HIT, () => ({ keysHit: true })),
  at(T.KEYS_HIT + T.KEYS_HIT_FOR, () => ({ keysHit: false })),
  at(T.DISSOLVE, () => ({ dissolving: true })),
  // Entries
  at(T.ENTRIES, () => ({ typedChars: 0, dissolving: false, lineFocus: false, rowsMounted: true, rowsOpen: 1 })),
  at(T.SECOND_ROW, () => ({ rowsOpen: 2 })),
  at(T.BARS, () => ({ barsDrawn: true })),
  // Your 1:1
  at(T.ONE_ON_ONE, () => ({ counted: true, countFlash: true })),
  at(T.ONE_ON_ONE + T.COUNT_FLASH_FOR, () => ({ countFlash: false })),
  at(T.STRIPS[0], (s) => strip(s, 0, 'bright')),
  at(T.STRIPS[0] + T.STRIP_BRIGHT_FOR, (s) => strip(s, 0, 'settled')),
  at(T.STRIPS[1], (s) => strip(s, 1, 'bright')),
  at(T.STRIPS[1] + T.STRIP_BRIGHT_FOR, (s) => strip(s, 1, 'settled')),
  at(T.RING, () => ({ ring: true })),
  at(T.CURSOR_IN, (s) => ({ cursor: { ...s.cursor, shown: true, target: 'home', moveMs: 0 } })),
  at(T.CURSOR_TO_PREP, (s) => moveCursor(s, 'prep', T.CURSOR_TO_PREP_MS)),
  at(T.CLICK_PREP, (s) => ({ ...click(s), prepPressed: true, ring: false })),
  at(T.CLICK_PREP + T.PRESS_FOR, (s) => ({ ...release(s), prepPressed: false })),
  // Prep
  at(T.PREP, () => ({ sheetOpen: true })),
  at(T.CURSOR_TO_ASK, (s) => moveCursor(s, 'ask', T.CURSOR_TO_ASK_MS)),
  at(T.CLICK_ASK, (s) => ({ ...click(s), askFocus: true })),
  at(T.CLICK_ASK + T.PRESS_FOR, (s) => release(s)),
  ...Array.from({ length: HERO_ASK.length }, (_, i) => at(T.ASK_START + (i + 1) * T.ASK_CHAR, () => ({ askChars: i + 1 }))),
  at(T.CURSOR_TO_COPY, (s) => ({ ...moveCursor(s, 'copy', T.CURSOR_TO_COPY_MS), askFocus: false })),
  at(T.CLICK_COPY, (s) => ({ ...click(s), copyPressed: true })),
  at(T.CLICK_COPY + T.PRESS_FOR, (s) => ({ ...release(s), copyPressed: false })),
  at(T.COPIED, () => ({ copied: true })),
  at(T.SHEET_CLOSE, (s) => ({ sheetOpen: false, cursor: { ...s.cursor, shown: false } })),
  at(T.FOLD, () => ({ rowsOpen: 0, strips: ['lifted', 'lifted'], counted: false })),
];

export const createHeroTimeline = () => createTimeline({ initial: RESTING, events: EVENTS, end: T.END });

/** The still for reduced motion: the state at AFTER, with nothing mid-flash. */
export const afterFrame = (): HeroSceneState => ({ ...createHeroTimeline().stateAt(T.AFTER), countFlash: false });
