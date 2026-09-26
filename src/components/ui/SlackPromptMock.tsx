import React from 'react';

/**
 * Slack-styled mock of the Friday prompt, shared by the homepage Trigger
 * section and /how-it-works step 02. Matches Slack's layout conventions
 * (square avatar, bold sender name, APP badge, muted timestamp, threaded
 * reply) using existing tokens only, no Slack brand assets.
 */
export const SlackPromptMock = () => (
  <div className="max-w-sm mx-auto bg-white border border-divider rounded-lg overflow-hidden shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)] text-left">
    {/* Conversation header so it reads as a Slack surface, not a floating card */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-divider">
      <img src="/logmethods/slack-icon.svg" alt="" className="h-3.5 w-3.5" />
      <span className="text-primary text-xs font-bold">Prodlog</span>
      <span className="text-[8px] px-1 py-px rounded bg-charcoal border border-divider text-muted uppercase tracking-wide">
        App
      </span>
    </div>

    <div className="p-4">
      {/* Day divider */}
      <div className="relative mb-3" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 border-t border-divider" />
        <span className="relative block w-fit mx-auto px-2.5 py-0.5 rounded-full border border-divider bg-white text-[9px] font-semibold text-muted">
          Friday
        </span>
      </div>

      {/* App message */}
      <div className="flex items-start gap-2.5">
        <span className="w-8 h-8 rounded bg-deep-ink-blue/10 flex items-center justify-center shrink-0">
          <img src="/logomark.svg" alt="" className="h-4 w-auto" />
        </span>
        <div className="min-w-0">
          <p className="flex items-baseline gap-1.5 flex-wrap leading-none">
            <span className="text-primary text-xs font-bold">Prodlog</span>
            <span className="text-[8px] px-1 py-px rounded bg-charcoal border border-divider text-muted uppercase tracking-wide">
              App
            </span>
            <span className="text-[10px] text-muted">4:00 PM</span>
          </p>
          <p className="text-primary text-xs leading-snug mt-1">What shipped this week?</p>
          <p className="text-[10px] text-deep-ink-blue font-medium mt-1.5">1 reply</p>
        </div>
      </div>

      {/* The reply, indented under the thread affordance */}
      <div className="mt-2 ml-10 pl-3 border-l-2 border-divider">
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded bg-charcoal border border-divider flex items-center justify-center shrink-0">
            <span className="text-[8px] font-medium text-muted">you</span>
          </span>
          <div className="min-w-0">
            <p className="flex items-baseline gap-1.5 leading-none">
              <span className="text-primary text-[11px] font-bold">you</span>
              <span className="text-[10px] text-muted">4:12 PM</span>
            </p>
            <p className="text-secondary text-xs leading-snug mt-0.5">
              shipped the usage alerts thing tues, tickets already down a bit
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
