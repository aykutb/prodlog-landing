# Landing log-first: tracker

The brief is `docs/landing-log-first-prompt.md`. At the start of every session,
read that file, this one, and `prodlog2/GLOSSARY.md`, `prodlog2/DECISIONS.md`,
`prodlog2/STATUS.md`, then continue from the first unchecked item.

Each phase ends with a report and a stop for approval.

## Phase 0: Inspect and report (read-only)

- [x] 0.0 Save the brief to `docs/landing-log-first-prompt.md`; create this tracker
- [x] 0.1 Route map: file, copy source (code or Sanity), metadata, OG image, shared components
- [x] 0.2 Occurrence scans: $19 / founding / 1,000 / spots / `founding_spots_remaining`; LinkedIn; Summaries as a place; Friday; timeline; twenty-two / 22; banned glossary terms (product vs editorial); em and en dashes
- [x] 0.3 Landing styles vs `prodlog2` tokens: hardcoded colors, weights, radii
- [x] 0.4 Logomark geometry comparison
- [x] 0.5 `/try` flow end to end (shared component, API endpoint and shape, limit, sample note, signup handoff, weekday handoff)
- [x] 0.6 Demo persona completeness and recommendation
- [x] 0.7 Cross-repo facts: price/founding/spots, portfolio gating, 1:1 prep quota, confirmation gating, email logging address
- [x] 0.8 Image conventions and OG production
- [x] Phase 0 report delivered (findings: `docs/landing-log-first-phase0.md`)
- [x] Approval and answers to the Phase 0 open decisions

## Phase 1: Foundation

- [x] 1.1 Tokens ported under dashboard names; hardcoded values replaced; heading ink fixed
- [x] 1.2 One logomark source (nav, footer, favicon, public portfolio header)
- [x] 1.3 Pricing config (`PRO_PRICE_MONTHLY`, `PRO_FREE_UNTIL`) and pricing-lines helper
- [x] 1.4a `LedgerRow`
- [x] 1.4b `LedgerDivider`
- [x] 1.4c `YearDivider`
- [x] 1.4d `OccasionCard`
- [x] 1.4e `LogFilter`
- [x] 1.4f `ProductShot` (dev MISSING SHOT frame; production build fails on a missing shot)
- [x] 1.5 Typed demo-data module for the chosen persona
- [x] 1.6 Retire old mock entry cards: `PreviewEntryCard`, `PreviewTool`, `PortfolioBentoMock` and `outputsContent.ts` deleted in Phase 3; no 📅 chip, ownership badge or ↑ Outcome box remains.
- [x] 1.7 Shot manifest `docs/landing-shots.md`
- [x] Phase 1 report (before/after screenshots of three pages)
- [x] Approval to start Phase 2 (owner, 2026-09-27: go with the recommendations)
  - Rows ask "Add an outcome" only on prep and review mocks (opt-in prop).
  - The label under the gutter date is the product, as in the dashboard.
  - Mocks say "Your 1:1" as the brief does.
  - Marketing serif headings stay at 400 at every size; product mimics use 600.
  - Pages that render pricing lines get hourly ISR.
  - OG images are drawn in code; the OG screenshot backgrounds are not needed.

## Phase 2: Homepage and /try

- [x] 2.0 Homepage title, meta description, section order
- [x] 2.1 Ledger hero (resting state, parsed entries drop in, occasion card updates)
- [x] 2.2 Before you ask (five cards)
- [x] 2.3 One log, four moments (strip timeline, four outputs from demo data)
- [x] 2.4 Before every 1:1 (new section)
- [x] 2.5 The habit (four surface cards; old "On the web" screenshot deleted)
- [x] 2.6 When you change jobs
- [x] 2.7 Final CTA band
- [x] 2.8 Social proof slot (renders nothing without data)
- [ ] TODO 2.8: supply real social-proof data (avatars, role labels)
- [ ] Owner: replace or re-render the article images listed in docs/landing-shots.md ("Editorial images to redo"), and the .docx downloads if the previews come from them
- [x] 2.9 /try (before/after, result state with weekday chips, save CTA, title)
- [x] Phase 2 report (desktop and 375px, /try result, reduced motion)
- [x] Approval to start Phase 3 (owner, 2026-09-27: go with the recommendations; two-column hero from lg stays)

