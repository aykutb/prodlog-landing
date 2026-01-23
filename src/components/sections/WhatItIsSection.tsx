import React from 'react';

export const WhatItIsSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal/30 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary text-center leading-tight">
        A private impact log for product managers.
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-secondary">
            Prodlog is a private impact log for product managers.
          </p>
          <p className="text-secondary">
            It helps PMs capture outcomes, add context while it's fresh, and preserve their work for career moments.
          </p>
          <ul className="space-y-4 text-primary pt-4">
            <li className="flex gap-3"><span className="text-impact">✔</span> Capture outcomes, not just tasks.</li>
            <li className="flex gap-3"><span className="text-impact">✔</span> Add context you'll thank yourself for later.</li>
            <li className="flex gap-3"><span className="text-impact">✔</span> Private by default.</li>
            <li className="flex gap-3"><span className="text-impact">✔</span> Generate summaries when you need them.</li>
          </ul>
          <p className="text-muted italic text-sm pt-4">Designed for reflection. Your work, preserved.</p>
        </div>
        <div className="bg-ink border border-divider rounded-lg p-4 shadow-inner">
          <div className="text-[10px] text-muted mb-2 uppercase tracking-tighter">Impact Creation UI.</div>
          <div className="space-y-3">
            <div className="h-2 w-full bg-divider rounded"></div>
            <div className="h-8 w-full border border-divider rounded bg-charcoal/50"></div>
            <div className="h-2 w-1/2 bg-divider rounded"></div>
            <div className="h-24 w-full border border-divider rounded bg-charcoal/50"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
