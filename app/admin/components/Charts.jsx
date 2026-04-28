'use client';
import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const MONTHLY = [
  { month: 'Jul', revenue: 1420000, orders: 58 },
  { month: 'Aug', revenue: 1680000, orders: 71 },
  { month: 'Sep', revenue: 1530000, orders: 63 },
  { month: 'Oct', revenue: 1890000, orders: 82 },
  { month: 'Nov', revenue: 2230000, orders: 97 },
  { month: 'Dec', revenue: 2780000, orders: 118 },
  { month: 'Jan', revenue: 1960000, orders: 84 },
  { month: 'Feb', revenue: 2100000, orders: 91 },
  { month: 'Mar', revenue: 2440000, orders: 106 },
  { month: 'Apr', revenue: 2670000, orders: 114 },
];

const CATS = [
  { name: 'Sofas',        value: 32, color: '#C9A84C' },
  { name: 'Beds',         value: 25, color: '#8B5CF6' },
  { name: 'Dining',       value: 22, color: '#10B981' },
  { name: 'Corner Sofas', value: 12, color: '#3B82F6' },
  { name: 'Accent',       value: 9,  color: '#F43F5E' },
];

function Card({ title, subtitle, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: '#9B8E7F', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function TipBox({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0E0E0E', border: '1px solid #C9A84C', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#C9A84C', fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: '#FAF7F1' }}>
          {p.name}: {p.name === 'Revenue' ? `PKR ${(p.value / 1000).toFixed(0)}K` : p.value}
        </div>
      ))}
    </div>
  );
}

export default function Charts() {
  const [filter, setFilter] = useState('monthly');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Row 1: Bar + Pie */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>

        {/* Revenue Bar */}
        <Card title="Monthly Revenue" subtitle="Sales performance over time">
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            {['weekly','monthly','yearly'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
                background: filter === f ? '#C9A84C' : '#F0EAE0',
                color: filter === f ? '#fff' : '#6B6560',
                transition: 'all 0.15s',
              }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} width={46} />
              <Tooltip content={<TipBox />} />
              <Bar dataKey="revenue" name="Revenue" fill="#C9A84C" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Pie */}
        <Card title="Product Categories" subtitle="Sales by category">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CATS} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                {CATS.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {CATS.map(({ name, value, color }) => (
              <li key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#5C564F' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  {name}
                </span>
                <span style={{ fontWeight: 700, color: '#1A1714' }}>{value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Row 2: Orders Line */}
      <Card title="Orders Trend" subtitle="Monthly order volume">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={MONTHLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9B8E7F' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" name="Orders" stroke="#8B5CF6" strokeWidth={2.5}
              dot={{ r: 3, fill: '#8B5CF6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

    </div>
  );
}
