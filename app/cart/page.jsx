'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/components/Toast';
import styles from './cart.module.css';

function getDeliveryDate(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, deliveryFee, total } = useCart();
  const router = useRouter();

  if (items.length === 0) return (
    <>
      <header className="page-header"><div className="container"><h1 className="page-header__title">Your <em>Cart</em></h1></div></header>
      <div className={styles.empty}>
        <span>🛒</span><h2>Your cart is empty</h2><p>Add some beautiful furniture to get started.</p>
        <Link href="/shop" className="btn btn--primary">Browse Products</Link>
      </div>
    </>
  );

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Your <em>Cart</em></h1>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>›</span><span>Cart</span></nav>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            {/* Items */}
            <div>
              <h2 className={styles.sectionTitle}>Items ({items.length})</h2>
              <ul className={styles.items}>
                {items.map(item => (
                  <li key={item.cartKey} className={styles.item}>
                    <Link href={`/product/${item.slug||''}`} className={styles.imgLink}>
                      <figure className={styles.img}>
                        {item.image ? <img src={item.image} alt={item.name}/> : <span>🛋️</span>}
                      </figure>
                    </Link>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      {item.selectedColor && <p className={styles.itemVariant}><span className={styles.colorDot} style={{background:item.selectedColorHex||'#C9A84C'}}/>{item.selectedColor}</p>}
                      {item.selectedSize  && <p className={styles.itemVariant}>📐 {item.selectedSize}</p>}
                      <p className={styles.itemPrice}>PKR {item.price.toLocaleString()}</p>
                    </div>
                    <div className={styles.itemActions}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={()=>updateQty(item.cartKey,item.quantity-1)}>−</button>
                        <span className="qty-display">{item.quantity}</span>
                        <button className="qty-btn" onClick={()=>updateQty(item.cartKey,item.quantity+1)}>+</button>
                      </div>
                      <p className={styles.itemTotal}>PKR {(item.price*item.quantity).toLocaleString()}</p>
                      <button className={styles.removeBtn} onClick={()=>{removeItem(item.cartKey);showToast('Item removed');}}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <aside className={styles.summary}>
              <h2 className={styles.sectionTitle}>Order Summary</h2>
              <ul className={styles.summaryItems}>
                {items.map(i=>(
                  <li key={i.cartKey} className={styles.summaryItem}>
                    <div className={styles.summaryThumb}>{i.image?<img src={i.image} alt={i.name}/>:<span>🛋️</span>}</div>
                    <div className={styles.summaryInfo}><p>{i.name}</p>{i.selectedColor&&<small>{i.selectedColor}</small>}{i.selectedSize&&<small>{i.selectedSize}</small>}<span>×{i.quantity}</span></div>
                    <strong>PKR {(i.price*i.quantity).toLocaleString()}</strong>
                  </li>
                ))}
              </ul>
              <div className={styles.summaryDivider}/>
              <table className={styles.summaryTable}>
                <tbody>
                  <tr><th>Subtotal</th><td>PKR {subtotal.toLocaleString()}</td></tr>
                  <tr><th>Delivery</th><td className={deliveryFee===0?styles.free:''}>{deliveryFee===0?'FREE 🎉':`PKR ${deliveryFee.toLocaleString()}`}</td></tr>
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}><th>Total</th><td>PKR {total.toLocaleString()}</td></tr>
                </tfoot>
              </table>
              {deliveryFee > 0 && <p className={styles.freeHint}>🚚 Add PKR {(10000-subtotal).toLocaleString()} more for FREE delivery!</p>}
              <div className={styles.deliveryEst}>
                <p className={styles.estTitle}>🕐 Estimated Delivery</p>
                <p className={styles.estDate}>{getDeliveryDate(5)} – {getDeliveryDate(7)}</p>
                <p className={styles.estNote}>Guaranteed within 7 working days</p>
              </div>
              <button className="btn btn--primary btn--full" style={{marginTop:'1.5rem',padding:'1.1rem'}} onClick={()=>router.push('/checkout')}>
                Proceed to Checkout →
              </button>
              <Link href="/shop" className="btn btn--outline btn--full" style={{marginTop:'.75rem',padding:'.9rem'}}>Continue Shopping</Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
