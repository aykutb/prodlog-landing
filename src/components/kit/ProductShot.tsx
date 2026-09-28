import React from 'react';
import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

/** Real product screenshots live here; docs/landing-shots.md lists every one. */
export const SHOTS_DIR = 'shots';

interface ProductShotProps {
  /** File name in public/shots/, e.g. "log-home.png". */
  name: string;
  alt: string;
  /** The file's pixel size (from docs/landing-shots.md). */
  width: number;
  height: number;
  /** `browser`: light browser chrome with an address. `none`: a plain frame (Slack, phone). */
  chrome?: 'browser' | 'none';
  /** The address shown in the chrome. */
  url?: string;
  /** next/image sizes. */
  sizes?: string;
  priority?: boolean;
  /**
   * Show part of the shot, so one file serves a full view and a crop.
   * `region`: a rectangle of the image as fractions (x, y, width, height from
   * the top left); the frame takes its shape and the image is scaled to fill
   * it. Or `aspect` + `position`: an object-cover crop ("4 / 3", "50% 60%").
   */
  crop?: { region: { x: number; y: number; w: number; h: number } } | { aspect: string; position?: string };
  className?: string;
}

/**
 * A real screenshot in a light, straight-on frame: a border, a 12px radius,
 * no shadow, no 3D. Server component. A missing file renders a loud
 * "MISSING SHOT" frame in development and fails the production build.
 */
export const ProductShot = ({ name, alt, width, height, chrome = 'browser', url = 'dashboard.prodlog.app', sizes = '(min-width: 1024px) 960px, 100vw', priority = false, crop, className = '' }: ProductShotProps) => {
  const file = path.join(process.cwd(), 'public', SHOTS_DIR, name);
  const region = crop && 'region' in crop ? crop.region : null;
  // A region is drawn larger than its frame, so the image needs a bigger source than the frame's size suggests.
  const regionSizes = region ? sizes.replace(/(\d+(?:\.\d+)?)(px|vw)/g, (_, n: string, unit: string) => `${Math.round(Number(n) / region.w)}${unit}`) : sizes;
  const frameAspect = region ? `${region.w * width} / ${region.h * height}` : crop && 'aspect' in crop ? crop.aspect : `${width} / ${height}`;
  const missing = !existsSync(file);
  if (missing && process.env.NODE_ENV === 'production') {
    throw new Error(`ProductShot: public/${SHOTS_DIR}/${name} is missing. Capture it (docs/landing-shots.md) before building.`);
  }

  return (
    <figure className={`overflow-hidden rounded-xl border border-border bg-surface ${className}`}>
      {chrome === 'browser' && (
        <div className="flex h-8 items-center gap-3 border-b border-border bg-muted px-3" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </span>
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-surface px-3 text-meta leading-5 text-muted-foreground">{url}</span>
          <span className="w-[42px]" />
        </div>
      )}
      {missing ? (
        <div
          role="img"
          aria-label={alt}
          style={{ aspectRatio: frameAspect }}
          className="flex w-full items-center justify-center border-4 border-dashed border-destructive bg-destructive/10 p-4 text-center font-mono text-sm font-bold text-destructive [overflow-wrap:anywhere]"
        >
          MISSING SHOT: {name}
        </div>
      ) : region ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: frameAspect }}>
          <Image
            src={`/${SHOTS_DIR}/${name}`}
            alt={alt}
            width={width}
            height={height}
            sizes={regionSizes}
            priority={priority}
            className="absolute left-0 top-0 max-w-none"
            style={{ width: `${100 / region.w}%`, height: 'auto', transform: `translate(${-region.x * 100}%, ${-region.y * 100}%)` }}
          />
        </div>
      ) : crop && 'aspect' in crop ? (
        <div className="relative w-full" style={{ aspectRatio: crop.aspect }}>
          <Image src={`/${SHOTS_DIR}/${name}`} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: crop.position ?? '50% 0%' }} />
        </div>
      ) : (
        <Image src={`/${SHOTS_DIR}/${name}`} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
      )}
    </figure>
  );
};
