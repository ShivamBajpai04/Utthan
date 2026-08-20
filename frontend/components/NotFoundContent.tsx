import Link from 'next/link';

/**
 * Shared 404 body so the route-level and global not-found pages look identical.
 */
export default function NotFoundContent() {
  return (
    <div className="text-center max-w-lg mx-auto px-5">
      <p
        className="font-heading text-[7rem] md:text-[10rem] leading-none text-primary-200 select-none"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="font-heading text-3xl md:text-4xl text-warm-900 -mt-3 mb-4">
        Page not found
      </h1>
      <p className="body-lg mb-10 max-w-sm mx-auto">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/projects" className="btn-secondary">
          Browse our projects
        </Link>
      </div>
      <p className="text-sm text-warm-500 mt-8">
        Looking for something specific?{' '}
        <Link
          href="/help#contact"
          className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
        >
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}
