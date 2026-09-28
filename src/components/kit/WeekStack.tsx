import React from 'react';
import { LogoStrip } from '@/src/brand';

/** A strip a scene drops onto the current stack: just landed (bright on-ink), in its tone, or lifting away. */
export interface IncomingStrip {
  outcome: boolean;
  phase: 'off' | 'bright' | 'settled' | 'lifted';
}

export interface StackWindow {
  /** Stable key, e.g. the window's start date. */
  key: string;
  /** One strip per entry: true when the entry has an outcome (sage), false otherwise (mauve). */
  strips: boolean[];
  /** The label under the tick: a month where one starts, "Now" for the current window. */
  axisLabel?: string;
  /** The current window: on the right, with a dashed slot on top. */
  current?: boolean;
  /** Drop the current window's newest strip in (motion-safe only). */
  dropLast?: boolean;
  /** Strips a scene adds above the others, beneath the dashed slot. */
  incoming?: IncomingStrip[];
}

/** Strips drawn per stack; a busier window still says its full count. */
const MAX_STRIPS = 8;

/** One strip is 12px tall with 3px between; the stack has 4px above, 3px below and a 1px baseline. */
const stackHeight = (items: number) => `${items * 12 + (items - 1) * 3 + 8}px`;

const INCOMING: Record<IncomingStrip['phase'], string> = {
  off: 'hidden',
  // Drops 16px onto the stack as it mounts; the fill eases from on-ink to its tone once it settles.
  bright: 'starting:-translate-y-4 starting:opacity-0 [&_path]:fill-on-ink',
  settled: 'starting:-translate-y-4 starting:opacity-0',
  lifted: '-translate-y-4 opacity-0',
};

/**
 * The ink card's chart, a static twin of prodlog2 features/log/WeekStack.tsx:
 * a baseline with a tick per window, and on it one of the logo's strips per
 * entry, sage with an outcome and mauve otherwise (the on-ink tints). The
 * current window sits on the right with a dashed slot. The caption carries
 * the words, so color is never the only signal.
 *
 * `minStrips` holds the stacks at a fixed height (counting the dashed slot),
 * so strips a scene adds never move what is under the chart.
 */
export const WeekStack = ({ windows, caption, minStrips }: { windows: StackWindow[]; caption?: React.ReactNode; minStrips?: number }) => {
  if (windows.length === 0) return null;
  return (
    <figure className="mt-4 space-y-2">
      <ul className="flex" aria-hidden="true">
        {windows.map((w) => {
          const shown = w.strips.slice(-MAX_STRIPS);
          return (
            <li key={w.key} className="flex min-w-0 flex-1 flex-col items-center">
              <div
                className="flex min-h-9 w-full flex-1 flex-col-reverse items-center gap-[3px] rounded-t-sm border-b border-on-ink-muted px-1 pb-[3px] pt-1"
                style={minStrips ? { minHeight: stackHeight(minStrips) } : undefined}
              >
                {shown.map((outcome, i) => (
                  <LogoStrip
                    key={i}
                    shape={i + w.key.charCodeAt(w.key.length - 1)}
                    tone={outcome ? 'sage' : 'mauve'}
                    className={`h-3 w-full max-w-9 ${w.current && w.dropLast && i === shown.length - 1 ? 'motion-safe:animate-strip-drop' : ''}`}
                  />
                ))}
                {w.incoming?.map((strip, i) => (
                  <LogoStrip
                    key={`incoming-${i}`}
                    shape={shown.length + i + w.key.charCodeAt(w.key.length - 1)}
                    tone={strip.outcome ? 'sage' : 'mauve'}
                    className={`h-3 w-full max-w-9 transition-[opacity,transform] duration-[550ms] ease-out [&_path]:transition-[fill] [&_path]:duration-[1200ms] ${INCOMING[strip.phase]}`}
                  />
                ))}
                {w.current && <LogoStrip shape={shown.length + 1} tone="dashed" className="h-3 w-full max-w-9" />}
              </div>
              <span className="h-1.5 w-px bg-on-ink-muted" />
              <span className={`h-4 whitespace-nowrap text-meta leading-4 ${w.current ? 'text-on-ink' : 'text-on-ink-muted'}`}>{w.axisLabel ?? ''}</span>
            </li>
          );
        })}
      </ul>
      {caption && <figcaption className="text-meta text-on-ink-muted">{caption}</figcaption>}
    </figure>
  );
};
