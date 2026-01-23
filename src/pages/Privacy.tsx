import React from 'react';
import { CTASection, PageHeader, Section } from '@/src/components/ui';

export const PrivacyPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Privacy is the foundation, not a feature"
      subtitle="Prodlog exists because career work deserves a private place to live."
    />

    <div className="space-y-16">
      <Section title="1. Private by default">
        <p>
          Every impact you capture begins its life as a private record. No one—not your manager,
          not your peers, not our internal team—can see it without your explicit action.
        </p>
      </Section>

      <Section title="2. Anonymized by design">
        <p>
          Sharing internally often requires stripping away sensitive identifiers. Our system helps
          you remove names and specific identifiers so you can share the patterns of your impact
          without the risk of exposing trade secrets.
        </p>
      </Section>

      <Section title="3. Sharing is deliberate">
        <p>
          Sharing is a point-to-point transaction that you control. There are no public profiles that can be crawled by search engines. You decide what to share and with whom.
        </p>
      </Section>

      <Section title="4. Your data stays yours">
        <p>
          We do not sell your data. We do not train models on your private professional
          reflections. You can export your entire history in a portable format or delete your
          account at any time.
        </p>
      </Section>

      <div className="pt-12 border-t border-divider">
        <CTASection centered={false} showSecondary={false} />
      </div>
    </div>
  </div>
);
