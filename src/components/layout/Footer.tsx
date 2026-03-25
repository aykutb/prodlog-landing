import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="py-16 border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
        {/* Left - Logo and Tagline */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logomark.svg" alt="" className="h-6" />
            <span 
              className="text-primary font-normal text-xl"
              style={{ letterSpacing: '-0.07em', fontFamily: 'Outfit, sans-serif' }}
            >
              Prodlog
            </span>
          </Link>
          <p className="text-muted text-sm max-w-xs">
            Career infrastructure for product managers.
          </p>
        </div>

        {/* Right - Menu Columns */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-primary font-semibold text-sm">Product</span>
            <Link to="/how-it-works" className="text-muted text-sm hover:text-primary transition-colors">
              How it works
            </Link>
            <Link to="/pricing" className="text-muted text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/faq" className="text-muted text-sm hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary font-semibold text-sm">Company</span>
            <Link to="/privacy" className="text-muted text-sm hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-muted text-xs border-t border-divider pt-8 gap-4">
        <div>© {new Date().getFullYear()} Prodlog Inc.</div>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
