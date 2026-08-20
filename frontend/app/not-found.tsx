import type { Metadata } from 'next';
import Link from 'next/link';

import BrandLockup from '@/components/BrandLockup';
import NotFoundContent from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream py-20">
      {/* This page renders outside the main layout, so it would otherwise
          carry no identity at all. */}
      <Link href="/" className="mb-12">
        <BrandLockup size="md" />
      </Link>
      <NotFoundContent />
    </div>
  );
}
