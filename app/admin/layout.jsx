import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Admin — Alpha Furniture',
  description: 'Alpha Furniture Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#F5F0E8',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
