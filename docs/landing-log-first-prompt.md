# prodlog-landing: align the marketing site with the log-first dashboard

You are working in `~/Documents/GitHub/prodlog-landing` (Next.js 15, App Router, SSG/ISR, Sanity CMS). The sibling repos `prodlog2` (the dashboard), `prodlog-api` and `prodlog-admin` are in `~/Documents/GitHub/`. You may READ them, but you must not modify them.

## 0. Why this change

The dashboard at dashboard.prodlog.app was rebuilt around one log, with payoffs in time order:

| Cadence | What the PM gets | Its job |
|---|---|---|
| Every week | Entries from pasted notes, Slack, email, iOS voice or the web | Builds the asset |
| Before every 1:1 | Entries since the last 1:1, ready to paste or share | The retention loop. Never metered, never gated |
| Every review cycle | A review summary with a draft per review question | The moment people pay for |
| Every job change | Resume bullets, STAR stories, portfolio | Differentiation and distribution |

"Summaries" is no longer a place in the product. The dashboard has two destinations, Log and Career, in a top bar. The Log home opens with an ink "Your 1:1" card containing a strip-shaped week chart and a "Prep my 1:1" button. Below it, the log is a continuous ledger: a date gutter, entry rows, a divider pill at each past 1:1, and year dividers.

The marketing site still sells the old product. The word "1:1" appears nowhere on the homepage. The habit is anchored to Friday 4pm. The "four ways to use it" section presents summaries as a destination. The hero composite and the "On the web" screenshot show the old dashboard: the Logs / Summaries / Portfolio nav, the "Story" badge, the "Add Entry" button. This work re-points the site at the product that exists now. The existing copy is good, so keep its voice and change what it points at.

The one-breath explanation, which every page should agree with:

> Prodlog turns the notes you already keep into a work log you own. It preps your 1:1s and drafts your reviews, and when you change jobs it becomes your resume bullets, STAR stories and portfolio.

Short form: "Work log for 1:1s and reviews".

## 1. How to work

- Work in the phases in section 5. At the end of every phase, report in the format in section 7, then STOP and wait for my go.
- This prompt is the intent; the code is the fact. When they disagree, report the conflict with a recommended resolution. Never guess, and never resolve an ambiguity silently.
- In Phase 0, save this prompt as `docs/landing-log-first-prompt.md` and create the tracker `docs/landing-log-first.md` with one checkbox per item in section 5. At the start of every session, read both files plus `prodlog2/GLOSSARY.md`, `prodlog2/DECISIONS.md` and `prodlog2/STATUS.md`, then continue from the first unchecked item.
- You may use subagents for read-only exploration, including the cross-repo reads in Phase 0.

## 2. Hard constraints

1. **Read before you write.** Inspect the existing conventions for routing, components, styling, Sanity queries, metadata, images and tests before adding anything. Reuse what exists.
2. **The glossary is binding** (`prodlog2/GLOSSARY.md`).
   - Product terms: entry, log (the verb, and the whole collection), summary with a modifier (review summary, resume bullets, STAR stories), story (STAR only), confirmation, collaborator, portfolio, case study.
   - Never use impact, wins, achievement, validation or verification as product terms, and never use capture, record, track or add as verbs for logging. "Log" is never a singular noun for one item.
   - Exception, decided: "impact" is allowed in editorial copy (SEO articles, templates, blog), where it is the searcher's own word. It is still banned in any sentence that describes Prodlog or its UI.
