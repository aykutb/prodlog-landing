import { TermsOfServicePage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/terms');
export const dynamic = 'force-static';

export default function Page() {
  return <TermsOfServicePage />;
}
