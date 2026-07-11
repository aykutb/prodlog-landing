'use client';

import React, { useState } from 'react';

/** Copies the given URL to the clipboard; the only interactive leaf on portfolio pages. */
export const CopyLinkButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink text-secondary hover:border-impact/40 transition-colors cursor-pointer"
    >
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
};
