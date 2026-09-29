# Hero loop: tracker

The brief is `docs/hero-loop-prompt.md`. At the start of every session, read
that file, this one, `prodlog2/GLOSSARY.md` and `docs/landing-log-first.md`,
then continue from the first unchecked item.

Each phase ends with a report and a stop for approval.

## Phase 0: Inspect and report (read-only)

- [x] 0.0 Save the brief to `docs/hero-loop-prompt.md`; create this tracker
- [x] 0.1 Hero component, the pages that use it, props, state, paste API call
- [x] 0.2 Kit components and demo-data module; gaps against 4.1
- [x] 0.3 Priya's seed in `prodlog2` against 4.1
- [x] 0.4 Prep screen in `prodlog2` against the 4.2 prep sheet
- [x] 0.5 Animation dependencies; reveal and IntersectionObserver utilities
- [x] 0.6 Parser behavior in `prodlog-api` for the 4.1 note
- [x] 0.7 Analytics and event naming
- [x] Phase 0 report delivered
- [x] Approval and answers to the Phase 0 open decisions (owner, 2026-09-28: go with the recommendations)

## Phase 1: Engine and resting frame

- [x] 1.1 Scene engine with its unit test (0, 5800, 7400, 9600, 14000 ms, and after `seek`)
- [x] 1.2 Resting frame and after frame from Priya's data; server HTML equals the resting frame
- [x] 1.3 Placeholder and sample-note fixes
- [x] 1.4 `autoplay` prop (default false); before/after screenshots of /try, /1-1-prep, /self-review
- [x] Phase 1 report (resting and after frames at 1280px and 390px)
- [x] Approval to start Phase 2 (owner, 2026-09-28: go with the recommendations; remove the pricing line completely)

## Phase 2: The scene

- [x] 2.1 All beats, the prep sheet, the cursor, the controls
- [x] 2.2 Pause rules: visibility, tab hidden, take-over, reduced motion
- [x] 2.3 Prep sheet fits at 390px (hide sheet outcome labels and "Move to another day" below 480px if not)
- [x] 2.4 Recording or beat-by-beat screenshots at 1280px and 390px
- [x] Phase 2 report
- [x] Approval to start Phase 3 (owner, 2026-09-28: go with the recommendations)

## Phase 3: Take-over, analytics and verification

- [x] 3.1 Take-over (section 5), left-column CTA pair, replay confirm
- [x] 3.2 Analytics: hero_demo_chapter, hero_demo_pause, hero_takeover, hero_replay
- [x] 3.3a Lighthouse mobile on `/`, CLS 0 from the hero
- [x] 3.3b Paste flow end to end, with and without the loop having played
- [x] 3.3c Keyboard-only pass
- [x] 3.3d Reduced motion
- [x] 3.3e 60 s of looping: no accumulating DOM nodes, timers or heap
- [x] 3.4 Tracker updated; DECISIONS-style entry in `docs/landing-log-first.md`
- [x] Phase 3 report

## Phase 0 findings (2026-09-28)

- Hero: `src/components/ledger-hero/LedgerHero.tsx`, variants `home` (via
  `src/components/sections/HeroSection.tsx`, homepage only), `try`
  (`src/views/Try.tsx`) and `compact` (`CompactLedgerHero` in
  `src/components/demo/UseCase.tsx`, on /1-1-prep and /self-review).
- Paste API: `parseNotes` in `src/lib/preview.ts`, POST
  `api.prodlog.app/api/preview/parse` with `{ text }` only. 8,000 chars,
  5 an hour per IP, 12 entries back. No reference date is sent.
- Demo data: `src/content/demo/priya.ts` already mirrors the seed
  (`prodlog2/supabase/seeds/demo-log-first.sql` lines 127 to 132), placed
  relative to today. Elena Vasquez comes from `prodlog-api/scripts/fixtures/priya.ts`.
- Dashboard facts: card title `1:1 with ${with_name}`; divider
  `1:1 with ${with_name}, Sep 24`; skipped 1:1s get no divider (the seed
  skips Sep 10); the week stack shows 12 windows and its caption counts the
  current one; Gaps copy ends `Add one above with "Add an outcome".`
- No animation dependency. `HeroSection` carries `fade-in` (starts at
  opacity 0). `ScrollReveal` (how-it-works, Slack page) starts at opacity 0
  until JS runs.
