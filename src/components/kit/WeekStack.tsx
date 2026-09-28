import React from 'react';
import { LogoStrip } from '@/src/brand';

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
}

/** Strips drawn per stack; a busier window still says its full count. */
const MAX_STRIPS = 8;

/**
 * The ink card's chart, a static twin of prodlog2 features/log/WeekStack.tsx:
 * a baseline with a tick per window, and on it one of the logo's strips per
 * entry, sage with an outcome and mauve otherwise (the on-ink tints). The
 * current window sits on the right with a dashed slot. The caption carries
 * the words, so color is never the only signal.
 */
export const WeekStack = ({ windows, caption }: { windows: StackWindow[]; caption?: string | null }) => {
  if (windows.length === 0) return null;
  return (
    <figure className="mt-4 space-y-2">
      <ul className="flex" aria-hidden="true">
        {windows.map((w) => {
          const shown = w.strips.slice(-MAX_STRIPS);
          return (
            <li key={w.key} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex min-h-9 w-full flex-1 flex-col-reverse items-center gap-[3px] rounded-t-sm border-b border-on-ink-muted px-1 pb-[3px] pt-1">
                {shown.map((outcome, i) => (
                  <LogoStrip
                    key={i}
                    shape={i + w.key.charCodeAt(w.key.length - 1)}
                    tone={outcome ? 'sage' : 'mauve'}
                    className={`h-3 w-full max-w-9 ${w.current && w.dropLast && i === shown.length - 1 ? 'motion-safe:animate-strip-drop' : ''}`}
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
