import React from 'react';
import { CTASection, PageHeader } from '@/src/components/ui';

const FAQ_SECTIONS = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How often should I log impact?',
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
        q: 'How does validation work?',
        a: "You can send a 'Validation Request' to a collaborator. They get a simple link to confirm the accuracy of your impact card. It's a quiet way to build a third-party audit trail for your claims.",
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
        q: 'Is this only for PMs?',
        a: 'While built for PMs, anyone in a role where outcomes are more important than outputs (Designers, Engineering Leads, Product Marketers) will find it useful.',
      },
      {
        q: 'Will this make me overthink my work?',
        a: "Ideally, yes. Reflection is a core part of the senior PM craft. Taking five minutes to ask 'What was the actual impact here?' makes you a better strategist.",
      },
      {
        q: 'What happens if I stop using Prodlog?',
        a: 'Your data remains private and accessible. We believe career infrastructure should be permanent, even if your usage is seasonal.',
      },
    ],
  },
];

export const FAQPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Frequently asked questions"
      subtitle="Honest answers to common questions."
    />

    {/* Featured Question */}
    <div className="bg-white border border-deep-ink-blue/20 rounded-xl p-8 mb-16 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
      <div className="text-[10px] text-deep-ink-blue uppercase tracking-wider mb-3 font-semibold">Most Asked</div>
      <h3 className="text-primary font-semibold text-lg mb-4">What if my work doesn't feel impressive?</h3>
      <p className="text-secondary leading-relaxed">
        Most important product work is invisible. It's the meeting where you prevented a bad decision, 
        or the document that aligned three teams. Prodlog helps you recognize that these are the 
        moments that actually drive outcomes. You don't need to ship a feature to have impact.
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
