import React from 'react';
import type {
  BentoCardConfig,
  Portfolio,
  PortfolioBeforeAfter,
  PortfolioDecision,
  PortfolioDomain,
  PortfolioImpactMetric,
  PortfolioKill,
  PortfolioLog,
  PortfolioProduct,
  PortfolioTestimonial,
  PortfolioTradeoff,
  PortfolioWriting,
} from '@/src/lib/portfolio/data';
import { formatMonthYear, formatShortDate, getFaviconUrl } from '@/src/lib/portfolio/bento';
import {
  AGED_CHIP_LABELS,
  SKILL_CATEGORIES,
  formatMetricString,
  formatMetricValue,
  formatUpdatedStamp,
  getDomainDepthLabel,
  getKillStageChip,
  getMetricRoleLabel,
  getSkillLevelLabel,
  portfolioImageUrl,
} from '@/src/lib/portfolio/evidence';
import { resolveEmbed, safeLinkParts } from '@/src/lib/portfolio/embed';
import { InlineReveal } from './InlineReveal';
import { WritingCover } from './WritingCover';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BadgeCheckIcon,
  CheckIcon,
  CornerDownRightIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LockIcon,
  PackageIcon,
  PenLineIcon,
} from './icons';

// Read-only, server-rendered versions of the dashboard's evidence bento
// cards (prodlog2 src/components/bento/cards). Same palette mapping as
// BentoCards.tsx: foreground→primary, muted-foreground→muted,
// border→divider, accent→impact, muted fills→charcoal.

type Size = BentoCardConfig['size'];

// ─── shared bits ─────────────────────────────────────────────────────

const EYEBROW_SIZES: Record<Size, { px: number; box: string; pkg: string; text: string }> = {
  S: { px: 20, box: 'w-5 h-5', pkg: 'w-3 h-3', text: 'text-sm' },
  M: { px: 22, box: 'w-[22px] h-[22px]', pkg: 'w-3.5 h-3.5', text: 'text-sm' },
  L: { px: 32, box: 'w-8 h-8', pkg: 'w-4 h-4', text: 'text-lg' },
};

const ProductEyebrow = ({ product, size }: { product: PortfolioProduct; size: Size }) => {
  const s = EYEBROW_SIZES[size];
  const favicon = getFaviconUrl(product.url, s.px);
  return (
    <div className="flex items-center gap-2 min-w-0">
      {favicon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={favicon} alt="" className={`${s.box} rounded-md shrink-0 object-contain`} />
      ) : (
        <div className={`${s.box} rounded-md bg-charcoal/50 flex items-center justify-center shrink-0`}>
          <PackageIcon className={`${s.pkg} text-muted`} />
        </div>
      )}
      <span className={`${s.text} font-medium text-primary/80 truncate`}>{product.name}</span>
    </div>
  );
};

// Quiet verification mark — never a loud badge.
const VerifiedMark = ({ count, withLabel }: { count: number; withLabel?: boolean }) => (
  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
    <CheckIcon className="w-3.5 h-3.5 text-primary shrink-0" />
    {withLabel ? (count > 1 ? `Verified by ${count}` : 'Verified') : count}
  </span>
);

const Chip = ({ children, heavy }: { children: React.ReactNode; heavy?: boolean }) => (
  <span
    className={`rounded-full bg-charcoal/50 px-2 py-0.5 text-[11px] whitespace-nowrap ${
      heavy ? 'font-semibold text-primary' : 'font-medium text-muted'
    }`}
  >
    {children}
  </span>
);

const LinkedLogLine = ({ log }: { log: PortfolioLog }) => (
  <div className="flex items-center gap-1.5 text-xs text-muted/80 min-w-0">
    <FileTextIcon className="w-3.5 h-3.5 shrink-0" />
    <span className="truncate">{log.title}</span>
  </div>
);

// ─── now ─────────────────────────────────────────────────────────────

export const NowCard = ({ card, size }: { card: BentoCardConfig; size: Size }) => (
  <div className="p-4 h-full flex flex-col relative">
    <h3 className="text-sm font-serif font-medium text-muted mb-2">Now</h3>
    <p className={`text-primary text-sm ${size === 'S' ? 'sm:line-clamp-2' : 'sm:line-clamp-3'}`}>
      {card.nowText?.trim()}
    </p>
    {card.nowUpdatedAt && (
      <div className="mt-auto pt-2">
        <p className="text-xs text-muted">{formatUpdatedStamp(card.nowUpdatedAt)}</p>
      </div>
    )}
  </div>
);

