<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Prodlog marketing site

Next.js marketing site for [Prodlog](https://prodlog.app). Content (pillars, blog, templates, compare) is managed in **Sanity** and rendered as MDX at build time.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Set Sanity credentials in `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — from [sanity.io/manage](https://sanity.io/manage)
   - `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
   - `SANITY_API_WRITE_TOKEN` (Editor), only needed to apply content changes (`npm run content:patch -- --apply`)

   Optional site SEO vars:
   - `NEXT_PUBLIC_SITE_URL` (defaults to `https://prodlog.app`)
   - `NEXT_PUBLIC_OG_IMAGE`: replaces the default OG card only (leave unset to use `/og/default.png`)

4. **Content lives in Sanity.** Change it in the Studio (`/studio`) or with exact, reviewable swaps:
   `scripts/sanity-content/` holds the change lists, `npm run content:patch` checks them against the
   live dataset, `CONTENT_PREVIEW=1 npm run dev` previews them, and `npm run content:patch -- --apply`
   writes them. Don't run `npm run migrate:sanity`: `content/` is a stale copy and it would
   overwrite Sanity.
   This imports everything from `content/` into your Sanity dataset. After verifying in Studio, you can remove the `content/**/*.mdx` files from the repo (keep until migration succeeds).

5. Run the dev server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Content editing (Sanity)

- **Studio:** [http://localhost:3000/studio](http://localhost:3000/studio) when running locally
- **Document type:** `contentPage` with section `pillar`, `blog`, `templates`, or `compare`
- **Body field:** raw MDX (no frontmatter). Use registered components only:
  `ProcessSteps`, `ProcessStep`, `FAQSection`, `FAQItem`, `BragExamplesGrid`, `BragExampleCard`, `ImagePlaceholder`, `TemplateDownloadCTA`, `ArticleCTA`, `NotComparisonSection`, `NotComparisonCard`

**Publishing workflow (v1):** Edit in Studio → publish → rebuild/redeploy the site. Changes are not live until the next build.

## Brand assets

The logo files are generated in prodlog2 from its one logomark definition
(`src/brand/definition.ts`, run `npm run brand:assets` there) and copied
here unchanged. Never edit or redraw them in this repo; regenerate in
prodlog2 and copy again.

| Here | From prodlog2 |
|---|---|
| `public/logomark.svg` | `public/logomark.svg` |
| `public/favicon.svg`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png` | the same paths in `public/` |
| `public/brand/logo.svg` (the lockup in the Navbar and Footer) | `public/brand/logo.svg` |
| `public/email/prodlog-logo.png` (the header of prodlog2's emails) | `public/brand/email-logo.png` |

OG images are drawn in code: `app/og/[name]/route.tsx` renders the cards in `src/og/cards.ts` at build (served at `/og/<name>.png`), and `app/p/[username]/opengraph-image.tsx` renders each portfolio's. Checks: `npm test`, `npm run typecheck`, `npm run build`.

## Project structure

| Path | Purpose |
|------|---------|
| `sanity/` | Sanity schema and Studio config |
| `app/studio/` | Embedded Sanity Studio at `/studio` |
| `src/lib/content.ts` | Fetches from Sanity, compiles MDX |
| `src/lib/sanity/` | Sanity client and GROQ queries |
| `scripts/migrate-mdx-to-sanity.ts` | One-time MDX → Sanity import |
| `content/` | Legacy MDX source (used only by migration script) |
