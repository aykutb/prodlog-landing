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
            className="block p-6 border border-divider rounded-xl bg-white hover:border-deep-ink-blue/30 hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all"
          >
            <h2 className="text-primary font-semibold text-lg mb-2">
              {entry.frontmatter.headline ?? entry.frontmatter.title}
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              {entry.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
