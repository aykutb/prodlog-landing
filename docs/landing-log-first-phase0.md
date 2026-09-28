# Phase 0 findings (read-only inspection, 2026-09-27)

Companion to `docs/landing-log-first.md`. Nothing outside `docs/` was changed.
Paths are relative to `prodlog-landing` unless a repo is named.

---

## 0.1 Route map

**Wiring.** `app/layout.tsx` loads Inter and Source Serif 4 (next/font, variable,
no weight list) and sets only icons. Every page goes through
`src/components/layout/Layout.tsx` → `LayoutClient.tsx` (Navbar, main, Footer;
`/p/*` gets `minimal` chrome). Metadata comes from `src/seo/metadata.ts`:
`createRouteMetadata(path)` reads `ROUTE_META` in `src/seo/routeMeta.ts`;
`createContentMetadata()` serves Sanity pages. Both set canonical, OG and Twitter
with the single static `public/og-default.png` (1376x768, alt
"Prodlog: the note about your work that actually produces something",
`metadata.ts:61`). `next.config.ts` has no redirects and no `images` block.

| Route | File → view | Copy lives in | Title (current) | OG |
|---|---|---|---|---|
| `/` | `app/page.tsx` → `src/views/Home.tsx` | code: `src/components/sections/*`, demo data `sections/outputsContent.ts` | "Prodlog: the note about your work that actually produces something" | default |
| `/how-it-works` | `src/views/HowItWorks.tsx` | code | "How Prodlog works: from a messy note to a review draft" | default |
| `/pricing` | `app/pricing/page.tsx` (ISR 300, calls RPC) → `src/views/Pricing.tsx` | code | "Pricing \| Free During Early Access \| Prodlog" | default |
| `/faq` | `src/views/FAQ.tsx` | code | "FAQ \| PM Interviews, STAR Framework & Brag Documents \| Prodlog" | default |
| `/try` | `src/views/Try.tsx` + `PreviewTool` | code | "Try Prodlog \| Paste Your Notes, See Entries \| Prodlog" | default |
| `/integrations/slack` | `src/views/IntegrationsSlack.tsx` | code | "Log Work in Slack \| Prodlog Slack Integration" | default |
| `/privacy` | `src/views/Privacy.tsx` | code | "Privacy-First Career Docs \| Prodlog" | default |
| `/privacy-policy` | `src/views/PrivacyPolicy.tsx` | code | "Privacy Policy \| Prodlog" | default |
| `/terms` | `src/views/TermsOfService.tsx` | code | "Terms of Service \| Prodlog" | default |
| `/support` | `src/views/Support.tsx` + `SupportForm` (server action) | code | "Support \| Prodlog" | default |
| `/sample` | `app/sample/page.tsx` | none: `permanentRedirect('/p/aykutbal')` | none | none |
| `/brag-document` | `app/brag-document/page.tsx` → `MdxArticle` | **Sanity** `contentPage` (section `pillar`) | "Brag Document: What It Is, PM Examples & Free Template \| Prodlog" | default |
| `/product-manager-portfolio` | same pattern | **Sanity** | always appends " \| Prodlog" (`page.tsx:13`), possible double suffix | default |
| `/templates`, `/blog`, `/compare` | hubs → `HubPage` / `BlogHub` | hub copy in code (`src/content/resources.ts:73-98`), list from **Sanity** | "PM Career Templates \| Prodlog" / "PM Career Blog \| STAR Examples & Review Prep \| Prodlog" / "Compare Prodlog \| vs Notion, BragBook & More" | default |
| `/blog/[slug]`, `/compare/[slug]`, `/templates/[slug]` | `app/*/[slug]/page.tsx` → `MdxArticle` | **Sanity** | `${title} \| Prodlog` | default |
| `/downloads/pm-brag-document-template` | route handler | streams the Sanity file asset | n/a | n/a |
| `/p/[username]` | `app/p/[username]/page.tsx` (ISR 3600) → `src/views/Portfolio.tsx` | Supabase RPCs | `${name}: ${title} Portfolio`, own metadata, noindex below the quality bar | **generated**: `app/p/[username]/opengraph-image.tsx` (next/og, 1200x630, hex colors, Georgia) |
| `/api/revalidate-portfolio`, `/studio`, `sitemap.xml`, `robots.txt` | infra | n/a | n/a | n/a |

