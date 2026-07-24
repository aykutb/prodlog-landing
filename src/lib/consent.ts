// Cookie consent state.
//
// The rule this implements: nothing non-essential may be stored on a visitor's
// device before they opt in. Analytics is therefore not merely "signalled as
// denied" — the Google tag is never loaded at all until consent is granted, so
// a visitor who declines (or who never answers) leaves with no `_ga` cookie.
//
// The choice itself is kept in localStorage rather than a cookie: it is
// strictly necessary to remember it (otherwise we would have to ask on every
// page), it never leaves the device, and it carries no identifier.

export const CONSENT_STORAGE_KEY = 'prodlog.cookie-consent';

/** Bump when the categories we ask about change — old answers stop counting
 *  and every visitor is asked again. */
export const CONSENT_VERSION = 1;

/** Consent goes stale rather than lasting forever; EU guidance expects a
 *  periodic re-ask, and a year is the common reading. */
export const CONSENT_MAX_AGE_DAYS = 365;

/** Fired when the choice changes, so the banner and the tag loader stay in
 *  sync without a shared React context. */
export const CONSENT_CHANGE_EVENT = 'prodlog:cookie-consent-change';

/** Fired by "Cookie settings" to re-open the banner after a decision. */
export const CONSENT_REOPEN_EVENT = 'prodlog:cookie-consent-reopen';

export type ConsentStatus = 'granted' | 'denied';

interface StoredConsent {
  status: ConsentStatus;
  version: number;
  /** Epoch ms of the decision. */
  ts: number;
}

const isStatus = (value: unknown): value is ConsentStatus =>
  value === 'granted' || value === 'denied';

/**
 * The visitor's current answer, or null when they haven't given one — which
 * also covers a stale answer, an answer to an older question, and any
 * environment where localStorage is unavailable (Safari private mode, storage
 * disabled). Every one of those falls back to "not consented", never to
 * "assume yes".
 */
export function readConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (!isStatus(parsed.status) || parsed.version !== CONSENT_VERSION) return null;
    const age = Date.now() - (parsed.ts ?? 0);
    if (age > CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null;
    return parsed.status;
  } catch {
    return null;
  }
}

export function writeConsent(status: ConsentStatus): void {
  if (typeof window === 'undefined') return;
  try {
    const record: StoredConsent = { status, version: CONSENT_VERSION, ts: Date.now() };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: the choice holds for this page load only, and the
    // visitor is asked again next time. Declining still takes effect now.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: status }));
}

/**
 * Remove analytics cookies already on the device — the path that matters when
 * someone accepts and later withdraws. Cookies are cleared on the exact host
 * and on the registrable domain, since GA sets `_ga` on `.prodlog.app`.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((name): name is string => !!name && (name === '_ga' || name.startsWith('_ga_') || name === '_gid'));

  const { hostname } = window.location;
  const parts = hostname.split('.');
  const domains = new Set<string>([hostname, `.${hostname}`]);
  if (parts.length > 2) {
    const registrable = parts.slice(-2).join('.');
    domains.add(registrable);
    domains.add(`.${registrable}`);
  }

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}

/** Re-open the banner so a decision can be changed — the withdrawal path has
 *  to be as easy as granting was. */
export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
}
