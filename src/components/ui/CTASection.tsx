import React from 'react';
import Link from 'next/link';

interface CTASectionProps {
  centered?: boolean;
  showSecondary?: boolean;
  /**
   * Homepage hero only. The hero mounts the paste input itself as the single
   * primary action, so this branch renders only what sits beneath it:
   * "Start free" as a text link and the "Free forever" line. Every other
   * surface (FAQ, privacy, MDX pages) keeps "Start free" as the primary
   * button, so this defaults off. Ignored together with showSecondary when on.
   */
  pastePrimary?: boolean;
}

const PRIMARY_CLASS =
  'mdx-btn-primary w-full md:w-auto bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2';

const SECONDARY_CLASS =
  'mdx-btn-secondary w-full md:w-auto border border-deep-ink-blue/40 bg-white text-deep-ink-blue px-6 py-3 rounded font-medium text-sm hover:border-deep-ink-blue hover:bg-charcoal/40 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2';

export const CTASection = ({
  centered = true,
  showSecondary = true,
  pastePrimary = false,
}: CTASectionProps) => (
  <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} my-6`}>
    {pastePrimary ? (
      <a
        href="https://dashboard.prodlog.app/auth"
        className="text-deep-ink-blue text-sm underline underline-offset-2 hover:opacity-80 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
      >
        Start free
      </a>
    ) : (
      <div
        className={`flex flex-col md:flex-row ${centered ? 'justify-center' : 'justify-start'} items-center gap-3 w-full`}
      >
        <a href="https://dashboard.prodlog.app/auth" className={PRIMARY_CLASS}>
          Start free
        </a>
        {showSecondary && (
          <Link href="/try" className={SECONDARY_CLASS}>
            Paste in your notes and see what comes out
          </Link>
        )}
      </div>
    )}
    <p className={`text-muted text-xs mt-4 ${centered ? 'text-center' : 'text-left'}`}>
      Free forever. Unlimited entries, no card.
    </p>
  </div>
);
