import type { Metadata } from 'next';
import { PricingPage } from '@/src/views';
import { createContentMetadata } from '@/src/seo/metadata';
import { pricingLines } from '@/src/lib/pricing';

// Hourly: the page's copy switches on its own when the free period ends.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const lines = pricingLines();
  return createContentMetadata({ title: lines.metaTitle, description: lines.metaDescription, path: '/pricing' });
}

export default function Page() {
  return <PricingPage lines={pricingLines()} />;
}
