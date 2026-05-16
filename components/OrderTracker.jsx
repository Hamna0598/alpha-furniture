// ─────────────────────────────────────────────────────────
//  OrderTracker.jsx
//  Location: components/OrderTracker.jsx
//
//  Usage: Add inside app/order-confirmed/page.jsx
//    import OrderTracker from '@/components/OrderTracker';
//    <OrderTracker orderId={order.orderId} orderDate={order.date} />
//
//  Also: Add a standalone page at app/track-order/page.jsx
//  so users can track any order by entering their order ID.
// ─────────────────────────────────────────────────────────
'use client';
import { useState, useEffect } from 'react';
import styles from './OrderTracker.module.css';

const STEPS = [
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    desc: 'Your order has been received and confirmed.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    key: 'processing',
    label: 'Processing',
    desc: 'Our craftsmen are preparing and quality-checking your furniture.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    key: 'shipped',
    label: 'Shipped',
    desc: 'Your order is on its way! Our delivery team has dispatched your furniture.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: 'outForDelivery',
    label: 'Out for Delivery',
    desc: 'Your furniture is nearby. Our team will call you 1 hour before arrival.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    key: 'delivered',
    label: 'Delivered',
    desc: 'Your order has been successfully delivered. Enjoy your new furniture!',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

// Simulate status based on order date (for demo)
function deriveStatus(orderId) {
  // In production, fetch from your orders API:
  // const res = await fetch(`/api/orders/${orderId}/status`);
  // For demo, return 'confirmed' for all new orders
  return 'processing';
}

function addDays(dateStr, days) {
  const d = new Date(dateStr || Date.now());
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function OrderTracker({ orderId, orderDate }) {
  const [currentStep, setCurrentStep] = useState('confirmed');

  useEffect(() => {
    if (orderId) {
      const status = deriveStatus(orderId);
      setCurrentStep(status);
    }
  }, [orderId]);

  const currentIndex = STEPS.findIndex(s => s.key === currentStep);

  const estimatedDates = {
    confirmed:     orderDate || new Date().toLocaleDateString('en-PK', { weekday:'short', month:'short', day:'numeric' }),
    processing:    addDays(orderDate, 1),
    shipped:       addDays(orderDate, 2),
    outForDelivery:addDays(orderDate, 3),
    delivered:     addDays(orderDate, 4),
  };

  return (
    <div className={styles.tracker}>
      <div className={styles.trackerHeader}>
        <div className={styles.trackerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <div>
          <h3 className={styles.trackerTitle}>Order Tracking</h3>
          {orderId && <p className={styles.trackerSubtitle}>Order #{orderId}</p>}
        </div>
        <span className={styles.currentBadge}>
          {STEPS[currentIndex]?.label}
        </span>
      </div>

      <div className={styles.steps}>
        {STEPS.map((step, i) => {
          const isDone    = i < currentIndex;
          const isActive  = i === currentIndex;
          const isPending = i > currentIndex;

          return (
            <div key={step.key} className={`${styles.step} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''} ${isPending ? styles.pending : ''}`}>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className={`${styles.connector} ${isDone ? styles.connectorDone : ''}`} />
              )}

              {/* Icon circle */}
              <div className={styles.stepCircle}>
                {isDone ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : isActive ? (
                  <span className={styles.activePulse} />
                ) : (
                  <span className={styles.stepNum}>{i + 1}</span>
                )}
              </div>

              {/* Label */}
              <div className={styles.stepInfo}>
                <div className={styles.stepLabel}>{step.label}</div>
                <div className={styles.stepDate}>{estimatedDates[step.key]}</div>
                {isActive && <p className={styles.stepDesc}>{step.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
