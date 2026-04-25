import type { Metadata } from 'next';
import Link from 'next/link';

import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: {
    default: 'Blog — Utthan',
    template: '%s | Utthan Blog',
  },
  description: "Stories, updates, and insights from Utthan's work across India.",
  alternates: {
    canonical: env.blogUrl ?? `${env.siteUrl}/blog`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-warm-200 bg-cream sticky top-0 z-50">
        <nav className="mx-auto max-w-3xl flex items-center justify-between px-5 py-4">
          <Link
            href="/blog"
            className="font-heading text-xl text-warm-900 hover:text-primary-700 transition-colors"
          >
            Utthan Blog
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-warm-400 hover:text-warm-700 transition-colors"
          >
            &larr; Main site
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12">{children}</main>
      <footer className="border-t border-warm-200 mt-16">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center text-xs text-warm-400">
          &copy; {new Date().getFullYear()} Utthan
        </div>
      </footer>
    </>
  );
}
