import { IntegrationsSlackPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/integrations/slack');
export const dynamic = 'force-static';

export default function Page() {
  return <IntegrationsSlackPage />;
}
