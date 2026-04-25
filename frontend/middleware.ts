import { NextRequest, NextResponse } from 'next/server';

/**
 * Subdomain routing middleware.
 *
 * In production, requests to `blog.example.com/*` get rewritten to `/blog/*`.
 * In development, `blog.localhost:3000/*` works the same way.
 *
 * All other requests pass through unchanged.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const firstLabel = hostname.split('.')[0] ?? '';

  if (firstLabel === 'blog') {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/blog')) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/blog${path === '/' ? '' : path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|images/|studio).*)',
  ],
};
