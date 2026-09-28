import React from 'react';
import Link from 'next/link';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { LedgerRow, LedgerRows, YearDivider } from '@/src/components/kit';
import { ReviewOutput } from '@/src/components/demo/Outputs';
import { CompactLedgerHero, TemplateDownload, UseCaseSection } from '@/src/components/demo/UseCase';
import { entryById, formatShort, priyaLog, todayIso } from '@/src/content/demo/priya';
import { pricingLines } from '@/src/lib/pricing';

export const SelfReviewPage = () => {
  const today = todayIso();
  const log = priyaLog(today);
  const evidence = ['notification-timing-results', 'refund-api-launch', 'refund-api-scope', 'dispute-interviews'].map((id) => entryById(id, log)!);
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-8 md:px-12">
      <header className="fade-in grid grid-cols-1 gap-10 pt-32 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <h1 className="serif-headline text-3xl leading-tight text-ink md:text-[48px]">Start your review from a draft, not a blank page.</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Paste your company&rsquo;s review questions once. Prodlog drafts an answer to each from your own entries and shows which ones it drew on.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://dashboard.prodlog.app/auth" className="inline-flex h-11 items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-on-ink hover:bg-ink/90">
              Start free
            </a>
            <Link href="/try" className="inline-flex h-11 items-center justify-center rounded-lg border border-ink/40 bg-surface px-6 text-sm font-medium text-ink hover:border-ink">
              Try it without signing up
            </Link>
          </div>
        </div>
        <div className="min-w-0 md:col-span-6">
          <ReviewOutput log={log} />
        </div>
      </header>

      <UseCaseSection
        id="memory"
        title="Why memory fails at review time"
        aside={
          <div className="rounded-xl border border-border bg-background px-1 sm:px-3">
            <LedgerRows>
              {evidence.slice(0, 3).map((e) => (
                <LedgerRow key={e.id} date={formatShort(e.date, today)} dateTime={e.date} label={e.product} title={e.title} outcome={e.outcome} />
              ))}
            </LedgerRows>
            <YearDivider year={2025} className="pt-4" />
            <LedgerRows>
              <LedgerRow date="Dec 9, 2025" dateTime="2025-12-09" label="Refunds & Disputes" title="Helped with the merchant refund flow spec" />
            </LedgerRows>
          </div>
        }
      >
        <p>
          By review season you remember the last six weeks and the one launch everyone talked about. The scope you cut in April, the interviews that
          changed the roadmap in March, the numbers that came in a month after launch: gone, or down to one vague line.
        </p>
        <p>An entry written the week it happened keeps the detail. Six months of them is the review, already half written.</p>
      </UseCaseSection>

      <UseCaseSection
        id="draft"
        title="A draft for every question, with its evidence"
        aside={
          <ProductShot
            name="review-draft.png"
            alt="Priya's mid-year review in Prodlog: her company's questions, a draft under each, and the entries each draft drew on"
            width={2880}
            height={2200}
            url="dashboard.prodlog.app/log/review"
          />
        }
      >
        <p>
          Paste your company&rsquo;s review questions once. When review season comes, Prodlog drafts an answer for each from the entries in your
          review period, and lists the entries each draft drew on, so every claim has something behind it.
        </p>
        <p>Edit it in your own words, then paste it into your company&rsquo;s review tool.</p>
      </UseCaseSection>

      <TemplateDownload
        title="PM Performance Review Template"
        line="Initiatives, evidence, collaboration, growth, with a worked example."
        file="/downloads/pm-performance-review-template.docx"
        page="/templates/quarterly-review"
      />

      <UseCaseSection id="cost" title="What it costs">
        <p>Each review draft counts as one summary: {pricingLines().summaryNote}</p>
        <p>Logging, editing entries and 1:1 prep never count.</p>
      </UseCaseSection>

      <CompactLedgerHero today={today} />
    </div>
  );
};
