import Link from 'next/link';

import BrandLockup from '@/components/BrandLockup';
import { FOUNDING_YEAR } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] flex items-center bg-primary-950 overflow-hidden">
      {/* Warm organic background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950" />
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-accent-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-950/80 to-transparent" />
        {/* Subtle organic shapes */}
        <div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-primary-800/30 blur-3xl" />
        <div className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-accent-800/10 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* The organisation identifies itself before it makes its pitch. */}
          <div className="animate-fade-up mb-8">
            <BrandLockup size="lg" tone="dark" priority />
          </div>

          <p className="text-primary-300 text-sm font-medium tracking-widest uppercase mb-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            Serving communities since {FOUNDING_YEAR}
          </p>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Empowering communities.{' '}
            <span className="text-primary-300">Transforming lives.</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-200/80 leading-relaxed max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Since {FOUNDING_YEAR}, Utthan has worked alongside India&apos;s most
            marginalised communities — building dignity, creating opportunity,
            and fostering lasting change.
          </p>

          {/* One primary action, one secondary. A third equally-weighted
              button here just splits attention. */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[0.95rem] font-medium rounded-lg bg-white text-primary-900 hover:bg-warm-100 transition-all duration-200"
            >
              Explore our work
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[0.95rem] font-medium rounded-lg text-white border border-white/25 hover:bg-white/10 transition-all duration-200"
            >
              Support the mission
            </Link>
            <Link
              href="/help#contact"
              className="inline-flex items-center justify-center gap-1.5 px-2 py-3.5 text-[0.95rem] font-medium text-primary-200 hover:text-white transition-colors group"
            >
              Book an appointment
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
