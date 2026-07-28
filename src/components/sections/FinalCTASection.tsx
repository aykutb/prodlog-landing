import React from 'react';

export const FinalCTASection = () => (
  <section className="py-24 px-8 md:px-12 bg-deep-ink-blue border-t border-deep-ink-blue">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="serif-headline text-2xl md:text-[42px] mb-10 text-soft-canvas leading-tight">
        Start with what you&rsquo;ve already written.
      </h2>
      <a
        href="https://dashboard.prodlog.app/auth"
        className="inline-flex items-center justify-center bg-soft-canvas hover:bg-white text-deep-ink-blue px-8 py-4 rounded-lg text-base font-medium transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-canvas/70 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-ink-blue"
      >
        Start free
      </a>
      <p className="text-soft-canvas/60 text-sm mt-4 max-w-md mx-auto">
        Log as much as you want, free forever. Right now the first 1,000 members get Pro
        free as well.
      </p>
    </div>
  </section>
);
