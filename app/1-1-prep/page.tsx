import { OneOnOnePrepPage } from '@/src/views/OneOnOnePrep';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/1-1-prep');
// Hourly: the demo dates follow today and the pricing lines follow the date.
export const revalidate = 3600;

export default function Page() {
  return <OneOnOnePrepPage />;
}
