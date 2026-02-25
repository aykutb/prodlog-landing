import React from 'react';
import { CTASection, PageHeader } from '@/src/components/ui';

const PRIVACY_FEATURES = [
  {
    icon: '🔒',
    title: 'Private by default',
    description: 'Every impact you capture begins its life as a private record. No one can see it without your explicit action.',
  },
  {
    icon: '🎭',
    title: 'Anonymized by design',
    description: 'Strip away sensitive identifiers before sharing. Share the patterns of your impact without exposing trade secrets.',
  },
  {
    icon: '🎯',
    title: 'Sharing is deliberate',
    description: 'Sharing is a point-to-point transaction you control. You decide what to share and with whom.',
  },
  {
    icon: '📦',
    title: 'Your data stays yours',
    description: 'We do not sell your data or train models on your reflections. Export or delete anytime.',
  },
  {
    icon: '✓',
    title: 'Verified, not exposed',
    description: 'Collaborators can verify your impact without seeing sensitive details. Quiet credibility.',
  },
];

export const PrivacyPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Privacy is the foundation"
      subtitle="Your career documentation deserves a private place to live. Prodlog is built around this principle."
    />

    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Privacy Controls Visual */}
      <div className="bg-white border border-divider rounded-xl p-6 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]">
        <div className="text-[10px] text-muted uppercase tracking-wider mb-4 font-semibold">Visibility Controls</div>
        
        <div className="space-y-4">
          <div className="p-4 bg-charcoal rounded-lg border border-divider">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-sm font-medium">Checkout Optimization</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-1 rounded bg-sage-green/10 text-sage-green border border-sage-green/20">Private</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="text-[10px] px-3 py-1.5 rounded border border-divider text-muted bg-white">Make Shareable</button>
              <button className="text-[10px] px-3 py-1.5 rounded border border-divider text-muted bg-white">Anonymize</button>
            </div>
          </div>

          <div className="p-4 bg-charcoal rounded-lg border border-divider opacity-70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-sm font-medium">Platform Migration</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-1 rounded bg-deep-ink-blue/10 text-deep-ink-blue border border-deep-ink-blue/20">Shareable</span>
              </div>
            </div>
            <div className="text-[10px] text-muted mt-2">Shared with: 2 people</div>
          </div>

          <div className="p-4 bg-charcoal rounded-lg border border-divider opacity-50">
            <div className="flex items-center justify-between">
              <span className="text-primary text-sm font-medium">Q3 Resume Bullets</span>
              <span className="text-[10px] px-2 py-1 rounded bg-muted-plum/10 text-muted-plum border border-muted-plum/20">Anonymized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Features List */}
      <div className="space-y-4">
        {PRIVACY_FEATURES.map((feature, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white border border-divider rounded-lg hover:border-deep-ink-blue/30 transition-colors">
            <div className="text-2xl">{feature.icon}</div>
            <div>
              <h3 className="text-primary font-medium mb-1">{feature.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="pt-12 border-t border-divider text-center">
      <CTASection showSecondary={false} />
    </div>
  </div>
);
