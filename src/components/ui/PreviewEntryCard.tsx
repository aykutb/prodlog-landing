import React from 'react';

export interface PreviewEntry {
  date: string;
  title: string;
  ownership: string;
  outcome: string | null;
  missingOutcome: boolean;
}

/**
 * One parsed entry, rendered in the same visual language as the hero timeline
 * cards. The empty outcome slot is deliberate: when the parser finds no
 * result, we show that honestly instead of inventing one.
 */
export const PreviewEntryCard = ({ entry }: { entry: PreviewEntry }) => {
  const hasOutcome = !entry.missingOutcome && !!entry.outcome?.trim();

  return (
    <li className="rounded-lg border border-divider bg-white p-4 text-left shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {entry.date && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-divider text-muted flex items-center gap-1">
            <span className="text-deep-ink-blue" aria-hidden="true">📅</span> {entry.date}
          </span>
        )}
        {entry.ownership && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-deep-ink-blue/10 text-deep-ink-blue font-medium">
            {entry.ownership}
          </span>
        )}
      </div>

      <h3 className="text-primary font-semibold text-sm font-serif mb-2">{entry.title}</h3>

      {hasOutcome ? (
        <div className="flex items-start gap-1.5 px-2.5 py-1.5 rounded bg-sage-green/10 border border-sage-green/20 w-fit max-w-full">
          <span className="text-sage-green text-[10px] leading-4" aria-hidden="true">↑</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[8px] text-muted leading-none mb-0.5">Outcome</span>
            <span className="text-xs text-sage-green font-medium leading-snug">{entry.outcome}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-dashed border-warm-amber/40 bg-warm-amber/5 w-fit max-w-full">
          <span className="text-[8px] text-muted leading-none">Outcome</span>
          <span className="text-xs text-warm-amber">Add the result while you still remember.</span>
        </div>
      )}
    </li>
  );
};
