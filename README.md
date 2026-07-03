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
   - `SANITY_API_WRITE_TOKEN` — only needed for the one-time migration script

   Optional site SEO vars:
   - `NEXT_PUBLIC_SITE_URL` (defaults to `https://prodlog.app`)
   - `NEXT_PUBLIC_OG_IMAGE`

4. **First-time setup:** migrate existing MDX files into Sanity:
   ```bash
   npm run migrate:sanity
   ```
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

## Project structure

| Path | Purpose |
|------|---------|
| `sanity/` | Sanity schema and Studio config |
| `app/studio/` | Embedded Sanity Studio at `/studio` |
| `src/lib/content.ts` | Fetches from Sanity, compiles MDX |
| `src/lib/sanity/` | Sanity client and GROQ queries |
| `scripts/migrate-mdx-to-sanity.ts` | One-time MDX → Sanity import |
| `content/` | Legacy MDX source (used only by migration script) |
