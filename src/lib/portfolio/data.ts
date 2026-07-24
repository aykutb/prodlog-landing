import { getSupabase } from './supabase';
import type {
  AgedVerdict,
  DomainDepth,
  KillStage,
  MetricDirection,
  MetricRole,
  MetricUnit,
  SkillCategory,
  SkillLevel,
} from './evidence';
import type { RichTextDoc } from './richText';

// Shapes mirror the dashboard app's Supabase tables (prodlog2), limited to
// the fields the public portfolio renders.

export interface PortfolioProfile {
  user_id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  dribbble_url: string | null;
  substack_url: string | null;
  medium_url: string | null;
  career_start_date: string | null;
}

export interface PortfolioMetric {
  name: string;
  change: string;
  status?: 'in_progress' | 'done';
}

export interface PortfolioLog {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  change_description: string | null;
  metrics: PortfolioMetric[] | null;
  date: string;
  quarter: string | null;
  tags: string[] | null;
  product_id: string | null;
}

export interface PortfolioProduct {
  id: string;
  name: string;
  type: string | null;
  url: string | null;
  business_model: string | null;
  problem_definition: string | null;
  start_date: string | null;
  end_date: string | null;
  /** User-uploaded icon; overrides the URL-derived favicon when present. */
  icon_url: string | null;
  screenshots: string[] | null;
}

// ─── Evidence card rows (all RLS-scoped to public profiles) ──────────

export interface PortfolioSkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  sort_order: number;
}

export interface PortfolioDomain {
  id: string;
  name: string;
  depth: DomainDepth;
  years: number;
  context: string | null;
  sort_order: number;
}

export interface PortfolioImpactMetric {
  id: string;
  product_id: string;
  value: number;
  unit: MetricUnit;
  direction: MetricDirection;
  measure: string;
  before_value: number | null;
  after_value: number | null;
  timeframe: string | null;
  role: MetricRole;
  confound: string | null;
  log_id: string | null;
}

export interface PortfolioDecision {
  id: string;
  product_id: string;
  decision: string;
  alternative: string;
  why: string;
  cost: string;
  decided_on: string | null;
  log_id: string | null;
  aged: AgedVerdict | null;
  aged_note: string | null;
}

export interface PortfolioTradeoff {
  id: string;
  product_id: string;
  chose: string;
  over: string;
  because: string;
  context: string | null;
}

export interface PortfolioKill {
  id: string;
  product_id: string | null;
  killed: string;
  why: string;
  freed: string;
  stage: KillStage | null;
  killed_on: string | null;
  log_id: string | null;
}

export interface PortfolioWriting {
  id: string;
  type: 'link' | 'mention';
  url: string | null;
  title: string;
  publication: string | null;
  published_on: string | null;
  note: string | null;
  // Optional artifact fields (writing card redesign); absent on older entries.
  excerpt: string | null;
  cover_image_url: string | null;
  read_time_minutes: number | null;
  series_label: string | null;
  sort_order: number;
}

/** Read through testimonials_public — only confirmed rows exist there, and
 *  the verifier's email is structurally absent from the view. */
export interface PortfolioTestimonial {
  id: string;
  quote: string;
  verifier_name: string;
  verifier_role: string | null;
  verifier_company: string | null;
  relationship: string | null;
  confirmed_at: string | null;
  edited_by_verifier: boolean;
  sort_order: number;
}

export interface PortfolioBeforeAfter {
  id: string;
  product_id: string;
  before_display_path: string;
  after_display_path: string;
  before_label: string | null;
  after_label: string | null;
  caption: string | null;
  metric_delta: string | null;
}

/** parent row id -> confirmed collaborator verification count */
export type VerificationCounts = Record<string, number>;