- No dark theme on the landing site.
- Analytics: GA4 through `trackEvent` in `src/lib/analytics.ts`, consent
  gated, snake_case names with a `surface` param (`preview_pasted`,
  `preview_parsed`, `preview_signup_click`).

## Phase 1 notes (2026-09-28)

- Engine: `src/lib/scene/timeline.ts` (pure; events return the next state,
  no timers). Scene script and every timing constant:
  `src/components/ledger-hero/heroTimeline.ts`. Data:
  `src/content/demo/heroScene.ts`. Hook: `useHeroScene.ts`. Test:
  `tests/heroScene.test.ts` (13 tests).
- Dev only: `/?scene=after` shows the still after frame, `/?scene=<ms>`
  the frame at that time, paused.
- Frame: 900px from sm, 960px below. The real paste form puts the rows
  about 620px down; see the Phase 1 report on the fold.
- Typing speeds: 31 ms (note) and 24 ms (ask), approved.
- /try, /1-1-prep, /self-review: pixel diffs against HEAD show only the
  placeholder changed.

## Phase 2 notes (2026-09-28)

- Parts: `src/components/ledger-hero/SceneParts.tsx` (prep sheet, cursor,
  controls). Pause rules in `useHeroScene.ts`: the visitor's pause, under
  20% visible, tab hidden, paste box focused or filled, reduced motion (the
  still after frame until Play, which starts from 0).
- Frame: 850px from sm, 940px below. At 1280x800 the new rows land at
  about y=720, above the fold.
- Homepage form: the counter joins the one-line row once there is text
  (it is in the DOM for screen readers throughout).
- Motion is transitions and `@starting-style` only (plus the caret), so a
  seek never replays an entrance.
- Phones: no key hints (no ⌘ Enter on a phone); the send beat presses
  "See what comes out". The typing scrolls to its newest line.
- Prep sheet: everything fits from 390px; below 380px the outcome labels
  and "Move to another day" hide.
- Beat-by-beat screenshots: `?scene=<ms>` at 19 times, both widths.

## Phase 3 notes (2026-09-28)

- Take-over: a press on the paste box, typing or pasting in it, "Use a
  sample note", or "Paste your notes" (`src/components/sections/HeroCtas.tsx`,
  via the `prodlog:hero-takeover` window event in `heroTakeover.ts`).
  Keyboard focus on the box only pauses the scene, so Tab reaches the
  demo's controls; focus takes over only while the prep sheet covers the box.
- After a take-over: first frame, chapters at 40%, "Replay the demo", the
  first line dated today, the log scrolls inside the frame. Replay or a
  chapter asks first when there is a note or a result ("Keep my note" /
  "Replay"; Escape cancels and focus returns to the opener).
- Analytics (GA4 via `trackEvent`, consent gated): `hero_takeover`
  {trigger: box, sample, button}, `hero_demo_pause` {chapter},
  `hero_demo_chapter` {chapter} on a chapter click (not as the clock passes),
  `hero_replay` {chapter}. "Start free" beside it sends
  `preview_signup_click` {surface: home_cta}.
- Checks on a production build (`.next-check`, prod-check config):
  Lighthouse 12.8 mobile on `/`: 95 to 97, 100, 100, 100; CLS 0, no
  layout-shift entries. 66 s soak: DOM nodes 923 to 923, 0 live timers,
  heap 5.06 to 5.31 MB after GC; animation frames 0 a second while paused
  or offscreen. Keyboard, reduced motion and the paste flow (with and
  without the loop having played, `fetch` stubbed) all pass. /try,
  /1-1-prep and /self-review: only the placeholder differs from HEAD.

## Follow-up: fit the first screen (2026-09-29)

Owner: the whole animation must be visible at first glance on a MacBook.
It overflowed 150 to 320px at 1440x760 to 1280x700.

- From lg the frame is a scaled miniature (`.hero-frame` in
  `app/globals.css`): zoom 0.8, 0.9 from 900px tall, 0.7 below 736px.
  Design height 736px (so 589px on screen at 0.8). Frame and controls now
  end at y=727 of 760 (1440x760) and 654 of 700 (1280x700).
- Trimmed: hero top padding (lg:pt-24); "Prep my 1:1" beside the chart
  caption (`OccasionCard actionBesideCaption`); the in-frame "or Start
  free" shows only after a take-over (it carries the note to signup);
  the prep sheet uses the panel title, 20px gaps, tighter rows and a
  76px fixed ask box. Phones 860px, from sm 736px.
