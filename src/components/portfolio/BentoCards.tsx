import React from 'react';
import type {
  BentoCardConfig,
  Portfolio,
  PortfolioLog,
  PortfolioProduct,
} from '@/src/lib/portfolio/data';
import {
  SIZE_TO_GRID_SPAN,
  differenceInYears,
  formatDateRange,
  formatLongDate,
  formatMonthYear,
  formatShortDate,
  getFaviconUrl,
  getItemsPerPage,
  stripHtml,
  visibleCards,
} from '@/src/lib/portfolio/bento';
import { PaginatedCardPages } from './PaginatedCardPages';
import { ActivityGrid } from './ActivityGrid';
import {
  BeforeAfterCard,
  DecisionCard,
  DomainExpertiseCard,
  EmbedCard,
  ImpactMetricCard,
  KillCard,
  NowCard,
  SkillsMatrixCard,
  TestimonialCard,
  TradeoffCard,
  WritingCard,
} from './EvidenceCards';
import {
  Building2Icon,
  CalendarIcon,
  DribbbleIcon,
  FileTextIcon,
  GithubIcon,
  LinkedinIcon,
  MediumIcon,
  PackageIcon,
  SubstackIcon,
  TwitterIcon,
} from './icons';

// Read-only server-rendered versions of the dashboard's bento cards
// (prodlog2 src/components/bento). Visual parity via the shared palette:
// foreground→primary, muted-foreground→muted, border→divider, card→white,
// accent (deep ink blue)→impact, muted fills→charcoal.

const DASHBOARD_ORIGIN = 'https://dashboard.prodlog.app';

type Size = BentoCardConfig['size'];

const chunk = <T,>(items: T[], perPage: number): T[][] => {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += perPage) {
    pages.push(items.slice(i, i + perPage));
  }
  return pages;
};

const ProductFavicon = ({
  url,
  pixelSize,
  className,
  fallbackIconClass,
}: {
  url: string | null;
  pixelSize: number;
  className: string;
  fallbackIconClass: string;
}) => {
  const favicon = getFaviconUrl(url, pixelSize);
  if (favicon) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={favicon} alt="" className={`${className} shrink-0 object-contain`} />;
  }
  return (
    <div className={`${className} bg-charcoal/50 flex items-center justify-center shrink-0`}>
      <PackageIcon className={`${fallbackIconClass} text-muted`} />
    </div>
  );
};

// ─── profile ─────────────────────────────────────────────────────────

const ProfileCard = ({ bio, size }: { bio: string; size: Size }) => (
  <div className="p-4 h-full flex flex-col relative">
    <h3 className="text-sm font-serif font-medium text-muted mb-2">About</h3>
    <p className={`text-primary ${size === 'S' ? 'text-sm line-clamp-3' : size === 'M' ? 'line-clamp-4' : ''}`}>
      {bio}
    </p>
  </div>
);

// ─── stats ───────────────────────────────────────────────────────────

