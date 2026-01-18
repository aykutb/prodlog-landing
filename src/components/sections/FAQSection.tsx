import React from 'react';

const FAQ_DATA = [
  {
    q: 'What counts as impact?',
    a: "Impact isn't just shipping features. It's alignment, risk mitigation, strategic pivots, and team mentorship. Anything that moved the needle for your product or organization.",
  },
  {
    q: 'How is this different from a brag document?',
    a: "Brag documents are usually unorganized lists. Prodlog is infrastructure—it forces structure, captures the 'why' while it's fresh, and automates the synthesis for different audiences.",
  },
  {
    q: 'Can I keep everything private?',
    a: 'Yes. In fact, 90% of our users never share a single log. Most use Prodlog as a private high-fidelity mirror of their professional growth.',
  },
  {
    q: 'How does anonymized sharing work?',
    a: 'When you export, our system flags sensitive terms (exact dollars, specific client names) and offers to replace them with generic descriptors suitable for a public resume.',
  },
];

export const FAQSection = () => (
  <section className="py-24 border-t border-divider">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="serif-headline text-3xl mb-12 text-center text-primary">
        Frequently asked questions.
      </h2>
      <div className="space-y-8">
        {FAQ_DATA.map((faq, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-primary font-medium">{faq.q}</h4>
            <p className="text-secondary text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
