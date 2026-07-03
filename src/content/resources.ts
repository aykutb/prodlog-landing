export type ResourceNavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  accent?: 'sage' | 'plum' | 'amber' | 'ink';
};

export const PILLARS_NAV: ResourceNavItem[] = [
  {
    label: 'Brag Document',
    href: '/brag-document',
    description: 'Track wins and impact over time',
    icon: '/icons/log.svg',
    accent: 'amber',
  },
  {
    label: 'PM Portfolio',
    href: '/product-manager-portfolio',
    description: 'Build shareable proof of your work',
    icon: '/icons/portfolio.svg',
    accent: 'sage',
  },
];

export type HubNavItem = ResourceNavItem & {
  hubIcon: 'templates' | 'blog';
};

export const HUBS_NAV: HubNavItem[] = [
  {
    label: 'Templates',
    href: '/templates',
    description: 'Free formats for reviews and resumes',
    hubIcon: 'templates',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'STAR examples and career guides',
    hubIcon: 'blog',
  },
];

export const COMPARE_HUB: ResourceNavItem = {
  label: 'Compare',
  href: '/compare',
};

export const RESOURCES_NAV: ResourceNavItem[] = [
  ...PILLARS_NAV,
  ...HUBS_NAV,
  COMPARE_HUB,
];

export const RESOURCE_PATH_PREFIXES = [
  '/brag-document',
  '/product-manager-portfolio',
  '/templates',
  '/blog',
  '/compare',
] as const;

export type HubKey = 'templates' | 'blog' | 'compare';

export type HubConfig = {
  path: string;
  title: string;
  description: string;
  subtitle: string;
};

export const HUBS: Record<HubKey, HubConfig> = {
  templates: {
    path: '/templates',
    title: 'PM Career Templates | Prodlog',
    description:
      'Free templates for PM brag documents, resume bullets, and quarterly review prep—built for product managers.',
    subtitle:
      'Ready-to-use formats for the career moments that matter. Copy, adapt, and pair with your impact logs.',
  },
  blog: {
    path: '/blog',
    title: 'PM Career Blog | STAR Examples & Review Prep | Prodlog',
    description:
      'Articles on PM interviews, STAR method examples, performance reviews, and building your product manager portfolio.',
    subtitle:
      'Practical guides for documenting impact, preparing for reviews, and telling your PM story.',
  },
  compare: {
    path: '/compare',
    title: 'Compare Prodlog | vs Notion, BragBook & More',
    description:
      'See how Prodlog compares to Notion, BragBook, and other tools for PM impact logs, brag documents, and portfolios.',
    subtitle:
      'Honest comparisons to help you choose the right career documentation setup.',
  },
};

export function isResourcePath(pathname: string): boolean {
  return RESOURCE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
