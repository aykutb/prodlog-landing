'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  CONSENT_REOPEN_EVENT,
  clearAnalyticsCookies,
  readConsent,
  writeConsent,
  type ConsentStatus,
} from '@/src/lib/consent';

interface ConsentGateProps {
  measurementId: string;
  /** Load the Google tag at all — false in development, so local browsing
   *  never reaches production analytics. The banner still renders. */
  analyticsEnabled: boolean;
}

// The Google tag, mounted only once consent is granted. The consent-mode
// defaults still go in first: they cost nothing today and mean an ads tag
// added later inherits a denied baseline instead of silently tracking.
const GoogleAnalytics = ({ measurementId }: { measurementId: string }) => (
  <>
    <Script id="ga-consent-config" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied'
        });
        gtag('consent', 'update', { analytics_storage: 'granted' });
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `}
    </Script>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  </>
);

export const ConsentGate = ({ measurementId, analyticsEnabled }: ConsentGateProps) => {
  // Undecided until the effect reads storage: the server renders no banner and
  // no tag, so hydration matches and nothing loads before the answer is known.
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setStatus(stored);
    setVisible(stored === null);
  }, []);

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((next: ConsentStatus) => {
    writeConsent(next);
    // Withdrawing has to actually remove what a previous "accept" left behind.
    if (next === 'denied') clearAnalyticsCookies();
    setStatus(next);
    setVisible(false);
  }, []);

  return (
    <>
      {analyticsEnabled && status === 'granted' && (
        <GoogleAnalytics measurementId={measurementId} />
      )}

      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          className="fixed bottom-0 left-0 right-0 z-[60] bg-charcoal-black text-white border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.18)]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="min-w-0">
              <p id="cookie-consent-title" className="text-sm font-medium text-white">
                We use cookies
              </p>
              <p id="cookie-consent-body" className="text-sm text-white/70 mt-1">
                Analytics cookies help us understand how people find and use Prodlog. They&rsquo;re
                optional: decline and nothing is stored on your device beyond what the site needs to
                work. See our{' '}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Equal weight by design: a decline that is harder to find than
                accept is the thing regulators actually fine people for. */}
            <div className="flex gap-3 shrink-0 md:ml-auto">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="flex-1 md:flex-none border border-white/40 hover:border-white/70 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="flex-1 md:flex-none bg-white hover:bg-white/90 text-charcoal-black px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
