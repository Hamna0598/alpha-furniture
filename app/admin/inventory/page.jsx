'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.data || [])).finally(() => setLoading(false));
  }, []);

  const counts = {
    all:  products.length,
    good: products.filter(p => p.inStock && p.stockQty > 3).length,
    low:  products.filter(p => p.inStock && p.stockQty > 0 && p.stockQty <= 3).length,
    out:  products.filter(p => !p.inStock || p.stockQty === 0).length,
  };

  const filtered = products.filter(p => {
    if (filter === 'low')  return p.inStock && p.stockQty > 0 && p.stockQty <= 3;
    if (filter === 'out')  return !p.inStock || p.stockQty === 0;
    if (filter === 'good') return p.inStock && p.stockQty > 3;
    return true;
  });

  const TABS = [
    { key: 'all',  label: 'Total Items',  icon: '📦', bg: '#F5F0E8', color: '#1A1714' },
    { key: 'good', label: 'Well Stocked', icon: '✅', bg: '#ECFDF5', color: '#059669' },
    { key: 'low',  label: 'Low Stock',    icon: '⚠',  bg: '#FFF8E7', color: '#C9A84C' },
    { key: 'out',  label: 'Out of Stock', icon: '✕',  bg: '#FEF2F2', color: '#EF4444' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Inventory" subtitle="Monitor stock levels across all products" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {TABS.map(({ key, label, icon, bg, color }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              background: bg, borderRadius: 14, padding: '16px', textAlign: 'left',
              border: filter === key ? `2px solid ${color}` : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color }}>{loading ? '—' : counts[key]}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EAE0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>Stock Levels</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
              <thead>
                <tr style={{ background: '#FDFAF6', borderBottom: '1px solid #F0EAE0' }}>
                  {['Product','Category','Price','Stock Qty','Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#9B8E7F', textTransform: 'uppercase', letterSpacing: 0.6 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9B8E7F' }}>Loading…</td></tr>}
                {!loading && filtered.map((p, i) => {
                  const s = !p.inStock || p.stockQty === 0
                    ? { label: 'Out of Stock', bg: '#FEF2F2', color: '#EF4444' }
                    : p.stockQty <= 3
                    ? { label: 'Low Stock',    bg: '#FFF8E7', color: '#C9A84C' }
                    : { label: 'In Stock',     bg: '#ECFDF5', color: '#059669' };
                  const barColor = p.stockQty > 3 ? '#10B981' : p.stockQty > 0 ? '#C9A84C' : '#EF4444';
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F5F0E8', background: i % 2 === 0 ? '#fff' : '#FDFAF6' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FFF8E7'}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FDFAF6'}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714' }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: '#9B8E7F', marginTop: 2 }}>{p.id}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 12, color: '#6B6560', textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#C9A84C' }}>PKR {p.price.toLocaleString()}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 80, height: 6, background: '#F0EAE0', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: barColor, width: `${Math.min(100, (p.stockQty / 10) * 100)}%`, borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1714' }}>{p.stockQty}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>
                      </td>
                    </tr>
                  );
                })}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9B8E7F' }}>No products in this category</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
