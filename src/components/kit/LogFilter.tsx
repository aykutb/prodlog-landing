import React from 'react';

export type LogFilterValue = 'all' | 'one_on_one' | 'review';

const SEGMENTS: Array<{ value: LogFilterValue; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'one_on_one', label: '1:1 preps' },
  { value: 'review', label: 'Reviews' },
];

/**
 * The log's view switch (prodlog2 components/ui/segmented-control.tsx with
 * the labels from features/log/model/ledger.ts). Visual only: the selected
 * segment is mauve-soft with ink text.
 */
export const LogFilter = ({ value = 'all', className = '' }: { value?: LogFilterValue; className?: string }) => (
  <div aria-hidden="true" className={`inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 ${className}`}>
    {SEGMENTS.map((segment) => (
      <span
        key={segment.value}
        className={`rounded-md px-2.5 py-1 text-meta font-medium ${
          segment.value === value ? 'bg-mauve-soft text-ink' : 'text-muted-foreground'
        }`}
      >
        {segment.label}
      </span>
    ))}
  </div>
);