/** Bento card layout config, as stored by the dashboard app (types/bento.ts). */
export interface BentoCardConfig {
  id: string;
  type:
    | 'section_header'
    | 'profile'
    | 'stats'
    | 'social_links'
    | 'now'
    | 'skills_matrix'
    | 'domain_expertise'
    | 'impact_metric'
    | 'decision'
    | 'tradeoff'
    | 'kill'
    | 'verified_testimonial'
    | 'before_after'
    | 'writing'
    | 'embed'
    | 'rich_text'
    | 'contribution'
    | 'single_product'
    | 'all_products'
    | 'product_list'
    | 'single_log'
    | 'all_logs';
  size: 'S' | 'M' | 'L';
  order: number;
  contentId?: string;
  customTitle?: string;
  selectedProductIds?: string[];
  nowText?: string;
  nowUpdatedAt?: string;
  embedUrl?: string;
  embedProvider?: string;
  embedTitle?: string;
  embedCaption?: string;
  sectionTitle?: string;
  richTextTitle?: string;
  richTextBody?: RichTextDoc;
}

export interface Portfolio {
  profile: PortfolioProfile;
  logs: PortfolioLog[];
  products: PortfolioProduct[];
  /** The user's bento layout; null when they haven't customized it (use defaults). */
  bentoCards: BentoCardConfig[] | null;
  /** log ids that have at least one accepted (verified_at set) verification */
  verifiedLogIds: Set<string>;
  skills: PortfolioSkill[];
  skillVerificationCounts: VerificationCounts;
  domains: PortfolioDomain[];
  impactMetrics: PortfolioImpactMetric[];
  impactMetricVerificationCounts: VerificationCounts;
  decisions: PortfolioDecision[];
  decisionVerificationCounts: VerificationCounts;
  tradeoffs: PortfolioTradeoff[];
  tradeoffVerificationCounts: VerificationCounts;
  kills: PortfolioKill[];
  killVerificationCounts: VerificationCounts;
  writings: PortfolioWriting[];
  testimonials: PortfolioTestimonial[];
  beforeAfters: PortfolioBeforeAfter[];
}

/** Minimum public log count (with a bio) for indexing + build-time static generation. */
export const QUALITY_BAR_MIN_LOGS = 5;

export function meetsQualityBar(portfolio: Portfolio): boolean {
  return (
    Boolean(portfolio.profile.bio?.trim()) &&
    portfolio.logs.length >= QUALITY_BAR_MIN_LOGS
  );
}

export function displayName(profile: PortfolioProfile): string {
  const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
  return name || profile.username;
}

// JSON numerics can arrive as strings depending on the transport.
const toNumber = (value: unknown): number => Number(value);
const toNullableNumber = (value: unknown): number | null =>
  value == null ? null : Number(value);

// Evidence RPCs bundle the rows with their confirmed-verification counts
// in one payload: { <listKey>: [...], verification_counts: {...} }.
type CountedPayload<K extends string, T> = Partial<Record<K, T[]>> & {
  verification_counts?: VerificationCounts;
};

/**
 * Everything the public portfolio page needs; null when no such (live)
 * profile. All reads go through the RPC data API (prodlog2's rpc_data_api
 * migration) — the REST-revoke cutover removed the direct /rest/v1/<table>
 * endpoints for anon, so `.from(<table>)` no longer works here.
 */
