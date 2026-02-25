import React from 'react';

export const FinalCTASection = () => (
  <section className="py-24 px-8 md:px-12 bg-deep-ink-blue border-t border-deep-ink-blue">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="serif-headline text-2xl md:text-[42px] mb-6 text-soft-canvas leading-tight">
        Your impact is worth documenting.
      </h2>
      <p className="text-soft-canvas/70 mb-10 max-w-xl mx-auto">
        Start logging your wins today. Be ready for your next review, resume update, or interview.
      </p>
      <a
        href="https://dashboard.prodlog.app/auth"
        className="inline-flex items-center justify-center bg-soft-canvas hover:bg-white text-deep-ink-blue px-8 py-4 rounded-lg text-base font-medium transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)]"
      >
        Start logging free
      </a>
      <p className="text-soft-canvas/50 text-xs mt-4">
        Free to start. No credit card required.
      </p>
    </div>
  </section>
);
