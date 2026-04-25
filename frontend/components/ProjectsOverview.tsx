import Link from 'next/link';

import { sanityFetch } from '@/lib/sanity/fetch';
import { projectsQuery } from '@/lib/sanity/queries';
import type { Project } from '@/lib/sanity/types';

export default async function ProjectsOverview() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ['project'],
  }).catch(() => [] as Project[]);

  const cards = projects.slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <p className="chip bg-accent-50 text-accent-700 mb-5">Our work</p>
          <h2 className="heading-2 mb-4">Projects that create lasting impact</h2>
          <p className="body-lg">
            Each initiative is designed hand-in-hand with the communities we
            serve, tackling specific social challenges from the ground up.
          </p>
        </div>

        {cards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((project, i) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="group block"
              >
                <article className="card p-6 card-hover h-full flex flex-col">
                  <span className="text-xs font-medium text-warm-400 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-xl text-warm-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center text-primary-700 text-sm font-medium mt-4 group-hover:gap-2 gap-1 transition-all">
                    View project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-warm-50 rounded-2xl border-2 border-dashed border-warm-200">
            <p className="text-warm-400 font-medium">
              Projects will appear here once added to the CMS.
            </p>
          </div>
        )}

        {projects.length > 4 && (
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-secondary">
              View all projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
