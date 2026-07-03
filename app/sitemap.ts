import type { MetadataRoute } from 'next';
import {
  getAllSitemapPaths,
  getSitemapChangeFrequency,
  getSitemapPriority,
} from '@/src/lib/sitemapPaths';
import { getSiteUrl } from '@/src/seo/siteUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const paths = await getAllSitemapPaths();

  return paths.map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: getSitemapChangeFrequency(path),
    priority: getSitemapPriority(path),
  }));
}
