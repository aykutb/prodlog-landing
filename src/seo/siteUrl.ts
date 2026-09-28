const DEFAULT_SITE_URL = 'https://prodlog.app';

/**
 * Marketing site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL for previews or alternate hosts.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, '');
  return DEFAULT_SITE_URL;
}

export function canonicalUrl(pathname: string): string {
  const base = getSiteUrl();
  const path = pathname === '/' ? '' : pathname;
  return `${base}${path}`;
}

/** The OG cards are rendered by app/og/[name]/route.tsx at this size. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/**
 * Absolute URL of a page's social preview: its card from src/og/cards.ts.
 * NEXT_PUBLIC_OG_IMAGE (a full URL), when set, replaces the default card only.
 */
export function getOgImageUrl(card: string = 'default.png'): string {
  const override = process.env.NEXT_PUBLIC_OG_IMAGE?.trim();
  if (override && card === 'default.png') return override;
  return `${getSiteUrl()}/og/${card}`;
}
