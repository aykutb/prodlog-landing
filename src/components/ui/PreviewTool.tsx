'use client';

import React, { useId, useRef, useState } from 'react';
import { trackEvent } from '@/src/lib/analytics';
import { PreviewEntryCard, type PreviewEntry } from './PreviewEntryCard';
import { AppStoreBadge } from './AppStoreBadge';

const PARSE_URL = 'https://api.prodlog.app/api/preview/parse';
const MAX_CHARS = 8000;
// One formatted number for every line that mentions the limit.
const MAX_CHARS_LABEL = MAX_CHARS.toLocaleString('en-US');

const PLACEHOLDER = `shipped onboarding redesign finally, activation looks up
killed the loyalty feature, freed up eng for the bug backlog
talked maya through the scope call`;

// Filled in by "Use a sample note" for visitors with nothing handy to paste.
// Same register as the placeholder, different content, so the two never read
// as the same thing twice.
const SAMPLE = `pricing page finally out, tues i think, billing tickets dropped right after
said no to the enterprise sso ask again, wrote up why for leadership
q2 roadmap review went ok, cut two things nobody fought for
priya took over the analytics spec, should check in on that`;

interface ParseResponse {
  entries: PreviewEntry[];
  truncated?: boolean;
}

type ToolState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; entries: PreviewEntry[]; truncated: boolean };

const ERROR_RATE_LIMITED =
  "You've run this a few times. Try again in a bit, or start free and do it in the app.";
const ERROR_TOO_LONG = `Paste is a bit long. Trim it to ${MAX_CHARS_LABEL} characters or fewer.`;
const NOTICE_TRIMMED = `That was over ${MAX_CHARS_LABEL} characters, so we kept the first ${MAX_CHARS_LABEL}.`;
const ERROR_GENERIC = "That didn't work. Try again in a moment.";

interface PreviewToolProps {
  /**
   * Density. `page` is /try as it stands: a ten-row textarea, the wrapper's
   * own horizontal padding on small screens, and a left-aligned button.
   * `compact` is for mounting inside a section that already pads and centres
   * its content: four rows, no wrapper padding, centred button. Nothing about
   * the request, the counter, or the result rendering differs.
   */
  variant?: 'page' | 'compact';
  /**
   * Whether the sign-up block renders after a successful parse: the "Keep
   * these" heading, the "Start free" button, and the App Store badge. On by
   * default for /try. The homepage hero turns it off because it already has
   * its own "Start free" link beneath the input and must keep exactly one
   * primary action; there the entries alone are the result.
   */
  showSignup?: boolean;
  /**
   * Rendered between the submit button and the result slot. The homepage
   * hero passes its "Start free" line here so that chrome sits above the
   * results instead of being pushed below them. /try passes nothing.
   */
  afterButton?: React.ReactNode;
  /**
   * The result slot's empty state. When set, the slot always renders: this
   * content before a paste, dimmed while loading, and the visitor's entries
   * once they arrive. The placeholder keeps its box under the entries so the
   * slot never collapses or jumps between states. /try passes nothing, so
   * there the slot appears only once there are entries, as before.
   */
  resultPlaceholder?: React.ReactNode;
}

