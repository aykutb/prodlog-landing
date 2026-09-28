import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import { mdxComponents } from '@/src/components/content/mdx-components';
import { getSanityClient } from '@/src/lib/sanity/client';
import { applyChanges, loadChanges, loadNewDocs } from '@/src/lib/sanity/contentChanges';
import {
  contentPageBySectionAndSlugQuery,
  contentPageSlugsBySectionQuery,
  contentPagesBySectionQuery,
  pillarSlugsQuery,
  type SanityContentPage,
  type SanityContentSection,
} from '@/src/lib/sanity/queries';

export type ContentFrontmatter = {
  /** SEO `<title>` */
  title: string;
  /** Meta description */
  description: string;
  /** Visible page H1 (falls back to title without site suffix) */
  headline?: string;
  order?: number;
  author?: string;
  /** Card image URL (Sanity asset) */
  image?: string;
  /** ISO date of last content edit */
  updatedAt?: string;
};

export type ContentSection = 'templates' | 'blog' | 'compare';

export type LoadedContent = {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: ReactElement;
  downloadUrl?: string;
  readingTimeMin: number;
};

const SECTION_MAP: Record<ContentSection, SanityContentSection> = {
  templates: 'templates',
  blog: 'blog',
  compare: 'compare',
};

// ── Development preview of pending content changes ──────────────────────
// CONTENT_PREVIEW=1 npm run dev renders the Sanity pages with the change
// lists in scripts/sanity-content/ applied in memory, and the new documents
// added, so they can be reviewed before `npm run content:patch -- --apply`.
// Never on in production.
const PREVIEW = process.env.CONTENT_PREVIEW === '1' && process.env.NODE_ENV !== 'production';

function preview(page: SanityContentPage): SanityContentPage;
function preview(page: SanityContentPage | null): SanityContentPage | null;
function preview(page: SanityContentPage | null): SanityContentPage | null {
  if (!PREVIEW || !page) return page;
  const doc = loadChanges().find((d) => d.docId === page._id);
  return doc ? { ...page, ...(applyChanges(page, doc.changes).next as Partial<SanityContentPage>) } : page;
}

function previewNewPages(section: SanityContentSection): SanityContentPage[] {
  if (!PREVIEW) return [];
  return loadNewDocs()
    .filter((d) => d.section === section)
    .map((d) => ({ _id: d._id, slug: d.slug.current, title: d.title, description: d.description, headline: d.headline, order: d.order, body: d.body }));
}

function toFrontmatter(page: SanityContentPage): ContentFrontmatter {
  return {
    title: page.title,
    description: page.description,
    headline: page.headline,
    order: page.order,
    author: page.author,
    image: page.imageUrl,
    updatedAt: page.updatedAt,
  };
}

export function formatContentDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function compileMdxString(
  body: string,
  frontmatter: ContentFrontmatter,
  slug: string,
  downloadUrl?: string,
): Promise<LoadedContent> {
  const { content } = await compileMDX<ContentFrontmatter>({
    source: body,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const wordCount = body.split(/\s+/).filter(Boolean).length;

  // Cards fall back to the first image in the body when no card image is set.
  const bodyImage = body.match(/src="(\/images\/[^"]+)"/)?.[1];

  return {
    slug,
    frontmatter: { ...frontmatter, image: frontmatter.image ?? bodyImage },
    content,
    downloadUrl,
    readingTimeMin: Math.max(1, Math.round(wordCount / 200)),
  };
}

async function fetchContentPage(
  section: SanityContentSection,
  slug: string,
): Promise<SanityContentPage | null> {
  const client = getSanityClient();
  const page = await client.fetch<SanityContentPage | null>(contentPageBySectionAndSlugQuery, {
    section,
    slug,
  });
  return preview(page) ?? previewNewPages(section).find((p) => p.slug === slug) ?? null;
}

export async function getSectionSlugs(section: ContentSection): Promise<string[]> {
  const client = getSanityClient();
  const slugs = await client.fetch<string[]>(contentPageSlugsBySectionQuery, {
    section: SECTION_MAP[section],
  });
  return [...slugs, ...previewNewPages(SECTION_MAP[section]).map((p) => p.slug).filter((s) => !slugs.includes(s))];
}

export async function getPillarSlugs(): Promise<string[]> {
  const client = getSanityClient();
  return client.fetch<string[]>(pillarSlugsQuery);
}

export function pillarPath(slug: string): string {
  return `/${slug}`;
}

export function sectionEntryPath(section: ContentSection, slug: string): string {
  return `/${section}/${slug}`;
}

export async function getPillar(slug: string): Promise<LoadedContent> {
  const page = await fetchContentPage('pillar', slug);
  if (!page?.body) {
    throw new Error(`Pillar not found: ${slug}`);
  }
  return compileMdxString(page.body, toFrontmatter(page), slug, page.downloadUrl);
}

export async function getSectionEntry(
  section: ContentSection,
  slug: string,
): Promise<LoadedContent> {
  const page = await fetchContentPage(SECTION_MAP[section], slug);
  if (!page?.body) {
    throw new Error(`Content not found: ${section}/${slug}`);
  }
  return compileMdxString(page.body, toFrontmatter(page), slug, page.downloadUrl);
}

export async function getAllSectionEntries(
  section: ContentSection,
): Promise<LoadedContent[]> {
  const client = getSanityClient();
  const fetched = await client.fetch<SanityContentPage[]>(contentPagesBySectionQuery, {
    section: SECTION_MAP[section],
  });
  const pages = [...fetched.map((p) => preview(p)), ...previewNewPages(SECTION_MAP[section]).filter((n) => !fetched.some((p) => p.slug === n.slug))];

  const entries = await Promise.all(
    pages.map((page) =>
      compileMdxString(page.body, toFrontmatter(page), page.slug, page.downloadUrl),
    ),
  );

  return entries.sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99),
  );
}

export async function getPillarDownload(
  slug: string,
): Promise<{ downloadUrl: string; filename?: string } | null> {
  const page = await fetchContentPage('pillar', slug);
  if (!page?.downloadUrl) {
    return null;
  }
  return { downloadUrl: page.downloadUrl };
}

export type NavItem = {
  label: string;
  href: string;
};

export async function getCompareNavItems(): Promise<NavItem[]> {
  const client = getSanityClient();
  const fetched = await client.fetch<{ _id: string; slug: string; title: string; order?: number }[]>(
    `*[_type == "contentPage" && section == "compare"] | order(order asc) {
      _id,
      "slug": slug.current,
      title,
      order
    }`,
  );
  const pages = PREVIEW
    ? [...fetched.map((p) => ({ ...p, ...(preview(p as SanityContentPage) as { title: string }) })), ...previewNewPages('compare').filter((n) => !fetched.some((p) => p.slug === n.slug))].sort(
        (a, b) => (a.order ?? 99) - (b.order ?? 99),
      )
    : fetched;

  return pages.map((page) => ({
    label: page.title.replace(/\s*\|\s*Prodlog\s*$/i, '').trim(),
    href: sectionEntryPath('compare', page.slug),
  }));
}
