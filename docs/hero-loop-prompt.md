# prodlog-landing: animated hero loop on the homepage

You are working in `~/Documents/GitHub/prodlog-landing` (Next.js 15, App Router). The sibling repos `prodlog2`, `prodlog-api` and `prodlog-admin` are in `~/Documents/GitHub/`. You may READ them, but you must not modify them.

## 0. What this is

The homepage hero shows a live miniature of the Prodlog Log page: the ink 1:1 card, the log filter, the first-line paste box and Priya's ledger rows. Right now it sits still until a visitor types. This work makes it play a short scripted scene, like a video but built from our own components, so a visitor who never touches it still sees the whole promise in about 16 seconds: a messy note becomes entries, the 1:1 card counts them, and the 1:1 prep gets copied.

It is not a video file. Every frame is live DOM built from the existing tokens, the marketing component kit and Priya's demo data. That keeps it sharp at any size, theme-aware, a few kilobytes, and editable when copy changes.

A working vanilla-JS prototype may exist at `docs/prototypes/hero-loop.html`. If it's there, it is the behavioral reference: timing, motion and states. Port the behavior, not the code. If it isn't there, section 4 is the complete spec.

## 1. How to work

- Work in the phases in section 6. At the end of every phase, report in the format in section 8, then STOP and wait for my go.
- This prompt is the intent; the code is the fact. When they disagree, report the conflict with a recommended resolution. Never guess, and never resolve an ambiguity silently.
- In Phase 0, save this prompt as `docs/hero-loop-prompt.md` and create the tracker `docs/hero-loop.md` with one checkbox per item in section 6. At the start of every session, read both files plus `prodlog2/GLOSSARY.md` and `docs/landing-log-first.md`, then continue from the first unchecked item.

## 2. Hard constraints

1. Read before you write. Inspect the existing hero component, the marketing kit, the demo-data module, the /try flow, the styling approach and the tests before adding anything.
2. The glossary is binding (entry, log, summary with a modifier, confirmation, collaborator, portfolio). No em or en dashes in user-facing copy, alt text or aria labels.
3. **No new dependencies.** If an animation library is already installed, report it in Phase 0 and ask before using it. The default is a small in-house timeline driven by `requestAnimationFrame` plus CSS transitions.
4. **The first frame is always complete.** The server-rendered HTML is the full resting frame: the ink card, the log header, an empty first line with its placeholder, and Priya's rows. Nothing may render blank, fade in from zero opacity, or wait on JavaScript to become readable. The animation starts only after hydration.
5. **No layout shift.** The frame has a fixed height at each breakpoint, and nothing outside it moves while the scene plays.
6. **Accessibility:**
   - A visible pause/play control with an accurate `aria-label`.
   - The scene pauses when the frame is less than 20% visible, when the tab is hidden, and while the visitor is using the paste box.
   - With `prefers-reduced-motion: reduce`, render the "after" frame (section 4.3) as a still, and play only when the visitor presses Play.
   - Decorative elements (cursor, strips, key hints) are `aria-hidden`. The frame has one `aria-label` that describes the scene in a sentence.
7. The shared hero component is also used on /try, /1-1-prep and /self-review. The loop plays **only on the homepage**, behind an `autoplay` prop that defaults to false. Those other pages must render exactly as they do today; verify with before/after screenshots.
8. **The paste flow keeps working exactly as it does now:** same API call, limits, sample note behavior and result state. The loop sits on top of it and gets out of the way the moment the visitor engages.

## 3. The scene engine

Build a small, reusable timeline in `lib/scene/` (or wherever Phase 0 shows fits the conventions), so the four-moments section can reuse it later.

**Clock.**
- `clock` is milliseconds of scene time. It advances only while playing, with each frame's advance capped at 100ms so a background tab doesn't jump.
- Events are `{ t, apply(instant: boolean) }`, sorted by `t`. A runner fires each event when the clock reaches it.
- Each run has an id. Starting a new run invalidates the old one, so stale timers can never touch the DOM.

