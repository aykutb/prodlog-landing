import { SampleImpactPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/sample');
export const dynamic = 'force-static';

export default function Page() {
  return <SampleImpactPage />;
}
