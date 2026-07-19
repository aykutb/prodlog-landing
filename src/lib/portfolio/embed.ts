// Embed provider registry and URL resolution for the Embed bento card.
// Copied verbatim from the dashboard app (prodlog2 src/lib/embed.ts) — the
// public portfolio renders on prodlog.app, which is exactly the origin this
// allowlist protects. Keep the two files in sync.
//
// Security model: portfolio pages render on the prodlog.app origin, so the
// iframe src can never be attacker-controlled. The only user input is a URL.
// It is parsed with the URL constructor and matched by exact hostname (or a
// dot-anchored suffix for providers with per-account subdomains) — never by
// substring or regex on the raw string. Embed URLs are rebuilt here from
// validated, extracted path segments; the raw input never reaches an iframe.
// Anything that fails to match renders as a plain link card instead.

export const MAX_EMBED_CARDS = 3;
export const EMBED_TITLE_MAX_LENGTH = 60;
export const EMBED_CAPTION_MAX_LENGTH = 120;

export interface EmbedProvider {
  id: string;
  name: string;
  /** What the editor shows when a URL resolves, e.g. "Figma file or prototype" */
  resolveLabel: string;
  /** Provider homepage, used only to render its favicon in supported-site hints */
  siteUrl: string;
  /** Exact hostname matches (no subdomain wildcarding) */
  hostnames: string[];
  /** Dot-anchored suffixes for providers with per-account subdomains, e.g. ".notion.site" */
  hostnameSuffixes?: string[];
  /** CSS aspect-ratio for the embed container */
  aspectRatio: string;
  /** iframe allow attribute; empty string means no feature grants */
  allow: string;
  /** iframe referrerpolicy; defaults to 'no-referrer'. Only relax when a
   *  provider refuses to play without a referer, and never beyond 'origin'. */
  referrerPolicy?: 'no-referrer' | 'origin';
  /** Build the embed src from the parsed URL; null when the path isn't embeddable */
  toEmbedUrl: (url: URL) => string | null;
}

const FIGMA_PATH_TYPES: Record<string, string> = {
  file: 'design', // legacy /file/ URLs map to the Embed Kit 2.0 /design/ endpoint
  design: 'design',
  proto: 'proto',
  board: 'board',
  slides: 'slides',
  deck: 'deck',
};

const ID_PATTERN = /^[A-Za-z0-9_-]+$/;

const pathSegments = (url: URL): string[] => url.pathname.split("/").filter(Boolean);

