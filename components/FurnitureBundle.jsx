// ─────────────────────────────────────────────────────────
//  FurnitureBundle.jsx
//  Location: components/FurnitureBundle.jsx
//
//  Usage: Add at the bottom of app/product/[slug]/page.jsx,
//  inside the <article> container, after the Related section.
//
//    import FurnitureBundle from '@/components/FurnitureBundle';
//    <FurnitureBundle product={product} />
//
//  Works for: sofas, beds, dining, cornersofas, accent, wardrobes
// ─────────────────────────────────────────────────────────
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './FurnitureBundle.module.css';

// ── Bundle rules per category ───────────────────────────────
const BUNDLE_RULES = {
  sofas: {
    title:    'Complete Your Living Room',
    subtitle: 'Customers who bought this sofa also loved:',
    items: [
      { icon: '☕', label: 'Matching Coffee Table',  cats: ['dining'],      hint: 'Perfect size match' },
      { icon: '🪑', label: 'Accent Side Chairs',     cats: ['accent'],      hint: 'For extra seating' },
      { icon: '💡', label: 'Floor Lamp',             cats: [],              hint: 'Lighting & ambiance', static: true },
      { icon: '🟤', label: 'Area Rug',               cats: [],              hint: 'Ties the room together', static: true },
    ],
    saving: 'Bundle saves up to 12%',
  },
  cornersofas: {
    title:    'Complete Your Living Space',
    subtitle: 'Pair your corner sofa with:',
    items: [
      { icon: '☕', label: 'Centre Coffee Table',    cats: ['dining'],      hint: 'Sized for corner sofas' },
      { icon: '🪑', label: 'Accent Chair',           cats: ['accent'],      hint: 'Fill the corner perfectly' },
      { icon: '💡', label: 'Arc Floor Lamp',         cats: [],              hint: 'Statement lighting', static: true },
      { icon: '📺', label: 'TV Unit / Console',      cats: [],              hint: 'Completes the setup', static: true },
    ],
    saving: 'Bundle saves up to 10%',
  },
  beds: {
    title:    'Complete Your Bedroom',
    subtitle: 'Build the perfect bedroom set:',
    items: [
      { icon: '🚪', label: 'Matching Wardrobe',      cats: ['wardrobes'],   hint: 'Same wood finish' },
      { icon: '🪑', label: 'Bedside Chair',          cats: ['accent'],      hint: 'Elegant reading spot' },
      { icon: '💡', label: 'Bedside Lamps (pair)',   cats: [],              hint: 'Warm bedroom glow', static: true },
      { icon: '🪞', label: 'Dressing Mirror',        cats: [],              hint: 'Full-length or tabletop', static: true },
    ],
    saving: 'Bundle saves up to 15%',
  },
  wardrobes: {
    title:    'Complete Your Bedroom',
    subtitle: 'Match your wardrobe with:',
    items: [
      { icon: '🛏️', label: 'Matching Bed Frame',    cats: ['beds'],        hint: 'Same sheesham wood' },
      { icon: '🪑', label: 'Bedroom Chair',          cats: ['accent'],      hint: 'Cosy reading corner' },
      { icon: '🪞', label: 'Wall Mirror',            cats: [],              hint: 'Dress & groom', static: true },
      { icon: '💡', label: 'Bedside Lamp',           cats: [],              hint: 'Warm ambient light', static: true },
    ],
    saving: 'Bundle saves up to 12%',
  },
  dining: {
    title:    'Complete Your Dining Space',
    subtitle: 'Transform your dining room:',
    items: [
      { icon: '🪑', label: 'Accent Chairs Set',      cats: ['accent'],      hint: 'Head-of-table chairs' },
      { icon: '🛋️', label: 'Side Buffet / Cabinet', cats: ['wardrobes'],   hint: 'For storage & display' },
      { icon: '💡', label: 'Pendant Light',          cats: [],              hint: 'Above dining table', static: true },
      { icon: '🌿', label: 'Table Centrepiece',      cats: [],              hint: 'Vases, candles, trays', static: true },
    ],
    saving: 'Bundle saves up to 10%',
  },
  accent: {
    title:    'Build a Reading Nook',
    subtitle: 'Create the perfect cosy corner:',
    items: [
      { icon: '💡', label: 'Arc Floor Lamp',         cats: [],              hint: 'Direct reading light', static: true },
      { icon: '📚', label: 'Small Bookshelf',        cats: ['wardrobes'],   hint: 'Arm\'s reach reading' },
      { icon: '🟤', label: 'Small Area Rug',         cats: [],              hint: 'Grounds the nook', static: true },
      { icon: '☕', label: 'Side Table',             cats: ['dining'],      hint: 'For your cup & books' },
    ],
    saving: 'Bundle saves up to 8%',
  },
};

