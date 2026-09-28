import { SelfReviewPage } from '@/src/views/SelfReview';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/self-review');
// Hourly: the demo dates follow today and the pricing lines follow the date.
export const revalidate = 3600;

export default function Page() {
  return <SelfReviewPage />;
}
