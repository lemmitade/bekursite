'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

interface NavbarProps {
  settings: {
    companyName: string;
    whatsappNumber: string;
    whatsappMessage: string;
    primaryCtaText: string;
  };
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/sister-companies', label: 'Sister Companies' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/future', label: 'Future' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const showSolid = scrolled || !isHome;
  const logoSrc = !showSolid || theme === 'dark' ? '/images/logo-light.png' : '/images/logo-dark.png';

  return (
    <>
      <nav className={`navbar ${showSolid ? 'navbar--solid' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo" aria-label="Bekur Home">
            <img
              src={logoSrc}
              alt="BEKUR General Trading"
              className="navbar__logo-img"
            />
          </Link>

          <div className="navbar__nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--nav" style={{ display: 'none' }} id="nav-cta-desktop">
              {settings.primaryCtaText}
            </a>
            <Link href="/contact" className="btn btn--nav" id="nav-cta-contact">
              {settings.primaryCtaText}
            </Link>

            <button
              className={`hamburger ${mobileOpen ? 'hamburger--active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="hamburger__line" />
              <span className="hamburger__line" />
              <span className="hamburger__line" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu__overlay ${mobileOpen ? 'mobile-menu__overlay--visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="mobile-menu__link">
            {link.label}
          </Link>
        ))}
        <div className="mobile-menu__cta">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
            {settings.primaryCtaText}
          </a>
        </div>
      </div>
    </>
  );
}
