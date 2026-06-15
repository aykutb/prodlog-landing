import { PricingPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/pricing');
export const dynamic = 'force-static';

export default function Page() {
  return <PricingPage />;
}
