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

/** True when the blog is served from its own host, e.g. blog.example.org. */
export const blogOnSubdomain = Boolean(env.blogUrl);

/**
 * Href for a page within the blog. On the blog subdomain the `/blog` prefix is
 * dropped so links match the canonical URLs; on a shared domain it is kept.
 */
export function blogHref(path = ''): string {
  const suffix = path && !path.startsWith('/') ? `/${path}` : path;
  if (blogOnSubdomain) return suffix || '/';
  return `/blog${suffix}`;
}

/**
 * Href back to the main site from a blog page. Must be absolute when the blog
 * is on its own host, where a bare `/` would land on the blog index.
 */
export function mainSiteHref(path = '/'): string {
  return blogOnSubdomain ? absoluteUrl(path) : path;
}

/** Href to the blog from a main-site page. Crosses hosts when it needs to. */
export function blogLink(path = ''): string {
  return blogOnSubdomain ? blogUrl(path) : `/blog${path}`;
}

/**
 * Resolves a main-site nav href, sending `/blog` to the blog host once the
 * blog has been split out so navigation and canonicals agree.
 */
export function resolveNavHref(href: string): string {
  return href === '/blog' ? blogLink() : href;
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
