import type { PreviewEntry } from '@/src/components/ui';

// Pre-baked demo content shared by the homepage Outputs tabs and the static
// version on /how-it-works. The same three entries as BringTheMess, a few
// weeks on: the scope call has its outcome filled in now.
export const SOURCE_ENTRIES: PreviewEntry[] = [
  {
    date: 'Mar 12, 2026',
    title: 'Shipped the onboarding redesign',
    ownership: 'Led',
    outcome: 'Activation up 9% in four weeks',
    missingOutcome: false,
  },
  {
    date: 'Mar 2026',
    title: 'Killed the loyalty feature',
    ownership: 'Decided',
    outcome: 'Freed an eng pod for the bug backlog',
    missingOutcome: false,
  },
  {
    date: 'Mar 19, 2026',
    title: 'Scope call with Maya',
    ownership: 'Coached',
    outcome: 'Cut v1 scope by a third, kept the date',
    missingOutcome: false,
  },
];

export const REVIEW_PARAGRAPH =
  'In Q1 I led the onboarding redesign through two scope cuts and shipped it in March; activation is up 9% in the four weeks since. The harder call was killing the loyalty feature after discovery came back flat, which freed an eng pod for the bug backlog mid-quarter. I also coached Maya through the enterprise scope call, where we cut v1 by a third and kept the committed date.';

export const RECRUITER_BULLETS = [
  'Led an onboarding redesign that lifted activation 9% within four weeks of launch.',
  'Killed a loyalty feature that discovery showed was flat, and moved a full eng pod onto the bug backlog.',
  'Coached a junior PM through an enterprise scope negotiation: v1 cut by a third, date kept.',
];

export const RESUME_BULLETS = [
  'Led onboarding redesign; activation +9% in 4 weeks.',
  'Killed flat loyalty feature; recovered one eng pod.',
  'Cut enterprise v1 scope by a third with no date slip.',
];

export const STAR_STORY = [
  {
    label: 'Situation',
    text: 'Loyalty had been on the roadmap for two quarters and leadership expected it to ship.',
  },
  {
    label: 'Task',
    text: 'Decide whether to build it anyway or walk it back, with discovery coming back flat.',
  },
  {
    label: 'Action',
    text: 'Rebuilt the retention model with the data team, presented the kill case to leadership, and redirected the pod to the bug backlog the same week.',
  },
  {
    label: 'Result',
    text: 'Saved a quarter of eng time, cleared 40% of the bug backlog, and the call held up in the next planning cycle.',
  },
];
