import React from 'react';
import { LOGOMARK_STRIPS, STRIP_BOXES } from './definition';

export type LogoStripTone = 'sage' | 'mauve' | 'dashed';

interface LogoStripProps {
  /** Which of the mark's three strips lends its shape, so a stack of them is slightly irregular. */
  shape: number;
  /** Sage for an entry with an outcome, mauve otherwise, or the dashed empty slot. */
  tone: LogoStripTone;
  /**
   * `ink` (the default) uses the on-ink tints, as on the dashboard's navy
   * tile. `light` uses the logo's own values, for strips drawn on the page.
   */
  surface?: 'ink' | 'light';
  className?: string;
  style?: React.CSSProperties;
}

const FILLS: Record<'ink' | 'light', Record<LogoStripTone, string>> = {
  ink: {
    sage: 'fill-sage-on-ink',
    mauve: 'fill-mauve-on-ink',
    dashed: 'fill-none stroke-on-ink-muted [stroke-dasharray:3_2]',
  },
  light: {
    sage: 'fill-sage',
    mauve: 'fill-mauve',
    dashed: 'fill-none stroke-muted-foreground [stroke-dasharray:3_2]',
  },
};

/**
 * One strip of the logomark, stretched to the box it is given: the unit of
 * the week stack (mirrors prodlog2 src/brand/LogoStrip.tsx). Decorative; the
 * surrounding element carries the words.
 */
export const LogoStrip = ({ shape, tone, surface = 'ink', className = '', style }: LogoStripProps) => {
  const index = ((shape % 3) + 3) % 3;
  return (
    <svg viewBox={STRIP_BOXES[index]} preserveAspectRatio="none" aria-hidden="true" focusable="false" className={`block ${className}`} style={style}>
      <path d={LOGOMARK_STRIPS[index].d} vectorEffect="non-scaling-stroke" className={FILLS[surface][tone]} />
    </svg>
  );
};
