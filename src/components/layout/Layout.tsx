import React from 'react';
import { getCompareNavItems } from '@/src/lib/content';
import { LayoutClient } from './LayoutClient';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = async ({ children }: LayoutProps) => {
  const compareNavItems = await getCompareNavItems();

  return <LayoutClient compareNavItems={compareNavItems}>{children}</LayoutClient>;
};
