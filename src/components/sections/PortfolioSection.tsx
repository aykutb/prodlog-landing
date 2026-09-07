import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PortfolioSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
        The fifth one is your portfolio.
      </h2>
      <p className="text-secondary leading-relaxed mb-4">
        Same entries, one page: decisions you made, features you killed, metrics you moved,
        tradeoffs you chose, skills, case studies, writing you published.
      </p>
      <p className="text-secondary leading-relaxed mb-8">
        Everything stays private until you publish it.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/p/aykutbal"
          className="inline-block border border-deep-ink-blue/40 bg-white text-deep-ink-blue px-6 py-3 rounded font-medium text-sm hover:border-deep-ink-blue transition-all no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          See a real one
        </Link>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="inline-block border border-divider bg-white text-primary px-6 py-3 rounded font-medium text-sm hover:border-deep-ink-blue/40 transition-all text-center no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          Import from LinkedIn
        </a>
      </div>
    </div>

    {/* The PortfolioBentoMock mini-cards used to sit beside the text. Unmounted
        here, not deleted: /how-it-works step 04 still renders the component.
        The screenshot below shows the same thing at a readable size. */}

    {/* Cropped from the live portfolio at prodlog.app/p/aykutbal: the first
        row of the products grid, captured at 2x. The header, avatar and role
        are left out on purpose; this is the part that looks like work. */}
    <div className="mt-8 mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
      <Image
        src="/images/screenshots/13-portfolio-products.png"
        width={2016}
        height={750}
        sizes="(max-width: 1024px) calc(100vw - 64px), 1024px"
        alt="Sample Prodlog portfolio: product cards with role, dates, a dated entry, and a metric"
      />
    </div>
  </section>
);
