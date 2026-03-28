import React from 'react';
import { CTASection } from '@/src/components/ui';

export const HeroSection = () => (
  <section className="pt-40 pb-20 px-4 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-2xl md:text-[42px] mb-4 leading-tight text-primary">
      Document your work before it disappears.
    </h1>

    <p className="text-secondary text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
      A private log for PMs to capture impact, generate summaries, and own their career narrative.
    </p>

    <CTASection />

    {/* Hero Visual - Logs Page from prodlog2 */}
    <div className="relative mt-12 md:mt-16 bg-white border border-divider rounded-xl p-4 md:p-6 text-left shadow-[0_4px_40px_-10px_rgba(31,42,68,0.15)] hover:shadow-[0_8px_50px_-10px_rgba(31,42,68,0.25)] hover:border-deep-ink-blue/20 transition-all duration-500 ease-out transform hover:-translate-y-1">
      {/* Browser Chrome */}
      <div className="flex items-center justify-between mb-4 md:mb-5 pb-3 md:pb-4 border-b border-divider">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#27CA40]"></div>
        </div>
        <div className="text-muted text-[8px] md:text-[10px] bg-white px-2 md:px-3 py-1 rounded border border-divider shadow-sm">
          prodlog.app/logs
        </div>
        <div className="w-8 md:w-16"></div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-[7px] md:left-[9px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-deep-ink-blue via-deep-ink-blue/50 to-deep-ink-blue/10"></div>

        <div className="space-y-3 md:space-y-4">
          {/* Q4 2024 Header */}
          <div className="relative pl-6 md:pl-8">
            <span className="inline-flex items-center text-[9px] md:text-[10px] font-semibold px-2 md:px-2.5 py-1 bg-white border border-deep-ink-blue/30 text-primary rounded shadow-sm">
              Q4 2024
            </span>
          </div>

          {/* Log 1 - Checkout Conversion */}
          <div className="relative pl-6 md:pl-8">
            <div className="absolute left-0 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-deep-ink-blue bg-white flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-deep-ink-blue"></div>
            </div>
            <div className="absolute left-4 md:left-5 top-5 md:top-6 w-2 md:w-3 h-0.5 bg-deep-ink-blue/50"></div>
            
            <div className="rounded-lg border border-divider bg-white p-3 shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)] transition-colors hover:border-deep-ink-blue/30 md:p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded bg-white border border-divider text-muted flex items-center gap-1">
                    <span className="text-deep-ink-blue">📅</span> Dec 15, 2024
                  </span>
                  <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded bg-white border border-divider text-muted flex items-center gap-1">
                    <span className="text-deep-ink-blue">📦</span> Stripe Checkout
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded bg-sage-green/10 border border-sage-green/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-green"></div>
                  <span className="text-[9px] text-sage-green font-medium">Verified</span>
                </div>
              </div>
              
              <h4 className="text-primary font-semibold text-xs md:text-sm mb-1.5 md:mb-2 font-serif">Checkout Conversion Optimization</h4>
              <p className="text-secondary text-[9px] md:text-xs leading-relaxed mb-2 md:mb-3 line-clamp-2">Led cross-functional initiative to redesign checkout flow. Implemented Apple Pay integration, reduced form fields from 8 to 3, added progress indicator.</p>
              
              {/* Metrics */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[9px] md:text-[10px]">↑</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] md:text-[8px] text-muted leading-none">Conversion</span>
                    <span className="text-[9px] md:text-[10px] text-sage-green font-semibold leading-tight">+14%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[9px] md:text-[10px]">↓</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] md:text-[8px] text-muted leading-none">Abandonment</span>
                    <span className="text-[9px] md:text-[10px] text-sage-green font-semibold leading-tight">-22%</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-sage-green/10 border border-sage-green/20">
                  <span className="text-sage-green text-[10px]">↑</span>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-muted leading-none">ARR Impact</span>
                    <span className="text-[10px] text-sage-green font-semibold leading-tight">+$2.4M</span>
                  </div>
                </div>
              </div>

              {/* Teammates */}
              <div className="hidden md:flex items-center gap-2 pt-2 border-t border-divider">
                <span className="text-[9px] text-muted">👥</span>
                <div className="flex gap-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-deep-ink-blue/10 text-deep-ink-blue font-medium">Alex Kim</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-deep-ink-blue/10 text-deep-ink-blue font-medium flex items-center gap-0.5">
                    Jordan Lee <span className="text-[8px]">✓</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Log 2 - Platform Migration */}
          <div className="relative pl-6 md:pl-8 opacity-75">
            <div className="absolute left-0 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-deep-ink-blue/50 bg-white flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-warm-amber bg-warm-amber/20"></div>
            </div>
            <div className="absolute left-4 md:left-5 top-5 md:top-6 w-2 md:w-3 h-0.5 bg-deep-ink-blue/30"></div>
            
            <div className="rounded-lg border border-divider bg-white p-3 shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)] md:p-4">
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2">
                <span className="text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded bg-warm-amber/10 text-warm-amber border border-warm-amber/20 font-medium">In Progress</span>
                <span className="text-[8px] md:text-[10px] text-muted">Nov 28, 2024</span>
                <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded bg-white border border-divider text-muted">Infrastructure</span>
              </div>
              <h4 className="text-primary font-semibold text-xs md:text-sm font-serif">Platform Migration to AWS</h4>
              <p className="hidden md:block text-secondary text-xs leading-relaxed mt-1">Orchestrating migration for 50k+ users with zero downtime target.</p>
            </div>
          </div>

          {/* Q3 2024 Header */}
          <div className="hidden md:block relative pl-8">
            <span className="inline-flex items-center text-[10px] font-semibold px-2.5 py-1 bg-white border border-divider text-muted rounded">
              Q3 2024
            </span>
          </div>

          {/* Log 3 - Mentorship */}
          <div className="hidden md:block relative pl-8 opacity-50">
            <div className="absolute left-0 top-4 w-5 h-5 rounded-full border-2 border-deep-ink-blue/30 bg-white flex items-center justify-center z-10">
              <div className="w-2 h-2 rounded-full bg-sage-green/60"></div>
            </div>
            <div className="absolute left-5 top-6 w-3 h-0.5 bg-deep-ink-blue/20"></div>
            
            <div className="rounded-lg border border-divider bg-white p-4 shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-sage-green/10 text-sage-green border border-sage-green/20 font-medium">Done</span>
                <span className="text-[10px] text-muted">Sep 12, 2024</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-divider text-muted">Team</span>
              </div>
              <h4 className="text-primary font-semibold text-sm font-serif">PM Mentorship Program Launch</h4>
            </div>
          </div>

          {/* Log 4 - Analytics */}
          <div className="hidden md:block relative pl-8 opacity-30">
            <div className="absolute left-0 top-4 w-5 h-5 rounded-full border-2 border-deep-ink-blue/20 bg-white flex items-center justify-center z-10">
              <div className="w-2 h-2 rounded-full bg-sage-green/40"></div>
            </div>
            <div className="absolute left-5 top-6 w-3 h-0.5 bg-deep-ink-blue/10"></div>
            
            <div className="rounded-lg border border-divider bg-white p-4 shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-sage-green/10 text-sage-green border border-sage-green/20 font-medium">Done</span>
                <span className="text-[10px] text-muted">Aug 5, 2024</span>
              </div>
              <h4 className="text-primary font-semibold text-sm font-serif">Analytics Dashboard Redesign</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
