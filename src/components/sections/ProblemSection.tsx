import React from 'react';

export const ProblemSection = () => (
  <>
    <section className="py-32 bg-ink border-y border-divider">
      <div className="max-w-5xl mx-auto px-8 md:px-12 text-center">
        <h2 className="text-muted text-sm uppercase tracking-widest mb-8">What usually happens</h2>
        <p className="text-primary text-xl md:text-2xl leading-relaxed font-light">
          You try to remember what you did six months ago.
          <br />
          <span className="text-muted">You undersell yourself when it counts.</span>
        </p>
      </div>
    </section>

    <section className="py-24 max-w-5xl mx-auto px-8 md:px-12">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-2">
          <h3 className="text-primary font-medium">Reviews reward recency</h3>
          <p className="text-secondary text-sm leading-relaxed">
            Most managers only remember the last 30 days of your work. The rest is lost.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-primary font-medium">Interviews reward stories</h3>
          <p className="text-secondary text-sm leading-relaxed">
            Concrete details fade. Prodlog keeps the data and context fresh for your next move.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-primary font-medium">Memory fades quickly</h3>
          <p className="text-secondary text-sm leading-relaxed">
            The logic behind your hardest decisions is gone within weeks if not captured.
          </p>
        </div>
      </div>
    </section>
  </>
);
