import React from 'react';

export const DifferentiationSection = () => (
  <section className="py-24 border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-8 text-primary">
        Why this isn't a Notion template.
      </h2>
      <ul className="space-y-6 mb-10">
        <li className="flex gap-4">
          <span className="text-impact">•</span>
          <p className="text-secondary">
            <span className="text-primary font-medium">Structured impact, not freeform notes.</span>{' '}
            Logic flows specifically designed for PM career milestones.
          </p>
        </li>
        <li className="flex gap-4">
          <span className="text-impact">•</span>
          <p className="text-secondary">
            <span className="text-primary font-medium">Built-in privacy and anonymization.</span>{' '}
            Strip away sensitive company data automatically before exporting.
          </p>
        </li>
        <li className="flex gap-4">
          <span className="text-impact">•</span>
          <p className="text-secondary">
            <span className="text-primary font-medium">Summaries designed for career moments.</span>{' '}
            One-click transformations into STAR format or resume bullets.
          </p>
        </li>
      </ul>
      <p className="text-primary italic border-l-2 border-impact pl-4">
        Notion stores information. Prodlog makes impact usable.
      </p>
    </div>
  </section>
);
