import React from 'react';

const INPUT_METHODS = [
  {
    iconSrc: '/logmethods/web-page-icon.svg',
    name: 'Web App',
    description: 'Full-featured dashboard',
  },
  {
    iconSrc: '/logmethods/mobile-app-icon.svg',
    name: 'Mobile App',
    description: 'Log on the go',
  },
  {
    iconSrc: '/logmethods/slack-icon.svg',
    name: 'Slack',
    description: 'Log without leaving chat',
  },
  {
    iconSrc: '/logmethods/browser-extension-icon.svg',
    name: 'Browser Extension',
    description: 'Capture from any page',
  },
  {
    iconSrc: '/logmethods/claude-mcp-icon.svg',
    name: 'Claude MCP',
    description: 'AI-assisted logging',
  },
];

export const LogFromAnywhereSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary text-center leading-tight">
        Log from anywhere
      </h2>
      <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
        No context switching. Capture impact where you already work.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {INPUT_METHODS.map((method, i) => (
          <div 
            key={i} 
            className="p-4 md:p-6 border border-divider rounded-xl bg-white text-center hover:border-deep-ink-blue/30 hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all group"
          >
            <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform">
              <img
                src={method.iconSrc}
                alt=""
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
              />
            </div>
            <h4 className="text-primary font-medium text-sm mb-1">{method.name}</h4>
            <p className="text-muted text-[10px] md:text-xs">{method.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
