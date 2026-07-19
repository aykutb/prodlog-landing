// Constants and pure formatting helpers for the evidence bento cards,
// mirrored from the dashboard app (prodlog2 src/types/{skills,domains,
// impact,kills}.ts) so the public page renders the exact copy the owner saw.

// ─── Skills Matrix ───────────────────────────────────────────────────

export const SKILL_CATEGORIES = [
  'Discovery & Research',
  'Strategy & Vision',
  'Execution & Delivery',
  'Data & Analytics',
  'Craft & Design',
  'Influence & Communication',
  'Domain & Technical',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];
export type SkillLevel = 1 | 2 | 3 | 4;

// Four named levels, no neutral middle. The raw number is never rendered.
const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  1: 'Familiar',
  2: 'Capable',
  3: 'Strong',
  4: 'Defining',
};

export const getSkillLevelLabel = (level: SkillLevel): string =>
  SKILL_LEVEL_LABELS[level] ?? '';

export const MIN_PUBLIC_SKILLS = 3; // below this the card hides from the public portfolio

// ─── Domain Expertise ────────────────────────────────────────────────

export type DomainDepth = 'worked_in' | 'know_it' | 'expert';

const DOMAIN_DEPTH_LABELS: Record<DomainDepth, string> = {
  worked_in: 'Worked in it',
  know_it: 'Know it well',
  expert: 'Expert',
};

export const getDomainDepthLabel = (depth: DomainDepth): string =>
  DOMAIN_DEPTH_LABELS[depth] ?? '';

// ─── Impact Metric ───────────────────────────────────────────────────

export type MetricUnit = 'percent' | 'absolute' | 'currency' | 'duration' | 'multiple';
export type MetricDirection = 'up' | 'down';
export type MetricRole = 'owned' | 'drove' | 'contributed' | 'influenced';

const METRIC_ROLE_LABELS: Record<MetricRole, string> = {
  owned: 'I owned it',
  drove: 'I drove it',
  contributed: 'I contributed',
  influenced: 'I influenced it',
};

export const getMetricRoleLabel = (role: MetricRole): string =>
  METRIC_ROLE_LABELS[role] ?? '';

export interface FormattedMetricValue {
  prefix?: string;
  main: string;
  suffix?: string;
}

// Trim to at most one decimal place, dropping a trailing ".0".
const trimDecimal = (n: number): string => {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

// Compact large magnitudes (10k+) as 12K / 2.4M / 1.3B; smaller values keep
// grouped digits (1,200). Sign is carried by the direction arrow.
const compactMagnitude = (value: number): { main: string; suffix?: string } => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return { main: trimDecimal(abs / 1_000_000_000), suffix: 'B' };
  if (abs >= 1_000_000) return { main: trimDecimal(abs / 1_000_000), suffix: 'M' };
  if (abs >= 10_000) return { main: trimDecimal(abs / 1_000), suffix: 'K' };
  return { main: abs.toLocaleString('en-US', { maximumFractionDigits: 2 }) };
};

export const formatMetricValue = (value: number, unit: MetricUnit): FormattedMetricValue => {
  switch (unit) {
    case 'percent':
      return { main: Math.abs(value).toLocaleString('en-US', { maximumFractionDigits: 1 }), suffix: '%' };
    case 'currency': {
      const { main, suffix } = compactMagnitude(value);
      return { prefix: '$', main, suffix };
    }
    case 'multiple':
      return { main: Math.abs(value).toLocaleString('en-US', { maximumFractionDigits: 2 }), suffix: '×' };
    case 'duration':
    case 'absolute':
    default:
      return compactMagnitude(value);
  }
};

export const formatMetricString = (value: number, unit: MetricUnit): string => {
  const { prefix, main, suffix } = formatMetricValue(value, unit);
  return `${prefix ?? ''}${main}${suffix ?? ''}`;
};

// ─── Decision ────────────────────────────────────────────────────────

export type AgedVerdict = 'too_early' | 'right_call' | 'wrong_call';

export const AGED_CHIP_LABELS: Record<AgedVerdict, string> = {
  too_early: 'Too early to tell',
  right_call: 'Right call',
  wrong_call: 'Wrong call',
};

// ─── Kill ────────────────────────────────────────────────────────────

export type KillStage = 'idea' | 'in_progress' | 'shipped';

const KILL_STAGE_CHIPS: Record<KillStage, string> = {
  idea: 'Killed as an idea',
  in_progress: 'Killed in progress',
  shipped: 'Killed after shipping',
};

export const getKillStageChip = (stage: KillStage): string =>
  KILL_STAGE_CHIPS[stage] ?? '';

// ─── Now card stamp ──────────────────────────────────────────────────

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Mirrors the dashboard's stamp: fuzzy time up to 60 days, then an absolute
 *  month so a stale Now card looks stale instead of being flattered. */
export function formatUpdatedStamp(updatedAt: string): string {
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));

  if (days > 60) {
    const month = MONTHS_LONG[date.getMonth()];
    return date.getFullYear() === now.getFullYear()
      ? `Updated in ${month}`
      : `Updated in ${month} ${date.getFullYear()}`;
  }
  if (days <= 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 7) return `Updated ${days} days ago`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return `Updated ${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }
  const months = Math.round(days / 30);
  return `Updated ${months} month${months === 1 ? '' : 's'} ago`;
}

// ─── Portfolio images (Before / After) ───────────────────────────────

/** Public URL for an object in the portfolio-images bucket. */
export function portfolioImageUrl(path: string): string | null {
  const base = process.env.SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/portfolio-images/${path}`;
}
