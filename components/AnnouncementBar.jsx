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

  const ticker = [...MESSAGES, ...MESSAGES].join('   •   ');

  return (
    <aside
      style={{
        background: 'linear-gradient(90deg, var(--obsidian) 0%, #140f04 50%, var(--obsidian) 100%)',
        borderBottom: '1px solid rgba(212,168,67,0.25)',
        padding: '.45rem 0',
        position: 'relative',
        overflow: 'hidden',

        // ✨ NEW LUXURY EFFECTS
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4), 0 0 12px rgba(212,168,67,0.15)'
      }}
    >
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span
          style={{
            display: 'inline-block',
            animation: 'marquee 45s linear infinite',
            fontFamily: 'var(--ff-caps)',
            fontSize: '.58rem',
            letterSpacing: '.18em',
            color: 'var(--gold-light)',
            textTransform: 'uppercase',
            paddingRight: '4rem',

            // ✨ subtle text glow
            textShadow: '0 0 6px rgba(212,168,67,0.35)'
          }}
        >
          {ticker}
        </span>
      </div>

      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          right: '.8rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(201,168,76,.5)',
          cursor: 'pointer',
          fontSize: '.75rem',
          padding: '4px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#d4a843'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(201,168,76,.5)'}
      >
        ✕
      </button>
    </aside>
  );
}