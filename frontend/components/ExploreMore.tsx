import Link from 'next/link';

import { blogLink } from '@/lib/seo';

/**
 * Gallery and blog were previously reachable only from the header and footer.
 * Surfacing them in the page body gives both a real internal link from the
 * home page, which is the strongest one the site has to give.
 */
const destinations = [
  {
    href: '/gallery',
    label: 'Photo gallery',
    description:
      'Faces, places, and moments from our centres and field programmes.',
    cta: 'Browse the gallery',
  },
  {
    href: blogLink(),
    label: 'From the field',
    description:
      'Stories, updates, and reflections from the people doing the work.',
    cta: 'Read the blog',
  },
];

export default function ExploreMore() {
  return (
    <section className="section-padding bg-warm-50">
      <div className="container-custom">
        <div className="max-w-2xl mb-12">
          <p className="chip bg-primary-50 text-primary-700 mb-5">Go deeper</p>
          <h2 className="heading-2 mb-4">See the work up close</h2>
          <p className="body-lg">
            Numbers only say so much. These are the photographs and the
            first-hand accounts behind them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinations.map(destination => (
            <Link
              key={destination.label}
              href={destination.href}
              className="group card card-hover p-8 flex flex-col"
            >
              <h3 className="font-heading text-2xl text-warm-900 mb-3 group-hover:text-primary-700 transition-colors">
                {destination.label}
              </h3>
              <p className="text-warm-500 leading-relaxed grow">
                {destination.description}
              </p>
              <span className="inline-flex items-center gap-1 group-hover:gap-2 text-primary-700 text-sm font-medium mt-6 transition-all">
                {destination.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
