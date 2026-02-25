import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `transition-all text-sm ${
      location.pathname === path
        ? 'text-primary font-medium'
        : 'text-muted hover:text-primary'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block py-4 px-6 transition-colors text-base ${
      location.pathname === path
        ? 'text-primary font-medium bg-charcoal/30'
        : 'text-muted hover:text-primary hover:bg-charcoal/20'
    }`;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Container - Fixed, Centered, Not Full Width */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <nav className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-divider rounded-2xl shadow-sm">
          <div className="px-4 md:px-6 h-12 flex items-center justify-between">
            <Link to="/" className="cursor-pointer flex items-center gap-2">
              <img src="/logomark.svg" alt="" className="h-5" />
              <span 
                className="text-primary font-normal text-lg"
                style={{ letterSpacing: '-0.07em', fontFamily: 'Outfit, sans-serif' }}
              >
                Prodlog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/how-it-works" className={navLinkClass('/how-it-works')}>
                How it works
              </Link>
              <Link to="/pricing" className={navLinkClass('/pricing')}>
                Pricing
              </Link>
              <a
                href="https://dashboard.prodlog.app/auth"
                className="bg-deep-ink-blue hover:bg-deep-ink-blue/90 text-white px-4 py-1.5 rounded-lg text-sm transition-all font-medium"
              >
                Get Started
              </a>
            </div>

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-primary transition-colors -mr-2"
              aria-label="Toggle menu"
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
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-20 left-4 right-4 bg-white border border-divider rounded-2xl shadow-lg z-40 md:hidden transform transition-all duration-200 ease-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
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
            to="/pricing"
            className={mobileNavLinkClass('/pricing')}
            onClick={handleLinkClick}
          >
            Pricing
          </Link>
          <div className="px-6 py-4 border-t border-divider">
            <a
              href="https://dashboard.prodlog.app/auth"
              className="block w-full bg-deep-ink-blue hover:bg-deep-ink-blue/90 text-white px-5 py-2.5 rounded-lg text-sm transition-all font-medium text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
