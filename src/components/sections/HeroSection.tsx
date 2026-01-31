import React from 'react';
import { CTASection } from '@/src/components/ui';

export const HeroSection = () => (
  <section className="pt-40 pb-20 px-8 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-4xl md:text-[64px] mb-4 leading-tight text-primary">
      The work behind products is hard to show.
    </h1>

    <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
      Prodlog is a private impact log for product managers.
      <br />
      It helps PMs capture outcomes, add context while it's fresh, and preserve their work for career moments.
    </p>

    <CTASection />

    {/* Hero Visual - Bento Profile Page */}
    <div className="relative mt-20 bg-charcoal border border-divider rounded-lg p-6 text-left shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(168,85,247,0.15)] hover:border-impact/30 transition-all duration-500 ease-out transform hover:-translate-y-1">
      {/* Browser Chrome */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
        </div>
        <div className="text-muted text-[10px] bg-ink px-3 py-1 rounded border border-divider">
          prodlog.app/@sarahchen
        </div>
        <div className="w-16"></div>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-impact/30 to-impact/10 border-4 border-divider flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-impact">SC</span>
        </div>
        <h2 className="text-xl font-semibold text-primary">Sarah Chen</h2>
        <p className="text-xs text-muted mb-1">@sarahchen</p>
        <p className="text-sm text-secondary">Senior Product Manager at Stripe</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Bio Card - M size (2 cols) */}
        <div className="col-span-2 bg-ink border border-divider rounded-lg p-4">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-2">Bio</div>
          <p className="text-secondary text-xs leading-relaxed">
            Building payments infrastructure. Previously at Notion and Figma. I care about developer experience and making complex things feel simple.
          </p>
        </div>

        {/* Stats Card - S size (1 col) */}
        <div className="col-span-1 bg-ink border border-divider rounded-lg p-4">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Stats</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] text-muted">Years</span>
              <span className="text-xs text-primary font-semibold">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-muted">Impacts</span>
              <span className="text-xs text-primary font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-muted">Reflections</span>
              <span className="text-xs text-primary font-semibold">8</span>
            </div>
          </div>
        </div>

        {/* Social Links - S size (1 col) */}
        <div className="col-span-1 bg-ink border border-divider rounded-lg p-4">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Links</div>
          <div className="flex flex-wrap gap-2">
            <div className="w-7 h-7 rounded bg-charcoal border border-divider flex items-center justify-center">
              <span className="text-[10px] text-muted">in</span>
            </div>
            <div className="w-7 h-7 rounded bg-charcoal border border-divider flex items-center justify-center">
              <span className="text-[10px] text-muted">𝕏</span>
            </div>
            <div className="w-7 h-7 rounded bg-charcoal border border-divider flex items-center justify-center">
              <span className="text-[10px] text-muted">◉</span>
            </div>
          </div>
        </div>

        {/* Activity Grid - L size (2 cols, 2 rows) */}
        <div className="col-span-2 row-span-2 bg-ink border border-divider rounded-lg p-4">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Activity</div>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-sm ${
                  [3,7,12,15,19,22,25,28,31,35,38,41,44].includes(i) 
                    ? 'bg-impact/60' 
                    : [1,5,9,17,24,33,40,47].includes(i)
                      ? 'bg-impact/30'
                      : 'bg-divider/50'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[9px] text-muted">Less</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-sm bg-divider/50"></div>
              <div className="w-2 h-2 rounded-sm bg-impact/30"></div>
              <div className="w-2 h-2 rounded-sm bg-impact/60"></div>
              <div className="w-2 h-2 rounded-sm bg-impact"></div>
            </div>
            <span className="text-[9px] text-muted">More</span>
          </div>
        </div>

        {/* Products - M size (2 cols) */}
        <div className="col-span-2 bg-ink border border-divider rounded-lg p-4">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Products</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#635BFF]/20 flex items-center justify-center text-[10px] font-bold text-[#635BFF]">S</div>
              <div>
                <div className="text-xs text-primary font-medium">Stripe Checkout</div>
                <div className="text-[10px] text-muted">2022 - Present</div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">N</div>
              <div>
                <div className="text-xs text-primary font-medium">Notion API</div>
                <div className="text-[10px] text-muted">2020 - 2022</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Impact - M size (2 cols) */}
        <div className="col-span-2 bg-ink border border-divider rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-muted uppercase tracking-wider">Featured Impact</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Done</span>
          </div>
          <div className="text-sm text-primary font-medium mb-1">Reduced checkout abandonment by 22%</div>
          <p className="text-[11px] text-secondary leading-relaxed mb-2">Redesigned payment flow with Apple Pay integration</p>
          <div className="flex gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+$2.4M ARR</span>
          </div>
        </div>

        {/* Featured Reflection - M size (2 cols) */}
        <div className="col-span-2 bg-ink border border-divider rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-muted uppercase tracking-wider">Featured Story</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-impact/20 text-impact">Published</span>
          </div>
          <div className="text-sm text-primary font-medium mb-1">What I learned leading my first 0→1</div>
          <p className="text-[11px] text-secondary leading-relaxed line-clamp-2">
            The hardest part wasn't the product decisions. It was learning when to push back and when to listen...
          </p>
        </div>
      </div>
    </div>
  </section>
);
