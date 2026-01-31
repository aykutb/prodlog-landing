import React from 'react';
import { CTASection } from '@/src/components/ui';

export const HowItWorksPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    {/* Hero Header */}
    <header className="pt-32 pb-16 text-center fade-in">
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
        How Prodlog works
      </h1>
      <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Capture. Reflect. Summarize. Share.
      </p>
    </header>

    {/* Hero Screenshot - Logs Page Visual */}
    <div className="mb-20 bg-charcoal border border-divider rounded-lg p-6 shadow-2xl fade-in">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
        </div>
        <div className="text-muted text-xs uppercase tracking-widest font-semibold">Impact Logs</div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-ink border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-500/10">
            <div className="w-4 h-4 rounded-full border-2 border-amber-400"></div>
          </div>
          <div>
            <div className="text-primary font-semibold">3</div>
            <div className="text-[10px] text-muted">In Progress</div>
          </div>
        </div>
        <div className="bg-ink border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500/10">
            <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
          </div>
          <div>
            <div className="text-primary font-semibold">12</div>
            <div className="text-[10px] text-muted">Done</div>
          </div>
        </div>
        <div className="bg-ink border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-impact/10">
            <div className="w-4 h-4 rounded-full border-2 border-impact"></div>
          </div>
          <div>
            <div className="text-primary font-semibold">5</div>
            <div className="text-[10px] text-muted">Days Since Update</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-impact via-impact/50 to-impact/10"></div>
        
        <div className="text-[10px] text-muted uppercase tracking-wider mb-3 font-semibold">Q4 2025</div>
        
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2 border-impact bg-ink"></div>
            <div className="border border-divider rounded-lg p-4 bg-ink/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Done</span>
                <span className="text-[10px] text-muted">Dec 15, 2025</span>
              </div>
              <div className="text-primary text-sm font-medium mb-1">Checkout Conversion Optimization</div>
              <p className="text-secondary text-xs mb-2">Redesigned checkout flow, implemented Apple Pay</p>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+14% Conversion</span>
                <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">-22% Abandonment</span>
              </div>
            </div>
          </div>
          
          <div className="relative opacity-60">
            <div className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2 border-impact/50 bg-ink"></div>
            <div className="border border-divider rounded-lg p-4 bg-ink/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">In Progress</span>
                <span className="text-[10px] text-muted">Nov 28, 2025</span>
              </div>
              <div className="text-primary text-sm font-medium">Platform Migration</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Feature Cards - Single Column */}
    <div className="space-y-8 mb-20">
      {/* Logs Card */}
      <div className="bg-charcoal border border-divider rounded-lg p-8 hover:border-impact/50 transition-colors">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-impact text-3xl serif-headline mb-4 opacity-50">01</div>
            <h3 className="text-primary font-semibold text-xl mb-3">Logs</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Capture outcomes, metrics, and teammates. Organized by quarter with status tracking.
            </p>
          </div>
          <div className="bg-ink border border-divider rounded-lg p-4 space-y-3">
            <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Q4 2025</div>
            <div className="border border-divider rounded p-3 bg-charcoal/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Done</span>
                <span className="text-[10px] text-muted">Dec 15</span>
              </div>
              <div className="text-primary text-sm font-medium mb-1">Checkout Optimization</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">+14%</span>
                <span className="text-[9px] text-muted">2 teammates</span>
              </div>
            </div>
            <div className="border border-divider rounded p-3 bg-charcoal/30 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">In Progress</span>
              </div>
              <div className="text-primary text-sm font-medium">Platform Migration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflections Card */}
      <div className="bg-charcoal border border-divider rounded-lg p-8 hover:border-impact/50 transition-colors">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-impact text-3xl serif-headline mb-4 opacity-50">02</div>
            <h3 className="text-primary font-semibold text-xl mb-3">Reflections</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Write longer narratives about projects or career moments. Private by default.
            </p>
          </div>
          <div className="bg-ink border border-divider rounded-lg p-4 space-y-3">
            <div className="border border-divider rounded p-3 bg-charcoal/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary text-sm font-medium">Q4 Product Strategy</span>
                <span className="text-[10px] px-2 py-0.5 rounded border border-divider text-muted">Draft</span>
              </div>
              <p className="text-secondary text-xs line-clamp-2 mb-2">Looking back at the decisions we made in Q4, the biggest lesson was knowing when to say no...</p>
              <div className="text-[10px] text-muted">Oct - Dec 2025</div>
            </div>
            <div className="border border-divider rounded p-3 bg-charcoal/30 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-primary text-sm font-medium">First Year as PM</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Published</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summaries Card */}
      <div className="bg-charcoal border border-divider rounded-lg p-8 hover:border-impact/50 transition-colors">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-impact text-3xl serif-headline mb-4 opacity-50">03</div>
            <h3 className="text-primary font-semibold text-xl mb-3">Summaries</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Generate formatted output for reviews, resumes, or interviews. Control visibility.
            </p>
          </div>
          <div className="bg-ink border border-divider rounded-lg p-4 space-y-3">
            <div className="border border-divider rounded p-3 bg-charcoal/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-sm font-medium">Q4 Performance Review</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded border border-divider text-muted">Private</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-impact/20 text-impact">Review</span>
                <span className="text-[10px] text-muted">3 impacts included</span>
              </div>
            </div>
            <div className="border border-divider rounded p-3 bg-charcoal/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary text-sm font-medium">Resume Bullets</span>
                <span className="text-[10px] px-2 py-0.5 rounded border border-blue-500/30 text-blue-400">Shareable</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-impact/20 text-impact">Resume</span>
                <span className="text-[10px] text-muted">5 impacts included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-charcoal border border-divider rounded-lg p-8 hover:border-impact/50 transition-colors">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-impact text-3xl serif-headline mb-4 opacity-50">04</div>
            <h3 className="text-primary font-semibold text-xl mb-3">Profile</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Share your public impact page. Your career, your narrative.
            </p>
          </div>
          <div className="bg-ink border border-divider rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-impact/20 flex items-center justify-center text-impact font-bold">JD</div>
              <div>
                <div className="text-primary font-medium">Jane Doe</div>
                <div className="text-[11px] text-muted">@janedoe · Senior Product Manager</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-charcoal/30 rounded border border-divider text-center">
                <div className="text-primary font-semibold">12</div>
                <div className="text-[10px] text-muted">Impacts</div>
              </div>
              <div className="p-3 bg-charcoal/30 rounded border border-divider text-center">
                <div className="text-primary font-semibold">3</div>
                <div className="text-[10px] text-muted">Products</div>
              </div>
              <div className="p-3 bg-charcoal/30 rounded border border-divider text-center">
                <div className="text-primary font-semibold">2</div>
                <div className="text-[10px] text-muted">Stories</div>
              </div>
            </div>
            <div className="text-[10px] text-muted text-center">prodlog.app/@janedoe</div>
          </div>
        </div>
      </div>
    </div>

    {/* Single CTA */}
    <div className="pt-12 border-t border-divider text-center">
      <p className="text-secondary mb-8">
        Prodlog is calm, private, and intentionally minimal.
      </p>
      <CTASection />
    </div>
  </div>
);
