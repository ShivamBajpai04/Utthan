import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Utthan is a trusted Indian NGO dedicated to empowering urban and rural communities through programmes grounded in dignity, participation, inclusion, justice, and long-term impact.',
};

const timeline = [
  { year: '1995', text: 'Founded with a mission to serve India\u2019s most marginalised communities.' },
  { year: '2000s', text: 'Expanded into disability rehabilitation, legal aid, and women\u2019s empowerment programmes.' },
  { year: '2010s', text: 'Grew to 15+ centres across multiple states, reaching over 100,000 beneficiaries.' },
  { year: 'Today', text: 'Continuing to build lasting impact through community-led projects, health initiatives, and advocacy.' },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Intro */}
        <div className="max-w-3xl mb-20">
          <p className="chip bg-primary-50 text-primary-700 mb-5">About Utthan</p>
          <h1 className="heading-1 mb-6">
            Compassion without pity. Empowerment without dependency.
          </h1>
          <p className="body-xl">
            Utthan is a trusted Indian NGO with a long history of dedicated social
            work. We operate across multiple domains, serving both urban and rural
            communities with programmes that create meaningful, lasting change.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="card p-8 md:p-10">
            <h2 className="font-heading text-2xl text-warm-900 mb-4">Our Mission</h2>
            <p className="body-lg">
              To work alongside communities in building self-reliance, social
              justice, and human dignity — focusing on the most vulnerable and
              marginalised sections of society.
            </p>
          </div>
          <div className="card p-8 md:p-10">
            <h2 className="font-heading text-2xl text-warm-900 mb-4">Our Vision</h2>
            <p className="body-lg">
              A just and equitable India where every individual has access to
              opportunities, rights, and a life of dignity, regardless of their
              social or economic background.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="heading-2 mb-10">Our journey</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-600 ring-4 ring-primary-100 shrink-0 mt-1.5" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-warm-200 my-1" />
                  )}
                </div>
                <div className="pb-10">
                  <span className="text-sm font-semibold text-primary-700">{item.year}</span>
                  <p className="body-lg mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="heading-2 mb-4">What guides us</h2>
          <p className="body-lg max-w-2xl mb-10">
            Every programme, every partnership, and every decision is rooted in
            these core principles.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {['Dignity', 'Participation', 'Inclusion', 'Justice', 'Long-term Impact'].map(
              value => (
                <div
                  key={value}
                  className="card p-5 text-center"
                >
                  <span className="font-heading text-lg text-warm-800">{value}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
