'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Header.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ]       = useState('');
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSearch = e => {
    e.preventDefault();
    if (searchQ.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ('');
    }
  };

  return (
    <header className={`${styles.header}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.emblem} aria-hidden="true">
            <span>α</span>
          </div>
          <div className={styles.logoText}>
            <strong>Alpha Furniture</strong>
            <span>Quality is our First Priority</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={`${styles.nav}${menuOpen ? ' ' + styles.navOpen : ''}`} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV.map(n => (
              <li key={n.href} className={styles.navItem}>
                <Link
                  href={n.href}
                  className={`${styles.navLink}${pathname === n.href ? ' ' + styles.active : ''}`}
                >
                  {n.label}
                  <span className={styles.navUnderline} />
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <Link href="/cart" className={styles.mobileActionBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Cart {totalItems > 0 && <span className={styles.mobileBadge}>{totalItems}</span>}
            </Link>
          </div>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(p => !p)}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <Link href="/shop" className={styles.iconBtn} aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
          </Link>

          <Link href="/cart" className={`${styles.iconBtn} ${styles.cartBtn}`} aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>

          <button
            className={`${styles.hamburger}${menuOpen ? ' ' + styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className={styles.searchBar}>
          <div className="container">
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search beds, sofas, dining tables…"
                autoFocus
                className={styles.searchInput}
              />
              <button type="submit" className="btn btn--primary btn--sm">Search</button>
              <button type="button" onClick={() => setSearchOpen(false)} className={styles.searchClose} aria-label="Close search">✕</button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
