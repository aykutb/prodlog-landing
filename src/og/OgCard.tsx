import React from 'react';
import fs from 'fs';
import path from 'path';
import { LOGOMARK_HEIGHT, LOGOMARK_STRIPS, STRIP_BOXES, WORDMARK_OUTLINE, lockupLayout } from '@/src/brand/definition';
import { HEX } from './tokens';

export const OG_SIZE = { width: 1200, height: 630 } as const;

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), 'src/og/fonts', file));

/** Fonts for ImageResponse: the site's serif, the only face on the card. */
export const ogFonts = () => [
  { name: 'Source Serif 4', data: font('SourceSerif4-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Source Serif 4', data: font('SourceSerif4-SemiBold.ttf'), weight: 600 as const, style: 'normal' as const },
];

const STRIP_FILL: Record<string, string> = { sage: HEX.sage, mustard: HEX.mustard, mauve: HEX.mauve };

/** The lockup on ink: the three strips in the logo's colors and the wordmark outline in on-ink. */
export const Lockup = ({ height }: { height: number }) => {
  const layout = lockupLayout();
  const width = (height * layout.width) / LOGOMARK_HEIGHT;
  return (
    <svg width={width} height={height} viewBox={layout.viewBox}>
      {LOGOMARK_STRIPS.map((s) => (
        <path key={s.color} d={s.d} fill={STRIP_FILL[s.color]} />
      ))}
      <path d={WORDMARK_OUTLINE.d} fill={HEX.onInk} transform={layout.wordmarkTransform} />
    </svg>
  );
};

/** One strip of the mark, stretched, as the 1:1 card's chart draws it. */
const Strip = ({ shape, color, width, height }: { shape: number; color: string; width: number; height: number }) => {
  const i = shape % 3;
  return (
    <svg width={width} height={height} viewBox={STRIP_BOXES[i]} preserveAspectRatio="none">
      <path d={LOGOMARK_STRIPS[i].d} fill={color} />
    </svg>
  );
};

/** A plausible rhythm: entries per window, with an outcome or not. The last window is "Now". */
const WINDOWS: boolean[][] = [
  [false],
  [true, false],
  [],
  [true],
  [false, true, false],
  [true],
  [false, false],
  [true, true],
  [false],
  [true, false, true],
  [false, true],
  [true, true, false],
];

const Chart = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', height: 84, borderBottom: `2px solid ${HEX.onInkMuted}` }}>
      {WINDOWS.map((strips, w) => (
        <div key={w} style={{ display: 'flex', flex: 1, flexDirection: 'column-reverse', alignItems: 'center', paddingBottom: 5 }}>
          {strips.map((outcome, i) => (
            <div key={i} style={{ display: 'flex', marginTop: 5 }}>
              <Strip shape={w + i} color={outcome ? HEX.sageOnInk : HEX.mauveOnInk} width={58} height={18} />
            </div>
          ))}
          {w === WINDOWS.length - 1 && (
            <div style={{ display: 'flex', marginTop: 5, width: 58, height: 18, border: `2px dashed ${HEX.onInkMuted}`, borderRadius: 6 }} />
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex' }}>
      {WINDOWS.map((_, w) => (
        <div key={w} style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 2, height: 10, backgroundColor: HEX.onInkMuted }} />
          {w === WINDOWS.length - 1 && <div style={{ display: 'flex', fontSize: 20, color: HEX.onInk, marginTop: 4 }}>Now</div>}
        </div>
      ))}
    </div>
  </div>
);

/**
 * The shared OG card: the ink occasion card as a motif. The lockup on top,
 * a serif headline (400 at display size) with one muted line, and the strip
 * chart along the bottom.
 */
export const OgCard = ({ headline, sub }: { headline: string; sub?: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '60px 72px 48px',
      backgroundColor: HEX.ink,
      color: HEX.onInk,
      fontFamily: 'Source Serif 4',
    }}
  >
    <Lockup height={44} />
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
      <div style={{ display: 'flex', fontSize: 64, lineHeight: 1.12, fontWeight: 400 }}>{headline}</div>
      {sub && <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.35, marginTop: 20, color: HEX.onInkMuted }}>{sub}</div>}
    </div>
    <Chart />
  </div>
);

