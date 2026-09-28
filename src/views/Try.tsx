import React from 'react';
import { PageHeader } from '@/src/components/ui';
import { LedgerHero } from '@/src/components/ledger-hero/LedgerHero';
import { LedgerRow, LedgerRows } from '@/src/components/kit';
import { entryById, formatShort, priyaLog, todayIso } from '@/src/content/demo/priya';

/** Three lines the way people actually write them, and what Prodlog makes of them. */
const MESSY_NOTE = ['cut manual refund review, rob agreed, frees ~3 eng wks', 'chargeback dash v2 out w sam. finance escalations down', 'evidence checklist live?? check w support'];

const BeforeAfter = ({ today }: { today: string }) => {
  const log = priyaLog(today);
  const rows = ['cut-manual-review', 'chargeback-dashboard'].map((id) => entryById(id, log)!);
  return (
    <figure className="mx-auto mb-10 grid max-w-column items-center gap-3 md:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)] md:gap-4">
      <div className="rounded-lg border border-dashed border-border bg-surface px-4 py-3 font-mono text-meta leading-relaxed text-muted-foreground">
        {MESSY_NOTE.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <span aria-hidden="true" className="mx-auto text-muted-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <div className="rounded-lg border border-border bg-background px-1">
        <LedgerRows>
          {rows.map((e) => (
            <LedgerRow key={e.id} date={formatShort(e.date, today)} dateTime={e.date} label={e.product} title={e.title} outcome={e.outcome} titleAs="p" />
          ))}
        </LedgerRows>
      </div>
      <figcaption className="sr-only">A messy three-line note on the left becomes two dated entries with outcomes on the right.</figcaption>
    </figure>
  );
};

export const TryPage = () => {
  const today = todayIso();
  return (
    <div className="pb-24 px-4">
      <PageHeader
        title="Paste in your notes and see what comes out."
        subtitle="Your Slack thread, your phone note, your half-finished doc. Nothing is saved and nothing is shared. This runs once and disappears. Takes about 10 seconds."
      />
      <BeforeAfter today={today} />
      <LedgerHero variant="try" today={today} />
    </div>
  );
};
