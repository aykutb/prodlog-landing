import React from 'react';

// Read in sequence, not searched: plain columns, no accordion, no icons.
// The quoted objection is the visual anchor; the answer sits under it.
const OBJECTIONS = [
  {
    q: '“I already do this in Slack.”',
    a: 'Good, you’re most of the way there. Paste it in and see what it becomes.',
  },
  {
    q: '“I never keep it up.”',
    a: 'Almost nobody does, unaided. That’s the friction we’re attacking, not your discipline.',
  },
  {
    q: '“My work isn’t that impressive.”',
    a: 'The entries that carry a review are usually the ones you’d never have thought to write down: the scope call, the thing you killed, the two weeks of alignment that looked like meetings.',
  },
];

export const ObjectionsSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 md:gap-8">
      {OBJECTIONS.map((item) => (
        <div key={item.q}>
          <h3 className="serif-headline text-lg md:text-xl text-primary leading-snug mb-3">
            {item.q}
          </h3>
          <p className="text-secondary text-sm leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </section>
);
