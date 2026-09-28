'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { trackEvent } from '@/src/lib/analytics';
import {
  EMPTY_RESULT,
  MAX_CHARS,
  MAX_CHARS_LABEL,
  NOTICE_TRIMMED,
  PLACEHOLDER,
  SAMPLE,
  parseNotes,
  signupUrl,
  type OneOnOneChoice,
  type PreviewEntry,
} from '@/src/lib/preview';
import { Logomark } from '@/src/brand';
import { LedgerDivider, LedgerLine, LedgerRow, LedgerRows, LogFilter, OccasionCard, WeekdayChips, YearDivider, type StackWindow } from '@/src/components/kit';
import { formatShort, formatWithWeekday, plural, priyaLog } from '@/src/content/demo/priya';

/** Delay between two parsed entries settling into the ledger. */
const STAGGER_MS = 140;
const SETTLE_MS = 320;

type ToolState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; entries: PreviewEntry[]; truncated: boolean };

interface LedgerHeroProps {
  /**
   * `home`: the Log page in miniature, Priya's 1:1 card and rows under the paste line.
   * `try`: the paste line alone; the result asks for the 1:1 day and offers to save.
   * `compact`: the paste line and a Start free link, for the end of inner pages.
   */
  variant?: 'home' | 'try' | 'compact';
  /** Today (YYYY-MM-DD), from the server, so server and client agree on every date. */
  today: string;
  /** The pricing helper's line, under "or Start free." (home and compact). */
  pricingLine?: string;
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The paste preview as a miniature of the dashboard's Log: the visitor's
 * note goes on the ledger's first line, and what comes out settles into
 * ledger rows under it, one by one. The request, the limits and the sample
 * note are the ones /try always had (src/lib/preview.ts); only the
 * presentation is the product's.
 */
export const LedgerHero = ({ variant = 'home', today, pricingLine }: LedgerHeroProps) => {
  const home = variant === 'home';
  const [text, setText] = useState('');
  const [trimmed, setTrimmed] = useState(false);
  const [state, setState] = useState<ToolState>({ status: 'idle' });
  const [settled, setSettled] = useState(false);
  const [oneOnOne, setOneOnOne] = useState<OneOnOneChoice | null>(null);
  const textareaId = useId();
  const counterId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const log = priyaLog(today);
  const count = text.length;
  const showTrimmed = trimmed && count >= MAX_CHARS;
  const submittable = text.trim().length > 0 && state.status !== 'loading';
  const entries = state.status === 'done' ? state.entries : [];
  const hasEntries = entries.length > 0;

  // The 1:1 card updates once the last entry has settled; at once under reduced motion.
  useEffect(() => {
    if (!hasEntries) return setSettled(false);
    if (prefersReducedMotion()) return setSettled(true);
    const timer = window.setTimeout(() => setSettled(true), STAGGER_MS * (entries.length - 1) + SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [hasEntries, entries.length]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    // maxLength covers typing and pasting; this covers drag and drop.
    if (next.length > MAX_CHARS) {
      setText(next.slice(0, MAX_CHARS));
      setTrimmed(true);
      return;
    }
    setText(next);
    if (next.length < MAX_CHARS) setTrimmed(false);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // maxLength trims the paste before onChange runs; project the length so the visitor is told.
    const el = event.currentTarget;
    const projected = el.value.length - (el.selectionEnd - el.selectionStart) + event.clipboardData.getData('text').length;
    if (projected > MAX_CHARS) setTrimmed(true);
  };

  const useSample = () => {
    setText(SAMPLE);
    setTrimmed(false);
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(SAMPLE.length, SAMPLE.length);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!submittable) return;
    // Count only. The pasted text goes nowhere except the POST body.
    trackEvent('preview_pasted', { character_count: count, surface: variant });
    setState({ status: 'loading' });
    const result = await parseNotes(text);
    if (!result.ok) return setState({ status: 'error', message: result.message });
    trackEvent('preview_parsed', { entry_count: result.entries.length, surface: variant });
    setState({ status: 'done', entries: result.entries, truncated: result.truncated });
  };

  const signupHref = signupUrl({ text: hasEntries ? text : undefined, oneOnOne: oneOnOne ?? undefined });
  const onSignup = () => trackEvent('preview_signup_click', { surface: variant, entry_count: entries.length, picked_day: oneOnOne !== null });

  // ── The 1:1 card (home): Priya's window, then the visitor's entries on the "Now" stack ──
  const windows: StackWindow[] = log.windows.map((w) =>
    w.current && settled ? { ...w, strips: [...w.strips, ...entries.map((e) => Boolean(e.outcome))], dropLast: true } : w,
  );
  const occasionContext = settled
    ? `${plural(entries.length, 'entry', 'entries')} ready for your next 1:1.`
    : `${plural(log.sinceLast.length, 'entry', 'entries')} since your last 1:1 on ${formatShort(log.lastOneOnOne, today)}.`;

  // Two of Priya's rows: enough to show what an entry looks like, short enough
  // that the log sits level with the headline beside it.
  const priyaRows = log.ledger.slice(0, 2);

  const form = (
    <form onSubmit={handleSubmit} aria-label="Paste your notes">
      <label htmlFor={textareaId} className="sr-only">
        Your notes
      </label>
      <LedgerLine date={formatShort(today, today)} dateTime={today}>
        <textarea
          ref={textareaRef}
          id={textareaId}
          value={text}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={PLACEHOLDER}
          rows={variant === 'try' ? 6 : 3}
          maxLength={MAX_CHARS}
          aria-describedby={counterId}
          // A visible field, so the example note reads as an example: lighter and italic until the visitor types.
          className="min-h-0 min-w-0 flex-1 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-body leading-relaxed text-ink shadow-sm transition-colors placeholder:italic placeholder:text-muted-foreground/60 hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/15"
        />
      </LedgerLine>
      <div className="mt-2 flex items-center justify-between gap-4 px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
        <p className="text-meta text-muted-foreground">We don&rsquo;t store what you paste.</p>
        <p id={counterId} className={`text-meta tabular-nums ${showTrimmed ? 'font-medium text-mustard-strong' : 'text-muted-foreground'}`}>
          {count.toLocaleString('en-US')} / {MAX_CHARS_LABEL}
        </p>
      </div>
      {showTrimmed && (
        <p role="status" className="mt-1 px-2 text-meta text-mustard-strong sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
          {NOTICE_TRIMMED}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
        <button
          type="button"
          onClick={useSample}
          className="rounded-sm text-meta text-ink underline decoration-border underline-offset-4 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Use a sample note
        </button>
        <button
          type="submit"
          disabled={!submittable}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-ink px-4 text-body font-medium text-on-ink transition-colors hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background disabled:opacity-60"
        >
          {state.status === 'loading' ? 'Reading your notes…' : 'See what comes out'}
        </button>
      </div>
    </form>
  );

  const startFree = variant !== 'try' && (
    <p className="mt-4 px-2 text-body text-muted-foreground sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
      or{' '}
      <a href={signupHref} onClick={onSignup} className="rounded-sm font-medium text-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">
        Start free
      </a>
      .{pricingLine ? ` ${pricingLine}` : ''}
    </p>
  );

  const status = (
    <div aria-live="polite" className="px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
      {state.status === 'error' && (
        <p role="status" className="mt-4 text-body text-mustard-strong">
          {state.message}
        </p>
      )}
      {state.status === 'done' && !hasEntries && (
        <p role="status" className="mt-4 text-body text-muted-foreground">
          {EMPTY_RESULT}
        </p>
      )}
      {hasEntries && <p className="sr-only">{plural(entries.length, 'entry', 'entries')} from your note.</p>}
    </div>
  );

  // The visitor's entries: under the first line, newest first, each settling in turn.
  const visitorRows = hasEntries && (
    <LedgerRows className={`mt-4 border-t border-border ${state.status === 'done' ? '' : 'opacity-60'}`}>
      {entries.map((entry, i) => (
        <LedgerRow
          key={`${i}-${entry.title}`}
          date={formatShort(entry.date ?? today, today)}
          dateTime={entry.date ?? today}
          label="Your note"
          title={entry.title}
          preview={entry.ownership ?? undefined}
          outcome={entry.outcome}
          askOutcome={variant === 'try'}
          className="motion-safe:animate-ledger-in"
          style={{ animationDelay: `${i * STAGGER_MS}ms` }}
        />
      ))}
    </LedgerRows>
  );

  const truncatedNote = state.status === 'done' && state.truncated && (
    <p className="mt-2 px-2 text-meta text-muted-foreground sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">Showing the first 12. There were more.</p>
  );

  if (variant === 'compact') {
    return (
      <div className="mx-auto max-w-column text-left">
        {form}
        {startFree}
        {status}
        {visitorRows}
        {truncatedNote}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-column text-left">
      {/* The Log page in miniature: the top bar, then the page. */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex h-11 items-center gap-2 border-b border-border px-3 sm:gap-4 sm:px-4" aria-hidden="true">
          <Logomark size="sm" decorative />
          <span className="relative ml-1 flex h-11 items-center px-2 text-body font-medium text-ink">
            Log
            <span className="absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-mauve" />
          </span>
          <span className="flex h-11 items-center px-2 text-body text-muted-foreground">Career</span>
          <span className="ml-auto h-7 w-7 rounded-full bg-mauve-soft text-center text-meta font-medium leading-7 text-mauve-strong">{home ? 'PR' : ''}</span>
        </div>

        <div className="space-y-6 px-3 py-5 sm:px-6 sm:py-6">
          {home && (
            <OccasionCard
              title="Your 1:1"
              aside={formatWithWeekday(log.nextOneOnOne, today)}
              context={<span aria-live="polite">{occasionContext}</span>}
              windows={windows}
              caption={log.caption}
              action="Prep my 1:1"
            />
          )}

          <section aria-label="Your log" className="space-y-3">
            <div className="flex items-center justify-between gap-3 px-2">
              <h2 className="text-body font-semibold text-ink">Your log</h2>
              <LogFilter className="hidden sm:inline-flex" />
            </div>
            {form}
            {startFree}
            {status}
            {visitorRows}
            {truncatedNote}

            {home && (
              <LedgerRows className="mt-2 border-t border-border" aria-label="An example log: Priya's recent entries">
                {priyaRows.map((item) =>
                  item.type === 'entry' ? (
                    <LedgerRow
                      key={item.entry.id}
                      date={formatShort(item.entry.date, today)}
                      dateTime={item.entry.date}
                      label={item.entry.product}
                      title={item.entry.title}
                      preview={item.entry.preview}
                      outcome={item.entry.outcome}
                      image={item.entry.image}
                    />
                  ) : item.type === 'divider' ? (
                    <LedgerDivider key={item.date} label={item.label} />
                  ) : (
                    <li key={item.year} className="list-none">
                      <YearDivider year={item.year} />
                    </li>
                  ),
                )}
              </LedgerRows>
            )}
          </section>

          {variant === 'try' && hasEntries && (
            <OccasionCard title="When’s your 1:1?" context="Prodlog preps it the day before. No regular 1:1s? Get a weekly recap instead.">
              <WeekdayChips value={oneOnOne} onChange={setOneOnOne} />
            </OccasionCard>
          )}

          {/* A direct child of the page, so it stays in view over the entries while they scroll. */}
          {variant === 'try' && hasEntries && (
            <div className="sticky bottom-4 z-10 flex flex-col items-center gap-2">
              <a
                href={signupHref}
                onClick={onSignup}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-ink px-6 text-body font-medium text-on-ink ring-offset-background transition-colors hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                Save {entries.length === 1 ? 'this entry' : `these ${entries.length} entries`} &rarr;
              </a>
              <p className="rounded-md bg-background/90 px-2 text-meta text-muted-foreground">Free to start. Your note comes with you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
