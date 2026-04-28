'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ title = 'Dashboard', subtitle = '' }) {
  const [query, setQuery] = useState('');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(250,247,241,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E8E0D0',
      padding: '0 24px',
      height: 64,
      display: 'flex', alignItems: 'center',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 16 }}>

        {/* Title */}
        <div style={{ flexShrink: 0 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1A1714', lineHeight: 1.2, margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 11, color: '#6B6560', marginTop: 2 }}>{subtitle}</p>}
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 340, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9B8E7F', fontSize: 14 }}>⌕</span>
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search products, orders…"
            style={{
              width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              fontSize: 13, background: '#F0EAE0', border: '1px solid #E8E0D0',
              borderRadius: 10, outline: 'none', color: '#1A1714',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Notification bell */}
          <button style={{
            width: 36, height: 36, borderRadius: 10,
            background: '#F0EAE0', border: '1px solid #E8E0D0',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', fontSize: 16, color: '#5C564F',
          }}>
            🔔
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, background: '#C9A84C', borderRadius: '50%', border: '2px solid white',
            }} />
          </button>

          {/* Add Product button */}
          <Link href="/admin/products" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px',
            background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
            color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 600,
            textDecoration: 'none',
          }}>
            + Add Product
          </Link>

          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid #E8E0D0' }}>
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 14,
            }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1714', lineHeight: 1.2 }}>Admin</div>
              <div style={{ fontSize: 10, color: '#9B8E7F' }}>Alpha Furniture</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
