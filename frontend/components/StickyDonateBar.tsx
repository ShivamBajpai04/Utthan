'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { contactDetailsConfirmed, siteConfig, telHref } from '@/lib/site';

/**
 * Persistent donate action for small screens, where the header's Donate button
 * is hidden behind the menu. Suppressed on the Get Involved page, which is
 * already wall-to-wall calls to action.
 */
export default function StickyDonateBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/help')) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-warm-200 bg-white/95 backdrop-blur-sm"
      // Keeps the bar clear of the iOS home indicator.
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/help#donate" className="btn-primary flex-1 text-center">
          Donate
        </Link>
        {contactDetailsConfirmed ? (
          <a
            href={telHref(siteConfig.contact.phone)}
            className="btn-secondary px-4"
            aria-label={`Call ${siteConfig.name}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </a>
        ) : (
          <Link href="/help#contact" className="btn-secondary px-4 text-sm">
            Contact
          </Link>
        )}
      </div>
    </div>
  );
}
