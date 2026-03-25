import React from 'react';

export const ProblemSection = () => (
  <section className="py-24 px-4 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      {/* Centered Header */}
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary leading-tight text-center">
        Product managers are judged on impact, not effort.
      </h2>

      {/* Horizontal Before → After Visual */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Before - Scattered Sources */}
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute -top-2 left-3 text-[10px] text-muted uppercase tracking-wider bg-charcoal px-2 z-10">Before</div>
            <div className="bg-white border border-divider rounded-lg p-3 md:p-4 opacity-70">
              <div className="space-y-2 md:space-y-3">
                {/* Slack snippet */}
                <div className="flex items-start gap-2 p-2 bg-charcoal rounded border border-divider">
                  <div className="w-5 h-5 rounded bg-[#4A154B]/10 flex items-center justify-center shrink-0">
                    <span className="text-[8px] text-[#4A154B]">#</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] md:text-[10px] text-muted mb-0.5">#product-updates</div>
                    <p className="text-[10px] md:text-[11px] text-secondary truncate">shipped the checkout fix...</p>
                  </div>
                </div>
                {/* Jira snippet */}
                <div className="flex items-start gap-2 p-2 bg-charcoal rounded border border-divider">
                  <div className="w-5 h-5 rounded bg-[#0052CC]/10 flex items-center justify-center shrink-0">
                    <span className="text-[8px] text-[#0052CC]">◈</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] md:text-[10px] text-muted mb-0.5">PROD-2847</div>
                    <p className="text-[10px] md:text-[11px] text-secondary truncate">Checkout optimization - Done</p>
                  </div>
                </div>
                {/* PRD snippet */}
                <div className="flex items-start gap-2 p-2 bg-charcoal rounded border border-divider">
                  <div className="w-5 h-5 rounded bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="text-[9px] text-primary">📄</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] md:text-[10px] text-muted mb-0.5">Q4 Checkout PRD</div>
                    <p className="text-[10px] md:text-[11px] text-secondary truncate">reduce abandonment by 15%...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-deep-ink-blue/10 flex items-center justify-center">
            <span className="text-deep-ink-blue text-lg md:text-xl hidden md:block">→</span>
            <span className="text-deep-ink-blue text-lg md:hidden">↓</span>
          </div>
        </div>

        {/* After - clean log */}
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute -top-2 left-3 text-[10px] text-deep-ink-blue uppercase tracking-wider bg-charcoal px-2 z-10 font-medium">After</div>
            <div className="bg-white border border-deep-ink-blue/20 rounded-lg p-3 md:p-4 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.15)]">
              {/* Impact Card Header */}
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2 md:mb-3">
                <span className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded bg-sage-green/10 text-sage-green border border-sage-green/20 font-medium">Done</span>
                <span className="text-[9px] md:text-[10px] text-muted">Dec 15, 2024</span>
                <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded bg-charcoal border border-divider text-muted">Stripe Checkout</span>
              </div>

              {/* Title */}
              <h4 className="text-primary font-semibold text-xs md:text-sm mb-2 md:mb-3 font-serif">Checkout Conversion Optimization</h4>

              {/* Metrics */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className="flex items-center gap-1 px-1.5 md:px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[9px] md:text-[10px]">↑</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] md:text-[8px] text-muted leading-none">Conversion</span>
                    <span className="text-[9px] md:text-[10px] text-sage-green font-semibold leading-tight">+14%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-1.5 md:px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[9px] md:text-[10px]">↓</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] md:text-[8px] text-muted leading-none">Abandonment</span>
                    <span className="text-[9px] md:text-[10px] text-sage-green font-semibold leading-tight">-22%</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[10px]">↑</span>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-muted leading-none">ARR</span>
                    <span className="text-[10px] text-sage-green font-semibold leading-tight">+$2.4M</span>
                  </div>
                </div>
              </div>

              {/* Teammates */}
              <div className="hidden md:flex items-center gap-2 pt-2 border-t border-divider">
                <span className="text-[9px] text-muted">👥</span>
                <div className="flex gap-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-deep-ink-blue/10 text-deep-ink-blue">Alex Kim</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-deep-ink-blue/10 text-deep-ink-blue flex items-center gap-0.5">
                    Jordan Lee <span className="text-[7px]">✓</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
