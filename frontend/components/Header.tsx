'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/help', label: 'How to Help' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-custom" aria-label="Main">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 group-hover:scale-105 transition-transform duration-200">
              Utthan
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-medium transition-colors relative group ${
                    isActive ? 'text-primary-700' : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 transform transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
            <Link href="/help" className="btn-primary text-sm px-6 py-2">
              Donate
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 w-full glass-panel shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col space-y-4 animate-fade-in-up"
          >
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/help" className="btn-primary w-full text-center mt-4">
              Donate Now
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
