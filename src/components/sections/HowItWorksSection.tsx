import React from 'react';

export const HowItWorksSection = () => (
  <section className="py-24 border-t border-divider">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="serif-headline text-3xl md:text-4xl mb-16 text-center">
        Infrastructure for your career.
      </h2>
      <div className="grid md:grid-cols-3 gap-16">
        <div className="text-center">
          <div className="text-impact text-4xl mb-6">01</div>
          <h4 className="text-primary font-semibold mb-3">Capture impact while it's fresh</h4>
          <p className="text-secondary text-sm">
            Five minutes a week to log decisions, data points, and friction points.
          </p>
        </div>
        <div className="text-center">
          <div className="text-impact text-4xl mb-6">02</div>
          <h4 className="text-primary font-semibold mb-3">Add context with reflections</h4>
          <p className="text-secondary text-sm">
            Optional notes for your eyes only. Record what you learned and what you'd do differently.
          </p>
        </div>
        <div className="text-center">
          <div className="text-impact text-4xl mb-6">03</div>
          <h4 className="text-primary font-semibold mb-3">Generate summaries</h4>
          <p className="text-secondary text-sm">
            When review season or interview prep arrives, export precisely what you need.
          </p>
        </div>
      </div>
    </div>
  </section>
);
