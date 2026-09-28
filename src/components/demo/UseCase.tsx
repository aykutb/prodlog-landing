import React from 'react';
import Link from 'next/link';
import { LedgerHero } from '@/src/components/ledger-hero/LedgerHero';
import { pricingLines } from '@/src/lib/pricing';

/** Building blocks shared by the use-case pages (/1-1-prep, /self-review). */

export const UseCaseSection = ({ title, children, aside, id }: { title: string; children: React.ReactNode; aside?: React.ReactNode; id: string }) => (
  <section aria-labelledby={id} className={`grid grid-cols-1 gap-8 ${aside ? 'md:grid-cols-12 md:gap-10 md:items-center' : ''}`}>
    <div className={aside ? 'min-w-0 md:col-span-5' : 'mx-auto max-w-2xl'}>
      <h2 id={id} className="serif-headline text-2xl leading-tight text-ink md:text-[32px]">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </div>
    {aside && <div className="min-w-0 md:col-span-7">{aside}</div>}
  </section>
);

/** A free template, as a quiet card with the download and its page. */
export const TemplateDownload = ({ title, line, file, page }: { title: string; line: string; file: string; page: string }) => (
  <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-meta font-medium text-muted-foreground">Free template</p>
      <p className="mt-1 text-row-title font-semibold text-ink">{title}</p>
      <p className="mt-1 text-body text-muted-foreground">{line}</p>
    </div>
    <div className="flex shrink-0 flex-col gap-2 sm:items-end">
      <a href={file} download className="inline-flex h-9 items-center justify-center rounded-lg bg-ink px-4 text-body font-medium text-on-ink hover:bg-ink/90">
        Download .docx
      </a>
      <Link href={page} className="text-meta text-ink underline decoration-border underline-offset-4 hover:decoration-ink">
        Read how to use it
      </Link>
    </div>
  </div>
);

/** The ledger hero in compact form: the paste line and Start free. Ends every use-case page. */
export const CompactLedgerHero = ({ today }: { today: string }) => (
  <section aria-labelledby="start" className="border-t border-border pt-16">
    <h2 id="start" className="serif-headline mb-2 text-center text-2xl leading-tight text-ink md:text-[32px]">
      Start with what you&rsquo;ve already written.
    </h2>
    <p className="mb-8 text-center text-sm text-muted-foreground">Paste a note and see it as entries. Nothing is saved.</p>
    <LedgerHero variant="compact" today={today} pricingLine={pricingLines().hero} />
  </section>
);
