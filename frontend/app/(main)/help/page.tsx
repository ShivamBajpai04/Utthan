import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';

const description =
  'Donate, volunteer, or collaborate with Utthan — every contribution helps us continue our mission of empowering communities across India.';

export const metadata: Metadata = {
  title: 'Get Involved',
  description,
  alternates: { canonical: '/help' },
  openGraph: {
    type: 'website',
    url: '/help',
    title: `Get Involved | ${siteConfig.legalName}`,
    description,
  },
};

const ways = [
  {
    id: 'donate',
    title: 'Donate',
    description:
      'Your financial support helps us sustain and grow our programmes. Donations fund women’s empowerment, disability rehabilitation, community health, and legal aid services across India. All donations are eligible for tax deductions as per applicable laws.',
    subject: 'I would like to donate to Utthan',
    cta: 'Enquire about donating',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description:
      'Volunteers are the backbone of our work. Whether you can contribute a few hours a week or are looking for a deeper engagement, we welcome individuals passionate about social change. Opportunities span all of our programmes and locations.',
    subject: 'I would like to volunteer with Utthan',
    cta: 'Enquire about volunteering',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    description:
      'We partner with NGOs, government bodies, educational institutions, and corporations to amplify our reach. If your organisation shares our values and mission, we’d love to explore how we can work together.',
    subject: 'Partnership enquiry for Utthan',
    cta: 'Enquire about partnering',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
  },
];

export default function HelpPage() {
  const { address, phone, email } = siteConfig.contact;
  const hasContact = Boolean(address || phone || email);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <p className="chip bg-accent-50 text-accent-700 mb-5">Get involved</p>
          <h1 className="heading-1 mb-6">
            There are many ways to be a part of this work
          </h1>
          <p className="body-xl">
            Every contribution — big or small — helps us reach more communities
            and deepen our impact.
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {ways.map(way => (
            <section
              key={way.id}
              id={way.id}
              className="card p-8 md:p-10 scroll-mt-28"
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  {way.icon}
                </div>
                <div>
                  <h2 className="font-heading text-2xl text-warm-900 mb-3">{way.title}</h2>
                  <p className="body-lg mb-5">{way.description}</p>
                  {/* Each action opens a pre-addressed email when one is
                      configured; otherwise it points at the contact details. */}
                  {email ? (
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(way.subject)}`}
                      className="btn-secondary text-sm px-5 py-2.5"
                    >
                      {way.cta}
                    </a>
                  ) : (
                    <Link href="#contact" className="btn-secondary text-sm px-5 py-2.5">
                      {way.cta}
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section
          id="contact"
          className="bg-primary-50 border border-primary-200/60 rounded-xl p-8 md:p-10 scroll-mt-28"
        >
          <h2 className="font-heading text-2xl text-warm-900 mb-4">Contact us</h2>
          <p className="body-lg mb-6">
            To get in touch about donations, volunteering, or partnership
            opportunities, please reach out. Our team will respond as soon as
            possible.
          </p>

          {hasContact ? (
            <address className="not-italic space-y-3 text-warm-700 text-[0.95rem]">
              {address && (
                <p>
                  <span className="font-semibold">Address:</span>{' '}
                  <span className="text-warm-600">{address}</span>
                </p>
              )}
              {phone && (
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
                  >
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a
                    href={`mailto:${email}`}
                    className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
                  >
                    {email}
                  </a>
                </p>
              )}
            </address>
          ) : (
            <p className="text-warm-600 text-[0.95rem]">
              Our contact details will be published here shortly.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