**Seeking.**
- `seek(t)`: reset to the resting frame, apply every event with `t' < t` with `instant = true` (transitions disabled for that tick), set `clock = t`, then continue playing from there.
- Chapter clicks use `seek`.

**Loop.** When the clock reaches `END`, reset and run again from 0.

**State.** Model the scene as React state plus a small set of imperative refs, where measuring is needed (cursor targets). Pick whatever fits the codebase and explain the choice in the Phase 0 report. Keep timing constants in one file.

**Test.** A unit test that drives the clock manually and asserts the scene state at 0, 5800, 7400, 9600 and 14000 ms, including after `seek`.

## 4. The scene (spec)

### 4.1 Cast and data

Use Priya's demo data module. If Phase 0 finds different values in the seed, the seed wins; report the differences.

- **Frame date:** Mon, Sep 28. The first-line gutter date is Sep 28.
- **Next 1:1:** Thu, Oct 1, with Elena Vasquez. Last 1:1: Sep 24.
- **The OccasionCard** is titled "1:1 with Elena Vasquez", not "Your 1:1". This matches the dashboard screenshots.
- **Source labels** are short enough not to truncate. Use "Refunds" instead of "Refunds & Disputes" in the gutter, or widen the gutter; report which.
- **Resting ledger (top to bottom):**
  - Sep 25 · Chargeback dashboard v2 · "Drove it with design." · outcome "Fewer escalations to finance"
  - divider "1:1 with Elena, Sep 24"
  - Sep 22 · Refund SLA agreed with support · "Negotiated the target with the support lead." · outcome "Refunds settle within 2 days"
  - Sep 17 · Dropped the partial refund experiment · "Decided, after two weeks of flat data." · outcome "Freed the pod for disputes"
  - divider "1:1 with Elena, Sep 10"
  - Sep 9 · Merchant interviews on dispute timing · "Ran six calls with the support team listening in." · no outcome ("Add an outcome")
- **Card chart:** eight past 1:1 columns with entry counts 2,1,3,2,1,2,2,1 (labels "Aug" on the first column, "Sep" on the fifth), plus a "Now" column with one strip and the dashed next slot. Footer: "14 entries in your last eight 1:1s."
- **The typed note** (lowercase and messy on purpose), two lines:
  `cut the manual refund review today, rob agreed. frees ~3 eng wks`
  `dispute evidence checklist went live fri, support already using it`
- **New entries:**
  - Sep 28 · Cut the manual refund review step · "Decided with Rob, after the usage data review." · outcome "Freed 3 eng-weeks"
  - Sep 25 · Dispute evidence checklist went live · "Support is already using it." · no outcome
- **The ask** typed in the prep sheet: `Sign-off to retire the manual review for every merchant, not just the pilot group.`

**Placeholder fix (from the site review):** the paste box placeholder must no longer mention onboarding, loyalty or Maya. Use: `What moved today?`. Also check the sample note: it must not mention Priya in the third person. If it does, rewrite it in the same messy style around Refunds and Disputes work, and include the new text in the report for approval.

### 4.2 Beats (times in ms)

