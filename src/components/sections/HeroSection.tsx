import React from 'react';
import { CTASection } from '@/src/components/ui';

export const HeroSection = () => (
  <section className="pt-40 pb-20 px-8 md:px-12 max-w-5xl mx-auto text-center fade-in">
    <h1 className="serif-headline text-4xl md:text-[64px] mb-4 leading-tight text-primary">
      The work behind products is hard to show.
    </h1>

    <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
      Prodlog helps you capture impact as it happens and turn it into summaries for reviews, resumes,
      and interviews.
    </p>

    <CTASection />

    {/* Hero Visual Mock */}
    <div className="relative mt-20 bg-charcoal border border-divider rounded-lg p-8 text-left shadow-2xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-divider">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
          <div className="w-3 h-3 rounded-full bg-divider"></div>
        </div>
        <div className="text-muted text-xs uppercase tracking-widest font-semibold">
          Impact Dashboard
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-4 bg-ink/50 border border-divider rounded">
            <div className="text-xs text-muted mb-1 italic">Impact Card</div>
            <div className="text-primary text-sm font-medium mb-2">
              Unblocked Q3 Platform Migration
            </div>
            <p className="text-secondary text-xs leading-relaxed">
              Synthesized contradictory feedback from 4 engineering leads to align on a phased
              database rollout. Prevented an estimated 3-week delay.
            </p>
          </div>
          <div className="p-4 bg-ink/50 border border-divider rounded opacity-60">
            <div className="text-xs text-muted mb-1 italic">Reflection</div>
            <p className="text-secondary text-xs italic">
              "I felt defensive during the review meeting but realized the concern about latency was
              valid. The fix required..."
            </p>
          </div>
        </div>
        <div className="p-6 bg-ink border border-divider rounded border-dashed flex flex-col justify-center">
          <div className="text-center text-muted text-xs uppercase tracking-widest mb-4">
            Summary Preview
          </div>
          <div className="space-y-3">
            <div className="h-2 w-full bg-divider rounded"></div>
            <div className="h-2 w-3/4 bg-divider rounded"></div>
            <div className="h-2 w-5/6 bg-divider rounded"></div>
            <div className="h-2 w-1/2 bg-divider rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
