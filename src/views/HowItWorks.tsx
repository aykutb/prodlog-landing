import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PortfolioBentoMock,
  PreviewEntryCard,
  ScrollReveal,
  SlackPromptMock,
  type PreviewEntry,
} from '@/src/components/ui';
import {
  RECRUITER_BULLETS,
  RESUME_BULLETS,
  REVIEW_PARAGRAPH,
  STAR_STORY,
} from '@/src/components/sections/outputsContent';

// Step 01 visual: the paste result, one entry still missing its outcome.
const STEP_ONE_ENTRIES: PreviewEntry[] = [
  {
    date: 'Mar 12, 2026',
    title: 'Shipped the onboarding redesign',
    ownership: 'Led',
    outcome: 'Activation up since launch',
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

// Step 03 visual: a static version of the homepage output tabs.
const MiniOutput = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-divider bg-white p-3 min-w-0">
    <p className="text-[9px] text-muted uppercase tracking-wider mb-1.5">{label}</p>
    {children}
  </div>
);

const StepCard = ({
  number,
  title,
  children,
  visual,
  footer,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  visual: React.ReactNode;
  footer?: React.ReactNode;
}) => (
  <ScrollReveal>
    <div className="bg-white border border-divider rounded-xl p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-deep-ink-blue text-3xl serif-headline mb-4 opacity-30">{number}</div>
          <h3 className="text-primary font-semibold text-xl mb-3">{title}</h3>
          {children}
        </div>
        <div>{visual}</div>
      </div>
      {footer}
    </div>
  </ScrollReveal>
);

export const HowItWorksPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in text-center">
      <img src="/flow-arrows-icon.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
        How Prodlog works
      </h1>
      <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Start with what you have already written. Keep it going in two minutes a week. Get it
        back in whatever shape you need.
      </p>
    </header>

    <div className="space-y-8 mb-20">
      <StepCard
        number="01"
        title="Start with what you already have"
        visual={
          <ul className="flex flex-col gap-3 list-none">
            {STEP_ONE_ENTRIES.map((entry) => (
              <PreviewEntryCard key={entry.title} entry={entry} />
            ))}
          </ul>
        }
      >
        <p className="text-secondary text-sm leading-relaxed mb-4">
          Your career is in two places. Everything before this job is on LinkedIn: import it
          once and it becomes your backfill, the roles and launches and the things you would
          put on a resume anyway. Everything since is in a note somewhere, a Slack thread to
          yourself or a phone note or a half-finished doc. Paste that in and Prodlog splits it
          into dated entries, pulls out what you owned and what moved, and flags the ones
          missing an outcome.
        </p>
        <Link
          href="/try"
          className="inline-block border border-deep-ink-blue/40 bg-white text-deep-ink-blue px-5 py-2.5 rounded font-medium text-sm hover:border-deep-ink-blue transition-all no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          Try it without signing up
        </Link>
      </StepCard>

      <StepCard number="02" title="Keep it going without thinking about it" visual={<SlackPromptMock />}>
        <p className="text-secondary text-sm leading-relaxed mb-3">
          Install the Slack app and Prodlog asks once a week, Friday at 4pm: what shipped this
          week? Reply in the thread and you are done. Type{' '}
          <code className="text-[0.85em] px-1 py-0.5 rounded bg-charcoal border border-divider">/log</code>{' '}
          any time something happens instead of waiting. Email and the app itself both work
          too.
        </p>
        <p className="text-secondary text-sm leading-relaxed">
          Skip three weeks and nothing bad happens. It just asks again on Friday.
        </p>
      </StepCard>

      <StepCard
        number="03"
        title="Get it back in whatever shape you need"
        visual={
          <div className="grid grid-cols-2 gap-2.5">
            <MiniOutput label="Review">
              <p className="text-secondary text-[10px] leading-snug line-clamp-4">
                {REVIEW_PARAGRAPH}
              </p>
            </MiniOutput>
            <MiniOutput label="Recruiter">
              <ul className="space-y-1 list-none">
                {RECRUITER_BULLETS.slice(0, 2).map((b) => (
                  <li key={b} className="text-secondary text-[10px] leading-snug line-clamp-2">
                    • {b}
                  </li>
                ))}
              </ul>
            </MiniOutput>
            <MiniOutput label="Resume">
              <ul className="space-y-1 list-none">
                {RESUME_BULLETS.map((b) => (
                  <li key={b} className="text-secondary text-[10px] leading-snug">
                    • {b}
                  </li>
                ))}
              </ul>
            </MiniOutput>
            <MiniOutput label="Interview">
              <dl className="space-y-1">
                {STAR_STORY.map((part) => (
                  <div key={part.label} className="flex gap-1.5 min-w-0">
                    <dt className="text-primary text-[9px] font-semibold uppercase tracking-wide shrink-0">
                      {part.label}
                    </dt>
                    <dd className="text-secondary text-[10px] leading-snug truncate">
                      {part.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </MiniOutput>
          </div>
        }
        footer={
          <div className="mt-8 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
            <Image
              src="/images/screenshots/03-summaries-page-with-tabs.png"
              width={2858}
              height={1680}
              alt="Prodlog summaries page showing four output tabs: Review, Resume Bullets, Recruiter Brief, Interview Prep"
            />
          </div>
        }
      >
        <p className="text-secondary text-sm leading-relaxed">
          Review season, a recruiter call, a resume update, an interview on Thursday. The same
          entries compress differently for each: a review draft built from your own work
          rather than a blank page, bullets with outcomes attached, STAR stories from things
          that actually happened. Generated, then edited by you.
        </p>
      </StepCard>

      <StepCard number="04" title="Publish a portfolio when you want one" visual={<PortfolioBentoMock />}>
        <p className="text-secondary text-sm leading-relaxed mb-4">
          Twenty-two card types: decisions you made, features you killed, metrics you moved,
          tradeoffs you chose, skills, case studies, writing you published. Nothing is public
          until you publish it.
        </p>
        <Link
          href="/p/aykutbal"
          className="inline-block border border-deep-ink-blue/40 bg-white text-deep-ink-blue px-5 py-2.5 rounded font-medium text-sm hover:border-deep-ink-blue transition-all no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          See a real one
        </Link>
      </StepCard>
    </div>

    <ScrollReveal>
      <div className="pt-12 border-t border-divider text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full md:w-auto bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
          >
            Start free
          </a>
          <Link
            href="/p/aykutbal"
            className="w-full md:w-auto border border-deep-ink-blue/40 bg-white text-deep-ink-blue px-6 py-3 rounded font-medium text-sm hover:border-deep-ink-blue transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
          >
            See a real one
          </Link>
        </div>
        <p className="text-muted text-xs mt-4">Free forever. Unlimited entries, no card.</p>
      </div>
    </ScrollReveal>
  </div>
);
