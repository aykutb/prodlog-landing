import React from 'react';

/**
 * A past 1:1 or review ruled across the log (prodlog2 LogFeed.tsx `Divider`):
 * a dashed hairline with a centered label, "Your 1:1, Sep 18". Use inside
 * `LedgerRows` (it renders an <li>) or pass `as="div"` elsewhere.
 */
export const LedgerDivider = ({ label, as = 'li', className = '' }: { label: string; as?: 'li' | 'div'; className?: string }) => {
  const rule = (
    <div role="separator" aria-label={label} className={`flex items-center gap-3 py-2 text-meta text-muted-foreground ${className}`}>
      <span className="h-px flex-1 border-t border-dashed border-border" aria-hidden="true" />
      <span aria-hidden="true">{label}</span>
      <span className="h-px flex-1 border-t border-dashed border-border" aria-hidden="true" />
    </div>
  );
  // A list may hold only list items, so inside LedgerRows the separator sits within one.
  return as === 'li' ? <li className="list-none">{rule}</li> : rule;
};
