import { HomePage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/');
// Hourly: the demo log's dates follow today and the pricing line follows the date.
export const revalidate = 3600;

export default function Page() {
  return <HomePage />;
}
