import React from 'react';
import { CTASection, PageHeader } from '@/src/components/ui';

const FAQ_DATA = [
  {
    q: "What if my work doesn't feel impressive?",
    a: "Most important product work is invisible. It's the meeting where you prevented a bad decision, or the document that aligned three teams. Prodlog helps you recognize that these are the moments that actually drive outcomes.",
  },
  {
    q: 'How is this different from a brag document?',
    a: "Brag documents are performance-oriented and often created after the fact. Prodlog is a capture system. It's designed for the 'raw' version of your work, which is then refined into the 'brag' version only when needed.",
  },
  {
    q: 'How often should I actually log impact?',
    a: 'Whenever it happens. For most PMs, this is 1-2 times a week. It takes less than five minutes.',
  },
  {
    q: 'Can I keep everything private forever?',
    a: 'Absolutely. Many of our users use Prodlog purely as a personal career ledger to track their own growth and decision-making logic.',
  },
  {
    q: 'Is this only for PMs?',
    a: 'While built for PMs, anyone in a role where outcomes are more important than outputs (Designers, Engineering Leads, Product Marketers) will find it useful.',
  },
  {
    q: 'Will this make me overthink my work?',
    a: "Ideally, yes. Reflection is a core part of the senior PM craft. Taking five minutes to ask 'What was the actual impact here?' makes you a better strategist.",
  },
  {
    q: 'How does validation work?',
    a: "You can send a 'Validation Request' to a collaborator. They get a simple link to confirm the accuracy of your impact card. It's a quiet way to build a third-party audit trail for your claims.",
  },
  {
    q: 'Can I export everything?',
    a: 'Yes. You are never locked in. Export to CSV, PDF, or Markdown whenever you like.',
  },
  {
    q: 'What happens if I stop using Prodlog?',
    a: 'Your data remains private and accessible. We believe career infrastructure should be permanent, even if your usage is seasonal.',
  },
];

export const FAQPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Frequently asked questions"
      subtitle="Honest answers to common questions and unspoken anxieties."
    />

    <div className="space-y-12 mb-20">
      {FAQ_DATA.map((faq, i) => (
        <div key={i} className="max-w-2xl">
          <h3 className="text-primary font-medium mb-3">{faq.q}</h3>
          <p className="text-secondary text-sm leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>

    <div className="pt-12 border-t border-divider">
      <p className="text-secondary mb-8">
        You don't need to log everything. You just need to log what you'd regret forgetting.
      </p>
      <CTASection centered={false} showSecondary={false} />
    </div>
  </div>
);
