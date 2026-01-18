import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  centered?: boolean;
  showSecondary?: boolean;
}

export const CTASection = ({ centered = true, showSecondary = true }: CTASectionProps) => (
  <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} my-12`}>
    <div className={`flex flex-col md:flex-row ${centered ? 'justify-center' : 'justify-start'} items-center gap-4 mb-4 w-full`}>
      <a
        href="https://dashboard.prodlog.app/auth"
        className="w-full md:w-auto bg-impact text-white px-8 py-4 rounded font-medium text-lg hover:opacity-90 transition-all text-center"
      >
        Start my impact log
      </a>
      {showSecondary && (
        <Link
          to="/sample"
          className="w-full md:w-auto border border-divider text-primary px-8 py-4 rounded font-medium text-lg hover:bg-charcoal transition-all text-center"
        >
          View a sample Impact Page
        </Link>
      )}
    </div>
    <p className="text-muted text-sm font-medium">If you don't write it down, it disappears.</p>
  </div>
);
