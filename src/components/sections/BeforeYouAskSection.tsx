import React from 'react';

// Read in sequence: plain cards, no accordion, no icons. The first two are
// the habit objections, so they get the wider row (2 + 3 on desktop).
const QUESTIONS = [
  {
    q: '“I already keep notes in Slack.”',
    a: 'Good, keep doing that. Paste them in, or log straight from Slack, and Prodlog turns them into entries. You don’t start a new habit. You get something back from the one you have.',
  },
  {
    q: '“I never keep it up.”',
    a: 'You don’t need a ritual. Prodlog asks the day before your 1:1, when you’re already thinking about what to say. Answer from Slack, your phone or your inbox.',
  },
  {
    q: '“My work isn’t that impressive.”',
    a: 'The best entries aren’t launches. A scope you cut, a bad launch you stopped, a PM you coached: those are the ones you forget first and undersell most.',
  },
  {
    q: '“My company already has a review tool.”',
    a: 'Keep using it. Your company’s tool keeps your history for your company. Prodlog keeps it for you, and it comes with you when you leave.',
  },
  {
    q: '“Is my log private?”',
    a: 'Yes. Nothing leaves your log unless you send it or publish it.',
  },
];

export const BeforeYouAskSection = () => (
  <section className="py-24 px-4 sm:px-8 md:px-12 bg-muted border-t border-border">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-10 text-ink text-center leading-tight">Before you ask.</h2>
      <div className="grid gap-4 md:grid-cols-6 md:gap-6">
        {QUESTIONS.map((item, i) => (
          <div key={item.q} className={`bg-surface border border-border rounded-xl p-6 ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}>
            <h3 className="serif-headline text-lg md:text-xl text-ink leading-snug mb-3">{item.q}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
