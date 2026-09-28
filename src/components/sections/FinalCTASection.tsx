import React from 'react';
import { pricingLines } from '@/src/lib/pricing';

export const FinalCTASection = () => (
  <section className="py-24 px-8 md:px-12 bg-ink border-t border-ink">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="serif-headline text-2xl md:text-[42px] mb-10 text-on-ink leading-tight">Start with what you&rsquo;ve already written.</h2>
      <a
        href="https://dashboard.prodlog.app/auth"
        className="inline-flex items-center justify-center bg-on-ink hover:bg-on-ink/90 text-ink px-8 py-4 rounded-lg text-base font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-on-ink/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        Start free
      </a>
      <p className="text-on-ink-muted text-sm mt-4 max-w-md mx-auto">{pricingLines().finalCta}</p>
    </div>
  </section>
);
