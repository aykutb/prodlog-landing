import React from 'react';
import { CTASection, PageHeader, Section } from '@/src/components/ui';

export const HowItWorksPage = () => (
  <div className="max-w-4xl mx-auto px-6 pb-24">
    <PageHeader
      title="How Prodlog works"
      subtitle="Prodlog is designed around how memory actually works — not how tools wish it did. It helps you capture what matters before it fades."
    />

    <div className="space-y-16">
      <Section title="1. Why impact is captured as it happens">
        <p>
          Memory decay is real. The nuances of a difficult negotiation or the specific data point
          that pivoted a strategy are often lost within forty-eight hours.
        </p>
        <p>
          Waiting until review season creates recency bias, where only your last month of work is
          rewarded. Small, regular capture beats perfect documentation every time.
        </p>
      </Section>

      <Section title="2. Why reflections are optional">
        <p>
          Not every impact needs a story. Sometimes a win is just a win. We don't force you to
          write a narrative for every entry.
        </p>
        <p>
          Context is added only when it matters. Reflection is for deep thinking and personal
          growth, not for performing to an audience.
        </p>
      </Section>

      <Section title="3. Why summaries are generated later">
        <p>
          Different moments need different framing. A performance review requires a narrative of
          growth; a resume requires a bullet point of efficiency; an interview requires a
          STAR-format story of leadership.
        </p>
        <p>Summaries turn raw work into usable evidence, formatted specifically for the recipient.</p>
      </Section>

      <Section title="4. Why privacy comes first">
        <p>
          Career work is sensitive. If you feel watched, you won't be honest. Prodlog provides a
          safe harbor for the messy reality of product management.
        </p>
        <p>
          Safety enables honesty. Sharing is always a deliberate, intentional choice, never a
          default.
        </p>
      </Section>

      <div className="pt-12 border-t border-divider">
        <p className="text-primary italic mb-8">
          Prodlog is built to reduce regret, not increase output.
        </p>
        <CTASection centered={false} showSecondary={false} />
      </div>
    </div>
  </div>
);
