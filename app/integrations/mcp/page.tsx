import { IntegrationsMcpPage } from '@/src/views';
import { createRouteMetadata } from '@/src/seo/metadata';

export const metadata = createRouteMetadata('/integrations/mcp');
export const dynamic = 'force-static';

export default function Page() {
  return <IntegrationsMcpPage />;
}
