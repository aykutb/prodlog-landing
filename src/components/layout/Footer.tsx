import React from 'react';
import { Link } from 'react-router-dom';
import { CTASection } from '@/src/components/ui';

export const Footer = () => (
  <footer className="py-24 border-t border-divider bg-ink">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="serif-headline text-4xl md:text-5xl mb-8 text-primary">
        Don't rely on memory when it matters most.
      </h2>

      <CTASection />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-sm mb-20">
        <div className="flex flex-col gap-3">
          <span className="text-primary font-semibold">Product</span>
          <Link to="/how-it-works" className="text-muted hover:text-primary transition-colors">
            How it works
          </Link>
          <Link to="/pricing" className="text-muted hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-muted hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-primary font-semibold">Company</span>
          <Link to="/privacy" className="text-muted hover:text-primary transition-colors">
            Security
          </Link>
          <Link to="/privacy" className="text-muted hover:text-primary transition-colors">
            Privacy
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-muted text-[10px] border-t border-divider pt-8 gap-4">
        <div>© Prodlog Inc. Career Infrastructure for Product Managers.</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
