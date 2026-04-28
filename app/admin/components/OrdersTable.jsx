'use client';
import { useState } from 'react';

const MOCK = [
  { id: 'AF-A1B2C3D4', customer: 'Fatima Malik',  product: 'Luxury Royal Carved Dining Set', payment: 'Cash on Delivery', status: 'delivered',  date: '24 Apr 2026', amount: 185000 },
  { id: 'AF-E5F6G7H8', customer: 'Ahmed Raza',    product: 'Horn Grey Luxury Bed',           payment: 'EasyPaisa',        status: 'pending',    date: '26 Apr 2026', amount: 95000  },
  { id: 'AF-I9J0K1L2', customer: 'Sana Hussain',  product: 'Royal Cream Corner Sofa',        payment: 'Cash on Delivery', status: 'processing', date: '25 Apr 2026', amount: 175000 },
  { id: 'AF-M3N4O5P6', customer: 'Bilal Khan',    product: 'Vintage Blue Luxury Dining',     payment: 'JazzCash',         status: 'delivered',  date: '22 Apr 2026', amount: 225000 },
  { id: 'AF-Q7R8S9T0', customer: 'Nadia Iqbal',   product: 'Glass Top Wooden Dining Set',    payment: 'Cash on Delivery', status: 'cancelled',  date: '20 Apr 2026', amount: 72000  },
  { id: 'AF-U1V2W3X4', customer: 'Usman Tariq',   product: 'White & Golden Dining Set',      payment: 'Bank Transfer',    status: 'pending',    date: '27 Apr 2026', amount: 145000 },
  { id: 'AF-Y5Z6A7B8', customer: 'Hina Baig',     product: 'U-Shape Premium Sofa',           payment: 'Cash on Delivery', status: 'delivered',  date: '18 Apr 2026', amount: 210000 },
  { id: 'AF-C9D0E1F2', customer: 'Kamran Sheikh', product: 'Luxury Wingback Bed',            payment: 'EasyPaisa',        status: 'processing', date: '28 Apr 2026', amount: 128000 },
];

const STATUS_STYLE = {
  delivered:  { background: '#ECFDF5', color: '#059669' },
  pending:    { background: '#FFF8E7', color: '#C9A84C' },
  processing: { background: '#EFF6FF', color: '#3B82F6' },
  cancelled:  { background: '#FEF2F2', color: '#EF4444' },
};

const FILTERS = ['all', 'pending', 'processing', 'delivered', 'cancelled'];
const COLS = ['Order ID', 'Customer', 'Product', 'Payment', 'Amount', 'Status', 'Date'];

export default function OrdersTable({ orders: prop }) {
  const rows = prop?.length ? prop : MOCK;
  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('all');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const toggle = k => { if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(k); setSortDir('asc'); } };

  const colKey = { 'Order ID': 'id', 'Customer': 'customer', 'Product': 'product', 'Payment': 'payment', 'Amount': 'amount', 'Status': 'status', 'Date': 'date' };

  const filtered = rows
    .filter(o => {
      const q = search.toLowerCase();
      return (status === 'all' || o.status === status) &&
        (!q || o.id?.toLowerCase().includes(q) || o.customer?.toLowerCase().includes(q) || o.product?.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EAE0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>Recent Orders</div>
          <div style={{ fontSize: 11, color: '#9B8E7F', marginTop: 2 }}>{filtered.length} orders</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Status pills */}
          <div style={{ display: 'flex', gap: 3, background: '#F5F0E8', borderRadius: 10, padding: 4 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setStatus(f)} style={{
                padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'inherit', textTransform: 'capitalize',
                background: status === f ? '#C9A84C' : 'transparent',
                color: status === f ? '#fff' : '#6B6560',
                transition: 'all 0.15s',
              }}>{f}</button>
            ))}
          </div>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9B8E7F', fontSize: 13 }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{
              paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
              fontSize: 12, background: '#F5F0E8', border: '1px solid #E8E0D0',
              borderRadius: 9, outline: 'none', fontFamily: 'inherit', width: 140, color: '#1A1714',
            }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F0EAE0' }}>
              {COLS.map(col => (
                <th key={col} onClick={() => toggle(colKey[col])} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 11, fontWeight: 600, color: '#9B8E7F',
                  textTransform: 'uppercase', letterSpacing: 0.6,
                  cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
                  background: '#FDFAF6',
                }}>
                  {col}
                  {sortKey === colKey[col] && <span style={{ color: '#C9A84C', marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9B8E7F', fontSize: 13 }}>No orders found</td></tr>
            )}
            {filtered.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #F5F0E8', background: i % 2 === 0 ? '#fff' : '#FDFAF6', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FFF8E7'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FDFAF6'}
              >
                <td style={{ padding: '13px 16px', fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#C9A84C', whiteSpace: 'nowrap' }}>{o.id}</td>
                <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {o.customer?.[0]}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#1A1714' }}>{o.customer}</span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: '#5C564F', maxWidth: 200 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: '#6B6560', whiteSpace: 'nowrap' }}>{o.payment}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 700, color: '#1A1714', whiteSpace: 'nowrap' }}>PKR {(o.amount || 0).toLocaleString()}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 20,
                    fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
                    ...(STATUS_STYLE[o.status] || { background: '#F0EAE0', color: '#6B6560' }),
                  }}>{o.status}</span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: '#9B8E7F', whiteSpace: 'nowrap' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
