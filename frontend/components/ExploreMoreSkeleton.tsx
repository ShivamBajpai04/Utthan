/**
 * Placeholder for `ExploreMore` while its gallery photograph resolves. Mirrors
 * the real section's chrome so the heading and copy — which are static — do not
 * shift when the cards arrive.
 */
export default function ExploreMoreSkeleton() {
  return (
    <section className="section-padding bg-warm-50">
      <div className="container-custom">
        <div className="max-w-2xl mb-12">
          <h2 className="heading-2 mb-4">See the work up close</h2>
          <p className="body-lg">
            Numbers only say so much. These are the photographs and the
            first-hand accounts behind them.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          role="status"
          aria-label="Loading"
        >
          {[0, 1].map(i => (
            <div key={i} className="card overflow-hidden animate-pulse">
              {i === 0 && <div className="aspect-16/10 bg-warm-300" />}
              <div className="p-8">
                <div className="h-7 w-1/2 rounded bg-warm-300 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-warm-300" />
                  <div className="h-3 w-3/4 rounded bg-warm-300" />
                </div>
                <div className="h-3 w-32 rounded bg-warm-300 mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
