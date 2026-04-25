export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-warm-200 border-t-primary-600 mb-4" />
        <p className="text-warm-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
