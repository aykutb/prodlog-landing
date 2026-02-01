import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `transition-colors text-sm font-medium ${
      location.pathname === path
        ? 'text-primary underline underline-offset-4'
        : 'text-secondary hover:text-primary'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block py-3 px-4 transition-colors text-base font-medium border-b border-divider ${
      location.pathname === path
        ? 'text-primary bg-charcoal/50'
        : 'text-secondary hover:text-primary hover:bg-charcoal/30'
    }`;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-divider">
        <div className="max-w-6xl mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <img src="/prodloglogo-light.svg" alt="Prodlog" className="h-7" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className={navLinkClass('/how-it-works')}>
              How it works
            </Link>
            <Link to="/privacy" className={navLinkClass('/privacy')}>
              Privacy
            </Link>
            <Link to="/pricing" className={navLinkClass('/pricing')}>
              Pricing
            </Link>
            <Link to="/faq" className={navLinkClass('/faq')}>
              FAQ
            </Link>
          </div>

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://dashboard.prodlog.app/auth"
              className="bg-impact hover:opacity-90 text-white px-4 py-2 rounded text-sm transition-all font-medium"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </a>

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 bg-ink border-b border-divider z-40 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="py-2">
          <Link
            to="/how-it-works"
            className={mobileNavLinkClass('/how-it-works')}
            onClick={handleLinkClick}
          >
            How it works
          </Link>
          <Link
            to="/privacy"
            className={mobileNavLinkClass('/privacy')}
            onClick={handleLinkClick}
          >
            Privacy
          </Link>
          <Link
            to="/pricing"
            className={mobileNavLinkClass('/pricing')}
            onClick={handleLinkClick}
          >
            Pricing
          </Link>
          <Link
            to="/faq"
            className={mobileNavLinkClass('/faq')}
            onClick={handleLinkClick}
          >
            FAQ
          </Link>
        </div>
      </div>
    </>
  );
};
