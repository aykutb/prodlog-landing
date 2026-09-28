/**
 * What the homepage hero's scene shows: Priya's Log on a Monday, the note
 * she types, the two entries it becomes, her 1:1 card and her 1:1 prep.
 *
 * The resting rows are her seed rows (prodlog2 supabase/seeds/
 * demo-log-first.sql), without the two the seed dates "today": those are
 * what the scene adds, worded as the typed note says them. Dividers follow
 * the dashboard (LogFeed.tsx): "1:1 with <name>, <date>", none for the 1:1
 * the seed marks skipped (three weeks back). The week stack's older windows
 * are a demo rhythm; the seed has no history there.
 *
 * The scene is anchored on the most recent Monday on or before today, so
 * "fri" is always three days back and the Thursday 1:1 three days ahead.
 */

import { COLLABORATORS, ONE_ON_ONE_ASK, PRIYA, addDays, formatShort, formatWithWeekday, plural, priyaLog, type DemoEntry } from './priya';
import type { StackWindow } from '../../components/kit/WeekStack';

/** The note typed into the first line: lowercase and messy on purpose. */
export const HERO_NOTE = 'cut the manual refund review today, rob agreed. frees ~3 eng wks\ndispute evidence checklist went live fri, support already using it';

/** Typed into the prep sheet's "What do you need from …?" */
export const HERO_ASK = ONE_ON_ONE_ASK;

/** The gutter's label: the product, short enough not to truncate in the 88px gutter. */
export const HERO_LABEL = 'Refunds';

const MANAGER = COLLABORATORS[0].name; // Elena Vasquez
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekday = (d: string) => new Date(`${d}T00:00:00Z`).getUTCDay();

/** The most recent Monday on or before `today` (YYYY-MM-DD). */
export const sceneDay = (today: string) => addDays(today, -((weekday(today) + 6) % 7));

/** Entries per past 1:1 window, oldest first, and which of them have an outcome. */
const PAST_RHYTHM: boolean[][] = [[true], [false, true, false], [true, false], [false], [false, true], [false, true], [true]];

export interface HeroRow {
  id: string;
  date: string;
  title: string;
  preview: string;
  outcome: string | null;
}

export type HeroLedgerItem = { type: 'entry'; entry: HeroRow } | { type: 'divider'; date: string; label: string };

export interface HeroSceneData {
  /** The scene's today: a Monday. */
  day: string;
  nextOneOnOne: string;
  lastOneOnOne: string;
  manager: string;
  /** "1:1 with Elena Vasquez" */
  cardTitle: string;
  /** "Thu, Oct 1" */
  cardAside: string;
  /** The card's line before and after the scene adds its two entries. */
  context: { before: string; after: string };
  /** The week stack at rest; the scene adds its strips to the last (current) window. */
  windows: StackWindow[];
  caption: { before: string; after: string };
  /** The two entries the note becomes, newest first, and whether each has an outcome (for the strips). */
  newRows: HeroRow[];
  /** Her log under the first line at rest. */
  ledger: HeroLedgerItem[];
  prep: {
    title: string;
    since: string;
    rows: HeroRow[];
    gaps: string;
    askLabel: string;
  };
}

const toRow = (e: DemoEntry): HeroRow => ({ id: e.id, date: e.date, title: e.title, preview: e.preview, outcome: e.outcome });

export function heroScene(today: string): HeroSceneData {
  const day = sceneDay(today);
  const log = priyaLog(day);
  const last = log.lastOneOnOne;
  const skipped = addDays(last, -14);

  // The seed's rows placed from the last 1:1; the two it dates "today" are the scene's.
  const seedToday = new Set(['cut-manual-review', 'evidence-checklist']);
  const resting = log.entries.filter((e) => !seedToday.has(e.id) && e.date > addDays(last, -21)).map(toRow);

  const newRows: HeroRow[] = [
    { id: 'scene-cut-review', date: day, title: 'Cut the manual refund review step', preview: 'Rob agreed.', outcome: 'Freed 3 eng-weeks' },
    { id: 'scene-evidence-checklist', date: addDays(day, -3), title: 'Dispute evidence checklist went live', preview: 'Support is already using it.', outcome: null },
  ];

  const ledger: HeroLedgerItem[] = [];
  const oneOnOnes = [0, 1, 2, 3].map((w) => addDays(last, -7 * w)).filter((d) => d !== skipped);
  let next = 0;
  for (const entry of resting) {
    while (next < oneOnOnes.length && oneOnOnes[next] >= entry.date) {
      const d = oneOnOnes[next++];
      ledger.push({ type: 'divider', date: d, label: `1:1 with ${MANAGER}, ${formatShort(d, day)}` });
    }
    ledger.push({ type: 'entry', entry });
  }

  // Eight windows including Now, each from the day after one 1:1 through the next.
  const sinceLast = resting.filter((e) => e.date > last);
  const windows: StackWindow[] = [...PAST_RHYTHM, sinceLast.map((e) => Boolean(e.outcome))].map((strips, i, all) => {
    const end = addDays(log.nextOneOnOne, -7 * (all.length - 1 - i));
    const start = addDays(end, -6);
    const monthStart = [...Array(7)].map((_, d) => addDays(start, d)).find((d) => d.endsWith('-01'));
    const current = i === all.length - 1;
    return { key: start, strips, current, axisLabel: current ? 'Now' : monthStart ? MONTHS[Number(monthStart.slice(5, 7)) - 1] : undefined };
  });
  const total = windows.reduce((n, w) => n + w.strips.length, 0);
  const captionFor = (n: number) => `${plural(n, 'entry', 'entries')} in your last eight 1:1s.`;
  const contextFor = (n: number) => `${plural(n, 'entry', 'entries')} since your last 1:1 on ${formatShort(last, day)}.`;

  const prepRows = [...newRows, ...sinceLast];
  const missing = prepRows.filter((r) => !r.outcome).length;

  return {
    day,
    nextOneOnOne: log.nextOneOnOne,
    lastOneOnOne: last,
    manager: MANAGER,
    cardTitle: `1:1 with ${MANAGER}`,
    cardAside: formatWithWeekday(log.nextOneOnOne, day),
    context: { before: contextFor(sinceLast.length), after: contextFor(sinceLast.length + newRows.length) },
    windows,
    caption: { before: captionFor(total), after: captionFor(total + newRows.length) },
    newRows,
    ledger,
    prep: {
      title: `1:1 with ${MANAGER} on ${formatWithWeekday(log.nextOneOnOne, day)}`,
      since: `Since ${formatShort(last, day)}`,
      rows: prepRows,
      gaps: `${missing === 1 ? '1 entry has' : `${missing} entries have`} no outcome yet. Add one above with "Add an outcome".`,
      askLabel: `What do you need from ${MANAGER}?`,
    },
  };
}

/** The frame's one description for assistive tech. */
export const HERO_SCENE_LABEL = `A demo of ${PRIYA.firstName}'s log: a messy note becomes two entries, her 1:1 card counts them, and she preps her 1:1 with ${MANAGER.split(' ')[0]}.`;
