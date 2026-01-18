import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <header className="pt-32 pb-16 px-6 max-w-4xl mx-auto fade-in">
    <h1 className="serif-headline text-4xl md:text-6xl mb-6 text-primary leading-tight">
      {title}
    </h1>
    <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
      {subtitle}
    </p>
  </header>
);
