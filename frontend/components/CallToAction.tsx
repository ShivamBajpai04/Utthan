import Link from 'next/link';

import { donateCta } from '@/lib/site';

export default function CallToAction() {
  return (
    <section className="section-padding bg-primary-900">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            Every act of support reaches someone who needs it
          </h2>
          <p className="text-xl text-primary-200/80 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether through donations, volunteering, or collaboration — you become
            part of a legacy of compassion and justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* The ring offset defaults to white, which on this ground reads
                as a halo rather than a gap. */}
            <Link
              href={donateCta.href}
              className="btn-accent focus-visible:ring-offset-primary-900"
            >
              {donateCta.label}
            </Link>
            {/* border-white/20 measured 1.7:1 — an invisible boundary. /40 is
                3.41:1, the minimum for a non-text indicator. */}
            <Link
              href="/help#volunteer"
              className="btn-on-dark text-white border border-white/40 hover:bg-white/10"
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
