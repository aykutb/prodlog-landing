import React from 'react';
import { APP_STORE_URL } from '@/src/lib/appStore';

/**
 * The official Apple "Download on the App Store" badge, linking to the app.
 * Rendered at Apple's 40px minimum height; the SVG is 119.66 x 40, so the
 * width is fixed to keep the aspect ratio and avoid a layout shift. Not a
 * styled button and never redrawn: the asset is Apple's own file.
 */
export const AppStoreBadge = ({ className = '' }: { className?: string }) => (
  <a
    href={APP_STORE_URL}
    className={`inline-block shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2 ${className}`}
  >
    <img
      src="/badges/app-store-badge.svg"
      alt="Download on the App Store"
      width={120}
      height={40}
      className="h-10 w-auto"
    />
  </a>
);
