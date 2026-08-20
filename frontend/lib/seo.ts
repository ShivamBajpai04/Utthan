import { env } from '@/lib/env';
import { siteConfig } from '@/lib/site';

/** Absolute URL for a path on the main site. Search engines need absolute
 *  canonicals and image URLs; relative ones get resolved inconsistently. */
export function absoluteUrl(path = ''): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = env.siteUrl.replace(/\/$/, '');
  const suffix = path && !path.startsWith('/') ? `/${path}` : path;
  return `${base}${suffix}`;
}

/** Blog lives either on a subdomain or under /blog on the main site. */
export function blogUrl(path = ''): string {
  const base = (env.blogUrl ?? `${env.siteUrl}/blog`).replace(/\/$/, '');
  const suffix = path && !path.startsWith('/') ? `/${path}` : path;
  return `${base}${suffix}`;
}

export const defaultOgImage = {
  url: siteConfig.logo.src,
  width: siteConfig.logo.width,
  height: siteConfig.logo.height,
  alt: `${siteConfig.legalName} logo`,
};

/** Collapse text to a single line and cut it to meta-description length. */
export function metaDescription(text: string, limit = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]$/, '')}…`;
}

type Crumb = { name: string; url: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
