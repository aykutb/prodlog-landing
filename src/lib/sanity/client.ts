import { createClient } from 'next-sanity';
import { apiVersion, assertSanityConfig, dataset, projectId } from '@/sanity/env';

export function getSanityClient() {
  assertSanityConfig();
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}
