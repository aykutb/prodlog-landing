import React from 'react';
import { LedgerHero } from '@/src/components/ledger-hero/LedgerHero';
import { todayIso } from '@/src/content/demo/priya';
import { HeroCtas } from './HeroCtas';

// The ledger hero: the dashboard's Log page in miniature, with the paste box
// as the ledger's first line. What comes out settles into rows under it.
// Dates are worked out here, on the server, so the
// client renders the same page; the route revalidates hourly.
export const HeroSection = () => {
  const today = todayIso();
  return (
    <section className="pt-24 pb-10 md:pb-14 px-4 md:px-12 max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-32">
      {/* From lg the copy sits beside the log, centred against it, so the paste line is on screen on arrival. */}
      <div className="text-center lg:col-span-5 lg:text-left">
        <h1 className="serif-headline text-3xl md:text-[44px] mb-3 leading-tight text-ink max-w-2xl mx-auto lg:mx-0">
          Your best work is already written down somewhere.
        </h1>
        <h2 className="serif-headline font-normal text-xl md:text-[27px] mb-6 leading-snug text-muted-foreground max-w-2xl mx-auto lg:mx-0">
          It&rsquo;s just useless by the time you need it.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed lg:mx-0">
          Paste it in. Prodlog turns it into a work log you own. It preps your 1:1s, drafts your reviews, and comes with you when you change jobs.
        </p>
        <HeroCtas />
      </div>
      <div className="mt-8 lg:col-span-7 lg:mt-0">
        <LedgerHero variant="home" today={today} autoplay />
      </div>
    </section>
  );
};
