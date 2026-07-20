'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Screenshot thumbnails for the L product card, with a fullscreen overlay
// viewer. Mirrors the dashboard's ProductBentoCard lightbox (prodlog2):
// portal to <body> so position:fixed anchors to the viewport, overlay click
// or Escape closes, arrow keys cycle.

const Lightbox = ({
  images,
  index,
  onIndexChange,
  onClose,
  altPrefix,
}: {
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  altPrefix: string;
}) => {
  const count = images.length;
  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const navButton =
    'absolute rounded-full bg-white/10 p-2 text-white/90 transition-colors hover:bg-white/20';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${altPrefix} screenshots`}
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close" className={`${navButton} right-4 top-4`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous screenshot"
          className={`${navButton} left-4 top-1/2 -translate-y-1/2`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={`${altPrefix} screenshot ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next screenshot"
          className={`${navButton} right-4 top-1/2 -translate-y-1/2`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
          {index + 1} / {count}
        </div>
      )}
    </div>,
    document.body,
  );
};

export const ScreenshotStrip = ({
  screenshots,
  productName,
}: {
  screenshots: string[];
  productName: string;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  return (
    <>
      <div className="mt-3 flex shrink-0 gap-2 overflow-x-auto pb-1">
        {screenshots.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${productName} screenshot ${i + 1}`}
            className="shrink-0 overflow-hidden rounded-md border border-divider transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impact"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${productName} screenshot ${i + 1}`}
              loading="lazy"
              className="h-14 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={screenshots}
          index={Math.min(lightboxIndex, screenshots.length - 1)}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          altPrefix={productName}
        />
      )}
    </>
  );
};
