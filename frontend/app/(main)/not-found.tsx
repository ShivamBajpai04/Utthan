import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-5">
        <p className="font-heading text-7xl text-primary-200 mb-4">404</p>
        <h1 className="font-heading text-3xl text-warm-900 mb-3">Page not found</h1>
        <p className="body-lg mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}
