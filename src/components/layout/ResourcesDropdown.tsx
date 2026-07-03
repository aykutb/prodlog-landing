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
  sage: 'bg-sage-green/12 border-sage-green/25',
  plum: 'bg-muted-plum/12 border-muted-plum/25',
  amber: 'bg-warm-amber/12 border-warm-amber/25',
  ink: 'bg-deep-ink-blue/8 border-deep-ink-blue/15',
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
    <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
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
      className={`group flex items-start gap-3 rounded-xl border border-transparent ${itemPadding} transition-all hover:border-divider hover:bg-charcoal/35 hover:shadow-[0_4px_16px_-6px_rgba(31,42,68,0.12)]`}
    >
      <div className={`${iconBoxClass} ${accentStyles[accent]}`}>
        {item.icon && <img src={item.icon} alt="" className="h-5 w-5 object-contain" />}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-primary transition-colors group-hover:text-deep-ink-blue">
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.description}</p>
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
      className={`group flex items-start gap-3 rounded-xl border border-transparent ${itemPadding} transition-all hover:border-divider hover:bg-charcoal/35`}
    >
      <div
        className={`${iconBoxClass} border-divider bg-charcoal/50 text-muted transition-colors group-hover:border-deep-ink-blue/20 group-hover:text-deep-ink-blue`}
      >
        <HubIcon type={item.hubIcon} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-primary group-hover:text-deep-ink-blue">
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.description}</p>
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

  useEffect(() => {
    if (variant !== 'desktop') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setCompareOpen(false);
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
      setCompareOpen(false);
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
      <div className="border-b border-divider">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between px-6 py-4 text-left text-base transition-colors ${
            isActive
              ? 'bg-charcoal/30 font-medium text-primary'
              : 'text-muted hover:bg-charcoal/20 hover:text-primary'
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
                  className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all hover:border-divider hover:bg-charcoal/35"
                  aria-expanded={compareOpen}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-divider bg-charcoal/50 text-muted group-hover:text-deep-ink-blue">
                    <CompareIcon />
                  </div>
                  <span className="flex-1 text-sm font-medium text-primary">Compare</span>
                  <ChevronRight
                    className={`h-4 w-4 text-muted transition-transform ${compareOpen ? 'rotate-90' : ''}`}
                  />
                </button>
                {compareOpen && (
                  <div className="ml-11 mt-1 space-y-0.5 border-l border-divider pl-3">
                    <Link
                      href={COMPARE_HUB.href}
                      className="block rounded-lg py-2 pr-2 text-sm text-muted transition-colors hover:text-primary"
                      onClick={handleLinkClick}
                    >
                      All comparisons
                    </Link>
                    {compareNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg py-2 pr-2 text-sm text-muted transition-colors hover:text-primary"
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
        hoverOpenRef.current = true;
        setIsOpen(true);
      }}
      onMouseLeave={(e) => {
        const next = e.relatedTarget;
        if (next instanceof Node && containerRef.current?.contains(next)) {
          return;
        }
        hoverOpenRef.current = false;
        setIsOpen(false);
        setCompareOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsOpen(false);
          setCompareOpen(false);
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
            setIsOpen(true);
          } else if (hoverOpenRef.current) {
            hoverOpenRef.current = false;
          } else {
            setIsOpen(false);
            setCompareOpen(false);
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
          <div className="w-[560px] overflow-visible rounded-2xl border border-divider bg-white p-6 shadow-[0_24px_60px_-16px_rgba(31,42,68,0.22)]">
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

                <div
                  className="relative"
                  onMouseEnter={() => setCompareOpen(true)}
                  onMouseLeave={() => setCompareOpen(false)}
                  onFocus={() => setCompareOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setCompareOpen(false);
                    }
                  }}
                >
                  <Link
                    href={COMPARE_HUB.href}
                    onClick={handleLinkClick}
                    className={`group flex items-start gap-3 rounded-xl border ${itemPadding} transition-all ${
                      compareOpen
                        ? 'border-deep-ink-blue/20 bg-charcoal/40'
                        : 'border-transparent hover:border-divider hover:bg-charcoal/35'
                    }`}
                  >
                    <div
                      className={`${iconBoxClass} transition-colors ${
                        compareOpen
                          ? 'border-deep-ink-blue/25 bg-deep-ink-blue/8 text-deep-ink-blue'
                          : 'border-divider bg-charcoal/50 text-muted group-hover:text-deep-ink-blue'
                      }`}
                    >
                      <CompareIcon />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-primary">Compare</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        Prodlog vs alternatives
                      </p>
                    </div>
                    <ChevronRight
                      className={`mt-2.5 h-4 w-4 shrink-0 rotate-180 transition-all ${
                        compareOpen ? '-translate-x-0.5 text-deep-ink-blue' : 'text-muted'
                      }`}
                    />
                  </Link>

                  {compareOpen && compareNavItems.length > 0 && (
                    <div className="absolute right-full top-0 z-50 flex items-stretch">
                      <div className="min-w-[240px] overflow-hidden rounded-xl border border-divider bg-white py-2 shadow-[0_16px_40px_-12px_rgba(31,42,68,0.2)]">
                        <Link
                          href={COMPARE_HUB.href}
                          onClick={handleLinkClick}
                          className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:bg-charcoal/40 hover:text-primary"
                        >
                          All comparisons
                        </Link>
                        <div className="mx-3 border-t border-divider" />
                        {compareNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="block px-4 py-2.5 text-sm text-secondary transition-colors hover:bg-charcoal/40 hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      {/* Invisible bridge so the cursor can reach the flyout without closing */}
                      <div className="w-4 shrink-0" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
