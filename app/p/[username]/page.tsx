import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  displayName,
  fetchPortfolio,
  getStaticPortfolioUsernames,
  meetsQualityBar,
  type Portfolio,
} from '@/src/lib/portfolio/data';
import { PortfolioPage } from '@/src/views';

// Canonical host for portfolios is always the marketing domain, never
// dashboard.prodlog.app — hardcoded on purpose, independent of env overrides.
const PORTFOLIO_ORIGIN = 'https://prodlog.app';

// Safety net for edits that bypass the on-publish revalidation ping
// (see app/api/revalidate-portfolio).
export const revalidate = 3600;
export const dynamicParams = true;

const portfolioUrl = (username: string) => `${PORTFOLIO_ORIGIN}/p/${username}`;

/** ~155 chars for the meta description, cut on a word boundary. */
const metaDescription = (portfolio: Portfolio): string => {
  const bio = portfolio.profile.bio?.trim();
  const fallback = `${displayName(portfolio.profile)}'s product management portfolio on Prodlog — ${portfolio.logs.length} public impact logs.`;
  const text = bio || fallback;
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

export async function generateStaticParams() {
  try {
    const usernames = await getStaticPortfolioUsernames();
    return usernames.map((username) => ({ username }));
  } catch {
    // Missing Supabase env (e.g. CI) — render everything on demand instead
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await fetchPortfolio(username);
  if (!portfolio) return {};

  const name = displayName(portfolio.profile);
  const title = `${name} — ${portfolio.profile.title || 'Product Manager'} Portfolio`;
  const description = metaDescription(portfolio);
  const canonical = portfolioUrl(portfolio.profile.username);

  return {
    metadataBase: new URL(PORTFOLIO_ORIGIN),
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'profile',
      siteName: 'Prodlog',
      locale: 'en_US',
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // Thin portfolios stay out of the index but still pass link signals
    ...(meetsQualityBar(portfolio) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const portfolio = await fetchPortfolio(username);
  if (!portfolio) notFound();

  const { profile } = portfolio;
  const canonical = portfolioUrl(profile.username);
  const sameAs = [
    profile.linkedin_url,
    profile.twitter_url,
    profile.github_url,
    profile.medium_url,
    profile.substack_url,
    profile.dribbble_url,
  ].filter((url): url is string => Boolean(url));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: displayName(profile),
    jobTitle: profile.title || 'Product Manager',
    url: canonical,
    ...(profile.avatar_url ? { image: profile.avatar_url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioPage portfolio={portfolio} canonicalUrl={canonical} />
    </>
  );
}
