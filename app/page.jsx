'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const CATEGORIES = [
  { key:'beds',        label:'Beds',              img:'/images/beds/bed-teal-modern.png' },
  { key:'wardrobes',   label:'Wardrobes',         img:'/images/beds/bed-pure-wooden.png' },
  { key:'sofas',       label:'Sofas',             img:'/images/sofas/sofa-royal-gold.png' },
  { key:'cornersofas', label:'Corner Sofas',      img:'/images/cornersofas/corner-ushape-brown.png' },
  { key:'dining',      label:'Dining Tables',     img:'/images/dining/dining-luxury-carved.png' },
  { key:'accent',      label:'Accent Chairs',     img:'/images/accent/accent-cream-gold.png' },
];

const TESTIMONIALS = [
  { name:'Ayesha Malik', city:'Lahore', text:'Absolutely stunning bed frame! The craftsmanship is impeccable and delivery was on time. Alpha Furniture exceeded all my expectations.', init:'AM' },
  { name:'Hassan Riaz',  city:'Karachi', text:'Ordered a complete dining set and I am beyond impressed. The quality of sheesham wood is unmatched. Highly recommend to everyone.', init:'HR' },
  { name:'Sana Ahmed',   city:'Islamabad', text:'The corner sofa is a masterpiece. My whole family loves it. Customer service was excellent from order to delivery.', init:'SA' },
];

const FILTER_TABS = ['All','Beds','Sofas','Dining','Accent'];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [filter, setFilter]     = useState('All');
  const [email, setEmail]       = useState('');
  const [subDone, setSubDone]   = useState(false);

useEffect(() => {
    fetch('/api/products?featured=true&limit=12')
      .then(r => r.json())
      .then(j => {
        if (j.success) setFeatured(j.data);
      })
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const filtered = filter === 'All'
    ? featured.slice(0, 8)
    : featured.filter(p => p.category.toLowerCase().includes(filter.toLowerCase())).slice(0, 8);
 
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroPattern} />
        <figure className={styles.heroImgPanel}>
          <img src="/images/hero/hero-main.png" alt="Alpha Furniture" />
          <div className={styles.heroOverlay} />
        </figure>
        <div className={`${styles.heroContent} container`}>
          <div className={`${styles.heroInner} animate-fade-up`}>
            <p className={styles.heroTag}><span className={styles.heroLine} />Premium Craftsmanship Since 2010</p>
            <h1 className={styles.heroTitle}>Elevate Your<br /><em>Living Space</em><br />with Alpha</h1>
            <p className={styles.heroDesc}>Discover exquisite furniture crafted with the finest sheesham wood — where timeless design meets exceptional quality.</p>
            <div className={styles.heroCtas}>
              <Link href="/shop" className="btn btn--primary btn--lg">Shop Collection</Link>
              <Link href="/about" className="btn btn--outline-light">Our Story</Link>
            </div>
          </div>
        </div>
        <div className={styles.heroScroll}><span className={styles.heroScrollLine}/><small>Scroll</small></div>
      </section>

      {/* ── TRUST BAR ── */}
      <aside className={styles.trustBar}>
        <ul className={`${styles.trustList} container`}>
          {[
            ['🚚','Free Delivery','On orders above PKR 10,000'],
            ['🔄','Easy Returns','7-day hassle-free returns'],
            ['📞','24/7 Support','Call +92 321 4877048'],
            ['🛡️','Quality Guarantee','Solid wood craftsmanship'],
          ].map(([icon,title,desc])=>(
            <li key={title} className={styles.trustItem}>
              <span className={styles.trustIcon}>{icon}</span>
              <div><strong>{title}</strong><span>{desc}</span></div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── CATEGORIES ── */}
      <section className={styles.catSection}>
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label">Browse by Collection</span>
            <h2 className="section-title">Our Furniture <em>Categories</em></h2>
            <div className="divider-gold divider-gold--center" />
          </header>
          <div className={styles.catGrid}>
            {CATEGORIES.map(c => (
              <Link key={c.key} href={`/shop/${c.key}`} className={styles.catCard}>
                <figure className={styles.catImg}><img src={c.img} alt={c.label} /></figure>
                <div className={styles.catInfo}>
                  <h3 className={styles.catName}>{c.label}</h3>
                  <span className={styles.catCta}>View Collection →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
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
                <button key={t} className={`${styles.filterTab}${filter===t?' '+styles.filterActive:''}`} onClick={()=>setFilter(t)}>{t}</button>
              ))}
            </div>
          </div>
          {featured.length === 0 ? (
            <div className={styles.productsGrid}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '4/3', borderRadius: '12px' }} />
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div className={styles.featuredFooter}>
            <Link href="/shop" className="btn btn--outline btn--lg">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNERS ── */}
      <section className={styles.promoSection}>
        <div className="container">
          <div className={styles.promoGrid}>
            {[
              { img:'/images/beds/bed-empire-set.png', save:'Up to 30% Off', title:'Premium Bedroom Sets', href:'/shop/beds' },
              { img:'/images/sofas/sofa-cream-luxury.png', save:'New Arrivals', title:'Luxury Sofa Collections', href:'/shop/sofas' },
            ].map((b,i) => (
              <Link key={i} href={b.href} className={styles.promoCard}>
                <figure className={styles.promoImg}><img src={b.img} alt={b.title} /></figure>
                <div className={styles.promoOverlay} />
                <div className={styles.promoContent}>
                  <span className={styles.promoSave}>{b.save}</span>
                  <h3>{b.title}</h3>
                  <span className="btn btn--outline-light btn--sm">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonials}>
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label">What Our Customers Say</span>
            <h2 className="section-title section-title--light">Trusted by <em>Thousands</em></h2>
            <div className="divider-gold divider-gold--center" />
          </header>
          <div className={styles.testGrid}>
            {TESTIMONIALS.map(t => (
              <blockquote key={t.name} className={styles.testCard}>
                <span className={styles.quoteMark}>"</span>
                <p className={styles.testText}>{t.text}</p>
                <footer className={styles.testAuthor}>
                  <div className={styles.avatar}>{t.init}</div>
                  <div><cite className={styles.authorName}>{t.name}</cite><span className={styles.authorCity}>{t.city}</span></div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div><h2 className={styles.nlTitle}>Stay in the Loop</h2><p>Get exclusive offers, new arrivals and design inspiration.</p></div>
            {subDone ? <p className={styles.nlSuccess}>✓ Thank you for subscribing!</p> : (
              <div className={styles.nlForm}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" />
                <button onClick={()=>{ if(email) setSubDone(true); }} className={styles.nlBtn}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
