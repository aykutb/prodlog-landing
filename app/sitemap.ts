import type { MetadataRoute } from 'next';
import {
  getAllSitemapPaths,
  getSitemapChangeFrequency,
  getSitemapPriority,
} from '@/src/lib/sitemapPaths';
import { getStaticPortfolioUsernames } from '@/src/lib/portfolio/data';
import { getSiteUrl } from '@/src/seo/siteUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const paths = await getAllSitemapPaths();

  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: getSitemapChangeFrequency(path),
    priority: getSitemapPriority(path),
  }));

  // Portfolios above the quality bar (the ones we index); below-bar ones are
  // noindex and stay out of the sitemap.
  try {
    const usernames = await getStaticPortfolioUsernames();
    entries.push(
      ...usernames.map((username) => ({
        url: `${baseUrl}/p/${username}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    );
  } catch {
    // Supabase env missing (e.g. CI) — sitemap still ships the static routes
  }

  return entries;
}
