import type { MetadataRoute } from 'next';

import { env } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Studio and API responses are not pages; query-filtered gallery views
        // duplicate /gallery, so keep them out of the index.
        disallow: ['/studio', '/studio/', '/api/', '/gallery?'],
      },
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
