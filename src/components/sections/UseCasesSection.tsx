import React from 'react';

const USE_CASES = [
  { h: 'Performance reviews.', p: 'Walk in with clear, specific examples of your impact.' },
  { h: 'Resumes & promotions.', p: 'Turn months of work into concise, credible bullets.' },
  { h: 'Interviews.', p: 'Answer "Tell me about a time..." without scrambling.' },
];

export const UseCasesSection = () => (
  <section className="py-24 px-8 md:px-12 bg-ink border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary text-center leading-tight">
        Built for the moments that matter
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {USE_CASES.map((item, i) => (
          <div key={i} className="p-8 border border-divider rounded bg-charcoal/30 hover:border-impact/50 transition-colors">
            <h4 className="text-primary font-semibold mb-3">{item.h}</h4>
            <p className="text-secondary text-sm leading-relaxed">{item.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
