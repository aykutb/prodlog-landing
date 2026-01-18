import React from 'react';

export const PrivacySection = () => (
  <section className="py-24 border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-center text-primary">
        Privacy isn't a setting. It's the default.
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-charcoal rounded border border-divider">
          <div className="text-primary font-semibold mb-2">Private</div>
          <p className="text-muted text-sm">
            Reflections and context are for your eyes only. Stored with industry-standard
            encryption.
          </p>
        </div>
        <div className="p-8 bg-charcoal rounded border border-divider">
          <div className="text-primary font-semibold mb-2">Anonymized</div>
          <p className="text-muted text-sm">
            Automatically remove specific revenue numbers or internal project names for external
            use.
          </p>
        </div>
        <div className="p-8 bg-charcoal rounded border border-divider">
          <div className="text-primary font-semibold mb-2">Shareable</div>
          <p className="text-muted text-sm">
            Generate a password-protected link for hiring managers or your lead.
          </p>
        </div>
      </div>
      <p className="text-center mt-12 text-secondary italic">
        Nothing is shared unless you choose.
      </p>
    </div>
  </section>
);
