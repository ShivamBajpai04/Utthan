import { PortableText } from '@portabletext/react';
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
import { toPlainText } from '@/lib/sanity/types';
import type { GalleryPhoto, Project } from '@/lib/sanity/types';
import { projectPortableTextComponents } from './portable-text';

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
    description: toPlainText(project.description).slice(0, 160) || undefined,
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
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-warm-400">
          <Link href="/projects" className="hover:text-warm-600 transition-colors">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-warm-700">{project.name}</span>
        </nav>

        <h1 className="heading-1 mb-6">{project.name}</h1>
        {project.description && (
          typeof project.description === 'string' ? (
            <p className="body-xl max-w-2xl mb-14">{project.description}</p>
          ) : (
            <div className="prose prose-lg prose-stone max-w-2xl mb-14">
              <PortableText value={project.description} components={projectPortableTextComponents} />
            </div>
          )
        )}

        {photos.length > 0 ? (
          <section>
            <h2 className="heading-3 mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {photos.map(photo => (
                <figure
                  key={photo._id}
                  className="group rounded-xl overflow-hidden card card-hover"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.url}
                      alt={photo.alt ?? photo.description ?? 'Gallery photo'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  {photo.description && (
                    <figcaption className="p-4 text-sm text-warm-600 bg-white">
                      {photo.description}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-14 bg-warm-50 rounded-2xl border-2 border-dashed border-warm-200">
            <p className="text-warm-400">
              Gallery photos for this project will appear once added to the CMS.
            </p>
          </div>
        )}

        <div className="mt-14 flex gap-4">
          <Link href="/projects" className="btn-secondary">
            All projects
          </Link>
          <Link href={`/gallery?project=${slug}`} className="btn-secondary">
            View in gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
