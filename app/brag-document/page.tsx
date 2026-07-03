import { notFound } from 'next/navigation';
import { MdxArticle } from '@/src/components/content/MdxArticle';
import { getPillar, pillarPath } from '@/src/lib/content';
import { createContentMetadata } from '@/src/seo/metadata';

const SLUG = 'brag-document';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const { frontmatter } = await getPillar(SLUG);
  const title = frontmatter.title.includes('| Prodlog')
    ? frontmatter.title
    : `${frontmatter.title} | Prodlog`;

  return createContentMetadata({
    title,
    description: frontmatter.description,
    path: pillarPath(SLUG),
  });
}

export default async function Page() {
  try {
    const article = await getPillar(SLUG);
    return (
      <MdxArticle frontmatter={article.frontmatter}>{article.content}</MdxArticle>
    );
  } catch {
    notFound();
  }
}
