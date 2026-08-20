import { NextRequest, NextResponse } from 'next/server';

/**
 * Subdomain routing for the blog.
 *
 * On `blog.example.org` (or `blog.localhost:3000` in development) the blog is
 * served from the root, so `blog.example.org/my-post` renders `/blog/my-post`
 * internally. Requests that still carry the `/blog` prefix on that host are
 * redirected to the bare path, so each post has exactly one crawlable URL and
 * it matches the canonical tag.
 *
 * All other hosts pass through unchanged and the blog stays at `/blog`.
 */
const BLOG_PREFIX = '/blog';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const isBlogHost = (hostname.split(':')[0] ?? '').split('.')[0] === 'blog';

  if (!isBlogHost) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === BLOG_PREFIX || pathname.startsWith(`${BLOG_PREFIX}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(BLOG_PREFIX.length) || '/';
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `${BLOG_PREFIX}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Everything except static assets and the files that must stay at the host
     * root — robots.txt and sitemap.xml are served as-is on both hosts, so
     * rewriting them into /blog would 404.
     */
    '/((?!_next/static|_next/image|_next/data|favicon\\.ico|favicon\\.svg|images/|studio|robots\\.txt|sitemap\\.xml|site\\.webmanifest).*)',
  ],
};
