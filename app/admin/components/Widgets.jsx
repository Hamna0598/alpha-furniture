'use client';
import Image from 'next/image';

/* ─── Shared card wrapper ─── */
function Card({ title, badge, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>{title}</div>
        {badge && <div style={{ fontSize: 11, color: '#C9A84C', fontWeight: 700 }}>{badge}</div>}
      </div>
      {children}
    </div>
  );
}

/* ─── Popular Products ─── */
export function PopularProducts({ products }) {
  const top = products?.filter(p => p.isFeatured)?.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))?.slice(0, 5) || [];

  return (
    <Card title="Top Products">
      {top.length === 0 && <div style={{ fontSize: 12, color: '#9B8E7F', textAlign: 'center', padding: '20px 0' }}>Loading…</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {top.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FFF8E7', color: '#C9A84C', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i+1}</div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5F0E8', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: '#9B8E7F', textTransform: 'capitalize' }}>{p.category}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#C9A84C' }}>PKR {(p.price/1000).toFixed(0)}K</div>
              <div style={{ fontSize: 10, color: '#9B8E7F' }}>{p.reviewCount} reviews</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Inventory Status ─── */
export function InventoryStatus({ products }) {
  const low = products?.filter(p => p.inStock && p.stockQty > 0 && p.stockQty <= 3) || [];
  const out = products?.filter(p => !p.inStock || p.stockQty === 0) || [];

  return (
    <Card title="Inventory Status">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        <div style={{ background: '#FFF8E7', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#C9A84C' }}>{low.length}</div>
          <div style={{ fontSize: 10, color: '#9B8E7F', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>Low Stock</div>
        </div>
        <div style={{ background: '#FEF2F2', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#EF4444' }}>{out.length}</div>
          <div style={{ fontSize: 10, color: '#9B8E7F', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>Out of Stock</div>
        </div>
      </div>
      {low.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>⚠ Low Stock</div>
          {low.slice(0, 3).map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: '#5C564F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{p.name}</span>
              <span style={{ fontSize: 10, background: '#FFF8E7', color: '#C9A84C', padding: '2px 8px', borderRadius: 20, fontWeight: 600, flexShrink: 0, marginLeft: 6 }}>{p.stockQty} left</span>
            </div>
          ))}
        </div>
      )}
      {out.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#EF4444', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>✕ Out of Stock</div>
          {out.slice(0, 3).map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: '#5C564F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{p.name}</span>
              <span style={{ fontSize: 10, background: '#FEF2F2', color: '#EF4444', padding: '2px 8px', borderRadius: 20, fontWeight: 600, flexShrink: 0, marginLeft: 6 }}>Out of stock</span>
            </div>
          ))}
        </div>
      )}
      {low.length === 0 && out.length === 0 && (
        <div style={{ fontSize: 12, color: '#9B8E7F', textAlign: 'center', padding: '20px 0' }}>All products well-stocked ✓</div>
      )}
    </Card>
  );
}

/* ─── Customer Activity ─── */
export function CustomerActivity() {
  return (
    <Card title="Customer Activity">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'New Customers',       value: 284,  change: '+12%', icon: '👤', bg: '#ECFDF5', color: '#059669' },
          { label: 'Returning Customers', value: 1000, change: '+8%',  icon: '🔄', bg: '#EFF6FF', color: '#3B82F6' },
        ].map(({ label, value, change, icon, bg, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F5F0E8', borderRadius: 12, padding: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#9B8E7F' }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1714' }}>{value.toLocaleString()}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '3px 8px', borderRadius: 20 }}>{change}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9B8E7F', marginBottom: 4 }}>
          <span>New (22%)</span><span>Returning (78%)</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: '#F0EAE0', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '22%', background: '#10B981' }} />
          <div style={{ width: '78%', background: '#3B82F6' }} />
        </div>
      </div>
    </Card>
  );
}

/* ─── Recent Reviews ─── */
const REVIEWS = [
  { name: 'Fatima M.', rating: 5, product: 'Luxury Royal Carved Dining', comment: 'Absolutely stunning quality. Exceeded our expectations!', time: '2h ago' },
  { name: 'Ahmed R.',  rating: 4, product: 'Horn Grey Luxury Bed',       comment: 'Beautiful design, delivery was a bit delayed but worth the wait.', time: '5h ago' },
  { name: 'Sana H.',   rating: 5, product: 'Royal Cream Corner Sofa',    comment: 'Perfect for our living room. Very comfortable and looks luxurious.', time: '1d ago' },
  { name: 'Bilal K.',  rating: 5, product: 'Vintage Blue Luxury Dining', comment: 'Master craftsmanship. Guests always compliment this dining set!', time: '2d ago' },
];

export function RecentReviews() {
  return (
    <Card title="Recent Reviews" badge="★ 4.8 avg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {REVIEWS.map((r, i) => (
          <div key={i} style={{ paddingBottom: i < REVIEWS.length - 1 ? 14 : 0, borderBottom: i < REVIEWS.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1714' }}>{r.name}</span>
                  <span style={{ fontSize: 10, color: '#9B8E7F' }}>{r.time}</span>
                </div>
                <div style={{ fontSize: 10, color: '#9B8E7F', marginBottom: 3 }}>{r.product}</div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ fontSize: 10, color: s < r.rating ? '#C9A84C' : '#E8E0D0' }}>★</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: '#5C564F', lineHeight: 1.5 }}>{r.comment}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
