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

const PROFILE_FIELDS =
  'user_id, username, first_name, last_name, title, bio, avatar_url, linkedin_url, twitter_url, github_url, dribbble_url, substack_url, medium_url, career_start_date';

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

// Anonymous readers only ever see verified_at-set rows (RLS), so a plain
// count of returned rows per parent id is the confirmed count.
async function fetchVerificationCounts(
  table: string,
  parentColumn: string,
  parentIds: string[],
): Promise<VerificationCounts> {
  if (parentIds.length === 0) return {};
  const supabase = getSupabase();
  const { data } = await supabase
    .from(table)
    .select(parentColumn)
    .in(parentColumn, parentIds)
    .not('verified_at', 'is', null);

  const counts: VerificationCounts = {};
  for (const row of (data ?? []) as unknown as Record<string, string>[]) {
    const id = row[parentColumn];
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

// PostgREST can return numeric columns as strings to preserve precision.
const toNumber = (value: unknown): number => Number(value);
const toNullableNumber = (value: unknown): number | null =>
  value == null ? null : Number(value);

/** Everything the public portfolio page needs; null when no such (live) profile. */
export async function fetchPortfolio(username: string): Promise<Portfolio | null> {
  const supabase = getSupabase();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(PROFILE_FIELDS)
    .eq('username', username)
    .is('deleted_at', null)
    .maybeSingle<PortfolioProfile>();

  if (error) throw error;
  if (!profile) return null;

  const userId = profile.user_id;

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
  ] = await Promise.all([
    supabase
      .from('logs')
      .select('id, title, description, content, change_description, metrics, date, quarter, tags, product_id')
      .eq('user_id', userId)
      .eq('is_public', true)
      .order('date', { ascending: false }),
    supabase
      .from('products')
      .select('id, name, type, url, business_model, problem_definition, start_date, end_date, icon_url, screenshots')
      .eq('user_id', userId)
      // The owner's drag order from the products management page
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('bento_cards')
      .select('cards')
      .eq('user_id', userId)
      .maybeSingle(),
    supabase
      .from('skills')
      .select('id, name, category, level, sort_order')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('domains')
      .select('id, name, depth, years, context, sort_order')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('impact_metrics')
      .select('id, product_id, value, unit, direction, measure, before_value, after_value, timeframe, role, confound, log_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
    supabase
      .from('decisions')
      .select('id, product_id, decision, alternative, why, cost, decided_on, log_id, aged, aged_note')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
    supabase
      .from('tradeoffs')
      .select('id, product_id, chose, over, because, context')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
    supabase
      .from('kills')
      .select('id, product_id, killed, why, freed, stage, killed_on, log_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
    supabase
      .from('writings')
      .select('id, type, url, title, publication, published_on, note, excerpt, cover_image_url, read_time_minutes, series_label, sort_order')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('testimonials_public')
      .select('id, quote, verifier_name, verifier_role, verifier_company, relationship, confirmed_at, edited_by_verifier, sort_order')
      .eq('user_id', userId)
      .order('confirmed_at', { ascending: true }),
    supabase
      .from('before_afters')
      .select('id, product_id, before_display_path, after_display_path, before_label, after_label, caption, metric_delta')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
  ]);

  if (logsRes.error) throw logsRes.error;
  if (productsRes.error) throw productsRes.error;

  const logs = (logsRes.data ?? []) as PortfolioLog[];
  const skills = (skillsRes.data ?? []) as PortfolioSkill[];
  const domains = (domainsRes.data ?? []) as PortfolioDomain[];
  const impactMetrics = ((metricsRes.data ?? []) as Record<string, unknown>[]).map((row) => ({
    ...(row as unknown as PortfolioImpactMetric),
    value: toNumber(row.value),
    before_value: toNullableNumber(row.before_value),
    after_value: toNullableNumber(row.after_value),
  }));
  const decisions = (decisionsRes.data ?? []) as PortfolioDecision[];
  const tradeoffs = (tradeoffsRes.data ?? []) as PortfolioTradeoff[];
  const kills = (killsRes.data ?? []) as PortfolioKill[];
  const writings = (writingsRes.data ?? []) as PortfolioWriting[];
  const testimonials = (testimonialsRes.data ?? []) as PortfolioTestimonial[];
  const beforeAfters = (beforeAftersRes.data ?? []) as PortfolioBeforeAfter[];

  // Verifications are best-effort: anonymous readers only see confirmed rows,
  // so missing data simply means no badges.
  const [
    logVerifications,
    skillVerificationCounts,
    impactMetricVerificationCounts,
    decisionVerificationCounts,
    tradeoffVerificationCounts,
    killVerificationCounts,
  ] = await Promise.all([
    logs.length > 0
      ? supabase
          .from('impact_verifications')
          .select('log_id')
          .in('log_id', logs.map((log) => log.id))
          .not('verified_at', 'is', null)
          .then(({ data }) => new Set((data ?? []).map((v) => v.log_id as string)))
      : Promise.resolve(new Set<string>()),
    fetchVerificationCounts('skill_verifications', 'skill_id', skills.map((s) => s.id)),
    fetchVerificationCounts('impact_metric_verifications', 'metric_id', impactMetrics.map((m) => m.id)),
    fetchVerificationCounts('decision_verifications', 'decision_id', decisions.map((d) => d.id)),
    fetchVerificationCounts('tradeoff_verifications', 'tradeoff_id', tradeoffs.map((t) => t.id)),
    fetchVerificationCounts('kill_verifications', 'kill_id', kills.map((k) => k.id)),
  ]);

  return {
    profile,
    logs,
    products: (productsRes.data ?? []) as PortfolioProduct[],
    bentoCards: (bentoRes.data?.cards as BentoCardConfig[] | undefined) ?? null,
    verifiedLogIds: logVerifications,
    skills,
    skillVerificationCounts,
    domains,
    impactMetrics,
    impactMetricVerificationCounts,
    decisions,
    decisionVerificationCounts,
    tradeoffs,
    tradeoffVerificationCounts,
    kills,
    killVerificationCounts,
    writings,
    testimonials,
    beforeAfters,
  };
}

/**
 * Usernames worth prerendering at build time: live profile with a bio and at
 * least QUALITY_BAR_MIN_LOGS public logs. Everyone else renders on demand (ISR).
 */
export async function getStaticPortfolioUsernames(): Promise<string[]> {
  const supabase = getSupabase();

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('user_id, username')
    .not('username', 'is', null)
    .not('bio', 'is', null)
    .is('deleted_at', null);

  if (error) throw error;

  const checks = await Promise.all(
    (profiles ?? []).map(async ({ user_id, username }) => {
      const { count } = await supabase
        .from('logs')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user_id)
        .eq('is_public', true);
      return (count ?? 0) >= QUALITY_BAR_MIN_LOGS ? (username as string) : null;
    }),
  );

  return checks.filter((username): username is string => username !== null);
}
