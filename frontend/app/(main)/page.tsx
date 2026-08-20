import type { Metadata } from 'next';
import { Suspense } from 'react';

import AboutPreview from '@/components/AboutPreview';
import CallToAction from '@/components/CallToAction';
import ExploreMore from '@/components/ExploreMore';
import ExploreMoreSkeleton from '@/components/ExploreMoreSkeleton';
import Hero from '@/components/Hero';
import ImpactSection from '@/components/ImpactSection';
import ProjectsOverview, {
  ProjectsOverviewSkeleton,
} from '@/components/ProjectsOverview';
import { siteConfig, yearsOfService } from '@/lib/site';

export const metadata: Metadata = {
  // Absolute so the home page keeps its full brand title instead of the
  // "%s | Utthan…" template, which would repeat the name.
  title: {
    absolute: `${siteConfig.legalName} — ${siteConfig.tagline}`,
  },
  description: `${siteConfig.description} Serving communities across India for over ${yearsOfService()} years.`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutPreview />
      {/* The only part of this page that waits on the CMS. Its own boundary
          keeps the hero and everything below from waiting with it. */}
      <Suspense fallback={<ProjectsOverviewSkeleton />}>
        <ProjectsOverview />
      </Suspense>
      <ImpactSection />
      {/* Also CMS-backed (it pulls a real photograph), so it gets its own
          boundary rather than holding up the closing call to action. */}
      <Suspense fallback={<ExploreMoreSkeleton />}>
        <ExploreMore />
      </Suspense>
      <CallToAction />
    </div>
  );
}
