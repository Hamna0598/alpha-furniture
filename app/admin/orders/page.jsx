'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrdersTable from '../components/OrdersTable';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders').then(r => r.json()).then(d => setOrders(d.data || [])).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Navbar title="Orders" subtitle="Track and manage customer orders" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {loading
          ? <div style={{ height: 400, background: '#fff', borderRadius: 16, border: '1px solid #E8E0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B8E7F' }}>Loading orders…</div>
          : <OrdersTable orders={orders} />
        }
      </main>
    </div>
  );
}
