'use client';

import React, { useState } from 'react';

// Cover thumbnail for a writing entry: the image when present (and loadable),
// otherwise a generated accent tile with a monogram — never a broken slot.
// Mirrors the dashboard's WritingCover (prodlog2 WritingBentoCard).

/** Short mark for the generated tile: first number in the title
 *  ("100 products…" → "100"), else initials of the first two words. */
const coverMonogram = (title: string): string => {
  const num = title.match(/\d{1,3}/)?.[0];
  if (num) return num;
  const initials = title
    .trim()
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return initials || 'W';
};

export const WritingCover = ({
  coverImageUrl,
  title,
}: {
  coverImageUrl: string | null;
  title: string;
}) => {
  const [imgError, setImgError] = useState(false);

  if (coverImageUrl && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverImageUrl}
        alt=""
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-[92px] h-[92px] rounded-lg object-cover border border-divider/50 shrink-0"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="w-[92px] h-[92px] rounded-lg bg-impact/10 flex items-center justify-center shrink-0"
    >
      <span className="text-2xl font-serif font-semibold text-impact">{coverMonogram(title)}</span>
    </div>
  );
};