- Found and fixed: the scene itself caused layout shifts while playing
  (CLS 0.0104 a loop; the Phase 3 Lighthouse run only watched the load).
  Carets are the text's border, the new rows are a layer over the log
  with Priya's rows sliding by transform, the new strips are absolute
  with the dashed slot lifted by transform, and the Copy button keeps
  its longer label's width. A full live loop now records no layout shift
  at 1440x760 and 390x844. "Move to another day" hides below 480px
  (the brief's rule), since the Copy button no longer narrows.
- Lighthouse on a production build: mobile 95, 100, 100, 100; desktop
  100 across; CLS 0.

## Open decisions (Phase 0)

Answered 2026-09-28: go with the recommendations.

1. Resting rows follow the seed: Chargeback dashboard v2 (Sep 25),
   Refund SLA (Sep 22), Dropped the partial-refund experiment (Sep 15, flat
   conversion, no outcome), Onboarded the new dispute analyst (Sep 8).
2. Dividers as the dashboard draws them: "1:1 with Elena Vasquez, Sep 24"
   and Sep 17; none for the skipped Sep 10.
3. New rows follow the typed note: "Cut the manual refund review step",
   "Rob agreed.", "Freed 3 eng-weeks"; "Dispute evidence checklist went
   live", "Support is already using it.", no outcome.
4. Card title "1:1 with Elena Vasquez" in the homepage hero only.
5. No "Add an outcome" on log rows; the 6850 beat is dropped. The prep
   sheet still shows it.
6. Chart: 8 columns including Now; past counts 1,3,2,1,2,2,1 (the brief's
   rhythm without its first column) as demo-only data; the caption counts
   the current window (13, then 15 on the "Your 1:1" beat).
7. Prep sheet copy from the dashboard: Gaps line ends
   `Add one above with "Add an outcome".`; "What do you need from Elena
   Vasquez?"; no "Log it" field. The ask is the module's `ONE_ON_ONE_ASK`.
8. Scene date: the most recent Monday on or before today, from the server.
9. Gutter label "Refunds"; gutter stays 88px.
10. Placeholder "What moved today?" everywhere.
11. ⌘/Ctrl+Enter submits the paste box.
12. Fixed frame heights; after a take-over the log scrolls inside the frame.
13. Light only (the site has no dark theme).
14. `fade-in` comes off HeroSection.
- Sample note: the rewrite in the Phase 0 report is approved.

Answered 2026-09-28 (Phase 1): go with the recommendations.

- Fold: on the homepage the textarea is 2 rows, and the sample link, the
  "We don't store" line, the counter and the submit button share one row.
- The pricing line is removed from the homepage hero completely: not in the
  frame, and not under the Phase 3 CTA pair (this overrides section 5 of
  the brief). The compact variant (/1-1-prep, /self-review) keeps its line.
- Typing speeds 31 ms and 24 ms; the cut-review strip settles sage; the
  chargeback row has no image; the dev `?scene=` frames stay.

## Cross-repo follow-up: prodlog-api parser (not done here)

The scene shows "went live fri" dated to the previous Friday and "support
already using it" kept out of the outcome. The public parser does neither
today. In `prodlog-api`:

1. `src/routes/preview.routes.ts` and `src/lib/parse/notes.ts`: accept a
   `referenceDate` (the browser's local YYYY-MM-DD) and optional `timeZone`,
   sent from prodlog-landing `src/lib/preview.ts`. Today no date is sent and
   the paste prompt says "NEVER use today's date", so relative days come
   back null.
2. Have the model return the literal date phrase ("fri", "today") and
   resolve it in code: a weekday is the most recent one before the
   reference date. Validate with `isRealIsoDate`, as the import flow does.
3. Tighten the outcome rule (`notes.ts` line 186) to a measured effect
   (time freed, a metric moved); adoption or status notes ("already using
   it", "went live") are not outcomes. Add these two lines as few-shot
   examples.
4. Ask for sentence-case titles (line 184) and carry over the import
   prompt's "never add detail they did not write" rule (line 260).
5. prodlog-landing: stop showing undated entries under today
   (`LedgerHero.tsx`, `entry.date ?? today`).
