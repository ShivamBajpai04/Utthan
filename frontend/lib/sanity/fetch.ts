import type { QueryParams } from 'next-sanity';

import { client } from './client';

/**
 * Server-side Sanity fetch helper with sensible Next.js caching defaults.
 *
 * - Uses ISR-style `revalidate` (default: 60s) so CMS edits surface quickly
 *   without refetching on every request.
 * - Supports Next.js cache tags so pages/APIs can call `revalidateTag()`
 *   from a Sanity webhook for instant invalidation.
 */
export type SanityFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export async function sanityFetch<QueryResponse>({
  query,
  params,
  revalidate = 60,
  tags,
}: {
  query: string;
  params?: QueryParams;
} & SanityFetchOptions): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params ?? {}, {
    next: {
      revalidate: tags && tags.length > 0 ? false : revalidate,
      tags,
    },
  });
}
