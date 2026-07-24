'use client';

import React, { useState } from 'react';

// Cover art for a writing card: the image when present (and loadable),
// otherwise a generated accent tile with a monogram — never a broken slot.
// Mirrors the dashboard's Cover (prodlog2 WritingBentoCard): 'thumb' is the
// square used at M, 'banner' the full-width strip used at L. Publisher CDNs
// are hotlinked with no referrer; if one refuses, onError falls back to the
// same tile.

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
  variant = 'thumb',
}: {
  coverImageUrl: string | null;
  title: string;
  variant?: 'thumb' | 'banner';
}) => {
  const [imgError, setImgError] = useState(false);
  const box =
    variant === 'thumb'
      ? 'w-[72px] h-[72px] rounded-lg shrink-0'
      : 'w-full h-[104px] rounded-lg shrink-0';

  if (coverImageUrl && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverImageUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${box} object-cover border border-divider/50 bg-charcoal/40`}
      />
    );
  }
  return (
    <div aria-hidden="true" className={`${box} bg-impact/10 flex items-center justify-center`}>
      <span
        className={`font-serif font-semibold text-impact ${
          variant === 'thumb' ? 'text-xl' : 'text-3xl'
        }`}
      >
        {coverMonogram(title)}
      </span>
    </div>
  );
};
