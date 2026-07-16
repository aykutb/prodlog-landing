import { SupportPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/support');
export const dynamic = 'force-static';

export default function Page() {
  return <SupportPage />;
}
