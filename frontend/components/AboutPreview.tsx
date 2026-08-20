import Link from 'next/link';

import ValueIcon from '@/components/ValueIcon';
import { decadesOfService, values } from '@/lib/site';

export default function AboutPreview() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — narrative */}
          <div>
            <p className="chip bg-primary-50 text-primary-700 mb-5">Who we are</p>
            <h2 className="heading-2 mb-6">
              Over {decadesOfService()} of grassroots social work across India
            </h2>
            <div className="space-y-4 body-lg mb-8">
              <p>
                Utthan is a trusted Indian NGO operating across multiple domains,
                serving both urban and rural communities with programmes that create
                meaningful, lasting change.
              </p>
              <p>
                Our work spans women&apos;s safety and empowerment, disability
                rehabilitation, community health, family counselling, senior citizen
                welfare, legal aid, and cultural initiatives.
              </p>
            </div>
            <Link href="/about" className="btn-secondary">
              Read our story
            </Link>
          </div>

          {/* Right — the values, shared with the About page so the two can
              never list a different set. */}
          <ul className="space-y-4">
            {values.map(value => (
              <li key={value.id} className="card card-hover p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <ValueIcon id={value.id} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-warm-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
