import React from 'react';
import { FREE_SUMMARIES_PER_MONTH, pricingLines, type PricingLines } from '@/src/lib/pricing';

const SIGNUP_URL = 'https://dashboard.prodlog.app/auth';

const CheckIcon = () => (
  <svg className="mt-0.5 h-4 w-4 shrink-0 text-sage-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <CheckIcon />
    <span>{children}</span>
  </li>
);

// Only what the product gates today (docs/landing-log-first-phase0.md, 0.7):
// the one plan gate is the monthly summary quota. Everything else is free.
const FREE_FEATURES = [
  'Unlimited entries',
  '1:1 prep and weekly recaps, never metered',
  'Public portfolio',
  `${FREE_SUMMARIES_PER_MONTH} summaries a month`,
  'CSV and PDF export',
  'Collaborator confirmations',
  'Private by default',
];
const PRO_FEATURES = ['Everything in Free', 'Unlimited summaries: review drafts, resume bullets, STAR stories'];

const faq = (lines: PricingLines) =>
  [
    lines.faqJanuary && { q: 'What happens on January 1?', a: lines.faqJanuary },
    {
      q: "What happens to my entries if I don't upgrade?",
      a: 'Nothing. Entries are unlimited on the free plan, so everything you logged stays right where it is. You only lose Pro features like unlimited AI summaries, never your entries.',
    },
    {
      q: 'Is my log really private?',
      a: 'Yes. Every entry is private by default. Nothing becomes public unless you explicitly make it so: publishing your portfolio, sharing an entry link, or asking a collaborator to confirm an entry. Until you take one of those actions, you are the only person who can see your log.',
    },
    {
      q: 'What counts as a summary?',
      a: `Each generated output (a review draft, resume bullets or a STAR story) counts as one. 1:1 prep, weekly recaps, and writing or editing entries never count. Free includes ${FREE_SUMMARIES_PER_MONTH} a month; Pro is unlimited.`,
    },
    { q: 'Can I export everything?', a: 'Yes, always. CSV and PDF export are on the free plan. Your entries are yours, no lock-in.' },
    { q: 'Do I need a card?', a: lines.faqCard },
  ].filter((item): item is { q: string; a: string } => Boolean(item));

const PRIMARY_BUTTON = 'block w-full rounded-lg bg-ink py-3 text-center text-sm font-medium text-on-ink transition-colors hover:bg-ink/90';
const SECONDARY_BUTTON = 'block w-full rounded-lg border border-border py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-muted';

export const PricingPage = ({ lines = pricingLines() }: { lines?: PricingLines }) => (
  <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-8 md:px-12">
    <header className="fade-in pb-16 pt-32 text-center">
      <h1 className="serif-headline mb-6 text-3xl leading-tight text-ink md:text-[48px]">{lines.pricingTitle}</h1>
      <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{lines.pricingSub}</p>
    </header>

    <div className="mb-20 grid gap-8 md:grid-cols-2">
      <div className="flex flex-col rounded-xl border border-border bg-surface p-8">
        <div className="mb-1 text-xl font-semibold text-ink">Free</div>
        <div className="mb-4 text-sm font-medium text-muted-foreground">$0 forever</div>
        <ul className="my-8 flex-1 space-y-4 text-sm text-muted-foreground">
          {FREE_FEATURES.map((f) => (
            <PlanFeature key={f}>{f}</PlanFeature>
          ))}
        </ul>
        <a href={SIGNUP_URL} className={SECONDARY_BUTTON}>
          Start free
        </a>
      </div>

      <div className="flex flex-col rounded-xl border-2 border-ink bg-surface p-8">
        <div className="mb-1 text-xl font-semibold text-ink">Pro</div>
        <div className="mb-4 text-sm font-medium">
          {lines.proFreeNote ? (
            <>
              <s className="text-muted-foreground">
                <span className="sr-only">Normally </span>
                {lines.proPrice}
              </s>{' '}
              <span className="text-ink">{lines.proFreeNote}</span>
            </>
          ) : (
            <span className="text-ink">{lines.proPrice}</span>
          )}
        </div>
        <ul className="my-8 flex-1 space-y-4 text-sm text-muted-foreground">
          {PRO_FEATURES.map((f) => (
            <PlanFeature key={f}>{f}</PlanFeature>
          ))}
        </ul>
        {/* During the free period both plans lead to the same place, so there is one primary path. */}
        <a href={SIGNUP_URL} className={PRIMARY_BUTTON}>
          {lines.proCta}
        </a>
      </div>
    </div>

    {lines.afterFreePeriod && (
      <section className="mb-20">
        <h2 className="serif-headline mb-8 text-center text-2xl text-ink md:text-[36px]">{lines.afterFreePeriod.title}</h2>
        <ul className="mx-auto max-w-2xl space-y-4 text-center text-base leading-relaxed text-muted-foreground">
          {lines.afterFreePeriod.items.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    )}

    <section className="mb-12">
      <h2 className="serif-headline mb-12 text-center text-2xl text-ink md:text-[36px]">Pricing questions</h2>
      <div className="space-y-6">
        {faq(lines).map((item) => (
          <div key={item.q} className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-ink/30">
            <h3 className="mb-3 font-medium text-ink">{item.q}</h3>
            <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
