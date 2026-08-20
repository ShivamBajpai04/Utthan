import type { Metadata } from 'next';

import NotFoundContent from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    // pt-32 clears the fixed header; min-h keeps the footer off the fold
    // without forcing the page past the viewport height.
    <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center">
      <NotFoundContent />
    </div>
  );
}
