import React from 'react';
import { SOCIAL_PROOF, type SocialProofPerson } from '@/src/content/socialProof';

/** A row of avatars with role labels under the hero. Nothing until real people are listed. */
export const SocialProofStrip = ({ people = SOCIAL_PROOF }: { people?: SocialProofPerson[] }) => {
  if (people.length === 0) return null;
  return (
    <section aria-label="PMs who use Prodlog" className="px-4 pb-12">
      <ul className="mx-auto flex max-w-4xl flex-wrap items-start justify-center gap-6">
        {people.map((person) => (
          <li key={person.name} className="flex w-28 flex-col items-center text-center">
            <img src={person.avatar} alt="" className="h-12 w-12 rounded-full border border-border object-cover" />
            <p className="mt-2 text-meta font-medium text-ink">{person.name}</p>
            <p className="text-meta text-muted-foreground">{person.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
