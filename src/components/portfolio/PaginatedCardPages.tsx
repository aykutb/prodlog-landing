'use client';

import React, { useState } from 'react';

/**
 * Client-side pager for bento card item lists, visually matching the
 * dashboard's BentoCardPagination (arrows + sliding window of dots).
 *
 * Pages arrive fully server-rendered; every page stays in the DOM (inactive
 * ones get `hidden`) so all portfolio content remains in the initial HTML.
 */
export const PaginatedCardPages = ({ pages }: { pages: React.ReactNode[] }) => {
  const [page, setPage] = useState(0);
  const totalPages = pages.length;

  if (totalPages <= 1) {
    return <div className="flex-1 min-h-0">{pages[0] ?? null}</div>;
  }

  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  // Show up to 5 dots with a sliding window.
  const maxDots = 5;
  let startPage = 0;
  let endPage = totalPages;
  if (totalPages > maxDots) {
    startPage = Math.max(0, page - Math.floor(maxDots / 2));
    endPage = startPage + maxDots;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxDots;
    }
  }
  const dots = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  const arrowClass = (disabled: boolean) =>
    `rounded-full p-0.5 transition-colors ${
      disabled ? 'text-muted/20 cursor-default' : 'text-muted hover:text-primary hover:bg-charcoal/50'
    }`;

  return (
    <>
      <div className="flex-1 min-h-0">
        {pages.map((pageContent, i) => (
          <div key={i} className={i === page ? undefined : 'hidden'}>
            {pageContent}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1 pt-2 pb-1">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className={arrowClass(isFirst)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5 mx-1">
          {dots.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`rounded-full transition-all duration-200 ${
                p === page ? 'w-1.5 h-1.5 bg-impact' : 'w-1 h-1 bg-muted/30 hover:bg-muted/50'
              }`}
              aria-label={`Go to page ${p + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={isLast}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          className={arrowClass(isLast)}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </>
  );
};
