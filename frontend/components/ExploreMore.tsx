import Image from 'next/image';
import Link from 'next/link';

import { blogLink } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity/fetch';
import { heroPhotoQuery } from '@/lib/sanity/queries';
import type { GalleryPhoto } from '@/lib/sanity/types';

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

export default async function ExploreMore() {
  // This section's own copy promises photographs. Showing a real one is the
  // difference between keeping that promise and advertising it.
  const photo = await sanityFetch<GalleryPhoto | null>({
    query: heroPhotoQuery,
    tags: ['galleryPhoto'],
  }).catch(() => null);

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-custom">
        <div className="max-w-2xl mb-12">
          <h2 className="heading-2 mb-4">See the work up close</h2>
          <p className="body-lg">
            Numbers only say so much. These are the photographs and the
            first-hand accounts behind them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinations.map((destination, i) => {
            // Only the gallery card gets the image; the blog card stays typographic
            // so the pair reads as two different kinds of thing.
            const image = i === 0 && photo?.url ? photo : null;

            return (
              <article
                key={destination.label}
                className="group card card-hover overflow-hidden flex flex-col relative"
              >
                {image && (
                  <div className="relative aspect-16/10 bg-warm-100">
                    <Image
                      src={image.url}
                      alt={image.alt ?? ''}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col grow">
                  <h3 className="font-heading text-2xl text-warm-900 mb-3">
                    <Link
                      href={destination.href}
                      className="group-hover:text-primary-700 transition-colors after:absolute after:inset-0"
                    >
                      {destination.label}
                    </Link>
                  </h3>
                  <p className="text-warm-500 leading-relaxed grow">
                    {destination.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 group-hover:gap-2 text-primary-700 text-sm font-medium mt-6 transition-all"
                    aria-hidden="true"
                  >
                    {destination.cta}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
