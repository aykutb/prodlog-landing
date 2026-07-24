import type { BentoCardConfig, Portfolio } from './data';
import { estimateRichTextHeight, isRichTextEmpty } from './richText';

// Layout rules mirrored from the dashboard app (prodlog2 src/types/bento.ts
// and src/hooks/use-bento-pagination.ts) so the public page renders the same
// grid the owner arranged.

// Spans apply from `sm` up only: on mobile the grid is a single column and
// every card takes the full width with a content-driven height.
export const SIZE_TO_SPAN_CLASS: Record<BentoCardConfig['size'], string> = {
  S: '',
  M: 'sm:col-span-2',
  L: 'sm:col-span-2 sm:row-span-2',
};

// Content-aware row spans, mirrored from the dashboard's BentoGrid: L cards
// default to 2 rows, but list-like content (skills) and free text (a
// testimonial quote) can need more vertical room, so those cards get extra
// grid rows instead of being clipped. Literal class strings so Tailwind's
// scanner picks them up. Rows are 140px with a 16px gap from `sm` up.
const L_ROW_SPAN_CLASS: Record<number, string> = {
  1: 'sm:col-span-2',
  2: 'sm:col-span-2 sm:row-span-2',
  3: 'sm:col-span-2 sm:row-span-3',
  4: 'sm:col-span-2 sm:row-span-4',
  5: 'sm:col-span-2 sm:row-span-5',
  6: 'sm:col-span-2 sm:row-span-6',
};

const GRID_ROW_HEIGHT = 140;
const GRID_GAP = 16;
const MAX_L_ROW_SPAN = 4;
// Rich text gets more headroom than other L cards: the public page never
// clamps prose, and a 2,000-char body needs more than 4 rows.
const MAX_RICH_TEXT_ROW_SPAN = 6;

const rowsForHeight = (height: number): number =>
  Math.ceil((height + GRID_GAP) / (GRID_ROW_HEIGHT + GRID_GAP));

/** Span classes for a card, growing L skills/testimonial cards to fit. */
export function cardSpanClass(card: BentoCardConfig, portfolio: Portfolio): string {
  // Rich text always grows to its content, at M and L alike — the public
  // page never clamps prose (a clamp would hide text from crawlers too).
  if (card.type === 'rich_text' && card.richTextBody) {
    const estimated = estimateRichTextHeight(card.richTextBody, !!card.richTextTitle?.trim());
    const rows = Math.min(Math.max(rowsForHeight(estimated), 1), MAX_RICH_TEXT_ROW_SPAN);
    return L_ROW_SPAN_CLASS[rows];
  }

  // Product cards never scroll internally — M and L grow to fit instead,
  // mirroring the dashboard's BentoGrid estimates.
  if (card.type === 'single_product' && card.contentId) {
    const p = portfolio.products.find((x) => x.id === card.contentId);
    if (p) {
      const footer = p.role || p.start_date || p.end_date ? 44 : 0;
      // M was retired for product cards; layouts saved before that render as L
      if (card.size === 'L' || card.size === 'M') {
        // padding + icon header row (name + type chip), then the details stack
        let estimated = 32 + 84 + footer;
        if (p.problem_definition) {
          estimated += Math.ceil(p.problem_definition.length / 60) * 20 + 12;
        }
        if (p.screenshots && p.screenshots.length > 0) estimated += 72;
        return L_ROW_SPAN_CLASS[Math.min(Math.max(2, rowsForHeight(estimated)), MAX_L_ROW_SPAN)];
      }
    }
  }

  if (card.size !== 'L') return SIZE_TO_SPAN_CLASS[card.size];

  let rows = 2;
  if (card.type === 'skills_matrix' && portfolio.skills.length > 0) {
    const groups = new Set(portfolio.skills.map((s) => s.category)).size;
    // padding + title block (~60px), per-category header + spacing (~22px),
    // per-skill row (~24px)
    const estimated = 60 + groups * 22 + portfolio.skills.length * 24 - 8;
    rows = rowsForHeight(estimated);
  } else if (card.type === 'verified_testimonial' && card.contentId) {
    const testimonial = portfolio.testimonials.find((t) => t.id === card.contentId);
    if (testimonial) {
      // padding + badge + credential block (~160px) plus the serif quote at
      // ~36 chars per line, 28px line height
      const lines = Math.max(1, Math.ceil(testimonial.quote.length / 36));
      rows = rowsForHeight(160 + lines * 28);
    }
  }
  return L_ROW_SPAN_CLASS[Math.min(Math.max(rows, 2), MAX_L_ROW_SPAN)];
}

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
    case 'rich_text':
      return isRichTextEmpty(card.richTextBody);
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
