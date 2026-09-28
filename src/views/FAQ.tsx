import React from 'react';
import { CTASection } from '@/src/components/ui';

const FAQ_SECTIONS = [
  {
    category: 'Getting started',
    questions: [
      {
        q: 'I already keep a note like this. Why switch?',
        a: "You don't have to switch, you have to paste. Bring what you've got and see what comes out the other side. If it isn't better than your note, close the tab.",
      },
      {
        q: 'How often should I log?',
        a: 'Whenever something happens. Most PMs log once or twice a week, and the day before their 1:1 is the natural checkpoint.',
      },
      {
        q: 'Where can I log from?',
        a: 'The web, Slack, email and the iOS app, all into the same log.',
      },
      {
        q: "What if my work doesn't feel impressive?",
        a: "Most important product work is invisible. It's the meeting where you prevented a bad decision, or the document that aligned three teams. Prodlog helps you recognize that these are the moments that actually drive outcomes.",
      },
      {
        q: 'How is this different from a brag document?',
        a: 'A brag document is where you write things down. Prodlog is where those notes turn into something: prep for your next 1:1, a draft for your review, and a portfolio when you move.',
      },
    ],
  },
  {
    category: '1:1s and reviews',
    questions: [
      {
        q: 'How does 1:1 prep work?',
        a: 'Tell Prodlog your 1:1 day. The day before, it shows everything you logged since the last one and asks what’s missing. Copy it into your 1:1 doc, share it, skip that week, or move it.',
      },
      {
        q: "What if I don't have regular 1:1s?",
        a: 'Pick a day and Prodlog sends a weekly recap instead.',
      },
      {
        q: 'Does 1:1 prep count against my summaries?',
        a: "No. It's never metered, on any plan.",
      },
    ],
  },
  {
    category: 'Privacy and security',
    questions: [
      {
        q: 'Can I keep everything private forever?',
        a: 'Absolutely. Many people use Prodlog purely as a private log of their own growth and the reasoning behind their decisions.',
      },
      {
        q: 'Can my manager see my log?',
        a: 'No. Only what you copy, send or publish.',
      },
      {
        q: 'Can a collaborator confirm an entry?',
        a: 'Yes. You send them a link and they confirm the entry with one click, no account required.',
      },
      {
        q: 'Can I export everything?',
        a: 'Yes. You are never locked in. Export to CSV or PDF whenever you like.',
      },
    ],
  },
  {
    category: 'Product fit',
    questions: [
      {
        q: 'Will this make me overthink my work?',
        a: "Ideally, yes. Reflection is a core part of the senior PM craft. Taking five minutes to ask 'What actually moved here?' makes you a better strategist.",
      },
      {
        q: 'What happens if I stop using Prodlog?',
        a: 'Your data remains private and accessible. Your log should outlast any stretch where you stop logging.',
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
          <h1 className="serif-headline text-3xl md:text-[48px] mb-4 md:mb-6 text-ink leading-tight">
            Frequently asked questions
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl md:max-w-none mx-auto md:mx-0">
            Honest answers to common questions.
          </p>
        </div>
      </div>
    </header>

    {/* Featured Question */}
    <div className="bg-surface border border-ink/20 rounded-xl p-8 mb-16">
      <div className="text-[10px] text-ink uppercase tracking-wider mb-3 font-semibold">Most Asked</div>
      <h3 className="text-ink font-semibold text-lg mb-4">What if my work doesn't feel impressive?</h3>
      <p className="text-muted-foreground leading-relaxed">
        Most important product work is invisible. It's the meeting where you prevented a bad decision,
        or the document that aligned three teams. Prodlog helps you recognize that these are the
        moments that actually drive outcomes. You don't need to ship a feature to have something worth logging.
      </p>
    </div>

    {/* FAQ Sections */}
    <div className="space-y-12 mb-16">
      {FAQ_SECTIONS.map((section, i) => (
        <div key={i}>
          <h2 className="text-ink font-semibold text-lg mb-6 pb-2 border-b border-border">
            {section.category}
          </h2>
          <div className="space-y-6">
            {section.questions.map((faq, j) => (
              <div key={j} className="bg-surface border border-border rounded-lg p-6 hover:border-ink/30 transition-colors">
                <h3 className="text-ink font-medium mb-3">{faq.q}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Pull Quote */}
    <div className="text-center py-12 border-t border-b border-border mb-12">
      <p className="serif-headline text-xl md:text-2xl text-ink italic max-w-2xl mx-auto">
        "You don't need to log everything. Just log what you'd regret forgetting."
      </p>
    </div>

    {/* Still have questions */}
    <div className="bg-muted border border-border rounded-xl p-8 mb-12 text-center">
      <h3 className="text-ink font-semibold mb-2">Still have questions?</h3>
      <p className="text-muted-foreground text-sm mb-4">We're happy to help.</p>
      <a 
        href="mailto:hello@prodlog.app" 
        className="inline-flex items-center gap-2 text-ink text-sm font-medium hover:underline"
      >
        Contact us →
      </a>
    </div>

    <div className="text-center">
      <CTASection showSecondary={false} />
    </div>
  </div>
);
