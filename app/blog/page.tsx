import { BlogHub } from '@/src/components/content/BlogHub';
import { HUBS } from '@/src/content/resources';
import { getAllSectionEntries } from '@/src/lib/content';
import { createContentMetadata } from '@/src/seo/metadata';

export const dynamic = 'force-static';

const SECTION = 'blog' as const;
const hub = HUBS[SECTION];

export const metadata = createContentMetadata({
  title: hub.title,
  description: hub.description,
  path: hub.path,
});

export default async function Page() {
  const entries = await getAllSectionEntries(SECTION);
  return <BlogHub hub={hub} section={SECTION} entries={entries} />;
}
