import React from 'react';

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
  <div className="mb-20">
    <h2 className="text-primary font-semibold text-xl mb-4">{title}</h2>
    <div className="text-secondary text-base leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);
