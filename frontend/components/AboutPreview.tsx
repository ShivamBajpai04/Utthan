import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-100/50 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-in-up">
            <h2 className="heading-2 mb-6">Who We Are</h2>
            <div className="prose-custom mb-8 text-gray-600">
              <p className="mb-4">
                Utthan is a trusted Indian NGO with a long history of dedicated social work.
                We operate across multiple domains, serving both urban and rural communities
                with programs that create meaningful, lasting change.
              </p>
              <p>
                Our work spans women&apos;s safety and empowerment, disability rehabilitation,
                community health, family counselling, senior citizen welfare, legal aid,
                and cultural initiatives.
              </p>
            </div>
            <Link href="/about" className="btn-primary">
              Read Our Story
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gray-50 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
              {/* Placeholder illustration */}
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 font-medium">Organization Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
