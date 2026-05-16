// ─────────────────────────────────────────────────────────
//  app/mood-shop/page.jsx
//  Mood-Based Shopping Experience page
//  Accessible at: /mood-shop
//  Also: Add a link in the Header NAV array or Footer as "Shop by Mood"
// ─────────────────────────────────────────────────────────
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './mood.module.css';

const MOODS = [
  {
    key:      'minimalist',
    label:    'Minimalist Style',
    emoji:    '🤍',
    tagline:  'Clean lines. Pure spaces. Less is more.',
    desc:     'Furniture for those who believe in the power of simplicity — neutral palettes, clean silhouettes, nothing unnecessary.',
    keywords: ['clean', 'simple', 'minimalist', 'white', 'modern', 'sleek'],
    gradient: 'linear-gradient(135deg, #f8f6f0 0%, #e8e4da 100%)',
    accent:   '#8A8070',
    cats:     ['beds', 'wardrobes', 'dining'],
  },
  {
    key:      'luxury',
    label:    'Luxury Living',
    emoji:    '✨',
    tagline:  'Elevate every room. Live exceptionally.',
    desc:     'Premium sheesham wood, rich finishes, and gold accents for those who demand the very best in their living spaces.',
    keywords: ['luxury', 'gold', 'royal', 'premium', 'cream', 'velvet'],
    gradient: 'linear-gradient(135deg, #1c1408 0%, #2a1f0a 100%)',
    accent:   '#C9963A',
    cats:     ['sofas', 'beds', 'accent'],
  },
  {
    key:      'gaming',
    label:    'Gaming Room Setup',
    emoji:    '🎮',
    tagline:  'Level up your space. Comfort meets performance.',
    desc:     'Ergonomic desks, storage solutions, and accent chairs designed for the ultimate gaming and streaming setup.',
    keywords: ['desk', 'chair', 'gaming', 'office', 'study', 'storage'],
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
    accent:   '#58a6ff',
    cats:     ['accent', 'wardrobes', 'dining'],
  },
  {
    key:      'study',
    label:    'Study Environment',
    emoji:    '📚',
    tagline:  'Focus deeper. Think clearer.',
    desc:     'Thoughtfully designed furniture that creates the ideal productive environment — from study tables to bookshelves and ergonomic seating.',
    keywords: ['study', 'desk', 'bookshelf', 'chair', 'workspace', 'office'],
    gradient: 'linear-gradient(135deg, #f0f4f8 0%, #dde4ed 100%)',
    accent:   '#3b6ea5',
    cats:     ['dining', 'accent', 'wardrobes'],
  },
  {
    key:      'cozy',
    label:    'Cozy Bedroom',
    emoji:    '🛏️',
    tagline:  'Sleep deeper. Wake up refreshed.',
    desc:     'Warm bedroom furniture with soft curves and inviting textures — because your bedroom should be your happiest escape.',
    keywords: ['cozy', 'warm', 'bed', 'soft', 'comfort', 'bedroom'],
    gradient: 'linear-gradient(135deg, #fdf6ee 0%, #f0e4d4 100%)',
    accent:   '#9a6320',
    cats:     ['beds', 'wardrobes', 'accent'],
  },
  {
    key:      'office',
    label:    'Modern Office',
    emoji:    '💼',
    tagline:  'Work smarter. Look professional.',
    desc:     'Sleek, functional office furniture that makes your home workspace feel like a premium corporate suite.',
    keywords: ['office', 'desk', 'professional', 'modern', 'minimal', 'corporate'],
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    accent:   '#e2b55a',
    cats:     ['dining', 'accent', 'wardrobes'],
  },
];

export default function MoodShopPage() {
  const [activeMood, setActiveMood] = useState(null);
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(false);

  const selectedMood = MOODS.find(m => m.key === activeMood);

  useEffect(() => {
    if (!activeMood || !selectedMood) return;
    setLoading(true);
    setProducts([]);

    // Fetch from multiple relevant categories
    const cats = selectedMood.cats;
    Promise.all(cats.map(cat => fetch(`/api/products?category=${cat}&limit=6`).then(r => r.json())))
      .then(results => {
        const merged = results
          .flatMap(r => (r.success ? r.data : []))
          // Deduplicate by id
          .filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)
          .slice(0, 8);
        setProducts(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeMood]);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Shop by <em>Mood</em></h1>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Mood Shop</span>
          </nav>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">

          {/* Intro */}
          <div className={styles.intro}>
            <span className="section-label">Curated for Your Lifestyle</span>
            <h2 className="section-title">What's Your <em>Vibe?</em></h2>
            <p className={styles.introDesc}>
              Stop browsing categories. Start with a feeling — we'll show you the furniture that fits your life.
            </p>
            <div className="divider-gold" />
          </div>

          {/* Mood Cards Grid */}
          <div className={styles.moodGrid}>
            {MOODS.map(mood => (
              <button
                key={mood.key}
                className={`${styles.moodCard} ${activeMood === mood.key ? styles.moodActive : ''}`}
                onClick={() => setActiveMood(activeMood === mood.key ? null : mood.key)}
                style={{ '--mood-gradient': mood.gradient, '--mood-accent': mood.accent }}
              >
                <div className={styles.moodBg} />
                <div className={styles.moodContent}>
                  <span className={styles.moodEmoji}>{mood.emoji}</span>
                  <h3 className={styles.moodLabel}>{mood.label}</h3>
                  <p className={styles.moodTagline}>{mood.tagline}</p>
                  <span className={styles.moodCta}>
                    {activeMood === mood.key ? 'Selected ✓' : 'Explore →'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected mood products */}
          {selectedMood && (
            <div className={styles.resultSection}>
              <div className={styles.resultHeader}>
                <div>
                  <span className={styles.resultMoodLabel}>
                    {selectedMood.emoji} {selectedMood.label}
                  </span>
                  <h2 className="section-title">{selectedMood.desc}</h2>
                </div>
                <Link href="/shop" className="btn btn--outline btn--sm">View All Products</Link>
              </div>

              {loading ? (
                <div className={styles.productsGrid}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton" style={{ aspectRatio: '4/3', borderRadius: '8px' }} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className={styles.productsGrid}>
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <span>{selectedMood.emoji}</span>
                  <p>Curating products for this mood... Check back soon or browse our full collection.</p>
                  <Link href="/shop" className="btn btn--primary">Browse All</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
