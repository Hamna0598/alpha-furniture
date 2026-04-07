'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Header.module.css';

const NAV = [
  { href:'/', label:'Home' },
  { href:'/shop', label:'Shop' },
  { href:'/about', label:'About' },
  { href:'/contact', label:'Contact' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ]     = useState('');
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleSearch = e => {
    e.preventDefault();
    if (searchQ.trim()) { router.push(`/shop?search=${encodeURIComponent(searchQ.trim())}`); setSearchOpen(false); setSearchQ(''); }
  };

  return (
    <header className={`${styles.header}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.emblem} aria-hidden="true">α</div>
          <div className={styles.logoText}>
            <strong>Alpha Furniture</strong>
            <span>Quality is our First Priority</span>
          </div>
        </Link>

        <nav className={`${styles.nav}${menuOpen ? ' ' + styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {NAV.map(n => (
              <li key={n.href}>
                <Link href={n.href} className={`${styles.navLink}${pathname === n.href ? ' ' + styles.active : ''}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={() => setSearchOpen(p=>!p)} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <Link href="/shop" className={styles.iconBtn} aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
          </Link>
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
          <button className={styles.hamburger} onClick={() => setMenuOpen(p=>!p)} aria-label="Menu">
            <span className={menuOpen ? styles.lineOpen : styles.line} />
            <span className={menuOpen ? styles.lineOpen2 : styles.line} />
            <span className={menuOpen ? styles.lineOpen3 : styles.line} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className={styles.searchBar}>
          <div className="container">
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input type="search" value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                placeholder="Search beds, sofas, dining..." autoFocus
                className={styles.searchInput} />
              <button type="submit" className="btn btn--primary btn--sm">Search</button>
              <button type="button" onClick={() => setSearchOpen(false)} className={styles.searchClose}>✕</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
