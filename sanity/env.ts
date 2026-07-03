export const apiVersion = '2025-01-01';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';

export function assertSanityConfig(): void {
  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local — see .env.example.',
    );
  }
}
