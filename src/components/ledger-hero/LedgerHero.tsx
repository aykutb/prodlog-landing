'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
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
import { INK_BUTTON, LedgerDivider, LedgerLine, LedgerRow, LedgerRows, LogFilter, OccasionCard, WeekdayChips, type StackWindow } from '@/src/components/kit';
import { formatShort, plural } from '@/src/content/demo/priya';
import { HERO_LABEL, HERO_NOTE, HERO_SCENE_LABEL, heroScene } from '@/src/content/demo/heroScene';
import { useHeroScene } from './useHeroScene';
import { PrepSheet, SceneControls, SceneCursor } from './SceneParts';
import { HERO_TAKEOVER_EVENT } from './heroTakeover';
import { CHAPTERS, chapterKeyAt } from './heroTimeline';

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
  /** The pricing helper's line, under "or Start free." (compact; the homepage shows none). */
  pricingLine?: string;
  /**
   * Play the scripted scene (home only): a note types itself in, becomes
   * two entries, the 1:1 card counts them and the 1:1 gets prepped. Off by
   * default; without it the home frame rests on its first frame.
   */
  autoplay?: boolean;
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The paste preview as a miniature of the dashboard's Log: the visitor's
 * note goes on the ledger's first line, and what comes out settles into
 * ledger rows under it, one by one. The request, the limits and the sample
 * note are the ones /try always had (src/lib/preview.ts); only the
 * presentation is the product's.
 */
