'use client';
import Navbar from '../components/Navbar';

const CUSTOMERS = [
  { name: 'Fatima Malik',  email: 'fatima@example.com',  orders: 4, spent: 528000, since: 'Jan 2025', status: 'vip'     },
  { name: 'Ahmed Raza',    email: 'ahmed@example.com',   orders: 2, spent: 185000, since: 'Mar 2025', status: 'regular' },
  { name: 'Sana Hussain',  email: 'sana@example.com',    orders: 6, spent: 740000, since: 'Nov 2024', status: 'vip'     },
  { name: 'Bilal Khan',    email: 'bilal@example.com',   orders: 1, spent: 225000, since: 'Apr 2026', status: 'new'     },
  { name: 'Nadia Iqbal',   email: 'nadia@example.com',   orders: 3, spent: 210000, since: 'Feb 2025', status: 'regular' },
  { name: 'Usman Tariq',   email: 'usman@example.com',   orders: 1, spent: 145000, since: 'Apr 2026', status: 'new'     },
  { name: 'Hina Baig',     email: 'hina@example.com',    orders: 5, spent: 615000, since: 'Dec 2024', status: 'vip'     },
  { name: 'Kamran Sheikh', email: 'kamran@example.com',  orders: 2, spent: 208000, since: 'Mar 2025', status: 'regular' },
];

const STATUS_STYLE = {
  vip:     { background: '#FFF8E7', color: '#C9A84C' },
  regular: { background: '#EFF6FF', color: '#3B82F6' },
  new:     { background: '#ECFDF5', color: '#059669' },
};

function StatCard({ icon, label, value, gradient }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 11, color: '#9B8E7F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#1A1714', lineHeight: 1.2 }}>{value}</div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Customers" subtitle="Customer base overview" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <StatCard icon="👥" label="Total Customers" value="1,284" gradient="linear-gradient(135deg, #8B5CF6, #6D28D9)" />
          <StatCard icon="🆕" label="New This Month"  value="284"   gradient="linear-gradient(135deg, #10B981, #059669)" />
          <StatCard icon="🔄" label="Returning"       value="1,000" gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" />
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EAE0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>Customer Directory</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 650 }}>
              <thead>
                <tr style={{ background: '#FDFAF6', borderBottom: '1px solid #F0EAE0' }}>
                  {['Customer','Email','Orders','Total Spent','Member Since','Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#9B8E7F', textTransform: 'uppercase', letterSpacing: 0.6 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS.map((c, i) => (
                  <tr key={c.email} style={{ borderBottom: '1px solid #F5F0E8', background: i % 2 === 0 ? '#fff' : '#FDFAF6' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FFF8E7'}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FDFAF6'}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{c.name[0]}</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1714' }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#6B6560' }}>{c.email}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1A1714' }}>{c.orders}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#C9A84C' }}>PKR {c.spent.toLocaleString()}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#9B8E7F' }}>{c.since}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'capitalize', ...(STATUS_STYLE[c.status] || {}) }}>
                        {c.status === 'vip' ? '★ ' : ''}{c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
