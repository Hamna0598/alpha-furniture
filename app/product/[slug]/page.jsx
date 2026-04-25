'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { showToast } from '@/components/Toast';
import ProductCard from '@/components/ProductCard';
import styles from './product.module.css';

const CAT_LABELS = { beds:'Beds', wardrobes:'Wardrobes', sofas:'Sofas', cornersofas:'Corner Sofas', dining:'Dining Tables', accent:'Accent Chairs' };
const CAT_SIZES  = {
  beds:        ['Single (3×6 ft)','Double (4×6 ft)','Queen (5×6 ft)','King (6×6 ft)'],
  dining:      ['4 Seater','6 Seater','8 Seater'],
  sofas:       ['2 Seater','3 Seater','3+1+1 Seater','5 Seater'],
  cornersofas: ['L-Shape Small','L-Shape Large','U-Shape'],
  accent:      ['Single Chair','Pair of 2'],
  wardrobes:   ['2 Door','3 Door','4 Door','Sliding'],
};

const PAYLOAD = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

export default function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [product, setProduct]     = useState(null);
  const [related, setRelated]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setColor] = useState(null);
  const [selectedSize, setSize]   = useState(null);
  const [qty, setQty]             = useState(1);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then(r => r.json())
      .then(j => {
        if (j.success && j.data) {
          setProduct(j.data);
          setRelated(j.related || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{padding:'8rem 0',textAlign:'center'}}>Loading...</div>;
  if (!product) return (
    <div style={{padding:'4rem',textAlign:'center'}}>
      <h1>Product Not Found</h1>
      <Link href="/shop" className="btn btn--primary" style={{marginTop:'1.5rem'}}>Back to Shop</Link>
    </div>
  );

  const discount       = product.originalPrice > 0 ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const activeColor    = selectedColor || product.colors?.[0]?.name;
  const activeColorObj = product.colors?.find(c => c.name === activeColor);
  const sizes          = CAT_SIZES[product.category] || [];
  const wishlisted     = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product, qty, activeColor, selectedSize);
    showToast(`✓ "${product.name}" added to cart!`);
  };

  return (
    <>
      <nav className={styles.breadcrumb}>
        <div className="container" style={{display:'flex',alignItems:'center',gap:'.5rem',paddingTop:'6rem',paddingBottom:'1rem'}}>
          <Link href="/">Home</Link><span>›</span>
          <Link href="/shop">Shop</Link><span>›</span>
          <Link href={`/shop/${product.category}`}>{CAT_LABELS[product.category]}</Link><span>›</span>
          <span>{product.name}</span>
        </div>
      </nav>

      <article className={styles.detail}>
        <div className="container">
          <div className={styles.grid}>

            {/* Gallery */}
            <figure className={styles.gallery}>
              <div className={styles.mainImg}>
                {product.images?.[activeImg]
                  ? <img src={product.images[activeImg]} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'4rem',background:'var(--parchment)'}}>🛋️</div>
                }
                {discount > 0 && <span className={styles.discBadge}>−{discount}%</span>}
              </div>
              {product.images?.length > 1 && (
                <div className={styles.thumbs}>
                  {product.images.map((img, i) => (
                    <button key={i} className={`${styles.thumb}${activeImg===i?' '+styles.thumbActive:''}`} onClick={()=>setActiveImg(i)}>
                      <img src={img} alt={`View ${i+1}`} />
                    </button>
                  ))}
                </div>
              )}
            </figure>

            {/* Info */}
            <div className={styles.info}>
              <p className={styles.catLabel}>{CAT_LABELS[product.category]}</p>
              <h1 className={styles.title}>{product.name}</h1>
              <div className={styles.rating}>
                <span style={{color:'var(--gold)'}} aria-hidden>{'★'.repeat(product.rating||0)}{'☆'.repeat(5-(product.rating||0))}</span>
                <span className={styles.ratingText}>({product.reviewCount||0} reviews)</span>
              </div>
              <div className={styles.prices}>
                <span className={styles.price}>$ {(product.price||0).toLocaleString()}</span>
                {product.originalPrice > 0 && <span className={styles.original}>$ {product.originalPrice.toLocaleString()}</span>}
                {discount > 0 && <span className={styles.saveTag}>Save {discount}%</span>}
              </div>
              <p className={styles.desc}>{product.description}</p>

              {/* Size */}
              {sizes.length > 0 && (
                <fieldset className={styles.opts} style={{marginTop:'1rem'}}>
                  <legend className="option-label" style={{fontFamily:'var(--ff-caps)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--text-light)',display:'block',marginBottom:'.5rem'}}>
                    Size: <strong style={{color:'var(--dark)'}}>{selectedSize||'Select a size'}</strong>
                  </legend>
                  <div className={styles.sizes}>
                    {sizes.map(s => (
                      <button key={s} className={`${styles.sizeBtn}${selectedSize===s?' '+styles.sizeBtnActive:''}`} onClick={()=>setSize(s)}>{s}</button>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Qty */}
              <div className={styles.qtyRow}>
                <span style={{fontFamily:'var(--ff-caps)',fontSize:'.6rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--text-light)'}}>Qty</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
                  <span className="qty-display">{qty}</span>
                  <button className="qty-btn" onClick={()=>setQty(q=>Math.min(product.stockQty||99,q+1))}>+</button>
                </div>
                <span className={`${styles.stock} ${product.inStock?styles.inStock:styles.outStock}`}>
                  {product.inStock ? `✓ In Stock (${product.stockQty})` : '✗ Out of Stock'}
                </span>
              </div>

              <div className={styles.ctas}>
                <button className="btn btn--primary" onClick={handleAdd} disabled={!product.inStock} style={{flex:1}}>Add to Cart</button>
                <button className={`btn btn--outline${wishlisted?' btn--wishlisted':''}`} onClick={()=>{toggle(product);showToast(wishlisted?'Removed from wishlist':'♥ Added to wishlist');}}>
                  {wishlisted?'♥':'♡'} Wishlist
                </button>
              </div>

              {/* Specs */}
              <details className={styles.specs} open>
                <summary className={styles.specsSummary}>Specifications</summary>
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(product.specifications||{}).map(([k,v])=>(
                      <tr key={k}><th>{k}</th><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </details>

              <div className={styles.delivery}>
                <p>🚚 <strong>Free delivery</strong> on orders above PKR 10,000</p>
                <p>🔄 <strong>7-day returns</strong> — hassle free</p>
                <p>📞 <strong>Questions?</strong> Call <a href="tel:+923214877048" style={{color:'var(--gold)'}}>+92 321 4877048</a></p>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section style={{marginTop:'5rem'}}>
              <header style={{marginBottom:'2.5rem'}}>
                <span className="section-label">More Like This</span>
                <h2 className="section-title">Related Products</h2>
                <div className="divider-gold" />
              </header>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1.5rem'}}>
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
