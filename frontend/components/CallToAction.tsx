import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-primary-600" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6 text-white text-4xl md:text-5xl">Join Us in Making a Difference</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Your support helps us continue our mission of empowering communities and
              transforming lives. Whether through donations, volunteering, or collaboration,
              every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help#donate" className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-lg">
                Donate Now
              </Link>
              <Link href="/help#volunteer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
