import type { MetadataRoute } from 'next';
import { ROUTE_META } from '@/src/seo/routeMeta';
import { getSiteUrl } from '@/src/seo/siteUrl';

const CHANGE_FREQUENCY: Record<
  string,
  MetadataRoute.Sitemap[number]['changeFrequency']
> = {
  '/': 'weekly',
  '/how-it-works': 'monthly',
  '/pricing': 'monthly',
  '/faq': 'monthly',
  '/sample': 'monthly',
  '/privacy': 'yearly',
  '/privacy-policy': 'yearly',
  '/terms': 'yearly',
};

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/how-it-works': 0.9,
  '/pricing': 0.9,
  '/faq': 0.8,
  '/sample': 0.8,
  '/privacy': 0.5,
  '/privacy-policy': 0.4,
  '/terms': 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return Object.keys(ROUTE_META).map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: CHANGE_FREQUENCY[path] ?? 'monthly',
    priority: PRIORITY[path] ?? 0.5,
  }));
}
