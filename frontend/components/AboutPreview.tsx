import Link from 'next/link';

import { decadesOfService, values } from '@/lib/site';

export default function AboutPreview() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — narrative */}
          <div>
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
              never list a different set.

              These were five cards with stock icon tiles: five same-size boxes
              of icon + heading + text, which is the page-scaffold pattern the
              rest of this homepage was already overusing, and the icons were
              unmodified library glyphs that said nothing about this work — the
              one for "Long-term Impact" was a clock. A list is what this is,
              so it is now a list, and the type carries it. */}
          <dl className="divide-y divide-warm-200 border-t border-warm-200">
            {values.map(value => (
              <div key={value.id} className="py-5 first:pt-6">
                <dt className="font-heading text-lg text-warm-900 mb-1">
                  {value.title}
                </dt>
                <dd className="text-warm-500 text-[0.95rem] leading-relaxed">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
