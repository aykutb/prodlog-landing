import React from 'react';
import Link from 'next/link';
import { PreviewEntryCard, type PreviewEntry } from '@/src/components/ui';

// The "before" is deliberately a personal note, not a project tool. The
// competitor is a Google Doc and inertia, not Jira.
const NOTE_LINES = [
  'shipped the onboarding thing finally',
  'killed the loyalty feature, freed up eng',
  'talked maya through the scope call',
  'activation looks up since the change?',
];

const AFTER_ENTRIES: PreviewEntry[] = [
  {
    date: 'Mar 12, 2026',
    title: 'Shipped the onboarding redesign',
    ownership: 'Led',
    outcome: 'Activation up since launch',
    missingOutcome: false,
  },
  {
    date: 'Mar 2026',
    title: 'Killed the loyalty feature',
    ownership: 'Decided',
    outcome: 'Freed an eng pod for the bug backlog',
    missingOutcome: false,
  },
  {
    date: 'Mar 19, 2026',
    title: 'Scope call with Maya',
    ownership: 'Coached',
    outcome: null,
    missingOutcome: true,
  },
];

export const BringTheMessSection = () => (
  <section className="pt-10 pb-24 px-4 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary leading-tight">
          Bring the mess. We&rsquo;ll take it from here.
        </h2>
        <p className="text-secondary max-w-3xl mx-auto leading-relaxed">
          Paste your Slack thread, your Apple Note, your half-finished doc. Prodlog splits it
          into dated entries, pulls out what you owned and what moved, and flags the ones
          missing an outcome, so you can fill those in while you still remember.
        </p>
      </div>

      {/* Before / after: messy personal note on the left, structured entries on
          the right. Stacks with the note on top at mobile widths. */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 pt-4 mb-8">
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute -top-2 left-3 text-[10px] text-muted uppercase tracking-wider bg-charcoal px-2 z-10">
              Your note
            </div>
            <div className="bg-white border border-divider rounded-lg p-4 md:p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-divider">
                <div className="w-6 h-6 rounded bg-deep-ink-blue/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-medium text-deep-ink-blue">you</span>
                </div>
                <span className="text-[11px] text-muted">note to self</span>
              </div>
              <div className="space-y-3">
                {NOTE_LINES.map((line) => (
                  <p key={line} className="text-secondary text-xs md:text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-deep-ink-blue/10 flex items-center justify-center">
            <span className="text-deep-ink-blue text-lg md:text-xl hidden md:block" aria-hidden="true">→</span>
            <span className="text-deep-ink-blue text-lg md:hidden" aria-hidden="true">↓</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute -top-2 left-3 text-[10px] text-deep-ink-blue uppercase tracking-wider bg-charcoal px-2 z-10 font-medium">
              In Prodlog
            </div>
            <ul className="flex flex-col gap-3 list-none pt-2">
              {AFTER_ENTRIES.map((entry) => (
                <PreviewEntryCard key={entry.title} entry={entry} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The two import sources cover different periods of a career:
          LinkedIn is the backfill, notes are everything since this job.
          Stacks LinkedIn first on mobile, since it is chronologically first. */}
      <div className="mb-10">
        <h3 className="serif-headline text-xl md:text-2xl text-primary text-center mb-6">
          Your career is in two places.
        </h3>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          <div className="bg-white border border-divider rounded-xl p-6 flex flex-col text-center md:text-left">
            <span className="w-8 h-8 rounded bg-deep-ink-blue/10 flex items-center justify-center mx-auto md:mx-0 mb-3">
              <span className="text-deep-ink-blue text-sm font-bold">in</span>
            </span>
            <p className="text-secondary text-sm leading-relaxed mb-5">
              Before this job, it&rsquo;s on LinkedIn. Import it once and you have the
              backfill: the roles, the launches, the things you would put on a resume anyway.
            </p>
            <a
              href="https://dashboard.prodlog.app/auth"
              className="mt-auto w-full md:w-fit border border-divider bg-white text-primary px-6 py-3 rounded font-medium text-sm hover:border-deep-ink-blue/40 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
            >
              Import from LinkedIn
            </a>
          </div>

          <div className="bg-white border border-divider rounded-xl p-6 flex flex-col text-center md:text-left">
            <span className="w-8 h-8 rounded bg-deep-ink-blue/10 flex items-center justify-center mx-auto md:mx-0 mb-3">
              <span className="text-sm" aria-hidden="true">📝</span>
            </span>
            <p className="text-secondary text-sm leading-relaxed mb-5">
              Since this job, it&rsquo;s in a note somewhere. A Slack thread to yourself, a
              phone note, a half-finished doc. Paste it in, then keep going from Friday.
            </p>
            <Link
              href="/try"
              className="mt-auto w-full md:w-fit bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
            >
              Paste a note
            </Link>
          </div>
        </div>
      </div>

      <p className="text-secondary text-center max-w-2xl mx-auto leading-relaxed">
        Most people arrive with two years of raw notes and leave with a review draft in ten
        minutes.
      </p>
    </div>
  </section>
);
