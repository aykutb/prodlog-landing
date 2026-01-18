import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path: string) =>
    `transition-colors text-sm font-medium ${
      location.pathname === path
        ? 'text-primary underline underline-offset-4'
        : 'text-secondary hover:text-primary'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-divider">
      <div className="max-w-6xl mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <img src="/prodloglogo-light.svg" alt="Prodlog" className="h-7" />
        </Link>
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
        <a
          href="https://dashboard.prodlog.app/auth"
          className="bg-impact hover:opacity-90 text-white px-5 py-2 rounded text-sm transition-all font-medium"
        >
          Start my impact log
        </a>
      </div>
    </nav>
  );
};
