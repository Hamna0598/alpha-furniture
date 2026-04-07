import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import Toast from '@/components/Toast';

export const metadata = {
  title: 'Alpha Furniture — Quality is our First Priority',
  description: 'Premium handcrafted furniture in Lahore. Beds, sofas, dining sets & more. Visit us at Ichra Furniture Market.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Toast />
            <div className="site-wrapper" style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
              <AnnouncementBar />
              <Header />
              <main id="main-content" style={{ flex:1 }}>{children}</main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
