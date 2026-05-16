// ─────────────────────────────────────────────────────────
//  StockBadge.jsx
//  Location: components/StockBadge.jsx
//
//  Props:
//    stockQty  – number (quantity in stock)
//    inStock   – boolean
//    size      – 'sm' | 'md' (default) | 'lg'
//
//  Usage (ProductCard):
//    <StockBadge stockQty={product.stockQty} inStock={product.inStock} size="sm" />
//
//  Usage (Product Detail page):
//    <StockBadge stockQty={product.stockQty} inStock={product.inStock} size="lg" />
// ─────────────────────────────────────────────────────────
import styles from './StockBadge.module.css';

export default function StockBadge({ stockQty = 0, inStock = true, size = 'md' }) {
  // Derive status from props
  const status = !inStock || stockQty === 0
    ? 'out'
    : stockQty <= 5
      ? 'limited'
      : 'in';

  const sizeClass = size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : '';

  if (status === 'out') {
    return (
      <span className={`${styles.badge} ${styles.outOfStock} ${sizeClass}`}>
        <span className={styles.dot} />
        Out of Stock
      </span>
    );
  }

  if (status === 'limited') {
    return (
      <span className={`${styles.badge} ${styles.limited} ${sizeClass}`}>
        <span className={styles.dot} />
        Only {stockQty} left
      </span>
    );
  }

  return (
    <span className={`${styles.badge} ${styles.inStock} ${sizeClass}`}>
      <span className={styles.dot} />
      In Stock
    </span>
  );
}
