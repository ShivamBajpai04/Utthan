export default function ImpactSection() {
  const impactStats = [
    { value: "50+", label: "Years of Service" },
    { value: "100K+", label: "Lives Touched" },
    { value: "25+", label: "Active Programs" },
    { value: "15+", label: "Centers & Locations" },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6 text-white">Our Impact</h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Decades of dedicated work have created meaningful change across communities,
            touching lives and building a brighter future.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-primary-200">
                {stat.value}
              </div>
              <div className="text-primary-100 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
