/**
 * People who use Prodlog, for the strip under the homepage hero. It renders
 * nothing while this list is empty. Add only real people, with permission,
 * and an avatar in public/social-proof/. Tracked in docs/landing-log-first.md (2.8).
 */
export interface SocialProofPerson {
  name: string;
  /** "Senior PM, fintech" */
  role: string;
  /** Path under public/, e.g. "/social-proof/jane.jpg". */
  avatar: string;
}

export const SOCIAL_PROOF: SocialProofPerson[] = [];
