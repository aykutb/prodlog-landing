import React from 'react';
import { CTASection } from '@/src/components/ui';

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

export const PricingPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in text-center">
      <img src="/pricing.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
        Forgetting your work is the expensive option
      </h1>
      <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Prodlog costs less than the time you'll spend trying to remember what you did. It's designed to quietly pay for itself.
      </p>
    </header>

    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <div className="p-8 border border-divider rounded-xl bg-white flex flex-col">
        <div className="text-primary font-semibold text-xl mb-1">Free</div>
        <div className="text-secondary text-sm font-medium mb-4">$0 / forever</div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <PlanFeature>Up to 10 impacts</PlanFeature>
          <PlanFeature>Private by default</PlanFeature>
          <PlanFeature>3 summaries per month</PlanFeature>
          <PlanFeature>Export anytime</PlanFeature>
        </ul>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="w-full py-3 border border-divider rounded-lg text-primary text-sm hover:bg-charcoal transition-colors font-medium text-center block"
        >
          Get started
        </a>
      </div>

      <div className="p-8 border border-deep-ink-blue rounded-xl bg-white flex flex-col relative shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
        <div className="absolute top-4 right-4 text-[10px] bg-deep-ink-blue text-white px-2 py-1 rounded-md uppercase tracking-widest font-semibold">
          Recommended
        </div>
        <div className="text-primary font-semibold text-xl mb-1">Pro</div>
        <div className="text-deep-ink-blue text-sm font-medium mb-4">$12 / month</div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <PlanFeature>Unlimited impacts</PlanFeature>
          <PlanFeature>Unlimited summaries</PlanFeature>
          <PlanFeature>Validation requests</PlanFeature>
          <PlanFeature>Advanced exports</PlanFeature>
          <PlanFeature>Priority support</PlanFeature>
        </ul>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="w-full py-3 bg-deep-ink-blue text-white rounded-lg text-sm hover:opacity-90 transition-colors font-medium text-center block"
        >
          Start Pro trial
        </a>
      </div>
    </div>

    <div className="p-8 md:p-12 border border-divider rounded-xl bg-charcoal mb-20">
      <h2 className="text-primary font-semibold text-xl mb-6">What you're really paying for</h2>
      <div className="grid md:grid-cols-2 gap-8 text-secondary text-sm leading-relaxed">
        <p>
          Scrambling during performance reviews is a hidden tax on your career. Prodlog eliminates
          the anxiety of the "blank page" when your promotion is on the line.
        </p>
        <p>
          Clearer reviews and stronger interviews lead to higher compensation and better roles. The
          investment pays for itself in your first career moment.
        </p>
      </div>
    </div>

    <div className="text-center">
      <p className="text-muted text-sm mb-8">
        Less than a coffee a week. Built for the career moments that matter.
      </p>
      <CTASection />
    </div>
  </div>
);