3. **No em dashes or en dashes in user-facing copy**, including alt text, captions, meta descriptions and OG text. Hyphens in compound words are fine.
4. **No ORM**, no Prisma commands, no schema changes. Do not drop or alter the `founding_spots_remaining` RPC; `prodlog2` owns migrations. Only remove the landing site's call to it.
5. **Do not touch other repos.** If a decision below requires a change in `prodlog2`, `prodlog-api` or the iOS app, list it under "Cross-repo follow-ups" in your report.
6. **No LinkedIn import anywhere on the marketing site.** Remove every mention, button and link, on all pages including SEO articles. The dashboard feature stays; the site just doesn't sell it.
7. **No new dependencies** without asking me first. Animation uses CSS and the libraries already installed.
8. **Motion:** every animation respects `prefers-reduced-motion` by rendering its final state.
9. **Mobile:** every section works at 375px. The paste-to-ledger transformation must still read as a before/after below the `md` breakpoint.
10. **Sanity content:** if a page's copy lives in Sanity, don't edit the dataset directly. Write the exact before/after for each field into `docs/sanity-content-changes.md`, grouped by document, unless the repo already has a migration-script convention for content. If it does, report it and ask before using it.

## 3. Product decisions (binding)

- **Price:** Pro is $9/mo. Nothing on the site may say $19.
- **Free period:** Pro is free for everyone until December 31, 2026. After that it's $9/mo, and the free plan stays free forever.
  - Put this in one config constant (for example `PRO_FREE_UNTIL = "2026-12-31"`, alongside `PRO_PRICE_MONTHLY = 9`).
  - All copy that mentions the free period reads from that config. After the date passes, those lines disappear automatically and the $9/mo copy remains.
- **No spots counter anywhere.** Remove the "spots left" UI, the founding-member framing ("founding members", "claim founding access", "first 1,000") and the landing site's RPC call.
- **Portfolio publishing is free.** It moves to the Free tier.
- **1:1 prep and weekly recaps are free and never metered.** They never count as a summary.
- **These features are live, and copy may state them plainly:**
  - the day-before-1:1 Slack DM
  - the Friday 4pm Slack prompt
  - email logging
  - the "no regular 1:1s" weekly recap on a day the user picks
  - the 1:1 card on iOS
  - per-question drafts on the review screen
  - the Slack message shortcut
