import React from 'react';
import Link from 'next/link';
import { RESOURCES_NAV } from '@/src/navigation/resourcesNav';
import { CookieSettingsButton } from '@/src/components/consent';
import { APP_STORE_URL } from '@/src/lib/appStore';

/** The lockup from prodlog2's logomark definition (public/brand/logo.svg). */
const Wordmark = () => (
  <Link href="/" className="flex items-center">
    <img src="/brand/logo.svg" alt="Prodlog" className="h-6 w-auto" />
  </Link>
);

interface FooterProps {
  /** Portfolio pages: the logo alone, so the site's own links never trail
   *  somebody else's profile. */
  minimal?: boolean;
}

export const Footer = ({ minimal = false }: FooterProps) => {
  if (minimal) {
    return (
      <footer className="py-10 border-t border-divider">
        <div className="max-w-5xl mx-auto px-8 md:px-12 flex justify-center">
          <Wordmark />
        </div>
      </footer>
    );
  }

  return (
  <footer className="py-16 border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
        {/* Left - Logo and Tagline */}
        <div className="flex flex-col gap-4">
          <Wordmark />
          <p className="text-muted text-sm max-w-xs">
            Built by a product manager who kept the note for fifteen years and finally made it
            do something.
          </p>
        </div>

        {/* Right - Menu Columns */}
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-primary font-semibold text-sm">Product</span>
            <Link href="/how-it-works" className="text-muted text-sm hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-muted text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="text-muted text-sm hover:text-primary transition-colors">
              FAQ
            </Link>
            <a href={APP_STORE_URL} className="text-muted text-sm hover:text-primary transition-colors">
              iOS app
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary font-semibold text-sm">Resources</span>
            {RESOURCES_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary font-semibold text-sm">Company</span>
            <Link href="/privacy" className="text-muted text-sm hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/support" className="text-muted text-sm hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-muted text-xs border-t border-divider pt-8 gap-4">
        <div>© {new Date().getFullYear()} Prodlog Inc.</div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <CookieSettingsButton className="hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  </footer>
  );
};
