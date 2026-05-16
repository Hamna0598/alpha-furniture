'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { showToast } from './Toast';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem }              = useCart();
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

  const stars = product.rating ?? 4;

  return (
    <article className={styles.card}>
      <Link href={`/product/${product.slug}`} className={styles.link}>

        {/* Image */}
        <div className={styles.imgWrap}>
          {product.images?.[0]
            ? <img src={product.images[0]} alt={product.name} className={styles.img} loading="lazy" />
            : <div className={styles.imgFallback}>🛋️</div>
          }

          {/* Gradient overlay */}
          <div className={styles.imgOverlay} />

          {/* Badges */}
          <div className={styles.badges}>
            {discount > 0 && (
              <span className={`${styles.badge} ${styles.badgeSale}`}>−{discount}%</span>
            )}
            {product.isNew && (
              <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className={`${styles.wish}${wishlisted ? ' ' + styles.wishActive : ''}`}
            onClick={handleWish}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Quick actions */}
          <div className={styles.quick}>
            <button className={`${styles.quickBtn} ${styles.quickAdd}`} onClick={handleAdd}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </button>
            <Link href={`/product/${product.slug}`} className={styles.quickBtn} onClick={e => e.stopPropagation()} aria-label="Quick view">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.topRow}>
            <p className={styles.cat}>{product.category}</p>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24"
                    fill={i < stars ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth="2"
                    style={{ color: i < stars ? 'var(--gold)' : 'var(--sand)' }}
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <span className={styles.reviews}>({product.reviewCount ?? 0})</span>
            </div>
          </div>

          <h3 className={styles.name}>{product.name}</h3>

          <div className={styles.pricing}>
            <span className={styles.price}>PKR {product.price?.toLocaleString()}</span>
            {product.originalPrice > 0 && (
              <span className={styles.original}>PKR {product.originalPrice?.toLocaleString()}</span>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div className={styles.colors}>
              {product.colors.slice(0, 5).map(c => (
                <span
                  key={c.name}
                  className={styles.colorDot}
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className={styles.moreColors}>+{product.colors.length - 5}</span>
              )}
            </div>
          )}

          <div className={styles.cardFooter}>
            <span className={styles.viewLink}>View Details →</span>
            {discount > 0 && <span className={styles.save}>Save {discount}%</span>}
          </div>
        </div>

        {/* Hover top border line */}
        <div className={styles.hoverLine} />
      </Link>
    </article>
  );
}
