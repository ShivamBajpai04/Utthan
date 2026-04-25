import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { sanityFetch } from '@/lib/sanity/fetch';
import {
  galleryPhotosByProjectQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from '@/lib/sanity/queries';
import type { GalleryPhoto, Project } from '@/lib/sanity/types';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await sanityFetch<string[]>({
    query: projectSlugsQuery,
    revalidate: 3600,
  }).catch(() => [] as string[]);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
  }).catch(() => null);

  if (!project) return { title: 'Project not found' };

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  const [project, photos] = await Promise.all([
    sanityFetch<Project | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project:${slug}`],
    }).catch(() => null),
    sanityFetch<GalleryPhoto[]>({
      query: galleryPhotosByProjectQuery,
      params: { projectSlug: slug },
      tags: [`gallery:${slug}`],
    }).catch(() => [] as GalleryPhoto[]),
  ]);

  if (!project) notFound();

  return (
    <div className="py-12 md:py-16">
      <div className="container-custom max-w-5xl">
        <h1 className="heading-1 mb-4">{project.name}</h1>
        <p className="prose-custom mb-12 max-w-3xl">{project.description}</p>

        {photos.length > 0 ? (
          <section>
            <h2 className="heading-2 mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map(photo => (
                <figure
                  key={photo._id}
                  className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.url}
                      alt={photo.alt ?? photo.description ?? 'Gallery photo'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {photo.description ? (
                    <figcaption className="p-4 text-sm text-gray-600 bg-white">
                      {photo.description}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">
              Gallery photos for this project will appear once added to the CMS.
            </p>
          </div>
        )}

        <div className="mt-12">
          <Link href="/gallery" className="btn-secondary">
            View full gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
