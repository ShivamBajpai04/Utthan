import type { QueryParams } from 'next-sanity';

import { client } from './client';

/**
 * Server-side Sanity fetch helper with sensible Next.js caching defaults.
 *
 * - Uses ISR-style `revalidate` (default: 60s) so CMS edits surface within
 *   a minute without refetching on every request.
 * - Supports Next.js cache tags for instant invalidation via `revalidateTag()`
 *   if a Sanity webhook is configured later.
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
      revalidate,
      tags,
    },
  });
}
