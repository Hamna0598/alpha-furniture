'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './shop.module.css';

// =======================
// CATEGORIES
// =======================
const CATS = [
  { label: 'All Products',  slug: 'All' },
  { label: 'Beds',          slug: 'beds' },
  { label: 'Sofas',         slug: 'sofas' },
  { label: 'Corner Sofas',  slug: 'cornersofas' },
  { label: 'Dining Tables', slug: 'dining' },
  { label: 'Accent Chairs', slug: 'accent' },
  { label: 'Wardrobes',     slug: 'wardrobes' },
];

const SORTS = [
  ['', 'Default'],
  ['price-asc', 'Price: Low to High'],
  ['price-desc', 'Price: High to Low'],
];

// =======================
// MAIN COMPONENT
// =======================
function ShopContent() {
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  );

  // =======================
  // FETCH FROM SUPABASE
  // =======================
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(r => r.json())
      .then(j => {
        if (j.success) setAllProducts(j.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // =======================
  // FILTER + SORT
  // =======================
  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== 'All') {
      filtered = filtered.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [category, sort, search, allProducts]);

  // =======================
  // UI
  // =======================
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">
            Our <em>Collection</em>
          </h1>
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Shop</span>
          </nav>
        </div>
      </header>

      <section className={styles.shopSection}>
        <div className="container">

          {/* FILTER BAR */}
          <div className={styles.toolbar}>
            <div className={styles.catFilters}>
              {CATS.map((c) => (
                <button
                  key={c.slug}
                  className={`${styles.catBtn} ${
                    category === c.slug ? styles.active : ''
                  }`}
                  onClick={() => setCategory(c.slug)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className={styles.sortWrap}>
              <input
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
              />

              <select
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORTS.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CONTENT */}
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <div className={styles.noResults}>
              <p>No products found.</p>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setCategory('All');
                  setSearch('');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// =======================
// WRAPPER
// =======================
export default function ShopPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShopContent />
    </Suspense>
  );
}