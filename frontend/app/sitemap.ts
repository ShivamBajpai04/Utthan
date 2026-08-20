import type { MetadataRoute } from 'next';

import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostSitemapQuery, projectSitemapQuery } from '@/lib/sanity/queries';
import type { SitemapEntry } from '@/lib/sanity/types';
import { absoluteUrl, blogUrl } from '@/lib/seo';

const staticRoutes = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/help', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
] as const satisfies readonly {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}[];

/** Newest of the available CMS timestamps, falling back to now. */
function lastModified(entry: SitemapEntry, fallback: Date): Date {
  const candidates = [entry._updatedAt, entry.publishedAt]
    .filter((value): value is string => Boolean(value))
    .map(value => new Date(value))
    .filter(date => !Number.isNaN(date.getTime()));

  if (candidates.length === 0) return fallback;
  return new Date(Math.max(...candidates.map(date => date.getTime())));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [projects, posts] = await Promise.all([
    sanityFetch<SitemapEntry[]>({ query: projectSitemapQuery, revalidate: 3600 }).catch(
      () => [] as SitemapEntry[],
    ),
    sanityFetch<SitemapEntry[]>({ query: blogPostSitemapQuery, revalidate: 3600 }).catch(
      () => [] as SitemapEntry[],
    ),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map(project => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: lastModified(project, now),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // The blog index reflects the most recent post, so reuse that date.
  const newestPost = posts
    .map(post => lastModified(post, new Date(0)).getTime())
    .reduce((newest, time) => Math.max(newest, time), 0);

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: blogUrl(),
      lastModified: newestPost > 0 ? new Date(newestPost) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map(post => ({
      url: blogUrl(`/${post.slug}`),
      lastModified: lastModified(post, now),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