export const LedgerHero = ({ variant = 'home', today, pricingLine, autoplay = false }: LedgerHeroProps) => {
  const home = variant === 'home';
  const [text, setText] = useState('');
  const [trimmed, setTrimmed] = useState(false);
  const [state, setState] = useState<ToolState>({ status: 'idle' });
  const [settled, setSettled] = useState(false);
  const [oneOnOne, setOneOnOne] = useState<OneOnOneChoice | null>(null);
  const textareaId = useId();
  const counterId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // The home frame is a scene on Priya's Log; its data is fixed for the day.
  const data = useMemo(() => (home ? heroScene(today) : null), [home, today]);
  const frameRef = useRef<HTMLDivElement>(null);
  // The visitor is using the paste box: the scene holds still and its typing steps aside.
  const [fieldFocus, setFieldFocus] = useState(false);
  const engaged = fieldFocus || text !== '' || state.status !== 'idle';
  const scene = useHeroScene({ autoplay: home && autoplay, frameRef, engaged });
  const playsScene = home && autoplay;

  // ── Take-over: the visitor reaches for the paste box, and the demo steps aside ──
  // The scene stops on its first frame (Priya's rows stay as context) and the
  // paste flow below runs exactly as it always has.
  const takeOver = (trigger: 'box' | 'sample' | 'button') => {
    if (playsScene && scene.takeOver()) trackEvent('hero_takeover', { trigger });
  };
  const takeOverRef = useRef(takeOver);
  takeOverRef.current = takeOver;
  useEffect(() => {
    if (!playsScene) return;
    const onRequest = () => {
      takeOverRef.current('button');
      const el = textareaRef.current;
      if (!el) return;
      // Below the two-column layout the frame sits under the copy: bring its paste box into view first
      // (the frame is taller than a phone screen, so the box, not the frame, is centred).
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
      }
      el.focus({ preventScroll: true });
    };
    window.addEventListener(HERO_TAKEOVER_EVENT, onRequest);
    return () => window.removeEventListener(HERO_TAKEOVER_EVENT, onRequest);
  }, [playsScene]);

  // Replay (the play button or a chapter, after a take-over): clears the visitor's
  // note and results and restarts the scene, asking first if there is a note to lose.
  const [confirmReplayAt, setConfirmReplayAt] = useState<number | null>(null);
  const keepNoteRef = useRef<HTMLButtonElement>(null);
  const replayOpenerRef = useRef<HTMLElement | null>(null);
  const cancelReplay = () => {
    setConfirmReplayAt(null);
    replayOpenerRef.current?.focus();
  };
  const replay = (t: number) => {
    setConfirmReplayAt(null);
    setText('');
    setTrimmed(false);
    setState({ status: 'idle' });
    setOneOnOne(null);
    scene.seekAndPlay(t);
    trackEvent('hero_replay', { chapter: CHAPTERS.find((c) => c.start === t)?.key ?? 'paste' });
  };
  const requestReplay = (t: number) => {
    if (text.trim() === '' && state.status === 'idle') return replay(t);
    replayOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setConfirmReplayAt(t);
  };
  useEffect(() => {
    if (confirmReplayAt !== null) keepNoteRef.current?.focus();
  }, [confirmReplayAt]);

  const onPlayButton = () => {
    if (scene.visitor) return requestReplay(0);
    if (!scene.paused) trackEvent('hero_demo_pause', { chapter: chapterKeyAt(scene.clock) });
    scene.toggle();
  };
  const onChapter = (t: number) => {
    if (scene.visitor) return requestReplay(t);
    trackEvent('hero_demo_chapter', { chapter: chapterKeyAt(t) });
    scene.seekAndPlay(t);
  };
  const { state: shot } = scene;
  const sceneTypingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sceneTypingRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shot.typedChars]);
  // The key hints say ⌘ on Apple devices and Ctrl elsewhere; they only show once the scene runs.
  const [modKey, setModKey] = useState('⌘');
  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) setModKey('Ctrl');
  }, []);
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
    takeOver('box');
    // maxLength trims the paste before onChange runs; project the length so the visitor is told.
    const el = event.currentTarget;
    const projected = el.value.length - (el.selectionEnd - el.selectionStart) + event.clipboardData.getData('text').length;
    if (projected > MAX_CHARS) setTrimmed(true);
  };

  const useSample = () => {
    takeOver('sample');
    setText(SAMPLE);
    setTrimmed(false);
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(SAMPLE.length, SAMPLE.length);
  };

  // ⌘ Enter (Ctrl Enter elsewhere) sends the note, as the dashboard's first line does.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || !(event.metaKey || event.ctrlKey)) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
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

  // ── The 1:1 card (home): Priya's windows, the scene's two strips, then the visitor's entries on the "Now" stack ──
  const windows: StackWindow[] = (data?.windows ?? []).map((w) =>
    w.current
      ? {
          ...w,
          // Oldest first, as the stack reads bottom up: the checklist (Friday), then the cut review (today).
          incoming: [...data!.newRows].reverse().map((row, i) => ({ outcome: Boolean(row.outcome), phase: shot.strips[i] })),
          ...(settled ? { strips: [...w.strips, ...entries.map((e) => Boolean(e.outcome))], dropLast: true } : {}),
        }
      : w,
  );
  const visitorContext = `${plural(entries.length, 'entry', 'entries')} ready for your next 1:1.`;
  const occasionContext = settled ? visitorContext : shot.counted ? data?.context.after : data?.context.before;
  // The scene is using the first line: focus, caret and typing, over the still-empty textarea.
  // The first line is dated like the scene until the visitor takes over; then it is their today.
  const lineDay = data && !scene.visitor ? data.day : today;
  const lineBusy = home && !engaged && (shot.lineFocus || shot.typedChars > 0);

  // A visible field, so the example note reads as an example: lighter and italic until the visitor types.
  const fieldClass =
    'min-h-0 min-w-0 flex-1 resize-y rounded-lg border border-border bg-surface px-3 py-2 text-body leading-relaxed text-ink shadow-sm transition-colors placeholder:italic placeholder:text-muted-foreground/60 hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/15';
  const textarea = (
    <textarea
      ref={textareaRef}
      id={textareaId}
      value={text}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      // Keyboard focus only pauses the scene, so Tab can pass the box on the way to the demo's controls;
      // a press on the box, typing or pasting is the take-over.
      onFocus={() => {
        setFieldFocus(true);
        // Unless the prep sheet is over the box: then focus takes over, so the focused box is visible.
        if (shot.sheetOpen) takeOver('box');
      }}
      onPointerDown={() => takeOver('box')}
      onInput={() => takeOver('box')}
      onBlur={() => setFieldFocus(false)}
      placeholder={lineBusy ? '' : PLACEHOLDER}
      rows={variant === 'try' ? 6 : home ? 2 : 3}
      maxLength={MAX_CHARS}
      aria-describedby={counterId}
      className={home ? `block w-full ${lineBusy ? fieldClass.replace('border-border', 'border-ink') : fieldClass}` : fieldClass}
    />
  );

  // The scene's typing, over the empty textarea: decorative, and gone the moment the visitor types.
  const sceneLine = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg border border-transparent text-body leading-relaxed text-ink">
      {/* Scrolls to the newest line as it types, as the textarea would; from sm the right padding keeps words clear of the key hints. */}
      <div ref={sceneTypingRef} className="absolute inset-0 overflow-hidden px-3 py-2 sm:pr-24">
        <span className="whitespace-pre-wrap break-words">
          <span className={`transition-[opacity,filter] duration-[400ms] ease-out ${shot.dissolving ? 'opacity-25 blur-[1.5px]' : ''}`}>{HERO_NOTE.slice(0, shot.typedChars)}</span>
          {shot.lineFocus && <span className="ml-px inline-block h-4 w-px translate-y-[3px] animate-caret bg-ink" />}
        </span>
      </div>
      {/* Keyboard hints from sm only: a phone has no ⌘ Enter, so there the scene presses "See what comes out" instead. */}
      <span className={`absolute bottom-2 right-2 hidden gap-1 transition-opacity duration-300 sm:flex ${shot.lineFocus ? 'opacity-100' : 'opacity-0'}`}>
        {[modKey, 'Enter'].map((key) => (
          <kbd
            key={key}
            className={`rounded border border-b-2 px-1.5 py-0.5 font-sans text-[11px] leading-none transition-colors duration-150 ${
              shot.keysHit ? 'border-ink bg-ink text-on-ink' : 'border-border bg-surface text-muted-foreground'
            }`}
          >
            {key}
          </kbd>
        ))}
      </span>
    </div>
  );

  const storeNote = <p className="text-meta text-muted-foreground">We don&rsquo;t store what you paste.</p>;
  const counter = (
    <p id={counterId} className={`text-meta tabular-nums ${showTrimmed ? 'font-medium text-mustard-strong' : 'text-muted-foreground'}`}>
      {count.toLocaleString('en-US')} / {MAX_CHARS_LABEL}
    </p>
  );
  const trimmedNotice = showTrimmed && (
    <p role="status" className="mt-1 px-2 text-meta text-mustard-strong sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
      {NOTICE_TRIMMED}
    </p>
  );
  const sampleButton = (
    <button
      type="button"
      onClick={useSample}
      className="rounded-sm text-meta text-ink underline decoration-border underline-offset-4 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
    >
      Use a sample note
    </button>
  );
  const submitClass =
    'inline-flex h-9 items-center justify-center rounded-lg bg-ink px-4 text-body font-medium text-on-ink transition-colors hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background disabled:opacity-60';
  const submitButton = (
    <button
      type="submit"
      disabled={!submittable}
      // On phones the scene's "send" is a press of this button (full ink, 95%), where wider screens flash the key hints.
      className={home && shot.keysHit && !engaged ? `${submitClass} max-sm:scale-95 max-sm:disabled:opacity-100` : submitClass}
      style={home ? { transition: 'transform 150ms ease-out, opacity 150ms ease-out, background-color 150ms' } : undefined}
    >
      {state.status === 'loading' ? 'Reading your notes…' : 'See what comes out'}
    </button>
  );

  const form = (
    <form onSubmit={handleSubmit} aria-label="Paste your notes">
      <label htmlFor={textareaId} className="sr-only">
        Your notes
      </label>
      <LedgerLine date={formatShort(lineDay, lineDay)} dateTime={lineDay} focused={lineBusy}>
        {home ? (
          <div className="relative min-w-0 flex-1">
            {textarea}
            {!engaged && sceneLine}
          </div>
        ) : (
          textarea
        )}
      </LedgerLine>
      {home ? (
        // The homepage packs the same controls into one row, so Priya's log reaches the fold.
        <>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
            <div className="flex flex-col items-start gap-0.5">
              {sampleButton}
              {storeNote}
            </div>
            {/* The counter joins the row once there is text, so at rest the row is one line; screen readers always have it. */}
            <div className="ml-auto flex items-center gap-3">
              <div className={count === 0 ? 'sr-only' : undefined}>{counter}</div>
              {submitButton}
            </div>
          </div>
          {trimmedNotice}
        </>
      ) : (
        <>
          <div className="mt-2 flex items-center justify-between gap-4 px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
            {storeNote}
            {counter}
          </div>
          {trimmedNotice}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 sm:pl-[calc(var(--spacing-gutter)+1.5rem)]">
            {sampleButton}
            {submitButton}
          </div>
        </>
      )}
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
      <div
        ref={frameRef}
        className={`overflow-hidden rounded-xl border border-border bg-background ${home ? 'relative h-[var(--hero-frame-h)] [--hero-frame-h:940px] sm:[--hero-frame-h:850px]' : ''}`}
        {...(home ? { role: 'group', 'aria-label': HERO_SCENE_LABEL, 'data-scene-instant': scene.instant ? '' : undefined } : {})}
      >
        <div className="flex h-11 items-center gap-2 border-b border-border px-3 sm:gap-4 sm:px-4" aria-hidden="true">
          <Logomark size="sm" decorative />
          <span className="relative ml-1 flex h-11 items-center px-2 text-body font-medium text-ink">
            Log
            <span className="absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-mauve" />
          </span>
          <span className="flex h-11 items-center px-2 text-body text-muted-foreground">Career</span>
          <span className="ml-auto h-7 w-7 rounded-full bg-mauve-soft text-center text-meta font-medium leading-7 text-mauve-strong">{home ? 'PR' : ''}</span>
        </div>

        <div
          className={`space-y-6 px-3 py-5 sm:px-6 sm:py-6 ${
            home
              ? `h-[calc(var(--hero-frame-h)-2.75rem-2px)] ${scene.visitor ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden [mask-image:linear-gradient(#000_88%,transparent)]'}`
              : ''
          }`}
        >
          {data && (
            <OccasionCard
              title={data.cardTitle}
              aside={data.cardAside}
              context={
                <>
                  {/* The visitor's count is announced by the live region below, so it is read once. */}
                  <span aria-hidden={settled || undefined} className={`transition-colors duration-[600ms] ${shot.countFlash ? 'text-sage-on-ink' : ''}`}>
                    {occasionContext}
                  </span>
                  <span aria-live="polite" className="sr-only">
                    {settled ? visitorContext : ''}
                  </span>
                </>
              }
              windows={windows}
              stackMinStrips={4}
              caption={shot.counted ? data.caption.after : data.caption.before}
              action={
                <span
                  aria-hidden="true"
                  data-scene-target="prep"
                  className={`${INK_BUTTON} ${shot.prepPressed ? 'scale-95' : ''} ${shot.ring ? 'shadow-[0_0_0_3px_hsl(var(--sage-on-ink)/0.55)]' : ''}`}
                  style={{ transition: 'transform 150ms ease-out, box-shadow 300ms ease-out' }}
                >
                  Prep my 1:1
                </span>
              }
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

            {data && (
              <LedgerRows className="mt-2 border-t border-border" aria-label="An example log: Priya's recent entries">
                {/* The scene's two entries open in at the top, then fold away before the loop restarts. */}
                {shot.rowsMounted &&
                  data.newRows.map((row, i) => {
                    const open = shot.rowsOpen > i;
                    return (
                      <li
                        key={row.id}
                        aria-hidden="true"
                        className={`grid transition-[grid-template-rows,opacity] duration-[550ms] ease-out ${
                          open ? 'grid-rows-[1fr] opacity-100 starting:grid-rows-[0fr] starting:opacity-0' : 'grid-rows-[0fr] border-b-0 opacity-0'
                        }`}
                      >
                        <ul className="min-h-0 overflow-hidden">
                          <LedgerRow
                            date={formatShort(row.date, data.day)}
                            dateTime={row.date}
                            label={HERO_LABEL}
                            title={row.title}
                            preview={row.preview}
                            outcome={row.outcome}
                            outcomeClassName={`origin-left transition-transform duration-500 ease-out ${shot.barsDrawn ? '' : 'scale-x-0'}`}
                          />
                        </ul>
                      </li>
                    );
                  })}
                {data.ledger.map((item) =>
                  item.type === 'entry' ? (
                    <LedgerRow
                      key={item.entry.id}
                      date={formatShort(item.entry.date, data.day)}
                      dateTime={item.entry.date}
                      label={HERO_LABEL}
                      title={item.entry.title}
                      preview={item.entry.preview}
                      outcome={item.entry.outcome}
                    />
                  ) : (
                    <LedgerDivider key={item.date} label={item.label} />
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

        {data && <PrepSheet prep={data.prep} day={data.day} state={shot} />}
        {data && <SceneCursor frameRef={frameRef} state={shot} instant={scene.instant} run={scene.run} />}
      </div>

      {playsScene && (
        <SceneControls scene={scene} dimmed={scene.visitor} playLabel={scene.visitor ? 'Replay the demo' : undefined} onPlayButton={onPlayButton} onChapter={onChapter} />
      )}
      {playsScene && confirmReplayAt !== null && (
        <div
          role="group"
          aria-labelledby={`${counterId}-replay`}
          onKeyDown={(event) => event.key === 'Escape' && cancelReplay()}
          className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2"
        >
          <p id={`${counterId}-replay`} className="text-meta text-ink">
            Replay the demo? Your pasted note will be cleared.
          </p>
          <div className="ml-auto flex gap-2">
            <button
              ref={keepNoteRef}
              type="button"
              onClick={cancelReplay}
              className="inline-flex h-8 items-center rounded-lg border border-border bg-surface px-3 text-meta font-medium text-ink hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              Keep my note
            </button>
            <button
              type="button"
              onClick={() => replay(confirmReplayAt)}
              className="inline-flex h-8 items-center rounded-lg bg-ink px-3 text-meta font-medium text-on-ink hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background"
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
