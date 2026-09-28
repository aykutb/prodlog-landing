/**
 * The site's one demo protagonist: Priya Raghunathan, seeded in the product
 * as `priya_r` (prodlog-api scripts/fixtures/priya.ts, plus prodlog2
 * supabase/seeds/demo-log-first.sql for her rhythm and recent entries).
 * Every mock, example and screenshot slot on the site uses this module, so
 * the outputs visibly come from the same entries.
 *
 * Recent entries are placed relative to "today", the way the seed places
 * them; older entries keep their fixture dates. Pass `today` explicitly
 * (YYYY-MM-DD) wherever server and client must agree.
 */

export type EntrySource = 'web' | 'slack' | 'email' | 'ios';

export interface DemoEntry {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  /** The body's first paragraph, as the log row previews it. */
  preview: string;
  /** "What happened next", or null. */
  outcome: string | null;
  product: string;
  source: EntrySource;
  collaborators: string[];
  image?: { src: string; alt: string; more?: number };
}

export const PRIYA = {
  name: 'Priya Raghunathan',
  firstName: 'Priya',
  title: 'Associate Product Manager',
  handle: 'priya_r',
  portfolioUrl: 'https://prodlog.app/p/priya_r',
  portfolioPath: '/p/priya_r',
  product: 'Refunds & Disputes',
  company: 'a mid-size fintech in London',
  /** Her 1:1 is weekly, on Thursdays, with Elena. */
  oneOnOne: { weekday: 4, withName: 'Elena Vasquez', everyWeeks: 1 },
} as const;

export const COLLABORATORS = [
  { name: 'Elena Vasquez', role: 'Group Product Manager', note: 'her manager' },
  { name: 'Sam Okafor', role: 'Product Designer' },
  { name: 'Rob Hartley', role: 'Engineering Lead' },
  { name: 'Chi Nwosu', role: 'Data Analyst' },
] as const;

const PRODUCT = PRIYA.product;

