// GA4 event helper. The Google tag is mounted by ConsentGate only after the
// visitor accepts, so `window.gtag` is absent for anyone who declined (and in
// development). Events silently no-op in that case — never queue or retry.
//
// Callers must never pass user-pasted content, or any extract of it, in
// `params`. Counts and booleans only.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, number | string | boolean>
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params ?? {});
}
