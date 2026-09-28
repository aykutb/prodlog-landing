import React from 'react';

export type StripTone = 'sage' | 'mustard' | 'mauve';

interface StripMarkerProps {
  /** Sage means an outcome; mustard an open question; mauve means you and your rhythm. */
  tone: StripTone;
  /** A dashed strip marks something still missing. */
  dashed?: boolean;
  className?: string;
}

const SOLID: Record<StripTone, string> = { sage: 'bg-sage', mustard: 'bg-mustard', mauve: 'bg-mauve' };
const DASHED: Record<StripTone, string> = { sage: 'border-sage', mustard: 'border-mustard', mauve: 'border-mauve' };

/**
 * The small strip from the logo (prodlog2 components/ui/strip-marker.tsx):
 * 16x4px, fully rounded. Decorative; the text next to it carries the meaning.
 */
export const StripMarker = ({ tone, dashed = false, className = '' }: StripMarkerProps) => (
  <span
    aria-hidden="true"
    className={`inline-block w-4 shrink-0 rounded-full ${
      dashed ? `h-0 border-t-2 border-dashed bg-transparent ${DASHED[tone]}` : `h-1 ${SOLID[tone]}`
    } ${className}`}
  />
);