## Phase 3: How it works, Pricing, FAQ, Slack

- [x] 3.1 /how-it-works five-step rebuild
- [x] 3.2 /pricing (config-driven, no spots, tiers, CTAs, After December 31, FAQ)
- [x] 3.3 /faq
- [x] 3.4 /integrations/slack
- [x] Phase 3 report
- [x] Approval to start Phase 4 (owner, 2026-09-27: go with the recommendations)

## Phase 4: Content and SEO pages

- [x] 4.1 /brag-document
- [x] 4.2 /product-manager-portfolio
- [x] 4.3 /templates
- [x] 4.4 /compare, /compare/notion, /compare/bragbook
- [x] 4.5 New /compare/lattice, listed on /compare
- [x] 4.6 /blog index and post metadata (`docs/sanity-content-changes.md` for Sanity copy)
- [x] Phase 4 report (Sanity changes prepared, not applied)
- [ ] Owner: `npm run content:patch -- --apply` with an Editor token (dry run passed 2026-09-27; first apply failed on a read-only token, nothing written)
- [x] Approval to start Phase 5 (owner, 2026-09-27)

## Phase 5: New front doors, nav and footer

- [x] 5.1 /1-1-prep
- [x] 5.2 /self-review
- [x] 5.3 Nav (Use cases dropdown, active underline)
- [x] 5.4 Footer
- [x] 5.5 Public portfolio footer CTA; tokens and logomark on /p/[handle]
- [x] Phase 5 report
- [x] Approval to start Phase 6 (owner, 2026-09-28)

## Phase 6: Meta, OG images, cleanup, verification

- [x] 6.1 OG images (default, /try, /1-1-prep, /self-review, /brag-document); titles and descriptions agree
- [x] 6.2 Delete dead assets (old hero composite, old dashboard screenshots, unused mock-card components)
- [x] 6.3 Re-run Phase 0 scans: zero hits
- [x] 6.4 `ProductShot` fails the build on a missing shot; full build, lint and tests pass
- [x] 6.5 Lighthouse (/, /try, /pricing mobile); mocked 2027-01-02 screenshots
- [x] 6.6 Tracker updated; DECISIONS-style entry appended below
- [x] Phase 6 report

## Notes

### Phase 0 decisions (owner, 2026-09-27)

- D1 Treat the day-before-1:1 Slack DM and the Friday 4pm Slack prompt as live (release next week).
- D2 Treat the iOS 1:1 card as live.
- D3 Treat per-question review drafts as live (release next week).
- D4 /try entries survive signup (prodlog2 will take them in); the landing passes them through. Contract to be defined in Phase 2 and listed as a cross-repo follow-up.
- D5 Tiers: Free lists "CSV and PDF export" and "Collaborator confirmations"; no Markdown export. Pro: everything in Free plus unlimited summaries. Priority support not listed.
- D6 Mustard only means an open question (e.g. missing an outcome). Review season is drawn in ink / neutral, not mustard.
- D7 `LedgerDivider` matches the dashboard: dashed rule with a plain label, not a pill.
- D8 Sanity changes go through a new field-level patch script (exact before/after swaps, dry run by default, owner runs it with a write token); the changes are also written to `docs/sanity-content-changes.md`.
- D9 Persona: Priya Raghunathan (`priya_r`). Before capture, set her review questions and Career mode in the product UI.
- D10 Keep the "LinkedIn" social-link label on public portfolios; remove every import mention.
- D11 No new lint/test dependencies. Phase 6 checks = type-checked `next build` plus scan and pricing-date checks with `tsx` and `node --test`.

### Phase 1 notes

