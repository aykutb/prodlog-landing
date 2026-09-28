import React from 'react';

/**
 * Where the log crosses into an earlier year (prodlog2 LogFeed.tsx `YearRule`):
 * a hairline with the year on it. None for the current year. Sits between
 * two `LedgerRows` lists, not inside one.
 */
export const YearDivider = ({ year, className = '' }: { year: string | number; className?: string }) => (
  <div className={`flex items-center gap-3 px-2 pb-2 pt-8 ${className}`}>
    <span className="h-px w-4 bg-border" aria-hidden="true" />
    <p className="text-meta font-medium tabular-nums text-muted-foreground">{year}</p>
    <span className="h-px flex-1 bg-border" aria-hidden="true" />
  </div>
);