Sanity slugs: blog `star-method-examples`, `performance-review-examples-pm`;
compare `notion`, `bragbook`; templates `brag-document-template`, `first-90-days`,
`manager-1-1`, `promotion-packet`, `quarterly-review`, `resume-bullets`,
`star-story-bank`; pillars `brag-document`, `product-manager-portfolio`.

**Sanity facts.** One document type, `contentPage` (title, description,
headline, order, body as raw MDX text, optional image and downloadFile). The
dataset (project `d7lwmocm`, `production`) is publicly readable. 11 of 13 bodies
match `content/*.mdx`; `brag-document` and `product-manager-portfolio` have
drifted (Sanity is live and wins). `scripts/migrate-mdx-to-sanity.ts` is a
one-time `createOrReplace` from `content/`: re-running it would overwrite the
drift. It is not a field-level migration convention.

**Homepage sections today:** HeroSection → ObjectionsSection ("The three things
everyone says first.") → TriggerSection ("The habit fails…") → OutputsSection
("Two minutes a week. Four ways to use it.") → PortfolioSection ("The fifth one
is your portfolio.", a screenshot, not a live embed) → FinalCTASection.
`BringTheMessSection` is exported but never rendered.

**Mock components to retire (1.6):** `src/components/ui/PreviewEntryCard.tsx`
(📅 chip :22-26, ownership badge :27-31, green ↑ Outcome :36-43, amber "Add the
result…" :44-49), used by OutputsSection, BringTheMess, HowItWorks, PreviewTool.
Also `PortfolioBentoMock.tsx` (HowItWorks only) and `SlackPromptMock.tsx` (a
Friday thread).

## 0.2 Occurrence scans

User-facing hits only; identifiers and comments are counted, not listed.
`content/` files are the legacy MDX mirror of Sanity: every `content/` hit is
live copy that has to change **in Sanity**.

### $19 / founding / 1,000 / spots / RPC (11 copy hits)
- `src/components/sections/FinalCTASection.tsx:16` "Right now the first 1,000 members get Pro free as well."
- `src/seo/routeMeta.ts:41` pricing meta "…the first 1,000 founding members get Pro free for a year…"
- `src/views/Pricing.tsx`: 25, 33 (`$19/mo`), 52, 53, 70, 72 (`{spotsRemaining} spots left.`), 101 (`<s>$19/mo</s>`), 102, 115 ("Claim founding access")
- RPC call: `src/lib/foundingSpots.ts:11` ← `app/pricing/page.tsx:3,11`. The RPC counts down from **850**, not 1,000 (prodlog2 `supabase/migrations/20260716000000_founding_spots_remaining.sql`).

### LinkedIn (7 copy hits)
- `src/components/sections/BringTheMessSection.tsx:112` (unrendered component)
- `src/components/sections/PortfolioSection.tsx:29` "Import from LinkedIn"
- `src/views/HowItWorks.tsx:98` "…import it once and it becomes your backfill…"
- `src/components/portfolio/BentoCards.tsx:168` social-link label `LinkedIn` on public portfolios (a user's own profile link)
- `src/components/portfolio/EvidenceCards.tsx:912` embed platform name `LinkedIn`
- Sanity `product-manager-portfolio` (`content/…:142`, `:148` alt): editorial, about LinkedIn Featured as a portfolio format

### Summaries as a place (5)
- `src/views/HowItWorks.tsx:173` screenshot `03-summaries-page-with-tabs.png`, `:176` alt "Prodlog summaries page showing four output tabs…"
- Sanity `brag-document` (`content/…:202`) "**Summaries** turn raw entries…"
- Sanity `product-manager-portfolio` (`:165`) "**Summaries** and a public **@username** portfolio page…"
- Sanity `star-story-bank` (`:46`) "…its Summaries do the first draft…"
- Quota-unit uses to review: `Pricing.tsx:37,44,45,84,106` ("AI summaries"), `PrivacyPolicy.tsx:40`.

### Friday (7 product + 4 editorial)
- `src/components/sections/TriggerSection.tsx:27` "Friday at 4pm, Prodlog asks what shipped.", `:60` "Reply in the Friday thread…", `:92` "…We just ask again on Friday."
- `src/components/sections/BringTheMessSection.tsx:123`
- `src/components/ui/SlackPromptMock.tsx:25` label
- `src/views/HowItWorks.tsx:115`, `:122`
- Editorial in Sanity: `brag-document` :151, :181; `brag-document-template` :57; `product-manager-portfolio` :165 ("share this by Friday" idiom inside a product paragraph)

### timeline (8 product)
- `src/seo/routeMeta.ts:36` Slack meta "…straight into your Prodlog timeline."
- `src/views/IntegrationsSlack.tsx:29, 30, 32, 33, 34, 54` (+ filename `slack-log-timeline.png` :35)
- Sanity `brag-document` alt (`:14`) "…quarterly timeline of impact entries…"; editorial: `brag-document` :225, `product-manager-portfolio` :65

### twenty-two / 22
- `src/views/HowItWorks.tsx:191` "Twenty-two card types…" (only copy hit; `−22%` in the performance-review blog is an example metric)

### Banned glossary terms
**Product, in code (10):** `src/views/FAQ.tsx:22` "Prodlog is a capture system.", `:31` "…to track their own growth…", `:52` "…stop adding to it."; `src/views/Privacy.tsx:7` "private record"; `src/components/ui/PreviewTool.tsx:278` "Keep these, and add to them."; `src/components/ui/PreviewEntryCard.tsx:47` "Add the result…"; `src/views/IntegrationsSlack.tsx:13` "Trigger a new log…", `:33` "Every Slack log…"; `src/views/PrivacyPolicy.tsx:40` "logs"; `src/content/resources.ts:94` "work logs".

**Product, in Sanity (33 lines):** performance-review-examples-pm :94, :121; star-method-examples :142; compare/bragbook :4, :11, :18, :22, :47, :51; compare/notion :4, :9, :11, :18, :22, :47, :49, :51; brag-document :14, :16, :59, :107, :202; product-manager-portfolio :16, :18, :69, :71, :165, :195; brag-document-template :63; first-90-days :47; manager-1-1 :49; promotion-packet :49; resume-bullets :47. (Line numbers are from `content/`; `brag-document` in Sanity is 2 lines lower after about line 18.)

**Editorial (allowed for "impact"; the rest reviewed per sentence in Phase 4):** about 110 lines across all 13 Sanity documents (impact, wins, record, track, capture, verified). "early-wins log" is the First 90 Days template's own name (9 lines).

**Exempt:** "Add to Slack" (Slack's button), "verify your request" (legal), portfolio badges already read "Confirmed".

### Em and en dashes
- **Code:** `src/views` and `src/components/sections` are already clean. User-facing: `src/components/portfolio/BentoCards.tsx:117`, `:125` (`'—'` placeholder for Years Exp). `sanity/env.ts:10` is a developer error message. 47 dashes in code comments (not user-facing).
- **Sanity:** 204 (187 em, 17 en; every en dash is a numeric range such as "0–30"). Per document: star-method-examples 30, product-manager-portfolio 30, first-90-days 20, performance-review-examples-pm 19, quarterly-review 17, promotion-packet 16, star-story-bank 15, manager-1-1 13, resume-bullets 13, brag-document-template 11, compare/notion 10, compare/bragbook 8, brag-document 2. Titles and descriptions are included in these counts.

## 0.3 Tokens: landing vs prodlog2

prodlog2 `src/index.css:13-67` (HSL triplets, no dark mode) and
`tailwind.config.ts` are the source.

| Dashboard token | Value | Landing today |
|---|---|---|
| `--ink` | 222.2 37.4% 19.4% = #1F2A44 | `deep-ink-blue`, `impact` (~127 uses). **Landing's `--color-ink` is #F6F7F9, the background: a name collision.** |
| `--background` | #F6F7F9 | `soft-canvas`, `ink`, body bg |
| `--surface` | #FFFFFF | `bg-white` ×47, `#ffffff` |
| `--muted` (a fill) | #EEF0F4 | `charcoal` #EDEEF1 (~57 uses) |
| `--muted-foreground` | #5B6178 | `muted` #646976 (~150 `text-muted`), `secondary` #4B4F5C (67) |
| `--border` | #E3E6EC | `divider` #D8DAE0 (~105), `neutral-200` ×3 |
| `--on-ink` / `--on-ink-muted` | #F4F5F8 / #B9BED0 | `text-white` ×21, `text-soft-canvas` |
| heading ink | ink #1F2A44 | **`primary` #1E1F24 = rgb(30,31,36)** (159 `text-primary`, body color) |
| `--sage` / `-strong` / `-soft` / `-on-ink` | #6FAF8E / #42765B / #EFF6F2 / #8FC7A9 | `sage-green` #6FAF8E only (~25) |
| `--mustard` / `-strong` / `-soft` | #E1A948 / #916418 / #FBF5E9 | `warm-amber` #E1A948, used as text ×7 (fails contrast) |
| `--mauve` / `-strong` / `-soft` / `-on-ink` | #6B5C7A / #6B5C7A / #EDEBEF / #A294B0 | `muted-plum` (~12) |
| `--destructive` | #C35555 | none |

- **No `--mustard-on-ink` exists** in the dashboard (the brief lists one).
- **Radii:** dashboard `lg` 8px (buttons, controls), `md` 6px, `sm` 4px, `xl` 12px (tile, panels). Landing also uses `rounded-2xl` 16px ×7 (nav pill, dropdown, hero and screenshot frames, BlogHub) and `rounded-[2px]` ×5.
- **Shadows:** dashboard has one token, `shadow-overlay`, for overlays only ("borders or shadows, never both"). Landing has 17 inline `rgba(31,42,68,…)` shadows, `shadow-2xl/xl/lg/sm`, and 3 `rgba(0,0,0,…)`.
- **Weights:** dashboard `PageTitle`, `PanelTitle` and `TileTitle` are serif 600; row titles are sans 15/22 at 600; body is 14/20. Landing h1 and h2 are 400 (no weight class; `HeroSection.tsx:31` explicit `font-normal`).
- **Type scale (dashboard):** page-title 28/34, panel-title 22/28, tile-title 20/26, row-title 15/22, body 14/20, meta 13/18; gutter 88px; row media 128x96; `max-w-page` 1024, `max-w-column` 720.
- **Fonts:** dashboard loads Inter 400-700, Source Serif 4 400-700 and **Outfit 400 (wordmark only)**. Landing no longer loads Outfit; its lockup is an SVG with outlined glyphs, so it does not need it.
- **Top-bar active marker:** `StripMarker tone="mauve"`: 16x4px, `rounded-full`, `bg-mauve`, 4px above the link's bottom, centered (`TopBar.tsx:60`).

## 0.4 Logomark

**Identical.** `public/logomark.svg`, `favicon.svg`, `brand/logo.svg`,
`favicon-16x16.png`, `favicon-32x32.png` and `apple-touch-icon.png` are
byte-identical to prodlog2's generated files (`cmp`). They are **filled paths,
not strokes**: viewBox `0 0 475 421`, three paths from
`prodlog2/src/brand/definition.ts:33,37,41`, with hex fills equal to the tokens.
The nav (`Navbar.tsx:62`, 20px) and footer (`Footer.tsx:10`, 24px) use the
lockup `/brand/logo.svg`; `/logomark.svg` appears only in `SlackPromptMock`.
The portfolio header has no logo of its own (it uses the minimal chrome), and
the portfolio OG image draws none. Not copied: `site.webmanifest`, `icon-192`,
`icon-512`, `brand/logomark-tile.svg`.

## 0.5 /try flow

- **Shared component:** `src/components/ui/PreviewTool.tsx`. `/try` uses the defaults; the hero uses `variant="compact" showSignup={false} resultPlaceholder={composite}`. States: idle, loading, error, done.
- **API:** `POST https://api.prodlog.app/api/preview/parse` (hardcoded), body `{ text }`. Handler: prodlog-api `src/routes/preview.routes.ts`. It is anonymous, CORS is limited to `https://prodlog.app`, rate-limited to 5 per hour per IP (in memory), and validated with `z.string().min(1).max(8000)`. It returns `{ entries: {date|null, title, ownership|null, outcome|null, missingOutcome}[] (max 12), truncated }` and stores nothing.
- **Limit:** 8,000 characters, enforced client-side in four places and on the server. Paste overflow notice: "That was over 8,000 characters, so we kept the first 8,000."
- **Sample note:** `PreviewTool.tsx:20-23`, four lines; one line mentions "priya took over the analytics spec".
- **Signup handoff: none.** Both CTAs are a bare `https://dashboard.prodlog.app/auth`, and the entries are discarded. The /try copy admits this: "These aren't saved yet… then you can paste again." In the dashboard, onboarding's Notes step runs a fresh paste (`PasteNotesFlow`, which already takes an unused `initialText` prop).
- **Weekday handoff:** only with a dashboard change. `RhythmStep.tsx:32` initialises `weekday` from nothing. Minimal change: the landing adds `?oneOnOne=1..5|none` to `/auth`, `Auth.tsx` stashes it in localStorage next to `stashReturnTo`, and `RhythmStep` reads and clears it. The same pattern could carry the pasted text into `PasteNotesFlow initialText`. The two origins share no storage, so a URL param is the only direct carrier.
- **Analytics:** `preview_pasted`, `preview_parsed`, `preview_signup_click` (on /try only).

## 0.6 Demo personas

The fixtures are in prodlog-api `scripts/fixtures/*.ts` (seeder
`scripts/seed-demo.ts`); prodlog2 `supabase/seeds/demo-log-first.sql` adds
rhythms, 1:1 notes and a few private entries. All five run on the free plan, all
five portfolios are indexable, and none has entry images or a metric named
"Outcome" in its public entries.

| | Priya Raghunathan `priya_r` | Marcus Ojo | Dani Kowalczyk | Tom Bergström | Aisha Nazari |
|---|---|---|---|---|---|
| Role | APM going up for PM, fintech, Refunds & Disputes | Senior PM | Growth PM | Platform PM | Head of Product |
| Public entries / span | 14, Dec 2025 to Jul 2026 | 22, 5 quarters | 38 | 16 | 12 |
| 1:1 rhythm and history | weekly Thursday; prepared, shared and skipped notes | every 2 weeks; one moved | no 1:1s (recap) | weekly, no history | weekly, no history |
| Review date / questions | none | none | none | **yes, 4 questions** | none |
| STAR / resume bullets | none | resume bullets | none | none | **STAR** |
| Career mode | off | off | off | off | **on** |
| Confirmations | 6 entries | **14 entries, 3 testimonials** | 6 | 6 | 6, 2 testimonials |
| Live page | **200, indexable** | 200 | not checked | not checked | 200 |

Priya's cast: Elena Vasquez (Group PM, the 1:1 counterpart by position, though
the seed picks it non-deterministically), Sam Okafor (Designer), Rob Hartley (Eng
Lead), Chi Nwosu (Data Analyst). The prodlog2 `/dev/screens` "Priya" is a
different in-memory persona (1:1 with "Maya", product "Platform API", has
images).

## 0.7 Cross-repo facts

- **Price, founding copy, spots:** none in prodlog2, prodlog-api, prodlog-mobile or prodlog-admin, apart from the RPC's definition. No Stripe code anywhere; mobile has empty RevenueCat placeholders.
- **Plan storage:** `user_account_types.account_type` (`free` or `pro`), with `is_pro_user()`.
- **The only plan gate:** 3 manual summaries a month on Free (`summary_quota_for` / `create_summary`, the generate-summary pre-check, `useDraftReviewSummary`).
- **Portfolio publishing:** not gated (bio plus 5 public entries, no plan check).
- **1:1 prep:** never counts. It is a formatter, guarded by an ESLint rule and `noAi.test.tsx`. The retired `ONE_ON_ONE_PREP` summary format did count; its old rows are read-only.
- **Collaborator confirmations:** not gated by any tier.
- **Export:** CSV **and PDF** are both ungated (`LogExportDialog.tsx`). **There is no Markdown export.** No priority-support concept exists.
- **Email logging:** `addlog@in.prodlog.app` (Cloudflare Email Worker). Senders are identified by DKIM-passed From address matching the account email or a verified email, or by a personal alias `addlog+<token>@in.prodlog.app`. The apex `addlog@prodlog.app` is not routed (its MX is Google Workspace). No dashboard, iOS or landing surface shows the address.
- **Slack (prodlog-api):** `/log` opens the modal "Log an impact" (fields Title, Description, Date; no help text). A message shortcut (`log_message`) and a global shortcut (`log_global`) exist; their display names live in the Slack app dashboard (recorded as "Log a win"). **No code sends any Slack message**: there is no day-before DM and no Friday prompt.
- **The day-before-1:1 reminder is an email** (`send-weekly-entry-reminder`, Resend, subject "What moved this week?", day = the day before the 1:1 or the recap day). STATUS.md lists "point the reminder cron at `send-weekly-entry-reminder` (daily)" as still waiting.
- **Friday 4pm:** there is no Friday prompt in code. The weekly `.ics` calendar invite runs at a time the user picks.
- **iOS 1:1 card:** not in prodlog-mobile on any branch (no rhythm or occasion reads).
- **Per-question review drafts:** not built. `ReviewScreen` shows the stored `review_questions` as text, and "Draft my review" produces one review summary for the period. `generate-summary` does not read the questions.
- **1:1 prep screen strings verified:** "Gaps", "What do you need from your manager?", "Copy for your 1:1 doc", "Skip this 1:1", "Move to another day", "Prep my 1:1", "I'm getting ready to move".

## 0.8 Images and OG

- **next/image:** used in 4 files (hero, portfolio section, trigger section, HowItWorks), all local; default optimisation; frames use `rounded-2xl border-neutral-200 shadow-2xl`. Everything else, including MDX images, uses plain `<img>`.
- **public/ layout:** `brand/`, `badges/`, `icons/`, `images/{app,screenshots,blog,pillars,templates}`, `downloads/*.docx`, `logmethods/`.
- **Old assets to delete later:** `images/prodlog-before-after.png` (hero composite, 1.26 MB); `images/screenshots/01-hero-dashboard-entry-list.png` ("On the web"); `03-summaries-page-with-tabs.png`; `13-portfolio-products.png`; `slack-log-{command,modal,timeline}.png` (old UI).
- **Unused today:** `verify.svg`, `problem-pm.svg`, `logmethods/{browser-extension,claude-mcp,mobile-app,web-page}-icon.svg`, `icons/summaries.svg` (only in mdx-visuals), `images/screenshots/02,04-12`.
- **OG convention:** one static `public/og-default.png` for every route (overridable by `NEXT_PUBLIC_OG_IMAGE` at build); one generated `app/p/[username]/opengraph-image.tsx` (next/og). Per-route `opengraph-image.tsx` files fit the existing pattern with no new dependency.
- **Brag document .docx:** not in `public/`. It is served by `app/downloads/pm-brag-document-template/route.ts` from the Sanity file asset; its source copy is `content/pillars/pm-brag-document-template.docx`. The other six templates are in `public/downloads/`.
- **Tests, lint, CI:** no test runner, no ESLint, no `lint` or `test` script. CI builds the Docker image only; type checks come from `next build` (`strict`, `noUnused*`).
