import type { Metadata } from 'next';
import Link from 'next/link';

import { excerpt } from '@/lib/excerpt';
import { sanityFetch } from '@/lib/sanity/fetch';
import { projectsQuery } from '@/lib/sanity/queries';
import type { Project } from '@/lib/sanity/types';
import { siteConfig } from '@/lib/site';

const description =
  'Explore the projects Utthan runs across India — spanning empowerment, rehabilitation, health, and social justice.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: `Projects | ${siteConfig.legalName}`,
    description,
  },
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ['project'],
  }).catch(() => [] as Project[]);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mb-14">
          <p className="chip bg-primary-50 text-primary-700 mb-5">Projects</p>
          <h1 className="heading-1 mb-6">Our projects</h1>
          <p className="body-xl">
            Each initiative addresses specific social challenges and is built to
            create lasting impact in communities across India.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-warm-50 rounded-2xl border-2 border-dashed border-warm-200">
            <p className="text-warm-500 font-medium">
              Our projects will be listed here soon.
            </p>
            <p className="text-warm-500 text-sm mt-1 mb-6">
              In the meantime, read about the work we do.
            </p>
            <Link href="/about" className="btn-secondary">
              About Utthan
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <article
                key={project._id}
                className="card p-7 card-hover h-full flex flex-col group relative"
              >
                <h2 className="font-heading text-xl text-warm-900 mb-3">
                  {/* Title-only link so the description stays out of the
                      accessible name; ::after restores the whole card as the
                      hit area, which is what the hover state promises. */}
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group-hover:text-primary-700 transition-colors after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {project.name}
                  </Link>
                </h2>
                <p className="text-warm-500 text-sm leading-relaxed grow mb-4">
                  {excerpt(project.description)}
                </p>
                <span
                  className="inline-flex items-center text-primary-700 text-sm font-medium gap-1 group-hover:gap-2 transition-all"
                  aria-hidden="true"
                >
                  View project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
