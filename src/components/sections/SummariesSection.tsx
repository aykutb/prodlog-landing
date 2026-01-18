import React, { useState } from 'react';

const SUMMARY_CONTENT = {
  review:
    'Synthesized feedback from 12 stakeholders to resolve the checkout bottleneck. Resulted in a 14% increase in conversion without increasing customer support load. Managed three engineering pods through a high-stakes migration.',
  resume:
    '• Led cross-functional alignment for the Q3 checkout redesign, increasing conversion by 14%.\n• Orchestrated the migration of legacy billing infrastructure for 50k+ users with zero downtime.\n• Mentored 2 associate PMs on impact mapping.',
  interview:
    'Situation: Checkout conversion was stagnant for 6 months.\nTask: Re-align engineering and design on a high-risk UI overhaul.\nAction: Ran an impact-mapping workshop to ruthlessly prioritize mobile-first fixes.\nResult: 14% lift in 4 weeks.',
} as const;

type TabKey = keyof typeof SUMMARY_CONTENT;

const TAB_LABELS: Record<TabKey, string> = {
  review: 'Performance Review',
  resume: 'Resume',
  interview: 'Interview (STAR)',
};

export const SummariesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('review');

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-center text-primary">
          Summaries for reviews, resumes, and interviews.
        </h2>
        <div className="border border-divider rounded-lg overflow-hidden bg-ink">
          <div className="flex border-b border-divider">
            {(Object.keys(SUMMARY_CONTENT) as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-charcoal text-primary' : 'text-muted hover:text-secondary'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
          <div className="p-12 min-h-[250px] font-mono text-secondary text-sm leading-relaxed whitespace-pre-line">
            {SUMMARY_CONTENT[activeTab]}
          </div>
        </div>
      </div>
    </section>
  );
};