- **Email logging address:** verify the address in the codebases (I believe it's `addlog@prodlog.app`) and report it before using it in copy.
- **Demo protagonist:** one seeded persona across the entire site.
  - Default to Priya Raghunathan. If another persona has a more complete profile (entries across several quarters, outcomes, 1:1 history, a published portfolio with stories), report the comparison and recommend one.
  - Use that persona's name, collaborator cast and entries in every mock, example and screenshot slot, and as the "See a real one" link if she has a public portfolio page.
  - Stop using `/p/aykutbal` as the product example.

## 4. Design system parity

The dashboard is the visual source of truth. Read these in `prodlog2` before Phase 1:

- the CSS tokens on `:root`: `--ink`, `--background`, `--surface`, `--muted`, `--muted-foreground`, `--border`, `--on-ink`, `--on-ink-muted`, and `--mauve / --sage / --mustard`, each with its `-strong`, `-soft` and `-on-ink` variants
- the type setup: Inter for body, Source Serif 4 for headings, and whatever the wordmark uses (Outfit is loaded; confirm)
- the logomark component and the login page version, which is the declared reference
- the Log page components: the ink occasion card with its strip chart, ledger rows, the 1:1 divider pill, the year divider, the All / 1:1 preps / Reviews filter, and the top-bar active underline
- radii (the ink card is 12px; cards and buttons are 6 to 8px) and shadows

What I measured on the live sites, which you should verify:

- The dashboard ink is `rgb(31,42,68)`. Landing headings render `rgb(30,31,36)`. That's drift.
- Dashboard headings are weight 600; landing H1/H2 are 400.
- The landing site has no matching `:root` tokens, so values are probably hardcoded.
- The landing loads `/logomark.svg`, a stroke file with hex fills. The dashboard renders an inline SVG with `hsl(var(--sage|mustard|mauve))`. The colors match, but the geometry is unconfirmed.

**Rules:**
- Landing uses the dashboard token names and values exactly.
- Keep weight 400 for serif display sizes of 32px and up. Anything that mimics a product surface uses the dashboard's weights and sizes.
- Color vocabulary on marketing visuals: sage = outcomes, mauve = the logging rhythm and 1:1s, mustard = review season. Verify this matches how the dashboard uses them, and report if not.
- The floating pill nav stays, but the active item gets the dashboard's short underline in `--mauve-strong`.

## 5. Phases

### Phase 0: Inspect and report (read-only)

1. Map every public route: its file, where its copy lives (code or Sanity), its metadata and OG image, and which shared components it uses.
2. List every occurrence on the site of each of these, with file and line:
   - $19, "founding", "1,000", "spots", `founding_spots_remaining`
   - LinkedIn
   - "Summaries" or "summary" used as a place
   - Friday
   - timeline
   - twenty-two / 22
   - the banned glossary terms, marking whether each is product copy or editorial
   - em and en dashes in user-facing strings
3. Diff the landing styles against the `prodlog2` tokens (section 4). Report every hardcoded color, weight and radius that should become a token.
4. Compare the two logomark sources and report whether the geometry is identical.
5. Trace the current `/try` flow end to end:
   - the component shared with the homepage hero
   - the `prodlog-api` endpoint it calls, and its request/response shape
   - the character limit and the "Use a sample note" behavior
   - how pasted entries survive signup into the dashboard
   - whether that handoff could also carry a chosen 1:1 weekday (the dashboard's onboarding already asks for one)
6. Find the seed data for the five demo personas and compare their completeness (section 3).
7. Read-only in `prodlog2`, `prodlog-api` and the iOS app, report:
   - where the price, the founding copy or the spots counter appears
   - whether portfolio publishing is gated behind Pro
   - whether 1:1 prep counts against the summary quota
   - which tier gates collaborator confirmations
   - the email logging address

   These are cross-repo follow-ups; do not change them.
8. Report the existing image conventions (`next/image`, `public/` layout) and how OG images are produced.

STOP and report.

### Phase 1: Foundation

1. **Tokens.** Port the dashboard tokens into the landing theme under the same names, replace hardcoded values site-wide with them, and fix the heading ink.
2. **Logomark.** One logomark source identical to the dashboard's login-page reference, used in the nav, footer, favicon and public portfolio header.
3. **Pricing config.** Create the `PRO_PRICE_MONTHLY` and `PRO_FREE_UNTIL` config plus a small helper that returns the right pricing lines for the current date.
4. **Marketing component kit.** These are visual twins of the dashboard components, built on the tokens and fed by props:
   - `LedgerRow`: date in the left gutter, source label under the date, bold title, capped preview, optional right-side thumbnail, and an outcome shown as a short sage bar plus text. A row with no outcome shows the dashboard's "Add an outcome" affordance, as a non-interactive visual.
   - `LedgerDivider`: the centered pill ("Your 1:1, Sep 18").
   - `YearDivider`.
   - `OccasionCard`: the ink card with a title, date, a "N entries since your last 1:1" line, the strip chart using the logomark's strip shapes, and a white button.
   - `LogFilter`: the All / 1:1 preps / Reviews segmented control, visual only.
   - `ProductShot`: a framed real screenshot with light browser chrome, a straight-on view and no 3D. In development, a missing file renders a loud "MISSING SHOT: <name>" frame. The production build fails if any referenced shot is missing.
5. **Demo data.** A typed demo-data module for the chosen persona (entries, 1:1 dates, collaborators, review period, outcomes), used by every mock on the site.
6. **Retire the old mock entry cards.** Remove the 📅 date chips, the "Led" / "Decided" / "Coached" badges and the green "↑ Outcome" boxes once every page is migrated. Track this in the tracker.
7. **Shot manifest.** Create `docs/landing-shots.md` listing every screenshot the site will need, with filename, size, crop, what must be visible, and which seeded state to capture it from. I will capture them. Include at least:
   - `log-home.png`: Log home with the 1:1 card filled (entries since the last 1:1, strips in the chart), the ledger showing one 1:1 divider, one row with an image, one row with an outcome, and one row without.
   - `one-on-one-prep.png`: entries with checkboxes, Gaps, "What do you need from your manager?", and the button row.
   - `review-draft.png`: the review screen with per-question drafts and the entries each drew on.
   - `career-move.png`: the Career header with the "I'm getting ready to move" toggle on and the portfolio preview.
   - `slack-day-before.png`: the real Slack day-before-1:1 DM.
   - `ios-log.png`: the iOS Entries page with the 1:1 card.
   - `log-home-mobile.png`: a mobile crop of the ledger.
   - three OG backgrounds (see Phase 6)

STOP and report, with before/after screenshots of three pages showing the token change.

### Phase 2: Homepage and /try

**Title and meta**

- Title: `Prodlog: the work log for your 1:1s and reviews`
- Meta description: the one-breath explanation (section 0).

**Section order:** hero → Before you ask → One log, four moments → Before every 1:1 → The habit → When you change jobs → final CTA → footer. Also add a hidden social-proof slot directly under the hero (see 2.8).

**2.1 Hero ("the ledger hero").** Copy:

- H1: `Your best work is already written down somewhere.`
- H2: `It's just useless by the time you need it.`
- Body: `Paste it in. Prodlog turns it into a work log you own. It preps your 1:1s, drafts your reviews, and comes with you when you change jobs.`
- Keep the textarea, "Use a sample note", "We don't store what you paste.", the 8,000 character counter and the "See what comes out" button.
- Under it: `or Start free.` and then the pricing line from the helper. Before Jan 1: `No signup to try. Pro is free until the end of the year, then $9/mo.` From Jan 1: `No signup to try. Free forever, Pro is $9/mo.`

Replace the composite image, including the "AN EXAMPLE, SO YOU KNOW WHAT TO EXPECT" label and image, with a live miniature of the new Log page built from the Phase 1 kit:

- **Resting state:** `OccasionCard` on top ("Your 1:1, Thu" with Priya's entries since her last 1:1), then a ledger whose first row is the paste area in the dashboard's first-line style, with today's date in the gutter. Below that: three or four of Priya's rows with one `LedgerDivider`, one row with an outcome, and one row with no outcome.
- **After "See what comes out":** the visitor's parsed entries drop into ledger rows under the first line, one by one, with a short stagger. The occasion card's line then updates to "N entries ready for your next 1:1", and its "now" strip fills.

Keep the existing API call and its limits. Only the presentation changes.

**2.2 "Before you ask".** Replaces "The three things everyone says first." Keep its current position directly under the hero, and use five cards:

- **"I already keep notes in Slack."** Good, keep doing that. Paste them in, or log straight from Slack, and Prodlog turns them into entries. You don't start a new habit. You get something back from the one you have.
- **"I never keep it up."** You don't need a ritual. Prodlog asks the day before your 1:1, when you're already thinking about what to say. Answer from Slack, your phone or your inbox.
- **"My work isn't that impressive."** The best entries aren't launches. A scope you cut, a bad launch you stopped, a PM you coached: those are the ones you forget first and undersell most.
- **"My company already has a review tool."** Keep using it. Your company's tool keeps your history for your company. Prodlog keeps it for you, and it comes with you when you leave.
- **"Is my log private?"** Yes. Nothing leaves your log unless you send it or publish it.

Layout: five cards, with the first two wider or a 3 + 2 grid. Your call; show me both in the report if unsure.

**2.3 "One log, four moments"** (replaces "Two minutes a week. Four ways to use it." and its tabbed output panel).

- H2: `One log. Four moments it pays off.`
- Sub: `You log when something happens. Prodlog hands it back when you need it.`

The visual is a single horizontal timeline drawn in the strip-chart style:

- small mauve strips each week
- a `LedgerDivider`-style tick every other week, labeled as 1:1s
- a mustard band near the end, labeled review season
- a mauve marker at the far right, labeled job change

On scroll into view, the strips fill left to right once; reduced motion shows the final state. Each of the four moments is selectable (tabs on desktop, a stacked list on mobile) and shows its output in its own shape:

- **Every week:** `Log from your notes, Slack, email or your phone, when it happens.` Output: two `LedgerRow`s.
- **Before every 1:1:** `Everything since the last one, ready to paste into your 1:1 doc.` Output: a checklist card with the entries and a "What do you need from your manager?" line.
- **Review season:** `A draft for each review question, built from your own entries.` Output: a document-page fragment with a question heading, a paragraph, and small chips naming the entries it drew on.
- **When you change jobs:** `Resume bullets, STAR stories and a portfolio from what you actually did.` Output: three resume bullets on a resume-shaped card, with a four-quadrant STAR block beside it.

All example text comes from Priya's demo data, so the four outputs visibly come from the same entries. Keep the line `Same entries, different shape. Generated, then edited by you.`

**2.4 "Before every 1:1"** (new section).

- H2: `Your 1:1 is the one meeting about your work.`
- Body: `The person across the table writes your review. Prodlog lays out everything since your last 1:1, flags what's missing an outcome, and asks what you need from your manager. Copy it into your 1:1 doc and go.`
- Badge: `Free. Never metered.`
- Small line: `No regular 1:1s? Pick a day and get a weekly recap instead.`
- Visual: `ProductShot` of `one-on-one-prep.png`, next to `slack-day-before.png` as a smaller overlapping frame. Stack them on mobile.

**2.5 The habit** (rewrite of "The habit fails for one reason: nothing reminds you.").

- H2: keep `The habit fails for one reason: nothing reminds you.`
- Sub: `Prodlog asks the day before your 1:1, when you're already thinking about what to say. Answer wherever you are.`

Four surface cards (currently three). Keep the dark phone card's style:

- **On your phone.** Keep the current copy, and add: `Your next 1:1 sits right above your entries.` Visual: `ios-log.png`, replacing the current voice mock only if the shot shows the 1:1 card; otherwise keep the voice mock.
- **In Slack.** `Reply to the day-before message, type /log the moment something happens, or log any message from its menu. Every Friday at 4pm it also asks what shipped.` Visual: keep the Slack thread mock, but make it the day-before DM instead of the Friday thread.
- **On the web.** `Type it on the first line of your log and press ⌘ Enter.` Visual: `log-home.png` cropped to the ledger. This replaces the old-UI screenshot, which must be deleted from `public/`.
- **By email.** `Forward the thread to <verified address>. It comes back as an entry.`

Keep: `Skip three weeks and we don't guilt you. We just ask again before your next 1:1.` Keep the App Store badge, the QR code and "Install the Slack app".

**2.6 "When you change jobs"** (replaces "The fifth one is your portfolio.").

- H2: `When you change jobs, it comes with you.`
- Body: `Turn on "I'm getting ready to move" and Career comes first: resume bullets, STAR stories and a public portfolio, all built from your entries. Publishing is free, and nothing is public until you publish it.`
- Buttons: `See a real one` (Priya's public page) only. Remove "Import from LinkedIn".
- Visual: `career-move.png`, followed by the existing portfolio embed switched to Priya's data.
- Remove any "twenty-two card types" wording.

**2.7 Final CTA band.** Keep `Start with what you've already written.` and the `Start free` button. Sub-line from the helper: `Entries, 1:1 prep and your portfolio are free forever. Pro is free until the end of the year.` After the date: `...free forever. Pro is $9/mo.`

**2.8 Social proof slot.** An avatar-strip component under the hero with role labels. It renders nothing until real data is provided. Add a TODO in the tracker.

**2.9 /try.** Uses the same ledger-hero component with a lighter wrapper:

- H1: keep `Paste in your notes and see what comes out.`
- Keep the privacy line. Add `Takes about 10 seconds.`
- Above the input, a small static before/after: three messy note lines, an arrow, two `LedgerRow`s.
- **Designed result state:** after the entries render, show an `OccasionCard` with an empty date: `When's your 1:1?` with weekday chips Mon to Fri and a `No regular 1:1s` chip. Then a primary CTA, `Save these N entries →`, with the entries visible behind it.
- If Phase 0 showed the handoff can carry a weekday, pass the chosen chip through signup. If it can't, keep the chips as a visual step, don't pass anything, and list the gap under cross-repo follow-ups.
- Title: `Try Prodlog: paste your notes, see your entries`.

STOP and report, with desktop and 375px screenshots of every changed section, the /try result state, and reduced-motion states.

### Phase 3: How it works, Pricing, FAQ, Slack

**3.1 /how-it-works.** Rebuild it as a five-step walk through the real product, using screenshots from the manifest and no recreations. It must go deeper than the homepage, not repeat it.

- Title: `How Prodlog works: from messy notes to your next 1:1`
- Intro: `Start with the notes you already have. Log as things happen. Get it back before every 1:1, every review, and every job change.`

1. **Start with what you already have.** Paste a Slack thread, a phone note or a doc. Prodlog splits it into dated entries, pulls out what you owned and what moved, and flags the ones missing an outcome. Link: `Try it without signing up`. No LinkedIn.
2. **Log as it happens.** The first line of your log on the web, `/log` or the message menu in Slack, email, and voice on iOS. Mention the day-before-1:1 DM and the Friday prompt.
3. **Before every 1:1.** `one-on-one-prep.png`. Cover the include toggles, gaps, the "what do you need" line, "Copy for your 1:1 doc", "Skip this 1:1" and "Move to another day". Mention the weekly recap for people without regular 1:1s. `Free, never metered.`
4. **Review season.** `review-draft.png`. `Paste your company's review questions once. Prodlog drafts an answer for each and shows which entries it drew on.`
5. **When you change jobs.** `career-move.png`. Portfolio, Stories and Resume bullets; publishing is free.

Close with a short block, **Where your log lives and who can see it**: private by default; nothing leaves unless you copy it, send it, publish it, or ask a collaborator to confirm an entry; export anytime.

Footer CTAs: `Start free`, `See a real one`, and the pricing helper line.

**3.2 /pricing.**

- Title: `Pricing: free until the end of the year | Prodlog`
- H1: `Pro is free until the end of the year.`
- Sub: `Everyone gets Pro free through December 31, 2026. After that it's $9/mo, and the free plan stays free forever.` Driven by config; after the date: H1 `Simple pricing.` with sub `Free forever. Pro is $9/mo when you need more.`
- Remove the spots counter, the "INCLUDED IN EARLY ACCESS" badge and "Claim founding access".

**Free, $0 forever:**
- Unlimited entries
- 1:1 prep and weekly recaps, never metered
- Public portfolio
- 3 summaries a month
- Markdown & CSV export
- Private by default

**Pro, $9/mo:** during the free period, show `$9/mo` struck through plus `Free until Dec 31`.
- Everything in Free
- Unlimited summaries: review drafts, resume bullets, STAR stories
- PDF export
- Priority support

Put "Collaborator confirmations" in whichever tier the code actually gates, per Phase 0. If it's unclear, report and ask. Don't list anything else unless Phase 0 found it gated today; I don't want to invent Pro features.

**CTAs:** during the free period, one primary path, since both tiers lead to the same place. The Free card's `Start free` becomes secondary, and the Pro card's CTA reads `Start free, Pro included`. After the date, the standard two CTAs.

Replace "What happens after early access?" with **After December 31**:
- `Pro becomes $9/mo.`
- `The free plan stays free forever.`
- `Your entries are always yours: export anytime, no lock-in.`

This block hides automatically after the date.

**FAQ:**
- **What happens on January 1?** Pro becomes $9/mo. If you don't upgrade, you keep everything on the free plan, including every entry and your published portfolio.
- **What happens to my entries if I don't upgrade?** Keep the current answer.
- **Is my log really private?** Keep the current answer.
- **What counts as a summary?** Each generated output (a review draft, resume bullets or a STAR story) counts as one. 1:1 prep, weekly recaps, and writing or editing entries never count. Free includes 3 a month; Pro is unlimited.
- **Can I export everything?** Keep the current answer.
- **Do I need a card?** No. Not to start, and not while Pro is free.
- Remove "Will you raise the price?" and "What happens when the 1,000 spots run out?".

**3.3 /faq.** Title: `FAQ | Prodlog`.

- Fix "Prodlog is a capture system" and "track their own growth".
- Replace "How is this different from a brag document?" with: `A brag document is where you write things down. Prodlog is where those notes turn into something: prep for your next 1:1, a draft for your review, and a portfolio when you move.`
- "How often should I log?" → `Whenever something happens. Most PMs log once or twice a week, and the day before their 1:1 is the natural checkpoint.`
- Add these questions:
  - **How does 1:1 prep work?** Tell Prodlog your 1:1 day. The day before, it shows everything you logged since the last one and asks what's missing. Copy it into your 1:1 doc, share it, skip that week, or move it.
  - **What if I don't have regular 1:1s?** Pick a day and Prodlog sends a weekly recap instead.
  - **Does 1:1 prep count against my summaries?** No. It's never metered, on any plan.
  - **Can my manager see my log?** No. Only what you copy, send or publish.
  - **Where can I log from?** The web, Slack, email and the iOS app, all into the same log.
- Remove any LinkedIn mention.

**3.4 /integrations/slack.**
- Replace "timeline" with "log" everywhere.
- Fix "Trigger a new log".
- Add the message shortcut as step 2: `Select any message and log it from the message menu.`
- Add a section on the day-before-1:1 DM and the Friday prompt, using `slack-day-before.png`.
- Verify the step 2 modal description against the current modal in `prodlog-api`, and match it.
- Hero sub: `Log from any channel or DM, and get your 1:1 prep the day before, right in Slack.`

STOP and report.

### Phase 4: Content and SEO pages

Editorial "impact" is allowed. Product-describing sentences follow the glossary. Fix all dashes and remove all LinkedIn mentions.

1. **/brag-document.**
   - Rewrite the "Brag document vs. dedicated tools" paragraph that describes Logs, Verification and Summaries: `In Prodlog, you log as things happen, from Slack, email, your phone or the web. Before every 1:1 it shows what you've logged since the last one, at review time it drafts your answers from those entries, and when you move it becomes your resume bullets, STAR stories and portfolio.`
   - Fix product-facing uses of capture and track, the image captions and alt text (they contain dashes and "impact entries"), and "Start your log".
   - Add one short H3 before the template section: `Bring it to your 1:1s`, two sentences on using the doc as 1:1 prep, linking to /1-1-prep.
2. **/product-manager-portfolio.** Keep the slug. Fix roughly 30 dashes and every product-facing "verification". Remove LinkedIn import. Reframe the product mentions around "when you change jobs, your log becomes your portfolio; publishing is free." Link "See a real one" to Priya's page.
3. **/templates.** Fix the dashes, and fix "early-wins log" in the First 90 Days description. Make the PM Manager 1:1 Template the first card, with an added line: `Or let Prodlog fill it in from your log before every 1:1.`
4. **/compare, /compare/notion, /compare/bragbook.**
   - Replace the "capture habit" center of gravity with: `Prodlog centers on the log and what it gives back every week: prep before each 1:1, drafts at review time, and a portfolio when you move.`
   - Fix "log one win", "logging a win", the dashes, and "wins".
   - Be accurate that BragBook also offers export and a public profile. The difference is that Prodlog is built for PM work and pays back on the 1:1 cadence.
5. **New /compare/lattice** ("Prodlog vs your company's review tool"), covering Lattice and 15Five.
   - Center line: `Your company's review tool keeps your history for your company. Prodlog keeps it for you.`
   - Honest framing: keep using the company tool for the official review; use Prodlog to walk into every 1:1 prepared, write that review from evidence, and keep the record when you leave.
   - Side-by-side rows: whose record it is, what happens when you leave, the 1:1 cadence, review drafts, portfolio.
   - Make no factual claims about Lattice or 15Five features beyond: both now offer AI-assisted review drafting inside the company's instance. Add it to /compare.
6. **/blog index** and any post metadata: fix dashes and product-facing terms. Don't rewrite post bodies; list what you'd change in `docs/sanity-content-changes.md` if they live in Sanity.

STOP and report.

### Phase 5: New front doors, nav and footer

Each page uses the Phase 1 kit, one `ProductShot`, the relevant template as a free download, and ends with the ledger hero in compact form (paste box plus CTA).

1. **/1-1-prep.**
   - Title: `1:1 prep for product managers | Prodlog`
   - H1: `Walk into your 1:1 with everything since the last one.`
   - Sections: why the 1:1 is the meeting about your work; what the prep screen gives you (`one-on-one-prep.png`); the day-before Slack DM; the free PM Manager 1:1 Template download; `Free. Never metered.`
2. **/self-review.**
   - Title: `Write your self-review from evidence | Prodlog`
   - H1: `Start your review from a draft, not a blank page.`
   - Sections: why memory fails at review time; paste your company's questions once and get a draft per question that shows its entries (`review-draft.png`); the free PM Performance Review Template; honest note that review drafts count as a summary (3 a month free, unlimited on Pro, free until Dec 31).
3. **Nav.**
   - Add a `Use cases` dropdown between How it works and Resources, containing 1:1 prep, Review season (→ /self-review) and Job search (→ /product-manager-portfolio). Each item gets a one-line description.
   - Keep: How it works · Use cases · Resources · Try it · Pricing · Start free.
   - Apply the Phase 1 active underline.
4. **Footer.** Product column: How it works, 1:1 prep, Self-review, Slack app, iOS app, Pricing, FAQ. Keep the Resources and Company columns. Keep the tagline.
5. **Public portfolio (/p/[handle]) footer CTA:** `Keep your own work log. Prep your 1:1s, draft your reviews, and publish a page like this one. Start free.` Make sure the page uses the ported tokens and logomark.

STOP and report.

### Phase 6: Meta, OG images, cleanup, verification

1. **OG images.** Using the ink occasion card as the shared motif (ink background, strip chart, serif headline), make them for: the default page, /try (`Paste your notes, see what comes out`), /1-1-prep, /self-review and /brag-document. Follow the existing OG convention from Phase 0. Every page gets a title and description that agrees with the one-breath explanation.
2. **Delete dead assets:** the old hero composite, old dashboard screenshots, and unused mock-card components.
3. **Site-wide re-run of the Phase 0 scans:**
   - zero hits for $19, founding, spots, 1,000 (in the pricing sense), LinkedIn, product-facing banned terms, and dashes in user-facing strings
   - zero references to `founding_spots_remaining` in landing code
4. **Build and checks:** confirm `ProductShot` fails the build when a shot is missing, then run the full build, lint and tests.
5. **Final checks:**
   - Lighthouse on /, /try and /pricing (mobile)
   - Run the pricing helper with a mocked date of 2027-01-02 and screenshot /, /pricing and the final CTA to prove the free-period copy disappears cleanly.
6. Update the tracker, and append a DECISIONS-style entry to `docs/landing-log-first.md` summarizing the pricing and positioning changes, so I can copy it into `prodlog2/DECISIONS.md`.

STOP and report.

## 6. Out of scope

- Any change in `prodlog2`, `prodlog-api`, `prodlog-admin` or the iOS app. List them as follow-ups instead.
- The brag document .docx template. It's handled separately; just tell me its path in `public/`.
- Stripe or billing logic.

## 7. Report format (every phase)

1. **Done:** each tracker item completed, with file paths.
2. **Screenshots:** desktop and 375px for every changed section.
3. **Conflicts and ambiguities:** what the prompt said, what the code showed, and your recommended resolution.
4. **Copy I didn't write myself:** anything you had to write beyond this prompt, quoted, so I can approve it.
5. **Cross-repo follow-ups:** the repo, the file, and the change needed.
6. **Next:** the first unchecked item for the next phase.
