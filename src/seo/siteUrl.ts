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

const DEFAULT_OG_IMAGE_PATH = '/og-default.png';

/** Must match `public/og-default.png` pixel size (used in og:image:width / height). */
export const OG_IMAGE_WIDTH = 1376;
export const OG_IMAGE_HEIGHT = 768;

/**
 * Absolute URL for social previews. Override with NEXT_PUBLIC_OG_IMAGE (full URL); otherwise uses /og-default.png on this site.
 */
export function getOgImageUrl(): string {
  const override = process.env.NEXT_PUBLIC_OG_IMAGE?.trim();
  if (override) return override;
  return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
}
