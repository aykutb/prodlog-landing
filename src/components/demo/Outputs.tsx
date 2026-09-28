import React from 'react';
import { LedgerRow, LedgerRows, StripMarker } from '@/src/components/kit';
import {
  ONE_ON_ONE_ASK,
  PRIYA,
  RESUME_BULLETS,
  REVIEW,
  STAR_STORY,
  entryById,
  formatShort,
  formatWithWeekday,
  plural,
  type PriyaLog,
} from '@/src/content/demo/priya';

/**
 * What the log gives back, drawn from Priya's demo data: an entry pair, her
 * 1:1 prep, a review draft with the entries it drew on, and the job-change
 * outputs. Static mocks, shared by the homepage and the use-case pages.
 */

export const WeekOutput = ({ log }: { log: PriyaLog }) => {
  const rows = ['cut-manual-review', 'chargeback-dashboard'].map((id) => entryById(id, log)!);
  return (
    <div className="rounded-xl border border-border bg-background px-2 py-1 sm:px-4">
      <LedgerRows>
        {rows.map((e) => (
          <LedgerRow key={e.id} date={formatShort(e.date, log.today)} dateTime={e.date} label={e.product} title={e.title} preview={e.preview} outcome={e.outcome} image={e.image} />
        ))}
      </LedgerRows>
    </div>
  );
};

const Check = () => (
  <span aria-hidden="true" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-ink text-on-ink">
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  </span>
);

export const OneOnOneOutput = ({ log }: { log: PriyaLog }) => {
  const gaps = log.sinceLast.filter((e) => !e.outcome);
  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-serif text-tile-title font-semibold text-ink">Your 1:1</p>
        <p className="text-body text-muted-foreground">{formatWithWeekday(log.nextOneOnOne, log.today)}</p>
      </div>
      <p className="mt-1 text-body text-muted-foreground">Since your last 1:1 on {formatShort(log.lastOneOnOne, log.today)}</p>
      <ul className="mt-4 space-y-3">
        {log.sinceLast.map((e) => (
          <li key={e.id} className="flex gap-3">
            <Check />
            <div className="min-w-0">
              <p className="text-row-title font-semibold text-ink">{e.title}</p>
              {e.outcome ? (
                <p className="mt-0.5 inline-flex items-center gap-2 text-meta text-sage-strong">
                  <StripMarker tone="sage" />
                  {e.outcome}
                </p>
              ) : (
                <p className="mt-0.5 inline-flex items-center gap-2 text-meta text-mustard-strong">
                  <StripMarker tone="mustard" dashed />
                  No outcome yet
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {gaps.length > 0 && (
        <p className="mt-4 rounded-lg bg-mustard-soft px-3 py-2 text-meta text-ink">
          Gaps: {plural(gaps.length, 'entry has', 'entries have')} no outcome yet.
        </p>
      )}
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-body font-semibold text-ink">What do you need from your manager?</p>
        <p className="mt-1 text-body text-ink">{ONE_ON_ONE_ASK}</p>
      </div>
      <span aria-hidden="true" className="mt-5 inline-flex h-9 items-center rounded-lg bg-ink px-4 text-body font-medium text-on-ink">
        Copy for your 1:1 doc
      </span>
    </div>
  );
};

export const ReviewOutput = ({ log }: { log: PriyaLog }) => (
  <div className="rounded-xl border border-border bg-surface p-5 sm:p-8">
    <p className="text-meta text-muted-foreground">
      {REVIEW.title}, {REVIEW.period}
    </p>
    <div className="mt-4 space-y-6">
      {REVIEW.drafts.map((draft) => (
        <section key={draft.question}>
          <h4 className="font-serif text-panel-title font-semibold text-ink">{draft.question}</h4>
          <p className="mt-2 text-body leading-relaxed text-ink">{draft.answer}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-meta text-muted-foreground">Drew on</span>
            {draft.drewOn.map((id) => (
              <span key={id} className="rounded-md border border-border bg-muted px-2 py-0.5 text-meta text-ink">
                {entryById(id, log)?.title}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export const JobOutput = () => (
  <div className="grid gap-4 lg:grid-cols-5">
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:col-span-3">
      <p className="font-serif text-tile-title font-semibold text-ink">{PRIYA.name}</p>
      <p className="text-body text-muted-foreground">{PRIYA.title}</p>
      <p className="mt-4 border-b border-border pb-1 text-meta font-medium text-muted-foreground">Experience</p>
      <p className="mt-3 text-body font-semibold text-ink">{PRIYA.product}, payments infrastructure</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-body text-ink">
        {RESUME_BULLETS.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:col-span-2">
      <p className="text-row-title font-semibold text-ink">{STAR_STORY.title}</p>
      <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {(
          [
            ['Situation', STAR_STORY.situation],
            ['Task', STAR_STORY.task],
            ['Action', STAR_STORY.action],
            ['Result', STAR_STORY.result],
          ] as const
        ).map(([label, text]) => (
          <div key={label} className="bg-surface p-3">
            <dt className="text-meta font-medium text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-meta text-ink">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

