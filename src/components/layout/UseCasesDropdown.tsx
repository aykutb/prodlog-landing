'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { USE_CASES_NAV } from '@/src/navigation/useCasesNav';

interface UseCasesDropdownProps {
  isActive: boolean;
  linkClassName: string;
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * The "Use cases" menu: three links, each with a one-line description. Same
 * behavior as the Resources menu (hover or click to open, Escape and an
 * outside click to close), smaller surface.
 */
export const UseCasesDropdown = ({ isActive, linkClassName, onNavigate, variant = 'desktop' }: UseCasesDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (variant !== 'desktop' || !open) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [variant, open]);

  useEffect(() => () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  }, []);

  const navigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={menuId}
          className={`flex w-full items-center justify-between px-6 py-4 text-left text-base transition-colors ${
            isActive ? 'bg-muted/30 font-medium text-ink' : 'text-muted-foreground hover:bg-muted/20 hover:text-ink'
          }`}
        >
          Use cases
          <Chevron open={open} />
        </button>
        {open && (
          <ul id={menuId} className="space-y-1 px-4 pb-3">
            {USE_CASES_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={navigate} className="block rounded-lg px-2 py-2 hover:bg-muted/40">
                  <span className="block text-sm font-medium text-ink">{item.label}</span>
                  <span className="block text-xs text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        hoverTimer.current = window.setTimeout(() => setOpen(true), 80);
      }}
      onMouseLeave={() => {
        if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
        setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        className={`${linkClassName} inline-flex items-center gap-1`}
      >
        Use cases
        <Chevron open={open} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <ul id={menuId} className="w-[320px] space-y-1 rounded-xl bg-surface p-3 shadow-overlay">
            {USE_CASES_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={navigate}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span className="block text-sm font-medium text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
