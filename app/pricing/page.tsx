import { PricingPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';
import { fetchFoundingSpotsRemaining } from '@/src/lib/foundingSpots';

export const metadata = createRouteMetadata('/pricing');
// ISR: crawlers get fully rendered HTML; the founding-member counter is
// refreshed on the server every 5 minutes.
export const revalidate = 300;

export default async function Page() {
  const spotsRemaining = await fetchFoundingSpotsRemaining();
  return <PricingPage spotsRemaining={spotsRemaining} />;
}