const StatsCard = ({ portfolio, size }: { portfolio: Portfolio; size: Size }) => {
  const { profile, logs, products } = portfolio;
  const yearsOfExperience = profile.career_start_date
    ? differenceInYears(new Date(profile.career_start_date))
    : null;

  const allStats = [
    { label: 'Years Exp', value: yearsOfExperience ?? '—' },
    { label: 'Products', value: products.length },
    { label: 'Impacts', value: logs.length },
    { label: 'Reflections', value: 0 },
  ];

  if (size === 'S') {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <p className="text-3xl font-semibold text-primary">{yearsOfExperience ?? '—'}</p>
        <p className="text-xs text-muted uppercase tracking-wide mt-1">Years Experience</p>
      </div>
    );
  }

  if (size === 'L') {
    return (
      <div className="p-6 h-full flex flex-col">
        <h3 className="text-sm font-serif font-medium text-muted mb-4">Stats</h3>
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {allStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center bg-charcoal/40 rounded-lg">
              <p className="text-4xl font-semibold text-primary">{stat.value}</p>
              <p className="text-sm text-muted uppercase tracking-wide mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-sm font-serif font-medium text-muted mb-3">Stats</h3>
      <div className="flex-1 grid grid-cols-4 gap-2 items-center">
        {allStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-semibold text-primary">{stat.value}</p>
            <p className="text-xs text-muted uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── social_links ────────────────────────────────────────────────────

const SocialLinksCard = ({ portfolio, size }: { portfolio: Portfolio; size: Size }) => {
  const { profile } = portfolio;
  const socialLinks = [
    { url: profile.twitter_url, icon: TwitterIcon, label: 'Twitter' },
    { url: profile.linkedin_url, icon: LinkedinIcon, label: 'LinkedIn' },
    { url: profile.github_url, icon: GithubIcon, label: 'GitHub' },
    { url: profile.dribbble_url, icon: DribbbleIcon, label: 'Dribbble' },
    { url: profile.substack_url, icon: SubstackIcon, label: 'Substack' },
    { url: profile.medium_url, icon: MediumIcon, label: 'Medium' },
  ];
  const activeLinks = socialLinks.filter((link) => link.url);

  const iconSize =
    size !== 'M'
      ? 'w-5 h-5'
      : activeLinks.length <= 2
        ? 'w-10 h-10'
        : activeLinks.length <= 4
          ? 'w-8 h-8'
          : 'w-6 h-6';

  return (
    <div className="p-4 h-full relative">
      <div className="flex flex-wrap items-center justify-center gap-5 h-full">
        {activeLinks.map((link) => (
          <a
            key={link.label}
            href={link.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
            title={link.label}
          >
            <link.icon className={iconSize} />
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── contribution ────────────────────────────────────────────────────

const ContributionCard = ({ logs }: { logs: PortfolioLog[] }) => {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 12);
  const yearCount = logs.filter((log) => new Date(log.date) >= cutoff).length;

  return (
    <div className="p-4 h-full flex flex-col overflow-hidden">
      <h3 className="text-sm font-serif font-medium text-muted mb-2 shrink-0">
        {yearCount} contribution{yearCount !== 1 ? 's' : ''} in the last year
      </h3>
      <ActivityGrid logDates={logs.map((log) => log.date)} />
    </div>
  );
};

// ─── single_product / all_products / product_list ────────────────────

const CompactProduct = ({ product }: { product: PortfolioProduct }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-charcoal/40">
    <ProductFavicon url={product.url} pixelSize={32} className="w-6 h-6 rounded" fallbackIconClass="w-3 h-3" />
    <span className="text-sm truncate flex-1">{product.name}</span>
  </div>
);

const DetailedProduct = ({ product }: { product: PortfolioProduct }) => {
  const dateRange = formatDateRange(product.start_date, product.end_date);
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-charcoal/40">
      <ProductFavicon url={product.url} pixelSize={48} className="w-12 h-12 rounded-lg" fallbackIconClass="w-6 h-6" />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{product.name}</p>
        {product.type && (
          <p className="text-xs text-muted flex items-center gap-1">
            <Building2Icon className="w-3 h-3" />
            {product.type}
          </p>
        )}
        {dateRange && (
          <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
            <CalendarIcon className="w-3 h-3" />
            {dateRange}
          </p>
        )}
      </div>
    </div>
  );
};

const ProductGridPage = ({ products }: { products: PortfolioProduct[] }) =>
  products.length < 4 ? (
    <div className="grid grid-cols-2 gap-3">
      {products.map((p) => (
        <DetailedProduct key={p.id} product={p} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-2">
      {products.map((p) => (
        <CompactProduct key={p.id} product={p} />
      ))}
    </div>
  );

const SingleProductCard = ({ product, size }: { product: PortfolioProduct; size: Size }) => {
  const iconSize = size === 'L' ? 'w-16 h-16' : size === 'M' ? 'w-12 h-12' : 'w-8 h-8';
  const packageIconSize = size === 'L' ? 'w-8 h-8' : size === 'M' ? 'w-6 h-6' : 'w-4 h-4';
  const faviconPixelSize = size === 'L' ? 64 : size === 'M' ? 48 : 32;
  const rounding = size === 'L' ? 'rounded-xl' : size === 'M' ? 'rounded-lg' : 'rounded-md';

  const externalLink = product.url && (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted hover:text-primary shrink-0"
      aria-label={`Visit ${product.name}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={size === 'L' ? 'w-5 h-5 mt-1' : 'w-4 h-4'} aria-hidden="true">
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  );

  if (size === 'L') {
    return (
      <div className="p-4 h-full flex flex-col relative">
        <div className="flex items-start gap-4 mb-4">
          <ProductFavicon url={product.url} pixelSize={faviconPixelSize} className={`${iconSize} ${rounding}`} fallbackIconClass={packageIconSize} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-serif font-semibold text-primary">{product.name}</h3>
              {externalLink}
            </div>
            {product.type && (
              <span className="inline-block text-sm text-muted bg-charcoal/50 px-2 py-0.5 rounded mt-1">
                {product.type}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-auto">
          {product.problem_definition && <p className="text-sm text-muted">{product.problem_definition}</p>}
          {product.business_model && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Building2Icon className="w-4 h-4 shrink-0" />
              <span>{product.business_model}</span>
            </div>
          )}
          {(product.start_date || product.end_date) && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span>
                {product.start_date && formatMonthYear(product.start_date)}
                {product.start_date && product.end_date && ' — '}
                {product.end_date ? formatMonthYear(product.end_date) : product.start_date ? 'Present' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (size === 'M') {
    return (
      <div className="p-4 h-full flex flex-col relative">
        <div className="flex gap-3 h-full">
          <div className="shrink-0">
            <ProductFavicon url={product.url} pixelSize={faviconPixelSize} className={`${iconSize} ${rounding}`} fallbackIconClass={packageIconSize} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif font-semibold text-primary truncate">{product.name}</h3>
              {externalLink}
            </div>
            {product.type && <span className="text-xs text-muted">{product.type}</span>}
            {product.problem_definition && (
              <p className="text-sm text-muted line-clamp-2 mt-1 flex-1">{product.problem_definition}</p>
            )}
            {product.business_model && <p className="text-xs text-muted/70 mt-auto">{product.business_model}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col relative">
      <div className="flex items-start gap-3">
        <ProductFavicon url={product.url} pixelSize={faviconPixelSize} className={`${iconSize} ${rounding}`} fallbackIconClass={packageIconSize} />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-primary truncate text-sm">{product.name}</h3>
          {product.type && <span className="text-xs text-muted">{product.type}</span>}
        </div>
      </div>
    </div>
  );
};

const ProductListCard = ({
  products,
  size,
  title,
}: {
  products: PortfolioProduct[];
  size: Size;
  title: string;
}) => {
  const pages = chunk(products, getItemsPerPage(size, 2)).map((pageItems, i) => (
    <ProductGridPage key={i} products={pageItems} />
  ));
  return (
    <div className="p-4 h-full flex flex-col relative">
      <h3 className="text-sm font-serif font-medium text-muted mb-3">{title}</h3>
      <PaginatedCardPages pages={pages} />
    </div>
  );
};

// ─── single_log / all_logs ───────────────────────────────────────────

const logPreview = (log: PortfolioLog): string => log.description || stripHtml(log.content);

/** Public logs with content are readable on the dashboard's log page. */
const logHref = (log: PortfolioLog): string | null =>
  log.content ? `${DASHBOARD_ORIGIN}/log/${log.id}` : null;

const SingleLogCard = ({ log, size }: { log: PortfolioLog; size: Size }) => {
  const previewText = logPreview(log);
  const iconContainerSize = size === 'L' ? 'w-16 h-16' : size === 'M' ? 'w-12 h-12' : 'w-8 h-8';
  const iconSize = size === 'L' ? 'w-8 h-8' : size === 'M' ? 'w-6 h-6' : 'w-4 h-4';

  const content = (
    <div className="p-4 h-full flex flex-col relative">
      {size === 'L' ? (
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className={`${iconContainerSize} rounded-xl bg-impact/10 flex items-center justify-center shrink-0`}>
              <FileTextIcon className={`${iconSize} text-impact`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif font-semibold text-primary">{log.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted mt-1">
                <CalendarIcon className="w-4 h-4" />
                {formatLongDate(log.date)}
              </div>
            </div>
          </div>
          {previewText && <p className="text-sm text-muted line-clamp-4 flex-1">{previewText}</p>}
        </div>
      ) : size === 'M' ? (
        <div className="flex gap-3 h-full">
          <div className={`${iconContainerSize} rounded-lg bg-impact/10 flex items-center justify-center shrink-0`}>
            <FileTextIcon className={`${iconSize} text-impact`} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="font-serif font-semibold text-primary line-clamp-2">{log.title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted mt-1">
              <CalendarIcon className="w-3 h-3" />
              {formatShortDate(log.date)}
            </div>
            {previewText && <p className="text-sm text-muted line-clamp-2 mt-1 flex-1">{previewText}</p>}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className={`${iconContainerSize} rounded-full bg-impact/10 flex items-center justify-center shrink-0`}>
            <FileTextIcon className={`${iconSize} text-impact`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-primary line-clamp-2 text-sm">{log.title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted mt-1">
              <CalendarIcon className="w-3 h-3" />
              {formatShortDate(log.date)}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const href = logHref(log);
  return href ? (
    <a href={href} rel="nofollow noopener" className="block h-full hover:bg-charcoal/40 transition-colors">
      {content}
    </a>
  ) : (
    content
  );
};

const AllLogsCard = ({ logs, size }: { logs: PortfolioLog[]; size: Size }) => {
  const pages = chunk(logs, getItemsPerPage(size, 1)).map((pageItems, i) => (
    <div key={i} className="space-y-2">
      {pageItems.map((log) => {
        const href = logHref(log);
        const row = (
          <>
            <FileTextIcon className="w-4 h-4 text-impact shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{log.title}</p>
              <p className="text-xs text-muted">{formatShortDate(log.date)}</p>
            </div>
          </>
        );
        const rowClass = 'flex items-start gap-2 p-2 rounded-lg bg-charcoal/40';
        return href ? (
          <a key={log.id} href={href} rel="nofollow noopener" className={`${rowClass} hover:bg-charcoal/60 transition-colors`}>
            {row}
          </a>
        ) : (
          <div key={log.id} className={rowClass}>
            {row}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-serif font-medium text-muted">Logs</h3>
      </div>
      <PaginatedCardPages pages={pages} />
    </div>
  );
};

// ─── grid ────────────────────────────────────────────────────────────

const renderCard = (card: BentoCardConfig, portfolio: Portfolio): React.ReactNode => {
  const { profile, logs, products } = portfolio;

  switch (card.type) {
    case 'profile':
      return <ProfileCard bio={profile.bio ?? ''} size={card.size} />;
    case 'stats':
      return <StatsCard portfolio={portfolio} size={card.size} />;
    case 'social_links':
      return <SocialLinksCard portfolio={portfolio} size={card.size} />;
    case 'contribution':
      return <ContributionCard logs={logs} />;
    case 'now':
      return <NowCard card={card} size={card.size} />;
    case 'skills_matrix':
      return <SkillsMatrixCard portfolio={portfolio} size={card.size} />;
    case 'domain_expertise':
      return <DomainExpertiseCard domains={portfolio.domains} size={card.size} />;
    case 'impact_metric': {
      const metric = portfolio.impactMetrics.find((m) => m.id === card.contentId);
      return metric ? <ImpactMetricCard metric={metric} portfolio={portfolio} size={card.size} /> : null;
    }
    case 'decision': {
      const decision = portfolio.decisions.find((d) => d.id === card.contentId);
      return decision ? <DecisionCard decision={decision} portfolio={portfolio} size={card.size} /> : null;
    }
    case 'tradeoff': {
      const tradeoff = portfolio.tradeoffs.find((t) => t.id === card.contentId);
      return tradeoff ? <TradeoffCard tradeoff={tradeoff} portfolio={portfolio} size={card.size} /> : null;
    }
    case 'kill': {
      const kill = portfolio.kills.find((k) => k.id === card.contentId);
      return kill ? <KillCard kill={kill} portfolio={portfolio} size={card.size} /> : null;
    }
    case 'verified_testimonial': {
      const testimonial = portfolio.testimonials.find((t) => t.id === card.contentId);
      return testimonial ? <TestimonialCard testimonial={testimonial} size={card.size} /> : null;
    }
    case 'before_after': {
      const beforeAfter = portfolio.beforeAfters.find((b) => b.id === card.contentId);
      return beforeAfter ? (
        <BeforeAfterCard beforeAfter={beforeAfter} portfolio={portfolio} size={card.size} />
      ) : null;
    }
    case 'writing':
      return <WritingCard writings={portfolio.writings} size={card.size} />;
    case 'embed':
      return <EmbedCard card={card} size={card.size} />;
    case 'single_product': {
      const product = products.find((p) => p.id === card.contentId);
      return product ? <SingleProductCard product={product} size={card.size} /> : null;
    }
    case 'all_products':
      return <ProductListCard products={products} size={card.size} title="Products" />;
    case 'product_list':
      return (
        <ProductListCard
          products={products.filter((p) => card.selectedProductIds?.includes(p.id))}
          size={card.size}
          title={card.customTitle || 'Product List'}
        />
      );
    case 'single_log': {
      const log = logs.find((l) => l.id === card.contentId);
      return log ? <SingleLogCard log={log} size={card.size} /> : null;
    }
    case 'all_logs':
      return <AllLogsCard logs={logs} size={card.size} />;
    default:
      return null;
  }
};

export const PortfolioBentoGrid = ({ portfolio }: { portfolio: Portfolio }) => {
  const cards = visibleCards(portfolio);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[140px]">
      {cards.map((card) => {
        const span = SIZE_TO_GRID_SPAN[card.size];
        return (
          <div
            key={card.id}
            style={{ gridColumn: `span ${span.colSpan}`, gridRow: `span ${span.rowSpan}` }}
            className="relative rounded-xl border border-divider bg-white overflow-hidden transition-all"
          >
            {renderCard(card, portfolio)}
          </div>
        );
      })}
    </div>
  );
};
