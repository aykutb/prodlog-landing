import React from 'react';

const SIGNUP_URL = 'https://dashboard.prodlog.app/auth';

const CheckIcon = () => (
  <svg
    className="mt-0.5 h-4 w-4 shrink-0 text-sage-green"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <CheckIcon />
    <span>{children}</span>
  </li>
);

const EARLY_ACCESS_NOTES = [
  'Founding members keep Pro free for 12 months from signup',
  'Your entries are always yours — export anytime, no lock-in',
  'The free tier stays free, forever',
];

const PRICING_FAQ = [
  {
    q: 'Will you raise the price?',
    a: 'After early access, Pro will cost $19/mo for new members. Founding members keep Pro free for 12 months from signup, and the free tier stays free forever.',
  },
  {
    q: "What happens to my entries if I don't upgrade?",
    a: 'Nothing. Entries are unlimited on the free plan, so everything you logged stays right where it is. You only lose Pro features like unlimited AI summaries — never your entries.',
  },
  {
    q: 'Is my log really private?',
    a: "Yes. Every entry is private by default. Nothing becomes public unless you explicitly make it so — publishing your portfolio, sharing an entry link, or sending a validation request. Until you take one of those actions, you are the only person who can see your log.",
  },
  {
    q: 'What counts as an AI summary?',
    a: 'Each generated output — a review-ready writeup, resume bullets, or a STAR story — counts as one summary. Writing and editing entries never counts. Free includes 3 per month; Pro is unlimited.',
  },
  {
    q: 'Can I export everything?',
    a: 'Yes, always. Markdown and CSV export are on the free plan, and Pro adds PDF. Your entries are yours — no lock-in.',
  },
  {
    q: 'What happens when the 1,000 spots run out?',
    a: 'New members start on the free plan and can upgrade to Pro at the regular price. If you claimed a founding spot, you keep Pro free for 12 months from your signup, no matter when the spots run out.',
  },
];

interface PricingPageProps {
  /** Founding spots left; null hides the counter sentence (error/unknown). */
  spotsRemaining: number | null;
}

export const PricingPage = ({ spotsRemaining }: PricingPageProps) => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in text-center">
      <img src="/pricing.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
        Free while we're in early access.
      </h1>
      <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        The first 1,000 members get Pro free for a year.
        {spotsRemaining !== null && spotsRemaining > 0 && (
          <> {spotsRemaining} spots left.</>
        )}
      </p>
    </header>

    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <div className="p-8 border border-divider rounded-xl bg-white flex flex-col">
        <div className="text-primary font-semibold text-xl mb-1">Free</div>
        <div className="text-secondary text-sm font-medium mb-4">$0 forever</div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <PlanFeature>Unlimited entries</PlanFeature>
          <PlanFeature>Private by default</PlanFeature>
          <PlanFeature>3 AI summaries per month</PlanFeature>
          <PlanFeature>Markdown &amp; CSV export</PlanFeature>
        </ul>
        <a
          href={SIGNUP_URL}
          className="w-full py-3 border border-divider rounded-lg text-primary text-sm hover:bg-charcoal transition-colors font-medium text-center block"
        >
          Start logging
        </a>
      </div>

      <div className="p-8 border-2 border-deep-ink-blue rounded-xl bg-deep-ink-blue/5 flex flex-col relative shadow-[0_4px_20px_-5px_rgba(31,42,68,0.15)]">
        <div className="absolute top-4 right-4 text-[10px] bg-deep-ink-blue text-white px-2 py-1 rounded-md uppercase tracking-widest font-semibold">
          Included in early access
        </div>
        <div className="text-primary font-semibold text-xl mb-1">Pro</div>
        <div className="text-sm font-medium mb-4">
          <s className="text-muted">$19/mo</s>{' '}
          <span className="text-deep-ink-blue">Free for founding members</span>
        </div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <PlanFeature>Unlimited entries</PlanFeature>
          <PlanFeature>Unlimited AI summaries</PlanFeature>
          <PlanFeature>Validation requests</PlanFeature>
          <PlanFeature>Public portfolio</PlanFeature>
          <PlanFeature>PDF export, resume bullets, STAR story bank</PlanFeature>
          <PlanFeature>Priority support</PlanFeature>
        </ul>
        <a
          href={SIGNUP_URL}
          className="w-full py-3 bg-deep-ink-blue text-white rounded-lg text-sm hover:opacity-90 transition-colors font-medium text-center block"
        >
          Claim founding access
        </a>
      </div>
    </div>

    <section className="mb-20">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-8 text-center text-primary">
        What happens after early access?
      </h2>
      <ul className="space-y-4 text-secondary text-base leading-relaxed max-w-2xl mx-auto text-center">
        {EARLY_ACCESS_NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-center text-primary">
        Pricing questions
      </h2>
      <div className="space-y-6">
        {PRICING_FAQ.map((faq) => (
          <div
            key={faq.q}
            className="bg-white border border-divider rounded-lg p-6 hover:border-deep-ink-blue/30 transition-colors"
          >
            <h3 className="text-primary font-medium mb-3">{faq.q}</h3>
            <p className="text-secondary text-base leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
