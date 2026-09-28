import React from 'react';
import { ProductShot } from '@/src/components/kit/ProductShot';

export const OneOnOneSection = () => (
  <section className="py-24 px-4 sm:px-8 md:px-12 bg-muted border-t border-border">
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-5 md:items-center">
      <div className="min-w-0 md:col-span-2">
        <span className="inline-flex items-center gap-2 rounded-md bg-sage-soft px-2 py-1 text-meta font-medium text-sage-strong">Free. Never metered.</span>
        <h2 className="serif-headline mt-4 text-2xl md:text-[36px] mb-6 text-ink leading-tight">Your 1:1 is the one meeting about your work.</h2>
        <p className="text-muted-foreground leading-relaxed">
          The person across the table writes your review. Prodlog lays out everything since your last 1:1, flags what&rsquo;s missing an outcome, and asks
          what you need from your manager. Copy it into your 1:1 doc and go.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">No regular 1:1s? Pick a day and get a weekly recap instead.</p>
      </div>

      {/* The prep screen, with the day-before Slack DM overlapping its corner; stacked below md. */}
      <div className="relative min-w-0 md:col-span-3 md:pb-16">
        <ProductShot
          name="one-on-one-prep.png"
            crop={{ region: { x: 0.12, y: 0.04, w: 0.55, h: 0.86 } }}
          alt="Priya's 1:1 prep: her three entries since the last 1:1 with checkboxes, one flagged as missing an outcome, what she needs from her manager, and Copy for your 1:1 doc"
          width={2880}
          height={2200}
          url="dashboard.prodlog.app/log/one-on-one"
          sizes="(min-width: 1024px) 600px, 100vw"
        />
        <div className="mt-4 md:absolute md:-bottom-2 md:-left-10 md:mt-0 md:w-[58%]">
          <ProductShot
            name="slack-day-before.png"
            alt="The Prodlog message in Slack the day before a 1:1 with Maya: 3 entries logged since the last one, anything else from this week, with Log something and Prep my 1:1 buttons"
            width={1600}
            height={1000}
            chrome="none"
            sizes="(min-width: 1024px) 360px, 100vw"
          />
        </div>
      </div>
    </div>
  </section>
);
