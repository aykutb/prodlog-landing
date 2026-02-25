import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  centered?: boolean;
  showSecondary?: boolean;
}

export const CTASection = ({ centered = true, showSecondary = true }: CTASectionProps) => (
  <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} my-8`}>
    <div className={`flex flex-col md:flex-row ${centered ? 'justify-center' : 'justify-start'} items-center gap-3 w-full`}>
      <a
        href="https://dashboard.prodlog.app/auth"
        className="w-full md:w-auto bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center"
      >
        Start logging free
      </a>
      {showSecondary && (
        <Link
          to="/sample"
          className="w-full md:w-auto border border-divider text-primary px-6 py-3 rounded font-medium text-sm hover:bg-charcoal transition-all text-center"
        >
          See a sample log page
        </Link>
      )}
    </div>
  </div>
);
