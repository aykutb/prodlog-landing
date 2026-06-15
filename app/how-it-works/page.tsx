import { HowItWorksPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/how-it-works');
export const dynamic = 'force-static';

export default function Page() {
  return <HowItWorksPage />;
}
