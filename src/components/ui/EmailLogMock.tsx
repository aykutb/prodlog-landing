import React from 'react';
import { EMAIL_LOG_ADDRESS } from '@/src/lib/channels';

/** A forwarded thread on its way to the log: the email-logging card's visual. */
export const EmailLogMock = () => (
  <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-border bg-surface text-left text-xs">
    <dl className="divide-y divide-border">
      <div className="flex gap-2 px-4 py-2">
        <dt className="w-12 shrink-0 text-muted-foreground">To</dt>
        <dd className="truncate font-medium text-ink">{EMAIL_LOG_ADDRESS}</dd>
      </div>
      <div className="flex gap-2 px-4 py-2">
        <dt className="w-12 shrink-0 text-muted-foreground">Subject</dt>
        <dd className="truncate text-ink">Fwd: Refund SLA, final numbers</dd>
      </div>
    </dl>
    <p className="border-t border-border px-4 py-3 leading-snug text-muted-foreground">
      Support signed off on the 2 day target. Forwarding the thread so it&rsquo;s in my log.
    </p>
  </div>
);
