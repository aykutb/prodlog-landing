'use client';

import React, { useRef, useState } from 'react';
import { PreviewEntryCard, type PreviewEntry } from '@/src/components/ui';

// Four parallel options, deliberately unnumbered: they are not a sequence.
const OUTPUTS = [
  { lead: 'Review season.', rest: 'A draft built from your own entries, not a blank page.' },
  { lead: 'Recruiter call.', rest: 'Three stories with the numbers already attached.' },
  { lead: 'Resume update.', rest: 'Bullets written around outcomes.' },
  { lead: 'Interview prep.', rest: 'STAR structure, from things that actually happened.' },
];

// The same three entries as Section 1, a few weeks on: the scope call has its
// outcome filled in now. The input to every tab below is this fixed list.
const SOURCE_ENTRIES: PreviewEntry[] = [
  {
    date: 'Mar 12, 2026',
    title: 'Shipped the onboarding redesign',
    ownership: 'Led',
    outcome: 'Activation up 9% in four weeks',
    missingOutcome: false,
  },
  {
    date: 'Mar 2026',
    title: 'Killed the loyalty feature',
    ownership: 'Decided',
    outcome: 'Freed an eng pod for the bug backlog',
    missingOutcome: false,
  },
  {
    date: 'Mar 19, 2026',
    title: 'Scope call with Maya',
    ownership: 'Coached',
    outcome: 'Cut v1 scope by a third, kept the date',
    missingOutcome: false,
  },
];

type TabId = 'review' | 'recruiter' | 'resume' | 'interview';

const TABS: { id: TabId; label: string }[] = [
  { id: 'review', label: 'Review' },
  { id: 'recruiter', label: 'Recruiter' },
  { id: 'resume', label: 'Resume' },
  { id: 'interview', label: 'Interview' },
];

const REVIEW_PARAGRAPH =
  'In Q1 I led the onboarding redesign through two scope cuts and shipped it in March; activation is up 9% in the four weeks since. The harder call was killing the loyalty feature after discovery came back flat, which freed an eng pod for the bug backlog mid-quarter. I also coached Maya through the enterprise scope call, where we cut v1 by a third and kept the committed date.';

const RECRUITER_BULLETS = [
  'Led an onboarding redesign that lifted activation 9% within four weeks of launch.',
  'Killed a loyalty feature that discovery showed was flat, and moved a full eng pod onto the bug backlog.',
  'Coached a junior PM through an enterprise scope negotiation: v1 cut by a third, date kept.',
];

const RESUME_BULLETS = [
  'Led onboarding redesign; activation +9% in 4 weeks.',
  'Killed flat loyalty feature; recovered one eng pod.',
  'Cut enterprise v1 scope by a third with no date slip.',
];

const STAR_STORY = [
  {
    label: 'Situation',
    text: 'Loyalty had been on the roadmap for two quarters and leadership expected it to ship.',
  },
  {
    label: 'Task',
    text: 'Decide whether to build it anyway or walk it back, with discovery coming back flat.',
  },
  {
    label: 'Action',
    text: 'Rebuilt the retention model with the data team, presented the kill case to leadership, and redirected the pod to the bug backlog the same week.',
  },
  {
    label: 'Result',
    text: 'Saved a quarter of eng time, cleared 40% of the bug backlog, and the call held up in the next planning cycle.',
  },
];

const TabPanel = ({ tab }: { tab: TabId }) => {
  if (tab === 'review') {
    return <p className="text-secondary text-sm leading-relaxed">{REVIEW_PARAGRAPH}</p>;
  }
  if (tab === 'recruiter') {
    return (
      <ul className="space-y-3 list-none">
        {RECRUITER_BULLETS.map((b) => (
          <li key={b} className="flex gap-2.5 text-secondary text-sm leading-relaxed">
            <span className="text-deep-ink-blue shrink-0" aria-hidden="true">•</span>
            {b}
          </li>
        ))}
      </ul>
    );
  }
  if (tab === 'resume') {
    return (
      <ul className="space-y-2.5 list-none">
        {RESUME_BULLETS.map((b) => (
          <li key={b} className="flex gap-2.5 text-secondary text-sm leading-relaxed">
            <span className="text-deep-ink-blue shrink-0" aria-hidden="true">•</span>
            {b}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <dl className="space-y-4">
      {STAR_STORY.map((part) => (
        <div key={part.label}>
          <dt className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
            {part.label}
          </dt>
          <dd className="text-secondary text-sm leading-relaxed">{part.text}</dd>
        </div>
      ))}
    </dl>
  );
};

export const OutputsSection = () => {
  const [active, setActive] = useState<TabId>('review');
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    review: null,
    recruiter: null,
    resume: null,
    interview: null,
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === active);
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = (idx + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    const id = TABS[next].id;
    setActive(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-charcoal border-t border-divider">
      <div className="max-w-5xl mx-auto">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-10 text-primary text-center leading-tight">
          Write it once. Use it four ways.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {OUTPUTS.map((item) => (
            <div key={item.lead} className="p-4 md:p-5 border border-divider rounded-xl bg-white">
              <h3 className="text-primary font-semibold text-sm mb-1">{item.lead}</h3>
              <p className="text-secondary text-sm leading-relaxed">{item.rest}</p>
            </div>
          ))}
        </div>

        {/* The demo: the entries on the left never change, only the output does. */}
        <div className="border border-divider rounded-xl bg-white overflow-hidden shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 p-4 md:p-5 bg-charcoal/50 border-b md:border-b-0 md:border-r border-divider">
              <p className="text-[10px] text-muted uppercase tracking-wider mb-3">Your entries</p>
              <ul className="flex flex-col gap-2.5 list-none">
                {SOURCE_ENTRIES.map((entry) => (
                  <PreviewEntryCard key={entry.title} entry={entry} />
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 flex flex-col">
              <div
                role="tablist"
                aria-label="Generated output"
                onKeyDown={handleKeyDown}
                className="flex border-b border-divider"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}
                    role="tab"
                    id={`outputs-tab-${tab.id}`}
                    aria-selected={active === tab.id}
                    aria-controls="outputs-tabpanel"
                    tabIndex={active === tab.id ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className={`flex-1 py-3 text-xs md:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep-ink-blue/50 ${
                      active === tab.id
                        ? 'bg-white text-primary border-b-2 border-deep-ink-blue'
                        : 'text-muted hover:text-secondary bg-charcoal/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                key={active}
                role="tabpanel"
                id="outputs-tabpanel"
                aria-labelledby={`outputs-tab-${active}`}
                tabIndex={0}
                className="fade-in p-5 md:p-6 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep-ink-blue/50"
              >
                <TabPanel tab={active} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-secondary text-center mt-10 max-w-2xl mx-auto">
          Same entries, different compression. Generated, then edited by you.
        </p>
      </div>
    </section>
  );
};
