import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StickyDonateBar from '@/components/StickyDonateBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-primary-800 focus:font-medium focus:shadow-md"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <StickyDonateBar />
      {/* Reserves the space the fixed bar occupies so it never covers the
          end of the footer on mobile. */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
