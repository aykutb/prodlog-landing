/**
 * The hero's left column and its frame are separate components (the copy
 * is server-rendered), so "Paste your notes" reaches the paste box through
 * one window event. LedgerHero listens while its scene is on the page.
 */
export const HERO_TAKEOVER_EVENT = 'prodlog:hero-takeover';

export const requestHeroTakeover = () => window.dispatchEvent(new Event(HERO_TAKEOVER_EVENT));
