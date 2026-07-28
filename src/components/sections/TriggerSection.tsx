import React from 'react';

export const TriggerSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
          The habit fails for one reason: nothing reminds you.
        </h2>
        <p className="text-secondary max-w-2xl mx-auto mb-4 leading-relaxed">
          Friday, 4pm, in Slack: &ldquo;What shipped this week?&rdquo; Reply in the thread.
          That&rsquo;s the whole thing. No app to open, no form, no context switch.
        </p>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          Skip three weeks and we don&rsquo;t guilt you. We just ask again on Friday.
        </p>
      </div>

      {/* One small mock of the Slack prompt. Deliberately quiet: the section is
          about how little there is to do. */}
      <div className="max-w-sm mx-auto mt-10 bg-white border border-divider rounded-lg p-4 shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded bg-deep-ink-blue/10 flex items-center justify-center shrink-0">
            <img src="/logomark.svg" alt="" className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-primary text-xs font-semibold">Prodlog</span>
              <span className="text-[8px] px-1 py-px rounded bg-charcoal border border-divider text-muted uppercase">App</span>
              <span className="text-[10px] text-muted">Fri 4:00 PM</span>
            </div>
            <p className="text-secondary text-xs mt-1">What shipped this week?</p>
          </div>
        </div>
        <div className="mt-3 ml-3 pl-4 border-l-2 border-divider">
          <p className="text-[10px] text-muted mb-2">1 reply</p>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded bg-charcoal border border-divider flex items-center justify-center shrink-0">
              <span className="text-[8px] font-medium text-muted">you</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-primary text-[11px] font-semibold">you</span>
                <span className="text-[10px] text-muted">4:12 PM</span>
              </div>
              <p className="text-secondary text-xs leading-relaxed mt-0.5">
                shipped the usage alerts thing tues, tickets already down a bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
