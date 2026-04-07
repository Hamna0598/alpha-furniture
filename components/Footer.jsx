import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.emblem}>α</div>
              <div className={styles.logoText}><strong>Alpha Furniture</strong><span>Quality is our First Priority</span></div>
            </Link>
            <p>Handcrafted furniture with the finest sheesham wood since 2010. Every piece tells a story of artistry and timeless elegance.</p>
            <nav className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.social}>f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.social}>in</a>
              <a href="https://wa.me/923214877048" target="_blank" rel="noopener noreferrer" className={styles.social}>wa</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.social}>yt</a>
            </nav>
          </div>

          <nav className={styles.col}>
            <h4>Collections</h4>
            <ul>{[['beds','Beds'],['wardrobes','Wardrobes'],['sofas','Sofas'],['cornersofas','Corner Sofas'],['dining','Dining Tables'],['accent','Accent Chairs']].map(([s,l])=>(
              <li key={s}><Link href={`/shop/${s}`}>{l}</Link></li>
            ))}</ul>
          </nav>

          <nav className={styles.col}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shop">New Arrivals</Link></li>
              <li><a href="#">Delivery Policy</a></li>
              <li><a href="#">Returns Policy</a></li>
            </ul>
          </nav>

          <address className={styles.col} style={{ fontStyle:'normal' }}>
            <h4>Get In Touch</h4>
            <ul>
              <li className={styles.contactItem}><span>📍</span><span>Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore 54600, Pakistan</span></li>
              <li className={styles.contactItem}><span>📞</span><a href="tel:+923214877048">+92 321 4877048</a></li>
              <li className={styles.contactItem}><span>💬</span><a href="https://wa.me/923214877048" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
              <li className={styles.contactItem}><span>✉️</span><span>info@alphafurniture.pk</span></li>
              <li className={styles.contactItem}><span>🕐</span><span>Mon – Sat: 10am – 8pm</span></li>
            </ul>
          </address>
        </div>

        <div className={styles.bottom}>
          <p>© {year} <span>Alpha Furniture</span>. All rights reserved. Made with ♥ in Lahore.</p>
          <nav className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