export async function fetchPortfolio(username: string): Promise<Portfolio | null> {
  const supabase = getSupabase();

  const { data: profileRow, error } = await supabase.rpc('get_public_profile', {
    p_username: username,
  });

  if (error) throw error;
  const fullProfile = profileRow as
    | (PortfolioProfile & { deleted_at?: string | null })
    | null;
  if (!fullProfile || fullProfile.deleted_at) return null;

  // Only the rendered fields leave this module — the RPC returns the whole
  // profile row, and the rest shouldn't ride along into the RSC payload.
  const profile: PortfolioProfile = {
    user_id: fullProfile.user_id,
    username: fullProfile.username,
    first_name: fullProfile.first_name,
    last_name: fullProfile.last_name,
    title: fullProfile.title,
    bio: fullProfile.bio,
    avatar_url: fullProfile.avatar_url,
    linkedin_url: fullProfile.linkedin_url,
    twitter_url: fullProfile.twitter_url,
    github_url: fullProfile.github_url,
    dribbble_url: fullProfile.dribbble_url,
    substack_url: fullProfile.substack_url,
    medium_url: fullProfile.medium_url,
    career_start_date: fullProfile.career_start_date,
  };

  const userId = profile.user_id;
  const byUser = { p_user_id: userId };

  const [
    logsRes,
    productsRes,
    bentoRes,
    skillsRes,
    domainsRes,
    metricsRes,
    decisionsRes,
    tradeoffsRes,
    killsRes,
    writingsRes,
    testimonialsRes,
    beforeAftersRes,
    logVerificationsRes,
  ] = await Promise.all([
    supabase.rpc('get_public_logs', byUser),
    supabase.rpc('get_products', byUser),
    supabase.rpc('get_bento_cards', byUser),
    supabase.rpc('get_skills', byUser),
    supabase.rpc('get_domains', byUser),
    supabase.rpc('get_impact_metrics', byUser),
    supabase.rpc('get_decisions', byUser),
    supabase.rpc('get_tradeoffs', byUser),
    supabase.rpc('get_kills', byUser),
    supabase.rpc('get_writings', byUser),
    supabase.rpc('get_public_testimonials', byUser),
    supabase.rpc('get_before_afters', byUser),
    supabase.rpc('get_public_log_verifications', byUser),
  ]);

  if (logsRes.error) throw logsRes.error;
  if (productsRes.error) throw productsRes.error;

  const logs = ((logsRes.data ?? []) as PortfolioLog[]);
  const skillsPayload = (skillsRes.data ?? {}) as CountedPayload<'skills', PortfolioSkill>;
  const metricsPayload = (metricsRes.data ?? {}) as CountedPayload<'metrics', Record<string, unknown>>;
  const decisionsPayload = (decisionsRes.data ?? {}) as CountedPayload<'decisions', PortfolioDecision>;
  const tradeoffsPayload = (tradeoffsRes.data ?? {}) as CountedPayload<'tradeoffs', PortfolioTradeoff>;
  const killsPayload = (killsRes.data ?? {}) as CountedPayload<'kills', PortfolioKill>;

  const impactMetrics = (metricsPayload.metrics ?? []).map((row) => ({
    ...(row as unknown as PortfolioImpactMetric),
    value: toNumber(row.value),
    before_value: toNullableNumber(row.before_value),
    after_value: toNullableNumber(row.after_value),
  }));

  // Best-effort: the badge RPC ships in a later migration than the cutover,
  // so an error here just means no verified-log badges — never a 500.
  const verifiedLogIds = logVerificationsRes.error
    ? new Set<string>()
    : new Set((logVerificationsRes.data ?? []) as string[]);

  return {
    profile,
    logs,
    products: (productsRes.data ?? []) as PortfolioProduct[],
    bentoCards: (bentoRes.data as BentoCardConfig[] | null) ?? null,
    verifiedLogIds,
    skills: skillsPayload.skills ?? [],
    skillVerificationCounts: skillsPayload.verification_counts ?? {},
    domains: (domainsRes.data ?? []) as PortfolioDomain[],
    impactMetrics,
    impactMetricVerificationCounts: metricsPayload.verification_counts ?? {},
    decisions: decisionsPayload.decisions ?? [],
    decisionVerificationCounts: decisionsPayload.verification_counts ?? {},
    tradeoffs: tradeoffsPayload.tradeoffs ?? [],
    tradeoffVerificationCounts: tradeoffsPayload.verification_counts ?? {},
    kills: killsPayload.kills ?? [],
    killVerificationCounts: killsPayload.verification_counts ?? {},
    writings: (writingsRes.data ?? []) as PortfolioWriting[],
    testimonials: (testimonialsRes.data ?? []) as PortfolioTestimonial[],
    beforeAfters: (beforeAftersRes.data ?? []) as PortfolioBeforeAfter[],
  };
}

/**
 * Usernames worth prerendering at build time: live profile with a bio and at
 * least QUALITY_BAR_MIN_LOGS public logs. Everyone else renders on demand (ISR).
 */
export async function getStaticPortfolioUsernames(): Promise<string[]> {
  const { data, error } = await getSupabase().rpc('get_portfolio_usernames', {
    p_min_logs: QUALITY_BAR_MIN_LOGS,
  });

  // Both callers (generateStaticParams, sitemap) already treat a throw as
  // "render on demand" — an RPC error degrades the same way.
  if (error) throw error;
  return ((data ?? []) as (string | null)[]).filter(
    (username): username is string => username !== null,
  );
}
