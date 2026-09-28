import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/src/components/ui';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { PRIYA } from '@/src/content/demo/priya';
import { EMAIL_LOG_ADDRESS } from '@/src/lib/channels';
import { FREE_SUMMARIES_PER_MONTH, pricingLines } from '@/src/lib/pricing';

// A walk through the real product, one screen per step. The homepage says
// what Prodlog gives back; this page shows where each thing lives and what
// the controls do, so every visual is a real screenshot (docs/landing-shots.md).

const Step = ({ number, title, children, shot }: { number: number; title: string; children: React.ReactNode; shot: React.ReactNode }) => (
  <ScrollReveal>
    <section aria-labelledby={`step-${number}`} className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <p className="text-meta font-medium tabular-nums text-muted-foreground">Step {number}</p>
        <h2 id={`step-${number}`} className="serif-headline mt-2 text-2xl md:text-[32px] leading-tight text-ink">
          {title}
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
      </div>
      <div className="min-w-0 md:col-span-7">{shot}</div>
    </section>
  </ScrollReveal>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded border border-border bg-muted px-1 py-0.5 text-[0.85em] text-ink">{children}</code>
);

const LINK_BUTTON =
  'inline-block rounded-lg border border-ink/40 bg-surface px-5 py-2.5 text-sm font-medium text-ink no-underline transition-all hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2';

export const HowItWorksPage = () => {
  const lines = pricingLines();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-8 md:px-12">
      <header className="fade-in pb-16 pt-32 text-center">
        <img src="/flow-arrows-icon.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
        <h1 className="serif-headline mb-6 text-3xl leading-tight text-ink md:text-[48px]">How Prodlog works</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Start with the notes you already have. Log as things happen. Get it back before every 1:1, every review, and every job change.
        </p>
      </header>

      <div className="space-y-24">
        <Step
          number={1}
          title="Start with what you already have"
          shot={
            <ProductShot
              name="paste-import.png"
              alt="Pasted notes in Prodlog turned into dated entries, one flagged as missing an outcome, waiting to be saved"
              width={2880}
              height={1800}
              url="dashboard.prodlog.app/log"
            />
          }
        >
          <p>
            Paste a Slack thread, a phone note or a doc. Prodlog splits it into dated entries, pulls out what you owned and what moved, and flags the
            ones missing an outcome.
          </p>
          <p>Nothing is saved until you look it over: fix a date, drop an entry, add the outcome you remember now.</p>
          <p className="pt-2">
            <Link href="/try" className={LINK_BUTTON}>
              Try it without signing up
            </Link>
          </p>
        </Step>

        <Step
          number={2}
          title="Log as it happens"
          shot={
            <>
              <div className="hidden md:block">
                <ProductShot name="log-home.png" alt="Priya's log: her next 1:1 on top, then today's line and her entries" width={2880} height={2000} url="dashboard.prodlog.app/log" />
              </div>
              <div className="mx-auto max-w-[390px] md:hidden">
                <ProductShot name="log-home-mobile.png" alt="Priya's log on a phone: today's line and her entries" width={780} height={1688} chrome="none" sizes="390px" />
              </div>
            </>
          }
        >
          <p>One log, four ways in, all landing in the same place:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-medium text-ink">On the web:</span> type on the first line of your log and press ⌘ Enter.
            </li>
            <li>
              <span className="font-medium text-ink">In Slack:</span> <Code>/log</Code> from any channel or DM, or log any message from its menu.
            </li>
            <li>
              <span className="font-medium text-ink">By email:</span> forward the thread to <span className="whitespace-nowrap text-ink">{EMAIL_LOG_ADDRESS}</span>.
            </li>
            <li>
              <span className="font-medium text-ink">On iOS:</span> say what happened; the voice note comes back as an entry.
            </li>
          </ul>
          <p>
            You don&rsquo;t have to remember. The day before your 1:1, Prodlog asks in Slack what else happened, and every Friday at 4pm it asks what
            shipped. Skip a few weeks and it just asks again.
          </p>
        </Step>

        <Step
          number={3}
          title="Before every 1:1"
          shot={
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
          <p>
            <span className="rounded-md bg-sage-soft px-2 py-0.5 text-meta font-medium text-sage-strong">Free, never metered.</span>
          </p>
          <p>
            Press &ldquo;Prep my 1:1&rdquo; and everything you logged since the last one is laid out. Untick what you&rsquo;d rather not bring up.
            Gaps shows the entries still missing an outcome, so you can add one before the meeting. Then answer &ldquo;What do you need from your
            manager?&rdquo;.
          </p>
          <p>
            &ldquo;Copy for your 1:1 doc&rdquo; puts it on your clipboard, ready to paste. A week off? &ldquo;Skip this 1:1&rdquo;. Moved to Friday?
            &ldquo;Move to another day&rdquo;, and the next window adjusts.
          </p>
          <p>No regular 1:1s? Pick a day and get a weekly recap of what you logged instead.</p>
        </Step>

        <Step
          number={4}
          title="Review season"
          shot={
            <ProductShot
              name="review-draft.png"
              alt="Priya's mid-year review in Prodlog: her company's questions, a draft under each, and the entries each draft drew on"
              width={2880}
              height={2200}
              url="dashboard.prodlog.app/log/review"
            />
          }
        >
          <p>Paste your company&rsquo;s review questions once. Prodlog drafts an answer for each and shows which entries it drew on.</p>
          <p>
            Every claim traces back to something you logged when it happened, so you edit a draft instead of reconstructing six months from memory.
            Each draft counts as one summary: {FREE_SUMMARIES_PER_MONTH} a month on Free, unlimited on Pro.
          </p>
        </Step>

        <Step
          number={5}
          title="When you change jobs"
          shot={
            <ProductShot
              name="career-move.png"
              alt="Priya's Career page with I'm getting ready to move switched on, her portfolio published, and the portfolio preview"
              width={2880}
              height={1800}
              url="dashboard.prodlog.app/career/portfolio"
            />
          }
        >
          <p>
            Turn on &ldquo;I&rsquo;m getting ready to move&rdquo; and Career comes first. Three things, built from the same entries: your Portfolio, a
            public page of the work you choose to show; Stories, STAR answers for interviews; and Resume bullets with the outcomes attached.
          </p>
          <p>Publishing is free, and nothing is public until you publish it.</p>
          <p className="pt-2">
            <Link href={PRIYA.portfolioPath} className={LINK_BUTTON}>
              See a real one
            </Link>
          </p>
        </Step>
      </div>

      <ScrollReveal>
        <section aria-labelledby="where-your-log-lives" className="mx-auto mt-24 max-w-2xl rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 id="where-your-log-lives" className="serif-headline text-xl leading-snug text-ink md:text-2xl">
            Where your log lives and who can see it
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Your log is private by default.</li>
            <li>Nothing leaves it unless you copy it, send it, publish it, or ask a collaborator to confirm an entry.</li>
            <li>Export everything anytime, as CSV or PDF.</li>
          </ul>
        </section>
      </ScrollReveal>

      <div className="mt-16 border-t border-border pt-12 text-center">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full rounded-lg bg-ink px-6 py-3 text-center text-sm font-medium text-on-ink no-underline transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2 md:w-auto"
          >
            Start free
          </a>
          <Link href={PRIYA.portfolioPath} className={`${LINK_BUTTON} w-full text-center md:w-auto`}>
            See a real one
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{lines.footer}</p>
      </div>
    </div>
  );
};
