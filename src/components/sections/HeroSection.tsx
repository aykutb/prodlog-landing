import React from 'react';
import Image from 'next/image';
import { CTASection } from '@/src/components/ui';

// The hero visual shows the mess (the "somewheres" of the headline), never
// the transformation: BringTheMess owns that directly below. No labels, no
// arrows. Recognition, not explanation.
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

    <div className="mt-10 mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
      <Image
        src="/images/screenshots/01-hero-dashboard-entry-list.png"
        width={2858}
        height={1680}
        priority={true}
        alt="Prodlog dashboard showing work entries with dates and outcomes"
      />
    </div>

    {/* The somewheres: a phone note, a Slack self-DM, a Notion-ish page. */}
    <div className="mt-4 mb-2 flex justify-center items-start" aria-hidden="true">
      <div className="w-40 md:w-48 -rotate-2 translate-y-2 bg-white border border-divider rounded-xl p-3 text-left shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
        <div className="space-y-1.5">
          <p className="text-secondary text-[10px] leading-snug">pricing test came back good, rolling out</p>
          <p className="text-secondary text-[10px] leading-snug">asked to own the sso migration??</p>
          <p className="text-secondary text-[10px] leading-snug">remember the renewal save from tuesday</p>
        </div>
      </div>

      <div className="w-44 md:w-52 rotate-1 -ml-5 z-10 bg-white border border-divider rounded-lg p-3 text-left shadow-[0_4px_16px_-4px_rgba(31,42,68,0.18)]">
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded bg-charcoal border border-divider flex items-center justify-center shrink-0">
            <span className="text-[8px] font-medium text-muted">you</span>
          </span>
          <div className="min-w-0">
            <p className="text-primary text-[10px] font-bold leading-none mb-1">you</p>
            <p className="text-secondary text-[10px] leading-snug">shipped exports finally</p>
            <p className="text-secondary text-[10px] leading-snug mt-1">
              renewal was bc of the audit log thing, write that down
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block w-40 md:w-48 -rotate-1 -ml-5 translate-y-3 bg-white border border-divider rounded-lg p-3 text-left shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
        <p className="text-primary text-[10px] font-medium mb-1.5">📄 work stuff</p>
        <div className="space-y-1">
          <p className="text-secondary text-[10px] leading-snug">• follow up w legal re: data export</p>
          <p className="text-secondary text-[10px] leading-snug">• onboarding v2 scope cut, doc later</p>
          <p className="text-secondary text-[10px] leading-snug">• did activation move? check thurs</p>
        </div>
      </div>
    </div>
  </section>
);
