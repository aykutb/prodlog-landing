import React from 'react';
import type { Portfolio } from '@/src/lib/portfolio/data';
import { displayName } from '@/src/lib/portfolio/data';
import { PortfolioBentoGrid } from '@/src/components/portfolio/BentoCards';
import { CopyLinkButton } from '@/src/components/ui/CopyLinkButton';

// Public portfolio page — mirrors the dashboard's BentoProfile view
// (prodlog2 src/components/bento/BentoProfile.tsx) in visitor mode:
// centered avatar header, share action, then the owner's bento card grid.

const initials = (portfolio: Portfolio): string => {
  const first = portfolio.profile.first_name?.charAt(0)?.toUpperCase() || '';
  const last = portfolio.profile.last_name?.charAt(0)?.toUpperCase() || '';
  return first + last || '?';
};

export const PortfolioPage = ({
  portfolio,
  canonicalUrl,
}: {
  portfolio: Portfolio;
  canonicalUrl: string;
}) => {
  const { profile } = portfolio;
  const fullName = displayName(profile);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-8">
      <div className="space-y-8">
        {/* Profile header — always centered at top */}
        <div className="flex flex-col items-center text-center space-y-4">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-divider"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-impact/10 border-4 border-divider flex items-center justify-center">
              <span className="text-3xl font-medium text-impact">{initials(portfolio)}</span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-serif font-semibold text-primary">{fullName}</h1>
            <p className="text-sm text-muted">@{profile.username}</p>
            {profile.title && <p className="text-lg text-muted mt-1">{profile.title}</p>}
          </div>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-end">
          <CopyLinkButton url={canonicalUrl} />
        </div>

        {/* Bento grid, honoring the owner's card layout */}
        <PortfolioBentoGrid portfolio={portfolio} />

        {/* CTA for visitors */}
        <div className="pt-8 pb-4 text-center">
          <p className="text-secondary mb-4">Build your own PM portfolio</p>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="inline-block bg-impact hover:opacity-90 text-white px-6 py-3 rounded font-medium transition-all"
          >
            Start logging
          </a>
          <p className="text-muted text-sm mt-3">Free to start. No credit card required.</p>
        </div>
      </div>
    </div>
  );
};
