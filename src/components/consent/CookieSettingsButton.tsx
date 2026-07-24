'use client';

import React from 'react';
import { openCookieSettings } from '@/src/lib/consent';

/** Footer entry point for changing an existing choice — consent has to be as
 *  easy to withdraw as it was to give. */
export const CookieSettingsButton = ({ className = '' }: { className?: string }) => (
  <button type="button" onClick={openCookieSettings} className={className}>
    Cookie settings
  </button>
);
