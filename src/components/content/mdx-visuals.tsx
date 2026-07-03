import React from 'react';

type ImagePlaceholderProps = {
  label: string;
  caption: string;
  src?: string;
  alt?: string;
};

export function ImagePlaceholder({ label, caption, src, alt }: ImagePlaceholderProps) {
  if (src) {
    return (
      <figure className="not-prose my-8">
        <img
          src={src}
          alt={alt ?? label}
          className="w-full rounded-xl border border-divider shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)]"
        />
        <figcaption className="mt-2 text-xs text-muted text-center leading-relaxed">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="not-prose my-8">
      <div className="aspect-[16/10] rounded-xl border-2 border-dashed border-divider bg-white flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-muted text-lg">
          🖼
        </div>
        <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">
          Image placeholder
        </div>
        <div className="text-primary font-medium text-sm">{label}</div>
        <p className="text-muted text-xs max-w-md leading-relaxed">{caption}</p>
      </div>
    </figure>
  );
}

type BragExampleAccent = 'metric' | 'process' | 'deprioritize';

type BragExampleCardProps = {
  title: string;
  date: string;
  initiative: string;
  role: string;
  collaborators: string;
  outcome: string;
  notes: string;
  accent?: BragExampleAccent;
};

const accentStyles: Record<BragExampleAccent, string> = {
  metric: 'border-sage-green/50 bg-sage-green/5',
  process: 'border-warm-amber/50 bg-warm-amber/5',
  deprioritize: 'border-muted-plum/50 bg-muted-plum/5',
};

const accentBadge: Record<BragExampleAccent, string> = {
  metric: 'bg-sage-green/15 text-sage-green border-sage-green/30',
  process: 'bg-warm-amber/15 text-warm-amber border-warm-amber/30',
  deprioritize: 'bg-muted-plum/15 text-muted-plum border-muted-plum/30',
};

function ExampleField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">
        {label}
      </dt>
      <dd className="text-secondary text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export function BragExampleCard({
  title,
  date,
  initiative,
  role,
  collaborators,
  outcome,
  notes,
  accent = 'metric',
}: BragExampleCardProps) {
  return (
    <article
      className={`flex-shrink-0 snap-center w-[min(88vw,320px)] md:w-auto md:min-w-0 rounded-xl border p-5 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.08)] ${accentStyles[accent]}`}
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        <h3 className="text-primary font-semibold text-sm leading-snug">{title}</h3>
        <span
          className={`shrink-0 text-[10px] px-2 py-0.5 rounded border font-medium ${accentBadge[accent]}`}
        >
          {date}
        </span>
      </div>
      <dl className="space-y-3">
        <ExampleField label="Initiative" value={initiative} />
        <ExampleField label="Role" value={role} />
        <ExampleField label="Collaborators" value={collaborators} />
        <ExampleField label="Outcome" value={outcome} />
        <ExampleField label="Notes" value={notes} />
      </dl>
    </article>
  );
}

type BragExamplesGridProps = {
  children: React.ReactNode;
};

export function BragExamplesGrid({ children }: BragExamplesGridProps) {
  return (
    <div className="not-prose my-6 -mx-2 md:mx-0">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-2 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
        {children}
      </div>
      <p className="mt-3 text-xs text-muted text-center md:hidden">
        Swipe to see more examples →
      </p>
    </div>
  );
}

type NotComparisonAccent = 'resume' | 'journal' | 'review';

type NotComparisonCardProps = {
  label: string;
  description: string;
  accent?: NotComparisonAccent;
};

const notComparisonStyles: Record<
  NotComparisonAccent,
  { border: string; bg: string; icon: string }
> = {
  resume: {
    border: 'border-sage-green/50',
    bg: 'bg-sage-green/5',
    icon: '/icons/portfolio.svg',
  },
  journal: {
    border: 'border-warm-amber/50',
    bg: 'bg-warm-amber/5',
    icon: '/icons/log.svg',
  },
  review: {
    border: 'border-muted-plum/50',
    bg: 'bg-muted-plum/5',
    icon: '/icons/summaries.svg',
  },
};

export function NotComparisonSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8">
      <h3 className="serif-headline text-xl md:text-2xl text-primary text-center mb-8 leading-tight">
        A brag document is not a
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-2">
        {children}
      </div>
    </div>
  );
}

export function NotComparisonCard({
  label,
  description,
  accent = 'resume',
}: NotComparisonCardProps) {
  const styles = notComparisonStyles[accent];

  return (
    <article
      className={`relative pt-8 pb-5 px-5 border-2 ${styles.border} rounded-xl ${styles.bg} text-center hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all`}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-soft-canvas rounded-full p-1.5">
        <img src={styles.icon} alt="" className="w-full h-full object-contain" />
      </div>
      <h4 className="text-primary font-semibold text-base mb-3">{label}</h4>
      <p className="text-secondary text-sm leading-relaxed text-left">{description}</p>
    </article>
  );
}

function StepConnector() {
  return (
    <div className="flex flex-col items-center py-1 min-h-[1.75rem] flex-1" aria-hidden="true">
      <div className="w-px flex-1 min-h-[0.75rem] bg-gradient-to-b from-deep-ink-blue/50 to-divider" />
      <svg
        className="h-3.5 w-3.5 shrink-0 text-deep-ink-blue/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <div className="w-px flex-1 min-h-[0.75rem] bg-divider" />
    </div>
  );
}

type ProcessStepProps = {
  title: string;
  children?: React.ReactNode;
  step?: number;
  isLast?: boolean;
};

export function ProcessStep({ title, children, step, isLast = false }: ProcessStepProps) {
  return (
    <li className="flex gap-4 md:gap-5">
      <div className="flex w-10 shrink-0 flex-col items-center">
        <div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-deep-ink-blue text-sm font-semibold text-white shadow-[0_2px_8px_-2px_rgba(31,42,68,0.35)]"
          aria-hidden={step !== undefined ? undefined : true}
        >
          {step !== undefined ? (
            <span>{step}</span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-white" />
          )}
        </div>
        {!isLast && <StepConnector />}
      </div>

      <article
        className={`min-w-0 flex-1 rounded-xl border border-divider bg-white p-5 shadow-[0_4px_20px_-5px_rgba(31,42,68,0.08)] ${isLast ? '' : 'mb-2'}`}
      >
        <h3 className="text-primary text-base font-semibold leading-snug">{title}</h3>
        {children && (
          <div className="process-step-body mt-3 text-secondary text-sm leading-relaxed [&_p]:m-0 [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:mt-2 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_a]:text-deep-ink-blue [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        )}
      </article>
    </li>
  );
}

type ProcessStepsProps = {
  children: React.ReactNode;
};

export function ProcessSteps({ children }: ProcessStepsProps) {
  const steps = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <ol className="not-prose my-8 list-none p-0">
      {steps.map((child, index) =>
        React.cloneElement(child as React.ReactElement<ProcessStepProps>, {
          key: child.key ?? `step-${index + 1}`,
          step: index + 1,
          isLast: index === steps.length - 1,
        }),
      )}
    </ol>
  );
}
