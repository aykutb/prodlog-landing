import React from 'react';
import Link from 'next/link';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { PortfolioBentoGrid } from '@/src/components/portfolio/BentoCards';
import { fetchPortfolio } from '@/src/lib/portfolio/data';
import { PRIYA } from '@/src/content/demo/priya';

// Career mode, then Priya's real public portfolio, rendered from the same
// data and components as prodlog.app/p/priya_r and clipped to its first rows.
export const ChangeJobsSection = async () => {
  const portfolio = await fetchPortfolio(PRIYA.handle).catch(() => null);
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
      </div>

      {portfolio && (
        <div className="mt-10 mx-auto max-w-5xl">
          <p className="mb-3 text-center text-meta text-muted-foreground">
            Priya&rsquo;s public page, live at{' '}
            <Link href={PRIYA.portfolioPath} className="text-ink underline underline-offset-4">
              prodlog.app{PRIYA.portfolioPath}
            </Link>
          </p>
          <div className="relative max-h-[560px] overflow-hidden rounded-xl border border-border bg-background p-4 sm:p-6">
            <PortfolioBentoGrid portfolio={portfolio} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
};
