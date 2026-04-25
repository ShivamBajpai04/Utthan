import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="section-padding bg-primary-900 relative overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            Every act of support reaches someone who needs it
          </h2>
          <p className="text-xl text-primary-200/80 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether through donations, volunteering, or collaboration — you become
            part of a legacy of compassion and justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help#donate"
              className="btn-accent"
            >
              Make a donation
            </Link>
            <Link
              href="/help#volunteer"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[0.95rem] font-medium rounded-lg text-white border border-white/20 hover:bg-white/10 transition-all duration-200"
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
