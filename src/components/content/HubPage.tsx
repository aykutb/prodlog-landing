import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/src/components/ui';
import type { HubConfig } from '@/src/content/resources';
import type { LoadedContent } from '@/src/lib/content';
import { sectionEntryPath, type ContentSection } from '@/src/lib/content';

interface HubPageProps {
  hub: HubConfig;
  section: ContentSection;
  entries: LoadedContent[];
}

export const HubPage = ({ hub, section, entries }: HubPageProps) => (
  <div className="pb-24">
    <PageHeader title={hub.title.replace(' | Prodlog', '')} subtitle={hub.subtitle} />
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <div className="grid gap-4">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={sectionEntryPath(section, entry.slug)}
            className="block p-6 border border-border rounded-xl bg-surface hover:border-ink/30 transition-all"
          >
            <h2 className="text-ink font-semibold text-lg mb-2">
              {entry.frontmatter.headline ?? entry.frontmatter.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {entry.frontmatter.description}
            </p>
            {hub.cardNotes?.[entry.slug] && <p className="mt-2 text-sm font-medium text-ink">{hub.cardNotes[entry.slug]}</p>}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
