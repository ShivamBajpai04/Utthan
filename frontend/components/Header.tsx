'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/help', label: 'Get Involved' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent py-4'
          : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-warm-200/50 py-2'
      }`}
    >
      <nav className="container-custom" aria-label="Main">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-heading text-2xl transition-colors ${
                transparent
                  ? 'text-white group-hover:text-primary-200'
                  : 'text-primary-800 group-hover:text-primary-900'
              }`}
            >
              Utthan
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-md text-[0.9rem] font-medium transition-colors ${
                    transparent
                      ? isActive
                        ? 'text-white bg-white/15'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-warm-600 hover:text-warm-900 hover:bg-warm-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/help#donate"
              className={`text-sm ml-3 px-5 py-2.5 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ${
                transparent
                  ? 'bg-white text-primary-900 hover:bg-warm-100'
                  : 'btn-primary'
              }`}
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 rounded-md transition-colors ${
              transparent
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-warm-600 hover:text-warm-900 hover:bg-warm-100'
            }`}
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-warm-200 shadow-soft animate-fade-in"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navItems.map(item => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-2.5 px-3 rounded-md text-[0.95rem] font-medium transition-colors ${
                      isActive
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-warm-700 hover:text-warm-900 hover:bg-warm-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/help#donate" className="btn-primary w-full text-center mt-3">
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
