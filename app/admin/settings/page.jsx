'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

function Section({ icon, title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #F0EAE0' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF8E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1714' }}>{title}</div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B6560', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} style={{
        width: '100%', padding: '10px 12px', fontSize: 13,
        background: '#F5F0E8', border: '1px solid #E8E0D0', borderRadius: 10,
        outline: 'none', color: '#1A1714', fontFamily: 'inherit', boxSizing: 'border-box',
      }} />
    </div>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #F5F0E8' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#9B8E7F', marginTop: 2 }}>{desc}</div>
      </div>
      <button onClick={onChange} style={{
        width: 44, height: 24, borderRadius: 99,
        background: value ? '#C9A84C' : '#E8E0D0',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0, marginLeft: 16,
      }}>
        <span style={{
          position: 'absolute', top: 3, width: 18, height: 18,
          borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.2s', left: value ? 23 : 3,
        }} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: 'Alpha Furniture', email: 'info@alphafurniture.pk',
    phone: '+92 321 487 7048', address: 'Ichra Furniture Market, Lahore',
    currency: 'PKR', notifications: true, lowStockAlert: true, orderAlerts: true,
  });

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));
  const toggle = field => () => setForm(f => ({ ...f, [field]: !f[field] }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Settings" subtitle="Configure your store preferences" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>

          <Section icon="🏪" title="Store Information">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Store Name"    value={form.storeName} onChange={set('storeName')} />
              <Field label="Email Address" value={form.email}     onChange={set('email')}     type="email" />
              <Field label="Phone Number"  value={form.phone}     onChange={set('phone')} />
              <Field label="Currency"      value={form.currency}  onChange={set('currency')} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Store Address" value={form.address} onChange={set('address')} />
              </div>
            </div>
          </Section>

          <Section icon="🔔" title="Notifications">
            <Toggle label="Email Notifications" desc="Receive order and customer alerts via email"          value={form.notifications} onChange={toggle('notifications')} />
            <Toggle label="Low Stock Alerts"    desc="Get notified when product stock drops below 3 units" value={form.lowStockAlert} onChange={toggle('lowStockAlert')} />
            <Toggle label="New Order Alerts"    desc="Instant notification for every new order placed"     value={form.orderAlerts}   onChange={toggle('orderAlerts')} />
          </Section>

          <Section icon="🔒" title="Security">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['Current Password', 'password'], ['New Password', 'password'], ['Confirm New Password', 'password']].map(([label, type]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B6560', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</label>
                  <input type={type} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', fontSize: 13, background: '#F5F0E8', border: '1px solid #E8E0D0', borderRadius: 10, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
          </Section>

          <button onClick={handleSave} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
            background: saved ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #C9A84C, #8B6914)',
            color: '#fff', transition: 'all 0.2s', alignSelf: 'flex-start',
          }}>
            {saved ? '✓ Settings Saved!' : '💾 Save Settings'}
          </button>

        </div>
      </main>
    </div>
  );
}
