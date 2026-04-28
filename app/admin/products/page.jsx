'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const CATEGORY_LABELS = { dining: 'Dining', beds: 'Beds', sofas: 'Sofas', cornersofas: 'Corner Sofas', accent: 'Accent' };

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.data || [])).finally(() => setLoading(false));
  }, []);

  const cats = ['all', ...Object.keys(CATEGORY_LABELS)];
  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)) && (category === 'all' || p.category === category);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Products" subtitle={`${products.length} total products`} />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9B8E7F', fontSize: 14 }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{
              paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              fontSize: 13, background: '#fff', border: '1px solid #E8E0D0',
              borderRadius: 10, outline: 'none', fontFamily: 'inherit', width: 210, color: '#1A1714',
            }} />
          </div>
          <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #E8E0D0', borderRadius: 12, padding: 4, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '6px 12px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'inherit', textTransform: 'capitalize',
                background: category === c ? '#C9A84C' : 'transparent',
                color: category === c ? '#fff' : '#6B6560',
                transition: 'all 0.15s',
              }}>{c === 'all' ? 'All' : CATEGORY_LABELS[c]}</button>
            ))}
          </div>
          <button style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
            color: '#fff', border: 'none', borderRadius: 10, fontSize: 12,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>+ Add Product</button>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 260, background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.15)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)'}
              >
                <div style={{ position: 'relative', height: 160, background: '#F5F0E8' }}>
                  {p.images?.[0] ? (
                    <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 32 }}>📦</div>
                  )}
                  {p.badge && (
                    <span style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: p.badge === 'Sale' ? '#EF4444' : '#10B981', color: '#fff' }}>{p.badge}</span>
                  )}
                  <span style={{ position: 'absolute', top: 8, right: 8, padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: p.inStock ? '#ECFDF5' : '#FEF2F2', color: p.inStock ? '#059669' : '#EF4444' }}>
                    {p.inStock ? `${p.stockQty} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: '#9B8E7F', textTransform: 'capitalize', marginTop: 2, marginBottom: 8 }}>{CATEGORY_LABELS[p.category] || p.category}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#C9A84C' }}>PKR {p.price.toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: '#6B6560' }}>★ {p.rating} ({p.reviewCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9B8E7F' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <div style={{ fontSize: 14 }}>No products found</div>
          </div>
        )}

      </main>
    </div>
  );
}
