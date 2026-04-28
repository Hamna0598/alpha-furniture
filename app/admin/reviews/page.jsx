'use client';
import Navbar from '../components/Navbar';

const REVIEWS = [
  { name: 'Fatima M.',  rating: 5, product: 'Luxury Royal Carved Dining Set',  comment: 'Absolutely stunning quality. Every guest compliments it!',                  date: '24 Apr 2026' },
  { name: 'Ahmed R.',   rating: 4, product: 'Horn Grey Luxury Bed',            comment: 'Beautiful design, delivery was a bit delayed but worth the wait.',            date: '22 Apr 2026' },
  { name: 'Sana H.',    rating: 5, product: 'Royal Cream Corner Sofa',         comment: 'Perfect for our living room. Very comfortable and looks absolutely luxurious.',date: '20 Apr 2026' },
  { name: 'Bilal K.',   rating: 5, product: 'Vintage Blue Luxury Dining Set',  comment: 'Master craftsmanship. Guests always ask where I got it!',                    date: '18 Apr 2026' },
  { name: 'Nadia I.',   rating: 3, product: 'Glass Top Wooden Dining Set',     comment: 'Good quality but the glass arrived with a small scratch. Support helped.',   date: '15 Apr 2026' },
  { name: 'Usman T.',   rating: 5, product: 'White & Golden Dining Set',       comment: 'Looks exactly like the photos. The gold finish is top-notch.',               date: '12 Apr 2026' },
  { name: 'Hina B.',    rating: 4, product: 'U-Shape Premium Sofa',            comment: 'Excellent quality and very spacious. Minus one star for slight delay.',       date: '10 Apr 2026' },
  { name: 'Kamran S.',  rating: 5, product: 'Luxury Wingback Bed',             comment: 'The best purchase I have made. Quality is unmatched. Worth every rupee!',   date: '8 Apr 2026'  },
];

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 12, color: i < count ? '#C9A84C' : '#E8E0D0' }}>★</span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avg  = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const dist = [5,4,3,2,1].map(s => ({
    stars: s,
    count: REVIEWS.filter(r => r.rating === s).length,
    pct:   Math.round((REVIEWS.filter(r => r.rating === s).length / REVIEWS.length) * 100),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Reviews" subtitle="Customer feedback & ratings" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          {/* Average */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: '#1A1714', lineHeight: 1 }}>{avg}</div>
            <Stars count={Math.round(parseFloat(avg))} />
            <div style={{ fontSize: 12, color: '#9B8E7F' }}>{REVIEWS.length} reviews</div>
          </div>
          {/* Distribution */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714', marginBottom: 16 }}>Rating Distribution</div>
            {dist.map(({ stars, count, pct }) => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: '#6B6560', width: 28, textAlign: 'right', flexShrink: 0 }}>{stars} ★</span>
                <div style={{ flex: 1, height: 8, background: '#F0EAE0', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#C9A84C', width: `${pct}%`, borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 12, color: '#9B8E7F', width: 20, flexShrink: 0 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714' }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: '#9B8E7F' }}>{r.date}</div>
                  </div>
                </div>
                <Stars count={r.rating} />
              </div>
              <div style={{ fontSize: 11, color: '#C9A84C', fontWeight: 600, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.product}</div>
              <div style={{ fontSize: 12, color: '#5C564F', lineHeight: 1.6 }}>{r.comment}</div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
