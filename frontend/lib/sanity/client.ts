import { createClient } from 'next-sanity';

import { env } from '@/lib/env';

export const client = createClient({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: env.sanity.apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: { enabled: false },
});