export const PreviewTool = ({
  variant = 'page',
  showSignup = true,
  afterButton,
  resultPlaceholder,
}: PreviewToolProps) => {
  const compact = variant === 'compact';
  const [text, setText] = useState('');
  const [trimmed, setTrimmed] = useState(false);
  const [state, setState] = useState<ToolState>({ status: 'idle' });
  const textareaId = useId();
  const counterId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const count = text.length;
  const atLimit = count >= MAX_CHARS;
  // The notice stays up while the field is still full; deleting below the
  // limit, or loading the sample, clears it.
  const showTrimmed = trimmed && atLimit;
  const submittable = text.trim().length > 0 && state.status !== 'loading';

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    // maxLength on the textarea covers typing and pasting in every browser we
    // care about. This guard covers drag and drop and anything else that
    // slips past it, so the limit holds regardless of how the text arrived.
    if (next.length > MAX_CHARS) {
      setText(next.slice(0, MAX_CHARS));
      setTrimmed(true);
      return;
    }
    setText(next);
    if (next.length < MAX_CHARS) setTrimmed(false);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // By the time onChange runs, maxLength has already trimmed the paste and
    // the value looks fine. Project the length here so the visitor is told.
    const el = event.currentTarget;
    const pasted = event.clipboardData.getData('text');
    const projected = el.value.length - (el.selectionEnd - el.selectionStart) + pasted.length;
    if (projected > MAX_CHARS) setTrimmed(true);
  };
  const hasEntries = state.status === 'done' && state.entries.length > 0;
  const showSlot = !!resultPlaceholder || hasEntries;

  const useSample = () => {
    setText(SAMPLE);
    setTrimmed(false);
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    // Caret at the end so the visitor can keep typing where the sample stops.
    el.setSelectionRange(SAMPLE.length, SAMPLE.length);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!submittable) return;

    // Count only. The pasted text goes nowhere except the POST body below.
    trackEvent('preview_pasted', { character_count: count });
    setState({ status: 'loading' });

    let response: Response;
    try {
      response = await fetch(PARSE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch {
      setState({ status: 'error', message: ERROR_GENERIC });
      return;
    }

    if (response.status === 429) {
      setState({ status: 'error', message: ERROR_RATE_LIMITED });
      return;
    }
    if (response.status === 400) {
      setState({ status: 'error', message: ERROR_TOO_LONG });
      return;
    }
    if (!response.ok) {
      setState({ status: 'error', message: ERROR_GENERIC });
      return;
    }

    let data: ParseResponse;
    try {
      data = (await response.json()) as ParseResponse;
    } catch {
      setState({ status: 'error', message: ERROR_GENERIC });
      return;
    }

    const entries = Array.isArray(data.entries) ? data.entries : [];
    trackEvent('preview_parsed', { entry_count: entries.length });
    setState({ status: 'done', entries, truncated: data.truncated === true });
  };

  return (
    <div className={compact ? 'max-w-2xl mx-auto' : 'max-w-2xl mx-auto px-4 md:px-0'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor={textareaId} className="sr-only">
          Your notes
        </label>
        {/* Above the box rather than below it: the space under the textarea
            already holds the privacy note, the counter, and the button. */}
        <button
          type="button"
          onClick={useSample}
          className="self-end text-deep-ink-blue text-xs underline underline-offset-2 hover:opacity-80 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          Use a sample note
        </button>
        <textarea
          ref={textareaRef}
          id={textareaId}
          value={text}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={PLACEHOLDER}
          rows={compact ? 4 : 10}
          maxLength={MAX_CHARS}
          aria-describedby={counterId}
          className="w-full border border-divider rounded-lg px-4 py-3 text-sm text-left bg-white text-primary placeholder:text-muted resize-y leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus:border-deep-ink-blue/50"
        />

        <div className="flex items-center justify-between gap-4">
          <p className="text-muted text-xs">We don&rsquo;t store what you paste.</p>
          <p
            id={counterId}
            className={`text-xs tabular-nums ${showTrimmed ? 'text-warm-amber font-medium' : 'text-muted'}`}
          >
            {count.toLocaleString('en-US')} / {MAX_CHARS_LABEL}
          </p>
        </div>

        {showTrimmed && (
          <p role="status" className="text-warm-amber text-xs">
            {NOTICE_TRIMMED}
          </p>
        )}

        <button
          type="submit"
          disabled={!submittable}
          className={`${compact ? 'self-center' : 'self-start'} bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2`}
        >
          {state.status === 'loading' ? 'Reading your notes…' : 'See what comes out'}
        </button>
      </form>

      {afterButton}

      <div aria-live="polite">
        {state.status === 'error' && (
          <p role="status" className="text-warm-amber text-sm mt-6">
            {state.message}
          </p>
        )}

        {state.status === 'done' && state.entries.length === 0 && (
          <p role="status" className="text-secondary text-sm mt-6">
            We couldn&rsquo;t find distinct entries in that. Try a few lines, one thing per
            line.
          </p>
        )}

        {/* The result slot. Placeholder and entries share one grid cell, so the
            slot is always at least the placeholder's height: no collapse when
            the entries replace it, no jump while loading. */}
        {showSlot && (
          <div className="mt-10 grid">
            {resultPlaceholder && (
              <div
                className={`[grid-area:1/1] transition-opacity ${
                  state.status === 'loading' ? 'opacity-50' : ''
                } ${hasEntries ? 'invisible' : ''}`}
                aria-hidden={hasEntries || undefined}
                aria-busy={state.status === 'loading' || undefined}
              >
                {resultPlaceholder}
              </div>
            )}

            {hasEntries && (
              <div className="[grid-area:1/1]">
                <ul className="flex flex-col gap-3 list-none">
                  {state.entries.map((entry, i) => (
                    <PreviewEntryCard key={i} entry={entry} />
                  ))}
                </ul>

                {state.truncated && (
                  <p className="text-muted text-xs mt-3">Showing the first 12. There were more.</p>
                )}

                {showSignup && (
                  <div className="mt-12 text-center">
                    <h2 className="serif-headline text-xl md:text-2xl text-primary mb-4">
                      Keep these, and add to them.
                    </h2>
                    <a
                      href="https://dashboard.prodlog.app/auth"
                      onClick={() => trackEvent('preview_signup_click')}
                      className="inline-block bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
                    >
                      Start free
                    </a>
                    <p className="text-secondary text-sm mt-3">
                      Free forever. Unlimited entries, no card.
                    </p>
                    <p className="text-muted text-xs mt-2">
                      These aren&rsquo;t saved yet. Signing up takes a few seconds, then you can
                      paste again.
                    </p>

                    {/* Secondary action. Quiet on purpose: a divider, one line of
                        secondary text, and the badge. "Start free" stays the only
                        button. */}
                    <div className="mt-10 pt-8 border-t border-divider flex flex-col items-center gap-4">
                      <p className="text-secondary text-sm max-w-md">
                        Keep it going in thirty seconds a week. Log by voice from your phone.
                      </p>
                      <AppStoreBadge />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
