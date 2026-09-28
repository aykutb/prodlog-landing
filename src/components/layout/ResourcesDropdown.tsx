'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  COMPARE_HUB,
  HUBS_NAV,
  PILLARS_NAV,
  type HubNavItem,
  type ResourceNavItem,
} from '@/src/navigation/resourcesNav';
import type { NavItem } from '@/src/lib/content';

interface ResourcesDropdownProps {
  isActive: boolean;
  linkClassName: string;
  compareNavItems: NavItem[];
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

const accentStyles: Record<NonNullable<ResourceNavItem['accent']>, string> = {
  sage: 'bg-sage/12 border-sage/25',
  plum: 'bg-mauve/12 border-mauve/25',
  amber: 'bg-mustard/12 border-mustard/25',
  ink: 'bg-ink/8 border-ink/15',
};

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function HubIcon({ type }: { type: HubNavItem['hubIcon'] }) {
  if (type === 'templates') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  );
}

const itemPadding = 'p-3';
const iconBoxClass =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border';

function GuideCard({
  item,
  onNavigate,
}: {
  item: ResourceNavItem;
  onNavigate: () => void;
}) {
  const accent = item.accent ?? 'ink';

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl border border-transparent ${itemPadding} transition-all hover:border-border hover:bg-muted/35`}
    >
      <div className={`${iconBoxClass} ${accentStyles[accent]}`}>
        {item.icon && <img src={item.icon} alt="" className="h-5 w-5 object-contain" />}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-ink transition-colors group-hover:text-ink">
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
        )}
      </div>
    </Link>
  );
}

function HubRow({
  item,
  onNavigate,
}: {
  item: HubNavItem;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl border border-transparent ${itemPadding} transition-all hover:border-border hover:bg-muted/35`}
    >
      <div
        className={`${iconBoxClass} border-border bg-muted/50 text-muted-foreground transition-colors group-hover:border-ink/20 group-hover:text-ink`}
      >
        <HubIcon type={item.hubIcon} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-ink group-hover:text-ink">
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
        )}
      </div>
    </Link>
  );
}

export const ResourcesDropdown = ({
  isActive,
  linkClassName,
  compareNavItems,
  onNavigate,
  variant = 'desktop',
}: ResourcesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Tracks whether the menu was opened by hover, so the click that usually
  // follows a hover doesn't immediately toggle it closed.
  const hoverOpenRef = useRef(false);
  // Short open delay so cursor travel across the nav doesn't flash the menu.
  const hoverTimerRef = useRef<number | null>(null);

  const cancelHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  useEffect(() => cancelHoverTimer, []);

  useEffect(() => {
    if (variant !== 'desktop') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  useEffect(() => {
    if (variant !== 'desktop' || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [variant, isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setCompareOpen(false);
    onNavigate?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between px-6 py-4 text-left text-base transition-colors ${
            isActive
              ? 'bg-muted/30 font-medium text-ink'
              : 'text-muted-foreground hover:bg-muted/20 hover:text-ink'
          }`}
          aria-expanded={isOpen}
        >
          Resources
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="space-y-1 pb-3">
            <div className="px-4">
              <SectionLabel>Guides</SectionLabel>
            </div>
            <div className="space-y-1 px-4">
              {PILLARS_NAV.map((item) => (
                <GuideCard key={item.href} item={item} onNavigate={handleLinkClick} />
              ))}
            </div>

            <div className="px-4 pt-2">
              <SectionLabel>Explore</SectionLabel>
            </div>
            <div className="space-y-1 px-4">
              {HUBS_NAV.map((item) => (
                <HubRow key={item.href} item={item} onNavigate={handleLinkClick} />
              ))}

              <div className="rounded-xl border border-transparent">
                <button
                  type="button"
                  onClick={() => setCompareOpen(!compareOpen)}
                  className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all hover:border-border hover:bg-muted/35"
                  aria-expanded={compareOpen}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground group-hover:text-ink">
                    <CompareIcon />
                  </div>
                  <span className="flex-1 text-sm font-medium text-ink">Compare</span>
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground transition-transform ${compareOpen ? 'rotate-90' : ''}`}
                  />
                </button>
                {compareOpen && (
                  <div className="ml-11 mt-1 space-y-0.5 border-l border-border pl-3">
                    <Link
                      href={COMPARE_HUB.href}
                      className="block rounded-lg py-2 pr-2 text-sm text-muted-foreground transition-colors hover:text-ink"
                      onClick={handleLinkClick}
                    >
                      All comparisons
                    </Link>
                    {compareNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg py-2 pr-2 text-sm text-muted-foreground transition-colors hover:text-ink"
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelHoverTimer();
        hoverTimerRef.current = window.setTimeout(() => {
          hoverTimerRef.current = null;
          hoverOpenRef.current = true;
          setIsOpen(true);
        }, 120);
      }}
      onMouseLeave={(e) => {
        cancelHoverTimer();
        const next = e.relatedTarget;
        if (next instanceof Node && containerRef.current?.contains(next)) {
          return;
        }
        hoverOpenRef.current = false;
        setIsOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${linkClassName} inline-flex items-center gap-1`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => {
          if (!isOpen) {
            cancelHoverTimer();
            setIsOpen(true);
          } else if (hoverOpenRef.current) {
            hoverOpenRef.current = false;
          } else {
            setIsOpen(false);
          }
        }}
      >
        Resources
        <svg
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="w-[560px] overflow-visible rounded-xl bg-surface p-6 shadow-overlay">
            <div className="grid grid-cols-2 gap-x-14">
              <div className="space-y-2">
                <SectionLabel>Guides</SectionLabel>
                {PILLARS_NAV.map((item) => (
                  <GuideCard key={item.href} item={item} onNavigate={handleLinkClick} />
                ))}
              </div>

              <div className="space-y-2">
                <SectionLabel>Explore</SectionLabel>
                {HUBS_NAV.map((item) => (
                  <HubRow key={item.href} item={item} onNavigate={handleLinkClick} />
                ))}

              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="flex items-center gap-2 pr-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <CompareIcon />
                Compare
              </span>
              {compareNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ink/25 hover:bg-muted/50 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={COMPARE_HUB.href}
                onClick={handleLinkClick}
                className="ml-auto text-xs font-medium text-muted-foreground transition-colors hover:text-ink"
              >
                All comparisons →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