- Tokens live on `:root` in `app/globals.css` as HSL triplets, mapped into Tailwind v4 with `@theme inline` (`bg-ink`, `text-muted-foreground`, `bg-sage-soft`, ...). The old landing names (`deep-ink-blue`, `primary`, `charcoal`, `divider`, `sage-green`, `warm-amber`, `muted-plum`, and `ink` meaning the background) are gone.
- Text uses the strong variants on light surfaces (`text-sage-strong`, `text-mustard-strong`, `text-mauve-strong`), as the dashboard does.
- Shadows: only `shadow-overlay`, on the mobile menu and the Resources menu. Radii cap at 12px.
- Kit: `src/components/kit/` (ProductShot is imported from its own file: it reads the filesystem, so it stays out of the client-safe index). Preview at `/dev/kit` (development only).
- Brand: `src/brand/` is a copy of prodlog2's definition plus `Logomark` and `LogoStrip`; `npm test` checks it against prodlog2 and against `public/logomark.svg`.
- Pricing: `src/lib/pricing.ts`. Pages that render its lines need `export const revalidate` so the copy flips on Jan 1 without a deploy. `PRICING_NOW=2027-01-02` previews the after-date copy.
- Demo data: `src/content/demo/priya.ts`, recent entries relative to today like the seed.
- Checks: `npm test` (tsx + node:test), `npm run typecheck`, `npm run build`.

### Phase 2 notes

- The ledger hero is `src/components/ledger-hero/LedgerHero.tsx` (variants `home`, `try`, `compact`); the request and the handoff are `src/lib/preview.ts`.
- Handoff contract (prodlog2 follow-up): `https://dashboard.prodlog.app/auth#paste=<base64url JSON>`, JSON `{ v: 1, text?: string (max 8000), oneOnOne?: 1..5 | "none" }`. A fragment, so the note never reaches a server or a log. The dashboard must read and stash it on load (before any OAuth redirect), prefill `PasteNotesFlow initialText` and `RhythmStep` weekday, then clear it.
- From `lg` the hero is two columns (copy left, the Log miniature right) so the paste line and its button are above the fold at 1280x720 and 1440x900.
- Production builds fail until the shots used on / are in `public/shots/` (one-on-one-prep, slack-day-before, ios-log, log-home, career-move). Check builds: `NEXT_DIST_DIR=.next-check npm run build` keeps a running dev server's `.next` untouched.
- Removed: ObjectionsSection, OutputsSection, PortfolioSection, BringTheMessSection, `public/images/screenshots/01-hero-dashboard-entry-list.png`. Now unused, for 6.2: `public/images/prodlog-before-after.png`, `public/images/screenshots/13-portfolio-products.png`.
- `/sample` now redirects to `/p/priya_r`.

### Phase 3 notes

- /pricing reads every line from `pricingLines()` (title and description through `generateMetadata`), revalidates hourly, and no longer calls `founding_spots_remaining` (`src/lib/foundingSpots.ts` deleted). `tests/pricingPage.test.ts` renders it for 2026-10-01 and 2027-01-02.
- Tiers list only what the product gates (D5): Pro is "Everything in Free" plus unlimited summaries.
- "Can I export everything?" on /pricing and /faq now says CSV and PDF (no Markdown export exists), instead of keeping the old answer.
- "What happens on January 1?" hides after the date; "Do I need a card?" drops "while Pro is free".
- /integrations/slack uses four new shots (command, message shortcut, modal, log-home crop) plus `slack-day-before.png`; the old `public/images/slack-log-*.png` are deleted.
- Deleted `public/images/screenshots/03-summaries-page-with-tabs.png` (old Summaries UI).

### Phase 4 notes

- Sanity is changed only through `scripts/sanity-content-patch.ts` (D8): change lists in `scripts/sanity-content/changes/`, new documents in `scripts/sanity-content/new/`, logic in `src/lib/sanity/contentChanges.ts`. `docs/sanity-content-changes.md` is generated from them (`npm run content:patch -- --docs`).
- Dry run (2026-09-27, against production): 220 changes over 13 documents, all apply exactly once; one new document, `contentPage-compare-lattice`.
- Preview before applying: `CONTENT_PREVIEW=1 npm run dev` (launch config `dev-content-preview`, port 3002, `.next-preview`) renders every Sanity page with the pending changes and the new document. Checked: zero dashes and zero LinkedIn in the rendered HTML of all 17 content routes.
- `content/*.mdx` is the stale legacy copy and is not updated; don't re-run `npm run migrate:sanity`, it would overwrite Sanity with it.
- Code side: `/compare` hub title and description name Lattice; the Manager 1:1 card gets "Or let Prodlog fill it in from your log before every 1:1." (`HUBS.templates.cardNotes`); the MDX `ArticleCTA` default no longer says "Start your log"; the portfolio stats placeholder is "n/a" like the dashboard.
- Next rewrites `tsconfig.json` (adds `.next-preview`/`.next-check` types) when those dist dirs are used; revert it before committing.