| t | Beat |
|---|---|
| 0 | Resting frame. |
| 500 | The first line takes focus: blinking caret, and the `⌘` `Enter` key hints fade in at its bottom right. |
| 700 → ~4800 | The note types in at 34 ms per character, preserving the line break. |
| 4950 | The key hints flash pressed (ink background) for about 300 ms. |
| 5300 | The typed text dissolves: opacity to 0.25, 1.5px blur, over 400 ms. |
| 5800 | **Chapter "Entries".** The first line clears back to its placeholder. The new Sep 28 row opens in at the top of the ledger (height from 0 plus fade, 550 ms). |
| 6050 | The new Sep 25 row opens beneath it. |
| 6550 | The new rows' sage outcome bars draw left to right (scaleX, 500 ms). |
| 6850 | "Add an outcome" fades in on the Sep 25 row. |
| 7400 | **Chapter "Your 1:1".** The card line changes to "3 entries since your last 1:1 on Sep 24." and flashes `--sage-on-ink` for about 1.4 s. |
| 7550, 7750 | Two strips drop into the Now column, beneath the dashed slot (translateY -16px to 0, 550 ms), briefly bright `--on-ink`, then settle to `--mauve-on-ink`. |
| 8300 | A soft `--sage-on-ink` ring appears around "Prep my 1:1". |
| 8450 → 9300 | A cursor appears near the bottom right of the frame and glides to "Prep my 1:1" (800 ms). |
| 9350 | Click: the cursor presses, the button scales to 0.95, and the ring disappears. |
| 9600 | **Chapter "Prep".** The prep sheet slides up over the log, below the frame's top bar (500 ms). |
| 10150 | The cursor moves to "What do you need from Elena?" and clicks at 10750. |
| 10850 → ~13000 | The ask types in at 26 ms per character. |
| 13100 | The cursor moves to "Copy for your 1:1 doc" and clicks at 13700. |
| 13800 | The button turns `--sage-strong` and reads "Copied" with a check icon. |
| 15100 | The sheet slides down and the cursor fades out. |
| 15700 | The new rows fold closed, the new strips lift away, and the card line returns to "1 entry since your last 1:1 on Sep 24." |
| 16500 | END: reset to the resting frame (already visually identical) and loop. |

**The prep sheet** mirrors the real prep screen:
- "Back to your log"
- the serif title "1:1 with Elena Vasquez on Thu, Oct 1", then "Since Sep 24"
- **Entries:** the two new entries plus Chargeback dashboard v2, each with a checked box, its date, and its outcome or "Add an outcome"
- **Gaps:** "1 entry has no outcome yet. Add one above before the meeting."
- **What do you need from Elena?**
- the actions row: "Copy for your 1:1 doc" (primary), "Skip this 1:1", "Move to another day"

Match the prep screen in `prodlog2` for spacing and type; report any difference.

**Cursor:** a plain arrow pointer with a light drop shadow, `aria-hidden`, and `pointer-events: none`. It moves with an ease-in-out curve and never covers the label of the button it's about to click; aim it at the right half of the target.

**Motion character:** calm. Ease-out for entrances, no bounce and no spring overshoot, one focal movement at a time. If two beats in the table overlap visually in a distracting way, report it and propose a timing change rather than improvising.

### 4.3 The "after" frame (reduced motion and still fallback)

This is the state at t = 8300 with no cursor and no ring: both new rows in place with bars drawn, the card at 3 entries, and the two strips settled. It's also what renders if JavaScript fails after hydration.

### 4.4 Controls under the frame

- A 32px round pause/play button.
- Four chapter buttons with thin progress tracks, filling in `--mauve` as the clock passes through each chapter: **Paste** (0 to 5800), **Entries** (5800 to 7400), **Your 1:1** (7400 to 9600), **Prep** (9600 to END).
- Clicking a chapter seeks to its start and plays. The active chapter's label uses `--fg`; the others use `--muted-fg`.

## 5. Handing over to the visitor

The loop is a demonstration. The moment the visitor wants the real thing, it gets out of the way.

**Take-over triggers:**
- a click, focus or tap on the paste box
- "Use a sample note"
- a new primary button in the left column, "Paste your notes"

**On take-over:**
1. Stop the run.
2. Seek to 0 instantly. Priya's resting rows remain as context.
3. Focus the paste box.
4. Dim the chapter bar to 40% opacity, and switch the play button to "Replay the demo".
5. From here, the existing paste flow runs unchanged: the API call, rows dropping in, and the existing result state.
6. Pressing "Replay the demo" or a chapter clears the visitor's input and results and restarts the scene. If the visitor has typed or pasted anything, ask first with an inline confirm ("Replay the demo? Your pasted note will be cleared.") rather than discarding it silently.

