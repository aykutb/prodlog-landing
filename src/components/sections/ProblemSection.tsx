import React from 'react';

export const ProblemSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="serif-headline text-2xl md:text-[36px] mb-8 text-primary leading-tight">
          Product managers are judged on impact, not effort.
        </h2>
        <p className="text-secondary mb-4">
          Impact gets scattered.
        </p>
        <p className="text-secondary mb-6">
          By the time reviews or interviews come around, the details are gone.
        </p>
        <p className="text-secondary">
          Prodlog gives you one place to log what changed, while it's still fresh.
        </p>
      </div>
      <div className="bg-charcoal border border-divider rounded p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
        {/* Convergence Visual */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <div className="w-64 h-64 border border-impact rounded-full animate-pulse"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-muted text-xs mb-8 flex flex-wrap justify-center gap-2">
            <span className="p-2 border border-divider rounded">Slack Thread.</span>
            <span className="p-2 border border-divider rounded">PRD Note.</span>
            <span className="p-2 border border-divider rounded">Jira Ticket.</span>
          </div>
          <div className="w-16 h-1 bg-impact mx-auto mb-8 rounded-full"></div>
          <div className="text-primary font-bold text-lg">Clean Impact Log.</div>
        </div>
      </div>
    </div>
  </section>
);
