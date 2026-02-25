import React from 'react';

const PILLARS = [
  {
    icon: '/icons/log.svg',
    title: 'Logs',
    description: 'Capture impact in seconds. What shipped, what moved, what you owned.',
    borderColor: 'border-sage-green/50',
    hoverBorderColor: 'hover:border-sage-green',
    bgColor: 'bg-sage-green/5',
    iconBg: 'bg-soft-canvas',
  },
  {
    icon: '/icons/summaries.svg',
    title: 'Summaries',
    description: 'Generate career-ready content. STAR stories, resume bullets, review prep.',
    borderColor: 'border-warm-amber/50',
    hoverBorderColor: 'hover:border-warm-amber',
    bgColor: 'bg-warm-amber/5',
    iconBg: 'bg-soft-canvas',
  },
  {
    icon: '/icons/portfolio.svg',
    title: 'Portfolio',
    description: 'Share your professional story. A public page that proves your work.',
    borderColor: 'border-muted-plum/50',
    hoverBorderColor: 'hover:border-muted-plum',
    bgColor: 'bg-muted-plum/5',
    iconBg: 'bg-soft-canvas',
  },
];

export const ThreePillarsSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary text-center leading-tight">
        Three tools for your PM career
      </h2>
      <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
        Everything you need to document, generate, and share your professional impact.
      </p>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-8">
        {PILLARS.map((pillar, i) => (
          <div 
            key={i} 
            className={`relative pt-8 pb-5 px-5 border-2 ${pillar.borderColor} ${pillar.hoverBorderColor} rounded-xl ${pillar.bgColor} hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all group text-center`}
          >
            {/* Pin icon - centered and overlapping top border */}
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 ${pillar.iconBg} rounded-full p-1.5 group-hover:scale-110 transition-transform`}>
              <img src={pillar.icon} alt={pillar.title} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-primary font-bold text-lg mb-2">{pillar.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