export default function FurnitureBundle({ product }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(new Set());
  const [toast, setToast]             = useState('');

  const rule = BUNDLE_RULES[product?.category];
  if (!rule) return null;

  useEffect(() => {
    if (!rule) return;
    setLoading(true);

    // Fetch products for each non-static bundle item
    const fetches = rule.items.map(item => {
      if (item.static) return Promise.resolve(null);
      const cat = item.cats?.[0];
      if (!cat) return Promise.resolve(null);
      return fetch(`/api/products?category=${cat}&limit=3`)
        .then(r => r.json())
        .then(j => j.success && j.data?.length > 0 ? j.data[0] : null)
        .catch(() => null);
    });

    Promise.all(fetches).then(results => {
      const merged = rule.items.map((item, i) => ({
        ...item,
        product: results[i],
      }));
      setSuggestions(merged);
      setLoading(false);
    });
  }, [product?.id]);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const toggleSelect = key => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // Estimate bundle price
  const bundleTotal = suggestions.reduce((acc, s) => acc + (s.product?.price || 0), 0);
  const bundleSave  = Math.round(bundleTotal * 0.10);

  return (
    <section className={styles.bundle}>
      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Header */}
      <header className={styles.bundleHeader}>
        <div className={styles.bundleIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <div>
          <span className="section-label">Smart Bundle</span>
          <h2 className={styles.bundleTitle}>{rule.title}</h2>
          <p className={styles.bundleSubtitle}>{rule.subtitle}</p>
        </div>
        {bundleTotal > 0 && (
          <div className={styles.bundleSavingTag}>
            <span>{rule.saving}</span>
          </div>
        )}
      </header>

      {/* Bundle Items */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '220px', borderRadius: '8px' }} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {/* Current product (anchor) */}
          <div className={`${styles.card} ${styles.anchorCard}`}>
            <div className={styles.anchorBadge}>Viewing</div>
            {product.images?.[0] && (
              <figure className={styles.cardImg}>
                <img src={product.images[0]} alt={product.name} />
              </figure>
            )}
            <div className={styles.cardBody}>
              <p className={styles.cardCat}>{product.category}</p>
              <h4 className={styles.cardName}>{product.name}</h4>
              <span className={styles.cardPrice}>PKR {product.price?.toLocaleString()}</span>
            </div>
          </div>

          {/* Plus separator */}
          <div className={styles.plus} aria-hidden>+</div>

          {/* Suggested items */}
          {suggestions.map((s, i) => {
            const isSelected = selected.has(`suggestion-${i}`);
            return (
              <div
                key={i}
                className={`${styles.card} ${styles.suggestCard} ${isSelected ? styles.selected : ''}`}
                onClick={() => {
                  if (!s.static && s.product) toggleSelect(`suggestion-${i}`);
                  else showToast(`${s.label} — available at our showroom!`);
                }}
              >
                {/* Add/check toggle */}
                <button
                  className={`${styles.checkBtn} ${isSelected ? styles.checked : ''}`}
                  onClick={e => { e.stopPropagation(); toggleSelect(`suggestion-${i}`); }}
                  aria-label={isSelected ? 'Remove from bundle' : 'Add to bundle'}
                >
                  {isSelected ? '✓' : '+'}
                </button>

                {/* Image or emoji fallback */}
                {s.product?.images?.[0] ? (
                  <figure className={styles.cardImg}>
                    <img src={s.product.images[0]} alt={s.product.name} />
                  </figure>
                ) : (
                  <div className={styles.emojiImg}>
                    <span>{s.icon}</span>
                  </div>
                )}

                <div className={styles.cardBody}>
                  <p className={styles.cardCat}>{s.hint}</p>
                  <h4 className={styles.cardName}>
                    {s.product ? s.product.name : s.label}
                  </h4>
                  {s.product ? (
                    <span className={styles.cardPrice}>PKR {s.product.price?.toLocaleString()}</span>
                  ) : (
                    <span className={styles.cardPriceNA}>Ask in-store</span>
                  )}
                </div>

                {s.product && (
                  <Link
                    href={`/product/${s.product.slug}`}
                    className={styles.viewLink}
                    onClick={e => e.stopPropagation()}
                  >
                    View →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bundle CTA */}
      {bundleTotal > 0 && (
        <div className={styles.bundleCta}>
          <div className={styles.bundlePricing}>
            <div>
              <span className={styles.bundlePriceLabel}>Bundle Price</span>
              <span className={styles.bundlePriceVal}>PKR {(bundleTotal + product.price).toLocaleString()}</span>
            </div>
            <div className={styles.bundleSaveNote}>Save up to PKR {bundleSave.toLocaleString()} when you bundle</div>
          </div>
          <a
            href={`https://wa.me/923214877048?text=${encodeURIComponent(`Hi! I'm interested in a furniture bundle based on "${product.name}". Please help me complete my set.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            📱 Enquire Bundle on WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}
