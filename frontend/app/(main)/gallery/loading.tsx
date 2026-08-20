/**
 * Scoped to the gallery, which is the only dynamically-rendered route in this
 * group. It used to sit at `(main)/loading.tsx`, where it created a Suspense
 * boundary around the entire segment — so the homepage's first paint was this
 * spinner and nothing else, with the hero streaming in behind it. A nested
 * boundary inside `page.tsx` cannot help with that; the route-level fallback
 * wins. Removing it from the group is the fix.
 */
export default function Loading() {
  return (
    <div
      className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-warm-200 border-t-primary-600 mb-4" />
        <p className="text-warm-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}
