import type { Metadata } from 'next';
import Link from 'next/link';

import { sanityFetch } from '@/lib/sanity/fetch';
import { projectsQuery } from '@/lib/sanity/queries';
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
    <div className="py-12 md:py-16">
      <div className="container-custom">
        <h1 className="heading-1 mb-4">Our Projects</h1>
        <p className="prose-custom mb-12 max-w-3xl">
          Each project is designed to address specific social challenges and create lasting
          impact in communities across India.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Projects will be displayed here once added to the CMS.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6"
              >
                <h2 className="heading-3 mb-3 text-xl">{project.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <span className="text-primary-600 font-semibold text-sm">
                  View gallery &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
