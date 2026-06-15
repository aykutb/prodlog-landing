import { HomePage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/');
export const dynamic = 'force-static';

export default function Page() {
  return <HomePage />;
}
