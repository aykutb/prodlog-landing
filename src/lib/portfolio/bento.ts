import type { BentoCardConfig, Portfolio } from './data';

// Layout rules mirrored from the dashboard app (prodlog2 src/types/bento.ts
// and src/hooks/use-bento-pagination.ts) so the public page renders the same
// grid the owner arranged.

export const SIZE_TO_GRID_SPAN: Record<BentoCardConfig['size'], { colSpan: number; rowSpan: number }> = {
  S: { colSpan: 1, rowSpan: 1 },
  M: { colSpan: 2, rowSpan: 1 },
  L: { colSpan: 2, rowSpan: 2 },
};

export const DEFAULT_BENTO_CARDS: BentoCardConfig[] = [
  { id: 'default-profile', type: 'profile', size: 'M', order: 0 },
  { id: 'default-stats', type: 'stats', size: 'S', order: 1 },
  { id: 'default-social', type: 'social_links', size: 'S', order: 2 },
  { id: 'default-contribution', type: 'contribution', size: 'M', order: 3 },
  { id: 'default-all-products', type: 'all_products', size: 'M', order: 4 },
  { id: 'default-all-logs', type: 'all_logs', size: 'L', order: 5 },
];

/** Items per bento-card page: L → 8 (2-col) / 4 (1-col); S, M → 4 / 2. */
export function getItemsPerPage(size: BentoCardConfig['size'], columns: 1 | 2 = 1): number {
  if (size === 'L') return columns === 2 ? 8 : 4;
  return columns === 2 ? 4 : 2;
}

const MIN_PUBLIC_SKILLS = 3;

/** Same rule the dashboard uses to hide empty cards from visitors. */
export function isCardEmpty(card: BentoCardConfig, portfolio: Portfolio): boolean {
  const { profile, logs, products } = portfolio;
  switch (card.type) {
    case 'section_header':
      // A heading with no text is nothing to a visitor
      return !card.sectionTitle?.trim();
    case 'profile':
      return !profile.bio?.trim();
    case 'social_links':
      return !(
        profile.twitter_url ||
        profile.linkedin_url ||
        profile.github_url ||
        profile.dribbble_url ||
        profile.substack_url ||
        profile.medium_url
      );
    case 'all_products':
      return products.length === 0;
    case 'single_product':
      return !card.contentId || !products.some((p) => p.id === card.contentId);
    case 'product_list':
      return !(card.selectedProductIds && card.selectedProductIds.length > 0);
    case 'all_logs':
      return logs.length === 0;
    case 'single_log':
      return !card.contentId || !logs.some((l) => l.id === card.contentId);
    case 'now':
      return !card.nowText?.trim();
    case 'skills_matrix':
      return portfolio.skills.length < MIN_PUBLIC_SKILLS;
    case 'domain_expertise':
      return portfolio.domains.length === 0;
    case 'impact_metric':
      return !card.contentId || !portfolio.impactMetrics.some((m) => m.id === card.contentId);
    case 'decision':
      return !card.contentId || !portfolio.decisions.some((d) => d.id === card.contentId);
    case 'tradeoff':
      return !card.contentId || !portfolio.tradeoffs.some((t) => t.id === card.contentId);
    case 'kill':
      return !card.contentId || !portfolio.kills.some((k) => k.id === card.contentId);
    case 'verified_testimonial':
      // The public view only ever contains confirmed testimonials
      return !card.contentId || !portfolio.testimonials.some((t) => t.id === card.contentId);
    case 'before_after':
      return !card.contentId || !portfolio.beforeAfters.some((b) => b.id === card.contentId);
    case 'writing':
      return portfolio.writings.length === 0;
    case 'embed':
      return !card.embedUrl?.trim();
    default:
      return false; // stats, contribution are never hidden
  }
}

/** Cards to render for a public visitor, in the owner's order. */
export function visibleCards(portfolio: Portfolio): BentoCardConfig[] {
  const cards = portfolio.bentoCards ?? DEFAULT_BENTO_CARDS;
  return [...cards]
    .sort((a, b) => a.order - b.order)
    .filter((card) => !isCardEmpty(card, portfolio));
}

/** Tiptap HTML → plain text for previews (server-safe DOMParser substitute). */
export function stripHtml(html: string | null): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const formatShortDate = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatLongDate = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatMonthYear = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

export function formatDateRange(start: string | null, end: string | null): string | null {
  if (!start && !end) return null;
  const from = start ? formatMonthYear(start) : '';
  const to = end ? formatMonthYear(end) : 'Present';
  return from ? `${from} - ${to}` : to;
}

export function differenceInYears(from: Date, to: Date = new Date()): number {
  let years = to.getFullYear() - from.getFullYear();
  const anniversary = new Date(from);
  anniversary.setFullYear(from.getFullYear() + years);
  if (anniversary > to) years -= 1;
  return years;
}

export function getFaviconUrl(url: string | null, size = 32): string | null {
  if (!url) return null;
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  } catch {
    return null;
  }
}
