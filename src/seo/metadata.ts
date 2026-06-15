import type { Metadata } from 'next';
import { getRouteMeta } from '@/src/seo/routeMeta';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  canonicalUrl,
  getOgImageUrl,
} from '@/src/seo/siteUrl';

export function createRouteMetadata(pathname: string): Metadata {
  const meta = getRouteMeta(pathname);
  const canonical = canonicalUrl(pathname);
  const ogImage = getOgImageUrl();

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      siteName: 'Prodlog',
      locale: 'en_US',
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [
        {
          url: ogImage,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: 'Prodlog — PM portfolio and impact logs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}
