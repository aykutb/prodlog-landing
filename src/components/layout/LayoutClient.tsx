'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/src/lib/content';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutClientProps {
  children: React.ReactNode;
  compareNavItems: NavItem[];
}

/** Public portfolios (/p/<username>) are somebody else's page, not a marketing
 *  page: the chrome shrinks to the logo and one way in, so the site's own
 *  navigation never competes with the profile it's framing. */
const isPortfolioPath = (pathname: string | null): boolean =>
  pathname?.startsWith('/p/') ?? false;

export const LayoutClient = ({ children, compareNavItems }: LayoutClientProps) => {
  const pathname = usePathname();
  const minimal = isPortfolioPath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-ink min-h-screen text-primary selection:bg-impact/30 selection:text-white">
      <Navbar compareNavItems={compareNavItems} minimal={minimal} />
      <main>{children}</main>
      <Footer minimal={minimal} />
    </div>
  );
};
