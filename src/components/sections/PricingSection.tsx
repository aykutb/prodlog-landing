import React from 'react';

export const PricingSection = () => (
  <section className="py-24 border-t border-divider bg-charcoal/30">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-center text-primary">Simple pricing.</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="p-8 border border-divider rounded bg-ink flex flex-col">
          <div className="text-primary font-bold text-xl mb-1">Free</div>
          <div className="text-muted text-sm mb-6">For starting out</div>
          <ul className="space-y-3 mb-8 text-sm text-secondary flex-1">
            <li>• Up to 12 Impact Cards per year</li>
            <li>• Standard summary generation</li>
            <li>• Private reflections</li>
          </ul>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full py-2 border border-divider rounded text-primary text-sm hover:bg-charcoal transition-colors text-center block"
          >
            Start Free
          </a>
        </div>
        <div className="p-8 border border-impact rounded bg-ink flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-impact text-white text-[10px] px-3 py-1 uppercase tracking-tighter">
            Recommended
          </div>
          <div className="text-primary font-bold text-xl mb-1">Pro</div>
          <div className="text-muted text-sm mb-6">$12 / month</div>
          <ul className="space-y-3 mb-8 text-sm text-secondary flex-1">
            <li>• Unlimited Impact Cards</li>
            <li>• AI-assisted anonymization</li>
            <li>• Custom export formats (Resume, Review)</li>
            <li>• Priority collaborator validation</li>
          </ul>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full py-2 bg-impact text-white rounded text-sm hover:opacity-90 transition-colors text-center block"
          >
            Get Pro
          </a>
        </div>
      </div>
      <p className="text-center mt-8 text-muted text-xs">
        Less than a coffee a week, built for career moments.
      </p>
    </div>
  </section>
);
