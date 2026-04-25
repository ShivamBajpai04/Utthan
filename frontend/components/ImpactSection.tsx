const stats = [
  { value: '50+', label: 'Years of Service' },
  { value: '100K+', label: 'Lives Touched' },
  { value: '25+', label: 'Active Programmes' },
  { value: '15+', label: 'Centres & Locations' },
];

export default function ImpactSection() {
  return (
    <section className="section-padding bg-cream-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100/30 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="chip bg-primary-100 text-primary-800 mb-5">Our impact</p>
          <h2 className="heading-2 mb-4">
            Decades of meaningful change
          </h2>
          <p className="body-lg">
            The numbers tell a story of persistence, compassion, and communities
            lifting themselves toward a better future.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-xl bg-white border border-warm-200/60 shadow-card"
            >
              <div className="font-heading text-4xl md:text-5xl text-primary-800 mb-2">
                {stat.value}
              </div>
              <div className="text-warm-500 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
