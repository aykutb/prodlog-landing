import { notFound } from 'next/navigation';
import { MdxArticle } from '@/src/components/content/MdxArticle';
import {
  getSectionEntry,
  getSectionSlugs,
  sectionEntryPath,
} from '@/src/lib/content';
import { createContentMetadata } from '@/src/seo/metadata';

const SECTION = 'blog' as const;

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getSectionSlugs(SECTION);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getSectionEntry(SECTION, slug);
    return createContentMetadata({
      title: `${frontmatter.title} | Prodlog`,
      description: frontmatter.description,
      path: sectionEntryPath(SECTION, slug),
    });
  } catch {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const article = await getSectionEntry(SECTION, slug);
    return (
      <MdxArticle frontmatter={article.frontmatter}>{article.content}</MdxArticle>
    );
  } catch {
    notFound();
  }
}
