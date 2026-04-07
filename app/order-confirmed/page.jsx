'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './confirmed.module.css';

const METHOD_LABELS = { cod:'Cash on Delivery', bank_hbl:'Bank Transfer (HBL)', card:'Credit/Debit Card', jazzcash:'JazzCash', easypaisa:'EasyPaisa' };

function getDeliveryDate(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const o = sessionStorage.getItem('af_order');
    if (o) setOrder(JSON.parse(o));
  }, []);

  if (!order) return (
    <div style={{textAlign:'center',padding:'6rem 1rem'}}>
      <h2 style={{fontFamily:'var(--ff-display)',marginBottom:'1rem'}}>No order found</h2>
      <Link href="/shop" className="btn btn--primary">Continue Shopping</Link>
    </div>
  );

  const methodLabel = METHOD_LABELS[order.paymentMethod] || order.paymentMethod;

  return (
    <div className={styles.page}>
      <div className={`${styles.inner} container`}>

        {/* Success Header */}
        <div className={styles.successHeader}>
          <div className={styles.checkmark}>✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for shopping with <strong>Alpha Furniture</strong></p>
        </div>

        {/* Receipt */}
        <div className={styles.receipt}>
          <div className={styles.receiptHeader}>
            <span className={styles.receiptLogo}>α ALPHA FURNITURE</span>
            <span className={styles.receiptId}>#{order.orderId}</span>
          </div>

          <div className={styles.receiptSection}>
            <h3>📦 Order Summary</h3>
            {[['Order ID', order.orderId],['Order Date', new Date().toLocaleDateString('en-PK',{year:'numeric',month:'long',day:'numeric'})],['Payment Method', methodLabel],['Order Total', `PKR ${order.total?.toLocaleString()}`]].map(([k,v])=>(
              <div key={k} className={styles.receiptRow}><span>{k}</span><strong style={k==='Order Total'?{color:'var(--gold)',fontFamily:'var(--ff-display)',fontSize:'1rem'}:{}}>{v}</strong></div>
            ))}
          </div>

          <div className={styles.receiptSection}>
            <h3>🚚 Delivery Information</h3>
            <div className={styles.receiptRow}><span>Estimated Delivery</span><strong className={styles.delivDate}>{order.estimatedDelivery}</strong></div>
            <div className={styles.receiptRow}><span>Guaranteed By</span><strong>{getDeliveryDate(7)}</strong></div>
            <div className={styles.receiptRow}><span>Status</span><span className={styles.statusBadge}>Order Received ✓</span></div>
          </div>

          <div className={`${styles.receiptSection} ${styles.sectionGold}`}>
            <h3>📞 What Happens Next?</h3>
            <div className={styles.steps}>
              {[
                ['1','Our team will call you within 24 hours to confirm your order at +92 321 4877048.'],
                ['2','Your furniture will be prepared and quality-checked before dispatch.'],
                ['3','Our delivery team will call you 1 hour before arrival.'],
                ['4','Furniture will be delivered and assembled at your home in Lahore.'],
              ].map(([n,t])=>(
                <div key={n} className={styles.step}>
                  <span className={styles.stepNum}>{n}</span>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.receiptSection}>
            <h3>📍 Visit Our Showroom</h3>
            <div className={styles.receiptRow}><span>Address</span><strong>Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore 54600</strong></div>
            <div className={styles.receiptRow}><span>Phone</span><strong><a href="tel:+923214877048" style={{color:'var(--gold)'}}>+92 321 4877048</a></strong></div>
            <div className={styles.receiptRow}><span>Hours</span><strong>Mon – Sat: 10am – 8pm</strong></div>
          </div>

          {/* Map embed */}
          <div className={styles.mapSection}>
            <iframe
              src="https://maps.google.com/maps?q=Ichra+Furniture+Market+Lahore&output=embed&z=15"
              width="100%" height="220" style={{border:'none',display:'block'}}
              title="Alpha Furniture Location"
              loading="lazy"
            />
          </div>

          <div className={styles.receiptFooter}>
            <p>📞 Questions? Call or WhatsApp: <a href="tel:+923214877048"><strong>+92 321 4877048</strong></a></p>
            <p>✉️ Email: <strong>info@alphafurniture.pk</strong></p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/shop" className="btn btn--primary btn--lg">Continue Shopping</Link>
          <a href={`https://wa.me/923214877048?text=${encodeURIComponent(`Hi! I just placed order ${order.orderId} worth PKR ${order.total?.toLocaleString()}. Please confirm my order.`)}`}
            target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--lg">
            📱 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
