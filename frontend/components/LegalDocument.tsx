export type LegalSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

/**
 * Shared shell for the privacy and terms pages. These are long-form prose
 * pages with no CMS content, so the markup is styled directly rather than
 * through the Portable Text renderer.
 */
export default function LegalDocument({
  title,
  updated,
  intro,
  sections,
  notice,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  notice?: string;
}) {
  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <h1 className="heading-1 mb-4">{title}</h1>
        <p className="text-sm text-warm-400 mb-8">Last updated: {updated}</p>

        {notice && (
          <p className="mb-10 text-sm text-warm-700 bg-warm-50 border border-warm-200 rounded-lg px-5 py-4">
            {notice}
          </p>
        )}

        <p className="body-lg mb-12 max-w-2xl">{intro}</p>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="font-heading text-2xl text-warm-900 mb-4">
                {index + 1}. {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map(paragraph => (
                  <p key={paragraph} className="text-warm-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 space-y-2 pl-5 list-disc text-warm-600 leading-relaxed marker:text-warm-300">
                  {section.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
