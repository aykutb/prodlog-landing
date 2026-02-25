import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <header className="pt-32 pb-16 px-8 md:px-12 max-w-5xl mx-auto fade-in text-center">
    <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
      {title}
    </h1>
    <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
      {subtitle}
    </p>
  </header>
);
