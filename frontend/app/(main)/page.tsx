import type { Metadata } from 'next';

import AboutPreview from '@/components/AboutPreview';
import CallToAction from '@/components/CallToAction';
import Hero from '@/components/Hero';
import ImpactSection from '@/components/ImpactSection';
import ProjectsOverview from '@/components/ProjectsOverview';
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
      <ProjectsOverview />
      <ImpactSection />
      <CallToAction />
    </div>
  );
}
