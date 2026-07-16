import React from 'react';
import Link from 'next/link';

export const PricingSection = () => (
  <section className="py-24 border-t border-divider bg-charcoal/30">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-center text-primary">
        Free while we're in early access.
      </h2>
      <p className="text-center text-secondary text-sm mb-12">
        The first 1,000 members get Pro free for a year.
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="p-8 border border-divider rounded bg-ink flex flex-col">
          <div className="text-primary font-bold text-xl mb-1">Free</div>
          <div className="text-muted text-sm mb-6">$0 forever</div>
          <ul className="space-y-3 mb-8 text-sm text-secondary flex-1">
            <li>• Unlimited entries</li>
            <li>• Private by default</li>
            <li>• 3 AI summaries per month</li>
            <li>• Markdown &amp; CSV export</li>
          </ul>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full py-2 border border-divider rounded text-primary text-sm hover:bg-charcoal transition-colors text-center block"
          >
            Start logging
          </a>
        </div>
        <div className="p-8 border border-impact rounded bg-ink flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-impact text-white text-[10px] px-3 py-1 uppercase tracking-tighter">
            Included in early access
          </div>
          <div className="text-primary font-bold text-xl mb-1">Pro</div>
          <div className="text-sm mb-6">
            <s className="text-muted">$19/mo</s>{' '}
            <span className="text-primary">Free for founding members</span>
          </div>
          <ul className="space-y-3 mb-8 text-sm text-secondary flex-1">
            <li>• Unlimited entries</li>
            <li>• Unlimited AI summaries</li>
            <li>• Validation requests &amp; public portfolio</li>
            <li>• PDF export, resume bullets, STAR story bank</li>
          </ul>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full py-2 bg-impact text-white rounded text-sm hover:opacity-90 transition-colors text-center block"
          >
            Claim founding access
          </a>
        </div>
      </div>
      <p className="text-center mt-8 text-muted text-xs">
        <Link href="/pricing" className="hover:text-primary transition-colors underline underline-offset-2">
          See full pricing details
        </Link>
      </p>
    </div>
  </section>
);
