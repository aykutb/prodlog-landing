import React, { useState } from 'react';

type TabKey = 'review' | 'resume' | 'interview';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'review', label: 'Performance Review', icon: '💼' },
  { key: 'resume', label: 'Resume Bullets', icon: '📋' },
  { key: 'interview', label: 'Interview (STAR)', icon: '💬' },
];

const SUMMARY_DATA: Record<TabKey, { title: string; visibility: string; visibilityColor: string; content: string; impacts: { title: string; date: string }[] }> = {
  review: {
    title: 'Q4 2024 Performance Review',
    visibility: 'Private',
    visibilityColor: 'text-muted border-divider',
    content: `In Q4 2024, I led three critical initiatives that drove significant business outcomes:

**Checkout Conversion Optimization**
Synthesized feedback from 12 stakeholders to resolve the checkout bottleneck. Partnered with engineering and design to implement Apple Pay integration and reduce form fields from 8 to 3. Resulted in a 14% increase in conversion and $2.4M ARR impact without increasing customer support load.

**Platform Migration**
Orchestrated the migration of legacy billing infrastructure for 50k+ users. Managed three engineering pods through a high-stakes migration with zero downtime. Established new monitoring dashboards that reduced incident response time by 40%.

**Team Development**
Mentored 2 associate PMs on impact mapping and stakeholder management. Both received promotions in the following cycle.`,
    impacts: [
      { title: 'Checkout Conversion Optimization', date: 'Dec 15, 2024' },
      { title: 'Platform Migration', date: 'Nov 28, 2024' },
      { title: 'PM Mentorship Program', date: 'Oct 12, 2024' },
    ],
  },
  resume: {
    title: 'Senior PM Resume Bullets',
    visibility: 'Shareable',
    visibilityColor: 'text-blue-400 border-blue-400/30',
    content: `• Led cross-functional alignment for checkout redesign, increasing conversion by 14% and driving $2.4M in incremental ARR

• Orchestrated migration of legacy billing infrastructure for 50k+ users with zero downtime, reducing incident response time by 40%

• Partnered with engineering to implement Apple Pay integration, reducing checkout abandonment by 22%

• Mentored 2 associate PMs on impact mapping and stakeholder management, both promoted within 6 months

• Established product analytics framework adopted by 4 product teams, improving experiment velocity by 35%`,
    impacts: [
      { title: 'Checkout Conversion Optimization', date: 'Dec 15, 2024' },
      { title: 'Platform Migration', date: 'Nov 28, 2024' },
    ],
  },
  interview: {
    title: 'Checkout Redesign - STAR Format',
    visibility: 'Anonymized',
    visibilityColor: 'text-amber-400 border-amber-400/30',
    content: `**Situation**
Checkout conversion had been stagnant for 6 months. Mobile conversion was 40% lower than desktop, and 22% of users abandoned at the payment step. Leadership was considering a complete platform rewrite.

**Task**
Re-align engineering and design on a high-risk UI overhaul within Q4 timeline. Needed to prove incremental improvements could deliver results without the risk of a full rewrite.

**Action**
Ran an impact-mapping workshop with engineering leads to ruthlessly prioritize mobile-first fixes. Synthesized contradictory feedback from 12 stakeholders to build consensus. Partnered with design to reduce form fields from 8 to 3 and integrated Apple Pay for faster checkout.

**Result**
Achieved 14% lift in conversion within 4 weeks of launch. Reduced checkout abandonment by 22%. Generated $2.4M in incremental ARR. Approach was adopted as the standard for future UI initiatives.`,
    impacts: [
      { title: 'Checkout Conversion Optimization', date: 'Dec 15, 2024' },
    ],
  },
};

export const SummariesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('review');
  const data = SUMMARY_DATA[activeTab];

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-center text-primary leading-tight">
          Summaries for reviews, resumes, and interviews.
        </h2>

        {/* Summary View Mock */}
        <div className="border border-divider rounded-lg overflow-hidden bg-ink">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-divider bg-charcoal/50">
            <div className="flex items-center gap-3">
              <span className="text-lg">{TABS.find(t => t.key === activeTab)?.icon}</span>
              <div>
                <h3 className="text-primary font-medium text-sm">{data.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${data.visibilityColor}`}>
                    {data.visibility}
                  </span>
                  <span className="text-[10px] text-muted">•</span>
                  <span className="text-[10px] text-muted">{data.impacts.length} impacts</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-[10px] px-3 py-1.5 rounded border border-divider text-muted hover:text-primary hover:border-impact/50 transition-colors flex items-center gap-1.5">
                <span>📋</span> Copy
              </button>
              <button className="text-[10px] px-3 py-1.5 rounded border border-divider text-muted hover:text-primary hover:border-impact/50 transition-colors flex items-center gap-1.5">
                <span>⬇</span> Export
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-divider">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-ink text-primary border-b-2 border-impact'
                    : 'text-muted hover:text-secondary bg-charcoal/30'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            <div className="prose prose-sm prose-invert max-w-none">
              <div className="text-secondary text-sm leading-relaxed whitespace-pre-line font-mono">
                {data.content.split('**').map((part, i) => 
                  i % 2 === 1 ? (
                    <strong key={i} className="text-primary font-semibold not-italic">{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Source Impacts */}
          <div className="px-6 md:px-8 pb-6">
            <div className="border-t border-divider pt-4">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>🎯</span> Source Impacts ({data.impacts.length})
              </div>
              <div className="space-y-2">
                {data.impacts.map((impact, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-charcoal/50 rounded-lg border border-divider/50 hover:border-impact/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-impact text-xs">●</span>
                      <span className="text-primary text-xs">{impact.title}</span>
                    </div>
                    <span className="text-[10px] text-muted">{impact.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
