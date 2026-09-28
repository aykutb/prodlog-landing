import React from 'react';
import { WeekStack, type StackWindow } from './WeekStack';

export interface OccasionCardProps {
  /** "Your 1:1", "1:1 with Elena", "When's your 1:1?" */
  title: React.ReactNode;
  /** The date beside the title: "Thu, Oct 1". */
  aside?: React.ReactNode;
  /** One muted line: "3 entries since your last 1:1 on Sep 24." */
  context?: React.ReactNode;
  /** The strip chart under the header. */
  windows?: StackWindow[];
  caption?: React.ReactNode;
  /** Hold the chart at this many strips tall, so strips a scene adds never move the card. */
  stackMinStrips?: number;
  /** The white button: "Prep my 1:1". A string renders a non-interactive button shape; pass an element for a real link. */
  action?: React.ReactNode;
  /** Anything else under the header, such as weekday chips. */
  children?: React.ReactNode;
  className?: string;
}

/** The inverted button on ink (prodlog2 button.tsx `inverted`): on-ink fill, ink text. */
export const INK_BUTTON =
  'inline-flex h-9 items-center justify-center rounded-lg bg-on-ink px-4 text-body font-medium text-ink transition-colors hover:bg-on-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

/**
 * The ink "Your 1:1" card, a twin of prodlog2's Tile + OneOnOneTile:
 * 12px radius, ink with on-ink text, a serif 20/26 semibold title with the
 * date on its right, one muted line of context, the week stack and a white
 * button. The one dark surface on a product mock.
 */
export const OccasionCard = ({ title, aside, context, windows, caption, stackMinStrips, action, children, className = '' }: OccasionCardProps) => (
  <div className={`rounded-xl bg-ink p-5 text-on-ink sm:p-6 ${className}`}>
    <div className="space-y-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-serif text-tile-title font-semibold text-on-ink">{title}</p>
        {aside && <p className="text-body text-on-ink">{aside}</p>}
      </div>
      {context && <p className="text-body text-on-ink-muted">{context}</p>}
    </div>
    {windows && <WeekStack windows={windows} caption={caption} minStrips={stackMinStrips} />}
    {children}
    {action &&
      (typeof action === 'string' ? (
        <span aria-hidden="true" className={`mt-5 ${INK_BUTTON}`}>
          {action}
        </span>
      ) : (
        <div className="mt-5">{action}</div>
      ))}
  </div>
);
