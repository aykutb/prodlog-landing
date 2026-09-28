import { HowItWorksPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/how-it-works');
// Hourly: the footer's pricing line follows the date.
export const revalidate = 3600;

export default function Page() {
  return <HowItWorksPage />;
}
