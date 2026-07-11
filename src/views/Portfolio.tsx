import React from 'react';
import type { Portfolio, PortfolioLog, PortfolioProduct } from '@/src/lib/portfolio/data';
import { displayName } from '@/src/lib/portfolio/data';
import { CopyLinkButton } from '@/src/components/ui/CopyLinkButton';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

// Group logs by quarter (falls back to the log's year for entries without one)
const groupByQuarter = (logs: PortfolioLog[]): [string, PortfolioLog[]][] => {
  const groups = new Map<string, PortfolioLog[]>();
  logs.forEach((log) => {
    const key = log.quarter || `${new Date(log.date).getFullYear()}`;
    const group = groups.get(key) ?? [];
    group.push(log);
    groups.set(key, group);
  });
  return Array.from(groups.entries());
};

const SOCIAL_LABELS: [keyof Portfolio['profile'], string][] = [
  ['linkedin_url', 'LinkedIn'],
  ['twitter_url', 'X'],
  ['github_url', 'GitHub'],
  ['medium_url', 'Medium'],
  ['substack_url', 'Substack'],
  ['dribbble_url', 'Dribbble'],
];

const LogCard = ({
  log,
  productName,
  isVerified,
}: {
  log: PortfolioLog;
  productName: string | null;
  isVerified: boolean;
}) => (
  <div className="group relative overflow-hidden rounded-xl border border-divider bg-white shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)] transition-all duration-300 hover:border-impact/40">
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink">
            {formatDate(log.date)}
          </span>
          {productName && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink">
              {productName}
            </span>
          )}
          {isVerified && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-sage-green/10 text-sage-green border border-sage-green/30">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verified
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg leading-tight text-primary">{log.title}</h3>
      </div>

      {log.description && (
        <p className="text-sm text-secondary leading-relaxed">{log.description}</p>
      )}
      {log.change_description && (
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted uppercase tracking-wide">The change</h4>
          <p className="text-sm text-secondary leading-relaxed">{log.change_description}</p>
        </div>
      )}

      {log.metrics && log.metrics.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {log.metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col px-3.5 py-2.5 rounded-lg border bg-emerald-500/5 border-emerald-500/20"
            >
              <span className="text-xs font-medium text-muted">{metric.name}</span>
              <span className="text-sm font-semibold text-primary">{metric.change}</span>
            </div>
          ))}
        </div>
      )}

      {log.tags && log.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-divider/50">
          {log.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-impact/10 text-impact font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const PortfolioPage = ({
  portfolio,
  canonicalUrl,
}: {
  portfolio: Portfolio;
  canonicalUrl: string;
}) => {
  const { profile, logs, products, verifiedLogIds } = portfolio;
  const name = displayName(profile);
  const groupedLogs = groupByQuarter(logs);
  const productById = new Map(products.map((p) => [p.id, p] as [string, PortfolioProduct]));
  const socials = SOCIAL_LABELS.filter(([field]) => profile[field]);

  return (
    <div className="max-w-5xl mx-auto px-8 md:px-12 pt-28 pb-24">
      {/* Profile header */}
      <header className="mb-12">
        <div className="flex items-start gap-6">
          {profile.avatar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border border-divider"
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-serif font-semibold text-primary">{name}</h1>
            <p className="text-lg text-secondary mt-1">{profile.title || 'Product Manager'}</p>
            <div className="flex items-center gap-2 flex-wrap mt-3">
              {verifiedLogIds.size > 0 && (
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-sage-green/10 text-sage-green border border-sage-green/30">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {verifiedLogIds.size} verified {verifiedLogIds.size === 1 ? 'log' : 'logs'}
                </span>
              )}
              {socials.map(([field, label]) => (
                <a
                  key={field}
                  href={profile[field] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink text-secondary hover:border-impact/40 transition-colors"
                >
                  {label}
                </a>
              ))}
              <CopyLinkButton url={canonicalUrl} />
            </div>
          </div>
        </div>
        {profile.bio && (
          <p className="text-secondary leading-relaxed mt-6 max-w-3xl">{profile.bio}</p>
        )}
      </header>

      {/* Products */}
      {products.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-serif font-semibold text-primary mb-4">Products</h2>
          <div className="flex flex-wrap gap-3">
            {products.map((product) => {
              const content = (
                <>
                  <span className="text-sm font-medium text-primary">{product.name}</span>
                  {product.type && <span className="text-xs text-muted">{product.type}</span>}
                </>
              );
              const className =
                'flex flex-col gap-0.5 px-4 py-3 rounded-lg border border-divider bg-white shadow-sm';
              return product.url ? (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} hover:border-impact/40 transition-colors`}
                >
                  {content}
                </a>
              ) : (
                <div key={product.id} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Impact log timeline */}
      <section>
        <h2 className="text-xl font-serif font-semibold text-primary mb-6">Impact log</h2>
        {logs.length === 0 ? (
          <p className="text-muted">No public logs yet.</p>
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gradient-to-b from-impact via-impact/50 to-impact/10" />
            <div className="space-y-6">
              {groupedLogs.map(([quarter, quarterLogs]) => (
                <div key={quarter} className="space-y-4">
                  <div className="relative pl-12">
                    <span className="inline-flex items-center rounded-md border border-impact/30 bg-white px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
                      {quarter}
                    </span>
                  </div>
                  {quarterLogs.map((log) => (
                    <div key={log.id} className="relative pl-12">
                      <div className="absolute left-2 top-8 w-5 h-5 rounded-full border-2 border-impact bg-ink flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-impact" />
                      </div>
                      <div className="absolute left-7 top-10 w-5 h-0.5 bg-impact/50" />
                      <LogCard
                        log={log}
                        productName={log.product_id ? productById.get(log.product_id)?.name ?? null : null}
                        isVerified={verifiedLogIds.has(log.id)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-secondary mb-6">Build your own PM portfolio</p>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="inline-block bg-impact hover:opacity-90 text-white px-8 py-4 rounded font-medium text-lg transition-all"
        >
          Start logging
        </a>
        <p className="text-muted text-sm mt-4">Free to start. No credit card required.</p>
      </div>
    </div>
  );
};
