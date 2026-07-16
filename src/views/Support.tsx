import React from 'react';
import { PageHeader, SupportForm } from '@/src/components/ui';

export const SupportPage = () => (
  <div className="pb-24">
    <PageHeader
      title="Support"
      subtitle="Hit a snag or have a question? Tell us what's going on and we'll get back to you by email."
    />
    <div className="max-w-xl mx-auto px-8 md:px-12">
      <SupportForm />
      <p className="text-muted text-xs text-center mt-8">
        Prefer email? Reach us directly at{' '}
        <a
          href="mailto:support@prodlog.app"
          className="text-deep-ink-blue underline underline-offset-2 hover:opacity-80"
        >
          support@prodlog.app
        </a>
        .
      </p>
    </div>
  </div>
);
