'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './checkout.module.css';

const METHODS = [
  { value:'cod',       label:'Cash on Delivery',  icon:'💵', desc:'Pay cash at your door — no advance needed', color:'#2D6A4F' },
  { value:'bank_hbl',  label:'Bank Transfer (HBL)',icon:'🏦', desc:'Transfer via HBL — fastest verification', color:'#1a3c6e' },
  { value:'card',      label:'Credit / Debit Card',icon:'💳', desc:'Visa, Mastercard, AMEX — 256-bit encrypted', color:'#1a1a5e' },
  { value:'jazzcash',  label:'JazzCash',           icon:'📱', desc:'Send via your JazzCash mobile wallet', color:'#e8003d' },
  { value:'easypaisa', label:'EasyPaisa',           icon:'📱', desc:'Send via your EasyPaisa mobile wallet', color:'#1aaa55' },
];

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, total } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ customerName:'', email:'', phone:'', address:'', city:'', notes:'' });
  const handleChange = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const selectMethod = method => {
    // Store delivery details in sessionStorage, go to payment method page
    sessionStorage.setItem('af_delivery', JSON.stringify(form));
    sessionStorage.setItem('af_method', method);
    router.push(`/checkout/${method}`);
  };

  if (items.length === 0) return (
    <div style={{textAlign:'center',padding:'6rem 1rem'}}>
      <h2 style={{fontFamily:'var(--ff-display)',marginBottom:'1rem'}}>Your cart is empty</h2>
      <Link href="/shop" className="btn btn--primary">Browse Products</Link>
    </div>
  );

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Checkout</h1>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/cart">Cart</Link><span>›</span><span>Checkout</span></nav>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>

            {/* Left: Delivery form */}
            <div className={styles.left}>
              <div className={styles.formCard}>
                <h2 className={styles.cardTitle}>📦 Delivery Details</h2>
                <div className="form-group">
                  <label htmlFor="customerName">Full Name *</label>
                  <input id="customerName" name="customerName" type="text" value={form.customerName} onChange={handleChange} placeholder="Ahmed Raza" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+92 321 4877048" required />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea id="address" name="address" rows={2} value={form.address} onChange={handleChange} placeholder="House No., Street, Area..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input id="city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Lahore" required />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Special Instructions (optional)</label>
                  <textarea id="notes" name="notes" rows={2} value={form.notes} onChange={handleChange} placeholder="Any special delivery instructions..." />
                </div>
              </div>

              {/* Payment method selection */}
              <div className={styles.formCard} style={{marginTop:'1.5rem'}}>
                <h2 className={styles.cardTitle}>💳 Select Payment Method</h2>
                <p className={styles.methodHint}>Choose how you'd like to pay — you'll see full details on the next page.</p>
                <div className={styles.methods}>
                  {METHODS.map(m => (
                    <button key={m.value} className={styles.methodCard}
                      onClick={() => {
                        if (!form.customerName || !form.phone || !form.address || !form.city) {
                          alert('Please fill in all required delivery details first.');
                          return;
                        }
                        selectMethod(m.value);
                      }}
                      style={{ '--method-color': m.color }}
                    >
                      <span className={styles.methodIcon}>{m.icon}</span>
                      <div className={styles.methodInfo}>
                        <strong>{m.label}</strong>
                        <span>{m.desc}</span>
                      </div>
                      <span className={styles.methodArrow}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <aside className={styles.summary}>
              <h2 className={styles.cardTitle}>Order Summary</h2>
              <ul className={styles.summaryItems}>
                {items.map(i=>(
                  <li key={i.cartKey} className={styles.summaryItem}>
                    <div className={styles.summaryThumb}>{i.image?<img src={i.image} alt={i.name}/>:<span>🛋️</span>}</div>
                    <div className={styles.summaryInfo}>
                      <p>{i.name}</p>
                      {i.selectedColor&&<small>Colour: {i.selectedColor}</small>}
                      {i.selectedSize&&<small>Size: {i.selectedSize}</small>}
                      <span>×{i.quantity}</span>
                    </div>
                    <strong>PKR {(i.price*i.quantity).toLocaleString()}</strong>
                  </li>
                ))}
              </ul>
              <div style={{height:'1px',background:'var(--border)',margin:'1rem 0'}}/>
              <table className={styles.totals}>
                <tbody>
                  <tr><th>Subtotal</th><td>PKR {subtotal.toLocaleString()}</td></tr>
                  <tr><th>Delivery</th><td className={deliveryFee===0?styles.free:''}>{deliveryFee===0?'FREE 🎉':`PKR ${deliveryFee.toLocaleString()}`}</td></tr>
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}><th>Total</th><td>PKR {total.toLocaleString()}</td></tr>
                </tfoot>
              </table>
              <div className={styles.contactBox}>
                <p>📞 Need help? Call or WhatsApp</p>
                <a href="tel:+923214877048" className={styles.phoneLink}>+92 321 4877048</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
