'use client';

import React, { useState } from 'react';

interface CopyCodeBlockProps {
  /** The exact text the button copies, shown as-is. */
  code: string;
  /** Names the copied thing for screen readers, e.g. "the server URL". */
  label: string;
  /** `inline`: one line that scrolls sideways. `prose`: wraps, for a prompt. */
  variant?: 'inline' | 'prose';
}

/**
 * Text to paste somewhere else (a URL, a command, a prompt) with a Copy
 * button. The text stays selectable, so copying by hand works too.
 */
export const CopyCodeBlock = ({ code, label, variant = 'inline' }: CopyCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the text is still selectable
    }
  };

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-surface p-2 pl-4">
      {variant === 'inline' ? (
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1.5 font-mono text-sm text-ink">{code}</code>
      ) : (
        <p className="min-w-0 flex-1 py-1.5 text-sm leading-relaxed text-ink">{code}</p>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-ink transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
          {copied ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
};
