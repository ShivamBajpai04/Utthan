import type { Metadata } from 'next';
import Link from 'next/link';

import BrandLockup from '@/components/BrandLockup';
import { blogHref, mainSiteHref } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

// Canonicals are set per page (index and post) so a post never inherits the
// index URL.
export const metadata: Metadata = {
  title: {
    default: `Blog — ${siteConfig.legalName}`,
    template: `%s | ${siteConfig.legalName} Blog`,
  },
  description: `Stories, updates, and insights from ${siteConfig.legalName}'s work across India.`,
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-warm-200 bg-cream sticky top-0 z-50">
        <nav className="mx-auto max-w-3xl flex items-center justify-between gap-4 px-5 py-4">
          {/* The blog is a separate surface, so it carries the full identity
              rather than a bare "Utthan Blog" wordmark. */}
          <Link
            href={blogHref('/')}
            className="group min-w-0"
            aria-label={`${siteConfig.legalName} blog — all posts`}
          >
            <BrandLockup
              size="sm"
              className="transition-opacity group-hover:opacity-80"
            />
          </Link>
          <Link
            href={mainSiteHref('/')}
            className="text-sm font-medium text-warm-500 hover:text-warm-700 transition-colors shrink-0"
          >
            &larr; Main site
          </Link>
        </nav>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-5 py-12">
        {children}
      </main>
      <footer className="border-t border-warm-200 mt-16">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center text-xs text-warm-500">
          &copy; {new Date().getFullYear()} {siteConfig.legalName}
        </div>
      </footer>
    </>
  );
}
