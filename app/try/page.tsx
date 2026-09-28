import { TryPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/try');
// Hourly: the demo rows are dated relative to today.
export const revalidate = 3600;

export default function Page() {
  return <TryPage />;
}
