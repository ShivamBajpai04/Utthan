import Link from 'next/link';

import { excerpt } from '@/lib/excerpt';
import { sanityFetch } from '@/lib/sanity/fetch';
import { projectsQuery } from '@/lib/sanity/queries';
import type { Project } from '@/lib/sanity/types';

/**
 * An outage and an empty CMS used to render identically, so a Sanity failure
 * told every visitor the organisation had no projects and told the maintainers
 * nothing at all. Keep them distinguishable.
 */
type Result =
  | { status: 'ok'; projects: Project[] }
  | { status: 'unavailable' };

async function loadProjects(): Promise<Result> {
  try {
    const projects = await sanityFetch<Project[]>({
      query: projectsQuery,
      tags: ['project'],
    });
    return { status: 'ok', projects };
  } catch (error) {
    // Surfaces in the server log and in Vercel's runtime logs, so the gap is
    // discoverable rather than silent.
    console.error('[ProjectsOverview] Sanity fetch failed:', error);
    return { status: 'unavailable' };
  }
}

export default async function ProjectsOverview() {
  const result = await loadProjects();
  const projects = result.status === 'ok' ? result.projects : [];
  const cards = projects.slice(0, 4);

  return (
    <ProjectsSection>
      {result.status === 'unavailable' ? (
        <div className="bg-warm-50 border border-warm-200 rounded-2xl px-6 py-12 text-center">
          <p className="text-warm-700 font-medium mb-2">
            We could not load our projects just now.
          </p>
          <p className="text-warm-600 text-[0.95rem] mb-6">
            This is a problem at our end, not yours.
          </p>
          <Link href="/projects" className="btn-secondary text-sm px-5 py-2.5">
            Try the projects page
          </Link>
        </div>
      ) : cards.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map(project => {
              const summary = excerpt(project.description);

              return (
                <article
                  key={project._id}
                  className="card p-6 card-hover h-full flex flex-col group relative"
                >
                  <h3 className="font-heading text-xl text-warm-900 mb-3">
                    {/* Only the title is the link, so the accessible name is
                        the project's name and nothing else — but the whole
                        card looks clickable, so the link's ::after covers it.
                        One target, one short name. */}
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="group-hover:text-primary-700 transition-colors after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  {summary && (
                    <p className="text-warm-500 text-sm leading-relaxed grow">
                      {summary}
                    </p>
                  )}
                  <span
                    className="inline-flex items-center text-primary-700 text-sm font-medium mt-4 gap-1 group-hover:gap-2 transition-all"
                    aria-hidden="true"
                  >
                    View project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </article>
              );
            })}
          </div>

          {/* Always offer the way through to the full list — previously this
              only appeared once there were more than four projects. */}
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-secondary">
              {projects.length > cards.length
                ? `View all ${projects.length} projects`
                : 'View all projects'}
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-warm-50 rounded-2xl border border-warm-200">
          <p className="text-warm-600 font-medium">
            Our projects will be listed here soon.
          </p>
        </div>
      )}
    </ProjectsSection>
  );
}

/** Shared chrome so the loading skeleton and the real section can never drift. */
function ProjectsSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <h2 className="heading-2 mb-4">Projects that create lasting impact</h2>
          <p className="body-lg">
            Each initiative is designed hand-in-hand with the communities we
            serve, tackling specific social challenges from the ground up.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

/**
 * Streamed in place of the grid while Sanity resolves, so the rest of the page
 * never waits on the CMS. This only works because there is no `loading.tsx` in
 * the `(main)` group any more — a route-level fallback outranks a nested
 * boundary and replaced the whole homepage, hero included, with a spinner.
 */
export function ProjectsOverviewSkeleton() {
  return (
    <ProjectsSection>
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        role="status"
        aria-label="Loading projects"
      >
        {/* warm-300 rather than warm-100: at 1.09:1 the bars were invisible,
            so four loading cards read as four broken empty ones. */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="card p-6 h-full flex flex-col animate-pulse">
            <div className="h-6 w-3/4 rounded bg-warm-300 mb-4" />
            <div className="space-y-2 grow">
              <div className="h-3 w-full rounded bg-warm-300" />
              <div className="h-3 w-full rounded bg-warm-300" />
              <div className="h-3 w-2/3 rounded bg-warm-300" />
            </div>
            <div className="h-3 w-24 rounded bg-warm-300 mt-6" />
          </div>
        ))}
      </div>
    </ProjectsSection>
  );
}
