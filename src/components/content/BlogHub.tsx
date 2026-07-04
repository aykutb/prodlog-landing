import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/src/components/ui';
import type { HubConfig } from '@/src/content/resources';
import {
  formatContentDate,
  sectionEntryPath,
  type ContentSection,
  type LoadedContent,
} from '@/src/lib/content';

interface BlogHubProps {
  hub: HubConfig;
  section: ContentSection;
  entries: LoadedContent[];
}

const tileAccents = [
  { bg: 'bg-sage-green/12', letter: 'text-sage-green/70' },
  { bg: 'bg-muted-plum/12', letter: 'text-muted-plum/70' },
  { bg: 'bg-warm-amber/15', letter: 'text-warm-amber/80' },
  { bg: 'bg-deep-ink-blue/8', letter: 'text-deep-ink-blue/60' },
];

function displayTitle(entry: LoadedContent): string {
  return (
    entry.frontmatter.headline ??
    entry.frontmatter.title.replace(/\s*\|\s*Prodlog\s*$/i, '').trim()
  );
}

function CardTile({
  entry,
  index,
  className,
}: {
  entry: LoadedContent;
  index: number;
  className: string;
}) {
  const { image } = entry.frontmatter;

  if (image) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const accent = tileAccents[index % tileAccents.length];
  return (
    <div
      className={`flex items-center justify-center ${accent.bg} ${className}`}
      aria-hidden="true"
    >
      <span className={`serif-headline select-none text-7xl ${accent.letter}`}>
        {displayTitle(entry).charAt(0)}
      </span>
    </div>
  );
}

function MetaRow({ entry }: { entry: LoadedContent }) {
  const { updatedAt, author } = entry.frontmatter;
  const parts = [
    updatedAt ? `Updated ${formatContentDate(updatedAt)}` : null,
    `${entry.readingTimeMin} min read`,
    author ?? null,
  ].filter(Boolean);

  return (
    <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
      {parts.map((part, i) => (
        <React.Fragment key={part}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <span>{part}</span>
        </React.Fragment>
      ))}
    </p>
  );
}

function FeaturedCard({
  entry,
  section,
}: {
  entry: LoadedContent;
  section: ContentSection;
}) {
  return (
    <Link
      href={sectionEntryPath(section, entry.slug)}
      className="group grid overflow-hidden rounded-2xl border border-divider bg-white transition-all hover:border-deep-ink-blue/30 hover:shadow-[0_12px_40px_-12px_rgba(31,42,68,0.18)] md:grid-cols-[2fr_3fr]"
    >
      <CardTile entry={entry} index={0} className="h-48 md:h-full md:min-h-[16rem]" />
      <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          Featured
        </p>
        <h2 className="serif-headline text-2xl leading-snug text-primary transition-colors group-hover:text-deep-ink-blue md:text-3xl">
          {displayTitle(entry)}
        </h2>
        <p className="text-sm leading-relaxed text-secondary md:text-base">
          {entry.frontmatter.description}
        </p>
        <MetaRow entry={entry} />
      </div>
    </Link>
  );
}

function BlogCard({
  entry,
  index,
  section,
}: {
  entry: LoadedContent;
  index: number;
  section: ContentSection;
}) {
  return (
    <Link
      href={sectionEntryPath(section, entry.slug)}
      className="group flex flex-col overflow-hidden rounded-xl border border-divider bg-white transition-all hover:border-deep-ink-blue/30 hover:shadow-[0_8px_28px_-10px_rgba(31,42,68,0.16)]"
    >
      <CardTile entry={entry} index={index} className="h-44" />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h2 className="text-lg font-semibold text-primary transition-colors group-hover:text-deep-ink-blue">
          {displayTitle(entry)}
        </h2>
        <p className="flex-1 text-sm leading-relaxed text-secondary">
          {entry.frontmatter.description}
        </p>
        <MetaRow entry={entry} />
      </div>
    </Link>
  );
}

export const BlogHub = ({ hub, section, entries }: BlogHubProps) => {
  const [featured, ...rest] = entries;

  return (
    <div className="pb-24">
      <PageHeader title={hub.title.replace(' | Prodlog', '')} subtitle={hub.subtitle} />
      <div className="mx-auto max-w-5xl space-y-6 px-8 md:px-12">
        {featured && <FeaturedCard entry={featured} section={section} />}
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((entry, i) => (
              <BlogCard key={entry.slug} entry={entry} index={i + 1} section={section} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
