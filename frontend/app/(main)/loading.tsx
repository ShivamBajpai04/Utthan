export default function Loading() {
  return (
    <div
      className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-warm-200 border-t-primary-600 mb-4" />
        <p className="text-warm-400 text-sm">Loading…</p>
      </div>
    </div>
  );
}
