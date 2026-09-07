import React from 'react';
import Image from 'next/image';
import { CTASection, PreviewTool } from '@/src/components/ui';

// The hero visual carries the whole arc in one frame: the "somewheres" of the
// headline on the left, the same entries as a structured log on the right. No
// labels beyond what the product itself shows. Recognition, not explanation.
export const HeroSection = () => (
  <section className="pt-24 pb-4 md:pb-6 px-4 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-3xl md:text-[44px] mb-3 leading-tight text-primary">
      Your best work is already written down somewhere.
    </h1>
    <h2 className="serif-headline font-normal text-xl md:text-[27px] mb-6 leading-snug text-muted">
      It&rsquo;s just useless by the time you need it.
    </h2>

    <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
      A Slack thread to yourself. A note on your phone. A doc you started in March. Paste any
      of it in and it comes back as dated entries, with your role on each one and the missing
      outcomes flagged.
    </p>

    {/* The paste input is the hero's one primary action. Same component as
        /try, compact density; the section supplies padding and centring. */}
    <div className="mt-6">
      <PreviewTool variant="compact" showSignup={false} />
    </div>

    <CTASection pastePrimary />

    <div className="mt-10 mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
      <Image
        src="/images/prodlog-before-after.png"
        width={3040}
        height={1600}
        priority={true}
        sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 96px), 928px"
        alt="Scattered handwritten notes and a Slack message to yourself on the left, and the Prodlog dashboard on the right showing the same entries as a dated log"
      />
    </div>
  </section>
);
