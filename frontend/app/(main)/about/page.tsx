import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Utthan is a trusted Indian NGO dedicated to empowering urban and rural communities through programs grounded in dignity, participation, inclusion, justice, and long-term impact.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-custom">
        <h1 className="heading-1 mb-8">About Us</h1>

        <div className="prose-custom max-w-4xl">
          <p className="mb-4">
            Utthan is a trusted Indian NGO with a long history of dedicated social work. We
            operate across multiple domains, serving both urban and rural communities with
            programs that create meaningful, lasting change.
          </p>
          <p className="mb-4">
            Our organization values dignity, participation, inclusion, justice, and long-term
            social impact. We believe in empowering communities rather than creating dependency,
            and we work with compassion without pity.
          </p>

          <section className="mt-12">
            <h2 className="heading-2 mb-4">Our Mission</h2>
            <p className="prose-custom">
              Edit this section with your organization&apos;s mission statement.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="heading-2 mb-4">Our Vision</h2>
            <p className="prose-custom">
              Edit this section with your organization&apos;s vision statement.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="heading-2 mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Dignity</li>
              <li>Participation</li>
              <li>Inclusion</li>
              <li>Justice</li>
              <li>Long-term social impact</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="heading-2 mb-4">Our History</h2>
            <p className="prose-custom">
              Edit this section to describe your organization&apos;s history and founding story.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
