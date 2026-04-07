'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { showToast } from './Toast';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  if (!product) return null;

  const discount   = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const wishlisted = isWishlisted(product.id);

  const handleAdd = e => {
    e.preventDefault(); e.stopPropagation();
    addItem(product, 1, product.colors?.[0]?.name);
    showToast(`✓ "${product.name}" added to cart!`);
  };
  const handleWish = e => {
    e.preventDefault(); e.stopPropagation();
    toggle(product);
    showToast(wishlisted ? 'Removed from wishlist' : '♥ Added to wishlist');
  };

  return (
    <article className={styles.card}>
      <Link href={`/product/${product.slug}`} className={styles.link}>
        <div className={styles.imgWrap}>
          {product.images?.[0]
            ? <img src={product.images[0]} alt={product.name} className={styles.img} loading="lazy" />
            : <div className={styles.imgFallback}>🛋️</div>
          }
          <div className={styles.badges}>
            {discount > 0 && <span className={`${styles.badge} ${styles.badgeSale}`}>−{discount}%</span>}
            {product.isNew  && <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>}
          </div>
          <button className={`${styles.wish}${wishlisted ? ' ' + styles.wishActive : ''}`} onClick={handleWish} aria-label="Wishlist">
            {wishlisted ? '♥' : '♡'}
          </button>
          <div className={styles.quick}>
            <button className={`${styles.quickBtn} ${styles.quickAdd}`} onClick={handleAdd}>Add to Cart</button>
            <Link href={`/product/${product.slug}`} className={styles.quickBtn} onClick={e=>e.stopPropagation()}>👁</Link>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.cat}>{product.category}</p>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.rating}>
            <span>{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
            <span className={styles.reviews}>({product.reviewCount})</span>
          </div>
          <div className={styles.pricing}>
            <span className={styles.price}>PKR {product.price.toLocaleString()}</span>
            {product.originalPrice > 0 && <span className={styles.original}>PKR {product.originalPrice.toLocaleString()}</span>}
            {discount > 0 && <span className={styles.save}>Save {discount}%</span>}
          </div>
          {product.colors?.length > 0 && (
            <div className={styles.colors}>
              {product.colors.slice(0,4).map(c => <span key={c.name} className={styles.colorDot} style={{background:c.hex}} title={c.name} />)}
              {product.colors.length > 4 && <span className={styles.moreColors}>+{product.colors.length-4}</span>}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
