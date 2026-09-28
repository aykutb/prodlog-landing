'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LogoStrip } from '@/src/brand';
import { JobOutput, OneOnOneOutput, ReviewOutput, WeekOutput } from '@/src/components/demo/Outputs';
import { priyaLog, type PriyaLog } from '@/src/content/demo/priya';

type MomentKey = 'week' | 'one_on_one' | 'review' | 'job';

const MOMENTS: Array<{ key: MomentKey; title: string; line: string }> = [
  { key: 'week', title: 'Every week', line: 'Log from your notes, Slack, email or your phone, when it happens.' },
  { key: 'one_on_one', title: 'Before every 1:1', line: 'Everything since the last one, ready to paste into your 1:1 doc.' },
  { key: 'review', title: 'Review season', line: 'A draft for each review question, built from your own entries.' },
  { key: 'job', title: 'When you change jobs', line: 'Resume bullets, STAR stories and a portfolio from what you actually did.' },
];

// ── The timeline ────────────────────────────────────────────────────────────

const WEEKS = 26;
/** Entries per week, a plausible rhythm with quiet weeks. */
const RHYTHM = [2, 1, 3, 1, 0, 2, 2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 2, 1, 3, 2];
const REVIEW_WEEKS = { from: 18, to: 22 };

/**
 * One log over half a year, drawn like the 1:1 card's strip chart: mauve
 * strips each week, a dashed tick at every other week for the 1:1s, a
 * neutral band for review season (mustard means an open question, so it is
 * not used here) and a mauve marker for the job change. The strips fill
 * left to right once, when the timeline scrolls into view; under reduced
 * motion, and without JavaScript, it renders filled.
 */
const Timeline = ({ active }: { active: MomentKey }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'static' | 'armed' | 'filling'>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen: keep it filled
    setPhase('armed');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase('filling');
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const highlight = (key: MomentKey) => (active === key ? 'text-ink font-medium' : 'text-muted-foreground');

  return (
    <div ref={ref} className="mx-auto max-w-4xl" aria-hidden="true">
      <div className="relative">
        {/* Review season: a neutral band behind the weeks it covers. */}
        <div
          className={`absolute inset-y-0 rounded-md border border-dashed ${active === 'review' ? 'border-ink/40 bg-ink/[0.06]' : 'border-ink/20 bg-ink/[0.03]'}`}
          style={{ left: `${(REVIEW_WEEKS.from / (WEEKS + 1)) * 100}%`, width: `${((REVIEW_WEEKS.to - REVIEW_WEEKS.from + 1) / (WEEKS + 1)) * 100}%` }}
        />
        <ul className="relative flex h-20 items-end">
          {RHYTHM.slice(0, WEEKS).map((n, week) => (
            <li key={week} className="flex h-full min-w-0 flex-1 flex-col-reverse items-center gap-[3px] px-[2px] pb-[3px]">
              {Array.from({ length: n }, (_, i) => (
                <LogoStrip
                  key={i}
                  shape={week + i}
                  tone="mauve"
                  surface="light"
                  className={`h-2 w-full max-w-6 ${phase === 'armed' ? 'opacity-0' : ''} ${phase === 'filling' ? 'animate-strip-drop' : ''} ${active === 'week' ? '' : 'opacity-80'}`}
                  // The fill runs left to right: each week a little after the one before.
                  {...(phase === 'filling' ? { style: { animationDelay: `${week * 45 + i * 60}ms` } } : {})}
                />
              ))}
            </li>
          ))}
          {/* The job change: one mauve marker past the last week. */}
          <li className="flex h-full min-w-0 flex-1 items-end justify-center pb-[3px]">
            <span className={`w-1.5 rounded-full bg-mauve ${active === 'job' ? 'h-full' : 'h-3/4'} transition-all`} />
          </li>
        </ul>
      </div>
      {/* Baseline with a dashed tick at every other week: the 1:1s. */}
      <div className="flex border-t border-muted-foreground/60">
        {Array.from({ length: WEEKS + 1 }, (_, week) => (
          <div key={week} className="flex min-w-0 flex-1 justify-center">
            {week % 2 === 1 && week < WEEKS && <span className={`h-2 border-l border-dashed ${active === 'one_on_one' ? 'border-ink' : 'border-muted-foreground'}`} />}
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-5 text-meta">
        <span className={`absolute left-0 ${highlight('week')}`}>Every week</span>
        <span className={`absolute ${highlight('one_on_one')}`} style={{ left: `${(9 / (WEEKS + 1)) * 100}%` }}>
          1:1s
        </span>
        <span className={`absolute -translate-x-1/2 ${highlight('review')}`} style={{ left: `${((REVIEW_WEEKS.from + REVIEW_WEEKS.to + 1) / 2 / (WEEKS + 1)) * 100}%` }}>
          <span className="hidden sm:inline">Review season</span>
          <span className="sm:hidden">Review</span>
        </span>
        <span className={`absolute right-0 ${highlight('job')}`}>
          <span className="hidden sm:inline">Job change</span>
          <span className="sm:hidden">Move</span>
        </span>
      </div>
    </div>
  );
};

const Output = ({ moment, log }: { moment: MomentKey; log: PriyaLog }) =>
  moment === 'week' ? <WeekOutput log={log} /> : moment === 'one_on_one' ? <OneOnOneOutput log={log} /> : moment === 'review' ? <ReviewOutput log={log} /> : <JobOutput />;

// ── The section ─────────────────────────────────────────────────────────────

export const MomentsSection = ({ today }: { today: string }) => {
  const log = priyaLog(today);
  const [active, setActive] = useState<MomentKey>('week');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + MOMENTS.length) % MOMENTS.length;
    setActive(MOMENTS[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="py-24 px-4 sm:px-8 md:px-12 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-ink leading-tight">One log. Four moments it pays off.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">You log when something happens. Prodlog hands it back when you need it.</p>
        </div>

        <Timeline active={active} />

        {/* Desktop: tabs over one output panel. */}
        <div className="mt-10 hidden md:block">
          <div role="tablist" aria-label="Four moments" className="grid grid-cols-4 gap-3">
            {MOMENTS.map((m, i) => (
              <button
                key={m.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`moment-tab-${m.key}`}
                aria-selected={active === m.key}
                aria-controls="moment-panel"
                tabIndex={active === m.key ? 0 : -1}
                onClick={() => setActive(m.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex flex-col rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  active === m.key ? 'border-ink bg-surface' : 'border-border bg-surface/60 hover:border-ink/40'
                }`}
              >
                <span className="block text-row-title font-semibold text-ink">{m.title}</span>
                <span className="mt-1 block text-body text-muted-foreground">{m.line}</span>
              </button>
            ))}
          </div>
          <div role="tabpanel" id="moment-panel" aria-labelledby={`moment-tab-${active}`} className="mt-6">
            <Output moment={active} log={log} />
          </div>
        </div>

        {/* Mobile: the four moments stacked, each with its output. */}
        <ol className="mt-10 space-y-10 md:hidden">
          {MOMENTS.map((m) => (
            <li key={m.key}>
              <h3 className="text-row-title font-semibold text-ink">{m.title}</h3>
              <p className="mt-1 mb-4 text-body text-muted-foreground">{m.line}</p>
              <Output moment={m.key} log={log} />
            </li>
          ))}
        </ol>

        <p className="text-muted-foreground text-center text-sm mt-10">Same entries, different shape. Generated, then edited by you.</p>
      </div>
    </section>
  );
};
