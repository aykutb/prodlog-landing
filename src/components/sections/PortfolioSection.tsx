import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortfolioBentoMock } from '@/src/components/ui';

export const PortfolioSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      <div className="text-center md:text-left">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
          Your log is already a portfolio.
        </h2>
        <p className="text-secondary leading-relaxed mb-4">
          Entries are the raw material. The portfolio is what you build from them: decisions
          you made, features you killed, metrics you moved, tradeoffs you chose, skills, case
          studies, writing you published. Because fifteen years of work does not fit in a
          list of bullet points.
        </p>
        <p className="text-secondary leading-relaxed mb-8">
          Everything stays private until you publish it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
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

      <PortfolioBentoMock cards={['Decision', 'Kill']} />
    </div>

    <div className="mt-8 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
      <Image
        src="/images/screenshots/06-portfolio-page-hero.png"
        width={2530}
        height={1800}
        alt="Sample Prodlog PM portfolio showing skills, experience, and recent work"
      />
    </div>
  </section>
);
