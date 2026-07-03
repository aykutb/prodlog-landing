import React from 'react';
import { PageHeader } from '@/src/components/ui';
import type { ContentFrontmatter } from '@/src/lib/content';

interface MdxArticleProps {
  frontmatter: ContentFrontmatter;
  children: React.ReactNode;
}

function pageTitle(frontmatter: ContentFrontmatter): string {
  if (frontmatter.headline) return frontmatter.headline;
  return frontmatter.title.replace(/\s*\|\s*Prodlog\s*$/i, '').trim();
}

export const MdxArticle = ({ frontmatter, children }: MdxArticleProps) => (
  <article className="pb-24">
    <PageHeader title={pageTitle(frontmatter)} subtitle={frontmatter.description} />
    <div className="mdx-prose max-w-5xl mx-auto px-8 md:px-12 text-left">{children}</div>
  </article>
);
