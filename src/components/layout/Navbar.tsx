'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isResourcePath } from '@/src/navigation/resourcesNav';
import { ResourcesDropdown } from './ResourcesDropdown';
import { UseCasesDropdown } from './UseCasesDropdown';
import { isUseCasePath } from '@/src/navigation/useCasesNav';
import type { NavItem } from '@/src/lib/content';

// The dashboard's active top-bar link: ink text with the logo's mauve strip
// under it (prodlog2 TopBar.tsx, StripMarker: 16x4px, fully rounded), sitting
// 4px above the nav's bottom edge.
const ACTIVE_LINK =
  "relative text-ink font-medium after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2.5 after:h-1 after:w-4 after:rounded-full after:bg-mauve-strong after:content-['']";

interface NavbarProps {
  compareNavItems: NavItem[];
  /** Portfolio pages: logo + Start free only, no site navigation. */
  minimal?: boolean;
}

export const Navbar = ({ compareNavItems, minimal = false }: NavbarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `transition-all text-sm ${pathname === path ? ACTIVE_LINK : 'text-muted-foreground hover:text-ink'}`;

  const mobileNavLinkClass = (path: string) =>
    `block py-4 px-6 transition-colors text-base ${
      pathname === path
        ? 'text-ink font-medium bg-muted/30'
        : 'text-muted-foreground hover:text-ink hover:bg-muted/20'
    }`;

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const useCasesActive = isUseCasePath(pathname);
  const resourcesActive = !useCasesActive && isResourcePath(pathname);

  return (
    <>
      {/* Navbar Container - Fixed, Centered, Not Full Width */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <nav className="max-w-5xl mx-auto bg-surface/80 backdrop-blur-xl border border-border rounded-xl">
          <div className="px-4 md:px-6 h-12 flex items-center justify-between">
            <Link href="/" className="cursor-pointer flex items-center">
              {/* The lockup from prodlog2's logomark definition (public/brand/logo.svg). */}
              <img src="/brand/logo.svg" alt="Prodlog" className="h-5 w-auto" />
            </Link>

            {/* On a portfolio the CTA is the whole nav, at every width — there
                is no hamburger left to hide it behind. */}
            {minimal ? (
              <a
                href="https://dashboard.prodlog.app/auth"
                className="bg-ink hover:bg-ink/90 text-on-ink px-4 py-1.5 rounded-lg text-sm transition-all font-medium"
              >
                Start free
              </a>
            ) : (
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/how-it-works" className={navLinkClass('/how-it-works')} aria-current={pathname === '/how-it-works' ? 'page' : undefined}>
                    How it works
                  </Link>
                  <UseCasesDropdown
                    isActive={useCasesActive}
                    linkClassName={`transition-all text-sm ${useCasesActive ? ACTIVE_LINK : 'text-muted-foreground hover:text-ink'}`}
                    onNavigate={handleLinkClick}
                  />
                  <ResourcesDropdown
                    isActive={resourcesActive}
                    compareNavItems={compareNavItems}
                    linkClassName={`transition-all text-sm ${
                      resourcesActive ? ACTIVE_LINK : 'text-muted-foreground hover:text-ink'
                    }`}
                    onNavigate={handleLinkClick}
                  />
                  <Link href="/try" className={navLinkClass('/try')} aria-current={pathname === '/try' ? 'page' : undefined}>
                    Try it
                  </Link>
                  <Link href="/pricing" className={navLinkClass('/pricing')} aria-current={pathname === '/pricing' ? 'page' : undefined}>
                    Pricing
                  </Link>
                  <a
                    href="https://dashboard.prodlog.app/auth"
                    className="bg-ink hover:bg-ink/90 text-on-ink px-4 py-1.5 rounded-lg text-sm transition-all font-medium"
                  >
                    Start free
                  </a>
                </div>

                {/* Hamburger Menu Button - Mobile Only */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-muted-foreground hover:text-ink transition-colors -mr-2"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {!minimal && isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {!minimal && (
      <div
        className={`fixed top-20 left-4 right-4 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain bg-surface rounded-xl shadow-overlay z-40 md:hidden transform transition-all duration-200 ease-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="py-2">
          <Link
            href="/how-it-works"
            className={mobileNavLinkClass('/how-it-works')}
            onClick={handleLinkClick}
          >
            How it works
          </Link>
          <UseCasesDropdown variant="mobile" isActive={useCasesActive} linkClassName="" onNavigate={handleLinkClick} />
          <ResourcesDropdown
            variant="mobile"
            isActive={resourcesActive}
            compareNavItems={compareNavItems}
            linkClassName=""
            onNavigate={handleLinkClick}
          />
          <Link
            href="/try"
            className={mobileNavLinkClass('/try')}
            onClick={handleLinkClick}
          >
            Try it
          </Link>
          <Link
            href="/pricing"
            className={mobileNavLinkClass('/pricing')}
            onClick={handleLinkClick}
          >
            Pricing
          </Link>
          <div className="px-6 py-4 border-t border-border">
            <a
              href="https://dashboard.prodlog.app/auth"
              className="block w-full bg-ink hover:bg-ink/90 text-on-ink px-5 py-2.5 rounded-lg text-sm transition-all font-medium text-center"
            >
              Start free
            </a>
          </div>
        </div>
      </div>
      )}
    </>
  );
};
