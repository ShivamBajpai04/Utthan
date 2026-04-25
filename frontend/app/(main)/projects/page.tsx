import type { Metadata } from 'next';
import Link from 'next/link';

import { sanityFetch } from '@/lib/sanity/fetch';
import { projectsQuery } from '@/lib/sanity/queries';
import { toPlainText } from '@/lib/sanity/types';
import type { Project } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore the projects Utthan runs across India — spanning empowerment, rehabilitation, health, and social justice.',
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
            <p className="text-warm-400">
              Projects will be displayed here once added to the CMS.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="group block"
              >
                <article className="card p-7 card-hover h-full flex flex-col">
                  <span className="text-xs font-medium text-warm-400 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-heading text-xl text-warm-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-warm-500 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                    {toPlainText(project.description)}
                  </p>
                  <span className="inline-flex items-center text-primary-700 text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                    View gallery
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
