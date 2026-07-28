import React from 'react';
import { CTASection } from '@/src/components/ui';

// Deliberately compact: the top of the next section's before/after visual
// should be visible above the fold on a standard laptop viewport.
export const HeroSection = () => (
  <section className="pt-24 pb-4 md:pb-6 px-4 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-3xl md:text-[44px] mb-3 leading-tight text-primary">
      Your best work is already written down somewhere.
    </h1>
    <h2 className="serif-headline font-normal text-xl md:text-[27px] mb-6 leading-snug text-muted">
      It&rsquo;s just useless by the time you need it.
    </h2>

    <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
      A Slack thread to yourself. A note on your phone. A doc you started in March. Prodlog
      keeps the same two-minute habit, then turns it into your review, your resume bullets,
      and your interview answers.
    </p>

    <CTASection />
  </section>
);
