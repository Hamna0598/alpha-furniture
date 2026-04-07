'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/components/Toast';
import styles from './method.module.css';

const METHOD_INFO = {
  cod:       { label:'Cash on Delivery',    icon:'💵', color:'#2D6A4F' },
  bank_hbl:  { label:'Bank Transfer (HBL)', icon:'🏦', color:'#1a3c6e' },
  card:      { label:'Credit / Debit Card', icon:'💳', color:'#1a1a5e' },
  jazzcash:  { label:'JazzCash',            icon:'📱', color:'#e8003d' },
  easypaisa: { label:'EasyPaisa',           icon:'📱', color:'#1aaa55' },
};

function getDeliveryDate(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ── COD Panel ──────────────────────────────────────────────────────────────
function CodPanel({ deliveryFee }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{borderColor:'#2D6A4F'}}>
        <span className={styles.panelIcon}>💵</span>
        <div><h3>Cash on Delivery</h3><p>Pay in cash when your furniture arrives. No advance payment required.</p></div>
      </div>
      <div className={styles.infoBox} style={{borderColor:'#c8e6c9',background:'#f1f8f4'}}>
        <div className={styles.infoRow}><span>🚚 Delivery Charges</span><strong style={{color:'#2D6A4F'}}>{deliveryFee===0?'FREE 🎉':`PKR ${deliveryFee.toLocaleString()}`}</strong></div>
        {deliveryFee > 0 && <p className={styles.infoNote}>Add more items for FREE delivery on orders above PKR 10,000</p>}
      </div>
      <div className={styles.termsBox}>
        <p className={styles.termsTitle}>📋 Terms & Conditions</p>
        <ul className={styles.termsList}>
          <li>Please have the exact cash amount ready at delivery time.</li>
          <li>Our team will call you 1 hour before arrival at +92 321 4877048.</li>
          <li>If you're unavailable, the order will be rescheduled once at no charge.</li>
          <li>Alpha Furniture may cancel the order if delivery fails twice.</li>
          <li>All prices include applicable taxes.</li>
        </ul>
      </div>
    </div>
  );
}

// ── Bank Panel ──────────────────────────────────────────────────────────────
function BankPanel({ extra, setExtra }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{borderColor:'#1a3c6e'}}>
        <span className={styles.panelIcon}>🏦</span>
        <div><h3>Bank Transfer — HBL</h3><p>Transfer funds to our HBL account, then fill in your details below.</p></div>
      </div>
      <div className={styles.bankCard}>
        <p className={styles.bankTitle}>Transfer to this account:</p>
        {[['Bank','Habib Bank Limited (HBL)'],['Account Title','Alpha Furniture Pvt Ltd'],['Account No.','0123-4567890-001'],['IBAN','PK36HABB0000123456789001'],['Branch Code','0123 — Ichra, Lahore']].map(([k,v])=>(
          <div key={k} className={styles.bankRow}><span>{k}</span><strong>{v}</strong></div>
        ))}
      </div>
      <div className="form-group"><label>Your HBL Account Number *</label><input type="text" value={extra.bankAccount||''} onChange={e=>setExtra(p=>({...p,bankAccount:e.target.value}))} placeholder="0123-4567890-001" /></div>
      <div className="form-group"><label>Your CNIC Number *</label><input type="text" value={extra.bankCnic||''} onChange={e=>setExtra(p=>({...p,bankCnic:e.target.value}))} placeholder="35201-1234567-1" /></div>
      <div className="form-group"><label>Transaction Reference No. *</label><input type="text" value={extra.bankRef||''} onChange={e=>setExtra(p=>({...p,bankRef:e.target.value}))} placeholder="TXN123456789" /></div>
      <div className={styles.termsBox}>
        <p className={styles.termsTitle}>📋 Terms & Conditions</p>
        <ul className={styles.termsList}>
          <li>Transfer the exact order amount. Partial payments will not be accepted.</li>
          <li>Your order will be processed within 24 hours after payment verification.</li>
          <li>Keep your transaction receipt — you may be asked to share it via WhatsApp.</li>
          <li>CNIC must match the account holder's name.</li>
          <li>Alpha Furniture is not responsible for transfers to incorrect accounts.</li>
          <li>Refunds (if applicable) will be processed within 5–7 working days.</li>
        </ul>
      </div>
    </div>
  );
}

