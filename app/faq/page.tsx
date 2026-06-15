import { FAQPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/faq');
export const dynamic = 'force-static';

export default function Page() {
  return <FAQPage />;
}
