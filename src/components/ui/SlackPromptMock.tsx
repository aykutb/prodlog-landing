import React from 'react';
import { PRIYA } from '@/src/content/demo/priya';

/**
 * Slack-styled mock of the day-before-1:1 DM, used where a real screenshot
 * would be too small to read (the homepage habit card). Slack's layout
 * conventions (square avatar, bold sender, APP badge, muted time, a threaded
 * reply) in the site's own tokens, no Slack brand assets. The real message is
 * captured as slack-day-before.png (docs/landing-shots.md).
 */
export const SlackPromptMock = () => (
  <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-border bg-surface text-left">
    <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
      <img src="/logmethods/slack-icon.svg" alt="" className="h-3.5 w-3.5" />
      <span className="text-xs font-bold text-ink">Prodlog</span>
      <span className="rounded border border-border bg-muted px-1 py-px text-[10px] font-medium text-muted-foreground">APP</span>
    </div>

    <div className="p-4">
      <div className="relative mb-3" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 border-t border-border" />
        <span className="relative mx-auto block w-fit rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
          Wednesday
        </span>
      </div>

      <div className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ink/10">
          <img src="/logomark.svg" alt="" className="h-4 w-auto" />
        </span>
        <div className="min-w-0">
          <p className="flex flex-wrap items-baseline gap-1.5 leading-none">
            <span className="text-xs font-bold text-ink">Prodlog</span>
            <span className="rounded border border-border bg-muted px-1 py-px text-[10px] font-medium text-muted-foreground">APP</span>
            <span className="text-[10px] text-muted-foreground">5:00 PM</span>
          </p>
          <p className="mt-1 text-xs leading-snug text-ink">
            Your 1:1 with {PRIYA.oneOnOne.withName.split(' ')[0]} is tomorrow. You&rsquo;ve logged 3 entries since the last one. Anything else from this week?
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
            <span className="rounded border border-border px-2 py-0.5 text-[11px] font-semibold text-ink">Log something</span>
            <span className="rounded border border-border px-2 py-0.5 text-[11px] font-semibold text-ink">Prep my 1:1</span>
          </div>
          <p className="mt-1.5 text-[10px] font-medium text-ink">1 reply</p>
        </div>
      </div>

      <div className="ml-10 mt-2 border-l-2 border-border pl-3">
        <div className="flex items-start gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-muted">
            <span className="text-[8px] font-medium text-muted-foreground">you</span>
          </span>
          <div className="min-w-0">
            <p className="flex items-baseline gap-1.5 leading-none">
              <span className="text-[11px] font-bold text-ink">you</span>
              <span className="text-[10px] text-muted-foreground">5:12 PM</span>
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">dispute evidence checklist is live, support already using it</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
