import React from 'react';

const USE_CASES = [
  { h: 'Performance reviews', p: 'Walk in with 12 months of documented wins. No more scrambling to remember what you shipped.' },
  { h: 'Resume updates', p: 'Generate bullet points from real data. Quantified impact, ready to copy-paste.' },
  { h: 'Interviews', p: 'Answer behavioral questions with confidence and receipts. Every STAR story at your fingertips.' },
];

export const UseCasesSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary text-center leading-tight">
        Built for the moments that matter
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {USE_CASES.map((item, i) => (
          <div key={i} className="p-8 border border-divider rounded-xl bg-white hover:border-deep-ink-blue/30 hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all">
            <h4 className="text-primary font-semibold mb-3">{item.h}</h4>
            <p className="text-secondary text-sm leading-relaxed">{item.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
