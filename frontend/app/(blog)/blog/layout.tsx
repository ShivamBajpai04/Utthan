import type { Metadata } from 'next';
import Link from 'next/link';

import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: {
    default: 'Blog — Utthan NGO',
    template: '%s | Utthan Blog',
  },
  description: "Stories, updates, and insights from Utthan NGO's work across India.",
  alternates: {
    canonical: env.blogUrl ?? `${env.siteUrl}/blog`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="mx-auto max-w-3xl flex items-center justify-between px-4 py-4">
          <Link href="/blog" className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
            Utthan Blog
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            &larr; Main site
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      <footer className="border-t border-gray-100 mt-16">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Utthan NGO
        </div>
      </footer>
    </>
  );
}
