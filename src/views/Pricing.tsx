import React from 'react';
import { CTASection } from '@/src/components/ui';

export const PricingPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in">
      <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-10 lg:gap-12">
        <div className="flex shrink-0 justify-center md:justify-start md:w-[min(21%,140px)] lg:w-[min(19%,150px)] md:self-stretch md:min-h-0 md:items-center md:flex">
          <img
            src="/pricing.svg"
            alt=""
            className="h-14 w-14 object-contain object-center sm:h-16 sm:w-16 md:h-auto md:w-full md:max-w-full md:object-left"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center text-center md:text-left">
          <h1 className="serif-headline text-3xl md:text-[48px] mb-4 md:mb-6 text-primary leading-tight">
            Pricing that makes forgetting your work the expensive option
          </h1>
          <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl md:max-w-none mx-auto md:mx-0">
            Prodlog costs less than the time you'll spend trying to remember what you did. It's designed to quietly pay for itself.
          </p>
        </div>
      </div>
    </header>

    <div className="grid md:grid-cols-2 gap-8 mb-24">
      <div className="p-8 border border-divider rounded bg-white flex flex-col">
        <div className="text-primary font-bold text-xl mb-1">FREE</div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <li className="flex gap-2">
            <span>•</span> Up to 10 impacts
          </li>
          <li className="flex gap-2">
            <span>•</span> Private by default
          </li>
          <li className="flex gap-2">
            <span>•</span> 3 summaries per month
          </li>
          <li className="flex gap-2">
            <span>•</span> Export anytime
          </li>
        </ul>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="w-full py-3 border border-divider rounded text-primary text-sm hover:bg-charcoal transition-colors font-medium text-center block"
        >
          Get started
        </a>
      </div>

      <div className="p-8 border border-deep-ink-blue rounded bg-white flex flex-col relative shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
        <div className="absolute top-4 right-4 text-[10px] bg-deep-ink-blue text-white px-2 py-1 rounded uppercase tracking-widest font-bold">
          Pro
        </div>
        <div className="text-primary font-bold text-xl mb-1">PRO</div>
        <div className="text-deep-ink-blue text-sm font-medium mb-4">$12 / month</div>
        <ul className="space-y-4 my-8 text-secondary text-sm flex-1">
          <li className="flex gap-2">
            <span>•</span> Unlimited impacts
          </li>
          <li className="flex gap-2">
            <span>•</span> Unlimited summaries
          </li>
          <li className="flex gap-2">
            <span>•</span> Validation requests
          </li>
          <li className="flex gap-2">
            <span>•</span> Advanced exports
          </li>
          <li className="flex gap-2">
            <span>•</span> Priority support
          </li>
        </ul>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="w-full py-3 bg-deep-ink-blue text-white rounded text-sm hover:opacity-90 transition-colors font-medium text-center block"
        >
          Start Pro trial
        </a>
      </div>
    </div>

    <div className="p-12 border border-divider rounded-xl bg-charcoal mb-16">
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
