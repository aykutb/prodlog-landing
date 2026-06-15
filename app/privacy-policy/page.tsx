import { PrivacyPolicyPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/privacy-policy');
export const dynamic = 'force-static';

export default function Page() {
  return <PrivacyPolicyPage />;
}
