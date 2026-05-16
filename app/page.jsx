'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const CATEGORIES = [
  { key: 'beds',        label: 'Beds',          img: '/images/beds/bed-teal-modern.png',           count: '32+ Styles' },
  { key: 'wardrobes',   label: 'Wardrobes',      img: '/images/beds/bed-pure-wooden.png',           count: '18+ Styles' },
  { key: 'sofas',       label: 'Sofas',          img: '/images/sofas/sofa-royal-gold.png',          count: '45+ Styles' },
  { key: 'cornersofas', label: 'Corner Sofas',   img: '/images/cornersofas/corner-ushape-brown.png',count: '24+ Styles' },
  { key: 'dining',      label: 'Dining Tables',  img: '/images/dining/dining-luxury-carved.png',    count: '20+ Styles' },
  { key: 'accent',      label: 'Accent Chairs',  img: '/images/accent/accent-cream-gold.png',       count: '15+ Styles' },
];

const TESTIMONIALS = [
  { name: 'Ayesha Malik',  city: 'Lahore',    rating: 5, text: 'Absolutely stunning bed frame! The craftsmanship is impeccable and delivery was on time. Alpha Furniture exceeded all my expectations.', init: 'AM' },
  { name: 'Hassan Riaz',   city: 'Karachi',   rating: 5, text: 'Ordered a complete dining set and I am beyond impressed. The quality of sheesham wood is unmatched. Highly recommend to everyone.', init: 'HR' },
  { name: 'Sana Ahmed',    city: 'Islamabad', rating: 5, text: 'The corner sofa is a masterpiece. My whole family loves it. Customer service was excellent from order to delivery.', init: 'SA' },
  { name: 'Bilal Chaudhry',city: 'Lahore',    rating: 5, text: 'Second purchase from Alpha and they never disappoint. The wardrobe is solid, beautifully finished, and arrived exactly on schedule.', init: 'BC' },
];

const FILTER_TABS = ['All', 'Beds', 'Sofas', 'Dining', 'Accent'];

const WHY_ITEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Premium Sheesham Wood',
    desc: 'All furniture crafted from solid, sustainably sourced sheesham wood — known for its exceptional density and natural grain beauty.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    title: '15+ Years of Craftsmanship',
    desc: 'Over a decade of experience building heirloom-quality furniture. Each piece is hand-finished by our master craftsmen in Lahore.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Free Delivery Across Pakistan',
    desc: 'We deliver to all major cities — Lahore, Karachi, Islamabad, and more. Free delivery on orders above PKR 10,000.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
      </svg>
    ),
    title: '2-Year Warranty',
    desc: 'Every bedroom set and sofa comes backed with our 2-year structural warranty. Quality you can trust for years to come.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Custom Orders Welcome',
    desc: 'Don\'t see your perfect match? We offer custom sizing, finishes, and upholstery to create the furniture of your dreams.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.19-1.19a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: '24/7 Customer Support',
    desc: 'Our dedicated team is always here to help — call, WhatsApp, or email us. Real people, real support, every time.',
  },
];

