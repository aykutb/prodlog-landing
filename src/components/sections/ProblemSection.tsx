import React from 'react';

export const ProblemSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="serif-headline text-2xl md:text-[36px] mb-8 text-primary leading-tight">
          Product managers are judged on impact, not effort.
        </h2>
        <p className="text-secondary mb-4">
          Impact gets scattered.
        </p>
        <p className="text-secondary mb-6">
          By the time reviews or interviews come around, the details are gone.
        </p>
        <p className="text-secondary">
          Prodlog gives you one place to log what changed, while it's still fresh.
        </p>
      </div>

      {/* Visual Comparison */}
      <div className="space-y-4">
        {/* Scattered Sources - Faded/Messy */}
        <div className="relative">
          <div className="absolute -top-2 left-3 text-[10px] text-muted uppercase tracking-wider bg-ink px-2 z-10">Before</div>
          <div className="bg-ink border border-divider rounded-lg p-4 opacity-60">
            <div className="space-y-3">
              {/* Slack snippet */}
              <div className="flex items-start gap-2 p-2 bg-charcoal/50 rounded border border-divider/50">
                <div className="w-5 h-5 rounded bg-[#4A154B]/30 flex items-center justify-center shrink-0">
                  <span className="text-[8px] text-[#E01E5A]">#</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-muted mb-0.5">#product-updates</div>
                  <p className="text-[11px] text-secondary truncate">shipped the checkout fix, conversion looking better already...</p>
                </div>
              </div>
              {/* Jira snippet */}
              <div className="flex items-start gap-2 p-2 bg-charcoal/50 rounded border border-divider/50">
                <div className="w-5 h-5 rounded bg-[#0052CC]/20 flex items-center justify-center shrink-0">
                  <span className="text-[8px] text-[#0052CC]">◈</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-muted mb-0.5">PROD-2847</div>
                  <p className="text-[11px] text-secondary truncate">Checkout flow optimization - Status: Done</p>
                </div>
              </div>
              {/* PRD snippet */}
              <div className="flex items-start gap-2 p-2 bg-charcoal/50 rounded border border-divider/50">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-primary">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-muted mb-0.5">Q4 Checkout PRD v3</div>
                  <p className="text-[11px] text-secondary truncate">Goal: reduce abandonment rate by 15-20%...</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-[10px] text-muted italic">Scattered. Hard to find. Missing context.</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-impact/20 flex items-center justify-center">
            <span className="text-impact">↓</span>
          </div>
        </div>

        {/* Clean Impact Log - Full fidelity */}
        <div className="relative">
          <div className="absolute -top-2 left-3 text-[10px] text-impact uppercase tracking-wider bg-ink px-2 z-10 font-medium">After</div>
          <div className="bg-ink border border-impact/30 rounded-lg p-4 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]">
            {/* Impact Card Header */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal border border-divider text-muted flex items-center gap-1">
                <span className="text-impact">📅</span> Dec 15, 2024
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Done</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal border border-divider text-muted flex items-center gap-1">
                <span className="text-impact">📦</span> Stripe Checkout
              </span>
            </div>

            {/* Title */}
            <h4 className="text-primary font-semibold text-sm mb-3">Checkout Conversion Optimization</h4>

            {/* The Problem */}
            <div className="mb-3">
              <div className="text-[9px] text-muted uppercase tracking-wider mb-1">The Problem</div>
              <p className="text-[11px] text-secondary leading-relaxed">22% of users abandoned checkout at payment step. Mobile conversion was 40% lower than desktop.</p>
            </div>

            {/* The Solution */}
            <div className="mb-3">
              <div className="text-[9px] text-muted uppercase tracking-wider mb-1">The Solution</div>
              <p className="text-[11px] text-secondary leading-relaxed">Redesigned payment flow with Apple Pay, reduced form fields from 8 to 3, added progress indicator.</p>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 text-[10px]">↑</span>
                <div>
                  <div className="text-[9px] text-muted">Conversion</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">+14%</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 text-[10px]">↓</span>
                <div>
                  <div className="text-[9px] text-muted">Abandonment</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">-22%</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 text-[10px]">↑</span>
                <div>
                  <div className="text-[9px] text-muted">ARR Impact</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">+$2.4M</div>
                </div>
              </div>
            </div>

            {/* Teammates */}
            <div className="flex items-center gap-2 pt-2 border-t border-divider/50">
              <span className="text-[10px] text-muted">👥</span>
              <div className="flex gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-impact/10 text-impact">Alex Kim</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-0.5">
                  Jordan Lee <span className="text-[8px]">✓</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
