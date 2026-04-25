import AboutPreview from '@/components/AboutPreview';
import CallToAction from '@/components/CallToAction';
import Hero from '@/components/Hero';
import ImpactSection from '@/components/ImpactSection';
import ProjectsOverview from '@/components/ProjectsOverview';

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
