import React from 'react';

const COMPANY_PLACEHOLDERS = [
  'Stripe',
  'Notion',
  'Figma',
  'Linear',
  'Vercel',
];

const TESTIMONIALS = [
  {
    quote: "Finally, a tool that makes it easy to remember what I actually shipped. My last review was the smoothest one yet.",
    name: "Sarah M.",
    title: "Senior PM at a fintech company",
  },
  {
    quote: "I used to dread updating my resume. Now I just export from Prodlog and it's done in minutes.",
    name: "James L.",
    title: "Product Lead at a B2B SaaS",
  },
];

export const SocialProofSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary leading-tight">
          Trusted by PMs at leading companies
        </h2>
        <p className="text-secondary">
          Product managers use Prodlog to document their work and advance their careers.
        </p>
      </div>

      {/* Company Logos Placeholder */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
        {COMPANY_PLACEHOLDERS.map((company, i) => (
          <div 
            key={i} 
            className="px-6 py-3 bg-white border border-divider rounded-lg text-muted text-sm font-medium opacity-60"
          >
            {company}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
        <div className="text-center p-4 md:p-6 bg-white border border-divider rounded-xl">
          <div className="text-2xl md:text-4xl font-bold text-primary mb-1">2,500+</div>
          <div className="text-[10px] md:text-sm text-muted">Impacts logged</div>
        </div>
        <div className="text-center p-4 md:p-6 bg-white border border-divider rounded-xl">
          <div className="text-2xl md:text-4xl font-bold text-primary mb-1">850+</div>
          <div className="text-[10px] md:text-sm text-muted">PMs using Prodlog</div>
        </div>
        <div className="text-center p-4 md:p-6 bg-white border border-divider rounded-xl">
          <div className="text-2xl md:text-4xl font-bold text-primary mb-1">4.9</div>
          <div className="text-[10px] md:text-sm text-muted">Average rating</div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((testimonial, i) => (
          <div 
            key={i} 
            className="p-6 md:p-8 bg-white border border-divider rounded-xl"
          >
            <p className="text-secondary text-sm md:text-base leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-deep-ink-blue/10 flex items-center justify-center">
                <span className="text-sm font-medium text-deep-ink-blue">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm text-primary font-medium">{testimonial.name}</div>
                <div className="text-xs text-muted">{testimonial.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
