import React from 'react';
import Link from 'next/link';

interface CTASectionProps {
  centered?: boolean;
  showSecondary?: boolean;
}

const PRIMARY_CLASS =
  'mdx-btn-primary w-full md:w-auto bg-ink text-on-ink px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2';

const SECONDARY_CLASS =
  'mdx-btn-secondary w-full md:w-auto border border-ink/40 bg-surface text-ink px-6 py-3 rounded font-medium text-sm hover:border-ink hover:bg-muted/40 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2';

export const CTASection = ({ centered = true, showSecondary = true }: CTASectionProps) => (
  <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} my-6`}>
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
    <p className={`text-muted-foreground text-xs mt-4 ${centered ? 'text-center' : 'text-left'}`}>
      Free forever. Unlimited entries, no card.
    </p>
  </div>
);