// ─── skills_matrix ───────────────────────────────────────────────────

const SkillSegments = ({ level }: { level: number }) => (
  <span className="inline-flex items-center gap-0.5" aria-hidden="true">
    {[1, 2, 3, 4].map((step) => (
      <span
        key={step}
        className={`h-1.5 w-3 rounded-sm ${step <= level ? 'bg-primary' : 'border border-divider'}`}
      />
    ))}
  </span>
);

const SkillRow = ({
  skill,
  count,
}: {
  skill: Portfolio['skills'][number];
  count: number;
}) => {
  const label = getSkillLevelLabel(skill.level);
  const verified = count > 0;
  return (
    <li
      aria-label={`${skill.name}, ${label}${verified ? `, verified by ${count} collaborator${count === 1 ? '' : 's'}` : ''}`}
      className="flex items-center gap-2 min-w-0"
    >
      <span className={`text-sm truncate ${verified ? 'font-medium text-primary' : 'text-primary'}`}>
        {skill.name}
      </span>
      <SkillSegments level={skill.level} />
      <span className="text-xs text-muted whitespace-nowrap">{label}</span>
      {verified && (
        <span className="ml-auto shrink-0">
          <VerifiedMark count={count} />
        </span>
      )}
    </li>
  );
};

export const SkillsMatrixCard = ({ portfolio, size }: { portfolio: Portfolio; size: Size }) => {
  const { skills, skillVerificationCounts: counts } = portfolio;

  if (size === 'L') {
    const groups = SKILL_CATEGORIES.map((category) => ({
      category,
      items: skills.filter((s) => s.category === category),
    })).filter((g) => g.items.length > 0);

    return (
      <div className="p-5 h-full flex flex-col overflow-hidden">
        <h3 className="text-sm font-serif font-medium text-muted mb-2 shrink-0">Skills</h3>
        <div className="flex-1 min-h-0 overflow-hidden space-y-2.5">
          {groups.map((group) => (
            <section key={group.category}>
              <h4 className="text-[11px] uppercase tracking-wide text-muted/70 mb-1">{group.category}</h4>
              <ul className="space-y-1">
                {group.items.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} count={counts[skill.id] ?? 0} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // M: top 6 by verification count desc, then level desc, then owner order
  const top = [...skills]
    .sort(
      (a, b) =>
        (counts[b.id] ?? 0) - (counts[a.id] ?? 0) || b.level - a.level || a.sort_order - b.sort_order,
    )
    .slice(0, 6);
  const remaining = skills.length - top.length;

  return (
    <div className="px-4 py-3 h-full flex flex-col overflow-hidden">
      <h3 className="text-sm font-serif font-medium text-muted mb-1.5 shrink-0">Skills</h3>
      <ul className="flex-1 min-h-0 overflow-hidden space-y-1">
        {top.map((skill) => (
          <SkillRow key={skill.id} skill={skill} count={counts[skill.id] ?? 0} />
        ))}
      </ul>
      {remaining > 0 && <p className="text-[11px] text-muted/70 shrink-0 mt-1">+{remaining} more</p>}
    </div>
  );
};

// ─── domain_expertise ────────────────────────────────────────────────

export const DomainExpertiseCard = ({
  domains,
  size,
}: {
  domains: PortfolioDomain[];
  size: Size;
}) => {
  if (size === 'S') {
    return (
      <div className="p-4 h-full flex flex-col overflow-hidden">
        <h3 className="text-sm font-serif font-medium text-muted mb-2 shrink-0">Domains</h3>
        <div className="flex flex-wrap gap-1.5 content-start overflow-hidden">
          {domains.slice(0, 4).map((domain) => (
            <span
              key={domain.id}
              className="rounded-full bg-charcoal/50 px-2 py-0.5 text-xs font-medium text-primary whitespace-nowrap"
            >
              {domain.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 h-full flex flex-col overflow-hidden">
      <h3 className="text-sm font-serif font-medium text-muted mb-1.5 shrink-0">Domain Expertise</h3>
      <ul className="flex-1 min-h-0 overflow-hidden space-y-1">
        {domains.map((domain) => {
          const label = getDomainDepthLabel(domain.depth);
          return (
            <li
              key={domain.id}
              aria-label={`${domain.name}, ${label}, ${domain.years} year${domain.years === 1 ? '' : 's'}`}
              className="flex items-baseline min-w-0 leading-snug"
            >
              <span className="text-sm font-medium text-primary truncate">{domain.name}</span>
              <span className="text-xs text-muted shrink-0 whitespace-nowrap">
                {' · '}
                {label} · {domain.years} yr{domain.years === 1 ? '' : 's'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ─── impact_metric ───────────────────────────────────────────────────

const numberSizeClass: Record<Size, string> = {
  S: 'text-4xl',
  M: 'text-5xl',
  L: 'text-6xl',
};

const MetricNumber = ({
  metric,
  size,
  verified,
}: {
  metric: PortfolioImpactMetric;
  size: Size;
  verified: boolean;
}) => {
  const { prefix, main, suffix } = formatMetricValue(metric.value, metric.unit);
  const Arrow = metric.direction === 'down' ? ArrowDownIcon : ArrowUpIcon;
  return (
    <div
      className={`flex items-center leading-none tabular-nums tracking-tight text-primary shrink-0 ${
        verified ? 'font-semibold' : 'font-medium'
      } ${numberSizeClass[size]}`}
    >
      {prefix && <span className="text-[0.42em] text-muted mr-[0.06em]">{prefix}</span>}
      <span>{main}</span>
      {suffix && <span className="text-[0.42em] text-muted ml-[0.08em]">{suffix}</span>}
      <Arrow className="w-[0.4em] h-[0.4em] text-muted ml-[0.12em] shrink-0" />
    </div>
  );
};

const MetricBeforeAfterLine = ({ metric, size }: { metric: PortfolioImpactMetric; size: Size }) => {
  const hasBeforeAfter = metric.before_value != null && metric.after_value != null;
  if (!hasBeforeAfter && !metric.timeframe) return null;
  return (
    <div className={`flex items-center gap-1.5 min-w-0 shrink-0 ${size === 'L' ? 'text-sm' : 'text-xs'}`}>
      {hasBeforeAfter && (
        <span className="inline-flex items-center gap-1 tabular-nums shrink-0">
          <span className="text-muted">{formatMetricString(metric.before_value as number, metric.unit)}</span>
          <ArrowRightIcon className="w-3 h-3 text-muted/70 shrink-0" />
          <span className="text-primary font-medium">{formatMetricString(metric.after_value as number, metric.unit)}</span>
        </span>
      )}
      {hasBeforeAfter && metric.timeframe && <span className="text-muted/50 shrink-0">·</span>}
      {metric.timeframe && <span className="text-muted truncate">{metric.timeframe}</span>}
    </div>
  );
};

export const ImpactMetricCard = ({
  metric,
  portfolio,
  size,
}: {
  metric: PortfolioImpactMetric;
  portfolio: Portfolio;
  size: Size;
}) => {
  const product = portfolio.products.find((p) => p.id === metric.product_id);
  if (!product) return null;
  const count = portfolio.impactMetricVerificationCounts[metric.id] ?? 0;
  const verified = count > 0;
  const log = metric.log_id ? portfolio.logs.find((l) => l.id === metric.log_id) ?? null : null;
  const measureClass = `leading-snug ${size === 'L' ? 'text-base' : 'text-sm'} ${verified ? 'text-primary' : 'text-muted'}`;

  if (size === 'M') {
    return (
      <div className="h-full flex flex-col overflow-hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <ProductEyebrow product={product} size="M" />
          <div className="flex items-center gap-2 shrink-0">
            <Chip>{getMetricRoleLabel(metric.role)}</Chip>
            {verified && <VerifiedMark count={count} />}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 min-h-0">
          <MetricNumber metric={metric} size="M" verified={verified} />
          <div className="min-w-0">
            <p className={`${measureClass} sm:line-clamp-2`}>{metric.measure}</p>
            <div className="mt-0.5">
              <MetricBeforeAfterLine metric={metric} size="M" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (size === 'S') {
    return (
      <div className="h-full flex flex-col overflow-hidden p-4">
        <ProductEyebrow product={product} size="S" />
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <MetricNumber metric={metric} size="S" verified={verified} />
          <p className={`${measureClass} sm:line-clamp-2 mt-1`}>{metric.measure}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden p-5">
      <div className="flex items-center justify-between gap-2">
        <ProductEyebrow product={product} size="L" />
        {verified && <VerifiedMark count={count} withLabel />}
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <MetricNumber metric={metric} size="L" verified={verified} />
        <p className={`${measureClass} mt-2`}>{metric.measure}</p>
        <div className="mt-1.5">
          <MetricBeforeAfterLine metric={metric} size="L" />
        </div>
      </div>
      <div className="border-t border-divider pt-2.5 space-y-1.5">
        <span className="block text-sm font-medium text-primary">{getMetricRoleLabel(metric.role)}</span>
        {metric.confound && (
          <p className="text-sm text-muted sm:line-clamp-2">
            <span className="text-[11px] uppercase tracking-wide text-muted/70 mr-1.5">Not mine</span>
            {metric.confound}
          </p>
        )}
        {log && <LinkedLogLine log={log} />}
      </div>
    </div>
  );
};

// ─── decision ────────────────────────────────────────────────────────

const InsteadOf = ({ alternative, className }: { alternative: string; className?: string }) => (
  <p className={`text-muted ${className ?? ''}`}>
    <span>instead of </span>
    <span className="line-through decoration-muted/60">{alternative}</span>
  </p>
);

export const DecisionCard = ({
  decision,
  portfolio,
  size,
}: {
  decision: PortfolioDecision;
  portfolio: Portfolio;
  size: Size;
}) => {
  const product = portfolio.products.find((p) => p.id === decision.product_id);
  if (!product) return null;
  const count = portfolio.decisionVerificationCounts[decision.id] ?? 0;
  const verified = count > 0;
  const log = decision.log_id ? portfolio.logs.find((l) => l.id === decision.log_id) ?? null : null;

  if (size === 'M') {
    return (
      <div className="h-full flex flex-col overflow-hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <ProductEyebrow product={product} size="M" />
          <div className="flex items-center gap-2 shrink-0">
            {decision.aged && <Chip heavy={decision.aged === 'wrong_call'}>{AGED_CHIP_LABELS[decision.aged]}</Chip>}
            {verified && <VerifiedMark count={count} />}
          </div>
        </div>
        <InlineReveal
          showLabel="Why, and what it cost"
          hideLabel="The call"
          face={
            <>
              <p className="text-sm font-semibold text-primary leading-snug line-clamp-2">{decision.decision}</p>
              <InsteadOf alternative={decision.alternative} className="text-xs mt-0.5 line-clamp-1" />
            </>
          }
          reveal={
            <div className="space-y-1">
              <p className="text-sm text-primary line-clamp-2">{decision.why}</p>
              <p className="text-xs text-muted line-clamp-2">
                <span className="text-[11px] uppercase tracking-wide text-muted/70 mr-1.5">What it cost</span>
                {decision.cost}
              </p>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden p-5">
      <div className="flex items-center justify-between gap-2">
        <ProductEyebrow product={product} size="L" />
        {verified && <VerifiedMark count={count} withLabel />}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden pt-3">
        <p className="text-lg font-semibold text-primary leading-snug sm:line-clamp-2">{decision.decision}</p>
        <InsteadOf alternative={decision.alternative} className="text-sm mt-1 sm:line-clamp-2" />
        <p className="text-sm text-primary/80 mt-2.5 sm:line-clamp-2">{decision.why}</p>
      </div>
      <div className="border-t border-divider pt-2.5 space-y-1.5">
        <p className="text-sm text-muted sm:line-clamp-2">
          <span className="text-[11px] uppercase tracking-wide text-muted/70 mr-1.5">What it cost</span>
          {decision.cost}
        </p>
        {(decision.aged || log) && (
          <div className="flex items-center justify-between gap-2 min-w-0">
            {decision.aged ? (
              <Chip heavy={decision.aged === 'wrong_call'}>{AGED_CHIP_LABELS[decision.aged]}</Chip>
            ) : (
              <span />
            )}
            {log && <LinkedLogLine log={log} />}
          </div>
        )}
        {decision.aged && decision.aged_note && (
          <p className="text-sm text-muted sm:line-clamp-1">{decision.aged_note}</p>
        )}
      </div>
    </div>
  );
};

// ─── tradeoff ────────────────────────────────────────────────────────

const ChoseOver = ({ tradeoff, size }: { tradeoff: PortfolioTradeoff; size: Size }) => (
  <div>
    <p className="text-sm font-semibold text-primary leading-snug sm:line-clamp-2">{tradeoff.chose}</p>
    <p className={`text-muted mt-0.5 text-xs ${size === 'S' ? 'sm:line-clamp-2' : 'sm:line-clamp-1'}`}>
      <span>over </span>
      <span className="line-through decoration-muted/60">{tradeoff.over}</span>
    </p>
  </div>
);

export const TradeoffCard = ({
  tradeoff,
  portfolio,
  size,
}: {
  tradeoff: PortfolioTradeoff;
  portfolio: Portfolio;
  size: Size;
}) => {
  const product = portfolio.products.find((p) => p.id === tradeoff.product_id);
  if (!product) return null;
  const count = portfolio.tradeoffVerificationCounts[tradeoff.id] ?? 0;
  const verified = count > 0;

  if (size === 'S') {
    return (
      <div className="h-full flex flex-col overflow-hidden p-4">
        <div className="flex items-center justify-between gap-2">
          <ProductEyebrow product={product} size="S" />
          {verified && <VerifiedMark count={count} />}
        </div>
        <InlineReveal
          showLabel="Why"
          hideLabel="The choice"
          face={<ChoseOver tradeoff={tradeoff} size="S" />}
          reveal={<p className="text-xs text-primary line-clamp-4">{tradeoff.because}</p>}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <ProductEyebrow product={product} size="M" />
        <div className="flex items-center gap-2 shrink-0">
          {tradeoff.context && <Chip>{tradeoff.context}</Chip>}
          {verified && <VerifiedMark count={count} />}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <ChoseOver tradeoff={tradeoff} size="M" />
        <p className="text-xs text-muted mt-1.5 sm:line-clamp-2">{tradeoff.because}</p>
      </div>
    </div>
  );
};

// ─── kill ────────────────────────────────────────────────────────────

const FreedLine = ({ freed, size, className }: { freed: string; size: Size; className?: string }) => (
  <p className={`flex items-start gap-1.5 min-w-0 ${size === 'L' ? 'text-sm' : 'text-xs'} ${className ?? ''}`}>
    <CornerDownRightIcon
      className={`shrink-0 text-muted ${size === 'L' ? 'w-4 h-4 mt-0.5' : 'w-3.5 h-3.5'}`}
    />
    <span className="min-w-0 sm:line-clamp-2">
      <span className="text-muted">freed </span>
      <span className="font-medium text-primary">{freed}</span>
    </span>
  </p>
);

export const KillCard = ({
  kill,
  portfolio,
  size,
}: {
  kill: PortfolioKill;
  portfolio: Portfolio;
  size: Size;
}) => {
  const product = kill.product_id
    ? portfolio.products.find((p) => p.id === kill.product_id) ?? null
    : null;
  const count = portfolio.killVerificationCounts[kill.id] ?? 0;
  const verified = count > 0;
  const log = kill.log_id ? portfolio.logs.find((l) => l.id === kill.log_id) ?? null : null;

  if (size === 'M') {
    const headerLeft = product ? (
      <ProductEyebrow product={product} size="M" />
    ) : kill.stage ? (
      <Chip>{getKillStageChip(kill.stage)}</Chip>
    ) : null;
    const hasHeader = headerLeft != null || verified || kill.stage != null;

    return (
      <div className="h-full flex flex-col overflow-hidden px-4 py-3">
        {hasHeader && (
          <div className="flex items-center justify-between gap-3">
            {headerLeft ?? <span />}
            <div className="flex items-center gap-2 shrink-0">
              {product && kill.stage && <Chip>{getKillStageChip(kill.stage)}</Chip>}
              {verified && <VerifiedMark count={count} />}
            </div>
          </div>
        )}
        <InlineReveal
          showLabel="Why"
          hideLabel="The kill"
          face={
            <>
              <p className="text-sm font-semibold text-primary leading-snug line-clamp-2">{kill.killed}</p>
              <FreedLine freed={kill.freed} size="M" className="mt-1" />
            </>
          }
          reveal={<p className="text-sm text-primary line-clamp-3">{kill.why}</p>}
        />
      </div>
    );
  }

  const metadata = [
    kill.stage ? getKillStageChip(kill.stage) : null,
    kill.killed_on ? formatMonthYear(kill.killed_on) : null,
  ].filter(Boolean);

  return (
    <div className="h-full flex flex-col overflow-hidden p-5">
      {(product || verified) && (
        <div className="flex items-center justify-between gap-2">
          {product ? <ProductEyebrow product={product} size="L" /> : <span />}
          {verified && <VerifiedMark count={count} withLabel />}
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-hidden pt-3">
        <p className="text-lg font-semibold text-primary leading-snug sm:line-clamp-2">{kill.killed}</p>
        <FreedLine freed={kill.freed} size="L" className="mt-1.5" />
        <p className="text-sm text-primary/80 mt-2.5 sm:line-clamp-3">{kill.why}</p>
      </div>
      {(metadata.length > 0 || log) && (
        <div className="border-t border-divider pt-2.5 space-y-1.5">
          {metadata.length > 0 && <p className="text-xs text-muted">{metadata.join(' · ')}</p>}
          {log && <LinkedLogLine log={log} />}
        </div>
      )}
    </div>
  );
};

// ─── verified_testimonial ────────────────────────────────────────────

const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || '?';

export const TestimonialCard = ({
  testimonial,
  size,
}: {
  testimonial: PortfolioTestimonial;
  size: Size;
}) => {
  const isLarge = size === 'L';
  const meta = [testimonial.verifier_role, testimonial.verifier_company].filter(Boolean).join(' · ');

  return (
    <div
      className={`h-full flex flex-col overflow-hidden ${isLarge ? 'p-5' : 'px-4 py-3'}`}
      aria-label={`Testimonial from ${testimonial.verifier_name}, confirmed`}
    >
      {/* Accent-tinted verification badge */}
      <span className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-impact/10 px-2 py-0.5 text-impact">
        <BadgeCheckIcon className="w-3 h-3 shrink-0" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Verified testimonial</span>
      </span>

      {/* The quote is the hero: serif voice, larger than body text */}
      <blockquote
        className={`flex-1 min-h-0 overflow-hidden font-serif text-primary leading-snug ${
          // L never clamps — cardSpanClass gives the card extra grid rows to
          // fit the full quote. M stays the deliberately compact variant.
          isLarge ? 'mt-2.5 text-xl' : 'mt-2 text-base sm:line-clamp-2'
        }`}
      >
        “{testimonial.quote}”
      </blockquote>

      {/* Credential block under a hairline divider */}
      <div className={`shrink-0 border-t border-divider ${isLarge ? 'mt-3 pt-3' : 'mt-2 pt-2'}`}>
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`rounded-full bg-impact/10 flex items-center justify-center shrink-0 ${
                isLarge ? 'w-9 h-9' : 'w-8 h-8'
              }`}
            >
              <span className="text-xs font-medium text-impact">{initialsOf(testimonial.verifier_name)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary min-w-0 truncate">
                {testimonial.verifier_name}
                <CheckIcon className="inline w-3.5 h-3.5 ml-1 align-[-2px] text-primary" />
              </p>
              {meta && <p className="text-xs text-muted truncate">{meta}</p>}
            </div>
          </div>
          {testimonial.confirmed_at && (
            <div className="text-right shrink-0">
              <p className="text-xs text-muted">
                {testimonial.edited_by_verifier ? 'Edited & confirmed' : 'Confirmed'}
              </p>
              <p className="text-[11px] text-muted/70">{formatMonthYear(testimonial.confirmed_at)}</p>
            </div>
          )}
        </div>
        {isLarge && testimonial.relationship && (
          <p className="mt-1.5 text-xs text-muted sm:line-clamp-1">{testimonial.relationship}</p>
        )}
      </div>
    </div>
  );
};

// ─── before_after ────────────────────────────────────────────────────

const ImagePairCell = ({ path, label }: { path: string; label: string }) => {
  const src = portfolioImageUrl(path);
  return (
    <div className="relative overflow-hidden rounded-lg bg-charcoal/40 h-full">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <span className="absolute bottom-1.5 left-1.5 rounded-full border border-divider bg-white/85 px-2 py-0.5 text-[10px] font-medium text-primary">
        {label}
      </span>
    </div>
  );
};

export const BeforeAfterCard = ({
  beforeAfter,
  portfolio,
  size,
}: {
  beforeAfter: PortfolioBeforeAfter;
  portfolio: Portfolio;
  size: Size;
}) => {
  const product = portfolio.products.find((p) => p.id === beforeAfter.product_id);
  if (!product) return null;
  const isLarge = size === 'L';
  const beforeLabel = beforeAfter.before_label?.trim() || 'Before';
  const afterLabel = beforeAfter.after_label?.trim() || 'After';

  const header = (
    <div className="flex items-center justify-between gap-3">
      <ProductEyebrow product={product} size={isLarge ? 'L' : 'M'} />
      {beforeAfter.metric_delta && <Chip>{beforeAfter.metric_delta}</Chip>}
    </div>
  );

  const pair = (
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 h-full">
      <ImagePairCell path={beforeAfter.before_display_path} label={beforeLabel} />
      <ImagePairCell path={beforeAfter.after_display_path} label={afterLabel} />
    </div>
  );

  if (isLarge) {
    return (
      <div className="h-full flex flex-col overflow-hidden p-4 gap-2.5">
        {header}
        {pair}
        {beforeAfter.caption && (
          <p className="text-sm text-muted sm:line-clamp-2 shrink-0">{beforeAfter.caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden px-4 py-3 gap-2">
      {header}
      {beforeAfter.caption ? (
        <InlineReveal
          showLabel="What changed"
          hideLabel="The images"
          face={pair}
          reveal={<p className="text-sm text-primary line-clamp-3">{beforeAfter.caption}</p>}
        />
      ) : (
        pair
      )}
    </div>
  );
};

// ─── embed ───────────────────────────────────────────────────────────

export const EmbedCard = ({ card, size }: { card: BentoCardConfig; size: Size }) => {
  const url = card.embedUrl ?? '';
  // Re-resolve at render: rows are owner-writable, so the pure allowlist —
  // not the stored provider id — is the security boundary for the iframe src.
  const resolved = resolveEmbed(url);
  const linkParts = safeLinkParts(url);
  const isLarge = size === 'L';
  const providerName = resolved && resolved.provider !== 'link' ? resolved.provider.name : linkParts?.hostname;
  const title = card.embedTitle?.trim() || providerName || 'Embed';

  let body: React.ReactNode = null;
  if (resolved && resolved.provider !== 'link') {
    const provider = resolved.provider;
    body = (
      <div className="relative flex-1 min-h-0 flex flex-col">
        <div
          className={
            isLarge
              ? 'relative w-full max-h-full overflow-hidden rounded-lg bg-charcoal/40'
              : 'relative w-full h-full overflow-hidden rounded-lg bg-charcoal/40'
          }
          style={isLarge ? { aspectRatio: provider.aspectRatio } : undefined}
        >
          <iframe
            src={resolved.embedUrl}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy={provider.referrerPolicy ?? 'no-referrer'}
            loading="lazy"
            allow={provider.allow}
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        {isLarge && (
          <span className="absolute top-2 right-2 rounded-full border border-divider bg-white/85 px-2 py-0.5 text-[10px] font-medium text-primary pointer-events-none">
            {provider.name}
          </span>
        )}
      </div>
    );
  } else if (linkParts) {
    body = (
      <a
        href={linkParts.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col justify-center gap-1 flex-1 min-h-0 rounded-lg border border-divider p-3 hover:bg-charcoal/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ExternalLinkIcon className="w-4 h-4 text-muted shrink-0" />
          <span className="font-medium text-sm text-primary truncate">{title}</span>
        </div>
        <p className="text-xs text-muted truncate">{linkParts.hostname}</p>
        {isLarge && card.embedCaption && (
          <p className="text-xs text-muted line-clamp-2">{card.embedCaption}</p>
        )}
      </a>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col relative">
      <h3 className="text-sm font-serif font-medium text-muted mb-2 truncate">{title}</h3>
      {body}
      {isLarge && card.embedCaption?.trim() && resolved && resolved.provider !== 'link' && (
        <p className="text-xs text-muted mt-2 line-clamp-2">{card.embedCaption}</p>
      )}
    </div>
  );
};

// ─── writing ─────────────────────────────────────────────────────────

const writingHostname = (url: string | null): string | null => {
  if (!url) return null;
  const parts = safeLinkParts(url);
  return parts ? parts.hostname.replace(/^www\./, '') : null;
};

// Known publishing hosts → reader-facing platform names, so the meta row says
// "Substack" instead of "100p100d.substack.com". Mirrors the dashboard's
// WritingBentoCard mapping (prodlog2); dot-anchored suffix match.
const PLATFORM_NAMES: ReadonlyArray<readonly [suffix: string, name: string]> = [
  ['substack.com', 'Substack'],
  ['medium.com', 'Medium'],
  ['dev.to', 'DEV'],
  ['hashnode.dev', 'Hashnode'],
  ['notion.site', 'Notion'],
  ['linkedin.com', 'LinkedIn'],
  ['ghost.io', 'Ghost'],
  ['wordpress.com', 'WordPress'],
  ['beehiiv.com', 'beehiiv'],
  ['mirror.xyz', 'Mirror'],
  ['x.com', 'X'],
  ['twitter.com', 'X'],
  ['github.com', 'GitHub'],
  ['youtube.com', 'YouTube'],
];

const looksLikeHostname = (s: string): boolean => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(s);

const prettifyHost = (host: string): string => {
  for (const [suffix, name] of PLATFORM_NAMES) {
    if (host === suffix || host.endsWith(`.${suffix}`)) return name;
  }
  return host;
};

/** Platform name for the meta row. A hand-written publication wins as-is; a
 *  stored/derived hostname is mapped to its platform name when known. */
const platformLabel = (publication: string | null, url: string | null): string | null => {
  const stored = publication?.trim() || null;
  if (stored && !looksLikeHostname(stored)) return stored;
  const host = stored ?? writingHostname(url);
  return host ? prettifyHost(host) : null;
};

/** Meta row parts: platform · date · read time — only whatever is present. */
const writingMetaLine = (item: PortfolioWriting): string =>
  [
    platformLabel(item.publication, item.url),
    item.published_on ? formatShortDate(item.published_on) : null,
    item.read_time_minutes ? `${item.read_time_minutes} min read` : null,
  ]
    .filter(Boolean)
    .join(' · ');

const WritingInternalChip = () => (
  <span className="rounded-full bg-charcoal/50 px-1.5 py-0.5 text-[10px] font-medium text-muted whitespace-nowrap shrink-0 inline-flex items-center gap-1">
    <LockIcon className="w-2.5 h-2.5" />
    Internal
  </span>
);

/** Wraps a row in the external link (sanitized, new tab) when it has one;
 *  mentions stay deliberately inert — never styled as a broken link. */
const WritingRowShell = ({
  item,
  meta,
  children,
}: {
  item: PortfolioWriting;
  meta: string;
  children: React.ReactNode;
}) => {
  const linkParts = item.type === 'link' ? safeLinkParts(item.url ?? '') : null;
  if (linkParts) {
    return (
      <li className="min-w-0">
        <a
          href={linkParts.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block min-w-0 rounded-md hover:bg-charcoal/40 transition-colors -mx-1 px-1 py-1"
          aria-label={`${item.title}${meta ? `, ${meta}` : ''} (opens in a new tab)`}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li className="min-w-0 py-1" aria-label={`${item.title}${meta ? `, ${meta}` : ''}, internal`}>
      {children}
    </li>
  );
};

// Compact row (M): a glance — title + meta, no cover or excerpt.
const WritingRow = ({ item }: { item: PortfolioWriting }) => {
  const meta = writingMetaLine(item);
  const isLink = item.type === 'link' && safeLinkParts(item.url ?? '') != null;
  return (
    <WritingRowShell item={item} meta={meta}>
      <p className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm font-medium text-primary truncate">{item.title}</span>
        {isLink && <ExternalLinkIcon className="w-3 h-3 text-muted shrink-0 opacity-70" />}
        {item.type === 'mention' && <WritingInternalChip />}
      </p>
      {meta && <p className="text-xs text-muted truncate">{meta}</p>}
    </WritingRowShell>
  );
};

// Artifact row (L): cover + series + dominant title + excerpt + meta — the
// entry as a self-contained piece, not a bare link.
const WritingArtifactRow = ({ item }: { item: PortfolioWriting }) => {
  const meta = writingMetaLine(item);
  const isLink = item.type === 'link' && safeLinkParts(item.url ?? '') != null;
  return (
    <WritingRowShell item={item} meta={meta}>
      <div className="flex gap-3 min-w-0">
        <WritingCover coverImageUrl={item.cover_image_url} title={item.title} />
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {item.series_label && (
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted truncate">
              {item.series_label}
            </p>
          )}
          <p className="flex items-start gap-1.5 min-w-0">
            <span className="text-sm font-semibold text-primary line-clamp-2">{item.title}</span>
            {isLink && <ExternalLinkIcon className="w-3 h-3 mt-1 text-muted shrink-0 opacity-70" />}
            {item.type === 'mention' && <WritingInternalChip />}
          </p>
          {item.excerpt && <p className="text-xs text-muted line-clamp-2">{item.excerpt}</p>}
          {meta && <p className="text-[11px] text-muted/80 truncate">{meta}</p>}
          {item.note && <p className="text-xs text-muted/90 italic line-clamp-2">{item.note}</p>}
        </div>
      </div>
    </WritingRowShell>
  );
};

export const WritingCard = ({ writings, size }: { writings: PortfolioWriting[]; size: Size }) => {
  const isLarge = size === 'L';
  return (
    <div className={`h-full flex flex-col overflow-hidden ${isLarge ? 'p-5' : 'p-4'}`}>
      {/* Small uppercase tag — must not compete with the entry titles */}
      <p className="flex items-center gap-1.5 mb-2 shrink-0 text-muted">
        <PenLineIcon className="w-3 h-3" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Writing</span>
      </p>
      <ul
        className={`flex-1 min-h-0 ${isLarge ? 'overflow-y-auto pr-1 space-y-2' : 'overflow-hidden space-y-1.5'}`}
      >
        {writings.map((item) =>
          isLarge ? <WritingArtifactRow key={item.id} item={item} /> : <WritingRow key={item.id} item={item} />,
        )}
      </ul>
    </div>
  );
};