// ── Card Panel ──────────────────────────────────────────────────────────────
function CardPanel({ extra, setExtra }) {
  const [cardType, setCardType] = useState('');
  const detectCard = n => { const d=n.replace(/\s/g,''); if(/^4/.test(d)) return 'VISA'; if(/^5[1-5]/.test(d)) return 'Mastercard'; if(/^3[47]/.test(d)) return 'AMEX'; return ''; };
  const handleCard = e => { let v=e.target.value.replace(/\D/g,'').slice(0,16); v=v.replace(/(.{4})/g,'$1 ').trim(); setCardType(detectCard(v)); setExtra(p=>({...p,cardNumber:v})); };
  const handleExpiry = e => { let v=e.target.value.replace(/\D/g,'').slice(0,4); if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2); setExtra(p=>({...p,cardExpiry:v})); };
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{borderColor:'#1a1a5e'}}>
        <span className={styles.panelIcon}>💳</span>
        <div><h3>Credit / Debit Card</h3><p>Secure payment with 256-bit SSL encryption.</p></div>
      </div>
      <div className={styles.cardBrands}>
        {['VISA','Mastercard','AMEX'].map(b=><span key={b} className={`${styles.brandTag}${cardType===b?' '+styles.brandActive:''}`}>{b}</span>)}
      </div>
      <div className="form-group"><label>Card Number *</label><input type="text" value={extra.cardNumber||''} onChange={handleCard} placeholder="1234 5678 9012 3456" maxLength={19} /></div>
      <div className={styles.cardRow2}>
        <div className="form-group"><label>Expiry Date *</label><input type="text" value={extra.cardExpiry||''} onChange={handleExpiry} placeholder="MM/YY" maxLength={5} /></div>
        <div className="form-group"><label>CVV *</label><input type="password" value={extra.cardCvv||''} onChange={e=>setExtra(p=>({...p,cardCvv:e.target.value}))} placeholder="•••" maxLength={4} /></div>
      </div>
      <div className="form-group"><label>Name on Card *</label><input type="text" value={extra.cardName||''} onChange={e=>setExtra(p=>({...p,cardName:e.target.value}))} placeholder="Ahmed Raza" /></div>
      <div className={styles.secureBadge}>🔒 Your card details are encrypted and never stored on our servers</div>
      <div className={styles.termsBox}>
        <p className={styles.termsTitle}>📋 Terms & Conditions</p>
        <ul className={styles.termsList}>
          <li>We accept Visa, Mastercard, and American Express cards.</li>
          <li>Your card will be charged immediately upon order confirmation.</li>
          <li>CVV is required for all transactions for your security.</li>
          <li>In case of a failed payment, no amount will be deducted.</li>
          <li>Chargebacks or disputes must be raised within 30 days of purchase.</li>
          <li>For questions, call us at +92 321 4877048.</li>
        </ul>
      </div>
    </div>
  );
}

