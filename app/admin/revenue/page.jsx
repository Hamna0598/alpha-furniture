'use client';
import Navbar from '../components/Navbar';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const DATA = [
  { month: 'Jul', revenue: 1420000, orders: 58,  avg: 24483 },
  { month: 'Aug', revenue: 1680000, orders: 71,  avg: 23662 },
  { month: 'Sep', revenue: 1530000, orders: 63,  avg: 24286 },
  { month: 'Oct', revenue: 1890000, orders: 82,  avg: 23049 },
  { month: 'Nov', revenue: 2230000, orders: 97,  avg: 22990 },
  { month: 'Dec', revenue: 2780000, orders: 118, avg: 23559 },
  { month: 'Jan', revenue: 1960000, orders: 84,  avg: 23333 },
  { month: 'Feb', revenue: 2100000, orders: 91,  avg: 23077 },
  { month: 'Mar', revenue: 2440000, orders: 106, avg: 23019 },
  { month: 'Apr', revenue: 2670000, orders: 114, avg: 23421 },
];

function Card({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714', marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

export default function RevenuePage() {
  const totalRevenue = DATA.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = DATA.reduce((s, d) => s + d.orders, 0);
  const avgOrder     = Math.round(totalRevenue / totalOrders);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Revenue" subtitle="Financial performance overview" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Total Revenue (10 mo.)', value: `PKR ${(totalRevenue/1000000).toFixed(2)}M`, sub: '↑ 18.2% vs last year', color: '#C9A84C' },
            { label: 'Total Orders',           value: totalOrders,                                   sub: '↑ 12.5% vs last year', color: '#3B82F6' },
            { label: 'Avg. Order Value',       value: `PKR ${avgOrder.toLocaleString()}`,            sub: 'Per transaction',      color: '#10B981' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 11, color: '#9B8E7F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1A1714', marginBottom: 6 }}>{value}</div>
              <div style={{ fontSize: 12, color, fontWeight: 600 }}>{sub}</div>
            </div>
          ))}
        </div>

        <Card title="Revenue Trend">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip formatter={v => `PKR ${(v/1000).toFixed(0)}K`} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#C9A84C" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <Card title="Monthly Orders">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DATA} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" name="Orders" fill="#8B5CF6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Avg Order Value">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => `PKR ${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="avg" name="Avg Order" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

      </main>
    </div>
  );
}
