'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { headerCta, primaryNav } from '@/content/nav';
import { track } from '@/lib/analytics';
import { LogoLink } from './Logo';
import { Container, cx } from './primitives';

/**
 * Header - Volume 2 s.29.
 *
 * Sticky, shrinks on scroll, CTA always visible, collapses to logo + CTA +
 * menu button under 1024px. Keyboard operable with aria-expanded on the menu.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes the menu; otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes and returns focus to the toggle, per WCAG 2.2 keyboard rules.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cx(
        'sticky top-0 z-40 bg-black transition-[padding] duration-200',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <LogoLink tone="light" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cx(
                        'inline-block border-b-2 py-2 text-small-lg transition',
                        active ? 'border-gold text-cream' : 'border-transparent text-mist hover:text-cream',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={headerCta.href}
              onClick={() => track.ctaClick('header', headerCta.label)}
              className="inline-flex min-h-[44px] items-center rounded bg-cream px-4 py-2 text-small-lg font-semibold text-black transition hover:bg-gold"
            >
              {headerCta.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded text-cream lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!open}
          className="lg:hidden"
        >
          <nav aria-label="Primary mobile" className="border-t border-sage/30 py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-body-lg text-cream"
                    aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