**Left column (review item 8):** add a CTA pair under the body copy:
- **"Paste your notes"** (primary): the take-over trigger. On screens narrower than the two-column breakpoint it also scrolls the frame into view.
- **"Start free"** (secondary): the existing signup link.

The pricing helper line moves under these buttons. The in-frame "or Start free" line stays as it is.

## 6. Phases

### Phase 0: Inspect and report (read-only)

1. Find the homepage hero component and every page that uses it, and describe its props, state and how it calls the paste API.
2. Confirm the Phase 1 kit components (`LedgerRow`, `LedgerDivider`, `OccasionCard`, strips, filter) and the demo-data module exist, and note where they live. Report any gaps against section 4.1.
3. Compare Priya's seed data in `prodlog2` against section 4.1: names, dates, titles, outcomes, and the 1:1 dates. The seed wins.
4. Compare the prep screen in `prodlog2` against the prep sheet in section 4.2.
5. List the installed animation-related dependencies, and describe any existing reveal or IntersectionObserver utilities, since the review found scroll reveals leaving blank screens.
6. **Check what the real parser does** (read-only in `prodlog-api`), using the section 4.1 note:
   - Does "went live fri" resolve to the previous Friday?
   - Does "frees ~3 eng wks" become an outcome while "support already using it" does not?

   The scene shows both behaviors. If the parser doesn't do them today, report it as a cross-repo follow-up with the specific prompt and parsing changes needed. **Do not change the scene to hide it**; I'll decide whether to ship the scene before or with the parser fix.
7. Say whether analytics exists on the landing site, and how events are named.

STOP and report.

### Phase 1: Engine and resting frame

1. The scene engine (section 3) with its unit test.
2. The resting frame and the after frame rendered from Priya's data. The server-rendered HTML must equal the resting frame.
3. The placeholder and sample-note fixes (section 4.1).
4. The `autoplay` prop, defaulting to false, and before/after screenshots proving /try, /1-1-prep and /self-review are unchanged.

STOP and report, with screenshots of the resting and after frames at 1280px and 390px, in light and dark mode.

### Phase 2: The scene

1. All beats in section 4.2, the prep sheet, the cursor, and the controls (section 4.4).
2. The pause rules: visibility, tab hidden, take-over and reduced motion.
3. At 390px the prep sheet must fit, including the Copied button. If it doesn't, hide the outcome labels inside the sheet's entry rows and the "Move to another day" button below 480px, rather than shrinking type.
4. **Deliverable for review:** a screen recording (Playwright video, or a sequence of screenshots at each beat time) at 1280px and 390px.

STOP and report.

### Phase 3: Take-over, analytics and verification

1. Section 5 in full, including the left-column CTA pair and the replay confirm.
2. If analytics exists, emit events following its conventions:
   - hero_demo_chapter (with the chapter)
   - hero_demo_pause
   - hero_takeover (with the trigger: box, sample or button)
   - hero_replay
3. Checks:
   - Lighthouse mobile on `/`, with CLS at 0 from the hero.
   - The paste flow end to end, with and without the loop having played.
   - Keyboard-only: tab to pause, the chapters, "Paste your notes", and the paste box.
   - Reduced motion.
   - 60 seconds of looping with no accumulating DOM nodes or timers (check the node count and heap before and after).
4. Update the tracker, and append a short DECISIONS-style entry to `docs/landing-log-first.md`.

STOP and report.

## 7. Out of scope

- Scenes for the other homepage sections (they will reuse the engine later).
- Any parser change in `prodlog-api`. Report it; don't make it.
- Exporting video files.

## 8. Report format (every phase)

1. **Done:** each tracker item completed, with file paths.
2. **Screenshots or recording:** as the phase asks.
3. **Conflicts and ambiguities:** what the prompt said, what the code showed, and your recommended resolution.
4. **Copy I didn't write myself:** quoted, for approval.
5. **Cross-repo follow-ups:** the repo, the file, and the change needed.
6. **Next:** the first unchecked item for the next phase.
