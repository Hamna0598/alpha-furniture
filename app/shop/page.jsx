'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './shop.module.css';

const PAYLOAD = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

const CATS = [
  { label: 'All Products',  slug: 'All' },
  { label: 'Beds',          slug: 'beds' },
  { label: 'Sofas',         slug: 'sofas' },
  { label: 'Corner Sofas',  slug: 'corner-sofas' },
  { label: 'Dining Tables', slug: 'dining-tables' },
  { label: 'Accent Chairs', slug: 'accent-chairs' },
];

const SORTS = [
  ['', 'Default'],
  ['price-asc', 'Price: Low to High'],
  ['price-desc', 'Price: High to Low'],
];

function transformProduct(doc) {
  const firstImage = doc.gallery?.[0]?.image;
  const imageUrl = firstImage?.url ? `${PAYLOAD}${firstImage.url}` : null;
  const cat = doc.categories?.[0];
  return {
    id:            doc.id,
    name:          doc.title,
    slug:          doc.slug,
    price:         doc.priceInUSD || 0,
    originalPrice: 0,
    category:      cat?.slug || '',
    categoryName:  cat?.title || '',
    image:         imageUrl,
    images:        (doc.gallery || []).map(g => g.image?.url ? `${PAYLOAD}${g.image.url}` : null).filter(Boolean),
    inStock:       (doc.inventory || 0) > 0,
    rating:        5,
    reviewCount:   0,
    colors:        [],
    isNew:         false,
  };
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [category, setCategory]       = useState(searchParams.get('category') || 'All');
  const [sort, setSort]               = useState('');
  const [search, setSearch]           = useState(searchParams.get('search') || '');

  useEffect(() => {
    setLoading(true);
    fetch(`${PAYLOAD}/api/products?limit=100&depth=2&where[_status][equals]=published`)
      .then(r => r.json())
      .then(j => {
        setAllProducts((j.docs || []).map(transformProduct));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== 'All') {
      filtered = filtered.filter(p =>
        p.category === category ||
        p.category.replace(/-/g, '') === category.replace(/-/g, '')
      );
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    setProducts(filtered);
  }, [category, sort, search, allProducts]);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Our <em>Collection</em></h1>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Shop</span>
          </nav>
        </div>
      </header>

      <section className={styles.shopSection}>
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.catFilters}>
              {CATS.map(c => (
                <button
                  key={c.slug}
                  className={`${styles.catBtn}${category === c.slug ? ' ' + styles.active : ''}`}
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
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
              />
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingGrid}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '4/3' }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className={styles.noResults}>
              <p>No products found.</p>
              <button
                className="btn btn--outline"
                onClick={() => { setCategory('All'); setSearch(''); }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className={styles.resultCount}>
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
              <div className={styles.grid}>
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return <Suspense><ShopContent /></Suspense>;
}
