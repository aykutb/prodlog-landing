import React from 'react';
import Image from 'next/image';
import { PreviewTool } from '@/src/components/ui';

// The hero visual is the result slot's example: it sits where the visitor's
// own entries will render, labelled as an example, and is replaced by them on
// a paste. It shows the answer without the paragraph having to describe it.
const heroExample = (
  <figure>
    <figcaption className="text-[10px] uppercase tracking-wider text-muted mb-2">
      An example, so you know what to expect.
    </figcaption>
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
      <Image
        src="/images/prodlog-before-after.png"
        width={3040}
        height={1600}
        priority={true}
        sizes="(max-width: 768px) calc(100vw - 32px), 672px"
        alt="Scattered handwritten notes and a Slack message to yourself on the left, and the Prodlog dashboard on the right showing the same entries as a dated log"
      />
    </div>
  </figure>
);

export const HeroSection = () => (
  <section className="pt-24 pb-4 md:pb-6 px-4 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-3xl md:text-[44px] mb-3 leading-tight text-primary max-w-2xl mx-auto">
      Your best work is already written down somewhere.
    </h1>
    <h2 className="serif-headline font-normal text-xl md:text-[27px] mb-6 leading-snug text-muted max-w-2xl mx-auto">
      It&rsquo;s just useless by the time you need it.
    </h2>

    <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
      A Slack thread to yourself. A note on your phone. A doc you started in March. Paste any
      of it in.
    </p>

    {/* The paste input is the hero's one primary action. Same component as
        /try, compact density; the section supplies padding and centring. One
        line beneath the button carries the sign-up link, then the result slot. */}
    <div className="mt-6">
      <PreviewTool
        variant="compact"
        showSignup={false}
        afterButton={
          <p className="text-secondary text-sm mt-4">
            or{' '}
            <a
              href="https://dashboard.prodlog.app/auth"
              className="text-deep-ink-blue underline underline-offset-2 hover:opacity-80 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
            >
              Start free
            </a>
            . Free forever, no card.
          </p>
        }
        resultPlaceholder={heroExample}
      />
    </div>
  </section>
);
