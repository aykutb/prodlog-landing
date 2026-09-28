'use client';

import React from 'react';
import { requestHeroTakeover } from '@/src/components/ledger-hero/heroTakeover';
import { trackEvent } from '@/src/lib/analytics';
import { SIGNUP_URL } from '@/src/lib/preview';

const BUTTON = 'inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background';

/**
 * Under the hero's copy: "Paste your notes" hands the demo frame to the
 * visitor (the scene stops, the paste box takes focus), and "Start free"
 * is the signup link.
 */
export const HeroCtas = () => (
  <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
    <button type="button" onClick={requestHeroTakeover} className={`${BUTTON} bg-ink text-on-ink hover:bg-ink/90`}>
      Paste your notes
    </button>
    <a href={SIGNUP_URL} onClick={() => trackEvent('preview_signup_click', { surface: 'home_cta', entry_count: 0, picked_day: false })} className={`${BUTTON} border border-border bg-surface text-ink hover:border-ink/30`}>
      Start free
    </a>
  </div>
);
