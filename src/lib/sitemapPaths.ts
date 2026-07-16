import { ROUTE_META } from '@/src/seo/routeMeta';
import {
  getPillarSlugs,
  getSectionSlugs,
  pillarPath,
  sectionEntryPath,
} from '@/src/lib/content';
import { HUBS, type HubKey } from '@/src/content/resources';

const SITEMAP_PRIORITY: Record<string, number> = {
  '/': 1,
  '/how-it-works': 0.9,
  '/pricing': 0.9,
  '/brag-document': 0.9,
  '/product-manager-portfolio': 0.9,
  '/templates': 0.85,
  '/blog': 0.85,
  '/compare': 0.85,
  '/integrations/slack': 0.85,
  '/faq': 0.8,
  '/sample': 0.8,
  '/support': 0.5,
  '/privacy': 0.5,
  '/privacy-policy': 0.4,
  '/terms': 0.4,
};

const SITEMAP_CHANGE_FREQUENCY: Record<
  string,
  'weekly' | 'monthly' | 'yearly'
> = {
  '/': 'weekly',
  '/blog': 'weekly',
  '/how-it-works': 'monthly',
  '/pricing': 'monthly',
  '/integrations/slack': 'monthly',
  '/faq': 'monthly',
  '/sample': 'monthly',
  '/brag-document': 'monthly',
  '/product-manager-portfolio': 'monthly',
  '/templates': 'monthly',
  '/compare': 'monthly',
  '/support': 'yearly',
  '/privacy': 'yearly',
  '/privacy-policy': 'yearly',
  '/terms': 'yearly',
};

function sectionChildPriority(section: HubKey): number {
  return section === 'blog' ? 0.8 : 0.75;
}

function sectionChildChangeFrequency(section: HubKey): 'weekly' | 'monthly' {
  return section === 'blog' ? 'weekly' : 'monthly';
}

export async function getAllSitemapPaths(): Promise<string[]> {
  const paths = new Set<string>(Object.keys(ROUTE_META));

  for (const slug of await getPillarSlugs()) {
    paths.add(pillarPath(slug));
  }

  for (const hub of Object.keys(HUBS) as HubKey[]) {
    paths.add(HUBS[hub].path);
    for (const slug of await getSectionSlugs(hub)) {
      paths.add(sectionEntryPath(hub, slug));
    }
  }

  return Array.from(paths).sort();
}

export function getSitemapPriority(path: string): number {
  if (path in SITEMAP_PRIORITY) {
    return SITEMAP_PRIORITY[path]!;
  }

  for (const section of Object.keys(HUBS) as HubKey[]) {
    if (path.startsWith(`${HUBS[section].path}/`)) {
      return sectionChildPriority(section);
    }
  }

  return 0.5;
}

export function getSitemapChangeFrequency(
  path: string
): 'weekly' | 'monthly' | 'yearly' {
  if (path in SITEMAP_CHANGE_FREQUENCY) {
    return SITEMAP_CHANGE_FREQUENCY[path]!;
  }

  for (const section of Object.keys(HUBS) as HubKey[]) {
    if (path.startsWith(`${HUBS[section].path}/`)) {
      return sectionChildChangeFrequency(section);
    }
  }

  return 'monthly';
}
