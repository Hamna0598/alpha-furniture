'use client';
import { useState } from 'react';

const MESSAGES = [
  '🚚  Free Delivery on orders above PKR 10,000',
  '📞  Call / WhatsApp: +92 321 4877048',
  '📍  Ichra Furniture Market, Street #83 Rasool Pura Colony, Lahore',
  '✨  Solid Sheesham Wood — Quality is our First Priority',
  '🛡️  2-Year Warranty on all Bedroom Sets',
  '🎁  Visit our Showroom for Special Discounts',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const ticker = [...MESSAGES, ...MESSAGES].join('   ·   ');

  return (
    <aside
      style={{
        background: 'linear-gradient(90deg, #070709 0%, #120e06 50%, #070709 100%)',
        borderBottom: '1px solid rgba(201,150,58,0.22)',
        padding: '0.48rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer border */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.25,
      }} />

      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span
          style={{
            display: 'inline-block',
            animation: 'marquee 50s linear infinite',
            fontFamily: 'var(--ff-caps)',
            fontSize: '0.56rem',
            letterSpacing: '0.2em',
            color: 'var(--gold-light)',
            textTransform: 'uppercase',
            paddingRight: '4rem',
            textShadow: '0 0 8px rgba(201,150,58,0.30)',
          }}
        >
          {ticker}
        </span>
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        style={{
          position: 'absolute',
          right: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(201,150,58,0.08)',
          border: '1px solid rgba(201,150,58,0.18)',
          borderRadius: '3px',
          color: 'rgba(201,150,58,0.45)',
          cursor: 'pointer',
          fontSize: '0.62rem',
          padding: '2px 6px',
          transition: 'all 0.2s ease',
          lineHeight: 1.5,
        }}
        onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.borderColor = 'var(--gold)'; }}
        onMouseLeave={e => { e.target.style.color = 'rgba(201,150,58,0.45)'; e.target.style.borderColor = 'rgba(201,150,58,0.18)'; }}
      >
        ✕
      </button>
    </aside>
  );
}
