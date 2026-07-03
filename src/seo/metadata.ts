import type { Metadata } from 'next';
import { getRouteMeta } from '@/src/seo/routeMeta';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  canonicalUrl,
  getOgImageUrl,
} from '@/src/seo/siteUrl';

export function createContentMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return buildMetadata({ title, description, pathname: path });
}

export function createRouteMetadata(pathname: string): Metadata {
  const meta = getRouteMeta(pathname);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    pathname,
  });
}

function buildMetadata({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}): Metadata {
  const canonical = canonicalUrl(pathname);
  const ogImage = getOgImageUrl();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      siteName: 'Prodlog',
      locale: 'en_US',
      title,
      description,
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
      title,
      description,
      images: [ogImage],
    },
  };
}
