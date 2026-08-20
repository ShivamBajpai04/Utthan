import Link from 'next/link';

import { Suspense } from 'react';

import BrandLockup from '@/components/BrandLockup';
import HeroBackdrop from '@/components/HeroBackdrop';
import { donateCta, FOUNDING_YEAR } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] flex items-center bg-primary-950 overflow-hidden">
      {/* Warm organic background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950" />
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-accent-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-950/80 to-transparent" />
      </div>

      {/* Photography layers over the gradient when the gallery has any, and
          resolves to nothing when it does not. Its own boundary with a null
          fallback, so the hero text paints immediately either way. */}
      <Suspense fallback={null}>
        <HeroBackdrop />
      </Suspense>

      <div className="container-custom relative z-10 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* The organisation identifies itself before it makes its pitch. */}
          <div className="animate-fade-up mb-8">
            <BrandLockup size="lg" tone="dark" priority />
          </div>

          {/* The eyebrow said "Serving communities since 1991" directly above
              a paragraph that opened "Since 1991…". The year is load-bearing,
              so it stays — once, in the heading that has to earn attention. */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Standing with India&apos;s most marginalised communities{' '}
            <span className="text-primary-300">since {FOUNDING_YEAR}.</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-200/80 leading-relaxed max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Women&apos;s safety, disability rehabilitation, community health,
            family counselling, senior citizen welfare, and legal aid.
          </p>

          {/* One primary action, one secondary. A third equally-weighted
              button here just splits attention — "Book an appointment" used to
              sit here, pointing at a generic contact block, and nobody could
              tell what the appointment was for.

              The work leads, so it takes the white button. The giving ask
              takes terracotta, the one colour reserved for it site-wide, so it
              reads as a different kind of action rather than a quieter copy of
              the first. */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/projects"
              className="btn-on-dark bg-white text-primary-900 hover:bg-warm-100"
            >
              See our work
            </Link>
            <Link
              href={donateCta.href}
              className="btn-on-dark bg-accent-400 text-warm-900 hover:bg-accent-300"
            >
              {donateCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
