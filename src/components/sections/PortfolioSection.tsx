import React from 'react';

export const PortfolioSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary leading-tight">
          Your public portfolio
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          A professional portfolio that showcases your work. Import from LinkedIn, customize your layout, share your story.
        </p>
      </div>

      {/* Bento Profile Visual */}
      <div className="bg-white border border-divider rounded-xl p-4 md:p-6 text-left shadow-[0_4px_40px_-10px_rgba(31,42,68,0.15)] hover:shadow-[0_8px_50px_-10px_rgba(31,42,68,0.25)] hover:border-deep-ink-blue/20 transition-all duration-500 ease-out">
        {/* Browser Chrome */}
        <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-divider">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#27CA40]"></div>
          </div>
          <div className="text-muted text-[8px] md:text-[10px] bg-charcoal px-2 md:px-3 py-1 rounded border border-divider">
            prodlog.app/@sarahchen
          </div>
          <div className="w-8 md:w-16"></div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-4 md:mb-8">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-deep-ink-blue/20 to-deep-ink-blue/5 border-2 md:border-4 border-divider flex items-center justify-center mb-2 md:mb-4">
            <span className="text-lg md:text-2xl font-bold text-deep-ink-blue">SC</span>
          </div>
          <h2 className="text-base md:text-xl font-semibold text-primary">Sarah Chen</h2>
          <p className="text-[10px] md:text-xs text-muted mb-0.5 md:mb-1">@sarahchen</p>
          <p className="text-xs md:text-sm text-secondary">Senior PM at Stripe</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {/* Bio Card */}
          <div className="col-span-2 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider mb-1.5 md:mb-2">Bio</div>
            <p className="text-secondary text-[10px] md:text-xs leading-relaxed line-clamp-3 md:line-clamp-none">
              Building payments infrastructure. Previously at Notion and Figma. I care about developer experience.
            </p>
          </div>

          {/* Stats Card */}
          <div className="col-span-1 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider mb-2 md:mb-3">Stats</div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex justify-between">
                <span className="text-[9px] md:text-[10px] text-muted">Years</span>
                <span className="text-[10px] md:text-xs text-primary font-semibold">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] md:text-[10px] text-muted">Impacts</span>
                <span className="text-[10px] md:text-xs text-primary font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] md:text-[10px] text-muted">Stories</span>
                <span className="text-[10px] md:text-xs text-primary font-semibold">8</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="col-span-1 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider mb-2 md:mb-3">Links</div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-white border border-divider flex items-center justify-center">
                <span className="text-[9px] md:text-[10px] text-muted">in</span>
              </div>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-white border border-divider flex items-center justify-center">
                <span className="text-[9px] md:text-[10px] text-muted">𝕏</span>
              </div>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-white border border-divider flex items-center justify-center">
                <span className="text-[9px] md:text-[10px] text-muted">◉</span>
              </div>
            </div>
          </div>

          {/* Activity Grid - Desktop only */}
          <div className="hidden md:block col-span-2 row-span-2 bg-charcoal border border-divider rounded-lg p-4">
            <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Activity</div>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-sm ${
                    [3,7,12,15,19,22,25,28,31,35,38,41,44].includes(i) 
                      ? 'bg-sage-green' 
                      : [1,5,9,17,24,33,40,47].includes(i)
                        ? 'bg-sage-green/40'
                        : 'bg-divider'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[9px] text-muted">Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-sm bg-divider"></div>
                <div className="w-2 h-2 rounded-sm bg-sage-green/40"></div>
                <div className="w-2 h-2 rounded-sm bg-sage-green/70"></div>
                <div className="w-2 h-2 rounded-sm bg-sage-green"></div>
              </div>
              <span className="text-[9px] text-muted">More</span>
            </div>
          </div>

          {/* Products */}
          <div className="col-span-2 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider mb-2 md:mb-3">Products</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-[#635BFF]/10 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-[#635BFF] shrink-0">S</div>
                <div className="min-w-0">
                  <div className="text-[10px] md:text-xs text-primary font-medium truncate">Stripe Checkout</div>
                  <div className="text-[9px] md:text-[10px] text-muted">2022 - Present</div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-primary/5 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-primary shrink-0">N</div>
                <div className="min-w-0">
                  <div className="text-[10px] md:text-xs text-primary font-medium truncate">Notion API</div>
                  <div className="text-[9px] md:text-[10px] text-muted">2020 - 2022</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Impact */}
          <div className="col-span-1 md:col-span-2 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-1.5 md:mb-2">
              <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider">Impact</div>
              <span className="text-[8px] md:text-[9px] px-1 md:px-1.5 py-0.5 rounded bg-sage-green/20 text-sage-green font-medium">Done</span>
            </div>
            <div className="text-[10px] md:text-sm text-primary font-medium mb-1 line-clamp-2">Reduced abandonment by 22%</div>
            <p className="text-[9px] md:text-[11px] text-secondary leading-relaxed line-clamp-2 hidden md:block">Redesigned payment flow with Apple Pay</p>
            <div className="flex gap-1 md:gap-2 mt-1.5 md:mt-2">
              <span className="text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 rounded bg-sage-green/10 text-sage-green border border-sage-green/20 font-medium">+$2.4M</span>
            </div>
          </div>

          {/* Featured Story */}
          <div className="col-span-1 md:col-span-2 bg-charcoal border border-divider rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-1.5 md:mb-2">
              <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider">Story</div>
              <span className="text-[8px] md:text-[9px] px-1 md:px-1.5 py-0.5 rounded bg-muted-plum/20 text-muted-plum font-medium">Published</span>
            </div>
            <div className="text-[10px] md:text-sm text-primary font-medium mb-1 line-clamp-2">Leading my first 0→1</div>
            <p className="text-[9px] md:text-[11px] text-secondary leading-relaxed line-clamp-2 hidden md:block">
              Learning when to push back and when to listen...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
