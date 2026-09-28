import React from 'react';
import {
  LOGOMARK_HEIGHT,
  LOGOMARK_SIZES,
  LOGOMARK_STRIPS,
  LOGOMARK_WIDTH,
  logomarkLayout,
  type LogomarkSize,
  type LogomarkVariant,
} from './definition';

interface LogomarkProps {
  /** The mark's height: sm 20, md 24, lg 28, xl 64 px. */
  size?: LogomarkSize;
  /** `strips` (the default) is the mark alone; `tile` puts it on an ink square, as the app icons do. */
  variant?: Exclude<LogomarkVariant, 'square'>;
  /** Next to the wordmark the mark is decorative; on its own it is an image labelled "Prodlog". */
  decorative?: boolean;
  className?: string;
}

/** The Prodlog logomark, drawn from src/brand/definition.ts in the token colors (mirrors prodlog2 Logomark.tsx). */
export const Logomark = ({ size = 'md', variant = 'strips', decorative = false, className = '' }: LogomarkProps) => {
  const layout = logomarkLayout(variant);
  const height = LOGOMARK_SIZES[size];
  const width = variant === 'tile' ? height : Math.round((height * LOGOMARK_WIDTH * 10) / LOGOMARK_HEIGHT) / 10;
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'Prodlog' };

  return (
    <svg viewBox={layout.viewBox} width={width} height={height} fill="none" focusable="false" className={`shrink-0 ${className}`} {...a11y}>
      {layout.tile && <rect width={layout.tile.size} height={layout.tile.size} fill={`hsl(var(--${layout.tile.color}))`} />}
      <g transform={layout.transform ?? undefined}>
        {LOGOMARK_STRIPS.map((strip) => (
          <path key={strip.color} d={strip.d} fill={`hsl(var(--${strip.color}))`} />
        ))}
      </g>
    </svg>
  );
};
