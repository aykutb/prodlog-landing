import { PrivacyPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/privacy');
export const dynamic = 'force-static';

export default function Page() {
  return <PrivacyPage />;
}
