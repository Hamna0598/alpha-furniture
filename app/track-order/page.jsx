// ─────────────────────────────────────────────────────────
//  app/track-order/page.jsx
//  Standalone page so users can track any order by ID.
//  Accessible at: /track-order
// ─────────────────────────────────────────────────────────
'use client';
import { useState } from 'react';
import Link from 'next/link';
import OrderTracker from '@/components/OrderTracker';
import styles from './track.module.css';

export default function TrackOrderPage() {
  const [orderId, setOrderId]     = useState('');
  const [submitted, setSubmitted] = useState('');
  const [error, setError]         = useState('');

  const handleTrack = () => {
    const trimmed = orderId.trim().toUpperCase();
    if (!trimmed) { setError('Please enter your Order ID.'); return; }
    if (trimmed.length < 4) { setError('Order ID too short. Please check your confirmation email.'); return; }
    setError('');
    setSubmitted(trimmed);
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Track Your <em>Order</em></h1>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Track Order</span>
          </nav>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.inner}>

            {/* Search box */}
            <div className={styles.searchCard}>
              <div className={styles.searchIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h2 className={styles.searchTitle}>Enter Order ID</h2>
              <p className={styles.searchDesc}>
                Find your Order ID in your confirmation email or WhatsApp message from Alpha Furniture.
              </p>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  value={orderId}
                  onChange={e => { setOrderId(e.target.value); setError(''); }}
                  placeholder="e.g. AF-1234567890"
                  className={styles.trackInput}
                  onKeyDown={e => e.key === 'Enter' && handleTrack()}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button className="btn btn--primary" onClick={handleTrack}>Track Order</button>
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
              <p className={styles.hint}>
                Need help? Call us at{' '}
                <a href="tel:+923214877048" style={{ color: 'var(--gold)' }}>+92 321 4877048</a>
              </p>
            </div>

            {/* Tracker result */}
            {submitted && (
              <div className={styles.result}>
                <OrderTracker orderId={submitted} orderDate={null} />
              </div>
            )}

            {/* Info cards */}
            <div className={styles.infoGrid}>
              {[
                { icon: '📦', title: 'Order Confirmed', desc: 'Received immediately after placing your order.' },
                { icon: '🔧', title: 'Processing',       desc: 'Our team prepares and quality-checks your furniture.' },
                { icon: '🚚', title: 'Shipped',          desc: 'Dispatched from our warehouse to your city.' },
                { icon: '🏠', title: 'Delivered',        desc: 'Delivered and assembled at your home.' },
              ].map(card => (
                <div key={card.title} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{card.icon}</span>
                  <strong>{card.title}</strong>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
