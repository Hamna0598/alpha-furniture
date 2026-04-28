'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Dashboard',  href: '/admin',           icon: '⊞' },
  { label: 'Products',   href: '/admin/products',  icon: '◈' },
  { label: 'Orders',     href: '/admin/orders',    icon: '◫' },
  { label: 'Customers',  href: '/admin/customers', icon: '◎' },
  { label: 'Inventory',  href: '/admin/inventory', icon: '▦' },
  { label: 'Revenue',    href: '/admin/revenue',   icon: '◉' },
  { label: 'Reviews',    href: '/admin/reviews',   icon: '★' },
  { label: 'Settings',   href: '/admin/settings',  icon: '⚙' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const w = collapsed ? 68 : 240;

  return (
    <aside style={{
      width: w,
      minWidth: w,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0E0E0E',
      borderRight: '1px solid #1E1E1E',
      transition: 'width 0.25s ease',
      overflow: 'hidden',
      zIndex: 40,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: collapsed ? '20px 0' : '20px 16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: '1px solid #1E1E1E',
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: '#fff', fontWeight: 700, flexShrink: 0,
        }}>α</div>
        {!collapsed && (
          <div>
            <div style={{ color: '#C9A84C', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Alpha</div>
            <div style={{ color: '#5C564F', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {NAV.map(({ label, href, icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '11px 0' : '11px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 10,
              marginBottom: 2,
              background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
              borderLeft: active ? '3px solid #C9A84C' : '3px solid transparent',
              color: active ? '#C9A84C' : '#6B6560',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              textDecoration: 'none',
              transition: 'all 0.15s',
              position: 'relative',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.color = '#C9A84C'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? '#C9A84C' : '#6B6560'; }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '8px', borderTop: '1px solid #1E1E1E' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%', padding: '10px', borderRadius: 10,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#5C564F', fontSize: 12, display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1E1E1E'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {collapsed ? '→' : '← Collapse'}
        </button>
      </div>
    </aside>
  );
}
