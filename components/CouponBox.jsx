// ─────────────────────────────────────────────────────────
//  CouponBox.jsx
//  Location: components/CouponBox.jsx
//
//  Props:
//    subtotal   – number  (cart subtotal in PKR)
//    onApply    – fn({ discount, type, label, deliveryFree })
//    onRemove   – fn()
//    applied    – object | null (currently applied coupon)
//
//  Integration:
//    Add inside checkout/page.jsx Order Summary aside, above totals table.
//    Pass subtotal from CartContext.
// ─────────────────────────────────────────────────────────
'use client';
import { useState } from 'react';
import styles from './CouponBox.module.css';

// ── Available coupons ──────────────────────────────────────
const COUPONS = {
  SAVE10:    { type: 'percent', value: 10,    label: '10% Off',           deliveryFree: false },
  SAVE20:    { type: 'percent', value: 20,    label: '20% Off',           deliveryFree: false },
  FLAT500:   { type: 'flat',    value: 500,   label: 'PKR 500 Off',       deliveryFree: false },
  FLAT1000:  { type: 'flat',    value: 1000,  label: 'PKR 1,000 Off',     deliveryFree: false },
  FREESHIP:  { type: 'ship',    value: 0,     label: 'Free Delivery',     deliveryFree: true  },
  ALPHA15:   { type: 'percent', value: 15,    label: '15% Off',           deliveryFree: false },
  WELCOME:   { type: 'percent', value: 5,     label: '5% Welcome Bonus',  deliveryFree: false },
};

export default function CouponBox({ subtotal, onApply, onRemove, applied }) {
  const [code, setCode]     = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) { setError('Please enter a coupon code.'); return; }

    setLoading(true);
    setError('');

    // Simulate network delay for realism
    setTimeout(() => {
      const coupon = COUPONS[trimmed];
      if (!coupon) {
        setError('Invalid coupon code. Please try again.');
        setLoading(false);
        return;
      }

      // Calculate discount amount
      let discount = 0;
      if (coupon.type === 'percent') discount = Math.round((coupon.value / 100) * subtotal);
      if (coupon.type === 'flat')    discount = Math.min(coupon.value, subtotal);
      if (coupon.type === 'ship')    discount = 0;

      onApply({ code: trimmed, discount, deliveryFree: coupon.deliveryFree, label: coupon.label, type: coupon.type });
      setCode('');
      setLoading(false);
    }, 600);
  };

  const handleRemove = () => {
    setCode('');
    setError('');
    onRemove();
  };

  // ── Applied state ─────────────────────────────────────────
  if (applied) {
    return (
      <div className={styles.appliedBox}>
        <div className={styles.appliedLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--success)' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div>
            <strong>{applied.code}</strong>
            <span>{applied.label} applied!</span>
          </div>
        </div>
        <button className={styles.removeBtn} onClick={handleRemove} aria-label="Remove coupon">✕</button>
      </div>
    );
  }

  // ── Input state ───────────────────────────────────────────
  return (
    <div className={styles.couponBox}>
      <div className={styles.couponHeader}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <span>Have a promo code?</span>
      </div>
      <div className={styles.inputRow}>
        <input
          type="text"
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
          placeholder="e.g. SAVE10, FREESHIP"
          className={styles.couponInput}
          onKeyDown={e => e.key === 'Enter' && handleApply()}
          maxLength={20}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          className={styles.applyBtn}
          onClick={handleApply}
          disabled={loading || !code.trim()}
        >
          {loading ? <span className={styles.spinner} /> : 'Apply'}
        </button>
      </div>
      {error && (
        <p className={styles.errorMsg}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
      <p className={styles.hint}>Try: SAVE10 · SAVE20 · FREESHIP · FLAT500 · ALPHA15</p>
    </div>
  );
}
