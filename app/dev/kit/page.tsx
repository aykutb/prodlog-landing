import React from 'react';
import { notFound } from 'next/navigation';
import { LedgerDivider, LedgerLine, LedgerRow, LedgerRows, LogFilter, OccasionCard, YearDivider } from '@/src/components/kit';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { formatShort, formatWithWeekday, plural, priyaLog } from '@/src/content/demo/priya';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

/** Development only: the marketing kit, fed by Priya's demo data. Like prodlog2's /dev/ui. */
export default function KitPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  const log = priyaLog();
  const { today } = log;
  const rows = log.ledger.slice(0, 7);

  return (
    <div className="mx-auto max-w-page space-y-12 px-4 pb-24 pt-28 sm:px-6">
      <h1 className="font-serif text-page-title font-semibold text-ink">Marketing kit</h1>

      <section className="space-y-3">
        <h2 className="text-body font-semibold text-ink">OccasionCard</h2>
        <div className="max-w-column">
          <OccasionCard
            title="Your 1:1"
            aside={formatWithWeekday(log.nextOneOnOne, today)}
            context={`${plural(log.sinceLast.length, 'entry', 'entries')} since your last 1:1 on ${formatShort(log.lastOneOnOne, today)}.`}
            windows={log.windows}
            caption={log.caption}
            action="Prep my 1:1"
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-body font-semibold text-ink">Your log</h2>
          <LogFilter />
        </div>
        <div className="max-w-column">
          <LedgerLine date={formatShort(today, today)} dateTime={today} />
          <LedgerRows>
            {rows.map((item, i) =>
              item.type === 'entry' ? (
                <LedgerRow
                  key={item.entry.id}
                  date={formatShort(item.entry.date, today)}
                  dateTime={item.entry.date}
                  label={item.entry.product}
                  title={item.entry.title}
                  preview={item.entry.preview}
                  outcome={item.entry.outcome}
                  image={item.entry.image}
                  active={i === 0}
                />
              ) : item.type === 'divider' ? (
                <LedgerDivider key={item.date} label={item.label} />
              ) : null,
            )}
          </LedgerRows>
          <YearDivider year={2025} />
          <LedgerRows>
            <LedgerRow date="Dec 9, 2025" dateTime="2025-12-09" label="Refunds & Disputes" title="Helped with the merchant refund flow spec" preview="Mostly took notes in the sessions with Rob's team." askOutcome />
          </LedgerRows>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-body font-semibold text-ink">ProductShot (missing file)</h2>
        <ProductShot name="log-home.png" alt="The Log home" width={1440} height={1000} url="dashboard.prodlog.app/log" />
      </section>
    </div>
  );
}
