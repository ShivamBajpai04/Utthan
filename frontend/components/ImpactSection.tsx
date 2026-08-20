import { impactStats } from '@/lib/site';

export default function ImpactSection() {
  const stats = impactStats();

  return (
    <section className="section-padding bg-primary-950 text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* The heading used to read "Decades of meaningful change", which
            restated AboutPreview's "Over three decades of grassroots social
            work" 800px above it, and the paragraph beneath told the visitor
            what to feel about numbers they had not read yet. Both cut. */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-14 max-w-2xl">
          What the work adds up to
        </h2>

        {/* Four white tiles, each a big number over a small label, is the
            hero-metric scaffold — and it put the organisation's most credible
            assets in the same container as everything else on the page. A
            ruled band of figures on the dark ground gives them the weight they
            earn without another row of boxes, and `dl` gives a screen reader
            the value/label pairing that four divs did not. */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 divide-y divide-white/15 lg:divide-y-0 lg:divide-x">
          {stats.map(stat => (
            <div key={stat.label} className="py-8 lg:py-0 lg:px-8 lg:first:pl-0">
              <dt className="font-heading text-5xl lg:text-6xl leading-none mb-3">
                {stat.value}
              </dt>
              <dd className="text-primary-200/80 text-[0.95rem] leading-snug">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