### Phase 5 notes

- New routes `/1-1-prep` and `/self-review` (`src/views/OneOnOnePrep.tsx`, `src/views/SelfReview.tsx`), built from `src/components/demo/UseCase.tsx` (section, template download, compact ledger hero) and `src/components/demo/Outputs.tsx` (the mocks, shared with the homepage). Both in `ROUTE_META`, so the sitemap lists them.
- Nav: `UseCasesDropdown` (desktop popover, mobile accordion), data in `src/navigation/useCasesNav.ts`. "Use cases" is active on /1-1-prep and /self-review; /product-manager-portfolio stays under Resources.
- Footer Product column: How it works, 1:1 prep, Self-review, Slack app, iOS app, Pricing, FAQ.
- /p/[handle]: new visitor CTA; the page already uses the tokens and the generated logomark (Phase 1).

### Phase 6 notes

- OG: `app/og/[name]/route.tsx` renders the cards in `src/og/cards.ts` at build (`/og/default.png`, `try.png`, `1-1-prep.png`, `self-review.png`, `brag-document.png`); `buildMetadata` picks one by path, with its own alt text. The portfolio card uses the same tokens, serif and lockup. Fonts: `src/og/fonts/` (Source Serif 4 400 and 600, OFL, owner approved the download 2026-09-28). `NEXT_PUBLIC_OG_IMAGE` now replaces the default card only; unset the CI variable if it still points at the deleted `og-default.png`.
- Deleted: `public/og-default.png`, the hero composite, every old dashboard screenshot, `verify.svg`, `problem-pm.svg`, four unused channel icons, `images/app/ios-log-by-voice.png`. Kept `email/prodlog-logo.png` (prodlog2's emails load it).
- Images: all 13 article images were checked (table in docs/landing-shots.md). 12 still carry dashes or old wording in their pixels (3 to replace, 9 to re-render); scans of text cannot reach them. Open item below.
- Scans (2026-09-28): crawl of all 37 sitemap routes in content preview: no dash, LinkedIn, $19, founding, spots or 1,000 in site copy; the remaining hits are editorial (timeline evidence, sweet spot, the promotion packet's verification column) or a portfolio owner's own entries. No `founding_spots_remaining` in the code. `tests/copy.test.ts` guards the code.
- Build: `ProductShot` fails the build on a missing shot (checked); with placeholder shots the full build passes (48 pages). No lint tooling exists (D11): `npm run typecheck` and `npm test` (26 tests).
- Lighthouse 12, mobile, local production build with placeholder shots: / 94, 100, 100, 100; /try 95, 100, 100, 100; /pricing 96, 100, 100, 100 (performance, accessibility, best practices, SEO); CLS 0 on all three. Fixed on the way: the 1:1 divider's separator role moved inside its list item; /try's example rows use `p` titles.
- Mocked date: `PRICING_NOW=2027-01-02` (launch config `dev-2027`): /, /pricing, /how-it-works and /self-review show no free-period line and say $9/mo.

## DECISIONS entry (to copy into prodlog2/DECISIONS.md)

## 2026-09-28: The marketing site follows the log-first dashboard

- **Why.** prodlog.app still sold the old product: Summaries as a place, a
  Friday habit, the old dashboard in every screenshot, a founding-member
  counter and a $19 price. The dashboard pays off on the 1:1 cadence; the
  site now says so.
- **Positioning.** One sentence on every page: Prodlog turns the notes you
  already keep into a work log you own. It preps your 1:1s and drafts your
  reviews, and when you change jobs it becomes your resume bullets, STAR
  stories and portfolio. Short form: "Work log for 1:1s and reviews".
- **Pricing.** Pro is $9/mo. Pro is free for everyone until December 31,
  2026; the free plan stays free forever. One config
  (`PRO_PRICE_MONTHLY`, `PRO_FREE_UNTIL` in prodlog-landing
  `src/lib/pricing.ts`) drives every line, and the free-period copy drops
  out on its own after the date (hourly ISR).
- **No founding offer.** The spots counter, "founding members" and "first
  1,000" are gone; the landing site no longer calls
  `founding_spots_remaining` (the RPC itself is untouched).
- **Tiers list only what the product gates.** Free: unlimited entries, 1:1
  prep and weekly recaps (never metered), public portfolio, 3 summaries a
  month, CSV and PDF export, collaborator confirmations, private by
  default. Pro: everything in Free plus unlimited summaries (review drafts,
  resume bullets, STAR stories). The summary quota is the only plan gate.
- **Portfolio publishing is free.** 1:1 prep and weekly recaps never count
  as a summary.
- **One demo protagonist.** Priya Raghunathan (`priya_r`) in every mock and
  as "See a real one"; `/sample` redirects to her portfolio.
- **No LinkedIn import on the marketing site.** The dashboard feature stays.
- **Design parity.** The landing site uses the dashboard's tokens under the
  same names and values, the one logomark, and a component kit that mirrors
  the Log (ledger rows, 1:1 divider, year rule, the ink 1:1 card with the
  week stack). Mustard stays "an open question"; review season is drawn in
  ink, not mustard.
- **Signup handoff.** The landing site passes the pasted note and the
  chosen 1:1 weekday to `dashboard.prodlog.app/auth` in the URL fragment
  (`#paste=`, base64url JSON `{ v: 1, text?, oneOnOne? }`), so the note never
  reaches a server log. The dashboard side is a follow-up.
- **Content changes go through reviewed swaps.** Sanity copy changes as
  exact before/after pairs (`scripts/sanity-content/`), checked against the
  live dataset before anything is written.

## 2026-09-28: The homepage hero plays a scripted demo

- **Why.** The Log miniature sat still until someone typed, so most
  visitors never saw a note become entries or a 1:1 get prepped. A 16.5 s
  loop now shows the whole promise: a messy note becomes two entries, the
  1:1 card counts them, and the 1:1 prep gets copied.
- **Built from the product, not a video.** Live DOM from the tokens, the kit
  and Priya's seed; no new dependency. A small timeline
  (`src/lib/scene/timeline.ts`, pure state steps, one rAF clock) that the
  other homepage sections can reuse. Brief and tracker:
  `docs/hero-loop-prompt.md`, `docs/hero-loop.md`.
- **The first frame is the server HTML** and complete; the hero no longer
  fades in. Fixed frame heights (850px from sm, 940px below), CLS 0.
- **It gets out of the way.** It pauses when paused, under 20% visible, in
  a hidden tab and while the paste box has focus; reduced motion shows a
  still until Play. Pressing, typing or pasting in the box, "Use a sample
  note" and the new "Paste your notes" button hand the frame to the
  visitor; the paste flow is unchanged. Replay asks before clearing a note.
- **Homepage-only changes.** `autoplay` on LedgerHero (default off); the
  card reads "1:1 with Elena Vasquez" and the dividers "1:1 with Elena
  Vasquez, Sep 24", as the dashboard writes them; no pricing line in the
  hero; "Paste your notes" and "Start free" under the copy.
- **Site-wide.** The paste box placeholder is "What moved today?"; the
  sample note no longer names Priya; ⌘/Ctrl+Enter sends the note.
- **Follow-up (prodlog-api).** The scene shows "went live fri" dated to
  the previous Friday and "support already using it" kept out of the
  outcome. The public parser does neither today (no reference date is
  sent; the outcome rule is broad): the change list is in
  `docs/hero-loop.md`, "Cross-repo follow-up".

