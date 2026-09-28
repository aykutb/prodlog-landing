import React from 'react';
import { StripMarker } from './StripMarker';

export interface LedgerRowImage {
  src: string;
  alt: string;
  /** Images beyond the first, shown as "+N". */
  more?: number;
}

export interface LedgerRowProps {
  /** The gutter's date, as the dashboard writes it: "Sep 18", or "Sep 18, 2025" in another year. */
  date: string;
  /** Machine-readable date for the <time> element (YYYY-MM-DD). */
  dateTime: string;
  /** The muted line under the date. The dashboard shows the entry's product there. */
  label?: string;
  title: string;
  /** The first paragraph of the body; capped at three lines. */
  preview?: string;
  /** Beside the row from sm, under the text below it. */
  image?: LedgerRowImage;
  /** "What happened next", shown as a sage strip and text. */
  outcome?: string | null;
  /**
   * Show "Add an outcome" when there is no outcome. The dashboard's log rows
   * never ask (DECISIONS 2026-09-26); its 1:1, review and entry screens do.
   */
  askOutcome?: boolean;
  /** Extra classes for the outcome's strip marker, e.g. to draw it in. */
  outcomeClassName?: string;
  /** The row whose panel is open: mauve-soft. */
  active?: boolean;
  /** The title's element. `h3` as in the dashboard; `p` where no h2 precedes the row. */
  titleAs?: 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One line of the logbook, a visual twin of prodlog2 components/ui/log-row.tsx:
 * an 88px gutter with the date and a label on the left, the work on the
 * right, an optional image frame. Static: nothing here is a control.
 * Use inside `LedgerRows`, which draws the hairlines between rows.
 */
export const LedgerRow = ({ date, dateTime, label, title, preview, image, outcome, outcomeClassName, askOutcome = false, active = false, titleAs: Title = 'h3', className = '', style }: LedgerRowProps) => (
  <li
    style={style}
    className={`relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 px-2 py-3.5 sm:grid-cols-[auto_minmax(0,1fr)_auto] ${
      active ? 'bg-mauve-soft' : ''
    } ${className}`}
  >
    <div className="row-span-2 w-gutter">
      <time dateTime={dateTime} className="block text-body tabular-nums text-ink">
        {date}
      </time>
      {label && <p className="mt-0.5 truncate text-meta text-muted-foreground">{label}</p>}
    </div>
    <div className="min-w-0 flex-1 space-y-1">
      <Title className="text-row-title font-semibold text-ink">{title}</Title>
      {preview && (
        <div className="pt-0.5">
          <p className="line-clamp-3 text-body text-ink">{preview}</p>
        </div>
      )}
      {outcome ? (
        <div className="flex min-h-5 items-center">
          <span className="inline-flex max-w-full items-center gap-2 text-meta text-sage-strong">
            <StripMarker tone="sage" className={outcomeClassName} />
            <span className="truncate">{outcome}</span>
          </span>
        </div>
      ) : (
        askOutcome && (
          <div className="flex min-h-5 items-center">
            <span className="inline-flex items-center gap-1.5 text-meta text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add an outcome
            </span>
          </div>
        )
      )}
    </div>
    {image && (
      <div className="col-start-2 mt-3 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:mt-0">
        <div className="relative h-row-media-h w-row-media overflow-hidden rounded-lg border border-border bg-muted">
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          {image.more ? (
            <span className="absolute bottom-1 right-1 rounded-md bg-ink px-1.5 text-meta tabular-nums text-on-ink">
              <span aria-hidden="true">+{image.more}</span>
              <span className="sr-only">{image.more === 1 ? 'and 1 more image' : `and ${image.more} more images`}</span>
            </span>
          ) : null}
        </div>
      </div>
    )}
  </li>
);

/** The list that holds rows: hairlines between them, no box around them. */
export const LedgerRows = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={`divide-y divide-border ${className}`} {...props}>
    {children}
  </ul>
);
