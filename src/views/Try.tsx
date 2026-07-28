import React from 'react';
import { PageHeader } from '@/src/components/ui';
import { PreviewTool } from '@/src/components/ui/PreviewTool';

export const TryPage = () => (
  <div className="pb-24">
    <PageHeader
      title="Paste in your notes and see what comes out."
      subtitle="Your Slack thread, your phone note, your half-finished doc. Nothing is saved and nothing is shared. This runs once and disappears."
    />
    <PreviewTool />
  </div>
);
