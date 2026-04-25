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
    <div className="py-12 md:py-16">
      <div className="container-custom">
        <h1 className="heading-1 mb-4">Gallery</h1>
        <p className="prose-custom mb-8 max-w-3xl">
          {activeProject
            ? `Showing photos from: ${activeProject.name}`
            : 'A glimpse into our work, impact, and the communities we serve.'}
        </p>

        {projects.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !filterSlug
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </Link>
            {projects.map(p => (
              <Link
                key={p._id}
                href={`/gallery?project=${p.slug.current}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterSlug === p.slug.current
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p.name}
              </Link>
            ))}
          </div>
        ) : null}

        {photos.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 font-medium text-lg">Coming Soon</p>
            <p className="text-gray-400 mt-2">Gallery photos will be shared shortly.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {photos.map(photo => (
              <figure
                key={photo._id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src={photo.url}
                  alt={photo.alt ?? photo.description ?? 'Gallery photo'}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                {photo.description || photo.projectName ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {photo.description ? (
                      <p className="text-white text-sm leading-snug">{photo.description}</p>
                    ) : null}
                    {photo.projectName ? (
                      <p className="text-white/70 text-xs mt-1">{photo.projectName}</p>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
