import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import JsonLd from '@/components/JsonLd';
import PortableTextBody from '@/components/PortableTextBody';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  galleryPhotosByProjectQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from '@/lib/sanity/queries';
import { toPlainText } from '@/lib/sanity/types';
import type { GalleryPhoto, Project } from '@/lib/sanity/types';
import { absoluteUrl, breadcrumbJsonLd, metaDescription } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

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

  if (!project) {
    return { title: 'Project not found', robots: { index: false, follow: false } };
  }

  const description =
    metaDescription(toPlainText(project.description)) ||
    `${project.name} — a programme run by ${siteConfig.legalName}.`;
  const url = absoluteUrl(`/projects/${slug}`);

  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${project.name} | ${siteConfig.legalName}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | ${siteConfig.legalName}`,
      description,
    },
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

  const url = absoluteUrl(`/projects/${slug}`);

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    '@id': `${url}#project`,
    name: project.name,
    description: metaDescription(toPlainText(project.description), 300) || undefined,
    url,
    parentOrganization: { '@id': `${absoluteUrl()}/#organisation` },
    ...(photos.length > 0 && { image: photos.slice(0, 5).map(photo => photo.url) }),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: absoluteUrl() },
    { name: 'Projects', url: absoluteUrl('/projects') },
    { name: project.name, url },
  ]);

  return (
    <div className="pt-32 pb-20">
      <JsonLd data={projectJsonLd} />
      <JsonLd data={breadcrumbs} />

      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-warm-400" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="hover:text-warm-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects" className="hover:text-warm-600 transition-colors">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-warm-700" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        <h1 className="heading-1 mb-6">{project.name}</h1>
        {project.description &&
          (typeof project.description === 'string' ? (
            <p className="body-xl max-w-2xl mb-14">{project.description}</p>
          ) : (
            <PortableTextBody
              value={project.description}
              className="max-w-2xl mb-14"
            />
          ))}

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
                      alt={photo.alt ?? photo.description ?? `Photo from ${project.name}`}
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
              Photos from this project will be shared soon.
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/projects" className="btn-secondary">
            All projects
          </Link>
          {/* Only offered when it leads somewhere — a filtered gallery with
              no photos is a dead end. */}
          {photos.length > 0 && (
            <Link href={`/gallery?project=${slug}`} className="btn-secondary">
              View in full gallery
            </Link>
          )}
          <Link href="/help#donate" className="btn-primary">
            Support this work
          </Link>
        </div>
      </div>
    </div>
  );
}
