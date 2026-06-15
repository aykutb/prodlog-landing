import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/src/seo/siteUrl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