export const EMBED_PROVIDERS: EmbedProvider[] = [
  {
    id: 'figma',
    siteUrl: 'https://www.figma.com',
    name: 'Figma',
    resolveLabel: 'Figma file or prototype',
    hostnames: ['figma.com', 'www.figma.com'],
    aspectRatio: '16 / 9',
    allow: 'fullscreen',
    toEmbedUrl: (url) => {
      const [kind, key] = pathSegments(url);
      const embedKind = kind ? FIGMA_PATH_TYPES[kind] : undefined;
      if (!embedKind || !key || !/^[A-Za-z0-9]+$/.test(key)) return null;
      const nodeId = url.searchParams.get('node-id');
      const nodeParam = nodeId && /^[0-9:-]+$/.test(nodeId)
        ? `&node-id=${encodeURIComponent(nodeId)}`
        : '';
      return `https://embed.figma.com/${embedKind}/${key}?embed-host=prodlog${nodeParam}`;
    },
  },
  {
    id: 'loom',
    siteUrl: 'https://www.loom.com',
    name: 'Loom',
    resolveLabel: 'Loom video',
    hostnames: ['loom.com', 'www.loom.com'],
    aspectRatio: '16 / 9',
    allow: 'fullscreen',
    toEmbedUrl: (url) => {
      const [kind, id] = pathSegments(url);
      if ((kind !== 'share' && kind !== 'embed') || !id || !/^[a-f0-9]+$/.test(id)) return null;
      return `https://www.loom.com/embed/${id}`;
    },
  },
  {
    id: 'youtube',
    siteUrl: 'https://www.youtube.com',
    name: 'YouTube',
    resolveLabel: 'YouTube video',
    hostnames: ['youtube.com', 'www.youtube.com', 'youtu.be'],
    aspectRatio: '16 / 9',
    allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
    // YouTube's player rejects embeds without a referer (Error 153); 'origin'
    // sends only the site origin, never the page URL
    referrerPolicy: 'origin',
    toEmbedUrl: (url) => {
      const segments = pathSegments(url);
      let videoId: string | null = null;
      if (url.hostname === 'youtu.be') {
        videoId = segments[0] ?? null;
      } else if (segments[0] === 'watch') {
        videoId = url.searchParams.get('v');
      } else if (['shorts', 'embed', 'live'].includes(segments[0])) {
        videoId = segments[1] ?? null;
      }
      if (!videoId || !/^[A-Za-z0-9_-]{5,20}$/.test(videoId)) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
  {
    id: 'miro',
    siteUrl: 'https://miro.com',
    name: 'Miro',
    resolveLabel: 'Miro board',
    hostnames: ['miro.com', 'www.miro.com'],
    aspectRatio: '16 / 9',
    allow: 'fullscreen',
    toEmbedUrl: (url) => {
      const [app, kind, boardId] = pathSegments(url);
      if (app !== 'app' || (kind !== 'board' && kind !== 'live-embed')) return null;
      if (!boardId || !/^[A-Za-z0-9_=-]+$/.test(boardId)) return null;
      return `https://miro.com/app/live-embed/${encodeURIComponent(boardId)}/?embedMode=view_only_without_ui`;
    },
  },
  {
    id: 'notion',
    siteUrl: 'https://www.notion.com',
    name: 'Notion',
    resolveLabel: 'Notion page',
    hostnames: ['notion.site'],
    hostnameSuffixes: ['.notion.site'],
    aspectRatio: '4 / 3',
    allow: '',
    toEmbedUrl: (url) => {
      // Public notion.site pages are directly embeddable; rebuild from parsed parts
      const segments = pathSegments(url);
      if (segments.length === 0) return null;
      if (!segments.every((s) => ID_PATTERN.test(s))) return null;
      return `https://${url.hostname}/${segments.join("/")}`;
    },
  },
  {
    id: 'codesandbox',
    siteUrl: 'https://codesandbox.io',
    name: 'CodeSandbox',
    resolveLabel: 'CodeSandbox sandbox',
    hostnames: ['codesandbox.io'],
    aspectRatio: '4 / 3',
    allow: 'fullscreen',
    toEmbedUrl: (url) => {
      const segments = pathSegments(url);
      let sandboxId: string | null = null;
      if (segments[0] === 's' || segments[0] === 'embed') {
        sandboxId = segments[1] ?? null;
      } else if (segments[0] === 'p' && segments[1] === 'sandbox') {
        sandboxId = segments[2] ?? null;
      }
      if (!sandboxId || !ID_PATTERN.test(sandboxId)) return null;
      return `https://codesandbox.io/embed/${sandboxId}`;
    },
  },
  {
    id: 'typeform',
    siteUrl: 'https://www.typeform.com',
    name: 'Typeform',
    resolveLabel: 'Typeform form',
    hostnames: [],
    hostnameSuffixes: ['.typeform.com'],
    aspectRatio: '4 / 3',
    allow: '',
    toEmbedUrl: (url) => {
      const [to, formId] = pathSegments(url);
      if (to !== 'to' || !formId || !/^[A-Za-z0-9]+$/.test(formId)) return null;
      return `https://${url.hostname}/to/${encodeURIComponent(formId)}`;
    },
  },
];

export type ResolvedEmbed =
  | { provider: EmbedProvider; embedUrl: string }
  | { provider: 'link' };

/** Parse and resolve a user-supplied URL. Returns null when the input isn't a
 *  valid http(s) URL at all; 'link' when it's a URL we won't embed. */
export function resolveEmbed(raw: string): ResolvedEmbed | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (url.protocol !== 'https:') return { provider: 'link' };

  const provider = EMBED_PROVIDERS.find(
    (p) =>
      p.hostnames.includes(url.hostname) ||
      (p.hostnameSuffixes ?? []).some((suffix) => url.hostname.endsWith(suffix))
  );
  if (!provider) return { provider: 'link' };

  const embedUrl = provider.toEmbedUrl(url);
  if (!embedUrl) return { provider: 'link' };
  return { provider, embedUrl };
}

export const getEmbedProvider = (id: string): EmbedProvider | undefined =>
  EMBED_PROVIDERS.find((p) => p.id === id);

/** Hostname for the link-card presentation; null when the stored URL is unusable. */
export function safeLinkParts(raw: string): { href: string; hostname: string } | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  return { href: url.href, hostname: url.hostname };
}
