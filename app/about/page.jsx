import Link from 'next/link';
import styles from './about.module.css';

export const metadata = { title: 'About Us — Alpha Furniture Lahore' };

export default function AboutPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Our <em>Story</em></h1>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>›</span><span>About</span></nav>
        </div>
      </header>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              <span className="section-label">Est. 2010 — Lahore, Pakistan</span>
              <h2 className="section-title">Crafting Excellence<br/><em>Since 2010</em></h2>
              <div className="divider-gold" style={{marginBottom:'1.5rem'}}/>
              <p style={{fontSize:'.9rem',lineHeight:'1.85',color:'var(--text-light)',marginBottom:'1rem'}}>Alpha Furniture was founded with a single vision — to bring world-class furniture craftsmanship to Pakistani homes at honest prices. Located in the heart of Ichra Furniture Market, Lahore, we have been serving customers across Pakistan for over 14 years.</p>
              <p style={{fontSize:'.9rem',lineHeight:'1.85',color:'var(--text-light)',marginBottom:'1.5rem'}}>Every piece of furniture is crafted using premium-grade sheesham (rosewood), the finest hardwood found in the subcontinent. Our master craftsmen combine traditional joinery techniques with modern designs to create furniture that lasts generations.</p>
              <div className={styles.stats}>
                {[['14+','Years Experience'],['5000+','Happy Customers'],['35+','Products'],['2 Year','Warranty']].map(([n,l])=>(
                  <div key={l} className={styles.stat}><strong>{n}</strong><span>{l}</span></div>
                ))}
              </div>
            </div>
            <div className={styles.imgSide}>
              <img src="/images/cornersofas/corner-ushape-brown.png" alt="Alpha Furniture Showroom" className={styles.aboutImg} />
            </div>
          </div>

          <div className={styles.valuesGrid}>
            {[
              {icon:'🌳',title:'Premium Sheesham Wood',desc:'We source only the finest grade sheesham from Punjab and Sindh forests — dense, durable and naturally beautiful.'},
              {icon:'🔨',title:'Master Craftsmanship',desc:'Every joint, every carving and every finish is done by hand by our skilled artisans with decades of experience.'},
              {icon:'🚚',title:'Lahore-Wide Delivery',desc:'We deliver and assemble across Lahore and surrounding cities. Free delivery on orders above PKR 10,000.'},
              {icon:'🛡️',title:'2-Year Warranty',desc:'We stand behind every piece we sell. All our furniture comes with a 2-year structural warranty.'},
            ].map(v=>(
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.visitBox}>
            <div>
              <h3>Visit Our Showroom</h3>
              <p>📍 Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore 54600</p>
              <p>📞 <a href="tel:+923214877048">+92 321 4877048</a></p>
              <p>🕐 Monday – Saturday: 10:00am – 8:00pm</p>
            </div>
            <Link href="/contact" className="btn btn--primary">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