const STATS = [
  { num: '10,000+', label: 'Happy Customers' },
  { num: '15+',    label: 'Years Experience' },
  { num: '500+',   label: 'Furniture Designs' },
  { num: '25+',    label: 'Cities Delivered' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [filter, setFilter]     = useState('All');
  const [email, setEmail]       = useState('');
  const [subDone, setSubDone]   = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
    fetch('/api/products?featured=true&limit=12')
      .then(r => r.json())
      .then(j => { if (j.success) setFeatured(j.data); })
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const filtered = filter === 'All'
    ? featured.slice(0, 8)
    : featured.filter(p => p.category?.toLowerCase().includes(filter.toLowerCase())).slice(0, 8);

  return (
    <>
      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />

        <figure className={styles.heroImgPanel}>
          <img src="/images/hero/hero-main.png" alt="Alpha Furniture Showroom" />
          <div className={styles.heroImgOverlay} />
        </figure>

        <div className={`${styles.heroContent} container`}>
          <div className={`${styles.heroInner} ${heroLoaded ? styles.heroVisible : ''}`}>
            <p className={styles.heroTag}>
              <span className={styles.heroTagLine} />
              Premium Craftsmanship Since 2010
            </p>
            <h1 className={styles.heroTitle}>
              Elevate Your<br />
              <em>Living Space</em><br />
              with Alpha
            </h1>
            <p className={styles.heroDesc}>
              Discover exquisite furniture crafted with the finest sheesham wood — where
              timeless design meets exceptional quality, delivered across Pakistan.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/shop" className="btn btn--primary btn--lg">
                Shop Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
              <Link href="/about" className="btn btn--outline-light">
                Our Story
              </Link>
              <Link href="/mood-shop" className="btn btn--ghost">
                ✨ Shop by Mood
              </Link>
            </div>
          </div>


          {/* Floating stats card */}
          <div className={`${styles.heroStats} ${heroLoaded ? styles.heroStatsVisible : ''}`}>
            {STATS.map(s => (
              <div key={s.label} className={styles.heroStat}>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span className={styles.heroScrollDot} />
          <small>Scroll to explore</small>
        </div>
      </section>

      {/* ════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════ */}
      <aside className={styles.trustBar}>
        <ul className={`${styles.trustList} container`}>
          {[
            { icon: '🚚', title: 'Free Delivery',       desc: 'On orders above PKR 10,000' },
            { icon: '🔄', title: 'Easy Returns',        desc: '7-day hassle-free returns' },
            { icon: '📞', title: '24/7 Support',        desc: 'Call +92 321 4877048' },
            { icon: '🛡️', title: 'Quality Guarantee',  desc: '2-Year structural warranty' },
          ].map(({ icon, title, desc }) => (
            <li key={title} className={styles.trustItem}>
              <span className={styles.trustIcon}>{icon}</span>
              <div>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════ */}
      <section className={styles.catSection}>
        <div className="container">
          <header className={`section-header section-header--center`}>
            <span className="section-label">Browse by Collection</span>
            <h2 className="section-title">Our Furniture <em>Collections</em></h2>
            <div className="divider-gold divider-gold--center" />
          </header>

          <div className={styles.catGrid}>
            {CATEGORIES.map((c, i) => (
              <Link key={c.key} href={`/shop/${c.key}`} className={styles.catCard} style={{ animationDelay: `${i * 0.07}s` }}>
                <figure className={styles.catImg}>
                  <img src={c.img} alt={c.label} loading="lazy" />
                </figure>
                <div className={styles.catGradient} />
                <div className={styles.catInfo}>
                  <span className={styles.catCount}>{c.count}</span>
                  <h3 className={styles.catName}>{c.label}</h3>
                  <span className={styles.catCta}>
                    Explore Collection
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════ */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.featuredHeader}>
            <div>
              <span className="section-label">Handpicked for You</span>
              <h2 className="section-title">Featured <em>Products</em></h2>
              <div className="divider-gold" />
            </div>
            <div className={styles.filterTabs}>
              {FILTER_TABS.map(t => (
                <button
                  key={t}
                  className={`${styles.filterTab}${filter === t ? ' ' + styles.filterActive : ''}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {featured.length === 0 ? (
            <div className={styles.productsGrid}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '4/3', borderRadius: '8px' }} />
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          <div className={styles.featuredFooter}>
            <Link href="/shop" className="btn btn--outline btn--lg">
              View All Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════ */}
      <section className={styles.whySection}>
        <div className={styles.whyBg} />
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label" style={{ color: 'var(--gold)' }}>Our Promise</span>
            <h2 className="section-title section-title--light">Why Choose <em>Alpha</em></h2>
            <div className="divider-gold divider-gold--center" />
          </header>

          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item, i) => (
              <div key={item.title} className={styles.whyCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROMO BANNERS
      ════════════════════════════════════ */}
      <section className={styles.promoSection}>
        <div className="container">
          <div className={styles.promoGrid}>
            {[
              { img: '/images/beds/bed-empire-set.png',     badge: 'Up to 30% Off',  title: 'Premium Bedroom Sets',    sub: 'King & Queen sizes available', href: '/shop/beds' },
              { img: '/images/sofas/sofa-cream-luxury.png', badge: 'New Arrivals',   title: 'Luxury Sofa Collections', sub: 'L-shaped & corner sofas',      href: '/shop/sofas' },
            ].map((b, i) => (
              <Link key={i} href={b.href} className={styles.promoCard}>
                <figure className={styles.promoImg}>
                  <img src={b.img} alt={b.title} loading="lazy" />
                </figure>
                <div className={styles.promoOverlay} />
                <div className={styles.promoContent}>
                  <span className={styles.promoBadge}>{b.badge}</span>
                  <h3 className={styles.promoTitle}>{b.title}</h3>
                  <p className={styles.promoSub}>{b.sub}</p>
                  <span className="btn btn--outline-light btn--sm">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section className={styles.testimonials}>
        <div className={styles.testBg} />
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label">Customer Stories</span>
            <h2 className="section-title section-title--light">Trusted by <em>Thousands</em></h2>
            <div className="divider-gold divider-gold--center" />
          </header>

          <div className={styles.testGrid}>
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={t.name} className={styles.testCard} style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Stars */}
                <div className={styles.testStars}>
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--gold)' }}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>

                <span className={styles.quoteMark}>"</span>
                <p className={styles.testText}>{t.text}</p>

                <footer className={styles.testAuthor}>
                  <div className={styles.avatar}>{t.init}</div>
                  <div>
                    <cite className={styles.authorName}>{t.name}</cite>
                    <span className={styles.authorCity}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {t.city}, Pakistan
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SHOWROOM CTA
      ════════════════════════════════════ */}
      <section className={styles.showroom}>
        <div className="container">
          <div className={styles.showroomInner}>
            <div className={styles.showroomText}>
              <span className="section-label">Visit Us</span>
              <h2 className={styles.showroomTitle}>Experience Furniture<br /><em>In Person</em></h2>
              <p>Visit our flagship showroom in Lahore's iconic Ichra Furniture Market — see, touch, and feel the quality before you buy.</p>
              <Link href="/contact" className="btn btn--primary btn--lg">Get Directions →</Link>
            </div>
            <div className={styles.showroomDetails}>
              {[
                { icon: '📍', label: 'Address', val: 'Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore' },
                { icon: '📞', label: 'Phone',   val: '+92 321 4877048' },
                { icon: '🕐', label: 'Hours',   val: 'Monday – Saturday: 10am – 8pm' },
              ].map(d => (
                <div key={d.label} className={styles.showroomDetail}>
                  <span className={styles.showroomDetailIcon}>{d.icon}</span>
                  <div>
                    <strong>{d.label}</strong>
                    <span>{d.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════ */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.nlText}>
              <span className="section-label" style={{ color: 'var(--gold)' }}>Exclusive Offers</span>
              <h2 className={styles.nlTitle}>Stay in the Loop</h2>
              <p>Get exclusive offers, new arrivals, and design inspiration delivered to your inbox.</p>
            </div>
            {subDone ? (
              <p className={styles.nlSuccess}>
                <span>✓</span>
                Thank you for subscribing! Welcome to the Alpha family.
              </p>
            ) : (
              <div className={styles.nlForm}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={styles.nlInput}
                  onKeyDown={e => e.key === 'Enter' && email && setSubDone(true)}
                />
                <button
                  onClick={() => { if (email) setSubDone(true); }}
                  className={styles.nlBtn}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
