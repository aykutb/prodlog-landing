import React from 'react';
import Link from 'next/link';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { PRIYA } from '@/src/content/demo/priya';

// Career mode: the move switch, the tabs and the portfolio preview in one
// shot, with a link to Priya's live public page under it. (The live page used
// to render here too, but it repeated the preview already in the shot.)
export const ChangeJobsSection = () => {
  return (
    <section className="py-24 px-4 sm:px-8 md:px-12 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-ink leading-tight">When you change jobs, it comes with you.</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Turn on &ldquo;I&rsquo;m getting ready to move&rdquo; and Career comes first: resume bullets, STAR stories and a public portfolio, all built from
          your entries. Publishing is free, and nothing is public until you publish it.
        </p>
        <Link
          href={PRIYA.portfolioPath}
          className="inline-block border border-ink/40 bg-surface text-ink px-6 py-3 rounded-lg font-medium text-sm hover:border-ink transition-all no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2"
        >
          See a real one
        </Link>
      </div>

      <div className="mt-12 mx-auto max-w-5xl">
        <ProductShot
          name="career-move.png"
          alt="Priya's Career page with I'm getting ready to move switched on, her portfolio published, and the portfolio preview"
          width={2880}
          height={1800}
          url="dashboard.prodlog.app/career/portfolio"
        />
        <p className="mt-3 text-center text-meta text-muted-foreground">
          Priya&rsquo;s public page, live at{' '}
          <Link href={PRIYA.portfolioPath} className="text-ink underline underline-offset-4">
            prodlog.app{PRIYA.portfolioPath}
          </Link>
        </p>
      </div>
    </section>
  );
};
