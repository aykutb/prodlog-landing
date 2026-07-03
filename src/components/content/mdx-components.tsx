import React from 'react';
import Link from 'next/link';
import { CTASection } from '@/src/components/ui';
import {
  BragExampleCard,
  BragExamplesGrid,
  ImagePlaceholder,
  NotComparisonCard,
  NotComparisonSection,
  ProcessStep,
  ProcessSteps,
} from '@/src/components/content/mdx-visuals';

type MdxLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function MdxLink({ href, children, ...props }: MdxLinkProps) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={props.className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group bg-white border border-divider rounded-lg overflow-hidden transition-colors open:border-deep-ink-blue/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-primary font-medium text-sm md:text-base [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <svg
          className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="border-t border-divider px-5 pb-5 pt-4">
        <p className="text-secondary text-sm md:text-base leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

type FAQSectionProps = {
  children: React.ReactNode;
};

export function FAQSection({ children }: FAQSectionProps) {
  return <div className="space-y-3 not-prose my-6">{children}</div>;
}

type TemplateDownloadCTAProps = {
  href?: string;
  download?: string;
  children?: React.ReactNode;
};

export function TemplateDownloadCTA({
  href = '/downloads/pm-brag-document-template',
  download = 'pm-brag-document-template.docx',
  children = 'Download the free template',
}: TemplateDownloadCTAProps) {
  return (
    <div className="not-prose my-6">
      <a
        href={href}
        download={download}
        className="inline-block bg-deep-ink-blue !text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all no-underline mdx-btn-primary"
      >
        {children}
      </a>
    </div>
  );
}

type ArticleCTAProps = {
  message?: string;
  showPricing?: boolean;
};

export function ArticleCTA({
  message = 'Start logging your wins in Prodlog — free, takes 30 seconds, no credit card.',
  showPricing = true,
}: ArticleCTAProps) {
  return (
    <div className="not-prose border-t border-divider pt-12 mt-12 text-center">
      <p className="text-secondary text-base leading-relaxed mb-6 max-w-xl mx-auto">{message}</p>
      <CTASection centered showSecondary />
      {showPricing && (
        <p className="mt-4 text-sm">
          <Link
            href="/pricing"
            className="text-deep-ink-blue underline hover:opacity-80"
          >
            Compare free and paid plans
          </Link>
        </p>
      )}
    </div>
  );
}

export const mdxComponents = {
  a: MdxLink,
  FAQSection,
  FAQItem,
  TemplateDownloadCTA,
  ArticleCTA,
  ImagePlaceholder,
  BragExampleCard,
  BragExamplesGrid,
  NotComparisonSection,
  NotComparisonCard,
  ProcessSteps,
  ProcessStep,
};
