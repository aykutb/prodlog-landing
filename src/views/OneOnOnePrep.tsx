import React from 'react';
import Link from 'next/link';
import { OccasionCard } from '@/src/components/kit';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { SlackPromptMock } from '@/src/components/ui';
import { CompactLedgerHero, TemplateDownload, UseCaseSection } from '@/src/components/demo/UseCase';
import { formatShort, formatWithWeekday, plural, priyaLog, todayIso } from '@/src/content/demo/priya';

export const OneOnOnePrepPage = () => {
  const today = todayIso();
  const log = priyaLog(today);
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-8 md:px-12">
      <header className="fade-in grid grid-cols-1 gap-10 pt-32 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <span className="inline-flex rounded-md bg-sage-soft px-2 py-1 text-meta font-medium text-sage-strong">Free. Never metered.</span>
          <h1 className="serif-headline mt-4 text-3xl leading-tight text-ink md:text-[48px]">Walk into your 1:1 with everything since the last one.</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            The day before your 1:1, Prodlog lays out what you logged since the last one, flags what&rsquo;s missing an outcome, and asks what you
            need from your manager.
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
          <OccasionCard
            title="Your 1:1"
            aside={formatWithWeekday(log.nextOneOnOne, today)}
            context={`${plural(log.sinceLast.length, 'entry', 'entries')} since your last 1:1 on ${formatShort(log.lastOneOnOne, today)}.`}
            windows={log.windows}
            caption={log.caption}
            action="Prep my 1:1"
          />
        </div>
      </header>

      <UseCaseSection id="why" title="The 1:1 is the one meeting about your work.">
        <p>
          Your manager sees a slice of what you do. The 1:1 is where they hear the rest, and it&rsquo;s what they remember when they write your
          review.
        </p>
        <p>
          Most people prep in the five minutes before, from memory, and bring whatever happened yesterday. The scope call from last Tuesday never
          comes up. Prodlog builds the prep from what you logged when it happened.
        </p>
      </UseCaseSection>

      <UseCaseSection
        id="prep-screen"
        title="What the prep screen gives you"
        aside={
          <ProductShot
            name="one-on-one-prep.png"
            crop={{ region: { x: 0.12, y: 0.04, w: 0.55, h: 0.86 } }}
            alt="Priya's 1:1 prep: the entries since her last 1:1 with include checkboxes, the gaps, what she needs from her manager, and the actions"
            width={2880}
            height={2200}
            url="dashboard.prodlog.app/log/one-on-one"
          />
        }
      >
        <ul className="list-disc space-y-2 pl-5">
          <li>Every entry since your last 1:1, each with a checkbox to leave it out.</li>
          <li>Gaps: the entries still missing an outcome, so you can add one before the meeting.</li>
          <li>&ldquo;What do you need from your manager?&rdquo;, so the ask doesn&rsquo;t get lost.</li>
          <li>&ldquo;Copy for your 1:1 doc&rdquo;, or share it. &ldquo;Skip this 1:1&rdquo; or &ldquo;Move to another day&rdquo; when the calendar changes.</li>
        </ul>
        <p>No regular 1:1s? Pick a day and get a weekly recap instead.</p>
      </UseCaseSection>

      <UseCaseSection
        id="day-before"
        title="The day before, it asks"
        aside={
          <div className="rounded-xl border border-border bg-muted p-6">
            <SlackPromptMock />
          </div>
        }
      >
        <p>
          The day before your 1:1, Prodlog sends you a message in Slack: anything else from this week? Reply in the thread and it&rsquo;s logged.
          Not on Slack? The same reminder comes by email.
        </p>
        <p>By the time you open the prep, it already has what you&rsquo;d have forgotten.</p>
      </UseCaseSection>

      <TemplateDownload
        title="PM Manager 1:1 Template"
        line="Shipped, decided, blocked, visibility. Ten minutes of prep, in a doc."
        file="/downloads/pm-manager-1-1-template.docx"
        page="/templates/manager-1-1"
      />

      <UseCaseSection id="free" title="Free. Never metered.">
        <p>1:1 prep and weekly recaps never count as a summary, on any plan. Prep every week, forever, for nothing.</p>
      </UseCaseSection>

      <CompactLedgerHero today={today} />
    </div>
  );
};
