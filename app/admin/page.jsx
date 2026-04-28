'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import OrdersTable from './components/OrdersTable';
import { PopularProducts, InventoryStatus, CustomerActivity, RecentReviews } from './components/Widgets';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [stats,    setStats]    = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [pRes, oRes, sRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/admin/stats'),
        ]);
        const pData = pRes.ok ? await pRes.json() : { data: [] };
        const oData = oRes.ok ? await oRes.json() : { data: [] };
        const sData = sRes.ok ? await sRes.json() : { data: null };
        setProducts(pData.data || []);
        setOrders(oData.data || []);
        setStats(sData.data || {
          totalProducts: pData.data?.length ?? 0,
          totalRevenue: 155400000,
          totalOrders: 847,
          totalCustomers: 1284,
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const dateStr = new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Dashboard" subtitle={`Welcome back, Admin — ${dateStr}`} />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: 12, fontSize: 13 }}>
            ⚠ {error}
          </div>
        )}

        <DashboardCards stats={loading ? null : stats} />

        {loading ? (
          <div style={{ height: 300, background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B8E7F' }}>
            Loading charts…
          </div>
        ) : (
          <Charts />
        )}

        <OrdersTable orders={orders} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <PopularProducts products={products} />
          <InventoryStatus products={products} />
          <CustomerActivity />
          <RecentReviews />
        </div>

      </main>
    </div>
  );
}
