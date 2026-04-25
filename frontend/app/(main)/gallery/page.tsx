import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { sanityFetch } from '@/lib/sanity/fetch';
import { galleryPhotosQuery, projectsQuery } from '@/lib/sanity/queries';
import type { GalleryPhoto, Project } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A glimpse into our work, impact, and the communities we serve.',
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project: filterSlug } = await searchParams;

  const [allPhotos, projects] = await Promise.all([
    sanityFetch<GalleryPhoto[]>({
      query: galleryPhotosQuery,
      tags: ['galleryPhoto'],
    }).catch(() => [] as GalleryPhoto[]),
    sanityFetch<Project[]>({
      query: projectsQuery,
      tags: ['project'],
    }).catch(() => [] as Project[]),
  ]);

  const photos = filterSlug
    ? allPhotos.filter(p => p.projectSlug === filterSlug)
    : allPhotos;

  const activeProject = filterSlug
    ? projects.find(p => p.slug.current === filterSlug)
    : undefined;

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mb-10">
          <p className="chip bg-accent-50 text-accent-700 mb-5">Gallery</p>
          <h1 className="heading-1 mb-4">
            {activeProject ? activeProject.name : 'Gallery'}
          </h1>
          <p className="body-xl">
            {activeProject
              ? `Photos from the ${activeProject.name} project.`
              : 'A glimpse into our work, impact, and the communities we serve.'}
          </p>
        </div>

        {/* Filter pills */}
        {projects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                !filterSlug
                  ? 'bg-primary-700 text-white border-primary-700'
                  : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300 hover:text-warm-800'
              }`}
            >
              All photos
            </Link>
            {projects.map(p => (
              <Link
                key={p._id}
                href={`/gallery?project=${p.slug.current}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  filterSlug === p.slug.current
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300 hover:text-warm-800'
                }`}
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}

        {photos.length === 0 ? (
          <div className="text-center py-20 bg-warm-50 rounded-2xl border-2 border-dashed border-warm-200">
            <svg
              className="w-14 h-14 mx-auto text-warm-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
              />
            </svg>
            <p className="text-warm-400 font-medium text-lg">Coming soon</p>
            <p className="text-warm-300 mt-1 text-sm">Gallery photos will be shared shortly.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            {photos.map(photo => (
              <figure
                key={photo._id}
                className="break-inside-avoid relative group rounded-xl overflow-hidden card card-hover"
              >
                <Image
                  src={photo.url}
                  alt={photo.alt ?? photo.description ?? 'Gallery photo'}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
                />
                {(photo.description || photo.projectName) && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 pt-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {photo.description && (
                      <p className="text-white text-sm leading-snug">{photo.description}</p>
                    )}
                    {photo.projectName && (
                      <p className="text-white/60 text-xs mt-1">{photo.projectName}</p>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