/** Entries with fixed dates: her public log, verbatim from the fixture. Newest first. */
const DATED_ENTRIES: DemoEntry[] = [
  { id: 'promo-packet', date: '2026-07-19', title: 'Wrote the promo packet', preview: 'Wrote the promo packet. Used this log for it, which is the only reason it took two hours instead of a weekend.', outcome: null, product: PRODUCT, source: 'web', collaborators: [] },
  { id: 'payments-101', date: '2026-07-06', title: 'Ran payments 101 for the new grads', preview: 'Ran the payments 101 onboarding session for the two new grads. Elena asked me to own it this quarter. Used the chargeback edge cases doc from January as the backbone, it has aged well.', outcome: null, product: PRODUCT, source: 'web', collaborators: [] },
  { id: 'notification-timing-results', date: '2026-06-16', title: 'Dispute notification timing shipped, first numbers in', preview: 'The dispute notification timing change from the March interviews shipped mid-May. First full month of data: dispute-related merchant contacts down 18%. Chi checked the cut against seasonality and it holds.', outcome: 'Dispute-related merchant contacts down 18%', product: PRODUCT, source: 'web', collaborators: ['Chi Nwosu'] },
  { id: 'launch-comms', date: '2026-05-26', title: 'Rollout comms and support enablement for the API launch', preview: 'Wrote the merchant-facing changelog and the internal support macros for the refund API. Ran a 20 minute enablement session for the support team. Boring work that stops a launch from generating its own ticket queue.', outcome: null, product: PRODUCT, source: 'web', collaborators: [] },
  { id: 'refund-api-launch', date: '2026-05-19', title: 'Owned the refund status API launch end to end', preview: 'Owned the refund status API launch end to end. Scope, rollout, merchant comms, support macros. We shipped to all merchants on the 19th with zero rollbacks.', outcome: 'Support tickets about refund status down 34%', product: PRODUCT, source: 'web', collaborators: ['Rob Hartley', 'Elena Vasquez'] },
  { id: 'refund-api-scope', date: '2026-04-28', title: 'Scoped the refund status API, cut two endpoints to hold the date', preview: 'Scoped the refund status API for the May release. Original ask was five endpoints. Cut the two reconciliation ones after checking with the three design partners, none of them would use those before Q4. Holding the date matters more than the full surface.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Rob Hartley'] },
  { id: 'q1-retro', date: '2026-04-14', title: 'Wrote the Q1 workstream retro', preview: 'Wrote the Q1 retro for the disputes workstream. Honest version: we spent six weeks on a redesign direction the interviews then killed. The retro argues we should have done the interviews first, and proposes discovery-before-design as the default for this team.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Elena Vasquez'] },
  { id: 'notification-timing-spec', date: '2026-04-02', title: 'Owned the dispute notification timing spec', preview: 'Wrote the spec for the dispute notification timing change and ran the estimation session with Rob’s team myself. Cut the real-time webhook option after Rob walked me through the retry infrastructure cost, going with a 15 minute batch instead.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Rob Hartley'] },
  { id: 'dispute-interviews', date: '2026-03-17', title: 'Ran 9 merchant interviews on dispute handling', preview: 'Ran the customer interviews for dispute handling myself this time. 9 merchants. Found that the thing everyone assumed was a UI problem is actually a notification timing problem. Merchants were not confused by the dispute screen, they just found out about disputes too late to respond well.', outcome: 'Merchant interviews completed: 9', product: PRODUCT, source: 'web', collaborators: ['Sam Okafor', 'Elena Vasquez'] },
  { id: 'first-solo-merchant-call', date: '2026-02-24', title: 'Led a merchant call solo for the first time', preview: 'Sat in on four merchant calls this sprint and led the last one myself. Ran the agenda, kept it to 30 minutes, got the follow-ups written up same day. Small thing but it did not need Elena in the room.', outcome: null, product: PRODUCT, source: 'web', collaborators: [] },
  { id: 'refund-status-copy', date: '2026-02-10', title: 'Refund status page copy test with Sam', preview: 'Worked with Sam on clearer refund status copy. The old states were internal jargon (“settlement pending” meant nothing to merchants). New copy explains what happens next and when.', outcome: 'Contacts about refund status wording down 12%', product: PRODUCT, source: 'web', collaborators: ['Sam Okafor', 'Chi Nwosu'] },
  { id: 'dispute-ticket-triage', date: '2026-01-21', title: 'Tagged 200 dispute support tickets with Chi', preview: 'Went through 200 support tickets about disputes with Chi and tagged them by root cause. First pass at understanding why merchants actually contact us.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Chi Nwosu'] },
  { id: 'chargeback-edge-cases', date: '2026-01-06', title: 'Chargeback edge cases doc for legal review', preview: 'Wrote up the chargeback edge cases for the legal review. 14 scenarios, 5 of them nobody had documented anywhere. Elena presented it but the doc was mostly mine.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Elena Vasquez'] },
  { id: 'refund-flow-spec', date: '2025-12-09', title: 'Helped with the merchant refund flow spec', preview: 'Helped with the merchant refund flow spec. Mostly took notes in the sessions with Rob’s team and wrote up the edge cases doc afterwards. Elena said the edge case list saved a round of back and forth with legal.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Rob Hartley', 'Elena Vasquez'] },
];

/**
 * Her recent entries, placed like the seed places them: `offset` is days
 * from the last 1:1 (`fromLast`) or from today.
 */
const RECENT: Array<Omit<DemoEntry, 'date'> & { from: 'today' | 'last'; offset: number }> = [
  { id: 'cut-manual-review', from: 'today', offset: 0, title: 'Cut the manual refund review step', preview: 'Decided, after the usage data review.', outcome: 'Freed 3 eng-weeks', product: PRODUCT, source: 'web', collaborators: ['Rob Hartley'] },
  { id: 'evidence-checklist', from: 'today', offset: 0, title: 'Dispute evidence checklist', preview: 'Led; owned scope and rollout.', outcome: null, product: PRODUCT, source: 'slack', collaborators: [] },
  { id: 'chargeback-dashboard', from: 'last', offset: 1, title: 'Chargeback dashboard v2', preview: 'Drove it with design.', outcome: 'Fewer escalations to finance', product: PRODUCT, source: 'web', collaborators: ['Sam Okafor'], image: { src: '/demo/chargeback-dashboard.svg', alt: 'The chargeback dashboard v2: disputes by stage for the last eight weeks' } },
  { id: 'refund-sla', from: 'last', offset: -2, title: 'Refund SLA agreed with support', preview: 'Negotiated the target with the support lead.', outcome: 'Refunds settle within 2 days', product: PRODUCT, source: 'web', collaborators: [] },
  { id: 'partial-refund-experiment', from: 'last', offset: -9, title: 'Dropped the partial-refund experiment', preview: 'Decided, after two weeks of flat conversion.', outcome: null, product: PRODUCT, source: 'web', collaborators: ['Chi Nwosu'] },
  { id: 'dispute-analyst', from: 'last', offset: -16, title: 'Onboarded the new dispute analyst', preview: 'Owned the first-week plan.', outcome: 'Handling cases solo by day 5', product: PRODUCT, source: 'web', collaborators: [] },
];

