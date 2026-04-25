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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Projects</h2>
          <p className="prose-custom max-w-2xl mx-auto">
            We run a range of projects across India, each tackling specific social challenges
            and creating lasting impact in communities.
          </p>
        </div>

        {cards.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map(project => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="block h-full"
              >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover group h-full flex flex-col">
                  <h3 className="heading-3 mb-3 text-xl group-hover:text-primary-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center text-primary-600 font-semibold group-hover:translate-x-1 transition-transform mt-auto text-sm">
                    View gallery
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Projects will appear here once added to the CMS.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
