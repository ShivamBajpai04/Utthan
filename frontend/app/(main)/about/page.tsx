import type { Metadata } from 'next';
import Link from 'next/link';

import BrandLockup from '@/components/BrandLockup';
import ValueIcon from '@/components/ValueIcon';
import { FOUNDING_YEAR, siteConfig, values, yearsOfService } from '@/lib/site';

const description =
  'Utthan is a trusted Indian NGO dedicated to empowering urban and rural communities through programmes grounded in dignity, participation, inclusion, justice, and long-term impact.';

export const metadata: Metadata = {
  title: 'About Us',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title: `About Us | ${siteConfig.legalName}`,
    description,
  },
};

const timeline = [
  {
    year: String(FOUNDING_YEAR),
    text: 'Founded with a mission to serve India’s most marginalised communities.',
  },
  {
    year: '2000s',
    text: 'Expanded into disability rehabilitation, legal aid, and women’s empowerment programmes.',
  },
  {
    year: '2010s',
    text: 'Grew to 15+ centres across multiple states, reaching over 100,000 beneficiaries.',
  },
  {
    year: 'Today',
    text: 'Continuing to build lasting impact through community-led projects, health initiatives, and advocacy.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Intro */}
        <div className="max-w-3xl mb-20">
          <p className="chip bg-primary-50 text-primary-700 mb-6">About us</p>
          <BrandLockup size="lg" className="mb-8" />
          <h1 className="heading-1 mb-6">
            Compassion without pity. Empowerment without dependency.
          </h1>
          <p className="body-xl">
            <strong className="font-semibold text-warm-700">
              {siteConfig.legalName}
            </strong>{' '}
            is a trusted Indian NGO with {yearsOfService()} years of dedicated
            social work behind it. We operate across multiple domains, serving
            both urban and rural communities with programmes that create
            meaningful, lasting change.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="card p-8 md:p-10">
            <h2 className="font-heading text-2xl text-warm-900 mb-4">Our Mission</h2>
            <p className="body-lg">
              To work alongside communities in building self-reliance, social
              justice, and human dignity — focusing on the most vulnerable and
              marginalised sections of society.
            </p>
          </div>
          <div className="card p-8 md:p-10">
            <h2 className="font-heading text-2xl text-warm-900 mb-4">Our Vision</h2>
            <p className="body-lg">
              A just and equitable India where every individual has access to
              opportunities, rights, and a life of dignity, regardless of their
              social or economic background.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="heading-2 mb-10">Our journey</h2>
          <ol className="space-y-0">
            {timeline.map((item, i) => (
              <li key={item.year} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-600 ring-4 ring-primary-100 shrink-0 mt-1.5" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-warm-200 my-1" />
                  )}
                </div>
                <div className="pb-10">
                  <span className="text-sm font-semibold text-primary-700">
                    {item.year}
                  </span>
                  <p className="body-lg mt-1">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Values — the same list the homepage shows */}
        <div className="mb-20">
          <h2 className="heading-2 mb-4">What guides us</h2>
          <p className="body-lg max-w-2xl mb-10">
            Every programme, every partnership, and every decision is rooted in
            these core principles.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(value => (
              <div key={value.id} className="card card-hover p-6">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <ValueIcon id={value.id} />
                </div>
                <h3 className="font-heading text-lg text-warm-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Somewhere to go next — the page previously just stopped. */}
        <div className="rounded-xl bg-primary-50 border border-primary-200/60 p-8 md:p-10 text-center">
          <h2 className="heading-3 mb-3">See this work in practice</h2>
          <p className="body-lg max-w-xl mx-auto mb-8">
            Our projects show what these principles look like on the ground —
            and there are many ways to be part of them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/projects" className="btn-primary">
              Explore our projects
            </Link>
            <Link href="/help" className="btn-secondary bg-white">
              Get involved
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
