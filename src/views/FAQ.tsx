import React from 'react';
import { CTASection } from '@/src/components/ui';

const FAQ_SECTIONS = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'I already keep a note like this. Why switch?',
        a: "You don't have to switch, you have to paste. Bring what you've got and see what comes out the other side. If it isn't better than your note, close the tab.",
      },
      {
        q: 'How often should I log?',
        a: 'Whenever it happens. For most PMs, this is 1-2 times a week. It takes less than five minutes.',
      },
      {
        q: "What if my work doesn't feel impressive?",
        a: "Most important product work is invisible. It's the meeting where you prevented a bad decision, or the document that aligned three teams. Prodlog helps you recognize that these are the moments that actually drive outcomes.",
      },
      {
        q: 'How is this different from a brag document?',
        a: "Brag documents are performance-oriented and often created after the fact. Prodlog is a capture system. It's designed for the 'raw' version of your work, which is then refined into the 'brag' version only when needed.",
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Can I keep everything private forever?',
        a: 'Absolutely. Many of our users use Prodlog purely as a personal career ledger to track their own growth and decision-making logic.',
      },
      {
        q: 'Can a collaborator confirm an entry?',
        a: 'Yes. You send them a link and they confirm the entry with one click, no account required.',
      },
      {
        q: 'Can I export everything?',
        a: 'Yes. You are never locked in. Export to CSV, PDF, or Markdown whenever you like.',
      },
    ],
  },
  {
    category: 'Product Fit',
    questions: [
      {
        q: 'Will this make me overthink my work?',
        a: "Ideally, yes. Reflection is a core part of the senior PM craft. Taking five minutes to ask 'What actually moved here?' makes you a better strategist.",
      },
      {
        q: 'What happens if I stop using Prodlog?',
        a: 'Your data remains private and accessible. Your log should outlast any stretch where you stop adding to it.',
      },
    ],
  },
];

export const FAQPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in">
      <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-10 lg:gap-12">
        <div className="flex shrink-0 justify-center md:justify-start md:w-[min(21%,140px)] lg:w-[min(19%,150px)] md:self-stretch md:min-h-0 md:items-center md:flex">
          <img
            src="/question-icon.svg"
            alt=""
            className="h-14 w-14 object-contain object-center sm:h-16 sm:w-16 md:h-auto md:w-full md:max-w-full md:object-left"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center text-center md:text-left">
          <h1 className="serif-headline text-3xl md:text-[48px] mb-4 md:mb-6 text-primary leading-tight">
            Frequently asked questions
          </h1>
          <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl md:max-w-none mx-auto md:mx-0">
            Honest answers to common questions.
          </p>
        </div>
      </div>
    </header>

    {/* Featured Question */}
    <div className="bg-white border border-deep-ink-blue/20 rounded-xl p-8 mb-16 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
      <div className="text-[10px] text-deep-ink-blue uppercase tracking-wider mb-3 font-semibold">Most Asked</div>
      <h3 className="text-primary font-semibold text-lg mb-4">What if my work doesn't feel impressive?</h3>
      <p className="text-secondary leading-relaxed">
        Most important product work is invisible. It's the meeting where you prevented a bad decision,
        or the document that aligned three teams. Prodlog helps you recognize that these are the
        moments that actually drive outcomes. You don't need to ship a feature to have something worth logging.
      </p>
    </div>

    {/* FAQ Sections */}
    <div className="space-y-12 mb-16">
      {FAQ_SECTIONS.map((section, i) => (
        <div key={i}>
          <h2 className="text-primary font-semibold text-lg mb-6 pb-2 border-b border-divider">
            {section.category}
          </h2>
          <div className="space-y-6">
            {section.questions.map((faq, j) => (
              <div key={j} className="bg-white border border-divider rounded-lg p-6 hover:border-deep-ink-blue/30 transition-colors">
                <h3 className="text-primary font-medium mb-3">{faq.q}</h3>
                <p className="text-secondary text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Pull Quote */}
    <div className="text-center py-12 border-t border-b border-divider mb-12">
      <p className="serif-headline text-xl md:text-2xl text-primary italic max-w-2xl mx-auto">
        "You don't need to log everything. Just log what you'd regret forgetting."
      </p>
    </div>

    {/* Still have questions */}
    <div className="bg-charcoal border border-divider rounded-xl p-8 mb-12 text-center">
      <h3 className="text-primary font-semibold mb-2">Still have questions?</h3>
      <p className="text-secondary text-sm mb-4">We're happy to help.</p>
      <a 
        href="mailto:hello@prodlog.app" 
        className="inline-flex items-center gap-2 text-deep-ink-blue text-sm font-medium hover:underline"
      >
        Contact us →
      </a>
    </div>

    <div className="text-center">
      <CTASection showSecondary={false} />
    </div>
  </div>
);