// ── Dates (date-only strings, UTC arithmetic, no time zones) ────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toDate = (d: string) => new Date(`${d}T00:00:00Z`);
const toIso = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (d: string, n: number) => {
  const date = toDate(d);
  date.setUTCDate(date.getUTCDate() + n);
  return toIso(date);
};
export const todayIso = (now: Date = new Date()) => toIso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));

/** "Sep 18", or "Sep 18, 2025" when the year differs from today's (prodlog2 formatShort). */
export const formatShort = (d: string, today: string) => {
  const date = toDate(d);
  const base = `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
  return d.slice(0, 4) === today.slice(0, 4) ? base : `${base}, ${date.getUTCFullYear()}`;
};
/** "Thu, Oct 1" (prodlog2 formatWithWeekday). */
export const formatWithWeekday = (d: string, today: string) => `${WEEKDAYS[toDate(d).getUTCDay()]}, ${formatShort(d, today)}`;
export const weekdayShort = (d: string) => WEEKDAYS[toDate(d).getUTCDay()];

/** The next occurrence of an ISO weekday (1 Mon .. 7 Sun) on or after `from`. */
const nextWeekday = (from: string, isoWeekday: number) => {
  const js = isoWeekday % 7;
  const diff = (js - toDate(from).getUTCDay() + 7) % 7;
  return addDays(from, diff);
};

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// ── The log, as of a day ────────────────────────────────────────────────────

export type LedgerItem =
  | { type: 'entry'; entry: DemoEntry }
  | { type: 'divider'; date: string; label: string }
  | { type: 'year'; year: string };

export interface PriyaLog {
  today: string;
  /** Her next 1:1 (a Thursday; today when today is Thursday). */
  nextOneOnOne: string;
  lastOneOnOne: string;
  /** Every entry, newest first. */
  entries: DemoEntry[];
  /** Entries in the current 1:1 window (after the last 1:1, up to today). */
  sinceLast: DemoEntry[];
  /** The last `windowCount` 1:1 windows for the strip chart, oldest first. */
  windows: Array<{ key: string; strips: boolean[]; axisLabel?: string; current?: boolean }>;
  /** The strip chart's caption, as the dashboard words it. */
  caption: string | null;
  /** The ledger: entries newest first, a divider at each past 1:1, a rule where the year changes. */
  ledger: LedgerItem[];
}

export function priyaLog(today: string = todayIso(), windowCount = 8): PriyaLog {
  const nextOneOnOne = nextWeekday(today, PRIYA.oneOnOne.weekday);
  const lastOneOnOne = addDays(nextOneOnOne, -7);

  const recent: DemoEntry[] = RECENT.map(({ from, offset, ...entry }) => ({
    ...entry,
    date: addDays(from === 'today' ? today : lastOneOnOne, offset),
  }));
  const entries = [...recent, ...DATED_ENTRIES.filter((e) => e.date < addDays(lastOneOnOne, -16))].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const sinceLast = entries.filter((e) => e.date > lastOneOnOne && e.date <= today);

  // Windows run from the day after one 1:1 through the next.
  const windows: PriyaLog['windows'] = [];
  for (let i = windowCount - 1; i >= 0; i--) {
    const end = addDays(nextOneOnOne, -7 * i);
    const start = addDays(end, -6);
    const inWindow = entries.filter((e) => e.date >= start && e.date <= end).sort((a, b) => (a.date < b.date ? -1 : 1));
    const monthStarts = [...Array(7)].map((_, d) => addDays(start, d)).find((d) => d.endsWith('-01'));
    windows.push({
      key: start,
      strips: inWindow.map((e) => Boolean(e.outcome)),
      axisLabel: i === 0 ? 'Now' : monthStarts ? MONTHS[toDate(monthStarts).getUTCMonth()] : undefined,
      current: i === 0,
    });
  }
  const total = windows.reduce((sum, w) => sum + w.strips.length, 0);
  const caption = total ? `${plural(total, 'entry', 'entries')} in your last ${windowCount === 8 ? 'eight' : windowCount} 1:1s.` : null;

  // Dividers only for 1:1s that fall between two of her entries, as the log shows them.
  const ledger: LedgerItem[] = [];
  const oldestRecent = recent.reduce((min, e) => (e.date < min ? e.date : min), today);
  const pastOneOnOnes: string[] = [];
  for (let d = lastOneOnOne; d > addDays(oldestRecent, -7); d = addDays(d, -7)) pastOneOnOnes.push(d);
  let year = today.slice(0, 4);
  let next = 0;
  for (const entry of entries) {
    // A 1:1's window includes its own day, so its divider sits above entries on or before it.
    while (next < pastOneOnOnes.length && pastOneOnOnes[next] >= entry.date) {
      const d = pastOneOnOnes[next++];
      ledger.push({ type: 'divider', date: d, label: `Your 1:1, ${formatShort(d, today)}` });
    }
    if (entry.date.slice(0, 4) !== year) {
      year = entry.date.slice(0, 4);
      ledger.push({ type: 'year', year });
    }
    ledger.push({ type: 'entry', entry });
  }

  return { today, nextOneOnOne, lastOneOnOne, entries, sinceLast, windows, caption, ledger };
}

// ── What the log gives back ─────────────────────────────────────────────────

/** "What do you need from your manager?", answered on her 1:1 prep screen. */
export const ONE_ON_ONE_ASK = 'Sign-off to retire the manual refund review for every merchant, not just the pilot group.';

/** Her company's review questions (the same four the demo review persona uses), with a draft for each. */
export const REVIEW = {
  title: 'Mid-year review',
  period: 'January to June 2026',
  questions: [
    'What did you deliver this cycle, and what was the outcome?',
    'Where did you show judgment under uncertainty?',
    'What would you do differently?',
    'What do you need to grow next cycle?',
  ],
  drafts: [
    {
      question: 'What did you deliver this cycle, and what was the outcome?',
      answer:
        'I scoped and launched the refund status API end to end in May, including the call to cut two endpoints to hold the date. Support tickets about refund status fell 34% in the first month. Before that, nine merchant interviews I ran in March moved the disputes work from a redesign to notification timing, and dispute-related merchant contacts fell 18% once it shipped.',
      drewOn: ['refund-api-launch', 'refund-api-scope', 'dispute-interviews', 'notification-timing-results'],
    },
    {
      question: 'Where did you show judgment under uncertainty?',
      answer:
        'I cut the two reconciliation endpoints after none of our three design partners needed them before Q4, and chose a 15 minute batch over real-time webhooks once Rob walked me through the retry cost.',
      drewOn: ['refund-api-scope', 'notification-timing-spec'],
    },
  ],
} as const;

/** Resume bullets generated from her entries. */
export const RESUME_BULLETS = [
  'Launched the refund status API end to end for every merchant with zero rollbacks; refund status support tickets fell 34% in the first month.',
  'Ran 9 merchant interviews that moved the disputes roadmap from a redesign to notification timing, cutting dispute-related contacts 18%.',
  'Cut two of five planned endpoints after checking with three design partners, holding the May launch date.',
] as const;

/** One STAR story from the same entries. */
export const STAR_STORY = {
  title: 'Finding the real dispute problem',
  situation: 'Merchants kept contacting us about disputes, and the team had spent six weeks on a redesign of the dispute screen.',
  task: 'Find out why merchants struggled before we built more.',
  action: 'I ran 9 merchant interviews myself, found they heard about disputes too late to respond, and wrote the notification timing spec.',
  result: 'Dispute-related merchant contacts fell 18% in the first month, and discovery before design became the team default.',
} as const;

export const entryById = (id: string, log: PriyaLog) => log.entries.find((e) => e.id === id) ?? DATED_ENTRIES.find((e) => e.id === id);
