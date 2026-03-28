import React from 'react';

const VALIDATORS = [
  { role: 'Lead Engineer', name: 'Alex Kim' },
  { role: 'Design Lead', name: 'Jordan Lee' },
  { role: 'Engineering Manager', name: 'Mike Chen' },
];

export const ValidationSection = () => (
  <section className="py-24 border-t border-divider">
    <div className="max-w-5xl mx-auto px-8 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/verify.svg"
            alt=""
            className="mx-auto mb-6 h-32 w-32 object-contain sm:h-36 sm:w-36 md:mx-0 md:mb-8 md:h-40 md:w-40 lg:h-44 lg:w-44"
          />
          <div className="min-w-0 text-center md:text-left">
            <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
              Get your impact verified
            </h2>
            <p className="text-secondary mb-4">
              Ask collaborators to confirm your contributions with one click.
            </p>
            <p className="text-secondary">
              No awkward emails. No chasing approvals. Just quiet credibility that strengthens your career documentation.
            </p>
          </div>
        </div>

        <div className="bg-white border border-divider rounded-xl p-6 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-4">Impact Validations</div>
          
          <div className="space-y-3">
            {VALIDATORS.map((validator, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal border border-divider rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-deep-ink-blue/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-deep-ink-blue">
                      {validator.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-primary font-medium">{validator.name}</div>
                    <div className="text-[10px] text-muted">{validator.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-sage-green"></div>
                  <span className="text-[10px] text-sage-green font-medium">Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-divider text-center">
            <span className="text-[10px] text-muted">
              3 of 3 collaborators confirmed this impact
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
