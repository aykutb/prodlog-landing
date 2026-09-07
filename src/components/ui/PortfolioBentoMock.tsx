import React from 'react';

// Small-scale bento grid, shared by the homepage portfolio section and
// /how-it-works step 04. Real card type names from prodlog2's cardRegistry
// (available only, no coming-soon); the sample content inside is illustrative
// and continues the loyalty-feature story running through the site.
const Tile = ({
  label,
  span,
  children,
}: {
  label: string;
  span?: string;
  children: React.ReactNode;
}) => (
  <div className={`bg-white border border-divider rounded-lg p-3 min-w-0 ${span ?? ''}`}>
    <p className="text-[9px] text-muted uppercase tracking-wider mb-1.5">{label}</p>
    {children}
  </div>
);

const SkillRow = ({ name, level }: { name: string; level: number }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-[10px] text-primary truncate">{name}</span>
    <span className="flex gap-0.5 shrink-0" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-2.5 h-1.5 rounded-sm ${i < level ? 'bg-deep-ink-blue/70' : 'bg-divider'}`}
        />
      ))}
    </span>
  </div>
);

const HEATMAP_ON = [1, 4, 6, 9, 12, 13, 17, 20, 24, 26];
const HEATMAP_DIM = [2, 8, 15, 19, 22, 27];

export type BentoCardName =
  | 'Decision'
  | 'Contributions'
  | 'Kill'
  | 'Skills Matrix'
  | 'Writing'
  | 'Tradeoff';

const ALL_CARDS: BentoCardName[] = [
  'Decision',
  'Contributions',
  'Kill',
  'Skills Matrix',
  'Writing',
  'Tradeoff',
];

// `cards` picks which tiles render. Defaults to all six so /how-it-works
// step 04 is unaffected; the homepage passes a shorter list.
export const PortfolioBentoMock = ({ cards = ALL_CARDS }: { cards?: BentoCardName[] }) => (
  <div className="grid grid-cols-3 gap-2 md:gap-2.5" aria-hidden="true">
    {cards.includes('Decision') && (
      <Tile label="Decision" span="col-span-2">
        <p className="text-primary text-xs font-medium font-serif leading-snug">
          Cut v1 scope to keep the date
        </p>
        <p className="text-muted text-[10px] mt-1 truncate">Enterprise onboarding · Mar 2026</p>
      </Tile>
    )}

    {cards.includes('Contributions') && (
      <Tile label="Contributions">
        <div className="grid grid-cols-7 gap-0.5 w-fit">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-[2px] ${
                HEATMAP_ON.includes(i)
                  ? 'bg-sage-green'
                  : HEATMAP_DIM.includes(i)
                    ? 'bg-sage-green/40'
                    : 'bg-divider'
              }`}
            />
          ))}
        </div>
      </Tile>
    )}

    {cards.includes('Kill') && (
      <Tile label="Kill">
        <p className="text-primary text-xs font-medium font-serif leading-snug">Loyalty v2</p>
        <span className="inline-block text-[9px] px-1.5 py-0.5 mt-1.5 rounded bg-warm-amber/10 text-warm-amber border border-warm-amber/20">
          Killed at discovery
        </span>
      </Tile>
    )}

    {cards.includes('Skills Matrix') && (
      <Tile label="Skills Matrix" span="col-span-2">
        <div className="space-y-1.5">
          <SkillRow name="Discovery" level={4} />
          <SkillRow name="Stakeholder alignment" level={3} />
          <SkillRow name="Pricing" level={2} />
        </div>
      </Tile>
    )}

    {cards.includes('Writing') && (
      <Tile label="Writing" span="col-span-2">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-10 shrink-0 rounded bg-deep-ink-blue/10 flex items-center justify-center text-[10px] font-semibold text-deep-ink-blue font-serif">
            W
          </span>
          <div className="min-w-0">
            <p className="text-primary text-xs font-medium font-serif truncate">
              Why we killed loyalty v2
            </p>
            <p className="text-muted text-[10px] mt-0.5">Published · 6 min read</p>
          </div>
        </div>
      </Tile>
    )}

    {cards.includes('Tradeoff') && (
      <Tile label="Tradeoff">
        <p className="text-[10px] leading-snug">
          <span className="text-sage-green font-medium">Chose</span>{' '}
          <span className="text-primary">3 markets</span>
        </p>
        <p className="text-[10px] leading-snug mt-1">
          <span className="text-muted font-medium">Passed</span>{' '}
          <span className="text-muted">all 12</span>
        </p>
      </Tile>
    )}
  </div>
);
