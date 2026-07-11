import { getSupabase } from './supabase';

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
}

export interface Portfolio {
  profile: PortfolioProfile;
  logs: PortfolioLog[];
  products: PortfolioProduct[];
  /** log ids that have at least one accepted (verified_at set) verification */
  verifiedLogIds: Set<string>;
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

  const [logsRes, productsRes] = await Promise.all([
    supabase
      .from('logs')
      .select('id, title, description, change_description, metrics, date, quarter, tags, product_id')
      .eq('user_id', profile.user_id)
      .eq('is_public', true)
      .order('date', { ascending: false }),
    supabase
      .from('products')
      .select('id, name, type, url')
      .eq('user_id', profile.user_id)
      .order('end_date', { ascending: false, nullsFirst: false }),
  ]);

  if (logsRes.error) throw logsRes.error;
  if (productsRes.error) throw productsRes.error;

  const logs = (logsRes.data ?? []) as PortfolioLog[];

  // Verifications are best-effort: RLS may hide them from anonymous readers,
  // in which case the page simply shows no "Verified" badges.
  let verifiedLogIds = new Set<string>();
  if (logs.length > 0) {
    const { data: verifications } = await supabase
      .from('impact_verifications')
      .select('log_id')
      .in('log_id', logs.map((log) => log.id))
      .not('verified_at', 'is', null);
    verifiedLogIds = new Set((verifications ?? []).map((v) => v.log_id as string));
  }

  return {
    profile,
    logs,
    products: (productsRes.data ?? []) as PortfolioProduct[],
    verifiedLogIds,
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
