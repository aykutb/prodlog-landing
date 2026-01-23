import React from 'react';

const STEPS = [
  { step: '1', title: 'Log an impact.', body: 'What changed, what you owned, and when it happened.' },
  { step: '2', title: 'Add context.', body: 'Reflections, internal links, and raw data points (optional).' },
  { step: '3', title: 'Generate summaries.', body: 'Formatted for reviews, resumes, or interview prep.' },
];

export const HowItWorksSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary text-center leading-tight">
        Log once. Reuse forever.
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        {STEPS.map((item) => (
          <div key={item.step} className="text-center">
            <div className="text-impact text-4xl serif-headline mb-4 opacity-50">{item.step}</div>
            <h4 className="text-primary font-semibold mb-2">{item.title}</h4>
            <p className="text-secondary text-sm">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