// ── Wallet Panel ──────────────────────────────────────────────────────────────
function WalletPanel({ method, extra, setExtra }) {
  const isJazz = method === 'jazzcash';
  const brand  = isJazz ? 'JazzCash' : 'EasyPaisa';
  const color  = isJazz ? '#e8003d' : '#1aaa55';
  const accNo  = isJazz ? '0321-4877048' : '0333-0000000';
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{borderColor:color}}>
        <span className={styles.panelIcon}>📱</span>
        <div><h3>{brand} Payment</h3><p>Send payment to our {brand} account, then enter your details.</p></div>
      </div>
      <div className={styles.walletCard} style={{borderColor:color}}>
        <p className={styles.bankTitle}>Send payment to:</p>
        {[['Account Title','Alpha Furniture'],[`${brand} Number`,accNo],['Account Type','Business Account']].map(([k,v])=>(
          <div key={k} className={styles.bankRow}><span>{k}</span><strong style={{color}}>{v}</strong></div>
        ))}
      </div>
      <div className="form-group"><label>Your {brand} Number *</label><input type="tel" value={extra.walletNumber||''} onChange={e=>setExtra(p=>({...p,walletNumber:e.target.value}))} placeholder="03XX-XXXXXXX" /></div>
      <div className="form-group"><label>Transaction ID *</label><input type="text" value={extra.walletTxn||''} onChange={e=>setExtra(p=>({...p,walletTxn:e.target.value}))} placeholder={`${brand.replace(' ','')}TXN123456`} /></div>
      <div className={styles.termsBox}>
        <p className={styles.termsTitle}>📋 Terms & Conditions</p>
        <ul className={styles.termsList}>
          <li>Send the exact order amount to avoid payment delays.</li>
          <li>Your order will be confirmed within 2 hours after payment verification.</li>
          <li>Screenshot of payment may be requested via WhatsApp: +92 321 4877048.</li>
          <li>Transaction ID must be valid — incorrect IDs will delay your order.</li>
          <li>Refunds are processed back to your {brand} account within 3–5 working days.</li>
        </ul>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function PaymentMethodPage() {
  const { method } = useParams();
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();

  const [delivery, setDelivery] = useState(null);
  const [extra, setExtra]       = useState({});
  const [agreed, setAgreed]     = useState(false);
  const [placing, setPlacing]   = useState(false);

  useEffect(() => {
    const d = sessionStorage.getItem('af_delivery');
    if (d) setDelivery(JSON.parse(d));
    else router.push('/checkout');
  }, []);

  const info = METHOD_INFO[method] || METHOD_INFO.cod;

  const handlePlace = async () => {
    if (!agreed) { showToast('Please agree to the terms & conditions.', 'error'); return; }
    setPlacing(true);
    try {
      const payload = { ...delivery, paymentMethod: method, items: items.map(i=>({ productId:i.id, name:i.name, price:i.price, quantity:i.quantity, selectedColor:i.selectedColor, selectedSize:i.selectedSize })), ...extra };
      const res  = await fetch('/api/orders', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
      const json = await res.json();
      if (json.success) {
        sessionStorage.setItem('af_order', JSON.stringify(json.data));
        clearCart();
        // Open WhatsApp notification for Alpha Furniture
        if (json.data.whatsappUrl) window.open(json.data.whatsappUrl, '_blank');
        router.push('/order-confirmed');
      } else {
        showToast('Failed to place order. Please check your details.', 'error');
      }
    } catch { showToast('Network error. Please try again.', 'error'); }
    finally   { setPlacing(false); }
  };

  if (!delivery) return <div style={{padding:'6rem',textAlign:'center'}}>Loading...</div>;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">{info.icon} <em>{info.label}</em></h1>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/cart">Cart</Link><span>›</span>
            <Link href="/checkout">Checkout</Link><span>›</span>
            <span>Payment</span>
          </nav>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.left}>
              {/* Payment panel */}
              {method === 'cod'       && <CodPanel deliveryFee={deliveryFee} />}
              {method === 'bank_hbl'  && <BankPanel extra={extra} setExtra={setExtra} />}
              {method === 'card'       && <CardPanel extra={extra} setExtra={setExtra} />}
              {(method==='jazzcash'||method==='easypaisa') && <WalletPanel method={method} extra={extra} setExtra={setExtra} />}

              {/* Delivery summary */}
              <div className={styles.deliveryReview}>
                <h3 className={styles.reviewTitle}>📦 Delivery Details</h3>
                <div className={styles.reviewGrid}>
                  <div><span>Name</span><strong>{delivery.customerName}</strong></div>
                  <div><span>Phone</span><strong>{delivery.phone}</strong></div>
                  <div><span>City</span><strong>{delivery.city}</strong></div>
                  <div><span>Address</span><strong>{delivery.address}</strong></div>
                </div>
                <Link href="/checkout" className={styles.changeLink}>← Change delivery details</Link>
              </div>

              {/* Agree & Place */}
              <div className={styles.placeSection}>
                <label className={styles.agreeLabel}>
                  <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} />
                  <span>I have read and agree to the payment terms & conditions above</span>
                </label>
                <button className="btn btn--primary btn--full" style={{padding:'1.1rem',fontSize:'.75rem',letterSpacing:'.15em',marginTop:'1rem'}}
                  onClick={handlePlace} disabled={placing||!agreed}>
                  {placing ? 'Placing Order...' : `✓ Confirm Order — PKR ${total.toLocaleString()}`}
                </button>
                <p className={styles.secureNote}>🔒 Your information is safe and secure</p>
                <p className={styles.waNote}>📱 After placing your order, a WhatsApp message will open to notify Alpha Furniture</p>
              </div>
            </div>

            {/* Right summary */}
            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <ul className={styles.summaryItems}>
                {items.map(i=>(
                  <li key={i.cartKey} className={styles.summaryItem}>
                    <div className={styles.thumb}>{i.image?<img src={i.image} alt={i.name}/>:<span>🛋️</span>}</div>
                    <div className={styles.siInfo}><p>{i.name}</p>{i.selectedColor&&<small>{i.selectedColor}</small>}{i.selectedSize&&<small>{i.selectedSize}</small>}<span>×{i.quantity}</span></div>
                    <strong>PKR {(i.price*i.quantity).toLocaleString()}</strong>
                  </li>
                ))}
              </ul>
              <div style={{height:'1px',background:'var(--border)',margin:'1rem 0'}}/>
              <table className={styles.totals}>
                <tbody>
                  <tr><th>Subtotal</th><td>PKR {subtotal.toLocaleString()}</td></tr>
                  <tr><th>Delivery</th><td className={deliveryFee===0?styles.free:''}>{deliveryFee===0?'FREE 🎉':`PKR ${deliveryFee.toLocaleString()}`}</td></tr>
                  <tr><th>Payment</th><td>{info.label}</td></tr>
                </tbody>
                <tfoot><tr className={styles.totalRow}><th>Total</th><td>PKR {total.toLocaleString()}</td></tr></tfoot>
              </table>
              <div className={styles.deliveryEst}>
                <p>🕐 Estimated Delivery</p>
                <strong>{getDeliveryDate(5)} – {getDeliveryDate(7)}</strong>
                <span>Guaranteed within 7 working days</span>
              </div>
              <div className={styles.contactBox}>
                <p>Questions? Call us:</p>
                <a href="tel:+923214877048">+92 321 4877048</a>
                <a href="https://wa.me/923214877048" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
