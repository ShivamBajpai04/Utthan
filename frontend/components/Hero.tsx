import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-6 border border-primary-200">
              ✨ Empowering Communities Since 1995
            </div>

            <h1 className="heading-1 mb-6">
              Empowering <span className="gradient-text">Communities</span>, <br />
              Transforming <span className="text-secondary-600">Lives</span>
            </h1>

            <p className="prose-custom text-xl mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-600">
              For decades, we have been dedicated to creating lasting social impact across India through
              women&apos;s empowerment, disability rehabilitation, community health, and social justice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/help" className="btn-primary group">
                Get Involved
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                50+ Projects
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                10k+ Beneficiaries
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                12 States
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-3xl rotate-3 opacity-20 blur-lg transform scale-105" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                <Image
                  src="/images/hero-illustration.png"
                  alt="Community Empowerment Illustration"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
