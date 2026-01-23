import React from 'react';

export const ValidationSection = () => (
  <section className="py-24 bg-ink border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12 text-center">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary">
        Credibility, built quietly.
      </h2>
      <p className="text-secondary mb-12 max-w-xl mx-auto">
        Request quick accuracy confirmation from collaborators when you log a major win. Simple verification, real proof.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal border border-divider rounded-full text-xs text-secondary">
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        Validated by collaborator: Lead Engineer
      </div>
    </div>
  </section>
);
