'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/src/lib/content';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutClientProps {
  children: React.ReactNode;
  compareNavItems: NavItem[];
}

export const LayoutClient = ({ children, compareNavItems }: LayoutClientProps) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-ink min-h-screen text-primary selection:bg-impact/30 selection:text-white">
      <Navbar compareNavItems={compareNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
