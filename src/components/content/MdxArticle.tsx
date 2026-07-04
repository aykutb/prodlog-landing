import React from 'react';
import { PageHeader } from '@/src/components/ui';
import { formatContentDate, type ContentFrontmatter } from '@/src/lib/content';

interface MdxArticleProps {
  frontmatter: ContentFrontmatter;
  children: React.ReactNode;
  /** Render the author / updated / reading-time byline (used on blog articles). */
  showByline?: boolean;
  readingTimeMin?: number;
}

function pageTitle(frontmatter: ContentFrontmatter): string {
  if (frontmatter.headline) return frontmatter.headline;
  return frontmatter.title.replace(/\s*\|\s*Prodlog\s*$/i, '').trim();
}

function bylineParts(frontmatter: ContentFrontmatter, readingTimeMin?: number): string[] {
  return [
    frontmatter.author ? `By ${frontmatter.author}` : null,
    frontmatter.updatedAt ? `Updated ${formatContentDate(frontmatter.updatedAt)}` : null,
    readingTimeMin ? `${readingTimeMin} min read` : null,
  ].filter((part): part is string => part !== null);
}

export const MdxArticle = ({
  frontmatter,
  children,
  showByline = false,
  readingTimeMin,
}: MdxArticleProps) => {
  const parts = showByline ? bylineParts(frontmatter, readingTimeMin) : [];

  return (
    <article className="pb-24">
      <PageHeader title={pageTitle(frontmatter)} subtitle={frontmatter.description} />
      {parts.length > 0 && (
        <p className="-mt-10 mb-12 text-center text-sm text-muted">
          {parts.join(' · ')}
        </p>
      )}
      <div className="mdx-prose max-w-5xl mx-auto px-8 md:px-12 text-left">{children}</div>
    </article>
  );
};
