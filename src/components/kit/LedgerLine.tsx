import React from 'react';

interface LedgerLineProps {
  /** Today, as the gutter writes it: "Sep 27". */
  date: string;
  dateTime: string;
  /** The input itself (a textarea), or nothing for the static line. */
  children?: React.ReactNode;
  /** Ink hairline, as when the line has focus. */
  focused?: boolean;
  className?: string;
}

/**
 * The log's next line, its first row (prodlog2 features/log/LedgerLine.tsx):
 * today's date in the gutter with a dotted underline, "What moved today?" in
 * the content column, a hairline under it that turns ink on focus. Pass a
 * textarea as children to make it the paste area; style it with
 * LEDGER_LINE_INPUT.
 */
export const LedgerLine = ({ date, dateTime, children, focused = false, className = '' }: LedgerLineProps) => (
  <div className={`flex items-start gap-4 border-b px-2 py-2 transition-colors focus-within:border-ink ${focused ? 'border-ink' : 'border-border'} ${className}`}>
    <time
      dateTime={dateTime}
      className="w-gutter shrink-0 py-1.5 text-body tabular-nums text-ink underline decoration-border decoration-dotted underline-offset-4"
    >
      {date}
    </time>
    {children ?? <span className="min-w-0 flex-1 py-1.5 text-row-title text-muted-foreground">What moved today?</span>}
  </div>
);

/** The line's input style: row-title size, semibold once typed, muted placeholder, no box. */
export const LEDGER_LINE_INPUT =
  'min-h-0 min-w-0 flex-1 resize-none bg-transparent py-1.5 text-row-title font-semibold text-ink placeholder:font-normal placeholder:text-muted-foreground focus:outline-none';
