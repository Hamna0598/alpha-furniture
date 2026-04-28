'use client';

const CARDS = [
  { label: 'Total Revenue',   key: 'revenue',   icon: '💰', accent: '#C9A84C', bg: '#FFF8E7', format: v => `PKR ${(v/1000000).toFixed(1)}M`, change: +18.2 },
  { label: 'Total Orders',    key: 'orders',    icon: '🛒', accent: '#3B82F6', bg: '#EFF6FF', format: v => v.toLocaleString(),               change: +12.5 },
  { label: 'Total Customers', key: 'customers', icon: '👥', accent: '#8B5CF6', bg: '#F5F3FF', format: v => v.toLocaleString(),               change: +8.1  },
  { label: 'Total Products',  key: 'products',  icon: '📦', accent: '#10B981', bg: '#ECFDF5', format: v => v,                                change: -2.4  },
];

export default function DashboardCards({ stats }) {
  const values = {
    revenue:   stats?.totalRevenue   ?? 155400000,
    orders:    stats?.totalOrders    ?? 847,
    customers: stats?.totalCustomers ?? 1284,
    products:  stats?.totalProducts  ?? 35,
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
    }}>
      {CARDS.map(({ label, key, icon, accent, bg, format, change }) => (
        <div key={key} style={{
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #E8E0D0',
          padding: 20,
          display: 'flex', flexDirection: 'column', gap: 12,
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9B8E7F', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
                {label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1A1714', lineHeight: 1 }}>
                {stats ? format(values[key]) : (
                  <div style={{ width: 100, height: 26, background: '#F0EAE0', borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
                )}
              </div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {icon}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: change >= 0 ? '#10B981' : '#EF4444', fontSize: 12, fontWeight: 700 }}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span style={{ fontSize: 11, color: '#9B8E7F' }}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
