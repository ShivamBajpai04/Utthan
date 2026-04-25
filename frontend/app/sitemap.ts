import type { MetadataRoute } from 'next';

import { env } from '@/lib/env';
import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostSlugsQuery, projectSlugsQuery } from '@/lib/sanity/queries';

const staticRoutes = ['', '/about', '/projects', '/gallery', '/help'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [projectSlugs, postSlugs] = await Promise.all([
    sanityFetch<string[]>({ query: projectSlugsQuery, revalidate: 3600 }).catch(() => []),
    sanityFetch<string[]>({ query: blogPostSlugsQuery, revalidate: 3600 }).catch(() => []),
  ]);

  const blogBase = env.blogUrl ?? `${env.siteUrl}/blog`;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${env.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map(slug => ({
    url: `${env.siteUrl}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: blogBase,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...postSlugs.map(slug => ({
      url: `${blogBase}/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
