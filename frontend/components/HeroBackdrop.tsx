import Image from 'next/image';

import { sanityFetch } from '@/lib/sanity/fetch';
import { heroPhotoQuery } from '@/lib/sanity/queries';
import type { GalleryPhoto } from '@/lib/sanity/types';

/**
 * The most recent gallery photograph, behind the hero's gradient.
 *
 * Renders nothing at all when the gallery is empty or Sanity is unreachable —
 * the gradient in `Hero` is the base layer and stands on its own, so this is
 * pure enhancement. That is deliberate: the homepage currently has no
 * photography, and this lights up the moment a photo lands in the CMS without
 * anyone touching a component.
 *
 * Must stay inside its own Suspense boundary in `Hero`. If the hero itself
 * awaited this fetch, the whole page shell would wait with it.
 */
export default async function HeroBackdrop() {
  const photo = await sanityFetch<GalleryPhoto | null>({
    query: heroPhotoQuery,
    tags: ['galleryPhoto'],
  }).catch(() => null);

  if (!photo?.url) return null;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={photo.url}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim. The hero's text measures 17:1 on the flat gradient; over a
          photograph it needs this to stay there, so the scrim is not optional
          decoration and its opacity is load-bearing. */}
      <div className="absolute inset-0 bg-primary-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/85 to-primary-950/60" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-950 to-transparent" />
    </div>
  );
}
