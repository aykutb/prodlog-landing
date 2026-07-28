'use client';

import React, { useId, useState } from 'react';
import { trackEvent } from '@/src/lib/analytics';
import { PreviewEntryCard, type PreviewEntry } from './PreviewEntryCard';

const PARSE_URL = 'https://api.prodlog.app/api/preview/parse';
const MAX_CHARS = 8000;

const PLACEHOLDER = `shipped onboarding redesign finally, activation looks up
killed the loyalty feature, freed up eng for the bug backlog
talked maya through the scope call`;

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
const ERROR_TOO_LONG = 'Paste is a bit long. Trim it to 8000 characters or fewer.';
const ERROR_GENERIC = "That didn't work. Try again in a moment.";

export const PreviewTool = () => {
  const [text, setText] = useState('');
  const [state, setState] = useState<ToolState>({ status: 'idle' });
  const textareaId = useId();
  const counterId = useId();

  const count = text.length;
  const overLimit = count > MAX_CHARS;
  const submittable = text.trim().length > 0 && !overLimit && state.status !== 'loading';

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
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor={textareaId} className="sr-only">
          Your notes
        </label>
        <textarea
          id={textareaId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={10}
          aria-describedby={counterId}
          className="w-full border border-divider rounded-lg px-4 py-3 text-sm bg-white text-primary placeholder:text-muted resize-y leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus:border-deep-ink-blue/50"
        />

        <div className="flex items-center justify-between gap-4">
          <p className="text-muted text-xs">We don&rsquo;t store what you paste.</p>
          <p
            id={counterId}
            className={`text-xs tabular-nums ${overLimit ? 'text-warm-amber font-medium' : 'text-muted'}`}
          >
            {count.toLocaleString('en-US')} / {MAX_CHARS.toLocaleString('en-US')}
          </p>
        </div>

        <button
          type="submit"
          disabled={!submittable}
          className="self-start bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          {state.status === 'loading' ? 'Reading your notes…' : 'See what comes out'}
        </button>
      </form>

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

        {state.status === 'done' && state.entries.length > 0 && (
          <div className="mt-10">
            <ul className="flex flex-col gap-3 list-none">
              {state.entries.map((entry, i) => (
                <PreviewEntryCard key={i} entry={entry} />
              ))}
            </ul>

            {state.truncated && (
              <p className="text-muted text-xs mt-3">Showing the first 12. There were more.</p>
            )}

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
